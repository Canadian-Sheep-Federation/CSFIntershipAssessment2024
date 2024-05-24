/**
 * This is for the database connection to sqlite.
 * 
 * I implemented a foreign key relationship here by creating a separate table for sheep and another table for feed logs.
 */
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sheep_nutrition.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS sheep (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sheep_id TEXT UNIQUE,
            health_status TEXT,
            condition_description TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS feed_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sheep_id TEXT,
            feed_type TEXT,
            feed_quantity REAL,
            feed_weight TEXT,
            feed_date TEXT,
            total_calories REAL,
            total_fat REAL,
            saturated_fat REAL,
            cholesterol REAL,
            sodium REAL,
            total_carbohydrate REAL,
            dietary_fiber REAL,
            sugars REAL,
            protein REAL,
            potassium REAL,
            food_photo TEXT,
            FOREIGN KEY (sheep_id) REFERENCES sheep(sheep_id)
        )
    `);
});

module.exports = db;
