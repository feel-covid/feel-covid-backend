import { Stat } from '../models/Stat';
import { IStat } from '../@types/interfaces';

const addStats = async (payload: IStat) => {
	try {
		const { date, ...rest } = payload;

		const newStat = Stat.create({
			date: new Date(date * 1000),
			...rest
		});
		await newStat.save();
	} catch (ex) {
		console.log(ex);
	}
};

export default {
	addStats
};
