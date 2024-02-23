const asyncHandler = require('express-async-handler');
const Category = require('../../../models/category.model');
const isAuthorised = require("../../../utils/isAuthorised");
const { authList } = require('../../../enums/authorization');
const { chartColors } = require("../../../enums/chartColors");
const { convertMonthSql } = require("../../../utils/mySqlDate");

//@desc get del totale delle spese per categoria
//@route GET /api/stats/fixed-expense/
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
//@route GET /api/stats/fixed-expense/total
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

//@desc get delle spese fisse di ogni mese per l'anno corrente e l'anno in analisi
//@route GET /api/stats/fixed-expense/analyse
//@access private
const analyseFixedExpenseOfYear = asyncHandler(async (req, res) => {
    const year = req.query.year ? req.query.year : new Date().getFullYear();
    const response = {};
    response.chartData = [
        { name: "Gen" },
        { name: "Feb" },
        { name: "Mar" },
        { name: "Apr" },
        { name: "Mag" },
        { name: "Giu" },
        { name: "Lug" },
        { name: "Ago" },
        { name: "Set" },
        { name: "Ott" },
        { name: "Nov" },
        { name: "Dic" },
    ];

    const checkPermission = await isAuthorised({ idAuth: authList.speseFisse, req });
    if (!checkPermission) {
        res.status(403);
        throw new Error();
    }

    const currentYear = new Date().getFullYear();
    let result = await Category.analyseFixedExpenseOfYear({ idf: req.user.idf, year: currentYear });
    const resultCurrentYear = convertMonthSql(result);
    for (const i in resultCurrentYear) {
        response.chartData[i][currentYear] = resultCurrentYear[i].tot;
    }

    result = await Category.analyseFixedExpenseOfYear({ idf: req.user.idf, year });
    const resultLastYear = convertMonthSql(result);
    for (const i in resultLastYear) {
        response.chartData[i][year] = resultLastYear[i].tot;
    }

    response.dataKey = [
        {
            name: year,
            color: "#8884d8",
        },
        {
            name: currentYear,
            color: "#ff8042",
        },
    ]

    res.status(200).send(response);
});

module.exports = { getFixedExpenseDataOfYear, getTotalFixedExpenseOfYear, analyseFixedExpenseOfYear }