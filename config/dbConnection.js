const mysql = require('mysql');

//Connessione al db
const conn = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DB
})

module.exports = conn;