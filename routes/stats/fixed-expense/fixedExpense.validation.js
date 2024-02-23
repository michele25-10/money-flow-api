const Joi = require('joi');

const getFixedExpenseDataOfYear = {
    query: Joi.object().keys({
        year: Joi.number().integer().required(),
    }),
};

const getTotalFixedExpenseOfYear = {
    query: Joi.object().keys({
        year: Joi.number().integer().required(),
    }),
};

const analyseFixedExpenseOfYear = {
    query: Joi.object().keys({
        year: Joi.number().integer().required(),
    }),
};

module.exports = { getFixedExpenseDataOfYear, getTotalFixedExpenseOfYear, analyseFixedExpenseOfYear };