import { Router } from 'express';
import dailyStatsController from './dailyIRDController';

const setRoutes = (router: Router) => {
	router.put('/daily-ird', dailyStatsController.handleCreateOrUpdateDailyStats);
};

export default {
	setRoutes
};
