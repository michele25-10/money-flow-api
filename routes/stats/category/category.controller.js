const asyncHandler = require('express-async-handler');
const Category = require('../../../models/category.model');
const isAuthorised = require("../../../utils/isAuthorised");
const { authList } = require('../../../enums/authorization');
const { chartColors } = require("../../../enums/chartColors");

//@desc get del totale delle spese per categoria
//@route GET /api/stats/category
//@access private
const getExpenseCategory = asyncHandler(async (req, res) => {
    const response = {};
    const year = req.query.year ? req.query.year : new Date().getFullYear();

    if (req.query.dashboard) {
        if (!isAuthorised(authList.dashboard, req)) {
            res.status(403);
            throw new Error();
        }

        response.topTen = await Category.selectTotExpenseForCategory({ idf: req.user.idf, year, limit: 10 })
    } else {
        response.topTen = await Category.selectTotExpenseForCategory({ idu: req.user.idu, year, limit: 10 })
        response.pieChart = await Category.selectTotExpenseForCategory({ idu: req.user.idu, year, limit: chartColors.length })

        let i = 0;
        for (const row of response.pieChart) {
            row.color = chartColors[i];
            i++;
        }
    }

    res.status(200).send(response);
});

module.exports = { getExpenseCategory }