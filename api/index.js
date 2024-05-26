const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 7000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/csf_skillassessment')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB!:', err));

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Test route
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

// Post Endpoint
app.post('/starwars_form', async (req, res) => {
    try {
        // Takes in and stores form (should return ID)
        res.status(201).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get ID Endpoint
app.get('/starwars_form/:id', async (req, res) => {
    try {
        // Returns form corresponding to ID
        res.status(200).send();
    } catch (err) {
        res.status(404).send(err);
    }
});

// Get All Endpoint
app.get('starwars_form', async (req, res) => {
    try {
        // Returns all forms
        res.status(200).send();
    } catch (err) {
        res.status(404).send(err);
    }
});







