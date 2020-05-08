import { Application, Router } from 'express';
import statsRouter from './statsRouter';
import { routerConfig } from '../config/router.config';
import countryRouter from './countryRouter';
import testsAmountRouter from './testsAmountRouter';
import cacheRoutes from './cacheRoutes';

export const setupRouter = (app: Application) => {
	const router: Router = Router();

	statsRouter.setRoutes(router);
	countryRouter.setRoutes(router);
	testsAmountRouter.setRoutes(router);
	cacheRoutes.setRoutes(router);

	app.use(routerConfig.baseUrl, router);
};
