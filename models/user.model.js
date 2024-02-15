const query = require('../utils/query');
const { queryMethods } = require('../enums/queryMethods');

const User = {
    login: async (email, famiglia) => {
        const mysql = `select u.id, u.nome, u.cognome, u.password, u.flag_genitore, f.id as id_famiglia 
        from utente u
        inner join famiglia f on f.nome LIKE '${famiglia}' and f.id = u.id_famiglia 
        where u.email = '${email}';`;

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