const conn = require('../config/dbConnection');

const executeQuery = async (mysql) => {
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
    }).catch((err) => {
        console.error(err);
        throw new Error(err);
    });

    return sqlResult;
}

const stringaQuery = (mysql, arguments) => {
    for (const key in arguments) {
        if (typeof arguments[key] === 'number') {
            mysql = mysql.replaceAll('@' + key, arguments[key]);
        } else {
            mysql = mysql.replaceAll('@' + key, "'" + arguments[key] + "'");
        }
    }

    return mysql;
}

const connFunction = {
    /*
    * @params {String} stringaQuery
    * @params {Object} argomentiQuery
    */
    query: async (mysql, arguments) => {
        mysql = stringaQuery(mysql, arguments);
        
        const result = await executeQuery(mysql);
        return result;
    },

    /*
    * @params {String} tabellaInserimento
    * @params {Array} rows righe di inserimento composte da nome_colonna: valore
    */
    insert: async (tabella, rows) => {
        if (!tabella || !rows) {
            throw Error('Function Insert, dati non dichiarati in modo corretto');
        }

        let mysql = `INSERT INTO ${tabella} (`;
        if (typeof rows === 'array') {
            for (const key in rows[0]) {
                mysql += key + ', ';
            }
            mysql = mysql.slice(0, -2);
            mysql += ') VALUES ';
            for (const row of rows) {
                mysql += ' ('
                for (const column of row) {
                    if (typeof column === 'number') {
                        mysql += column + ', ';
                    } else {
                        mysql += `'${column}', `;
                    }
                }
                mysql = mysql.slice(0, -2);
                mysql += ')';
            }
            mysql += ';';
        } else if (typeof rows === 'object') {
            for (const key in rows) {
                mysql += key + ', ';
            }
            mysql = mysql.slice(0, -2);
            mysql += ') VALUES (';
            for (const column in rows) {
                if (typeof rows[column] === 'number') {
                    mysql += rows[column] + ', ';
                } else {
                    mysql += `${rows[column] ? "'" + rows[column] + "'" : null}, `;
                }
            }
            mysql = mysql.slice(0, -2);
            mysql += '); ';
        } else {
            throw Error('Invalid type of data: function Insert');
        }

        const result = await executeQuery(mysql);
        return result;
    },

    /*
    * @params {String} tabellaModificare
    * @params {object} colonne composte da nome_colonna: valore
    * @params {string} whereCondition NON inserire il where nella stringa
    * @params {object} argumentsWhere nome_segnaposto: valore
    */
    update: async (tabella, columns, whereCondition, arguments) => {
        if (!tabella || !columns || !whereCondition || !arguments) {
            throw Error('Function Update, dati non dichiarati in modo corretto');
        }

        let mysql = `UPDATE ${tabella} SET `;
        if (typeof columns === 'object') {
            for (const column in columns) {
                if (typeof columns[column] === 'number') {
                    mysql += `${column} = ${columns[column]}, `;
                } else {
                    mysql += `${column} = ${columns[column] ? "'" + columns[column] + "'" : null}, `;
                }
            }
            mysql = mysql.slice(0, -2);
        } else {
            throw Error('Invalid type of data: function Insert');
        }

        mysql += `WHERE ${whereCondition}`;

        mysql = stringaQuery(mysql, arguments);

        const result = await executeQuery(mysql);
        return result;
    },

    /*
    * @params {String} tabella
    * @params {string} whereCondition NON inserire il where nella stringa
    * @params {object} argumentsWhere nome_segnaposto: valore
    */
    delete: async (tabella, whereCondition, arguments) => {
        if (!tabella || !whereCondition || !arguments) {
            throw Error('Function Update, dati non dichiarati in modo corretto');
        }

        let mysql = `DELETE FROM ${tabella} WHERE ${whereCondition}`;

        mysql = stringaQuery(mysql, arguments);

        const result = await executeQuery(mysql);
        return result;
    }

}

module.exports = connFunction;