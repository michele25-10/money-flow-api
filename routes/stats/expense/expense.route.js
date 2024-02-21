const express = require('express');
const router = express.Router();

const expenseController = require('./expense.controller');
const expenseValidation = require('./expense.validation');
const validate = require('../../../middleware/JoiValidation');
const validateToken = require('../../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", validate(expenseValidation.getTotalExpense), expenseController.getTotalExpense);

module.exports = router;