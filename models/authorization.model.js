const connFunction = require('../utils/executeMySql');

const Authorization = {
    selectAllAuthorization: async () => {
        const mysql = "select id, nome, descrizione from autorizzazione where 1=1"
        const result = await connFunction.query(mysql, {})
        return result;
    }
}

module.exports = Authorization;