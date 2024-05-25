import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

function MovieForm({ movie }) {
  const [rating, setRating] = useState('');
  const [director, setDirector] = useState(movie ? movie.director : ''); // Populate director if movie is selected

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://legendary-broccoli-74wq6qqgpp52w57p-5000.app.github.dev/forms', { 
        movieTitle: movie.title,
        rating,
        director,
      });
      console.log('Form submitted:', response.data);
      // Optionally reset form or show a success message
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        <div>
          <label htmlFor="director">Director:</label>
          <input type="text" id="director" value={director} onChange={(e) => setDirector(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default MovieForm;