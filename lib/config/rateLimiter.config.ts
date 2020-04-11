import { StatusCodeEnum } from '../@types/enums';
import { Request, Response } from 'express';

export const rateLimiterConfig = {
	max: 85,
	windowMs: 60 * 60 * 1000,
	handler(req: Request, res: Response) {
		return res.sendStatus(StatusCodeEnum.TOO_MANY_REQUESTS);
	}
};
