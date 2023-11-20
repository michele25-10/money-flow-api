const express = require('express');
const router = express.Router();

const { loginUser } = require('./auth.controller');
const userValidation = require('./auth.validation');
const validate = require('../../middleware/JoiValidation');
//const validateToken = require('../middleware/validateTokenHandler');

console.log(userValidation.login);

router.post('/login', validate(userValidation.login), loginUser);

module.exports = router;