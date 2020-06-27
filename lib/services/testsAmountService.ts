import { TestAmount } from '../models/TestAmount';
import cachingService from './cachingService';
import { CachingCategoriesEnum } from '../@types/enums';
import { ITestAmount } from '../@types/interfaces';
import { getConnection } from 'typeorm';

interface ICreateAndUpdateTestAmountPayload {
	data: {
		countryId: string;
		testsData: Array<ITestAmount>;
	};
}

const createOrUpdateTestAmount = async (
	payload: ICreateAndUpdateTestAmountPayload
) => {
	const { countryId, testsData } = payload.data;

	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(TestAmount)
		.values(testsData.map(testData => TestAmount.create({ ...testData, countryId })))
		.orUpdate({ conflict_target: ['date'], overwrite: ['positive', 'amount'] })
		.execute();

	await cachingService.clear(CachingCategoriesEnum.TESTS_AMOUNT);
};

export default {
	createOrUpdateTestAmount
};
