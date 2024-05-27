// config/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


// Define the SQL statement to create a new table named 'forms'
const createTable = `CREATE TABLE IF NOT EXISTS forms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// Create a new SQLite database (stored in the 'database.sqlite' file)
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
