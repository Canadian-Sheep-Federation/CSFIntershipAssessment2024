//Backend server using Express and SQLite

const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const cors = require('cors');
const app = express();

const PORT = 5001;

app.use(cors());
app.use(express.json());

// Connect to SQLite database
// If the database file does not exist, it will be created automatically
const db = new sqlite3.Database('./reviews.db', (err) => {
  if (err) {
    return console.error('Failed to connect to database:', err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create reviews table if it does not exist
// This table will store the reviews submitted by users
db.run(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    book_title TEXT NOT NULL,
    review TEXT
  )
`, (err) => {
  if (err) {
    return console.error('Failed to create table:', err.message);
  }
  console.log('Table created or already exists.');
  
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// POST endpoint to insert a new review
app.post('/reviews', (req, res) => {
  const { name, book_title, review } = req.body;

  if (!name || !book_title) {
    return res.status(400).json({ error: 'Name and book_title are required' });
  }

  db.run(
    `INSERT INTO reviews (name, book_title, review) VALUES (?, ?, ?)`,
    [name, book_title, review],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, book_title, review });
    }
  );
});

// GET endpoint to retrieve all reviews
app.get('/reviews', (req, res) => {
  db.all(`SELECT * FROM reviews`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET endpoint to retrieve a specific review by ID
app.get('/reviews/:id', (req, res) => {
  db.get(`SELECT * FROM reviews WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});