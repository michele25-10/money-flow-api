const Joi = require('joi');

const getExpenseCategory = {
    query: Joi.object().keys({
        year: Joi.number().integer(),
        dashboard: Joi.boolean(),
    }),
};

module.exports = { getExpenseCategory };