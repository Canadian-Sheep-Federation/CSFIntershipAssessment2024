const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        videoId TEXT, 
        name TEXT, 
        review TEXT
      )`, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table created or already exists.");
        }
    });
});

module.exports = db;