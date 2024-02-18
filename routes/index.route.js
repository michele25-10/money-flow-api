const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth/auth.route"));
router.use("/expense", require("./expense/expense.route"));

module.exports = router;