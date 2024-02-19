const asyncHandler = require('express-async-handler');
const Authorization = require('../../models/authorization.model');

//@desc get di tutte le autorizzazioni
//@route GET /api/authorization/
//@access private
const getAllAuthorization = asyncHandler(async (req, res) => {
    const result = await Authorization.selectAllAuthorization();
    res.status(200).send(result);
});

//@desc get di tutte le autorizzazioni
//@route GET /api/authorization/
//@access private
const getAllAutorizzazioniUser = asyncHandler(async (req, res) => {
    const result = await Authorization.selectAllAuthorizationUser();
    res.status(200).send(result);
});

module.exports = { getAllAuthorization }