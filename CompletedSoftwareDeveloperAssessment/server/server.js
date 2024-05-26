const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(cors());

// Initialize database
db.serialize(() => {
  db.run("CREATE TABLE travel_journal (id INTEGER PRIMARY KEY AUTOINCREMENT, country TEXT, city TEXT, notes TEXT, rating INTEGER)");
});

// POST endpoint to save form data
app.post('/', (req, res) => {
  const { country, city, notes, rating } = req.body;
  db.run("INSERT INTO travel_journal (country, city, notes, rating) VALUES (?, ?, ?, ?)", [country, city, notes, rating], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID });
  });
});

// GET endpoint to retrieve form data by ID
app.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM travel_journal WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(row);
  });
});

// GET endpoint to retrieve all form data
app.get('/', (req, res) => {
  db.all("SELECT * FROM travel_journal", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
