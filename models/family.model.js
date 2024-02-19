const connFunction = require('../utils/executeMySql');

const Family = {
    insertFamily: async ({ nome, n_componenti, utente_mongo_db, ip_mongo_db, password_mongo_db }) => {
        const result = await connFunction.insert("famiglia", { nome, n_componenti, utente_mongo_db, ip_mongo_db, password_mongo_db })
        return result;
    },
    updateFamily: async ({ nome, n_componenti, utente_mongo_db, ip_mongo_db, password_mongo_db }, { id }) => {
        const result = await connFunction.update("famiglia", { nome, n_componenti, utente_mongo_db, ip_mongo_db, password_mongo_db }, "id=@id", { id })
        return result;
    }
}

module.exports = Family;