import { createConnection } from 'typeorm';
import * as typeormConfig from '../config/typeorm.config';
import { logger } from '../services/loggingService';
import type { ConnectionOptions } from 'typeorm';

const main = async () => {
	await createConnection(typeormConfig as ConnectionOptions);
	logger.info(`Connected to ${process.env.DATABASE_TYPE} successfully`);
}

main();
