// Using express and sqlite
const express = require('express');
const sqlite = require('sqlite3');
const path = require('path');


// Creating express object and database that is stored in memory
const website = express();
const db = new sqlite.Database(':memory:');

website.use(express.json());
website.use(express.urlencoded({ extended: true }));


// Create table with columns id, q1, q2, and q3
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS form_response (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        q1 TEXT,
        q2 TEXT,
        q3 TEXT
    );`);
});

// Link HTML page form.html in the same directory as server.js to the server. If the server receives a GET request, response is form.html
website.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/form.html'));
})

// If server receives a POST request to /submit, then insert response from user into form
website.post('/submit', (req, res) => {
    const {q1, q2, q3} = req.body;
    db.run(`INSERT INTO form_response (q1, q2, q3) VALUES (?, ?, ?)`, [q1, q2, q3], function(error) {
        if (error) {
            return res.status(500).send("Database insertion failed");
        }
        res.json({ id: this.lastID});
    })
})

// If server receives GET request, send all rows in database
website.get('/responses', (req, res) => {
    db.all('SELECT * FROM form_response', (error, rows) => {
        if (error) {
            return res.status(500).send("Failed to fetch form responses");
        }
        res.json(rows);
    });
});

// If server receives GET/{id} request, send row with matching id
website.get('/responses/:id', (req, res) => {
    const formId = req.params.id;
    db.get("SELECT * FROM form_response WHERE id = ?", [formId], (error, row) => {
        if (error) {
            console.error('Error retrieving form data:', error.message);
            res.status(500).json({ error: 'Failed to retrieve form data' });
        }
        res.json(row);
    });
});

// Web application / server starts and a response message is logged onto the console
website.listen(3000, () => {
    console.log('Server is running on port 3000');
});
