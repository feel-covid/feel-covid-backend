import { Request, Response } from 'express';
import statsService from './hourlyUpdateService';
import { createStatPayloadValidator } from './validators/createStatPayloadValidator';
import { StatusCodeEnum } from '../../@types/enums';
import { logger } from '../../logger';

/**
 * @method POST
 * @route /stat
 */
const handleAddStats = async (req: Request, res: Response) => {
	try {
		try {
			await createStatPayloadValidator.validateAsync(req.body);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		const data = await statsService.createOrUpdateHourlyUpdate(req.body);

		res.send({ success: true, data });
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error('Failed to update or create hourly update', { ex, req });
	}
};

export default {
	handleAddStats
};
