const Joi = require('joi');

const putAuthorizationUser = {
    params: Joi.object().keys({
        idAuthorization: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        valore: Joi.number().integer().valid(0, 1).required(),
        idu: Joi.string().required()
    })
};

const getAllAuthorizationUser = {
    query: Joi.object().keys({
        idUser: Joi.string().required(),
    }),
};

module.exports = { putAuthorizationUser, getAllAuthorizationUser };