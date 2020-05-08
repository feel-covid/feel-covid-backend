import * as Joi from '@hapi/joi';

export const createTestAmountPayloadValidator = Joi.object({
	date: Joi.string().required(),
	amount: Joi.number().required(),
	positive: Joi.number().required(),
	countryId: Joi.string().required()
});
