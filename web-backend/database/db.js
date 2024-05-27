const sqlite = require('sqlite3').verbose(); // including sqlite

// Connnect to DB
const db = new sqlite.Database('./database/mydb.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Connected to the in-memory SQlite database.');
});

module.exports = db;