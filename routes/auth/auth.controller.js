const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const { constants } = require('../../enums/constants');
const { hash, encrypt } = require('../../utils/crypto');
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
                /* Payload incorporato all'interno del token */
                user: {
                    idu: objUser.id,
                    genitore: objUser.flag_genitore ? true : false,
                    idf: objUser.id_famiglia,
                    nome_famiglia: famiglia,
                    nome: objUser.nome,
                    cognome: objUser.cognome,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: req.body.mobile ? "4320h" : "1h" });
            await setLogOperazione({
                idu: objUser.id,
                tipoOperazione: tipoOperazioni.login,
                ipAddress: req.ip,
                token: accessToken,
                body: req.body,
                messaggioErrore: null
            });

            if (req.body.ricordami) {
                const credentialsString = JSON.stringify({ famiglia, email, password });
                const hashCredentials = encrypt(credentialsString, process.env.SECRETKEY);
                //gli ultimi 32 caratteri corrisponderanno all'iv
                res.status(200).send({
                    accessToken: accessToken,
                    ricordami: hashCredentials.encryptedText + hashCredentials.iv
                })
            }

            res.status(200).send({
                accessToken: accessToken
            });
        } else {
            res.status(constants.UNAUTHORIZED);
            throw Error("Credenziali erratte");
        }
    } else {
        res.status(constants.NOT_FOUND);
        throw Error("Credenziali erratte");
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const hashedPassword = hash(password);
    const result = await User.changePassword(hashedPassword, req.user.id);
    if (result) {
        res.status(201).send({ message: "Password cambiata" });
    } else {
        res.status(constants.SERVER_ERROR);
    }
});

module.exports = { loginUser, changePassword };