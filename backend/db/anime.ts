// db crud

import AnimeModel from "../schema/anime_schema";
import { Anime } from "../models/models";

// get all anime
export const getAnime = async () => {
  try {
    const listing = await AnimeModel.find({});

    if (listing.length == null) {
      console.log("failed to retrieve anime listing");
    }
    return listing;
  } catch (err) {
    console.log(err);
  }
};

// get Anime by Id
export const getAnimebyId = async (id: string) => {
  const listing = await AnimeModel.findById(id);
  return listing;
};

// create anime listing with table data
export const insertAnime = async (anime: Anime) => {
  try {
    const newAnime = new AnimeModel({
      title: anime.title,
      description: anime.description,
      genre: anime.genre,
      rating: anime.rating,
      image: anime.image,
    });
    const listing = await newAnime.save();
    return listing;
  } catch (err) {
    console.log(err);
  }
};
