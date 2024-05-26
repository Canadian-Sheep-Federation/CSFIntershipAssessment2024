const express = require("express");
const axios = require("axios");
const commentsRouter = require("./comments");

const router = express.Router();
const HttpStatusCode = axios.HttpStatusCode;
const searchEndpoint = process.env.PUBLIC_API_SEARCH_ENDPOINT;

// Query book by name from public api
router.get("/", (req, res) => {
  const name = req.query.name;
  if (!name) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      message: "Book name's pattern is invalid!",
    });
    return;
  }

  axios
    .get(`${searchEndpoint}?q=${name}`)
    .then((resAxios) => {
      res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "success",
        data: resAxios.data,
      });
    })
    .catch((error) => {
      res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        message: error.message,
      });
    });
});

router.use(commentsRouter);

module.exports = router;
