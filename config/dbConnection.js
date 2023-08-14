const mysql = require('mysql');
const asyncHandler = require('express-async-handler')

//Connessione al db
const dbConnection = asyncHandler(async () => {
    const conn = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DB
    })

    conn.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    })
});

module.exports = dbConnection;