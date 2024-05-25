const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');

//Create the ToDo table which will contain all of the ToDo items with parameters id, name, date, and status
db.serialize(() => {
    db.run("CREATE TABLE ToDo (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, status TEXT)");
});

db.on('open', () => {
    console.log('Database connection established successfully');
});

module.exports = db;