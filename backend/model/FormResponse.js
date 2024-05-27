import mongoose, { model, Schema, Types } from "mongoose";

// Form response schema
const formResponseSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

const FormResponseModel = mongoose.model("FormResponse", formResponseSchema);
export default FormResponseModel;
