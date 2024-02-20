const asyncHandler = require('express-async-handler');
const Family = require('../../models/family.model');
const { tipoOperazioni } = require('../../enums/tipo_operazioni');
const { setLogOperazione } = require('../../utils/setLog');


//@desc inserimento nuova famiglia
//@route POST /api/user/
//@access private
const postFamily = asyncHandler(async (req, res) => {
    if (req.user.dev) {
        const result = await Family.insertFamily({
            nome: req.body.nome,
            n_componenti: req.body.nComponenti,
            utente_mongo_db: req.body.utenteMongoDb,
            ip_mongo_db: req.body.ipMongoDb,
            password_mongo_db: req.body.passwordMongoDb
        });

        if (result.affectedRows != 1) {
            setLogOperazione({
                idu: req.user.idu,
                tipoOperazione: tipoOperazioni.inserimento,
                ipAddress: req.ip,
                token: req.headers.Authorization || req.headers.authorization,
                body: req.body,
                tabella: "famiglia",
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
            tabella: "famiglia",
        });

        res.status(201).send({ message: 'Famiglia inserita con successo' });
    } else {
        res.status(401);
        throw new Error();
    }
});

//@desc Modifica famiglia
//@route PUT /api/user/
//@access private
const putFamily = asyncHandler(async (req, res) => {
    if (req.user.dev) {
        const result = await Family.updateFamily({
            nome: req.body.nome,
            n_componenti: req.body.nComponenti,
            utente_mongo_db: req.body.utenteMongoDb,
            ip_mongo_db: req.body.ipMongoDb,
            password_mongo_db: req.body.passwordMongoDb
        }, { id: req.params.id });

        if (result.affectedRows != 1) {
            setLogOperazione({
                idu: req.user.idu,
                tipoOperazione: tipoOperazioni.inserimento,
                ipAddress: req.ip,
                token: req.headers.Authorization || req.headers.authorization,
                body: req.body,
                tabella: "famiglia",
                messaggioErrore: "Modifica famiglia fallito",
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
            tabella: "famiglia",
        });

        res.status(201).send({ message: 'Famiglia modificata con successo' });
    } else {
        res.status(401);
        throw new Error();
    }
});

module.exports = { postFamily, putFamily }