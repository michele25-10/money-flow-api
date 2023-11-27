const conn = require('../config/dbConnection');
const { queryMethods } = require('../enums/queryMethods');

const query = async (mysql, method) => {
    let sqlResult;
    const result = new Promise((resolve, reject) => {
        conn.query(mysql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    await result.then((value) => {
        sqlResult = value;
    }).catch((err) => console.log(err));

    if (method === queryMethods.SELECT) {
        return sqlResult;
    } else if (method === queryMethods.INSERT || method === queryMethods.UPDATE || method === queryMethods.DELETE) {
        return sqlResult.affectedRows;
    }
}

module.exports = query; 