import { IDailyIRD } from '../@types/interfaces';
import { DailyIRD } from '../models/DailyIRD';
import cachingService from '../services/cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import connections from '../connections';

export class DailyIRDRepository {
	static async createOrUpdateDailyIRD(countryId: string, data: IDailyIRD[]) {
		await connections.database
			.createQueryBuilder()
			.insert()
			.into(DailyIRD)
			.values(data.map(dailyIRD => DailyIRD.create({ ...dailyIRD, countryId })))
			.orUpdate({
				conflict_target: ['date'],
				overwrite: ['infected', 'recovered', 'deceased']
			})
			.execute();

		await cachingService.clear(CachingCategoriesEnum.DAILY_IRD);
	}
}
