const express = require("express");
const cookieParser = require("cookie-parser");
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const visitedRestrauntRouter = require("./routes/visitedRestaurantsRoute");
const cors = require("cors");
const attachUser = require("./controllers/attachUserMiddleware");
const app = express();

// Enable CORS for all routes with specific settings
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
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

//for routes not defined -- for get, post and all other verbs
app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server.`);
  err.status = "fail";
  err.statusCode = 404;
  //will skip all tyhe middlewares inbetween to reach directly to error handling middleware
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`));
});
app.use(globalErrorHandler);
module.exports = app;
