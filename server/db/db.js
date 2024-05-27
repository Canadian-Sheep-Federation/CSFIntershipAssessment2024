const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./db/quotes.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) { return console.error(err.message); }
});

module.exports.CreateTable = function () {
    db.run(`CREATE TABLE IF NOT EXISTS quotes(id INTEGER PRIMARY KEY,text,author,genre);`);
}

module.exports.InsertQuote = async function (text, author, genre) {
    let id = 0;
    let sql = `INSERT INTO quotes(text,author,genre) VALUES (?,?,?);`
    
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(
                sql, 
                [text, author, genre],
                (err) => {
                    if (err) { return console.error(err.message); }
                }
            );
            
            db.all(
                `SELECT * FROM quotes;`,
                [],
                (err, rows) => {
                    if (err) { return console.error(err.message); }
                    id = rows.length;
                    
                    resolve();
                }
            )
        });
    });
    
    return id;
}

module.exports.GetQuote = async function (id) {
    let row = {};
    let sql = `SELECT * FROM quotes WHERE id = ?;`
    
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(sql, [id], (err, rows) => {
                if (err) { return console.error(err.message); }
                if (rows.length > 0) {
                    row = rows[0];
                }
                
                resolve();
            });
        });
    });
    
    console.log("return");
    return row;
}

module.exports.GetRandomQuote = async function () {
    let quote = null;
    let sql = `SELECT * FROM quotes;`;
    
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(sql, [], (err, rows) => {
                if (err) { return console.error(err.message); }
                if (rows.length > 0) {
                    let chosen = Math.min(Math.floor(Math.random() * (rows.length)), rows.length - 1);
                    quote = rows[chosen];
                }
                
                resolve();
            });
        });
    });
    
    // default incase the database is empty or errors
    if (quote == null) {
        quote = {
            text: 'Nothing',
            author: 'Nobody',
            genre: 'Empty'
        };
    }
    
    return quote;
}

module.exports.GetAllQuotes = async function () {
    let quotes = [];

    let sql = `SELECT * FROM quotes;`;
    
    await new Promise ((resolve, reject) => {
        db.serialize(() => {
            db.all(
                sql, [],
                (err, rows) => {
                    if (err) { return console.error(err.message); }

                    rows.forEach((row) => {
                        quotes.push(row);
                    });
                    
                    resolve();
                }
            );
        });
    });
    
    return quotes;
}

module.exports.Drop = function () {
    db.run(`DROP TABLE quotes;`);
}


