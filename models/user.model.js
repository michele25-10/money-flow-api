const conn = require('../config/dbConnection');
const bcrypt = require('bcrypt');

function verifyPassword(passwordQuery, password) {
    if (bcrypt.compare(password, passwordQuery)) {
        return true;
    } else {
        return false;
    }
}

async function login(username, password) {
    const mysql = "SELECT id, password, username, auth, level FROM `user` WHERE username = '" + username + "' AND status='0'; ";
    await conn.query(mysql, function (err, rows, fields) {
        if (err) {
            throw err;
        }
        if (rows.length == 1) {
            if (verifyPassword(rows[0].password, password) == true) {
                conn.end();
                res.send({
                    id: rows[0].id,
                    username: rows[0].username,
                    auth: rows[0].auth,
                    level: rows[0].level
                });
            } else {
                throw "Password o email erratta";
            };
        } else {
            throw "Internal error";
        }
    });
}

module.exports = { login }; 