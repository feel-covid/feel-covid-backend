import { ICountry } from '../@types/interfaces';
import { Country } from '../models/Country';
import { getConnection } from 'typeorm';
import cachingService from './cachingService';
import { CachingKeysEnum } from '../@types/enums';

const handleGetCountry = async payload => {
	const { name, startDate, endDate } = payload;

	let data = await cachingService.get(CachingKeysEnum.COUNTRIES_DATA);

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

		await cachingService.set(CachingKeysEnum.COUNTRIES_DATA, data);
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
