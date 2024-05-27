const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');


const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

