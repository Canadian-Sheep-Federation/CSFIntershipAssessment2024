const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, country TEXT, favourite_dog TEXT)");
});

// Routes
app.post('/api/favourites', (req, res) => {
  const { name, country, favourite_dog } = req.body;
  db.run("INSERT INTO favourites (name, country, favourite_dog) VALUES (?, ?, ?)", [name, country, favourite_dog], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/favourites', (req, res) => {
  db.all("SELECT * FROM favourites", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/favourites/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM favourites WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.get('/api/leaderboard', (req, res) => {
  const { country } = req.query;
  let query = "SELECT favourite_dog, COUNT(*) AS votes FROM favourites";
  const params = [];
  if (country) {
    query += " WHERE country = ?";
    params.push(country);
  }
  query += " GROUP BY favourite_dog ORDER BY votes DESC";
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
