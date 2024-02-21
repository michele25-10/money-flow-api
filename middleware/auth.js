const asyncHandler = require('express-async-handler');
const connFunction = require("../utils/executeMySql");

const auth = asyncHandler(async (idAuth, res, req, next) => {
    if (req.user.dev) {
        next();
    }

    let stringId = "";
    if (typeof idAuth === 'array') {
        for (const auth of idAuth) {
            stringId += auth + ",";
        }
        stringaID = stringId.substring(0, stringId.length - 1);
    } else if (typeof idAuth === 'number') {
        stringId = idAuth;
    }

    const mysql = `
    SELECT au.id_autorizzazione, au.valore 
    FROM autorizzazione_utente au 
    WHERE au.id_autorizzazione IN (@id_auth) AND au.id_utente=@idu AND au.valore='1'`;

    const result = await connFunction.query(mysql, { id_auth: stringId, idu: req.user.idu });
    if (result.length != idAuth.length) {
        res.status(403);
        throw new Error();
    } else {
        next();
    }
});

module.exports = auth; 