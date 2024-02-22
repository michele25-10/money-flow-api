const Joi = require('joi');

const getFixedExpenseDataOfYear = {
    query: Joi.object().keys({
        year: Joi.number().integer().required(),
    }),
};

module.exports = { getFixedExpenseDataOfYear };