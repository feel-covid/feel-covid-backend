import Redis from 'ioredis';
import { Connection } from 'typeorm';

class Connections {
	public redis: Redis.Redis;
	public database: Connection;

	setRedis(redis: Redis.Redis) {
		this.redis = redis;
		return this;
	}

	setDatabase(database: Connection) {
		this.database = database;
		return this;
	}
}

export default new Connections();
