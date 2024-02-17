const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth/auth.route"));
router.use("/spesa", require("./spesa/spesa.route"));

module.exports = router;