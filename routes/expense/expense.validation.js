const Joi = require('joi');

const postExpense = {
    body: Joi.object().keys({
        luogo: Joi.string().max(100).required(),
        data: Joi.date().required(),
        importo: Joi.number().precision(2).required(),
        descrizione: Joi.string().max(100),
        tipoPagamento: Joi.string().valid("0", "1").required(),
        categoria: Joi.number().integer().required(),
        documento: Joi.string().allow(null, ""),
    })
};

const putExpense = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        luogo: Joi.string().max(100).required(),
        data: Joi.date().required(),
        importo: Joi.number().precision(2).required(),
        descrizione: Joi.string().max(100),
        tipoPagamento: Joi.string().valid("0", "1").required(),
        categoria: Joi.number().integer().required(),
        documento: Joi.string().allow(null, ""),
    })
};

const deleteExpense = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};

const getExpenseById = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    })
};


module.exports = { postExpense, putExpense, deleteExpense, getExpenseById };