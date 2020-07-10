import { Request, Response } from 'express';
import { StatusCodeEnum } from '../@types/enums';
import { logger } from '../services/loggingService';
import { createOrUpdateDailyStatsValidator } from '../validators/createOrUpdateDailyStatsValidator';
import dailyStatsService from '../services/dailyStatsService';

/**
 * @method PUT
 */
const handleCreateOrUpdateDailyStats = async (req: Request, res: Response) => {
	try {
		try {
			await createOrUpdateDailyStatsValidator.validateAsync(req.body);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		await dailyStatsService.createOrUpdateDailyStats(req.body);

		res.send({ success: true });
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error(`${ex.message} %o`, { body: req.body });
	}
};

export default {
	handleCreateOrUpdateDailyStats
};
