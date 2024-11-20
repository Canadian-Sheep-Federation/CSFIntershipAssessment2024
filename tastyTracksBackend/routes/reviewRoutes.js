// reviewRoutes.js

const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
