const Joi = require('joi');

const postFamily = {
    body: Joi.object().keys({
        nome: Joi.string().max(30).required(),
        nComponenti: Joi.number().integer().required(),
        utenteMongoDb: Joi.string().max(60),
        ipMongoDb: Joi.string().max(15),
        passwordMongoDb: Joi.string().max(60)
    })
};

const putFamily = {
    params: Joi.object().keys({
        id: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
        nome: Joi.string().max(30).required(),
        nComponenti: Joi.number().integer().required(),
        utenteMongoDb: Joi.string().max(60),
        ipMongoDb: Joi.string().max(15),
        passwordMongoDb: Joi.string().max(60)
    })
};

module.exports = { postFamily, putFamily };