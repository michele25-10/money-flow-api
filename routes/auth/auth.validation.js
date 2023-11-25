const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        username: Joi.string().max(30).required(),
        password: Joi.string().required()
    })
};

const changePassword = {
    body: Joi.object().keys({
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    })
}

module.exports = { login, changePassword };