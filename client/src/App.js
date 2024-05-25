import React, { useState } from 'react';
import MovieSearch from './MovieSearch';
import MovieForm from './MovieForm';
import "./App.css"

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="App">
      <div className="search-container">
        <MovieSearch onMovieSelect={setSelectedMovie} />
      </div>
      {selectedMovie && <MovieForm movie={selectedMovie} />}
    </div>
  );
}

export default App;