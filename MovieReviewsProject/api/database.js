const sqlite3 = require('sqlite3').verbose();

// create an in-memory database
const db = new sqlite3.Database(':memory:');

// create a persistent database
db.serialize(() => {
  // create a new table named 'movies'
  db.run(`CREATE TABLE movies ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    year TEXT,
    plot TEXT,
    poster TEXT
  )`);
  // create a new table named 'reviews'
  db.run(`CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER,
    name TEXT,
    rating INTEGER,
    notes TEXT,
    FOREIGN KEY(movie_id) REFERENCES movies(id)
  )`);
});

module.exports = db;
