require('dotenv').config();
import * as path from 'path';
import type { ConnectionOptions } from 'typeorm';

const typeormConfig: ConnectionOptions = {
	type: process.env.DATABASE_TYPE,
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [__dirname + '/../models/*.{js,ts}'],
	synchronize: true,
	logging: process.env.NODE_ENV === 'development',
	ssl: process.env.NODE_ENV !== 'development',
	extra: {
		ssl: {
			rejectUnauthorized: false
		}
	},
	migrationsTableName: '__migrations__',
	migrations: [path.resolve(__dirname + '/../migrations/*.{js,ts}')],
	cli: {
		migrationsDir: path.resolve(__dirname + '/../migrations')
	}
};

/*
 * TypeOrm's migration tool requires common-js export to properly read the configuration.
 * */
module.exports = typeormConfig;
