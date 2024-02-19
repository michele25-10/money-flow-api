const connFunction = require('../utils/executeMySql');

const Authorization = {
    selectAllAuthorization: async () => {
        const mysql = "select id, nome, descrizione from autorizzazione where 1=1"
        const result = await connFunction.query(mysql, {})
        return result;
    },
    selectAllAuthorizationUser: async ({ idu }) => {
        const mysql = "select a.id, a.nome, a.descrizione, IF(au.valore=1, TRUE, FALSE) as valore from autorizzazione a inner join autorizzazione_utente au on au.id_utente=@idu and au.id_autorizzazione=a.id where 1=1"
        const result = await connFunction.query(mysql, { idu })
        return result;
    },
    updateAuthorizationUser: async ({ idu, idAuthorization, valore }) => {
        const result = await connFunction.update("autorizzazione_utente", { valore }, "id_utente=@idu and id_autorizzazione=@idAuthorization", { idu, idAuthorization },);
        return result;
    },
    insertAuthorizationUser: async ({ id_utente, id_autorizzazione, valore }) => {
        const result = await connFunction.insert("autorizzazione_utente", {
            valore, id_utente, id_autorizzazione
        });
        return result;
    }
}

module.exports = Authorization;