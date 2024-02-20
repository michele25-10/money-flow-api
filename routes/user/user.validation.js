const Joi = require('joi');

const postUser = {
    body: Joi.object().keys({
        nome: Joi.string().max(30).required(),
        cognome: Joi.string().max(30).required(),
        email: Joi.string().max(50).required(),
        telefono: Joi.string().length(10).required(),
        flagGenitore: Joi.number().integer().valid(0, 1).required(),
        idFamiglia: Joi.number().integer().required(),
    })
};

const putUser = {
    body: Joi.object().keys({
        nome: Joi.string().max(30).required(),
        cognome: Joi.string().max(30).required(),
        email: Joi.string().max(50).required(),
        telefono: Joi.string().length(10).required(),
        img: Joi.string().allow(null, "")
    })
};

module.exports = { postUser, putUser };