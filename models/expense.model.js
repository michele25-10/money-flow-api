const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const Expense = {
    insertExpense: async ({ luogo, data, descrizione, importo, tipoPagamento: tipo_pagamento, categoria: id_categoria, documento, idu: id_utente }) => {


        const result = await connFunction.insert("spesa", {
            luogo,
            data: moment(data).format('YYYY-MM-DD'),
            descrizione,
            importo,
            tipo_pagamento,
            id_categoria,
            documento,
            id_utente
        });
        return result;
    },
    updateExpense: async ({ luogo, data, descrizione, importo, tipoPagamento: tipo_pagamento, categoria: id_categoria, documento, idu: id_utente, idRow: id }) => {
        const result = await connFunction.update("spesa", {
            luogo,
            data: moment(data).format('YYYY-MM-DD'),
            descrizione,
            importo,
            tipo_pagamento,
            id_categoria,
            documento,
            id_utente
        }, "id=@id", {
            id
        }
        );
        return result;
    },
    deleteExpense: async ({ id }) => {
        const result = await connFunction.delete("spesa", "id=@id", { id });
        return result;
    },
    selectExpenseById: async ({ id, idu, flagGenitore }) => {
        const mysql = `
        select concat(u.nome, " ", u.cognome) as nome_cognome, s.luogo, s.\`data\`, s.importo , IF(s.tipo_pagamento=1, "Bancomat", "Contante") as tipo_pagamento, s.descrizione, c.nome as categoria, s.documento
        from spesa s 
        inner join utente u on u.id = s.id_utente 
        inner join categoria c on c.id = s.id_categoria 
        where s.id=@id ${flagGenitore ? '' : ' and s.id_utente=@idu '}`;
        const result = await connFunction.query(mysql, {
            id,
            idu
        })
        return result;
    },
    selectAllExpense: async ({ idu, idf, flagGenitore, limit }) => {
        const mysql = `
        select s.id, concat(u.nome, " ", u.cognome) as nome_cognome, s.luogo, s.\`data\`, s.importo , IF(s.tipo_pagamento=1, "Bancomat", "Contante") as tipo_pagamento, s.descrizione, c.nome as categoria, s.documento, c.id as id_categoria
        from spesa s 
        inner join utente u on u.id = s.id_utente 
        inner join categoria c on c.id = s.id_categoria 
        where s.\`data\`>= date_sub(now(), interval 365 day) ${flagGenitore ? ' AND u.id_famiglia=@idf' : ' AND s.id_utente = @idu'}
        ${limit ? " limit @limit " : ""}`;
        const result = await connFunction.query(mysql, {
            idu,
            idf,
            limit
        })

        return result;
    },
    selectTotalExpenseOfPeriod: async ({ idu, idf, typeWeek, typeYear, year }) => {
        let mysql = "";
        if (typeWeek) {
            mysql = `
            SELECT DAYOFWEEK(s.data) as giorno_settimana, sum(s.importo) AS tot
            FROM spesa s 
            inner join utente u on u.id = ${idu ? " @idu " : " s.id_utente "} 
            WHERE YEARWEEK(s.data) = YEARWEEK(NOW()) ${idf ? " AND u.id_famiglia=@idf " : ""}
            GROUP BY DAYOFWEEK(s.data)
            ORDER BY giorno_settimana`;
        } else if (typeYear) {
            mysql = `
            SELECT MONTH(data) AS mese,sum(s.importo) AS tot
            FROM spesa s 
            inner join utente u on u.id = ${idu ? " @idu " : " s.id_utente "} 
            WHERE YEAR(s.data) = @year ${idf ? " AND u.id_famiglia=@idf " : ""}
            GROUP BY MONTH(s.data)
            ORDER BY mese;`;
        }

        const result = await connFunction.query(mysql, { idu, idf, year });
        return result;
    },
    selectAllExpenseFamilyYear: async ({ idf, year }) => {
        let mysql = `
        select u.id, concat(u.nome, " ", u.cognome) as nome, sum(s.importo) as tot
        from spesa s 
        inner join utente u on u.id = s.id_utente 
        where year(s.\`data\`)=@year and u.id_famiglia=@idf
        group by u.id;`;
        const result = await connFunction.query(mysql, { idf, year });
        return result;
    }
}

module.exports = Expense;   