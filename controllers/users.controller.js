const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const conn = require('../config/dbConnection');

//@desc registrare un utente
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, nome, cognome, password, auth, level } = req.body;
    if (!username || !nome || !cognome || !password || !auth || !level) {
        res.status(400);
        throw new Error("Tutti i campi sono obbligatori");
    }
    //controllo che la mail non sia già all'interno del database
    let mysql = "SELECT id FROM `user` WHERE username = '" + username + "';";

    await conn.query(mysql, function (err, rows) {
        if (rows.length > 0) {
            res.status(400);
            throw new Error("Utente già esistente");
        }
    });
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //creo l'utente
    mysql = "INSERT INTO `user` (username, password, nome, cognome, auth, level) VALUES ('" + username + "','" + hashedPassword + "','" + nome + "','" + cognome + "','" + auth + "','" + level + "');";

    await conn.query(mysql, function (err, rows) {
        if (err) {
            res.status(404);
            throw new Error("Registrazione fallita");
        } else {
            res.status(201).json({ id: rows.insertId });
        }
    })
});

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

module.exports = { loginUser, registerUser };