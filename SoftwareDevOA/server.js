const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());

// Serves the static file from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

db.serialize(() => {
    db.run("CREATE TABLE form_responses (id INTEGER PRIMARY KEY, name TEXT, email TEXT, feedback TEXT)");
});

// POST /: Store form response
app.post('/form', (req, res) => {
    const { name, email, feedback } = req.body;
    const stmt = db.prepare("INSERT INTO form_responses (name, email, feedback) VALUES (?, ?, ?)");
    stmt.run(name, email, feedback, function (err) {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(201).send({ id: this.lastID });
        }
    });
    stmt.finalize();
});

// GET /form: Retrieves all the form responses
app.get('/form', (req, res) => {
    db.all("SELECT * FROM form_responses", [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// GET /form/:id: Retrieves the form response by ID
app.get('/form/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM form_responses WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).send({ error: 'Form response not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
