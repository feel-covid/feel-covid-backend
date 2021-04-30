import Joi from '@hapi/joi';

export const getCountryTestsPayloadValidator = Joi.object({
	name: Joi.string().required(),
	startDate: Joi.string().required(),
	endDate: Joi.string().required()
});
