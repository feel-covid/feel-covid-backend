import { Router } from 'express';
import countryController from '../controllers/countryController';

const setRoutes = (router: Router) => {
	router.post('/country', countryController.handleAddCountry);
};

export default {
	setRoutes
};
