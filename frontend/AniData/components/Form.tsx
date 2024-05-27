import { useEffect, useState } from "react";
import { getAnimeInfo } from "../src/api/animeInfo";
import {
  Card,
  CardOverflow,
  CardActions,
  Box,
  Typography,
  Divider,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@mui/joy";
import { Grid, TextField } from "@mui/material";
import { Anime, Data } from "../src/api/models";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimeCard from "./AnimeCard";
export default function Form() {
  const [animeData, setAnimeData] = useState<Data>();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [allAnime, setAllAnime] = useState<Anime[]>();

  const handleSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
    e.preventDefault();

    console.log("hello");
    notify();
    fetch("http://localhost:3001/anime", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: animeData?.synopsis,
        genre: animeData?.genres[0].name,
        rating: animeData?.rating,
      }),
    });
  };

  const handleGetAnime = async () => {
    const res = await fetch("http://localhost:3001/animes");
    const data = await res.json();

    setAllAnime(data);

    return data;
  };
  useEffect(() => {
    if (title == "") {
      console.log(title);
      return;
    }
    const getData = setTimeout(() => {
      getAnimeInfo(title).then((data) => {
        setAnimeData(data);
      });
    }, 500);

    return () => clearTimeout(getData);
  }, [title]);

  const notify = () => toast("Saved Succesfully");

  return (
    <Grid>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-lg">Anime</Typography>
        </Box>
        <Divider />
        <Stack spacing={1} sx={{ flexGrow: 1 }}>
          <FormLabel>Title</FormLabel>
          <FormControl
            sx={{
              display: {
                sm: "flex-column",
                md: "flex-row",
              },
              gap: 2,
            }}
          >
            <Input
              size="sm"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </Stack>
        <FormControl>
          <FormLabel>Genre</FormLabel>
          <Input
            size="sm"
            type="text"
            placeholder="genre"
            sx={{ flexGrow: 1 }}
            value={animeData?.genres[0].name ?? genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Rating</FormLabel>
          <Input
            size="sm"
            type="number"
            placeholder="rating"
            sx={{ flexGrow: 1 }}
            value={rating}
            onChange={(e) => setRating(e.target.valueAsNumber)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <TextField
            size="medium"
            type="text"
            placeholder="description"
            sx={{ flexGrow: 1 }}
            value={animeData?.synopsis ?? ""}
          />
        </FormControl>

        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <CardActions sx={{ alignSelf: "center", pt: 2 }}>
            <Button
              size="sm"
              variant="solid"
              color="neutral"
              style={{ display: "flex", justifyContent: "center" }}
              onClick={handleGetAnime}
            >
              View
            </Button>
            <Button size="sm" variant="solid" onClick={handleSubmit}>
              <ToastContainer />
              Save
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          marginTop: 50,
          justifyContent: "space-around",
        }}
      >
        {allAnime?.map((anime, index) => {
          return (
            <AnimeCard
              key={index}
              title={anime.title}
              image={anime.image}
              rating={anime.rating}
              genre={anime.genre}
            />
          );
        })}
      </div>
    </Grid>
  );
}
