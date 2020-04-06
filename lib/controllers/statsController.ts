import { Request, Response } from 'express';
import statsService from '../services/statsService';
import { createStatPayloadValidator } from '../validators/createStatPayloadValidator';
import { StatusCodeEnum } from '../@types/enums';

/**
 * @method POST
 */
const handleAddStats = async (req: Request, res: Response) => {
	try {
		try {
			await createStatPayloadValidator.validateAsync(req.body);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		await statsService.addStats(req.body);

		res.send({ success: true });
	} catch (ex) {}
};

export default {
	handleAddStats
};
