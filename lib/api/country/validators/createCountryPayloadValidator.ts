import * as Joi from '@hapi/joi';

export const createCountryPayloadValidator = Joi.object({
	name: Joi.string().required()
});
