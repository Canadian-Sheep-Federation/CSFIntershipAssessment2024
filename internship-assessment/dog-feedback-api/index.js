const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const feedbackRoutes = require("./routes/feedback");
const db = require("./models/feedback");

// defining port
const port = 3000;
const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Using the feedback routes folder
app.use("/feedback", feedbackRoutes);

// Page not found
app.use(function (req, res) {
  res.status(404);

  // respond with json
  if (req.accepts("json")) {
    res.status(404).json({
      status: 404,
      success: false,
      error: "Page Not found",
    });
    return;
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Cat Fact Feedback API running at http://localhost:${port}/`);
});

// Closing the server
process.on("SIGINT", () => {
  db.close();
  process.exit();
});
