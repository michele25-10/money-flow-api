//* Include joi to check error type 
const { constants } = require('../constants');
const errorHandler = require('./errorHandler');

const joiValidate = (schema, obj, res) => {
    try {
        const value = schema.validate(obj);
        if (value.error) {
            throw new Error(constants.VALIDATION_ERROR);
        } else {
            return value.value;
        };
    } catch (err) {
        if (err.isJoi) {
            res.status(constants.VALIDATION_ERROR);
        }
        res.status(constants.VALIDATION_ERROR);
    }
};

const validation = (schema) => {
    return async function (req, res, next) {
        // Oggetto da validare
        if ('body' in schema) {
            const bodyValidate = schema.body;
            req.body = joiValidate(bodyValidate, req.body, res);
        }
        if ('query' in schema) {
            const queryValidate = schema.query;
            req.query = joiValidate(queryValidate, req.query, res);
        }
        if ('params' in schema) {
            const paramsValidate = schema.params;
            req.params = joiValidate(paramsValidate, req.params, res);
        }

        if (res.statusCode === constants.VALIDATION_ERROR) {
            errorHandler("Validation Error", req, res, next);
        } else {
            next();
        }
    }
}

module.exports = validation;  