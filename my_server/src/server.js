require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

const mapRoutes = require("express-routes-mapper");
const routes = require("./config/routes");

// Setup express app and middlewares
const app = express();
const server = http.Server(app);
const PORT = process.env.PORT | 3001;
const API_ROUTE = "/api/v1";

// Enable cors for all origins
app.use(cors());

// Parse json request body
app.use(express.json());

// Parse and sanitize application/json
app.use(bodyParser.json());

const mappedRoutes = mapRoutes(routes, "src/controllers/");
app.use(API_ROUTE, mappedRoutes);

// Last route if nothing matches send back a 404 error
app.get("*", function (req, res) {
  res.status(404).send("The page you are looking for does not exist!");
});

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}${API_ROUTE}`);
});
