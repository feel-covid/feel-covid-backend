import { Router } from 'express';
import testsAmountController from '../controllers/testsAmountController';

const setRoutes = (router: Router) => {
	router.put('/tests-amount', testsAmountController.handleCreateOrUpdateTestAmount)
};

export default {
	setRoutes
};
