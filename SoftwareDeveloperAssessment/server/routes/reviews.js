import express from "express";
export const router = express.Router();
import Review from "../models/review.js";

// these are all our routes for the API. Every DB call is nested inside
// a try catch to ensure errorhandling. All these call cover the standard
// CRUD operations

// get all reviews

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single review

router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      res.status(404).json({ message: "review not found" });
    } else {
      res.json(review);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a review

router.post("/", async (req, res) => {
  const review = new Review({
    reviewer: req.body.reviewer,
    anime: req.body.anime,
    rating: req.body.rating,
    pros: req.body.pros,
    cons: req.body.cons,
    recomend: req.body.recomend,
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview.id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// edit your review

router.patch("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      res.status(404).json({ message: "review not found" });
    } else {
      if (req.body.reviewer) {
        review.reviewer = req.body.reviewer;
      }
      if (req.body.rating) {
        review.rating = req.body.rating;
      }
      if (req.body.pros) {
        review.pros = req.body.pros;
      }
      if (req.body.cons) {
        review.cons = req.body.cons;
      }
      if (req.body.recomend) {
        review.recomend = req.body.recomend;
      }

      review.isEdited = true;

      const updatedReview = await review.save();
      res.json(updatedReview);
    }
  } catch (error) {
    res.status(400).json({ message: error.message }); // the error code here is 400, because it is likely a user error
  }
});

// delete your review

router.delete("/:id", async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.id });
    res.json({ message: "deleted review" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
