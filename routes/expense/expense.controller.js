const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Expense = require('../../models/expense.model');
const { constants } = require('../../enums/constants');
const { hash, encrypt } = require('../../utils/crypto');
const { setLogOperazione } = require('../../utils/setLog');
const { tipoOperazioni } = require('../../enums/tipo_operazioni');

//@desc inserire una spesa
//@route POST /api/expense/
//@access private
const addExpense = asyncHandler(async (req, res) => {
    const result = Expense.insertExpense({ ...req.body, idu: req.user.idu });

    if (result.affectedRows != 1) {
        setLogOperazione({
            idu: req.user.idu,
            tipoOperazione: tipoOperazioni.inserimento,
            ipAddress: req.ip,
            token: req.headers.Authorization || req.headers.authorization,
            body: req.body,
            tabella: "spesa",
            messaggioErrore: "Inserimento fallito",
        });
        throw new Error();
    }

    setLogOperazione({
        idu: req.user.idu,
        tipoOperazione: tipoOperazioni.inserimento,
        ipAddress: req.ip,
        token: req.headers.Authorization || req.headers.authorization,
        body: req.body,
        tabella: "spesa",
    });

    res.status(201).json({ message: 'Spesa inserita con successo' });
});

module.exports = { addExpense };