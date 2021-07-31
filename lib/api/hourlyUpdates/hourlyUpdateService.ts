import { IHourlyUpdate } from '../../@types/interfaces';
import { HourlyUpdateRepository } from '../../repositories/HourlyUpdateRepository';

const createOrUpdateHourlyUpdate = async (payload: IHourlyUpdate) => {
	const hourlyUpdate = HourlyUpdateRepository.createOrUpdateHourlyUpdate(payload);
	return hourlyUpdate;
};

export default {
	createOrUpdateHourlyUpdate
};
