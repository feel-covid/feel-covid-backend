import { Request, Response } from 'express';
import countryService from '../services/countryService';
import { createCountryPayloadValidator } from '../validators/createCountryPayloadValidator';
import { StatusCodeEnum } from '../@types/enums';
import { getCountryPayloadValidator } from '../validators/getCountryPayloadValidator';

/**
 * @method GET
 */
const handleGetCountry = async (req: Request, res: Response) => {
	try {
		try {
			await getCountryPayloadValidator.validateAsync(req.query);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		const data = await countryService.handleGetCountry(req.query);

		res.send(data);
	} catch (ex) {}
};

/**
 * @method POST
 */
const handleAddCountry = async (req: Request, res: Response) => {
	try {
		try {
			await createCountryPayloadValidator.validateAsync(req.body);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		await countryService.handleAddCountry(req.body);

		res.send({ success: true });
	} catch (ex) {}
};

export default {
	handleGetCountry,
	handleAddCountry
};
