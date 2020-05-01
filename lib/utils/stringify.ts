import { isObject } from './isObject';

export const stringify = (payload: any): string => {
	return isObject(payload) ? JSON.stringify(payload) : (payload as string);
};
