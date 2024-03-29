import { Request, Response } from 'express';
import { StatusCodeEnum } from '../../@types/enums';
import { logger } from '../../logger';
import testsAmountService from './dailyTestsAmountService';
import { createOrUpdateTestAmountValidator } from './validators/createOrUpdateTestAmountValidator';

/**
 * @method PUT
 */
const handleCreateOrUpdateTestAmount = async (req: Request, res: Response) => {
	try {
		try {
			await createOrUpdateTestAmountValidator.validateAsync(req.body);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		await testsAmountService.createOrUpdateTestAmount(req.body);

		res.send({ success: true });
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error('Failed to update daily test amount', { ex, req });
	}
};

export default {
	handleCreateOrUpdateTestAmount
};
