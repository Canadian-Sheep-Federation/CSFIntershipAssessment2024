const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const bodyParser = require("body-parser");
const formRoute = require('../routes/forms');
const db = require('../config/db');

const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use('/api/forms', formRoute);


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Closing the server
process.on("SIGINT", () => {
  db.close();
  process.exit();
});