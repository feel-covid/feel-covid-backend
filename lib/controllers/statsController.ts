import { Request, Response, NextFunction } from 'express';
import statsService from '../services/statsService';

const handleGetStats = async (req: Request, res: Response) => {
	const stats = await statsService.getStats();
	return stats;
};

export default {
	handleGetStats
};
