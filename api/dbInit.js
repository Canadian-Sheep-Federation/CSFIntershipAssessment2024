// Run this file to initialize the database if this has not been done already

const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("cocktails.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.log(err);
});

// Dropping current table if it exists
const drop = `DROP TABLE IF EXISTS cocktails`

// Sql statement to create the cocktail list table
const sql = `
  CREATE TABLE cocktails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drink_id INTEGER NOT NULL,
    drink_name TEXT NOT NULL,
    drink_image TEXT NOT NULL,
    instructions TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    glass_type TEXT NOT NULL,
    rating REAL NOT NULL,
    difficulty TEXT NOT NULL,
    notes TEXT DEFAULT NULL,
    date_added DATETIME NOT NULL,
    CONSTRAINT CHK_rating CHECK (rating BETWEEN 1 and 5)
  )
`

// Running both statements on database one after another
db.serialize(() => {
  db.run(drop)
    .run(sql);
});