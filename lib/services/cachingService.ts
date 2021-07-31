import { stringify } from '../utils/stringify';
import { CachingCategoriesEnum } from '../@types/enums';
import { parse } from '../utils/parse';
import connections from '../connections';

type GetValue = Record<string, any> | Array<any> | null | string;

const set = async (key: string, payload: Record<string, any> | string) => {
	return connections.redis.set(key, stringify(payload));
};

const hset = async (
	category: CachingCategoriesEnum,
	key: string,
	payload: Record<string, any> | string
) => {
	return connections.redis.hset(category, key, stringify(payload));
};

const get = async (key: string): Promise<GetValue> => {
	const data = await connections.redis.get(key);
	return parse(data);
};

const hget = async (
	category: CachingCategoriesEnum,
	key: string
): Promise<GetValue> => {
	const data = await connections.redis.hget(category, key);
	return parse(data);
};

const clear = async (key: string | CachingCategoriesEnum) => {
	return connections.redis.del(key);
};

const clearAll = async () => {
	return connections.redis.flushall();
};

export default {
	set,
	hset,
	get,
	hget,
	clear,
	clearAll
};
