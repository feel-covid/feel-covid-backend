import _ from 'lodash';

export const excludeKeys = (
	payload: Array<Record<string, any>> | Record<string, any>,
	keys: Array<string>
) => {
	if (Array.isArray(payload)) {
		return payload.map(obj => _.omit(obj, keys));
	}

	return _.omit(payload, keys);
};
