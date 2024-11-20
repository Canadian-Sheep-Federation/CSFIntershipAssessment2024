const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A review must have a name"],
  },
  username: {
    type: String,
    required: [true, "A review must have a username"],
  },
  rating: {
    type: Number,
    required: [true, "A review must have a rating"],
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: [true, "A review must have a review written."],
  },
  suggestion: {
    type: String,
    required: [true, "A review must have a suggestion."],
  },
  imageCover: {
    type: String,
    required: [true, "A review must have a cover image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Create a compound index on name and username to ensure uniqueness
reviewSchema.index({ name: 1, username: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
