import _ from 'lodash';

export const stringify = (payload: any): string => {
	return _.isObject(payload) ? JSON.stringify(payload) : (payload as string);
};
