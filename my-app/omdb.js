// Set up for utilizing the api OMDB, for movie details

const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '2420a83b';
const OMDB_URL = 'http://www.omdbapi.com/';

router.get('/movieDetails/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const response = await axios.get(OMDB_URL, {
            params: {
                t: title,
                apikey: API_KEY
            }
        });
        res.render('movieDetails', { movie: response.data }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
