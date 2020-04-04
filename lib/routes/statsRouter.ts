import { Router } from 'express';
import statsController from '../controllers/statsController';

const setRoutes = (router: Router) => {
	router.get('/stats', statsController.handleGetStats);
};

export default {
	setRoutes
};
