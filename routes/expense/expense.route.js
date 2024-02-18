const express = require('express');
const router = express.Router();

const expenseController = require('./expense.controller');
const expenseValidation = require('./expense.validation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", expenseController.getAllExpense);
router.post("/", validate(expenseValidation.postExpense), expenseController.postExpense);
router.put("/:id", validate(expenseValidation.putExpense), expenseController.putExpense);
router.delete("/:id", validate(expenseValidation.deleteExpense), expenseController.deleteExpense);
router.get("/:id", validate(expenseValidation.getExpenseById), expenseController.getExpenseById);


module.exports = router;