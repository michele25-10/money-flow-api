const client = require("prom-client");

// Raccoglie metriche di sistema (CPU, RAM, Event Loop)
client.collectDefaultMetrics();

const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Durata delle richieste HTTP in secondi",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 10],
});

// Esportiamo il middleware e il registro
module.exports = {
  metricsMiddleware: (req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on("finish", () => {
      end({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      });
    });
    next();
  },
  metricsEndpoint: async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  },
};
