import { Request, Response, NextFunction } from 'express';
import { StatusCodeEnum } from '../@types/enums';

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.headers['x-api-key'];

	if (!apiKey || apiKey !== process.env.API_KEY) {
		/*
		 * The middleware returns NOT_FOUND instead of UNAUTHORIZED to obscure the route.
		 * */
		res.sendStatus(StatusCodeEnum.NOT_FOUND);
		return;
	}

	next();
};
