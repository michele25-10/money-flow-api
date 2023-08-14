const express = require('express');
const jwt = require('json-web-token');
const asyncHandler = require('express-async-handler');

//@desc accedere con un utente
//@route POST /api/users/login
//@access public
const login = asyncHandler(async (req, res) => {

});

module.exports = { login };