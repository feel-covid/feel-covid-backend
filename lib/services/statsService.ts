import { Stat } from '../models/Stat';
import { IStat } from '../@types/interfaces';
import cachingService from './cachingService';
import { CachingKeysEnum } from '../@types/enums';

const addStats = async (payload: IStat) => {
	try {
		const { date, ...rest } = payload;

		const newStat = Stat.create({
			date: new Date(date * 1000),
			...rest
		});
		await newStat.save();
		await cachingService.clear(CachingKeysEnum.COUNTRIES_DATA);
	} catch (ex) {
		console.log(ex);
	}
};

export default {
	addStats
};
