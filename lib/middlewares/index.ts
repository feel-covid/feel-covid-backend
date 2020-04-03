import { Application } from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';

export const setupMiddlewares = (app: Application) => {
	app.use(helmet());
	app.use(compression());
};
