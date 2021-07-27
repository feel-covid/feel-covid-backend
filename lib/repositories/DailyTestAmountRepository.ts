import { getConnection } from 'typeorm';
import { DailyTestAmount } from '../models/DailyTestAmount';
import cachingService from '../services/cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import { IDailyTestAmount } from '../@types/interfaces';

export class DailyTestAmountRepository {
	static async createOrUpdateTestAmount(countryId: string, data: IDailyTestAmount[]) {
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(DailyTestAmount)
			.values(data.map(testData => DailyTestAmount.create({ ...testData, countryId })))
			.orUpdate({ conflict_target: ['date'], overwrite: ['positive', 'amount'] })
			.execute();

		await cachingService.clear(CachingCategoriesEnum.DAILY_TESTS_AMOUNT);
	}
}
