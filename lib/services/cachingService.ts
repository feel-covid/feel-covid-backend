import { redis } from '../connectors/redisConnector';
import { CachingServiceGetValue, DynamicObject } from '../@types/types';
import { stringify } from '../utils/stringify';
import { CachingCategoriesEnum } from '../@types/enums';
import { parse } from '../utils/parse';

const set = async (key: string, payload: DynamicObject<any> | string) => {
	return redis.set(key, stringify(payload));
};

const hset = async (
	category: CachingCategoriesEnum,
	key: string,
	payload: DynamicObject<any | string>
) => {
	return redis.hset(category, key, stringify(payload));
};

const hget = async (
	category: CachingCategoriesEnum,
	key: string
): Promise<CachingServiceGetValue> => {
	const data = await redis.hget(category, key);
	return parse(data);
};

const get = async (key: string): Promise<CachingServiceGetValue> => {
	const data = await redis.get(key);
	return parse(data);
};

const clear = async (key: string | CachingCategoriesEnum) => {
	return redis.del(key);
};

const clearAll = async () => {
	return redis.flushall();
};

export default {
	set,
	hset,
	get,
	hget,
	clear,
	clearAll
};
