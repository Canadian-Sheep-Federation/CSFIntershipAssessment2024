const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

// add reviews for meals
router.post('/', reviewController.addReview);

// get all the reviews
router.get('/', reviewController.getAllReviews);

//get reviews by id 
router.get('/:id', reviewController.getReviewById)


module.exports = router;