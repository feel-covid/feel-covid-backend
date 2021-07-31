import { Connection, createConnection } from 'typeorm';
import { logger } from '../services/loggingService';
import type { ConnectionOptions } from 'typeorm';
import path from 'path';
import { Connector } from './Connector';

export class TypeormConnector implements Connector {
	private readonly config: ConnectionOptions;
	private connection: Connection;

	constructor() {
		this.config = {
			type: 'postgres',
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
		}

		if (process.env.NODE_ENV !== 'development') {
			Object.assign(
				this.config,
				{
					ssl: true,
					extra: {
						ssl: {
							rejectUnauthorized: false
						}
					}
				}
			);
		}
	}

	async connect() {
		this.connection = await createConnection(this.config);
		logger.info(`Connected to PostgreSQL successfully on port ${process.env.DATABASE_PORT}`);
		return this.connection;
	}

	async close() {
		await this.connection.close();
	}
}
