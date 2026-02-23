const express = require("express");
const cors = require("cors");
require("express-async-errors");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const client = require("prom-client");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const port = process.env.PORT || 5000;

// Middleware per loggare ogni richiesta
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware per parsare il JSON
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Rotte API
app.use("/api", require("./routes/index.route"));

// Raccoglie metriche di default (CPU, memoria, event loop ecc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Endpoint /metrics per Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Middleware degli errori
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
