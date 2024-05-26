const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Create table
db.serialize(() => {
  db.run("CREATE TABLE responses (id TEXT PRIMARY KEY, name TEXT, ingredients TEXT, instructions TEXT)");
});

// Routes
app.post('/api', (req, res) => {
  const { id, name, ingredients, instructions } = req.body;
  const stmt = db.prepare("INSERT INTO responses VALUES (?, ?, ?, ?)");
  stmt.run(id, name, ingredients, instructions, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
  stmt.finalize();
});

app.get('/api/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM responses WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.get('/api', (req, res) => {
  db.all("SELECT * FROM responses", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/meals/:mealName', (req, res) => {
  const mealName = req.params.mealName;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
