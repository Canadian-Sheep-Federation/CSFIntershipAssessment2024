const express = require("express");
const cookieParser = require("cookie-parser");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");
const visitedRestrauntRouter = require("./routes/visitedRestaurantsRoute");
const cors = require("cors");
const attachUser = require("./controllers/attachUserMiddleware");
const app = express();

// Enable CORS for all routes with specific settings
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(attachUser);

// Routes
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/visitedRestaurants", visitedRestrauntRouter);

module.exports = app;
