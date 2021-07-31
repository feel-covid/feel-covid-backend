import { DailyVaccination, IDailyVaccination } from '../../models/DailyVaccination';
import cachingService from '../../services/cachingService';
import { CachingCategoriesEnum } from '../../@types/enums';
import { getConnection } from 'typeorm';
import { DailyVaccinationRepository } from '../../repositories/DailyVaccinationRepository';

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
	await DailyVaccinationRepository.createOrUpdateDailyVaccinations(
		countryId,
		dailyVaccinationsData
	);
};

export default {
	createOrUpdateDailyVaccinations
};
