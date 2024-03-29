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
            //id_utente
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
    selectAllExpense: async ({ idu, idf, flagGenitore, limit, year }) => {
        const mysql = `
        select s.id, concat(u.nome, " ", u.cognome) as nome_cognome, s.luogo, s.\`data\`, s.importo , IF(s.tipo_pagamento=1, "Bancomat", "Contante") as tipo_pagamento, s.descrizione, c.nome as categoria, s.documento, c.id as id_categoria
        from spesa s 
        inner join utente u on u.id = s.id_utente 
        inner join categoria c on c.id = s.id_categoria 
        where ${year ? " year(s.\`data\`)=@year " : " s.\`data\`>= date_sub(now(), interval 365 day) "} ${flagGenitore ? ' AND u.id_famiglia=@idf' : ' AND s.id_utente = @idu'}
        order by s.\`data\` desc
        ${limit ? " limit @limit " : ""}`;
        const result = await connFunction.query(mysql, {
            idu,
            idf,
            limit,
            year
        })

        return result;
    },
    selectTotalExpenseOfPeriod: async ({ idu, idf, typeWeek, typeYear, year }) => {
        let mysql = "";
        if (typeWeek) {
            mysql = `
            SELECT DAYOFWEEK(s.data) as giorno_settimana, ROUND(sum(s.importo), 2) AS tot
            FROM spesa s 
            inner join utente u on s.id_utente=u.id 
            WHERE YEARWEEK(s.data) = YEARWEEK(NOW()) ${idf ? " AND u.id_famiglia=@idf " : ""} ${idu ? " AND s.id_utente=@idu " : ""}
            GROUP BY DAYOFWEEK(s.data)
            ORDER BY giorno_settimana`;
        } else if (typeYear) {
            mysql = `
            SELECT MONTH(data) AS mese, ROUND(sum(s.importo), 2) AS tot
            FROM spesa s 
            inner join utente u on s.id_utente=u.id 
            WHERE YEAR(s.data) = @year ${idf ? " AND u.id_famiglia=@idf " : ""} ${idu ? " AND s.id_utente=@idu " : ""}
            GROUP BY MONTH(s.data)
            ORDER BY mese;`;
        }

        const result = await connFunction.query(mysql, { idu, idf, year });
        return result;
    },
    selectAllExpenseFamilyYear: async ({ idf, year }) => {
        let mysql = `
        select u.id, concat(u.nome, " ", u.cognome) as name, ROUND(sum(s.importo), 2) as value
        from spesa s 
        inner join utente u on u.id = s.id_utente 
        where year(s.\`data\`)=@year and u.id_famiglia=@idf
        group by u.id;`;
        const result = await connFunction.query(mysql, { idf, year });
        return result;
    },
    selectAverageExpenseOfPeriod: async ({ idu, idf, typeYear, typeMonth, year }) => {
        let mysql = "";
        if (typeMonth) {
            mysql = `
            SELECT 
            ROUND(AVG(CASE WHEN s.\`data\` BETWEEN DATE_SUB(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH) AND now() THEN s.importo  END), 2) AS current_average,
            ROUND(AVG(CASE WHEN s.\`data\` BETWEEN DATE_SUB(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 2 MONTH) AND DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN s.importo END), 2) AS last_average,
            ROUND(SUM(CASE WHEN s.\`data\` BETWEEN DATE_SUB(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH) AND NOW() THEN s.importo  END), 2) AS total
            FROM 
                spesa s
            inner join utente u 
                on u.id = s.id_utente 
            WHERE
                s.\`data\` BETWEEN DATE_SUB(NOW(), INTERVAL 2 MONTH) AND NOW() ${idu ? "and s.id_utente like @idu" : ""} ${idf ? "and u.id_famiglia = @idf" : ""};`;
        } else if (typeYear) {
            mysql = `
            SELECT 
            ROUND(AVG(CASE WHEN YEAR(s.\`data\`) = ${year ? " @year " : " YEAR(NOW()) "} THEN s.importo END), 2) AS current_average,
            ROUND(AVG(CASE WHEN YEAR(s.\`data\`) = ${year ? " (@year - 1)" : " YEAR(NOW()) - 1 "} THEN s.importo END), 2) AS last_average,
            ROUND(SUM(CASE WHEN YEAR(s.\`data\`) = ${year ? " @year " : " YEAR(NOW()) "} THEN s.importo END), 2) AS total
            from
                spesa s
            inner join utente u 
                on u.id = s.id_utente 
            WHERE
                YEAR(s.\`data\`) IN (${year ? " @year, (@year - 1) " : " YEAR(NOW()), YEAR(NOW()) - 1 "}) ${idu ? "and s.id_utente like @idu" : ""} ${idf ? "and u.id_famiglia = @idf" : ""};`;
        }
        const result = await connFunction.query(mysql, { idu, idf, year });
        return result;
    },
    selectAllExpenseOfPeriod: async ({ idu, idf, typeYear, typeMonth, year }) => {
        let mysql = "";
        if (typeMonth) {
            mysql = `
            SELECT s.data,  ROUND(sum(s.importo), 2) as importo
            FROM spesa s 
            inner join utente u on u.id = s.id_utente 
            WHERE
                s.\`data\` BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() ${idu ? "and s.id_utente like @idu" : ""} ${idf ? "and u.id_famiglia = @idf" : ""}
            group by s.\`data\`
            order by s.\`data\` asc;`;
        } else if (typeYear) {
            mysql = `
            SELECT s.data, ROUND(sum(s.importo), 2) as importo
            FROM spesa s
            inner join utente u on u.id = s.id_utente 
            WHERE 
                YEAR(s.\`data\`)=${year ? " @year " : " YEAR(NOW()) "}  ${idu ? "and s.id_utente like @idu" : ""} ${idf ? "and u.id_famiglia = @idf" : ""}
            group by s.\`data\`
            order by s.\`data\` asc;`;
        }
        const result = await connFunction.query(mysql, { idu, idf, year });
        return result;
    }
}

module.exports = Expense;   