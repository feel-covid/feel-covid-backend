import { Router } from 'express';
import countryController from '../controllers/countryController';

const setRoutes = (router: Router) => {
	// tslint:disable:jsdoc-format\

	router.get('/country/data', countryController.handleGetCountryData);
	router.get('/country/stats', countryController.handleGetCountryStats);
	router.get('/country/tests', countryController.handleGetCountryTests);
	router.post('/country', countryController.handleAddCountry);
};

export default {
	setRoutes
};
