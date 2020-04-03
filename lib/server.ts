require('dotenv').config();
import scrapingService from './services/scrapingService';
import { setupMiddlewares } from './middlewares';
import * as express from 'express';

const main = async () => {
	const app: express.Application = express();

	setupMiddlewares(app);

	scrapingService.init();

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
		console.log(`Server started successfully on port ${PORT}`);
	});
};

main();
