const connFunction = require('../utils/executeMySql');

const Authorization = {
    selectAllAuthorization: async () => {
        const mysql = "select id, nome, descrizione from autorizzazione where 1=1"
        const result = await connFunction.query(mysql, {})
        return result;
    },
    selectAllAuthorizationUser: async ({ idu }) => {
        const mysql = "select a.id, a.nome, a.descrizione from autorizzazione inner join autorizzazione_utente au on au.id_utente=@idu and au.id_autorizzazione=a.id where 1=1"
        const result = await connFunction.query(mysql, { idu })
        return result;
    },
}

module.exports = Authorization;