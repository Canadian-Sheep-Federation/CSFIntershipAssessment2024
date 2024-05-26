// initDb.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ratings.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movieTitle TEXT NOT NULL,
        overall TEXT NOT NULL,
        story TEXT NOT NULL,
        actors TEXT NOT NULL,
        effects TEXT NOT NULL,
        date TEXT NOT NULL
    )`);
});

db.close();
