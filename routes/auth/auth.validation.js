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
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$')).required(),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().strict()
    })
}

module.exports = { login, changePassword };