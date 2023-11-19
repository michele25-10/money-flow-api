const express = require('express');
const app = express();
const errorHandler = require("./middleware/errorHandler");
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000; //prendo la porta dal file .env

//middleware
app.use(express.json());

app.use("/api", require("./routes/index.route"));

//middleware degli errori
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port ' + port);
}); 