const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const ApiURL = 'http://localhost:3000/form';

// Home page to display form and responses
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(ApiURL);
    res.render('index', { forms: response.data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Submission page
app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/form', async (req, res) => {
  try {
    const { customerName, movieTitle, movieRating } = req.body;
    await axios.post(ApiURL, { customerName, movieTitle, movieRating });
    res.redirect('/');
  } catch (err) {
    res.status(400).send(err.message);
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});
