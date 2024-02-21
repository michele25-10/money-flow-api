const Authorization = require("../models/authorization.model");
const asyncHandler = require('express-async-handler');

const isAuthorised = asyncHandler(async ({ idAuth, req }) => {
    if (req.user.dev) {
        return true;
    }
    let isNumber = false;
    let stringId = "";
    if (typeof idAuth === 'array') {
        for (const auth of idAuth) {
            stringId += auth + ",";
        }
        stringaID = stringId.substring(0, stringId.length - 1);
    } else if (typeof idAuth === 'number') {
        stringId = idAuth;
        isNumber = true;
    }

    const result = await Authorization.checkAuthorization({ id_auth: stringId, idu: req.user.idu });
    if (isNumber) {
        return result.length != 1 ? false : true;
    } else {
        return result.length != idAuth.length ? false : true;
    }
});

module.exports = isAuthorised; 