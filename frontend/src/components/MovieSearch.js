import React, { useState } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";
import "../MovieSearch.css";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${query}&apikey=71d0942c`
    );
    setResults(response.data.Search);
  };

  const handleSelectMovie = async (imdbID) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=71d0942c`
    );
    setSelectedMovie(response.data);
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control w-50"
          placeholder="Search for a movie..."
        />
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="row justify-content-center">
        {results &&
          results.map((movie) => (
            <div
              key={movie.imdbID}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div
                className="movie-card"
                onClick={() => handleSelectMovie(movie.imdbID)}
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="img-fluid"
                />
                <p className="text-center mt-2">
                  {movie.Title} ({movie.Year})
                </p>
              </div>
            </div>
          ))}
      </div>
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={handleCloseMovieDetail} />
      )}
    </div>
  );
};

export default MovieSearch;
