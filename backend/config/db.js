const sqlite3 = require('sqlite3').verbose();
const path = require('path');


// Define the SQL statement to create a new table named 'songs'
const createTable = `CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  songName TEXT,
  rating INTEGER,
  comments TEXT
)`;

const db = new sqlite3.Database(path.resolve(__dirname, '../data/database.sqlite'), (err) => {
  if (err) {
    console.error('Failed to connect to the database.', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Initialize the database schema
db.serialize(() => {
  db.run(createTable, (err) => {
    if (err) {
      console.error('Failed to create the table.', err.message);
    } else {
      console.log('Successfully created the table.');
    }
  }
)});

module.exports = db;
