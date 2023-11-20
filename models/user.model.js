const conn = require('../config/dbConnection');

const User = {
    login: async () => {
        return await conn.query(`SELECT id, password, username, auth, level FROM \`user\` WHERE username = '${username}'`, (err, rows) => {
            if (err) {
                throw new Error(err);
            }
            if (rows) {
                return rows;
            }
        })
    }
}

module.exports = { User };