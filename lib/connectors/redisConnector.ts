import Redis from 'ioredis';
import { logger } from '../services/loggingService';
import { Connector } from './Connector';

export class RedisConnector implements Connector {
	connect(): Promise<Redis.Redis> {
		return new Promise((resolve, reject) => {
			const redis = new Redis({
				host: process.env.REDIS_HOST,
				port: process.env.REDIS_PORT as any
			});

			redis.on('connect', () => {
				logger.info(`Connected to Redis successfully`);
				resolve(redis);
			});

			redis.on('error', ex => {
				logger.error(`Failed connecting to Redis`, { ex });
				reject(ex);
			});
		});
	}

	// tslint:disable-next-line:no-empty
	close() {}
}
