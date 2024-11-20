const VisitedRestaurant = require("../models/visitedRestaurantModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllVisitedRestaurants = catchAsync(async (req, res) => {
  const visitedRestaurants = await VisitedRestaurant.find();
  res.status(200).json({
    status: "success",
    data: {
      visitedRestaurants,
    },
  });
});

exports.createVisitedRestaurant = catchAsync(async (req, res) => {
  const newVisitedRestaurant = await VisitedRestaurant.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      visitedRestaurant: newVisitedRestaurant,
    },
  });
});
