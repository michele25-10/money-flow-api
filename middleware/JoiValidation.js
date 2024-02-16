//* Include joi to check error type 
const { constants } = require('../enums/constants');

const joiValidate = (schema, obj, res) => {
    try {
        const value = schema.validate(obj);
        if (value.error) {
            res.status(constants.VALIDATION_ERROR);
            throw Error(value.error);
        } else {
            return value.value;
        };
    } catch (err) {
        if (err.isJoi) {
            res.status(constants.VALIDATION_ERROR);
            throw Error(err.isJoi);
        }
        console.error(err);
        throw Error(err);
    }
};

const validate = (schema) => {
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

        if (res.statusCode === 200) {
            next();
        } else {
            throw Error()
        }
    }
}

module.exports = validate;  