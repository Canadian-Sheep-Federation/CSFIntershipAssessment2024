const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('./database');
const { response } = require('./server');

const ALPHA_VANTAGE_KEY = '1SBOHU76IKFCYG1I';

// getting stockorder from the api
router.get('/', (req, res) => {
   const sql = `SELECT * FROM stockorder`;
   db.all(sql, [], (err, rows) => {
       if (err) {
           return res.status(400).json({"error" :err.message});
       }
        res.json(rows); 
   });
});
// getting a specific stockorder from the database
router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM stockorder WHERE id = ?`;
    const id = req.params.id;
    db.get(sql,id, (err, rows) => {
        if (err) {
            return res.status(400).json({"error" :err.message});
        }
        res.json(rows);
    });
})
//inserting stockorder into the database
router.post('/', (req, res) => {
    const { stockName, orderType, number, ExpiryDate } = req.body;
    const sql = `INSERT INTO stockorder(stockName, orderType, number, ExpiryDate) VALUES(?,?,?,?)`;
    db.run(sql, [stockName, orderType, number, ExpiryDate], (err, result) => {
        if (err) {
            return res.status(400).json({"error" :err.message});
        }
        res.json({"id" : this.lastID});
        
    })
});

//getting stock information from the public api
router.get('/stocks/:symbol', async (req, res) => {
    const {symbol}  = req.params;
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: symbol,
                apikey: ALPHA_VANTAGE_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ "error": error.message });
    }
});
module.exports = router;