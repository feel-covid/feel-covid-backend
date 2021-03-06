import { HourlyUpdate } from '../../models/HourlyUpdate';
import { IHourlyUpdate } from '../../@types/interfaces';
import cachingService from '../../services/cachingService';
import { CachingCategoriesEnum } from '../../@types/enums';
import { getConnection } from 'typeorm';

const addStats = async (payload: IHourlyUpdate) => {
	const { date, ...rest } = payload;

	const newStat = HourlyUpdate.create({
		date: new Date(date * 1000),
		...rest
	});

	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(HourlyUpdate)
		.values(newStat)
		.orUpdate({
			conflict_target: ['date'],
			overwrite: ['mid', 'severe', 'deceased', 'recovered', 'treatment', 'light']
		})
		.execute();

	await cachingService.clear(CachingCategoriesEnum.HOURLY_UPDATES);

	return newStat;
};

export default {
	addStats
};
