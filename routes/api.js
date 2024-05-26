const express = require('express');
const router = express.Router();
const FormResponse = require('../models/formResponse');
const axios = require('axios');
const crypto = require('crypto');

// Marvel API credentials
const publicKey = 'YOUR_PUBLIC_KEY_HERE';
const privateKey = 'YOUR_PRIVATE_KEY_HERE';

// Function to generate a hash
function generateHash(ts, privateKey, publicKey) {
    return crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
}

// POST /: Save a new form response
router.post('/', async (req, res) => {
    const formResponse = new FormResponse(req.body);
    try {
        const savedResponse = await formResponse.save();
        res.status(201).send({ id: savedResponse._id });
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET /: Get all form responses
router.get('/', async (req, res) => {
    try {
        const responses = await FormResponse.find();
        res.status(200).send(responses);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /:id: Get a form response by id
router.get('/:id', async (req, res) => {
    try {
        const response = await FormResponse.findById(req.params.id);
        if (!response) return res.status(404).send('Form response not found');
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /marvel/:characterName: Fetch Marvel character data
router.get('/marvel/:characterName', async (req, res) => {
    const ts = Date.now().toString();
    const hash = generateHash(ts, privateKey, publicKey);
    const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = `${baseURL}?name=${encodeURIComponent(req.params.characterName)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await axios.get(url);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Marvel API: ' + error);
    }
});

module.exports = router;
