import { Request, Response } from 'express';
import cachingService from '../../services/cachingService';
import { StatusCodeEnum } from '../../@types/enums';
import { logger } from '../../services/loggingService';

/**
 * @method POST
 * @route /cache/clear
 */
export const handleClearCache = async (req: Request, res: Response) => {
	try {
		const { cacheKey = null } = req.body;
		const operationResult = cacheKey
			? await cachingService.clear(cacheKey)
			: await cachingService.clearAll();

		res.json(operationResult);
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error('Failed to clear cache', { ex });
	}
};

export default {
	handleClearCache
};
