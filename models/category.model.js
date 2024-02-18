const connFunction = require('../utils/executeMySql');
const moment = require('moment');

const Category = {
    selectAllCategori: async () => {
        const mysql = "select id, nome, spesa_fissa from categoria where 1=1"
        const result = await connFunction.query(mysql, {})
        return result;
    }
}

module.exports = Category;