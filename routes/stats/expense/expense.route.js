const express = require('express');
const router = express.Router();

const expenseController = require('./expense.controller');
const expenseValidation = require('./expense.validation');
const validate = require('../../../middleware/JoiValidation');
const validateToken = require('../../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", validate(expenseValidation.getTotalExpense), expenseController.getTotalExpense);
router.get("/family", validate(expenseValidation.getTotalExpenseFamilyYear), expenseController.getTotalExpenseFamilyYear);
router.get("/analyse", validate(expenseValidation.AnalyseTotalExpenseFamily), expenseController.AnalyseTotalExpenseFamily);

module.exports = router;