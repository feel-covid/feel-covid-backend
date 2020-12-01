import { Application, Router } from 'express';
import hourlyUpdatesRouter from './hourlyUpdates/hourlyUpdateRouter';
import countryRouter from './country/countryRouter';
import dailyTestsAmountRouter from './dailyTestAmount/dailyTestsAmountRouter';
import cacheRoutes from './cache/cacheRoutes';
import dailyIRDRouter from './dailyIRD/dailyIRDRouter';

export const setupRouter = (app: Application) => {
	const router: Router = Router();
	const routers = [hourlyUpdatesRouter, countryRouter, dailyTestsAmountRouter, cacheRoutes, dailyIRDRouter];

	routers.forEach(r => r.setRoutes(router))

	app.use('/api', router);
};
