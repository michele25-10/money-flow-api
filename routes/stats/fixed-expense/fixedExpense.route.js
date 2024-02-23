const express = require('express');
const router = express.Router();

const fixedExpenseController = require('./fixedExpense.controller');
const fixedExpenseValidation = require('./fixedExpense.validation');
const validate = require('../../../middleware/JoiValidation');
const validateToken = require('../../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", validate(fixedExpenseValidation.getFixedExpenseDataOfYear), fixedExpenseController.getFixedExpenseDataOfYear);
router.get("/total", validate(fixedExpenseValidation.getTotalFixedExpenseOfYear), fixedExpenseController.getTotalFixedExpenseOfYear);
router.get("/analyse", validate(fixedExpenseValidation.analyseFixedExpenseOfYear), fixedExpenseController.analyseFixedExpenseOfYear);

module.exports = router;