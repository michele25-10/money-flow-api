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
                    nome: row.nome
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
        nome: "TOTALE",
    };

    for (const row of totAnno) {
        objTot[row.anno] = row.totale;
    }

    response.push(objTot);

    res.status(200).send(response);
});

module.exports = { getFixedExpenseDataOfYear }