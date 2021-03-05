import { ICountry } from '../../@types/interfaces';
import { Country } from '../../models/Country';
import { getConnection } from 'typeorm';
import cachingService from '../../services/cachingService';
import { CachingCategoriesEnum } from '../../@types/enums';
import { excludeKeys } from '../../utils/excludeKeys';
import { DailyTestAmount } from '../../models/DailyTestAmount';
import { createCacheKeyFromDate } from '../../utils/createCacheKeyFromDate';

const handleGetCountryHourlyUpdates = async payload => {
	const { name, startDate, endDate } = payload;

	const cacheKey = createCacheKeyFromDate({
		suffix: name,
		firstDate: startDate,
		secondDate: endDate
	});

	let data = await cachingService.hget(
		CachingCategoriesEnum.HOURLY_UPDATES,
		cacheKey
	);

	if (!data) {
		data = await getConnection()
			.getRepository(Country)
			.createQueryBuilder('country')
			.select('*')
			.innerJoin('country.hourlyUpdate', 'hourly_update')
			.where('country.name ILIKE :name', { name })
			.andWhere('hourly_update.date BETWEEN SYMMETRIC :startDate and :endDate', {
				startDate,
				endDate
			})
			.orderBy('hourly_update.date')
			.getRawMany();

		data = excludeKeys(data, ['countryId', 'name', 'id']);

		await cachingService.hset(CachingCategoriesEnum.HOURLY_UPDATES, cacheKey, data);
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

	let data = await cachingService.hget(CachingCategoriesEnum.DAILY_TESTS_AMOUNT, cacheKey);

	if (!data) {
		data = await getConnection()
			.getRepository(Country)
			.createQueryBuilder('country')
			.select('*')
			.innerJoin('country.dailyTestAmount', 'daily_test_amount')
			.where('country.name ILIKE :name', { name })
			.andWhere('daily_test_amount.date BETWEEN SYMMETRIC :startDate and :endDate', {
				startDate,
				endDate
			})
			.orderBy('daily_test_amount.date')
			.getRawMany();

		const { total } = await getConnection()
			.getRepository(DailyTestAmount)
			.createQueryBuilder('daily_test_amount')
			.select('SUM(amount) as total')
			.where('daily_test_amount.countryId = :id', { id: data?.[0]?.countryId })
			.getRawOne();

		data = {
			total: Number(total),
			data: excludeKeys(data, ['countryId', 'name', 'id'])
		};

		await cachingService.hset(CachingCategoriesEnum.DAILY_TESTS_AMOUNT, cacheKey, data);
	}

	return data;
};

const handleGetCountryDailyIRD = async payload => {
	const { name, startDate, endDate } = payload;

	const cacheKey = createCacheKeyFromDate({
		suffix: name,
		firstDate: startDate,
		secondDate: endDate
	});

	let data = await cachingService.hget(CachingCategoriesEnum.DAILY_IRD, cacheKey);

	if (!data) {
		data = await getConnection()
			.getRepository(Country)
			.createQueryBuilder('country')
			.select('*')
			.innerJoin('country.dailyIRD', 'daily_ird')
			.where('country.name ILIKE :name', { name })
			.andWhere('daily_ird.date BETWEEN SYMMETRIC :startDate and :endDate', {
				startDate,
				endDate
			})
			.orderBy('daily_ird.date')
			.getRawMany();

		data = excludeKeys(data, ['countryId', 'name', 'id']);

		await cachingService.hset(CachingCategoriesEnum.DAILY_IRD, cacheKey, data);
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
	handleGetCountryStats: handleGetCountryHourlyUpdates,
	handleGetCountryDailyStats: handleGetCountryDailyIRD,
	handleGetCountryTests,
	handleAddCountry
};
