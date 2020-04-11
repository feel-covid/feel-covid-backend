import { Application } from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { validateApiKey } from './validateApiKey';
import { limiter } from './rateLimiter';

export const setupMiddlewares = (app: Application) => {
	app.use(helmet());
	app.use(cors());
	app.use(bodyParser.json());
	app.use(compression());
	app.use(limiter);
	app.post('*', validateApiKey);
};
