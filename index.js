const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors()); // to get around port issues

// this is our API

// Initialize sqlite database, data stored in forms.db
const db = new sqlite3.Database('forms.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run('CREATE TABLE IF NOT EXISTS form_responses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, likeRon TEXT NOT NULL, likeMoustache TEXT NOT NULL, favouriteAnimal TEXT NOT NULL, sin TEXT NOT NULL)', (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            }
        });
    }
});

// POST /: takes in the form and stores it
app.post('/', (req, res) => {
    const { name, email, likeRon, likeMoustache, favouriteAnimal, sin } = req.body;
    if (!name || !email || !likeRon || !likeMoustache || !favouriteAnimal || !sin) {
        return res.status(400).json({ error: 'All fields are required!'});
    }

    const statement = db.prepare('INSERT INTO form_responses (name, email, likeRon, likeMoustache, favouriteAnimal, sin) VALUES (?, ?, ?, ?, ?, ?)');

    statement.run(name, email, likeRon, likeMoustache, favouriteAnimal, sin, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(201).json({ id: this.lastID });
    });
    statement.finalize();
});

// GET /{id}: Returns form corresponding to this id
app.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM form_responses WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Form not found.'});
        }
        res.json(row);
    });
});

// GET /: Returns all responses to the form.
app.get('/', (req, res) => {
    db.all('SELECT * FROM form_responses', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});