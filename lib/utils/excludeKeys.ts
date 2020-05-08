import { DynamicObject } from '../@types/types';
import * as _ from 'lodash';

export const excludeKeys = (
	payload: Array<DynamicObject<any>> | DynamicObject<any>,
	keys: Array<string>
) => {
	if (Array.isArray(payload)) {
		return payload.map(obj => _.omit(obj, keys));
	}

	return _.omit(payload, keys);
};
