const asyncHandler = require('express-async-handler');
const Log = require('../../models/log.model');

//@desc get di tutti i log di sistema
//@route GET /api/log/
//@access private
const getAllLog = asyncHandler(async (req, res) => {
    if (req.user.dev) {
        const result = await Log.selectAllLog();
        res.status(200).send(result);
    } else {
        res.status(401);
        throw new Error();
    }
});

module.exports = { getAllLog }