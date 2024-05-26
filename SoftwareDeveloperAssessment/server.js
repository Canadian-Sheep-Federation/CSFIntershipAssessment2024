const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 8080;

// Initialize SQLite database
const db = new sqlite3.Database('ratings.db');


app.use(express.json());
app.use(express.static('public'));

app.listen(
    PORT,
    () => console.log(`Working on http://localhost:${PORT}`)
)

// Returns a list of movies in JSON with the title variable passed in
app.get('/movie/:title', async (req, res) => {
    const {title} = req.params;
    
    try {
        const URL = `https://www.omdbapi.com/?s=${title}&type=movie&apikey=f6db05a2`;
        const response = await fetch(URL);
        const movieList = await response.json();
        
        if (movieList.Response === "False") {
            return res.status(404).send({ message: movieList.Error });
        }
        
        res.status(200).send(movieList);
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while fetching the movie data.', error: error.message });
    }
});

// Returns the review that has said id
app.get('/reviews/:id', async (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM ratings WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).send({ message: 'An error occurred while fetching the review.', error: err.message });
        }

        if (!row) {
            return res.status(404).send({ message: 'Review not found.' });
        }

        res.status(200).send(row);
    });
});

// Returns all reviews
app.get('/reviews', async (req, res) => {
    db.all(`SELECT * FROM ratings`, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: 'An error occurred while fetching the reviews.', error: err.message });
        }

        res.status(200).send(rows);
    });
});


app.post('/submit-rating', (req, res) => {
    const { movieTitle, overall, story, actors, effects } = req.body;

    if (!movieTitle || !overall || !story || !actors || !effects) {
        return res.status(400).send({ message: 'All fields are required.' });
    }

    const ratingData = {
        movieTitle,
        overall,
        story,
        actors,
        effects,
        date: new Date().toISOString()
    };

    db.run(`INSERT INTO ratings (movieTitle, overall, story, actors, effects, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [ratingData.movieTitle, ratingData.overall, ratingData.story, ratingData.actors, ratingData.effects, ratingData.date],
        function(err) {
            if (err) {
                return res.status(500).send({ message: 'An error occurred while saving the rating.', error: err.message });
            }
            res.status(200).send({ message: `Rating submitted successfully! ID:${this.lastID}`});
        }
    );
});