const express = require('express'); // Importing the Express framework
const bodyParser = require('body-parser'); // Importing the body-parser middleware to parse JSON request bodies
const db = require('./database'); // Importing the database configuration
const axios = require('axios'); // Importing axios to make HTTP requests
const app = express(); // Creating an Express application

app.use(bodyParser.json()); // Using the body-parser middleware to parse JSON request bodies

const apiKey = '61d20bdd'; // Your OMDb API key

// Endpoint to search for a movie by title
app.get('/search/:title', async (req, res) => {
  const { title } = req.params; // Extracting the movie title from the request parameters
  try {
    // Making a request to the OMDb API to search for the movie
    const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
    const movie = response.data; // Extracting the movie data from the response

    // Check if the movie was found
    if (movie.Response === 'True') {
      // Check if the movie is already in the database
      db.get(`SELECT * FROM movies WHERE title = ?`, [movie.Title], (err, row) => {
        if (err) {
          // If there is an error with the database query, return a 500 status code with the error message
          return res.status(500).json({ error: err.message });
        }
        // If the movie is in the database, return it
        if (row) {
          res.json(row);
        } else {
          // Add the movie to the database
          db.run(
            `INSERT INTO movies (title, year, plot, poster) VALUES (?, ?, ?, ?)`,
            [movie.Title, movie.Year, movie.Plot, movie.Poster],
            function(err) {
              if (err) {
                // If there is an error with the database insertion, return a 500 status code with the error message
                return res.status(500).json({ error: err.message });
              }
              // Return the newly added movie with its ID
              res.json({
                id: this.lastID,
                title: movie.Title,
                year: movie.Year,
                plot: movie.Plot,
                poster: movie.Poster
              });
            }
          );
        }
      });
    } else {
      // If the movie is not found, return a 404 status code with an error message
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    // If there is an error with the OMDb API request, return a 500 status code with the error message
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a review for a movie
app.post('/reviews', (req, res) => {
  const { movie_id, name, rating, notes } = req.body; // Extracting the review details from the request body
  // Insert the review into the database
  db.run(
    `INSERT INTO reviews (movie_id, name, rating, notes) VALUES (?, ?, ?, ?)`,
    [movie_id, name, rating, notes],
    function(err) {
      if (err) {
        // If there is an error with the database insertion, return a 500 status code with the error message
        return res.status(500).json({ error: err.message });
      }
      // Return the newly added review with its ID
      res.json({ id: this.lastID });
    }
  );
});

// Endpoint to get reviews for a movie by movie ID
app.get('/reviews/:movie_id', (req, res) => {
  const { movie_id } = req.params; // Extracting the movie ID from the request parameters
  // Select all reviews for the given movie ID from the database
  db.all(
    `SELECT * FROM reviews WHERE movie_id = ?`,
    [movie_id],
    (err, rows) => {
      if (err) {
        // If there is an error with the database query, return a 500 status code with the error message
        return res.status(500).json({ error: err.message });
      }
      // Return the list of reviews
      res.json(rows);
    }
  );
});

module.exports = app; // Export the Express application for use in the main server file
