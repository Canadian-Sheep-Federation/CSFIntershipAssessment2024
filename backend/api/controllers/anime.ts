import { Request, Response } from "express";
import { getAnime, getAnimebyId, insertAnime } from "../../db/anime";
import { Anime } from "../../models/models";
export const handleGetAllAnime = async (_req: Request, res: Response) => {
  try {
    const anime = await getAnime();
    return res.status(200).json(anime);
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const handleCreateAnime = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const animeObj: Anime = {
      title: body.title,
      description: body.description,
      rating: body.rating,
      genre: body.genre,
      image: body.image,
    };

    await insertAnime(animeObj);
    res.json(animeObj);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const handleGetSingleAnime = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await getAnimebyId(id);

    if (record == undefined) {
      return res.status(404).send({ error: "error in fetching anime listing" });
    } else {
      return res.status(200).send(record);
    }
  } catch (err) {
    console.log(err);
  }
};
