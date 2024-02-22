const express = require('express');
const router = express.Router();

router.use("/category", require("./category/category.route"));
router.use("/expense", require("./expense/expense.route"));
router.use("/user", require("./user/user.route"));

module.exports = router;