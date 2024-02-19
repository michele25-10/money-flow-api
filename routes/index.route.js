const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth/auth.route"));
router.use("/expense", require("./expense/expense.route"));
router.use("/category", require("./category/category.route"));
router.use("/authorization", require("./authorization/authorization.route"));

module.exports = router;