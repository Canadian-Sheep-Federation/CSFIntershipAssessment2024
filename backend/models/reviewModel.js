const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  mealId: {
    type: String,
    required: true,
  },
  mealTitle: {
    type: String,
    required: true,
  },
  mealImage: {
    type: String
  },
  userName: {
    type: String,
    required: true, 
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  variation: {
    type: String,
  },
  potluck: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
