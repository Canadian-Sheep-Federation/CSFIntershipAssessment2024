// handler for request not found
function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found -- ${req.Error}`);
  res.json({
    message: "URL not found"}
  );
}

// error handler
function errorHandler(err, req, res, next) {
  const statusCode = req.statusCode !== 200 ? req.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
