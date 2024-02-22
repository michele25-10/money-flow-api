const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const validate = require('../../../middleware/JoiValidation');
const validateToken = require('../../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", validate(userValidation.getMaxCategoryExpense), userController.getMaxCategoryExpense);

module.exports = router;