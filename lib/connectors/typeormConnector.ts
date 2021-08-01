import { Connection, createConnection } from 'typeorm';
import { logger } from '../logger';
import type { ConnectionOptions } from 'typeorm';
import { Connector } from './Connector';
import * as connectionConfig from '../config/typeorm.config';

export class TypeormConnector implements Connector {
	private connection: Connection;

	async connect() {
		this.connection = await createConnection(connectionConfig as ConnectionOptions);
		logger.info(`Connected to PostgreSQL successfully on port ${process.env.DATABASE_PORT}`);
		return this.connection;
	}

	async close() {
		await this.connection.close();
	}
}
