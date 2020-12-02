import { Router } from 'express';
import cacheController from './cacheController';

const setRoutes = (router: Router) => {
	router.post('/cache/clear', cacheController.handleClearCache);
};

export default {
	setRoutes
};
