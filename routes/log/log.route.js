const express = require('express');
const router = express.Router();

const LogController = require('./log.controller');
//const userValidation = require('./log.validation');
//const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", LogController.getAllLog);


module.exports = router;