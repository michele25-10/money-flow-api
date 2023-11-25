const query = require('../utils/query');
const { queryMethods } = require('../enums/queryMethods');

const User = {
    login: async (username) => {
        const mysql = `SELECT id, password, username, auth, level FROM \`user\` WHERE username = '${username}'`;
        const result = await query(mysql, queryMethods.SELECT);
        if (result.length == 1) {
            return result[0];
        } else {
            return false;
        }
    }
}

module.exports = User;