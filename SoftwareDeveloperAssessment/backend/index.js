const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3100;

app.use(bodyParser.json());
app.use(cors());

app.post('/addReview', (req, res) => {
    const { videoId, name, review } = req.body;
    const query = db.prepare("INSERT INTO reviews (videoId, name, review) VALUES (?, ?, ?)");
    query.run(videoId, name, review, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).send(`Review Added by id ${this.lastID}`);
        }
    });
    query.finalize();

});


app.get('/:id', (req, res) => {
    const id = req.params.id;
    db.all("SELECT * FROM reviews WHERE videoId = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'Form not found' });
        }
    });
});

app.get('/', (req, res) => {
    db.all("SELECT * FROM reviews", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get('/id/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM reviews WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'Form not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});