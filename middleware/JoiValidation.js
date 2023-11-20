//* Include joi to check error type 
const Joi = require('joi')

const validate = function (validator) {
    return async function (req, res, next) {
        try {
            const validated = validator.validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if (err.isJoi)
                return next()
            next()
        }
    }
}

module.exports = validate;  