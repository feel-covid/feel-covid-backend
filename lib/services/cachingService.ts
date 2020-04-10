import { redis } from '../connectors/redisConnector';
import { CachingServiceGetValue, DynamicObject } from '../@types/types';

const set = async (key: string, payload: DynamicObject<any>) => {
	return redis.set(key, JSON.stringify(payload));
};

const get = async (key: string): Promise<CachingServiceGetValue> => {
	let data = await redis.get(key);

	if (data) {
		data = JSON.parse(data);
		console.log(`Found cached data for key ${key}`);
	}

	return (data as unknown) as CachingServiceGetValue;
};

const clear = async (key: string) => {
	return redis.del(key);
};

const clearAll = async () => {
	return redis.flushall();
};

export default {
	set,
	get,
	clear,
	clearAll
};
