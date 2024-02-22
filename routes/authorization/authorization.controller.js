const asyncHandler = require('express-async-handler');
const Authorization = require('../../models/authorization.model');
const { tipoOperazioni } = require('../../enums/tipo_operazioni');
const { setLogOperazione } = require('../../utils/setLog');

//@desc get di tutte le autorizzazioni
//@route GET /api/authorization/
//@access private
const getAllAuthorization = asyncHandler(async (req, res) => {
    const result = await Authorization.selectAllAuthorization();
    res.status(200).send(result);
});

//@desc get di tutte le autorizzazioni dell'utente che richiede
//@route GET /api/authorization/
//@access private
const getAllAuthorizationUser = asyncHandler(async (req, res) => {
    const result = await Authorization.selectAllAuthorizationUser({ idu: req.query.idUser });

    res.status(200).send(result);
});

//@desc modifica dell'autorizzazione di un utente
//@route PUT /api/authorization/
//@access private
const putAuthorizationUser = asyncHandler(async (req, res) => {
    const result = await Authorization.updateAuthorizationUser({ idAuthorization: req.params.idAuthorization, idu: req.body.idu, valore: req.body.valore });

    if (result.affectedRows != 1) {
        setLogOperazione({
            idu: req.user.idu,
            tipoOperazione: tipoOperazioni.modifica,
            ipAddress: req.ip,
            token: req.headers.Authorization || req.headers.authorization,
            body: req.body,
            tabella: "autorizzazione_utente",
            messaggioErrore: "Modifica autorizzazione fallita",
        });
        throw new Error();
    }

    setLogOperazione({
        idu: req.user.idu,
        tipoOperazione: tipoOperazioni.modifica,
        ipAddress: req.ip,
        token: req.headers.Authorization || req.headers.authorization,
        body: req.body,
        tabella: "autorizzazione_utente",
    });

    res.status(200).send({ message: "Autorizzazione modificata con successo" });
});

module.exports = { getAllAuthorization, getAllAuthorizationUser, putAuthorizationUser }