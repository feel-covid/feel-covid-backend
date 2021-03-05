import { getConnection } from 'typeorm';
import { DailyTestAmount } from '../../models/DailyTestAmount';
import cachingService from '../../services/cachingService';
import { CachingCategoriesEnum } from '../../@types/enums';
import { IDailyIRD, IDailyTestAmount } from '../../@types/interfaces';
import { DailyIRD } from '../../models/DailyIRD';

interface ICreateOrUpdateDailyStats {
	data: {
		countryId: string;
		dailyStatsData: Array<IDailyIRD>;
	};
}

const createOrUpdateDailyStats = async (payload: ICreateOrUpdateDailyStats) => {
	const { countryId, dailyStatsData } = payload.data;

	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(DailyIRD)
		.values(
			dailyStatsData.map(dailyStat => DailyIRD.create({ ...dailyStat, countryId }))
		)
		.orUpdate({
			conflict_target: ['date'],
			overwrite: ['infected', 'recovered', 'deceased']
		})
		.execute();

	await cachingService.clear(CachingCategoriesEnum.DAILY_STATS);
};

export default {
	createOrUpdateDailyStats
};
