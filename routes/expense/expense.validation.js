const Joi = require('joi');

const postExpense = {
    body: Joi.object().keys({
        luogo: Joi.string().max(100).required(),
        data: Joi.date().required(),
        importo: Joi.number().precision(2).required(),
        descrizione: Joi.string().max(100),
        tipoPagamento: Joi.boolean().required(),
        categoria: Joi.number().integer().required(),
        document: Joi.string(),
    })
}

const putExpense = {
    params: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        luogo: Joi.string().max(100).required(),
        data: Joi.date().required(),
        importo: Joi.number().precision(2).required(),
        descrizione: Joi.string().max(100),
        tipoPagamento: Joi.boolean().required(),
        categoria: Joi.number().integer().required(),
        document: Joi.string(),
    })
}


module.exports = { postExpense, putExpense };