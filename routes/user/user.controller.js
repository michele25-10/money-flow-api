const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');


//@desc get di tutti gli utenti di una famiglia
//@route GET /api/user/
//@access private
const getAllUserFamily = asyncHandler(async (req, res) => {
    const result = await User.selectAllUserFamily({ idFamiglia: req.user.idf });
    res.status(200).send(result);
});

module.exports = { getAllUserFamily }