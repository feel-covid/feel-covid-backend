import Redis from 'ioredis';
import { Connection } from 'typeorm';
import Sentry from '@sentry/node';

class Connections {
	public redis: Redis.Redis;
	public database: Connection;
	public sentry: typeof Sentry;

	setRedis(redis: Redis.Redis) {
		this.redis = redis;
		return this;
	}

	setDatabase(database: Connection) {
		this.database = database;
		return this;
	}

	setSentry(sentry: typeof Sentry) {
		this.sentry = sentry;
		return this;
	}
}

export default new Connections();
