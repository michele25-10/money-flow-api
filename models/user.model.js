const connFunction = require('../utils/executeMySql');

const User = {
    login: async (email, famiglia) => {
        const mysql = `select u.id, u.nome, u.cognome, u.password, u.flag_genitore, f.id as id_famiglia 
        from utente u
        inner join famiglia f on f.nome LIKE @famiglia and f.id = u.id_famiglia 
        where u.email = @email;`;

        const result = await connFunction.query(mysql, { email, famiglia });

        if (result.length == 1) {
            return result[0];
        } else {
            return false;
        }
    },
    changePassword: async (password, id) => {
        const result = await connFunction.update(
            "utente",
            { password },
            "id=@id",
            { id }
        );
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    },
    getPassword: async (id) => {
        const mysql = "select password from utente where id=@id";
        const result = await connFunction.query(mysql, { id });
        return result[0].password;
    },
    selectAllUserFamily: async ({ idFamiglia }) => {
        const mysql = "select id, nome, cognome, telefono, email, img, if(flag_genitore=1, TRUE, FALSE) as flag_genitore from utente where id_famiglia=@idFamiglia";
        const result = await connFunction.query(mysql, { idFamiglia });
        return result;
    }
}

module.exports = User;