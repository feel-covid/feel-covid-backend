import { TestAmount } from '../models/TestAmount';
import cachingService from './cachingService';
import { CachingCategoriesEnum } from '../@types/enums';

const addTestAmount = async payload => {
	const newTestAmount = TestAmount.create(payload);

	// @ts-ignore
	await newTestAmount.save();

	await cachingService.clear(CachingCategoriesEnum.TESTS_AMOUNT);
};

export default {
	addTestAmount
};
