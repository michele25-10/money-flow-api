const Joi = require('joi');

const getTotalExpense = {
    query: Joi.object().keys({
        year: Joi.number().integer(),
        dashboard: Joi.boolean(),
        type: Joi.string().valid("week", "year").required(),
    }),
};

module.exports = { getTotalExpense };