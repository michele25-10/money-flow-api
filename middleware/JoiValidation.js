//* Include joi to check error type 
const Joi = require('joi')

module.exports = function (validator) {
    return async function (req, res, next) {
        try {
            const validated = validator.validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if (err.isJoi)
                return next(createHttpError(422, { message: err.message }))
            next(createHttpError(500))
        }
    }
}