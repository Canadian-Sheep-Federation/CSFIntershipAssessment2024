require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./database');
const port = 3000;

const app = express();

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
}); 

app.listen(port, () => {
    console.log(`Web app listening at http://localhost:${port}`);
});

//Get weather information from WeatherStack using the user inputted parameter of location
app.get('/weather', async (req, res) => {
    try {
        const location = req.query.location;
        const apiKey = process.env.WEATHERSTACK_API_KEY;
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`);
        //Filter out excess information
        const weatherInformation = {
            name: response.data.request.query,
            date: new Date().toLocaleDateString(),
            temperature: response.data.current.temperature
        }
        res.json(weatherInformation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get all ToDo items from the ToDo table.
app.get('/toDoList', (req, res) => {
    db.all('SELECT * FROM ToDo', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

//Get ToDo item information from ToDo table based on the inputted id.
app.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM ToDo WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else if (!row){
            return res.status(404).json({ error: 'ToDo item not found' });
        }
        res.json(row);
    });
});

//Post new ToDo item to the ToDo table based on the user inputted values for name, date, and status.
app.post('/', (req, res) => {
    const { name, date, status } = req.body;
    db.run('INSERT INTO ToDo (name, date, status) VALUES (?, ?, ?)', [name, date, status], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const objId = this.lastID;
        res.status(200).json({ message: "ToDo item added successfully with id: ", id: objId});
    });
});

//Put: Update ToDo item based on id with new user inputted Name, Date, and Status
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, date, status } = req.body;

    db.get('SELECT * FROM ToDo WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'ToDo item not found' });
        }

        db.run('UPDATE ToDo SET name = ?, date = ?, status = ? WHERE id = ?', [name, date, status, id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: "ToDo item updated successfully"});
        });
    });
});