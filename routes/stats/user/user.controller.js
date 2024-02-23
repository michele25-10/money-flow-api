const asyncHandler = require('express-async-handler');
const Category = require('../../../models/category.model');
const isAuthorised = require("../../../utils/isAuthorised");
const { authList } = require('../../../enums/authorization');
// const { chartColors } = require("../../../enums/chartColors");

//@desc get del nome e totale della spesa più costosa per ogni utente
//@route GET /api/stats/user/
//@access private
const getMaxCategoryExpense = asyncHandler(async (req, res) => {
    const response = {};
    const year = req.query.year ? req.query.year : new Date().getFullYear();

    const checkPermission = await isAuthorised({ idAuth: authList.dashboard, req });
    if (!checkPermission) {
        res.status(403);
        throw new Error();
    }

    const result = await Category.selectMaxCategoryExpenseForUser({ idf: req.user.idf, year })

    response.genitori = [];
    response.figli = [];

    for (const row of result) {
        if (row.flag_genitore) {
            response.genitori.push(row);
        } else {
            response.figli.push(row);
        }
    }

    res.status(200).send(response);
});

module.exports = { getMaxCategoryExpense }