import { Request, Response } from 'express';
import statsService from '../services/statsService';
import { statPayloadValidator } from '../validators/statPayloadValidator';

/**
 * @method POST
 */
const handleAddStats = async (req: Request, res: Response) => {
	try {
		await statPayloadValidator.validateAsync(req.body);

		await statsService.addStats(req.body);

		res.send({ success: true });
	} catch (ex) {}
};

export default {
	handleAddStats
};
