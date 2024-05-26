const VisitedRestaurant = require("../models/visitedRestaurantModel");

exports.getAllVisitedRestaurants = async (req, res) => {
  try {
    const visitedRestaurants = await VisitedRestaurant.find();
    res.status(200).json({
      status: "success",
      data: {
        visitedRestaurants,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createVisitedRestaurant = async (req, res) => {
  try {
    const newVisitedRestaurant = await VisitedRestaurant.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        visitedRestaurant: newVisitedRestaurant,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
