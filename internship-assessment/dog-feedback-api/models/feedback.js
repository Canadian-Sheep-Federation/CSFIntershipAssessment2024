const sqlite3 = require("sqlite3").verbose();
const path = require("path");
// grabbing the absolute path as the relative path was throwing error
const dbPath = path.resolve(__dirname, "../data/feedback.db");

const db = new sqlite3.Database(
  dbPath,
  // Open the database with read/write permissions, creating the database if it does not exist
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  // if error is  thrown
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      // no erro then create the table if it doesnt exist
      console.log("Connected to the SQLite database");
      const sql = `CREATE TABLE IF NOT EXISTS feedback (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nickname TEXT NOT NULL,
          cuteness INTEGER NOT NULL,
          comment TEXT NOT NULL,
          img TEXT NOT NULL
      )`;
      db.run(sql, (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table 'feedback' created successfully");
        }
      });
    }
  }
);

module.exports = db;
