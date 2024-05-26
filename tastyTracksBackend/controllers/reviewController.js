// reviewController.js

const Review = require("./../models/reviewModel");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getReviewsByRestaurantId = async (req, res) => {
  try {
    const reviews = await Review.find({
      restaurantId: req.params.restaurantId,
    });
    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "No review found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    console.log("Creating review with data:", req.body); // Add this line
    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    console.error("Error creating review:", err); // Add this line
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
