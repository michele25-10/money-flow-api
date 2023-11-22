//* validators/post.validator.js
const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        username: Joi.string().max(30).required(),
        password: Joi.string().required()
    })
};

module.exports = { login };