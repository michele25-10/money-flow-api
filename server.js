const express = require('express');
const cors = require('cors');
require('express-async-errors');
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Consenti solo questi metodi HTTP
    allowedHeaders: ['Content-Type', 'Authorization'] // Consenti solo questi header
}));

const port = process.env.PORT || 5000; //prendo la porta dal file .env

//middleware
app.use(express.json());

app.use("/api", require("./routes/index.route"));

//middleware degli errori
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});