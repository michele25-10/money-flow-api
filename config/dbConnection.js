const mysql = require('mysql');

//Connessione al db
const sql = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DB
})

sql.connect(function (err) {
    if (err) {
        throw new Error(err);
    } else {
        console.log("connected succssfully");
    }
});

module.exports = sql;