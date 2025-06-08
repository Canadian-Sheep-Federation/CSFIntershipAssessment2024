const Review = require('../models/reviewModel');

// add the review for particular meal to db 
exports.addReview = async (req, res) => {
  try {
    
    const { mealId, mealTitle, mealImage, userName, rating, feedback, variation, potluck } = req.body;
    console.log(mealImage);

    if (!mealId || !mealTitle || !mealImage || !userName || !rating || !feedback) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const review = new Review({
      mealId,
      mealTitle,
      mealImage,
      userName,
      rating,
      feedback,
      variation,
      potluck,
    });

    await review.save();

    res.status(201).json({ message: 'Review saved successfully', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error saving review' });
  }
};

// get all the reviews submitted to db
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

// get review by id
exports.getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching review by ID' });
  }
};
