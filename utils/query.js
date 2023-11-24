const conn = require('../config/dbConnection');

const query = async (mysql) => {
    let sqlResult;
    const result = new Promise((resolve, reject) => {
        conn.query(mysql, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows);
            }
        });
    });
    await result.then((value) => {
        sqlResult = value;
    }).catch((err) => console.log(err));

    return sqlResult;
}


module.exports = query; 