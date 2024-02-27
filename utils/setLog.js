const Log = require("../models/log.model");

const { tipoOperazioni } = require('../enums/tipo_operazioni');

/*
* @param idu
* @param tipoOperazione
* @param ipAddress
* @param token
* @param messaggioErrore
*/
const setLogOperazione = async ({ idu, tipoOperazione, ipAddress, token, body, messaggioErrore, tabella }) => {
    if (tipoOperazione === tipoOperazioni.login) {
        await Log.setLog(idu, tipoOperazione, ipAddress, token, JSON.stringify(body), messaggioErrore, tabella);
    }
    return;
}

module.exports = { setLogOperazione };