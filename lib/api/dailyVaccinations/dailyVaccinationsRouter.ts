import { Router } from 'express';
import dailyVaccinationsController from './dailyVaccinationsController';

const setRoutes = (router: Router) => {
	router.put(
		'/daily-vaccinations',
		dailyVaccinationsController.handleCreateOrUpdateDailyVaccinations
	);
};

export default {
	setRoutes
};
