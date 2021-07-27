import { Router } from 'express';
import countryController from './countryController';

const setRoutes = (router: Router) => {
	router.get('/country/data', countryController.handleGetCountryData);
	router.get('/country/daily-ird', countryController.getCountryDailyIRD);
	router.get(
		'/country/daily-test-amount',
		countryController.getCountryDailyTestAmount
	);
	router.post('/country', countryController.handleAddCountry);
};

export default {
	setRoutes
};
