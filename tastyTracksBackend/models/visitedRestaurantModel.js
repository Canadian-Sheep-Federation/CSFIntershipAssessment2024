const mongoose = require("mongoose");

const visitedRestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A visited restaurant must have a name"],
  },
  username: {
    type: String,
    required: [true, "A visited restaurant must have a username"],
  },
  rating: {
    type: Number,
    required: [true, "A visited restaurant must have a rating"],
  },
  review: {
    type: String,
    required: [true, "A visited restaurant must have a review"],
  },
  suggestion: {
    type: String,
    required: [true, "A visited restaurant must have a suggestion"],
  },
  imageCover: {
    type: String,
    required: [true, "A visited restaurant must have a cover image"],
  },
});

const VisitedRestaurant = mongoose.model(
  "VisitedRestaurant",
  visitedRestaurantSchema
);

module.exports = VisitedRestaurant;
