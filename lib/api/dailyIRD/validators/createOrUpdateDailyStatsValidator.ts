import Joi from '@hapi/joi';

export const createOrUpdateDailyStatsValidator = Joi.object({
	data: Joi.object({
		countryId: Joi.string().required(),
		dailyStatsData: Joi.array()
			.items(
				Joi.object({
					date: Joi.string().required(),
					infected: Joi.number().required(),
					recovered: Joi.number().required(),
					deceased: Joi.number()
				})
			)
			.required()
	}).required()
});
