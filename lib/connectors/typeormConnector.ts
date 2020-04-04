import { createConnection } from 'typeorm';
import { typeormConfig } from '../config/typeorm.config';

const init = async () => {
	await createConnection(typeormConfig);
	console.log(`Connected to ${process.env.DATABASE_TYPE} successfully`);
};

export default {
	init
};
