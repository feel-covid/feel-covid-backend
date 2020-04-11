import { Request, Response } from 'express';
import countryService from '../services/countryService';
import { createCountryPayloadValidator } from '../validators/createCountryPayloadValidator';
import { StatusCodeEnum } from '../@types/enums';
import { getCountryPayloadValidator } from '../validators/getCountryPayloadValidator';
import { logger } from '../services/loggingService';

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
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error(`${ex.message} %o`, { query: req.query });
	}
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
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error(`${ex.message} %o`, { body: req.body });
	}
};

export default {
	handleGetCountry,
	handleAddCountry
};
