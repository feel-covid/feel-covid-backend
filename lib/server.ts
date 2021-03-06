require('dotenv').config();
import './connectors/sentryConnector';
import './connectors/redisConnector';
import './connectors/typeormConnector';
import { setupRouter } from './api/setupRouter';
import { setupMiddlewares } from './middlewares';
import * as express from 'express';
import { logger } from './services/loggingService';

const main = async () => {
	const app: express.Application = express();
	setupMiddlewares(app);
	setupRouter(app);

	const PORT = process.env.NODE_PORT || 5000;
	app.listen(PORT, () => {
		logger.info(`Server started successfully on port ${PORT}`);
	});
};

main();
