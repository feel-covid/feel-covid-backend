import { IDailyIRD } from '../../@types/interfaces';
import { DailyIRDRepository } from '../../repositories/DailyIRDRepository';

interface ICreateOrUpdateDailyStats {
	data: {
		countryId: string;
		dailyStatsData: Array<IDailyIRD>;
	};
}

const createOrUpdateDailyIRD = async (payload: ICreateOrUpdateDailyStats) => {
	const { countryId, dailyStatsData } = payload.data;
	await DailyIRDRepository.createOrUpdateDailyIRD(countryId, dailyStatsData);
};

export default {
	createOrUpdateDailyIRD
};
