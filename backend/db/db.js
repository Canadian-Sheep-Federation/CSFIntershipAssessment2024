import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open SQLite database
const dbOpen = open({
    filename: './reviews.db',
    driver: sqlite3.Database,
});

// Initialize database and create table if it doesn't exist
const init = async () => {
    const db = await dbOpen; // Wait for database to open
    await db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            anime TEXT NOT NULL,
            recommended TEXT NOT NULL CHECK (recommended IN ('yes', 'no')),
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 10),
            comment TEXT NOT NULL);
    `);
};

await init(); // Runs initialization

export default dbOpen;
