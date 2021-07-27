import { IDailyTestAmount } from '../../@types/interfaces';
import { DailyTestAmountRepository } from '../../repositories/DailyTestAmountRepository';

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
	await DailyTestAmountRepository.createOrUpdateTestAmount(countryId, testsData);
};

export default {
	createOrUpdateTestAmount
};
