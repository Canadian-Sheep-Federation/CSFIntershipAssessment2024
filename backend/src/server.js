const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/csf", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routes
const formRoutes = require("./routes/formRoutes");
app.use("/forms", formRoutes);

// Root URL route
app.get("/", (req, res) => {
  res.send("Welcome to the CSF API");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
