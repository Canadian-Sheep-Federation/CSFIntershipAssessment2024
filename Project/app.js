const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Initialize SQLite database with a file
const db = new sqlite3.Database(path.join(__dirname, 'db', 'comments.db'));

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, status_code INTEGER, name TEXT, comment TEXT)");
});

// Handle the image query
app.get('/query', (req, res) => {
    const statusCode = req.query['status-code'];
    if (!statusCode) {
        return res.status(400).send('Status code is required');
    }
    const catImageUrl = `https://http.cat/${statusCode}`;
    res.redirect(catImageUrl);
});

// Handle comments retrieval by status code
app.get('/comments', (req, res) => {
    const statusCode = req.query['status-code'];
    db.all("SELECT * FROM comments WHERE status_code = ?", [statusCode], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ comments: rows });
    });
});

// Handle retrieval of all comments
app.get('/comments/all', (req, res) => {
    db.all("SELECT * FROM comments", (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ comments: rows });
    });
});

// Handle retrieval of a single comment by ID
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM comments WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json({ comment: row });
    });
});

// Handle new comment submission
app.post('/comments', (req, res) => {
    const { statusCode, name, comment } = req.body;
    const stmt = db.prepare("INSERT INTO comments (status_code, name, comment) VALUES (?, ?, ?)");
    stmt.run(statusCode, name, comment, function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        db.all("SELECT * FROM comments WHERE status_code = ?", [statusCode], (err, rows) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json({ id: this.lastID, comments: rows });
        });
    });
    stmt.finalize();
});

// Handle deletion of a comment by ID
// app.delete('/comments/:id', (req, res) => {
//     const id = req.params.id;
//     db.run("DELETE FROM comments WHERE id = ?", [id], function(err) {
//         if (err) {
//             return res.status(500).send(err.message);
//         }
//         res.status(204).send();
//     });
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
