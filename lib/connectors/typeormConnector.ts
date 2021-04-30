import { createConnection } from 'typeorm';
import { logger } from '../services/loggingService';
import type { ConnectionOptions } from 'typeorm';
import path from 'path';

const main = async () => {
	const sslConfig = {
		ssl: true,
		extra: {
			ssl: {
				rejectUnauthorized: false
			}
		}
	}

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

		migrationsTableName: '__migrations__',
		migrations: [path.resolve(__dirname + '/../migrations/*.{js,ts}')],
		cli: {
			migrationsDir: path.resolve(__dirname + '/../migrations')
		}
	};

	if (process.env.NODE_ENV !== 'development') {
		Object.assign(typeormConfig, sslConfig);
	}

	await createConnection(typeormConfig as ConnectionOptions);

	logger.info(`Connected to ${process.env.DATABASE_TYPE} successfully`);
}

main();
