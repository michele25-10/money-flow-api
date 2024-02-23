const asyncHandler = require('express-async-handler');
const Expense = require('../../../models/expense.model');
const User = require('../../../models/user.model');
const isAuthorised = require("../../../utils/isAuthorised");
const { authList } = require('../../../enums/authorization');
const { chartColors } = require("../../../enums/chartColors");
const { convertMonthSql, convertDaySql } = require("../../../utils/mySqlDate");

//@desc get del totale delle spese per categoria
//@route GET /api/stats/
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

        response.chartData = await Expense.selectTotalExpenseOfPeriod({ idf: req.user.idf, typeWeek, typeYear, year })
    } else {
        response.chartData = await Expense.selectTotalExpenseOfPeriod({ idu: req.user.idu, typeWeek, typeYear, year })
    }

    //Visto che il totale non ha tutti i giorni/mesi della settimana io devo ciclare 
    //l'oggetto per renderlo il più possibile adeguato al frontend
    if (typeWeek) {
        response.color = "orange";
        response.chartData = convertDaySql(response.chartData);
    }

    if (typeYear) {
        response.color = "#8884d8";
        response.chartData = convertMonthSql(response.chartData);
    }

    res.status(200).send(response);
});

//@desc get del totale delle spese per utente in un anno
//@route GET /api/stats/family
//@access private
const getTotalExpenseFamilyYear = asyncHandler(async (req, res) => {
    const year = req.query.year ? req.query.year : new Date().getFullYear();

    const checkPermission = await isAuthorised({ idAuth: authList.dashboard, req });
    if (!checkPermission) {
        res.status(403);
        throw new Error();
    }

    const response = await Expense.selectAllExpenseFamilyYear({ idf: req.user.idf, year })

    let i = 0;
    for (const row of response) {

        row.color = chartColors[i];
        i++;
    }

    res.status(200).send(response);
})

//@desc get del totale delle spese per ogni utente in un anno
//@route GET /api/stats/analyse
//@access private
const AnalyseTotalExpenseFamily = asyncHandler(async (req, res) => {
    const year = req.query.year ? req.query.year : new Date().getFullYear();
    let response = {};
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

    const checkPermission = await isAuthorised({ idAuth: authList.dashboard, req });
    if (!checkPermission) {
        res.status(403);
        throw new Error();
    }

    const userFamily = await User.selectAllUserFamily({ idFamiglia: req.user.idf });
    response.dataKey = [];
    let i = 0;
    for (const row of userFamily) {
        let dataUserExpense = await Expense.selectTotalExpenseOfPeriod({ idu: row.id, typeYear: true, year });
        dataUserExpense = convertMonthSql(dataUserExpense);
        const nomeCognome = row.nome + "_" + row.cognome;
        for (const i in dataUserExpense) {
            response.chartData[i][nomeCognome] = dataUserExpense[i].tot;
        }

        const objColor = {
            name: nomeCognome,
            color: chartColors[i],
            id: i
        }
        response.dataKey.push(objColor);
        i++
    }
    res.status(200).send(response);
});

const calculatePercentuage = (lastAverage, currentAverage) => {
    return parseInt(((currentAverage / lastAverage) * 100) - 100);
}

//@desc spesa media famiglia o utente del mese o annoa + dati per grafico
//@route GET /api/stats/average
//@access private
const AverageExpense = asyncHandler(async (req, res) => {
    let response = {};
    const year = req.query.year ? req.query.year : new Date().getFullYear();

    if (req.query.dashboard) {
        const checkPermission = await isAuthorised({ idAuth: authList.dashboard, req });
        if (!checkPermission) {
            res.status(403);
            throw new Error();
        }

        const averageMonth = await Expense.selectAverageExpenseOfPeriod({ idf: req.user.idf, typeMonth: true });
        const percentuageMonth = calculatePercentuage(averageMonth[0].last_average, averageMonth[0].current_average);
        const dataMonth = await Expense.selectAllExpenseOfPeriod({ idf: req.user.idf, typeMonth: true });
        response.month = {
            percentuage: percentuageMonth,
            amount: averageMonth[0].total,
            chartData: dataMonth,
            name: "Famiglia",
            surname: "",
            when: "Questo mese",
            color: "yellow",
        }

        const averageYear = await Expense.selectAverageExpenseOfPeriod({ idf: req.user.idf, typeYear: true });
        const percentuageYear = calculatePercentuage(averageYear[0].last_average, averageYear[0].current_average);
        const dataYear = await Expense.selectAllExpenseOfPeriod({ idf: req.user.idf, typeYear: true });
        response.year = {
            percentuage: percentuageYear,
            amount: averageYear[0].total,
            chartData: dataYear,
            name: "Famiglia",
            surname: "",
            when: "Quest'anno",
            color: "orange"
        }
    } else {
        const averageMonth = await Expense.selectAverageExpenseOfPeriod({ idu: req.user.idu, typeMonth: true });
        const percentuageMonth = calculatePercentuage(averageMonth[0].last_average, averageMonth[0].current_average);
        const dataMonth = await Expense.selectAllExpenseOfPeriod({ idu: req.user.idu, typeMonth: true });
        response.month = {
            percentuage: percentuageMonth,
            amount: averageMonth[0].total,
            chartData: dataMonth,
            name: req.user.nome,
            surname: req.user.cognome,
            when: "Questo mese",
            color: "yellow"
        }

        const averageYear = await Expense.selectAverageExpenseOfPeriod({ idu: req.user.idu, typeYear: true });
        const percentuageYear = calculatePercentuage(averageYear[0].last_average, averageYear[0].current_average);
        const dataYear = await Expense.selectAllExpenseOfPeriod({ idu: req.user.idu, typeYear: true });
        response.year = {
            percentuage: percentuageYear,
            amount: averageYear[0].total,
            chartData: dataYear,
            name: req.user.nome,
            surname: req.user.cognome,
            when: "Quest'anno",
            color: "orange"
        }
    }

    res.status(200).send(response);
});

module.exports = { getTotalExpense, getTotalExpenseFamilyYear, AnalyseTotalExpenseFamily, AverageExpense }