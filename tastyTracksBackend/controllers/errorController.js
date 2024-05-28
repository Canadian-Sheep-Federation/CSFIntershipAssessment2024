const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const regex = /(["'])(\\?.)*?\1/;

  // Extract the value from the error message
  const match = err.errmsg.match(regex);

  // Check if a match is found and get the value
  const value = match ? match[0].replace(/['"]/g, "") : "unknown";
  // Construct a descriptive error message
  const message = `Duplicate field value: ${value}. Please use another value!`;

  // Return
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
    // Programming or other unkown error: don't leak the error details
  } else {
    // 1) log error
    console.error("ERROR 🚨", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
//error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") {
      error = handleCastErrorDB(err);
    }
    if (error.code === 110000) {
      error = handleDuplicateFieldsDB(err);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(err);
    }
    sendErrorProd(error, res);
  }
};
