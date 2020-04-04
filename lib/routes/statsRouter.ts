import { Router } from 'express';
import statsController from '../controllers/statsController';

const setRoutes = (router: Router) => {
	router.post('/stat', statsController.handleAddStats);
};

export default {
	setRoutes
};
