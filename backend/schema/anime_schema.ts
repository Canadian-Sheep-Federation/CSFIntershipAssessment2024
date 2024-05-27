// db schema

import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import { v4 } from "uuid";
const schema = new Schema<IAnime>({
  animeId: {
    type: String,
    required: true,
    default: () => {
      return v4();
    },
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export interface IAnime extends Document {
  animeId: string;
  rating: number;
  description: string;
  genre: string;
  title: string;
  image: string;
}
// create model
const AnimeModel = mongoose.model<IAnime>("Anime", schema);

export default AnimeModel;
