const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(
  cors({
      origin: "*"
  })
);
// Database setup
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE reviews (id INTEGER PRIMARY KEY, book_id TEXT, book_title TEXT, author TEXT, review TEXT)");
});

// Routes
app.post('/', (req, res) => {
  const { book_id, book_title, author, review } = req.body;
  const stmt = db.prepare("INSERT INTO reviews (book_id, book_title, author, review) VALUES (?, ?, ?, ?)");
  stmt.run(book_id, book_title, author, review, function (err) {
    if (err) {
      res.status(500).send("Error inserting data");
    } else {
      res.json({ id: this.lastID });
    }
  });
  stmt.finalize();
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM reviews WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).send("Error fetching data");
    } else {
      res.json(row);
    }
  });
});

app.get('/', (req, res) => {
  db.all("SELECT * FROM reviews", [], (err, rows) => {
    if (err) {
      res.status(500).send("Error fetching data");
    } else {
      res.json(rows);
    }
  });
});

app.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  const page = req.query.page || 1; // Default to page 1 if not provided
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&page=${page}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Error fetching data from Open Library API");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});