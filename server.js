const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = 3000;

const WEATHERSTACK_API_KEY = '973bbde20aa4214a570939d36d6a6550';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'WebApp')));

// Function to get weather data from Weatherstack API
async function getWeather(location) {
    try {
        const weatherResponse = await axios.get('http://api.weatherstack.com/current', {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query: location
            }
        });

        if (weatherResponse.data.error) {
            throw new Error(weatherResponse.data.error.info);
        }

        return weatherResponse.data.current;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return null;
    }
}

// Modify Form Submission Route to Return ID
app.post('/', async (req, res) => {
  const { name, activity, location } = req.body;

  if (!name || !activity || !location) {
      return res.status(400).send('All fields are required');
  }

  const weather = await getWeather(location);

  const stmt = db.prepare('INSERT INTO form_data (name, activity, location, weather) VALUES (?, ?, ?, ?)');
  stmt.run(name, activity, location, JSON.stringify(weather), function (err) {
      if (err) {
          return res.status(500).send('Failed to save form data');
      }
      res.status(201).json({ id: this.lastID }); // Return ID of the submitted form
  });
  stmt.finalize();
});

// Route to Retrieve Specific Form Submission by ID
app.get('/submission/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM form_data WHERE id = ?', [id], (err, row) => {
      if (err) {
          return res.status(500).send('Failed to retrieve form data');
      }
      if (!row) {
          return res.status(404).send('Form data not found');
      }
      res.status(200).json(row);
  });
});

// Route to Retrieve All Form Submissions
app.get('/submissions', (req, res) => {
  db.all('SELECT * FROM form_data', [], (err, rows) => {
      if (err) {
          return res.status(500).send('Failed to retrieve form data');
      }
      res.status(200).json(rows);
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
