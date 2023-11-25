const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/user.model');
const { constants } = require('../../enums/constants');
const { hash } = require('../../utils/crypto');
const Log = require('../../models/log.model');

//@desc accedere con un utente
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
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
            await Log.setLog(req.ip, true, accessToken, JSON.stringify(req.body));
            res.status(200).send({
                accessToken: accessToken
            });
        } else {
            await Log.setLog(req.ip, false, null, JSON.stringify(req.body));
            res.status(constants.UNAUTHORIZED).send({ message: "Credenziali erratte" });
        }
    } else {
        await Log.setLog(req.ip, false, null, JSON.stringify(req.body));
        res.status(constants.NOT_FOUND).send({ message: "Credenziali erratte" });
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const hashedPassword = hash(password);
    const result = await User.changePassword(hashedPassword, req.user.id);
    if (result) {
        res.status(201).send({ message: "Password cambiata" });
    } else {
        res.status(constants.SERVER_ERROR).send({ message: "Internal server error" });
    }
});

module.exports = { loginUser, changePassword };