import Joi from '@hapi/joi';

export const createOrUpdateTestAmountValidator = Joi.object({
	data: Joi.object({
		countryId: Joi.string().required(),
		testsData: Joi.array()
			.items(
				Joi.object({
					date: Joi.string().required(),
					amount: Joi.number().required(),
					positive: Joi.number().required()
				})
			)
			.required()
	}).required()
});
