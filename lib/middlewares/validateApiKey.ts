import { Request, Response, NextFunction } from 'express';
import { StatusCodeEnum } from '../@types/enums';

export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
	const secretHeader = req.headers['x-api-key'];

	if (!secretHeader || secretHeader !== process.env.API_KEY) {
		/*
		 * Returning 404 on purpose to obscure route
		 * */
		res.status(StatusCodeEnum.NOT_FOUND).end();
		return;
	}

	next();
};
