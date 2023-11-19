//* validators/post.validator.js
const Joi = require('joi');

const login = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().required()
});

module.exports = login;