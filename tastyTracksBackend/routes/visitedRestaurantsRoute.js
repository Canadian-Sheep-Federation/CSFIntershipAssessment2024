const express = require("express");
const visitedRestaurantController = require("./../controllers/visitedRestaurantController");

const router = express.Router();

router
  .route("/")
  .get(visitedRestaurantController.getAllVisitedRestaurants)
  .post(visitedRestaurantController.createVisitedRestaurant);

module.exports = router;
