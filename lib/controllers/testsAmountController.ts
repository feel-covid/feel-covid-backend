import { Request, Response } from 'express';
import { StatusCodeEnum } from '../@types/enums';
import { logger } from '../services/loggingService';
import { createTestAmountPayloadValidator } from '../validators/createTestAmountPayloadValidator';
import testsAmountService from '../services/testsAmountService';

/**
 * @method POST
 */
const handleAddTestAmount = async (req: Request, res: Response) => {
	try {
		try {
			await createTestAmountPayloadValidator.validateAsync(req.body);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		await testsAmountService.addTestAmount(req.body);

		res.send({ success: true });
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error(`${ex.message} %o`, { body: req.body });
	}
};

export default {
	handleAddTestAmount
};
