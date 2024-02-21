const express = require('express');
const router = express.Router();

router.use("/category", require("./category/category.route"));
router.use("/expense", require("./expense/expense.route"));

module.exports = router;