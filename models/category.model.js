const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const Category = {
    selectAllCategory: async () => {
        const mysql = "select id, nome, spesa_fissa from categoria where 1=1"
        const result = await connFunction.query(mysql, {})
        return result;
    },
    selectTotExpenseForCategory: async ({ idu, idf, year, limit }) => {
        const mysql = `
        select c.id, c.nome, sum(s.importo) as tot
        from categoria c
        inner join spesa s on s.id_categoria = c.id
        inner join utente u on u.id = ${idu && !idf ? " @idu " : " s.id_utente "}
        where c.spesa_fissa=0 and year(s.\`data\`)=@year ${idf && !idu ? " AND u.id_famiglia=@idf " : ""}
        group by c.id
        order by tot desc
        ${limit ? " limit @limit " : ""}`;
        const result = await connFunction.query(mysql, { idu, idf, year, limit });
        return result;
    }
}

module.exports = Category;