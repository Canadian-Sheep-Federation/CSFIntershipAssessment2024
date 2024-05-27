const mongoInstance = require('mongoose');

const movieFormSchema = new mongoInstance.Schema({
  customerName: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  movieRating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
});

const movieForm = mongoInstance.model('movieForm', movieFormSchema);

module.exports = movieForm;
