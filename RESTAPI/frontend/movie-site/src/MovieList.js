import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css';

const MovieList = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const [recommend, setRecommend] = useState('');

  const apiKey = '7c8e43c748baf4436c5e3963d9ad7666';
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  const fetchMovie = async () => {
    try {
      const response = await axios.get(apiUrl);
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [apiUrl]);

  const handleNewMovie = () => {
    fetchMovie();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movie) {
    return <div>No movie found</div>;
  }


  const handleSubmitReview = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_API_URL', {
        movie_id: movie.id,
        description,
        rating,
        recommend,
      });
      console.log('Review submitted:', response.data);
      // Optionally, you can reset the form fields after successful submission
      setDescription('');
      setRating('');
      setRecommend('');
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };


  const userReviewMovie = () => {


    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const handleRatingChange = (e) => {
      setRating(e.target.value);
    };

    const handleRecommendChange = (e) => {
      setRecommend(e.target.value)
    }

    return (
      <div className="user-review-container">
        <h2>Enjoyed This movie? Review It!</h2>
        <textarea
          placeholder="Write your review here..."
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="rating-container">
          <label htmlFor="rating">Rate this movie from 1-5:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            <option value="">Select rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="recommendation-container">
          <label htmlFor="recommendation">Would you recommend this movie?  </label>
          <select id="recommendation" value={recommend} onChange={handleRecommendChange}>
            <option value="">Select recommendation</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="MovieList">
      <div className="movie-image">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <button className="new-movie-button" onClick={handleNewMovie}>I Haven't Seen This Movie</button>
      </div>
      <div className="movie-description">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>


        {userReviewMovie()}

        <button className="submit-review-button" onClick={handleSubmitReview}>Submit Movie Review</button>


      </div>

    </div>
  );
};

export default MovieList;
