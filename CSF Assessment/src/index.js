const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// POST /: Takes in the form and stores it in an sqlite data store. A message box shows up to show the last ID
app.post('/', (req, res) => {
  const { name, email, movie } = req.body;
  db.run('INSERT INTO form_responses (name, email, movie) VALUES (?, ?, ?)', [name, email, movie], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// GET /: Returns all survey's created from the POST taken from the sqlite database
app.get('/all', (req, res) => {
    db.all('SELECT * FROM form_responses', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });
  

// GET /{id}: Returns a survey based on the id in which it was made. Ex:  get /1 returns the first survey made
app.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM form_responses WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'There is no responses in the database with that ID' });
    }
    res.json(row);
  });
});

// Route to query the IMDb API
app.get('/imdb/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const response = await axios.get(`https://search.imdbot.workers.dev/?q=${title}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
