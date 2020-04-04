import { Router } from 'express';
import countryController from '../controllers/countryController';

const setRoutes = (router: Router) => {
	router.get('/country', countryController.handleGetCountry);
	router.post('/country', countryController.handleAddCountry);
};

export default {
	setRoutes
};
