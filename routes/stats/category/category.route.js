const express = require('express');
const router = express.Router();

const categoryController = require('./category.controller');
const categoryValidation = require('./category.validation');
const validate = require('../../../middleware/JoiValidation');
const validateToken = require('../../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", validate(categoryValidation.getExpenseCategory), categoryController.getExpenseCategory);

module.exports = router;