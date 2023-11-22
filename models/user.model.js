const conn = require('../config/dbConnection');

var value;

const User = {
    login: async (username) => {
        const result = await conn.query(`SELECT id, password, username, auth, level FROM \`user\` WHERE username = '${username}'`, (err, rows) => {
            if (err) {
                throw new Error(err);
            }
            if (rows.length == 1) {
                value = rows[0];
            } else {
                value = null;
            }
        })
        return value;
    }
}

module.exports = User;