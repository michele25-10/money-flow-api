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
    },
    selectAllLog: async () => {
        const mysql = `
        select l.id, concat(u.nome, " ", u.cognome) as nome_cognome, l.tipo_operazione, l.ip_address, l.dataora, l.token, l.body, l.tabella, l.messaggio_errore
        from log l
        inner join utente u on u.id=l.id_utente
        where 1=1
        order by l.dataora desc`;

        const result = await connFunction.query(mysql, {});
        return result;
    }
}

module.exports = Log;   