const express = require('express');
const cors = require("cors");
const https = require('https');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
app.use(cors());
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
const db = require("./database");

//Get All football players
app.get('/football/players', async (req, res) => {
    const query = `SELECT * FROM players`

    db.all(query, [], (e, rows) => {
        if (e) {
            res.status(400).json({ error: "Could not retrieve posts." });
        } else {
            res.status(200).json({ players: rows });
        }
    });
})

//Add football player from form
app.post('/football/players', async (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, height, weight} = req.body;
    try {

        const newID = await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO players (firstName, lastName, dateOfBirth, gender, height, weight) VALUES (?, ?, ?, ?, ?, ?)`,
                [firstName, lastName, dateOfBirth, gender, height, weight],
                function (e) {
                    if (e) {
                        reject(e);
                    }
                    resolve(this.lastID);
                }
            );
        });

        res.status(200).json({ message: `${newID}` })

    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})

//Get football players from database with ID
app.get("/football/players/:ID", (req, res) => {

    const id = req.params.ID
    const query = `SELECT * FROM players WHERE ID = ?`

    db.get(query, [id], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (!row) {
          res.status(404).json({ error: "Player not found" });
          return;
        }
        res.json(row);
    });

})

//Get All football players from public API
app.get('/publicAPI', async (req, res) => {
    const response = await fetch('https://api.sportmonks.com/v3/football/players?api_token=vWyWYfB1BlHREUbEN5reVLPUnEBlKeXgHybX9agxvf3h0BXkouXKCYw7fgzU', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const results = await response.json()
    console.log(results);
    
    res.status(200).send(results);
})