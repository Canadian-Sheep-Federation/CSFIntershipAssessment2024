require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:'); // Use a file-based database instead of ':memory:' for persistence

app.use(bodyParser.json());
app.use(cors());

// Initialize the database
db.serialize(() => {
  db.run("CREATE TABLE news (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, url TEXT, imageUrl TEXT, publishedAt TEXT)");
});

// NewsData API key
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// POST /
// Fetches news articles based on the provided keyword and stores them in the database
app.post('/', async (req, res) => {
  const { keyword } = req.body;
  try {
    const response = await axios.get(`https://newsdata.io/api/1/news`, {
      params: {
        apikey: NEWS_API_KEY,
        q: keyword
      }
    });
    const articles = response.data.results;

    articles.forEach(article => {
      db.run("INSERT INTO news (title, description, url, imageUrl, publishedAt) VALUES (?, ?, ?, ?, ?)", 
        [article.title, article.description, article.link, article.image_url, article.pubDate]);
    });

    res.status(200).json({ message: 'News articles fetched and stored successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /:id
// Returns the news article corresponding to the given ID
app.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM news WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// GET /
// Returns all the news articles stored in the database
app.get('/', (req, res) => {
  db.all("SELECT * FROM news", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// DELETE /
// Deletes all news articles in the database
app.delete('/', (req, res) => {
  db.run("DELETE FROM news", [], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'All news articles deleted successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 3001; // Make sure the port is set to 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
