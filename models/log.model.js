const query = require('../utils/query');
const { queryMethods } = require('../enums/queryMethods');
const Log = {
    setLog: async (idu, tipoOperazione, ipAddress, token, body, messaggioErrore, dataora = new Date()) => {
        const mysql = `INSERT INTO log(id_utente, tipo_operazione, ip_address, token, body, dataora, messaggio_errore) VALUES ('${idu}','${tipoOperazione}', '${ipAddress}', '${token}', '${body}', '${dataora.toISOString()}', '${messaggioErrore ? messaggioErrore : null}')`;
        const result = await query(mysql, queryMethods.INSERT);
        return result;
    }
}

module.exports = Log;   