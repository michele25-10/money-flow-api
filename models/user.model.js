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
    },
    changePassword: async (password, id) => {
        const mysql = `UPDATE \`user\` SET password = '${password}' WHERE id = '${id}'`;
        const result = await query(mysql, queryMethods.UPDATE);
        if (result === 1) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = User;