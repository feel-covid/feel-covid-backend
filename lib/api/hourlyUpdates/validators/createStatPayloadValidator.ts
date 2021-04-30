import Joi from '@hapi/joi';

const conditionSchema = Joi.object({
	cases: Joi.number().required(),
	intubated: Joi.number()
});

export const createStatPayloadValidator = Joi.object({
	light: conditionSchema,
	mid: conditionSchema,
	severe: conditionSchema,
	deceased: Joi.number().required(),
	recovered: Joi.number().required(),
	date: Joi.number().required(),
	treatment: Joi.object({
		hospital: Joi.number().required(),
		home: Joi.number().required(),
		hotel: Joi.number().required(),
		undecided: Joi.number().required()
	}),
	countryId: Joi.string().required()
});
