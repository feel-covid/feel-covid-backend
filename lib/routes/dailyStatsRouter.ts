import { Router } from 'express';
import dailyStatsController from '../controllers/dailyStatsController';

const setRoutes = (router: Router) => {
	router.put('/daily-stats', dailyStatsController.handleCreateOrUpdateDailyStats);
};

export default {
	setRoutes
};
