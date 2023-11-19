const express = require('express');
const router = express.Router();

const { loginUser } = require('./users.controller');
const userValidation = require('./users.validation');
const validate = require('../../middleware/JoiValidation');
//const validateToken = require('../middleware/validateTokenHandler');

router.post('/login', validate(userValidation.login), loginUser);

module.exports = router;