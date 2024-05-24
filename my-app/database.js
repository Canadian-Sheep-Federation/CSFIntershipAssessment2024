// utilized a sqlite server to temporarily store the user preferences
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // created a table with an indexing ID, and 3 fields, movie title, genre and rating
    db.run("CREATE TABLE moviePreferences (id INTEGER PRIMARY KEY AUTOINCREMENT, movieTitle TEXT, genre TEXT, rating INTEGER)");
});

module.exports = db;