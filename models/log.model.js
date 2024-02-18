const connFunction = require('../utils/executeMySql');

const Log = {
    setLog: async (idu, tipoOperazione, ipAddress, token, body, messaggioErrore, tabella, dataora = new Date()) => {
        const result = await connFunction.insert("log", {
            id_utente: idu,
            tipo_operazione: tipoOperazione,
            ip_address: ipAddress,
            token,
            body,
            tabella,
            dataora: dataora.toISOString(),
            messaggio_errore: messaggioErrore ? messaggioErrore : null
        });
        return result;
    }
}

module.exports = Log;   