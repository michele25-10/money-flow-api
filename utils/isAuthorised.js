const { checkAuthorization } = require("../models/authorization.model");

const isAuthorised = asyncHandler(async ({ idAuth, req }) => {
    if (req.user.dev) {
        return true;
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

    const result = await checkAuthorization({ id_auth: stringId, idu: req.user.idu });
    if (result.length != idAuth.length) {
        return false
    } else {
        return true;
    }
});

module.exports = isAuthorised; 