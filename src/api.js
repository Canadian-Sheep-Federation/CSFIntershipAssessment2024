const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');
const axios = require('axios');
const router = express.Router();

router.use(bodyParser.json());

// POST route for recipe submissions
router.post('/', (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const query = 'INSERT INTO responses (name, ingredients, instructions) VALUES (?, ?, ?)';
  db.run(query, [name, ingredients, instructions], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// GET route for a specific recipe by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM responses WHERE id = ?';
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// GET route for all recipes
router.get('/', (req, res) => {
  const query = 'SELECT * FROM responses';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Fetch meals by name from the MealDB API
router.get('/meals/:name', async (req, res) => {
  const mealName = req.params.name;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
