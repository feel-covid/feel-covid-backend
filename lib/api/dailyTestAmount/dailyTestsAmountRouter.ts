import { Router } from 'express';
import testsAmountController from './dailyTestsAmountController';

const setRoutes = (router: Router) => {
	router.put('/daily-test-amount', testsAmountController.handleCreateOrUpdateTestAmount)
};

export default {
	setRoutes
};
