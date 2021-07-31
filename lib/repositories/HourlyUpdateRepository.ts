import { IHourlyUpdate } from '../@types/interfaces';
import { HourlyUpdate } from '../models/HourlyUpdate';

import cachingService from '../services/cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import connections from '../connections';

export class HourlyUpdateRepository {
	static async createOrUpdateHourlyUpdate(
		payload: IHourlyUpdate
	): Promise<HourlyUpdate> {
		const { date, ...rest } = payload;

		const hourlyUpdate = HourlyUpdate.create({
			date: new Date(date * 1000),
			...rest
		});

		await connections.database
			.createQueryBuilder()
			.insert()
			.into(HourlyUpdate)
			.values(hourlyUpdate)
			.orUpdate({
				conflict_target: ['date'],
				overwrite: ['mid', 'severe', 'deceased', 'recovered', 'treatment', 'light']
			})
			.execute();

		await cachingService.clear(CachingCategoriesEnum.HOURLY_UPDATES);

		return hourlyUpdate;
	}
}
