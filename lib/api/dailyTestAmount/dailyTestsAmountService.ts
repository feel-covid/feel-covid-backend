import { DailyTestAmount } from '../../models/DailyTestAmount';
import cachingService from '../../services/cachingService';
import { CachingCategoriesEnum } from '../../@types/enums';
import { IDailyTestAmount } from '../../@types/interfaces';
import { getConnection } from 'typeorm';

interface ICreateAndUpdateTestAmountPayload {
	data: {
		countryId: string;
		testsData: Array<IDailyTestAmount>;
	};
}

const createOrUpdateTestAmount = async (
	payload: ICreateAndUpdateTestAmountPayload
) => {
	const { countryId, testsData } = payload.data;

	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(DailyTestAmount)
		.values(testsData.map(testData => DailyTestAmount.create({ ...testData, countryId })))
		.orUpdate({ conflict_target: ['date'], overwrite: ['positive', 'amount'] })
		.execute();

	await cachingService.clear(CachingCategoriesEnum.TESTS_AMOUNT);
};

export default {
	createOrUpdateTestAmount
};
