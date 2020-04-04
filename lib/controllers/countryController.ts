import { Request, Response } from 'express';
import countryService from '../services/countryService';
import { countryPayloadValidator } from '../validators/countryPayloadValidator';

/**
 * @method POST
 */
const handleAddCountry = async (req: Request, res: Response) => {
	try {
		await countryPayloadValidator.validateAsync(req.body);

		await countryService.handleAddCountry(req.body);

		res.send({ success: true });
	} catch (ex) {}
};

export default {
	handleAddCountry
};
