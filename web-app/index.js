const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mywebapp',
 { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for form data
const formDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const FormData = mongoose.model('FormData', formDataSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/public', async (req, res) => {
    try {
        const response = await axios.get('https://http.cat/');
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/form', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).send('Form data saved');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/form', async (req, res) => {
    try {
        const formData = await FormData.find();
        res.json(formData);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
