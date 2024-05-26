import mongoose from "mongoose";

// this is our modal and what we will be storing in the database

const Review = new mongoose.Schema({
  reviewer: {
    type: String,
    required: true,
  },
  anime: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  pros: {
    type: String,
  },
  cons: {
    type: String,
  },
  recomend: {
    type: Boolean,
    required: true,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model("Review", Review);
