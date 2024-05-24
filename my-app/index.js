const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const omdbRoutes = require('./omdb');
const db = require('./database');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/omdb', omdbRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/', (req, res) => {
  const { movieTitle, genre, rating } = req.body;
  db.run(`INSERT INTO moviePreferences (movieTitle, genre, rating) VALUES (?, ?, ?)`, [movieTitle, genre, rating], function (err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.redirect('/');
  });
});

app.get('/', (req, res) => {
  db.all(`SELECT * FROM moviePreferences`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.render('index', { preferences: rows });
  });
});


app.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM moviePreferences WHERE id = ?`, [id], (err, row) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.render('preferenceDetails', { preference: row });
  });
});

app.post('/:id/update', (req, res) => {
  const { id } = req.params;
  const { movieTitle, genre, rating } = req.body;
  db.run(`UPDATE moviePreferences SET movieTitle = ?, genre = ?, rating = ? WHERE id = ?`, [movieTitle, genre, rating, id], function (err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.redirect(`/${id}`);
  });
});

// Project can be further improved by creating a permanent SQL server and allowing users create accounts 
// to login and share movie reviews that others can view.