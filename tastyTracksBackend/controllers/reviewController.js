const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.getReviewsByRestaurantId = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({
    restaurantId: req.params.restaurantId,
  });
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    next(new AppError("No review foudn with that ID", 404));
    return;
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    next(new AppError("No review foudn with that ID", 404));
    return;
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    next(new AppError("No review foudn with that ID", 404));
    return;
  }
  res.status(204).json({
    status: "success",
    message: "Deleted successfully",
    data: null,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create({
    name: req.body.name,
    username: req.body.username,
    rating: req.body.rating,
    review: req.body.review,
    suggestion: req.body.suggestion,
    imageCover: req.body.imageCover,
  });

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
