import { Schema, model } from "mongoose";

interface ITvShow {
  showId: string;
  name: string;
  rating: number;
  comment: string;
  imageUrl: string;
}

const tvShowSchema = new Schema<ITvShow>({
  showId: { type: String, required: true }, //tv show id from TV Maze Api
  name: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  comment: { type: String },
  imageUrl: { type: String },
});

export const TvShow = model<ITvShow>("TvShow", tvShowSchema);
