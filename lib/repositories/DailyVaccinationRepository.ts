import { DailyVaccination, IDailyVaccination } from '../models/DailyVaccination';
import cachingService from '../services/cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import connections from '../connections';

export class DailyVaccinationRepository {
	static async createOrUpdateDailyVaccinations(
		countryId: string,
		data: IDailyVaccination[]
	) {
		await connections.database
			.createQueryBuilder()
			.insert()
			.into(DailyVaccination)
			.values(
				data.map(vaccinationData =>
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
					'second_dose_cumulative',
					'third_dose_amount',
					'third_dose_percentage',
					'third_dose_cumulative'
				]
			})
			.execute();

		await cachingService.clear(CachingCategoriesEnum.DAILY_VACCINATIONS);
	}
}
