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
        select c.id, c.nome as name, sum(s.importo) as tot
        from categoria c
        inner join spesa s on s.id_categoria = c.id
        inner join utente u on u.id = ${idu && !idf ? " @idu " : " s.id_utente "}
        where c.spesa_fissa=0 and year(s.\`data\`)=@year ${idf && !idu ? " AND u.id_famiglia=@idf " : ""}
        group by c.id
        order by tot desc
        ${limit ? " limit @limit " : ""}`;
        const result = await connFunction.query(mysql, { idu, idf, year, limit });
        return result;
    },
    selectMaxCategoryExpenseForUser: async ({ idf, year }) => {
        const mysql = `
        select j.id, j.nome_cognome as name, max(j.tot) as amount, j.nome as type, j.flag_genitore
        from (
	        select u.id, concat(u.nome, " ", u.cognome) as nome_cognome, sum(s.importo) as tot, c.nome, if(u.flag_genitore=1, TRUE, FALSE) as flag_genitore  
	        from categoria c 
	        inner join spesa s on s.id_categoria = c.id 
	        inner join utente u on u.id = s.id_utente 
	        where u.id_famiglia = @idf and YEAR(s.\`data\`) = @year and c.spesa_fissa=0
	        group by c.id, u.id
        ) j
        group by j.id; `;
        const result = await connFunction.query(mysql, { idf, year });
        return result;
    },
    selectFixedExpenseOfYear: async ({ idf, year }) => {
        const mysql = `
        select year (s.\`data\`) as anno, c.nome, sum(s.importo) as tot
        from categoria c 
        inner join spesa s on s.id_categoria =c.id 
        inner join utente u on u.id = s.id_utente 
        where c.spesa_fissa = 1 and u.id_famiglia = @idf and year(s.\`data\`) in (year(now()), @year)
        group by year(s.\`data\`), c.id; 
        `;
        const result = await connFunction.query(mysql, { idf, year });
        return result;
    },
    selectTotalFixedExpenseOfYear: async ({ idf, year }) => {
        const mysql = `
        select year (s.\`data\`) as name, sum(s.importo) as value
        from categoria c 
        inner join spesa s on s.id_categoria =c.id 
        inner join utente u on u.id = s.id_utente 
        where c.spesa_fissa = 1 and u.id_famiglia = @idf and year(s.\`data\`) in (year(now()), @year)
        group by year(s.\`data\`); `;
        const result = await connFunction.query(mysql, { idf, year });
        return result;
    },
    analyseFixedExpenseOfYear: async ({ year, idf }) => {
        const mysql = `
        SELECT MONTH(data) AS mese,sum(s.importo) AS tot
        FROM spesa s 
        inner join utente u on s.id_utente=u.id 
        inner join categoria c on c.id = s.id_categoria and c.spesa_fissa=1
        WHERE YEAR(s.data)=@year AND u.id_famiglia=@idf  
        GROUP BY MONTH(s.data)
        ORDER BY mese;`;
        const result = await connFunction.query(mysql, { year, idf });
        return result;
    }
}

module.exports = Category;