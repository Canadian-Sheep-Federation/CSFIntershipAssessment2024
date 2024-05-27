// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./weather_database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS form_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    activity TEXT NOT NULL,
    location TEXT NOT NULL,
    weather TEXT
  )`);
});

module.exports = db;
