import { Router } from 'express';
import statsController from '../controllers/statsController';

const setRoutes = (router: Router) => {
	router.put('/stat', statsController.handleAddStats);
};

export default {
	setRoutes
};
