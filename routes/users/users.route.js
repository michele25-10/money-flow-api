const express = require('express');
const router = express.Router();

const { loginUser } = require('./users.controller');
const validate = require('joi');
//const validateToken = require('../middleware/validateTokenHandler');

router.post('/login', loginUser);

module.exports = router;