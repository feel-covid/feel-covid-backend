import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../@types/enums';
import { logger } from '../../services/loggingService';
import dailyVaccinationsService from './dailyVaccinationsService';
import { createOrUpdateVaccinationsValidator } from './validators/createOrUpdateVaccinationsValidator';

/**
 * @method PUT
 */
const handleCreateOrUpdateDailyVaccinations = async (
	req: Request,
	res: Response
) => {
	try {
		try {
			await createOrUpdateVaccinationsValidator.validateAsync(req.body);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		await dailyVaccinationsService.createOrUpdateDailyVaccinations(req.body);

		res.send({ success: true });
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error('Failed to update daily vaccinations', { ex, req });
	}
};

export default {
	handleCreateOrUpdateDailyVaccinations
};
