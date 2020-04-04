require('dotenv').config();
import typeormConnector from './connectors/typeormConnector';
import { setupRouter } from './routes';
import scrapingService from './services/scrapingService';
import { setupMiddlewares } from './middlewares';
import * as express from 'express';

const initServerComponents = async () => {
	await typeormConnector.init();
	await scrapingService.init();
};

const main = async () => {
	const app: express.Application = express();

	setupMiddlewares(app);
	setupRouter(app);

	await initServerComponents();

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
		console.log(`Server started successfully on port ${PORT}`);
	});
};

main();
