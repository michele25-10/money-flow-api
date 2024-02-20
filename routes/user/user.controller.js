const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const Authorization = require('../../models/authorization.model');
const { hash } = require('../../utils/crypto');
const { setLogOperazione } = require('../../utils/setLog');

//@desc get di tutti gli utenti di una famiglia
//@route GET /api/user/
//@access private
const getAllUserFamily = asyncHandler(async (req, res) => {
    const result = await User.selectAllUserFamily({ idFamiglia: req.user.idf });
    res.status(200).send(result);
});

//@desc post di un utente
//@route POST /api/user/
//@access private
const postUser = asyncHandler(async (req, res) => {
    if (req.user.dev) {
        const password = hash("P@ssw0rd");

        const result = await User.insertUser({
            nome: req.body.nome,
            cognome: req.body.cognome,
            email: req.body.email,
            telefono: req.body.telefono,
            flag_genitore: req.body.flagGenitore,
            password,
            id_famiglia: req.body.idFamiglia,
        });

        const autorizzazioni = await Authorization.selectAllAuthorization();

        const user = await User.selectIdUserByEmail({ email: req.body.email });
        if (user.length != 1) {
            res.status(500);
            throw Error();
        }


        for (const auth of autorizzazioni) {
            console.log(auth);
            const insertAuthUser = await Authorization.insertAuthorizationUser({
                id_autorizzazione: auth.id,
                id_utente: user[0].id,
                valore: 1,
            });
            if (insertAuthUser.affectedRows != 1) {
                res.status(500);
                throw new Error();
            }
        }

        res.status(200).send({ message: "Utente inserito con successo" });
    } else {
        res.status(401);
        throw new Error();
    }
});

//@desc post di un utente
//@route POST /api/user/
//@access private
const putUser = asyncHandler(async (req, res) => {
    const result = User.updateUser({
        nome: req.body.nome,
        cognome: req.body.cognome,
        email: req.body.email,
        telefono: req.body.telefono,
        img: req.body.img ? req.body.img : null,
    }, { id: req.user.idu })

    if (result.affectedRows != 1) {
        setLogOperazione({
            idu: req.user.idu,
            tipoOperazione: tipoOperazioni.inserimento,
            ipAddress: req.ip,
            token: req.headers.Authorization || req.headers.authorization,
            body: req.body,
            tabella: "utente",
            messaggioErrore: "Inserimento famiglia fallito",
        });
        res.status(500);
        throw new Error();
    }

    setLogOperazione({
        idu: req.user.idu,
        tipoOperazione: tipoOperazioni.inserimento,
        ipAddress: req.ip,
        token: req.headers.Authorization || req.headers.authorization,
        body: req.body,
        tabella: "utente",
    });

    res.status(200).send({ message: "Modificato profilo con successo" });

});
module.exports = { getAllUserFamily, postUser, putUser, }