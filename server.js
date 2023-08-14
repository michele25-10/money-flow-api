const express = require('express');
const app = express();
const errorHandler = require("./middleware/errorHandler");
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000; //prendo la porta dal file .env
const dbConnect = require('./config/dbConnection');

dbConnect(); //connessione al database

//middleware
app.use(express.json());

//Aggiunto il middleware
//app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/users.route"));

//middleware degli errori
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port);
}); 