import React, { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [movie, setMovie] = useState([]);
  const [newMovieId, setNewMovieId] = useState("");
  const [newMovieName, setNewMovieName] = useState("");
  const [breakingBadQuote, setBreakingBadQuote] = useState(null); // State for Breaking Bad quote


  //retrieve all movies from database
  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:5038/getMovies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const moviesData = await response.json();
      setMovies(moviesData);
      setError(null);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  //retrieve data by id
  const fetchMovieById = async (id) => {
    try {
      if (!id) return;
      const response = await fetch(`http://localhost:5038/getMovie/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }
      const movieData = await response.json();
      setMovie(movieData);
      setError(null);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setMovie(null);
      setError("Failed to fetch movie. Please try again.");
    }
  };

  const handleFetchMovie = () => {
    fetchMovieById(searchId);
  };

  //add movie to database
  const handleAddMovie = async () => {
    try {
      const existingMovie = movies.find((movie) => movie.id === newMovieId);
      if (existingMovie) {
        throw new Error("Movie with the same ID already exists");
      }

      const response = await fetch("http://localhost:5038/addMovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newMovieId, name: newMovieName }),
      });
      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      await fetchMovies();
      setNewMovieId("");
      setNewMovieName("");
      setError(null);
    } catch (error) {
      console.error("Error adding movie:", error);
      setError(error.message);
    }
  };

  //grab quotes from public api
  const handleBreakingBadQuote = async () => {
    try {
      const response = await fetch(
        "https://api.breakingbadquotes.xyz/v1/quotes"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Breaking Bad quote");
      }
      const data = await response.json();
      setBreakingBadQuote(data[0].quote); // Assuming data is an array with one quote
      setError(null);
    } catch (error) {
      console.error("Error fetching Breaking Bad quote:", error);
      setBreakingBadQuote(null);
      setError("Failed to fetch Breaking Bad quote. Please try again later.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="content">
          <h1>Movie List</h1>
          <button onClick={fetchMovies}>Fetch Movies</button>
          <ul>
            {movies.map((movie) => (
              <li key={movie._id}>
                {movie.id} {movie.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="content">
          <h1>Search Movie by ID</h1>
          <input
            type="text"
            id="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleFetchMovie}>Fetch Movie</button>
          <ul>{movie.name}</ul>
        </div>

        <div className="content">
          <h1>Add Movie</h1>
          <input
            type="text"
            placeholder="Enter movie ID"
            value={newMovieId}
            onChange={(e) => setNewMovieId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter movie name"
            value={newMovieName}
            onChange={(e) => setNewMovieName(e.target.value)}
          />
          <button onClick={handleAddMovie}>Add Movie</button>
        </div>
      </div>
      <div className="content">
        <button onClick={handleBreakingBadQuote}>Get Breaking Bad Quote</button>
        {breakingBadQuote && <p>{breakingBadQuote}</p>}
      </div>
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
