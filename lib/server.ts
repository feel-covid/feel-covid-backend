import scrapingService from './services/scrapingService';

require('dotenv').config();
import typeormConnector from './connectors/typeormConnector';
import { setupRouter } from './routes';
import { setupMiddlewares } from './middlewares';
import * as express from 'express';
import './connectors/redisConnector';
import './connectors/sentryConnector';
import { logger } from './services/loggingService';

const initServerComponents = async () => {
	await typeormConnector.init();
};

const main = async () => {
	await initServerComponents();

	const app: express.Application = express();
	setupMiddlewares(app);

	setupRouter(app);

	const PORT = process.env.NODE_PORT || 5000;
	app.listen(PORT, () => {
		logger.info(`Server started successfully on port ${PORT}`);
	});
};

main();
