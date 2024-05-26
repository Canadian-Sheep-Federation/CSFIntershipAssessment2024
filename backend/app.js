const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const axios = require('axios');

// Initialize the app and middleware
const app = express();
app.use(bodyParser.json()); // Support JSON-encoded bodies
app.use(cors()); // Enable CORS for all requests

// Connect to SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');
});

// Set up the database table for storing reviews
const dbSetup = () => {
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        breed TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comments TEXT
    )`, (err) => {
        if (err) {
            return console.error("Error creating table: " + err.message);
        }
        console.log("Table created or already exists.");
    });
};
dbSetup();

// Endpoint to submit a new review
app.post('/reviews', (req, res) => {
    const { breed, rating, comments } = req.body;
    const sql = `INSERT INTO reviews (breed, rating, comments) VALUES (?, ?, ?)`;
    const params = [breed, rating, comments];

    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Review Saved', id: this.lastID });
    });
});

// Endpoint to fetch all reviews
app.get('/reviews', (req, res) => {
    const sql = `SELECT * FROM reviews`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint to fetch a specific review by ID
app.get('/reviews/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM reviews WHERE id = ?`;

    db.get(sql, id, (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(400).json({ error: err.message });
        }
        res.json(row);
    });
});

// Endpoint to fetch dog breeds from the Dog CEO API
app.get('/breeds', async (req, res) => {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        res.json(response.data.message);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch breeds' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
