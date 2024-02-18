const express = require('express');
const router = express.Router();

const categoryController = require('./auth.controller');
//const categoryValidation = require('./auth.validation');
//const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", categoryController.getAllCategory);

module.exports = router;