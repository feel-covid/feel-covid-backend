import { Request, Response } from 'express';
import countryService from '../services/countryService';
import { createCountryPayloadValidator } from '../validators/createCountryPayloadValidator';
import { StatusCodeEnum } from '../@types/enums';
import { getCountryStatsPayloadValidator } from '../validators/getCountryStatsPayloadValidator';
import { getCountryTestsPayloadValidator } from '../validators/getCountryTestsPayloadValidator';
import { logger } from '../services/loggingService';

/**
 * @method GET
 * @route /country/stats
 */
const handleGetCountryStats = async (req: Request, res: Response) => {
	try {
		try {
			await getCountryStatsPayloadValidator.validateAsync(req.query);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		const data = await countryService.handleGetCountryStats(req.query);

		res.send(data);
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error(`${ex.message} %o`, { query: req.query });
	}
};

/**
 * @method GET
 * @route /country/tests
 */
const handleGetCountryTests = async (req: Request, res: Response) => {
	try {
		try {
			await getCountryTestsPayloadValidator.validateAsync(req.query);
		} catch (ex) {
			return res.status(StatusCodeEnum.BAD_REQUEST).send(ex.message);
		}

		const data = await countryService.handleGetCountryTests(req.query);

		res.send(data);
	} catch (ex) {
		res.sendStatus(StatusCodeEnum.INTERNAL_SERVER_ERROR);
		logger.error(`${ex.message} %o`, { query: req.query });
	}
};

/**
 * @method POST
 * @route /country
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
	handleGetCountryStats,
	handleGetCountryTests,
	handleAddCountry
};
