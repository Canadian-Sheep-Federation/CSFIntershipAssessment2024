const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./storage.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

// creating the table stock order
// sql = `CREATE TABLE IF NOT EXISTS stockorder ( id INTEGER PRIMARY KEY AUTOINCREMENT, stockName TEXT, orderType TEXT, number INTEGER, ExpiryDate Date);`;

// db.run(sql, (err) => { 
//     if (err) return console.error("Table already exists or error: ", err.message);
// });
// inserting dummy data into the agents table
// sql = `INSERT INTO stockorder(stockName, orderType, number, ExpiryDate) VALUES(?, ?, ?, ?);`;
// db.run(sql, ['TSLA', 'buy', 10, '2024-5-24'], (err) => { if (err) return console.error(err.message); });

// show all agents;
// sql = `SELECT * FROM stockorder;`;
// db.all(sql, [], (err, rows) => {
//     if (err) return console.error(err.message);
//     console.log(rows);
// });
// drop table stockorder;
// sql = 'DROP TABLE IF EXISTS stockorder;';
// db.run(sql, (err) => {
//     if (err) return console.error(err.message);
// });
module.exports = db;