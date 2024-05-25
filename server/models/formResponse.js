const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  // Example fields for a movie survey:
  movieTitle: { type: String, required: true },
  director: { type: String },
  rating: { type: Number, required: true },
  // Add more fields as needed
});

module.exports = mongoose.model('FormResponse', formResponseSchema);