const express = require('express');
const router = express.Router();

//const spesaController = require('./spesa.controller');
//const spesaValidation = require('./spesavalidation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
//router.post("/", validate(spesaValidation.addSpesa), spesaController.addSpesa);

module.exports = router; 