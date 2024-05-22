const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const uri =
  "";

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const DATABASENAME = "movie-csf";
var database = client.db("movie-csf");

var moviesCollection = database.collection("movies");

app.listen(5038, () => {
  try {
    client.connect();
    database = client.db(DATABASENAME);
    console.log("Server is running on port 5038");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
});

app.get("/getMovies", async (req, res) => {
  try {
    const movies = await moviesCollection.find({}).toArray();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getMovie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await moviesCollection.findOne({ id: id });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addMovie", async (req, res) => {
  try {
    const { id, name } = req.body;

    // Check if the movie with the provided ID already exists
    const existingMovie = await moviesCollection.findOne({ id: id });
    if (existingMovie) {
      return res
        .status(409)
        .json({ error: "Movie with the provided ID already exists" });
    }

    // Proceed with adding the movie if it doesn't already exist
    const newMovie = { id, name };
    const result = await moviesCollection.insertOne(newMovie);

    const insertedMovie = await moviesCollection.findOne({
      _id: result.insertedId,
    });

    res
      .status(201)
      .json({ message: "Movie added successfully", movie: insertedMovie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
