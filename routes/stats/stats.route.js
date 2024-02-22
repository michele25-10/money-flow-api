const express = require('express');
const router = express.Router();

router.use("/category", require("./category/category.route"));
router.use("/expense", require("./expense/expense.route"));
router.use("/user", require("./user/user.route"));
router.use("/fixed-expense", require("./fixed-expense/fixedExpense.route"));

module.exports = router;