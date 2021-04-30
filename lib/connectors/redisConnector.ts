import Redis from 'ioredis';
import { logger } from '../services/loggingService';

export const redis = new Redis({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT as any
});

redis.on('connect', () => {
	logger.info(`Connected to Redis successfully`);
});
