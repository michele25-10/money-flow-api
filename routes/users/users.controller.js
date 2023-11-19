const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const conn = require('../../config/dbConnection');

//@desc accedere con un utente
//@route POST /api/users/login
//@access public
loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Tutti i campi sono obbligatori");
    }

    const mysql = "SELECT id, password, username, auth, level FROM `user` WHERE username = '" + username + "' AND status='0'; ";

    await conn.query(mysql, function (err, rows) {
        if (err) {
            res.status(500);
            throw new Error(err);
        }
        if (rows.length == 1) {
            bcrypt.compare(password, rows[0].password, function (err, result) {
                if (result == true) {
                    const accessToken = jwt.sign({
                        /*Payload incorporato all'interno del token */
                        user: {
                            id: rows[0].id,
                            username: rows[0].username,
                            auth: rows[0].auth,
                            level: rows[0].level
                        }
                    },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "1h" });
                    res.status(200).json({ accessToken });
                } else {
                    res.status(400);
                    throw new Error("Password o email erratta");
                };
            });
        } else {
            res.status(500);
            throw new Error("Internal error");
        }
    });
});

module.exports = { loginUser };