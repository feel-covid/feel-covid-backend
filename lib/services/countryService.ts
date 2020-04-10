import { ICountry } from '../@types/interfaces';
import { Country } from '../models/Country';
import { getConnection } from 'typeorm';
import cachingService from './cachingService';
import { CachingKeysEnum } from '../@types/enums';
import { startOfDay, endOfDay } from 'date-fns';

const handleGetCountry = async payload => {
	// tslint:disable-next-line:prefer-const
	let { name, startDate, endDate } = payload;
	startDate = startOfDay(new Date(JSON.parse(startDate)));
	endDate = endOfDay(new Date(JSON.parse(endDate)));

	const cacheKey = `${CachingKeysEnum.COUNTRIES_DATA}${startDate.toISOString()}${endDate.toISOString()}`;

	let data = await cachingService.get(cacheKey);

	if (!data) {
		data = await getConnection()
			.getRepository(Country)
			.createQueryBuilder('country')
			.select('*')
			.innerJoin('country.stats', 'stat')
			.where('country.name ILIKE :name', { name })
			.andWhere('stat.date BETWEEN SYMMETRIC :startDate and :endDate', { startDate, endDate })
			.orderBy('stat.date')
			.getRawMany();

		await cachingService.set(cacheKey, data);
	}

	return data;
};

const handleAddCountry = async (payload: ICountry) => {
	try {
		const newCountry = Country.create({
			name: payload.name
		});

		await newCountry.save();
	} catch (ex) {
		throw new Error(ex);
	}
};

export default {
	handleGetCountry,
	handleAddCountry
};
