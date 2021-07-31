import { DailyTestAmount } from '../models/DailyTestAmount';
import cachingService from '../services/cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import { IDailyTestAmount } from '../@types/interfaces';
import connections from '../connections';

export class DailyTestAmountRepository {
	static async createOrUpdateTestAmount(
		countryId: string,
		data: IDailyTestAmount[]
	) {
		await connections.database
			.createQueryBuilder()
			.insert()
			.into(DailyTestAmount)
			.values(
				data.map(testData => DailyTestAmount.create({ ...testData, countryId }))
			)
			.orUpdate({ conflict_target: ['date'], overwrite: ['positive', 'amount'] })
			.execute();

		await cachingService.clear(CachingCategoriesEnum.DAILY_TESTS_AMOUNT);
	}
}
