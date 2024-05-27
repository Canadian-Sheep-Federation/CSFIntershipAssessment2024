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

// Form Schema
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    favouriteStarWarsMovie: String,
    favouriteStarWarsMovieRating: Number,
    favouriteStarWarsCharacter: String,
    favouriteStarWarsCharacterRating: Number,
});

// Form Model
const Form = mongoose.model('Form', formSchema);

// Test route
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

// Post Endpoint
app.post('/starwars_form', async (req, res) => {
    // Takes in and stores form (should return ID)
    try {
        // Generate form ID
        const ID = forms.lengh + 1;

        // Read form data from request
        const form = new Form({
            id: ID,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            favouriteStarWarsMovie: req.body.favouriteStarWarsMovie,
            favouriteStarWarsMovieRating: req.body.favouriteStarWarsMovieRating,
            favouriteStarWarsCharacter: req.body.favouriteStarWarsCharacter,
            favouriteStarWarsCharacterRating: req.body.favouriteStarWarsCharacterRating,
        });

        // Save form to database
        await form.save();

        res.status(200).send({message: 'Form created successfully'});
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get ID Endpoint
app.get('/starwars_form/:id', async (req, res) => {
    try {
        // Find form by ID
        const form = await Form.findById(req.params.id);
        
        // Returns form corresponding to ID
        res.status(200).send({Form: form});
    } catch (err) {
        res.status(400).send(err); // Error handling
    }
});

// Get All Endpoint
app.get('/starwars_form', async (req, res) => {
    try {
        // Get all forms
        const forms = await Form.find();

        // Returns all forms
        res.status(200).send({Forms: forms});
    } catch (err) {
        res.status(400).send(err); // Error handling
    }
});







