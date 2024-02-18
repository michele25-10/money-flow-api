const connFunction = require('../utils/executeMySql');

const Expense = {
    insertExpense: async ({ luogo, data, descrizione, importo, tipoPagamento: tipo_pagamento, categoria: id_categoria, documento, idu: id_utente }) => {
        const result = await connFunction.insert("spesa", {
            luogo,
            data,
            descrizione,
            importo,
            tipo_pagamento,
            id_categoria,
            documento,
            id_utente
        });
        return result;
    }
}

module.exports = Expense;   