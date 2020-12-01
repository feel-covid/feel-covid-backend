import { Router } from 'express';
import statsController from './hourlyUpdateController';

const setRoutes = (router: Router) => {
	router.put('/hourly-updates', statsController.handleAddStats);
};

export default {
	setRoutes
};
