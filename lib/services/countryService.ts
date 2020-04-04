import { ICountry } from '../@types/interfaces';
import { Country } from '../models/Country';
import { getConnection } from 'typeorm';

const handleGetCountry = async payload => {
	const { name, startDate, endDate } = payload;

	const data = await getConnection()
		.getRepository(Country)
		.createQueryBuilder('country')
		.select('*')
		.innerJoin('country.stats', 'stat')
		.where('country.name ILIKE :name', { name })
		.andWhere('stat.date BETWEEN SYMMETRIC :startDate and :endDate', { startDate, endDate })
		.orderBy('stat.date')
		.getRawMany();

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
