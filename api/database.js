const sqlite3 = require("sqlite3").verbose();
const filepath = "./players.db";

const createDB = () => {
  const db = new sqlite3.Database(filepath, (e) => {
    if (e) {
      console.log(e);
    }
    createPostTable(db);
  });
  return db;
};

const createPostTable = (db) => {
  db.run(`
    CREATE TABLE IF NOT EXISTS players
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(50) NOT NULL,
                dateOfBirth DATE NOT NULL,
                gender VARCHAR(50) NOT NULL,
                height INTEGER NOT NULL,
                weight INTEGER NOT NULL
    );   
    `);
};

module.exports = createDB();