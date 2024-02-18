const asyncHandler = require('express-async-handler');
const Expense = require('../../models/expense.model');
const { setLogOperazione } = require('../../utils/setLog');
const { tipoOperazioni } = require('../../enums/tipo_operazioni');

//@desc inserire una spesa
//@route POST /api/expense/
//@access private
const postExpense = asyncHandler(async (req, res) => {
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

//@desc update spesa
//@route PUT /api/expense/:id
//@access private
const putExpense = asyncHandler(async (req, res) => {
    const result = Expense.updateExpense({ ...req.body, idu: req.user.idu, idRow: req.params.id });

    if (result.affectedRows != 1) {
        setLogOperazione({
            idu: req.user.idu,
            tipoOperazione: tipoOperazioni.modifica,
            ipAddress: req.ip,
            token: req.headers.Authorization || req.headers.authorization,
            body: req.body,
            tabella: "spesa",
            messaggioErrore: "Modifica fallita",
        });
        throw new Error();
    }

    setLogOperazione({
        idu: req.user.idu,
        tipoOperazione: tipoOperazioni.modifica,
        ipAddress: req.ip,
        token: req.headers.Authorization || req.headers.authorization,
        body: req.body,
        tabella: "spesa",
    });

    res.status(200).json({ message: 'Spesa inserita con successo' });
});

//@desc delete spesa
//@route DELETE /api/expense/:id
//@access private
const deleteExpense = asyncHandler(async (req, res) => {
    const result = Expense.deleteExpense({ id: req.params.id });

    if (result.affectedRows != 1) {
        setLogOperazione({
            idu: req.user.idu,
            tipoOperazione: tipoOperazioni.eliminazione,
            ipAddress: req.ip,
            token: req.headers.Authorization || req.headers.authorization,
            body: req.body,
            tabella: "spesa",
            messaggioErrore: "Eliminazione fallita",
        });
        throw new Error();
    }

    setLogOperazione({
        idu: req.user.idu,
        tipoOperazione: tipoOperazioni.eliminazione,
        ipAddress: req.ip,
        token: req.headers.Authorization || req.headers.authorization,
        body: req.body,
        tabella: "spesa",
    });

    res.status(200).json({ message: 'Spesa eliminata con successo' });
});

//@desc delete spesa
//@route GET /api/expense/
//@access private
const getExpenseById = asyncHandler(async (req, res) => {
    const result = Expense.selectExpenseById({ id: req.params.id, idu: req.user.idu, flagGenitore: req.user.genitore });

    if (result.length != 1) {
        throw new Error();
    }

    res.status(200).json(result);
});

//@desc delete spesa
//@route GET /api/expense/
//@access private
const getAllExpense = asyncHandler(async (req, res) => {
    const result = Expense.selectExpense({ idu: req.user.idu, flagGenitore: req.user.genitore });

    res.status(200).json(result);
});


module.exports = { postExpense, putExpense, deleteExpense, getExpenseById, getAllExpense };