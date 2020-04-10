import * as Redis from 'ioredis';

export const redis = new Redis({
	port: (process.env.REDIS_PORT as unknown) as number
});

redis.on('connect', () => {
	console.log('Connected to Redis Successfully');
});
