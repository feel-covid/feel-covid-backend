import { ICountry } from '../@types/interfaces';
import { Country } from '../models/Country';
import { getConnection } from 'typeorm';
import cachingService from './cachingService';
import { CachingKeysEnum } from '../@types/enums';
import { startOfDay, endOfDay } from 'date-fns';

const handleGetCountry = async payload => {
	// tslint:disable-next-line:prefer-const
	let { name, startDate, endDate } = payload;

	const _startOfDay = startOfDay(new Date(JSON.parse(startDate))).toISOString();
	const _endOfDay = endOfDay(new Date(JSON.parse(endDate))).toISOString();
	const cacheKey = `${CachingKeysEnum.COUNTRIES_DATA}${_startOfDay}${_endOfDay}`;

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
	const newCountry = Country.create({
		name: payload.name
	});

	await newCountry.save();
};

export default {
	handleGetCountry,
	handleAddCountry
};
