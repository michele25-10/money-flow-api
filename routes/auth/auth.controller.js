const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const { constants } = require('../../enums/constants');
const { hash } = require('../../utils/crypto');
const Log = require('../../models/log.model');
const { setLogOperazione } = require('../../utils/setLog');
const { tipoOperazioni } = require('../../enums/tipo_operazioni');

//@desc accedere con un utente
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { famiglia, email, password } = req.body;

    const hashedPassword = hash(password);

    const objUser = await User.login(email, famiglia);

    if (objUser) {
        if (hashedPassword === objUser.password) {
            const accessToken = jwt.sign({
                /*Payload incorporato all'interno del token */
                user: {
                    idu: objUser.id,
                    genitore: objUser.flag_genitore ? true : false,
                    idf: objUser.id_famiglia,
                    nome_famiglia: famiglia,
                    nome: objUser.nome,
                    cognome: objUser.cognome,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: req.body.mobile ? "8760h" : "1h" });
            await setLogOperazione({
                idu: objUser.id,
                tipoOperazione: tipoOperazioni.login,
                ipAddress: req.ip,
                token: accessToken,
                body: req.body,
                messaggioErrore: null
            });
            res.status(200).send({
                accessToken: accessToken
            });
        } else {
            await setLogOperazione({
                idUtente: objUser.id,
                tipoOperazione: tipoOperazioni.login,
                ipAddress: req.ip,
                token: accessToken,
                body: req.body,
                messaggioErrore: "Credenziali Erratte"
            });
            res.status(constants.UNAUTHORIZED).send({ message: "Credenziali erratte" });
        }
    } else {
        await setLogOperazione({
            idUtente: objUser.id,
            tipoOperazione: tipoOperazioni.login,
            ipAddress: req.ip,
            token: accessToken,
            body: req.body,
            messaggioErrore: "Credenziali Erratte"
        });
        res.status(constants.NOT_FOUND).send({ message: "Credenziali erratte" });
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const hashedPassword = hash(password);
    const result = await User.changePassword(hashedPassword, req.user.id);
    if (result) {
        res.status(201).send({ message: "Password cambiata" });
    } else {
        res.status(constants.SERVER_ERROR).send({ message: "Errore del server" });
    }
});

module.exports = { loginUser, changePassword };