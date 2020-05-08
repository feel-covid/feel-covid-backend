import { Router } from 'express';
import testsAmountController from '../controllers/testsAmountController';

const setRoutes = (router: Router) => {
	router.post('/tests-amount', testsAmountController.handleAddTestAmount);
};

export default {
	setRoutes
};
