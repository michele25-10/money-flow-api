const asyncHandler = require('express-async-handler');
const Expense = require('../../../models/expense.model');
const isAuthorised = require("../../../utils/isAuthorised");
const { authList } = require('../../../enums/authorization');
const { chartColors } = require("../../../enums/chartColors");

const giorniSettimana = [
    "",
    "L",
    "M",
    "M",
    "G",
    "V",
    "S",
    "D"
];

const convertDaySql = (data) => {
    let result = [];
    for (let i = 1; i < 8; i++) {
        const obj = {
            position: i,
            giorno_settimana: giorniSettimana[i],
            tot: 0,
        }
        result.push(obj);
    }

    for (const row of data) {
        for (const giorno of result) {
            if (row.giorno_settimana === giorno.position) {
                giorno.tot = row.tot;
                break;
            }
        }
    }

    for (const giorno of result) {
        delete giorno.position;
    }


    return result;
}

const mesiAnno = [
    "",
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic"
];

const convertMonthSql = (data) => {
    let result = [];
    for (let i = 1; i < 13; i++) {
        const obj = {
            position: i,
            mese: mesiAnno[i],
            tot: 0,
        }
        result.push(obj);
    }

    for (const row of data) {
        for (const mese of result) {
            if (row.mese === mese.position) {
                mese.tot = row.tot;
                break;
            }
        }
    }

    for (const mese of result) {
        delete mese.position;
    }

    return result;
}

//@desc get del totale delle spese per categoria
//@route GET /api/stats/category
//@access private
const getTotalExpense = asyncHandler(async (req, res) => {
    let response = {};
    let typeWeek = req.query.type === "week" ? true : false;
    let typeYear = req.query.type === "year" ? true : false;
    const year = req.query.year ? req.query.year : new Date().getFullYear();

    if (req.query.dashboard) {
        const checkPermission = await isAuthorised({ idAuth: authList.dashboard, req });
        if (!checkPermission) {
            res.status(403);
            throw new Error();
        }

        response.totale = await Expense.selectTotalExpenseOfPeriod({ idf: req.user.idf, typeWeek, typeYear, year })
    } else {
        response.totale = await Expense.selectTotalExpenseOfPeriod({ idu: req.user.idu, typeWeek, typeYear, year })
    }

    //Visto che il totale non ha tutti i giorni/mesi della settimana io devo ciclare 
    //l'oggetto per renderlo il più possibile adeguato al frontend
    if (typeWeek) {
        response.color = "orange";
        response.totale = convertDaySql(response.totale);
    }

    if (typeYear) {
        response.color = "#8884d8";
        response.totale = convertMonthSql(response.totale);
    }

    res.status(200).send(response);
});

module.exports = { getTotalExpense }