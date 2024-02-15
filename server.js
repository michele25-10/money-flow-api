const express = require('express');
require('express-async-errors');
const app = express();
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config();
const port = process.env.PORT || 5000; //prendo la porta dal file .env

//middleware
app.use(express.json());

app.use("/api", require("./routes/index.route"));

//middleware degli errori
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});