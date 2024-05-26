const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT

// middleware declared
app.use(bodyParser.json());
app.use(cors());

// connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// describing my schema
const formSchema = new mongoose.Schema({
    catFact: String,
    reviewerName: String,
    reviewText: String,
    reviewRating: Number,
});

const Form = mongoose.model('Form', formSchema);

// POST /: this handles the post request and saves the data to the database
app.post('/', async (req, res) => {
    
    console.log('Received form data:', req.body); // for testing 

    try {
        const form = new Form(req.body);
        await form.save();
        res.json({ id: form.id }); // returning the ID

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /:id: getting the data from a specific ID
app.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ error: 'Form not found' });
        res.json(form);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /: getting all reviews in the database
app.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//creating server listener
app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
});
