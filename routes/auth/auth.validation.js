const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        famiglia: Joi.string().max(30).required(),
        email: Joi.string().max(50).required(),
        password: Joi.string().required(),
        mobile: Joi.boolean(),
        ricordami: Joi.boolean()
    })
};

const changePassword = {
    body: Joi.object().keys({
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    })
}

module.exports = { login, changePassword };