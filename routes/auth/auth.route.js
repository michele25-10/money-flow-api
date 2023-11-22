const express = require('express');
const router = express.Router();

const { loginUser } = require('./auth.controller');
const userValidation = require('./auth.validation');
const validation = require('../../middleware/JoiValidation');
//const validateToken = require('../middleware/validateTokenHandler');

router.post('/login', validation(userValidation.login), loginUser);

module.exports = router;