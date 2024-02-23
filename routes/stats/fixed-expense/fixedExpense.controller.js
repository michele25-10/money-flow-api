const asyncHandler = require('express-async-handler');
const Category = require('../../../models/category.model');
const isAuthorised = require("../../../utils/isAuthorised");
const { authList } = require('../../../enums/authorization');
const { chartColors } = require("../../../enums/chartColors");

//@desc get del totale delle spese per categoria
//@route GET /api/stats/category
//@access private
const getFixedExpenseDataOfYear = asyncHandler(async (req, res) => {
    const response = [];

    const checkPermission = await isAuthorised({ idAuth: authList.speseFisse, req });
    if (!checkPermission) {
        res.status(403);
        throw new Error();
    }

    const result = await Category.selectFixedExpenseOfYear({ idf: req.user.idf, year: req.query.year });

    let position = 0;
    let id = 1;
    for (const row of result) {
        for (let i = position; i < result.length; i++) {
            if (row.nome === result[i].nome) {
                const obj = {
                    id,
                    name: row.nome
                }
                obj[row.anno] = row.tot;
                obj[result[i].anno] = result[i].tot;

                response.push(obj);
                id++;
            }
        }
        position++;
    }

    const totAnno = await Category.selectTotalFixedExpenseOfYear({ idf: req.user.idf, year: req.query.year });

    const objTot = {
        id,
        name: "TOTALE",
    };

    for (const row of totAnno) {
        objTot[row.name] = row.value;
    }

    response.push(objTot);

    res.status(200).send(response);
});

//@desc get del totale delle spese per categoria negli anni in confronto
//@route GET /api/stats/category
//@access private
const getTotalFixedExpenseOfYear = asyncHandler(async (req, res) => {
    const response = {};
    const checkPermission = await isAuthorised({ idAuth: authList.speseFisse, req });
    if (!checkPermission) {
        res.status(403);
        throw new Error();
    }

    response.chartData = await Category.selectTotalFixedExpenseOfYear({ idf: req.user.idf, year: req.query.year });
    let i = 0;
    for (const row of response.chartData) {
        if (i === 0) {
            row.color = "#8884d8";
        } else {
            row.color = "#ff8042";
        }
        i++;
    }

    res.status(200).send(response);
});


module.exports = { getFixedExpenseDataOfYear, getTotalFixedExpenseOfYear }