import React, { useState } from "react";
import axios from "axios";

// query the public api and get data from it
function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=fbb40941&s=${query}`
    );
    setMovies(response.data.Search);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Search for a movie..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Search
        </button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <a
              href={`/movie/${movie.imdbID}`}
              className="text-blue-500 hover:underline"
            >
              {movie.Title} ({movie.Year})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
