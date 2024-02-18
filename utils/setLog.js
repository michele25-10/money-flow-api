const Log = require("../models/log.model");

/*
* @param idu
* @param tipoOperazione
* @param ipAddress
* @param token
* @param messaggioErrore
*/
const setLogOperazione = async ({ idu, tipoOperazione, ipAddress, token, body, messaggioErrore, tabella }) => {
    await Log.setLog(idu, tipoOperazione, ipAddress, token, JSON.stringify(body), messaggioErrore, tabella);
    return;
}

module.exports = { setLogOperazione };