import { DynamicObject } from '../@types/types';

export const parse = (
	payload: string | null
): DynamicObject<any> | Array<any> | null => {
	return payload && typeof payload === 'string' ? JSON.parse(payload) : null;
};
