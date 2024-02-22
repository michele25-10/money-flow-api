const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const Authorization = require('../../models/authorization.model');
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
            const response = {};

            if (objUser.dev) {
                response.dev = objUser.dev;
            }

            const accessToken = jwt.sign({
                /* Payload incorporato all'interno del token */
                user: {
                    idu: objUser.id,
                    genitore: objUser.flag_genitore ? true : false,
                    idf: objUser.id_famiglia,
                    dev: objUser.dev,
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
            response.accessToken = accessToken;

            response.name = objUser.nome + " " + objUser.cognome;

            const authUser = await Authorization.selectAllAuthorizationUser({ idu: objUser.id });
            response.auth = authUser;

            if (req.body.ricordami) {
                const credentialsString = JSON.stringify({ famiglia, email, password });
                const hashCredentials = encrypt(credentialsString, process.env.SECRET_KEY);
                //gli ultimi 32 caratteri corrisponderanno all'iv
                response.ricordami = hashCredentials.encryptedText + hashCredentials.iv;
            }

            res.status(200).send(response);
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
    const { newPassword, oldPassword } = req.body;

    if (newPassword === oldPassword) {
        res.status(201);
        res.send({ message: "Password modificata con successo" });
        return;
    }

    if (hash(oldPassword) === await User.getPassword(req.user.idu)) {
        const hashedPassword = hash(newPassword);
        const result = await User.changePassword(hashedPassword, req.user.idu);
        if (result) {
            res.status(201).send({ message: "Password modifica con successo" });
        } else {
            res.status(constants.SERVER_ERROR);
            throw Error();
        }
    } else {
        res.status(constants.FORBIDDEN);
        throw Error("La vecchia password non è corretta");
    }
});

module.exports = { loginUser, changePassword };