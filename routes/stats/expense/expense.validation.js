const Joi = require('joi');

const getTotalExpense = {
    query: Joi.object().keys({
        year: Joi.number().integer(),
        dashboard: Joi.boolean(),
        type: Joi.string().valid("week", "year").required(),
    }),
};

const getTotalExpenseFamilyYear = {
    query: Joi.object().keys({
        year: Joi.number().integer(),
    }),
};

const AnalyseTotalExpenseFamily = {
    query: Joi.object().keys({
        year: Joi.number().integer(),
    }),
};

const AverageExpense = {
    query: Joi.object().keys({
        year: Joi.number().integer(),
        dashboard: Joi.boolean(),
    }),
};

module.exports = { getTotalExpense, getTotalExpenseFamilyYear, AnalyseTotalExpenseFamily, AverageExpense };