import * as Joi from '@hapi/joi';

export const countryPayloadValidator = Joi.object({
	name: Joi.string().required()
});
