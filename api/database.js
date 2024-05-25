const sqlite3 = require("sqlite3").verbose();
const filepath = "./posts.db";

// Creating SQLite database
const createDB = () => {
  const db = new sqlite3.Database(filepath, (e) => {
    if (e) {
      console.log(e);
    }
    createPostTable(db);
  });
  return db;
};

// Creating note table for database
const createPostTable = (db) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        postName    VARCHAR(50) NOT NULL,
        tag     VARCHAR(50) NOT NULL,
        comment     VARCHAR(1000) NOT NULL,
        imageURL     VARCHAR(50) NOT NULL
    );   
    `);
};

module.exports = createDB();