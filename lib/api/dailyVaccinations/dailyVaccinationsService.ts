import { DailyVaccination, IDailyVaccination } from '../../models/DailyVaccination';
import cachingService from '../../services/cachingService';
import { CachingCategoriesEnum } from '../../@types/enums';
import { getConnection } from 'typeorm';

interface ICreateOrUpdateDailyVaccinationsPayload {
	data: {
		countryId: string;
		dailyVaccinationsData: Array<IDailyVaccination>;
	};
}

const createOrUpdateDailyVaccinations = async (
	payload: ICreateOrUpdateDailyVaccinationsPayload
) => {
	const { countryId, dailyVaccinationsData } = payload.data;
	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(DailyVaccination)
		.values(
			dailyVaccinationsData.map(vaccinationData =>
				DailyVaccination.create({ ...vaccinationData, countryId })
			)
		)
		.orUpdate({
			conflict_target: ['date'],
			overwrite: [
				'first_dose_amount',
				'first_dose_percentage',
				'first_dose_cumulative',
				'second_dose_amount',
				'second_dose_percentage',
				'second_dose_cumulative'
			]
		})
		.execute();

	await cachingService.clear(CachingCategoriesEnum.DAILY_VACCINATIONS);
};

export default {
	createOrUpdateDailyVaccinations
};
