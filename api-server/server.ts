import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { TvShow } from "./models/tvshow";
import cors from 'cors';


dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
const port = 5000;

const mongoUri = "mongodb://localhost:27017/tvShowsDb";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

interface FormPostRequest {
  id: string;
  rating: number;
  name: string;
  comment?: string;
  imageUrl?: string;
}

app.post("/", async (req: Request, res: Response) => {
  const requestData: FormPostRequest = req.body;

  // make sure the id and rating are present in the form post.
  if (!requestData.id || !requestData.rating) {
    return res.status(400).send("Id and Rating are required.");
  }

  const { id, rating, name, comment, imageUrl } = requestData;

  // validate that rating is between 0 and 10
  if (typeof rating !== "number" || rating < 0 || rating > 10) {
    return res.status(400).send("Rating must be a number between 0 and 10.");
  }

  try {
    const existingTvShow = await TvShow.findOne({ id: id });

    if (existingTvShow) {
      // Update the existing TV show
      existingTvShow.rating = rating;
      if (comment !== undefined) {
        existingTvShow.comment = comment;
      }
      await existingTvShow.save();

      return res.status(200).json({ id: existingTvShow.id });
    } else {
      // Create a new TV show entry
      const tvShow = new TvShow({
        showId: id,
        name: name,
        rating: rating,
        comment: comment,
        imageUrl: imageUrl
      });
      await tvShow.save();

      return res.status(201).json({ id: tvShow.showId });
    }
  } catch (err) {
    console.error("Database Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (req: Request, res: Response) => {
  try {
    const tvShows = await TvShow.find({});
    return res.status(200).json(tvShows);
  } catch (err) {
    console.error("Error retrieving TV shows:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:id", async (req: Request, res: Response) => {
  const tvShowId = req.params.id;

  try {
    const tvShow = await TvShow.findOne({ showId: tvShowId });

    if (!tvShow) {
      return res.status(404).json({ error: "TV show not found" });
    }

    return res.status(200).json(tvShow);
  } catch (err) {
    console.error("Error retrieving TV show:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
