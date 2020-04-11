import { createConnection } from 'typeorm';
import { typeormConfig } from '../config/typeorm.config';
import { logger } from '../services/loggingService';

const init = async () => {
	await createConnection(typeormConfig);
	logger.info(`Connected to ${process.env.DATABASE_TYPE} successfully`);
};

export default {
	init
};
