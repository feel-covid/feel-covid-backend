import { Application } from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { validateApiKey } from './validateApiKey';

export const setupMiddlewares = (app: Application) => {
	app.use(bodyParser.json());
	app.use(helmet());
	app.use(compression());
	app.post('*', validateApiKey);
};
