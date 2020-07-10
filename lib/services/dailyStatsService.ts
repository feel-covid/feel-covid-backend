import { getConnection } from 'typeorm';
import { TestAmount } from '../models/TestAmount';
import cachingService from './cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import { IDailyStat, ITestAmount } from '../@types/interfaces';
import { DailyStats } from '../models/DailyStats';

interface ICreateOrUpdateDailyStats {
	data: {
		countryId: string;
		dailyStatsData: Array<IDailyStat>;
	};
}

const createOrUpdateDailyStats = async (payload: ICreateOrUpdateDailyStats) => {
	const { countryId, dailyStatsData } = payload.data;

	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(DailyStats)
		.values(
			dailyStatsData.map(dailyStat => DailyStats.create({ ...dailyStat, countryId }))
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
