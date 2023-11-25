const express = require('express');
const router = express.Router();

const { loginUser, changePassword } = require('./auth.controller');
const userValidation = require('./auth.validation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.post('/login', validate(userValidation.login), loginUser);
router.put("/change-password", validate(userValidation.changePassword), changePassword);

module.exports = router;