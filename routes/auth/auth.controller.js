const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const conn = require('../../config/dbConnection');
const User = require('../../models/user.model');
const constants = require('../../constants');

//@desc accedere con un utente
//@route POST /api/users/login
//@access public
loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const objUser = await User.login(username);

    if (objUser) {
        bcrypt.compare(password, objUser.password, (err, result) => {
            if (result) {
                const accessToken = jwt.sign({
                    /*Payload incorporato all'interno del token */
                    user: {
                        id: objUser.id,
                        username: objUser.username,
                        auth: objUser.auth,
                        level: objUser.level
                    }
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            } else {
                res.status(constants.UNAUTHORIZED);
            }
        });
    } else {
        res.status(constants.NOT_FOUND);
    }
});

module.exports = { loginUser };