import { Stat } from '../models/Stat';
import { IStat } from '../@types/interfaces';
import cachingService from './cachingService';

const addStats = async (payload: IStat) => {
	const { date, ...rest } = payload;

	const newStat = Stat.create({
		date: new Date(date * 1000),
		...rest
	});
	await newStat.save();
	await cachingService.clearAll();
};

export default {
	addStats
};
