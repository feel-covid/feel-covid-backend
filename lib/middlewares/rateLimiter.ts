import * as RateLimit from 'express-rate-limit';
import * as RedisStore from 'rate-limit-redis';
import { redis } from '../connectors/redisConnector';
import { rateLimiterConfig } from '../config/rateLimiter.config';

export const limiter = new RateLimit({
	store: new RedisStore({
		client: redis
	}),
	...rateLimiterConfig
});
