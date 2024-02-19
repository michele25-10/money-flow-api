const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth/auth.route"));
router.use("/expense", require("./expense/expense.route"));
router.use("/category", require("./category/category.route"));
router.use("/authorization", require("./authorization/authorization.route"));
router.use("/user", require("./user/user.route"));
router.use("/family", require("./family/family.route"));

module.exports = router;