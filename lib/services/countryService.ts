import { ICountry } from '../@types/interfaces';
import { Country } from '../models/Country';
import { getConnection } from 'typeorm';
import cachingService from './cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import { excludeKeys } from '../utils/excludeKeys';
import { TestAmount } from '../models/TestAmount';
import { createCacheKeyFromDate } from '../utils/createCacheKeyFromDate';

const handleGetCountryStats = async payload => {
	// tslint:disable-next-line:prefer-const
	let { name, startDate, endDate } = payload;

	const cacheKey = createCacheKeyFromDate({
		suffix: name,
		firstDate: startDate,
		secondDate: endDate
	});

	let data = await cachingService.hget(
		CachingCategoriesEnum.COUNTRIES_DATA,
		cacheKey
	);

	if (!data) {
		data = await getConnection()
			.getRepository(Country)
			.createQueryBuilder('country')
			.select('*')
			.innerJoin('country.stats', 'stat')
			.where('country.name ILIKE :name', { name })
			.andWhere('stat.date BETWEEN SYMMETRIC :startDate and :endDate', {
				startDate,
				endDate
			})
			.orderBy('stat.date')
			.getRawMany();

		data = excludeKeys(data, ['countryId', 'name', 'id']);

		await cachingService.hset(CachingCategoriesEnum.COUNTRIES_DATA, cacheKey, data);
	}

	return data;
};

const handleGetCountryTests = async payload => {
	const { name, startDate, endDate } = payload;

	const cacheKey = createCacheKeyFromDate({
		suffix: name,
		firstDate: startDate,
		secondDate: endDate
	});

	let data = await cachingService.hget(CachingCategoriesEnum.TESTS_AMOUNT, cacheKey);

	if (!data) {
		data = await getConnection()
			.getRepository(Country)
			.createQueryBuilder('country')
			.select('*')
			.innerJoin('country.tests', 'test_amount')
			.where('country.name ILIKE :name', { name })
			.andWhere('test_amount.date BETWEEN SYMMETRIC :startDate and :endDate', {
				startDate,
				endDate
			})
			.orderBy('test_amount.date')
			.getRawMany();

		const { total } = await getConnection()
			.getRepository(TestAmount)
			.createQueryBuilder('test_amount')
			.select('SUM(amount) as total')
			.where('test_amount.countryId = :id', { id: data?.[0]?.countryId })
			.getRawOne();

		data = {
			total: Number(total),
			data: excludeKeys(data, ['countryId', 'name', 'id'])
		};

		await cachingService.hset(CachingCategoriesEnum.TESTS_AMOUNT, cacheKey, data);
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
	handleGetCountryStats,
	handleAddCountry,
	handleGetCountryTests
};
