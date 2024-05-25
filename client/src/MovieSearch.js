import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

function MovieSearch({ onMovieSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query.trim() !== '') {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
        );
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="movie-search">
      <input
        type="text"
        placeholder="Search for a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((movie) => (
          <li key={movie.id} onClick={() => onMovieSelect(movie)}>
            {movie.title} ({movie.release_date.split('-')[0]}) 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;