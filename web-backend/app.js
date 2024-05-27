const express = require("express"); // including express

const app = express();

const middlewares = require("./middlewares");
const api = require("./api/csf");

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Faker API to create json data and for survey" });
});

// base url 
app.use("/api/v1", api);

// setting up error handlers as a middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;