import { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import { validateApiKey } from './validateApiKey';

export const setupMiddlewares = (app: Application) => {
	app.use(helmet());
	app.use(cors());
	app.use(bodyParser.json());
	app.use(compression());
	app.post('*', validateApiKey);
	app.put('*', validateApiKey);
};
