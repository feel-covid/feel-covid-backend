import { createCacheKeyFromDate } from '../utils/createCacheKeyFromDate';
import cachingService from '../services/cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import { Country } from '../models/Country';
import { excludeKeys } from '../utils/excludeKeys';
import { IDailyIRD, IDailyTestAmount, IHourlyUpdate } from '../@types/interfaces';
import { DailyTestAmount } from '../models/DailyTestAmount';
import { KeysToCamelCase } from '../@types/types';
import { IDailyVaccination } from '../models/DailyVaccination';
import connections from '../connections';

export class CountryRepository {
	static async getHourlyUpdates(
		countryName: string,
		startDate: string,
		endDate: string
	) {
		const cacheKey = createCacheKeyFromDate({
			prefix: countryName,
			firstDate: startDate,
			secondDate: endDate
		});

		let data = await cachingService.hget(
			CachingCategoriesEnum.HOURLY_UPDATES,
			cacheKey
		);

		if (!data) {
			data = await connections.database
				.getRepository(Country)
				.createQueryBuilder('country')
				.select('*')
				.innerJoin('country.hourlyUpdate', 'hourly_update')
				.where('country.name ILIKE :name', { name: countryName })
				.andWhere('hourly_update.date BETWEEN SYMMETRIC :startDate and :endDate', {
					startDate,
					endDate
				})
				.orderBy('hourly_update.date')
				.getRawMany();

			data = excludeKeys(data, ['countryId', 'name', 'id']);

			await cachingService.hset(
				CachingCategoriesEnum.HOURLY_UPDATES,
				cacheKey,
				data
			);
		}

		return data as Omit<IHourlyUpdate, 'countryId' | 'name' | 'id'>[];
	}

	static async getDailyTestAmount(
		countryName: string,
		startDate: string,
		endDate: string
	) {
		const cacheKey = createCacheKeyFromDate({
			prefix: countryName,
			firstDate: startDate,
			secondDate: endDate
		});

		let data = await cachingService.hget(
			CachingCategoriesEnum.DAILY_TESTS_AMOUNT,
			cacheKey
		);

		if (!data) {
			data = await connections.database
				.getRepository(Country)
				.createQueryBuilder('country')
				.select('*')
				.innerJoin('country.dailyTestAmount', 'daily_test_amount')
				.where('country.name ILIKE :name', { name: countryName })
				.andWhere(
					'daily_test_amount.date BETWEEN SYMMETRIC :startDate and :endDate',
					{
						startDate,
						endDate
					}
				)
				.orderBy('daily_test_amount.date')
				.getRawMany();

			const { total } = await connections.database
				.getRepository(DailyTestAmount)
				.createQueryBuilder('daily_test_amount')
				.select('SUM(amount) as total')
				.where('daily_test_amount.countryId = :id', { id: data?.[0]?.countryId })
				.getRawOne();

			data = {
				total: Number(total),
				data: excludeKeys(data, ['countryId', 'name', 'id'])
			};

			await cachingService.hset(
				CachingCategoriesEnum.DAILY_TESTS_AMOUNT,
				cacheKey,
				data
			);
		}

		return data as {
			total: number;
			data: Omit<IDailyTestAmount, 'countryId' | 'name' | 'id'>[];
		};
	}

	static async getDailyIRD(countryName: string, startDate: string, endDate: string) {
		const cacheKey = createCacheKeyFromDate({
			prefix: countryName,
			firstDate: startDate,
			secondDate: endDate
		});

		let data = await cachingService.hget(CachingCategoriesEnum.DAILY_IRD, cacheKey);

		if (!data) {
			data = await connections.database
				.getRepository(Country)
				.createQueryBuilder('country')
				.select('*')
				.innerJoin('country.dailyIRD', 'daily_ird')
				.where('country.name ILIKE :name', { name: countryName })
				.andWhere('daily_ird.date BETWEEN SYMMETRIC :startDate and :endDate', {
					startDate,
					endDate
				})
				.orderBy('daily_ird.date')
				.getRawMany();

			data = excludeKeys(data, ['countryId', 'name', 'id']);

			await cachingService.hset(CachingCategoriesEnum.DAILY_IRD, cacheKey, data);
		}

		return data as Omit<IDailyIRD, 'countryId' | 'name' | 'id'>[];
	}

	static async getDailyVaccination(
		countryName: string,
		startDate: string,
		endDate: string
	) {
		const cacheKey = createCacheKeyFromDate({
			prefix: countryName,
			firstDate: startDate,
			secondDate: endDate
		});

		let data = await cachingService.hget(
			CachingCategoriesEnum.DAILY_VACCINATIONS,
			cacheKey
		);

		if (!data) {
			data = await connections.database
				.getRepository(Country)
				.createQueryBuilder('country')
				.select([
					'date',
					'first_dose_amount as "firstDoseAmount"',
					'first_dose_percentage as "firstDosePercentage"',
					'first_dose_cumulative as "firstDoseCumulative"',
					'second_dose_amount as "secondDoseAmount"',
					'second_dose_percentage as "secondDosePercentage"',
					'second_dose_cumulative as "secondDoseCumulative"'
				])
				.innerJoin('country.dailyVaccination', 'daily_vaccinations')
				.where('country.name ILIKE :name', { name: countryName })
				.andWhere(
					'daily_vaccinations.date BETWEEN SYMMETRIC :startDate and :endDate',
					{
						startDate,
						endDate
					}
				)
				.orderBy('daily_vaccinations.date')
				.getRawMany();

			await cachingService.hset(
				CachingCategoriesEnum.DAILY_VACCINATIONS,
				cacheKey,
				data
			);
		}

		return data as KeysToCamelCase<IDailyVaccination>[];
	}

	static async createCountry(countryName: string) {
		const newCountry = Country.create({
			name: countryName
		});

		await newCountry.save();
	}
}
