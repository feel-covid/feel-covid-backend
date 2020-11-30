import { Router } from 'express';
import testsAmountController from '../controllers/dailyTestsAmountController';

const setRoutes = (router: Router) => {
	router.put('/tests-amount', testsAmountController.handleCreateOrUpdateTestAmount)
};

export default {
	setRoutes
};
