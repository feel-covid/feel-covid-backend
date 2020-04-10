import { CachingKeysEnum } from '../@types/enums';
import { redis } from '../connectors/redisConnector';
import { CachingServiceGetValue, DynamicObject } from '../@types/types';

const set = async (key: CachingKeysEnum, payload: DynamicObject<any>) => {
	return redis.set(key, JSON.stringify(payload));
};

const get = async (key: CachingKeysEnum): Promise<CachingServiceGetValue> => {
	let data = await redis.get(key);

	if (data) {
		data = JSON.parse(data);
	}

	return (data as unknown) as CachingServiceGetValue;
};

const clear = async (key: CachingKeysEnum) => {
	return redis.del(key);
};

export default {
	set,
	get,
	clear
};
