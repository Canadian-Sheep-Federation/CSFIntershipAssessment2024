import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { check } from "express-validator";
import {
  handleCreateAnime,
  handleGetAllAnime,
  handleGetSingleAnime,
} from "../controllers/anime";
// middleware

const app: Express = express();

dotenv.config();

const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.get("/animes", handleGetAllAnime);
app.get("/anime/:id", handleGetSingleAnime);
app.post(
  "/anime",
  [
    check("productDescription")
      .isLength({ min: 20 })
      .withMessage("description must be at least 20 chars long"),
  ],

  handleCreateAnime,
);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("connected to db");
  })
  .catch(console.error);

app.listen(port, () => console.log(`listening on ${port}`));
