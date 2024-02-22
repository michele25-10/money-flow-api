const Joi = require('joi');

const getMaxCategoryExpense = {
    query: Joi.object().keys({
        year: Joi.number().integer()
    }),
};

module.exports = { getMaxCategoryExpense };