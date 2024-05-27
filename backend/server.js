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

// Initialize the database with an additional comments table
db.serialize(() => {
  db.run("CREATE TABLE news (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, url TEXT, imageUrl TEXT, publishedAt TEXT)");
  db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, newsId INTEGER, comment TEXT, createdAt TEXT, FOREIGN KEY(newsId) REFERENCES news(id))");
});

// NewsData API key
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// POST /search
// Fetches news articles based on the provided keyword without storing them in the database
app.post('/search', async (req, res) => {
  const { keyword } = req.body;
  try {
    const response = await axios.get(`https://newsdata.io/api/1/news`, {
      params: {
        apikey: NEWS_API_KEY,
        q: keyword
      }
    });
    const articles = response.data.results.map(article => ({
      title: article.title,
      description: article.description,
      url: article.link,
      imageUrl: article.image_url,
      publishedAt: article.pubDate
    }));
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /archive
// Stores selected news articles in the database
app.post('/archive', (req, res) => {
  const { title, description, url, imageUrl, publishedAt } = req.body;
  db.run("INSERT INTO news (title, description, url, imageUrl, publishedAt) VALUES (?, ?, ?, ?, ?)", 
    [title, description, url, imageUrl, publishedAt], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
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

// GET /:id
// Returns a single news article by ID
app.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM news WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// POST /:id/comments
// Adds a comment to the specified news article
app.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const createdAt = new Date().toISOString();
  db.run("INSERT INTO comments (newsId, comment, createdAt) VALUES (?, ?, ?)", [id, comment, createdAt], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// GET /:id/comments
// Returns all comments for the specified news article
app.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  db.all("SELECT * FROM comments WHERE newsId = ?", [id], (err, rows) => {
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
