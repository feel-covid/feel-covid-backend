import { Router } from 'express';
import dailyStatsController from '../controllers/dailyIRDController';

const setRoutes = (router: Router) => {
	router.put('/daily-stats', dailyStatsController.handleCreateOrUpdateDailyStats);
};

export default {
	setRoutes
};
