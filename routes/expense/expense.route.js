const express = require('express');
const router = express.Router();

const expenseController = require('./expense.controller');
const expenseValidation = require('./expense.validation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
router.post("/", validate(expenseValidation.addExpense), expenseController.addExpense);


module.exports = router;