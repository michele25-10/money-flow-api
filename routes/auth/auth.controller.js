const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const constants = require('../../constants');
const { hash } = require('../../utils/crypto');

//@desc accedere con un utente
//@route POST /api/users/login
//@access public
loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = hash(password);

    const objUser = await User.login(username);

    if (objUser) {

        if (hashedPassword === objUser.password) {
            const accessToken = jwt.sign({
                /*Payload incorporato all'interno del token */
                user: {
                    id: objUser.id,
                    username: objUser.username,
                    auth: objUser.auth,
                    level: objUser.level
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            res.status(200).send({
                accessToken: accessToken
            });
        } else {
            res.status(constants.UNAUTHORIZED);
        }
    } else {
        res.status(constants.NOT_FOUND);
    }
});

module.exports = { loginUser };