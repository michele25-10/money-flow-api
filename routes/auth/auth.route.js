const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.post('/login', validate(authValidation.login), authController.loginUser);

router.all('*', validateToken);
router.put("/change-password", validate(authValidation.changePassword), authController.changePassword);

module.exports = router;