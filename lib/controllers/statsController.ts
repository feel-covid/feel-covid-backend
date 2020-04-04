import { Request, Response } from 'express';
import statsService from '../services/statsService';
import { createStatPayloadValidator } from '../validators/createStatPayloadValidator';

/**
 * @method POST
 */
const handleAddStats = async (req: Request, res: Response) => {
	try {
		await createStatPayloadValidator.validateAsync(req.body);

		await statsService.addStats(req.body);

		res.send({ success: true });
	} catch (ex) {}
};

export default {
	handleAddStats
};
