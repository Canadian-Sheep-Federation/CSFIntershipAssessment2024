const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3001;

// to allow the frontend deployment to get access to local API end points
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(bodyParser.json());
app.unsubscribe(express.urlencoded({ extended: true }));

// Setting up Database for storing User Information
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    }
    else {
        db.run('CREATE TABLE IF NOT EXISTS favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, favourite_pokemon TEXT, favourite_move TEXT, reason TEXT)', (err) => {
            if (err) {
                console.error('Error creating table', err.message)
            }
        });
    }
});

// GET request the fetches data based on a given ID
app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM favourites WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database Error'});
        }
        else if (row) {
            res.json(row);
        }
        else {
            res.status(404).json({ error: "ID not found" });
        }
    });
});

// GET request that fetches all rows in favourites table
app.get('/api/user/', (req, res) => {
    db.all(`SELECT * FROM favourites`, [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database Error'});
        }
        else {
            res.json(rows);
        }
    });
})

// POST request that adds new user's information to the Database
app.post('/api/user', (req, res) => {
    const { name, favouritePokemon, favouriteMove, reason } = req.body;
    console.log(req.body);
    db.run('INSERT INTO favourites (name, favourite_pokemon, favourite_move, reason) VALUES (?, ?, ?, ?)', [name, favouritePokemon, favouriteMove, reason],
            function(err) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Database Error" });
                }
                else {
                    // returns ID of the newly created form response
                    res.status(201).json({ id: this.lastID});
                }
            });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

