import { Request, Response } from 'express';
import statsService from '../services/hourlyUpdateService';
import { createStatPayloadValidator } from '../validators/createStatPayloadValidator';
import { StatusCodeEnum } from '../@types/enums';
import { logger } from '../services/loggingService';

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

		const data = await statsService.addStats(req.body);

		res.send({ success: true, data });
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error(`${ex.message} %o`, { body: req.body });
	}
};

export default {
	handleAddStats
};
