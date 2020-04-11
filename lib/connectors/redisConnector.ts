import * as Redis from 'ioredis';
import { logger } from '../services/loggingService';

export const redis = new Redis({
	port: (process.env.REDIS_PORT as unknown) as number
});

redis.on('connect', () => {
	logger.info(`Connected to Redis successfully`);
});
