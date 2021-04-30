import Joi from '@hapi/joi';

export const createOrUpdateVaccinationsValidator = Joi.object({
	data: Joi.object({
		countryId: Joi.string().required(),
		dailyVaccinationsData: Joi.array()
			.items(
				Joi.object({
					date: Joi.string().required(),
					first_dose_amount: Joi.number().required(),
					first_dose_percentage: Joi.number().required(),
					first_dose_cumulative: Joi.number().required(),
					second_dose_amount: Joi.number().required(),
					second_dose_percentage: Joi.number().required(),
					second_dose_cumulative: Joi.number().required()
				})
			)
			.required()
	}).required()
});
