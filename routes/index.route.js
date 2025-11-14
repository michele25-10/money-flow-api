const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth/auth.route"));
router.use("/expense", require("./expense/expense.route"));
router.use("/category", require("./category/category.route"));
router.use("/authorization", require("./authorization/authorization.route"));
router.use("/user", require("./user/user.route"));
router.use("/family", require("./family/family.route"));
router.use("/log", require("./log/log.route"));
router.use("/stats", require("./stats/stats.route"));

module.exports = router;
