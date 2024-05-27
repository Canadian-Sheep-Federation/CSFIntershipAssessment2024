const express = require('express')
const app = express();
const cors = require('cors');
const axios = require('axios').default;

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/weather.db')

app.use(cors());
app.use(express.json())

const api = require('./API/api');

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS weather 
            (
                Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                Location TEXT,
                Symptoms TEXT, 
                Severity TEXT, 
                Icon TEXT, 
                Temperature TEXT, 
                Description Text, 
                Humidity Text, 
                BarometricP Text
            )`
        )
})


// get all form inputs from database
app.get('/', async (req, res) => {

    let data = [];

    await new Promise((resolve, reject) => {
        db.each('SELECT * FROM weather', [], (err, rows) => {
            if (err) reject(err)
            let newRow = [
                            rows.Id,
                            rows.Location, 
                            rows.Symptoms, 
                            rows.Severity, 
                            rows.Icon, 
                            rows.Temperature, 
                            rows.Description, 
                            rows.Humidity, 
                            rows.BarometricP
                        ]
            data.push(newRow);
            console.log("DATA" + data);
            console.log(data);
            resolve()
        })
    })

    res.send(data);
})


// get form input and weatherapi data from specific id
app.get('/:id', async (req, res) => {

    let data = [];

    console.log("HERE" + req.params.id)

    await new Promise((resolve, reject) => {
        db.serialize(() => {
            db.each('SELECT * FROM weather WHERE Id = (?) ', [req.params.id], (err, rows) => {
                if (err) {
                    console.log("No route")
                    reject(err)
                }
                let newRow = [
                    req.params.id,
                    rows.Location, 
                    rows.Symptoms, 
                    rows.Severity, 
                    rows.Icon, 
                    rows.Temperature, 
                    rows.Description, 
                    rows.Humidity, 
                    rows.BarometricP
                ]
                data.push(newRow);
                console.log("DATA" + data);
                resolve()
            })
        })
    })

    res.send(data);

})


// add form data and weatherapi data to database
app.post('/', async (req, res) => {

    try {

        const WeatherData = await api.fetchWeather(req.body.Location);

        db.serialize(() => {
            db.run(`INSERT INTO weather (
                    Location, 
                    Symptoms, 
                    Severity, 
                    Icon, 
                    Temperature, 
                    Description,
                    Humidity,
                    BarometricP
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    WeatherData.location.name + ", " + WeatherData.location.region + ", " + WeatherData.location.country, 
                    req.body.Symptoms, 
                    req.body.Severity, 
                    WeatherData.current.condition.icon, 
                    WeatherData.current.condition.text, 
                    WeatherData.current.temp_c,
                    WeatherData.current.humidity, 
                    WeatherData.current.pressure_mb,
                ]
            )
        })

        res.send("Form submitted successfully");
    } catch (error) {
        console.log("TESTING IF ERRORED");
        return res.status(400).send({
            message: 'This is an error!'
         });
        //res.send(error);
    }

})


// initialize backend server
app.listen(8080, () => {
    console.log(`App listening on port 8080`)
})