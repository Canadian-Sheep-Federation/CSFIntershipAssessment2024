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
    id: Number,
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
app.post('/starwars', async (req, res) => {

    const { name, email, age, favouriteStarWarsMovie, favouriteStarWarsMovieRating, favouriteStarWarsCharacter, favouriteStarWarsCharacterRating } = req.body;

    // Validate request fields
    if (!name || typeof name !== 'string') {
        return res.status(400).send({ message: 'Name is required' });
    }
    const emailPattern = /.+\@.+\..+/;
    if (!email || !emailPattern.test(email)) {
        return res.status(400).send({ message: 'Invalid email address' });
    }
    if (!Number.isInteger(age) || age < 0) {
        return res.status(400).send({ message: 'Age must be a non-negative integer' });
    }
    if (!favouriteStarWarsMovie || typeof favouriteStarWarsMovie !== 'string') {
        return res.status(400).send({ message: 'Favourite Star Wars Movie is required' });
    }
    if (!Number.isInteger(favouriteStarWarsMovieRating) || favouriteStarWarsMovieRating < 0 || favouriteStarWarsMovieRating > 10) {
        return res.status(400).send({ message: 'Favourite Star Wars Movie Rating must be between 0 and 10' });
    }
    if (!favouriteStarWarsCharacter || typeof favouriteStarWarsCharacter !== 'string') {
        return res.status(400).send({ message: 'Favourite Star Wars Character is required' });
    }
    if (!Number.isInteger(favouriteStarWarsCharacterRating) || favouriteStarWarsCharacterRating < 0 || favouriteStarWarsCharacterRating > 10) {
        return res.status(400).send({ message: 'Favourite Star Wars Character Rating must be between 0 and 10' });
    }

    // Takes in and stores form (should return ID)
    try {
        // Generate form ID
        const formCount = await Form.countDocuments();
        const ID = formCount + 1;

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

        res.status(200).send({message: 'Form created successfully', id: form.id });
    } catch (err) {
        res.status(500).send({message: 'Internal Server Error: Form creation failed'});
    }
});

// Get ID Endpoint
app.get('/starwars/:id', async (req, res) => {
    try {
        // Find form by ID
        const targetID = req.params.id; // Get ID from request
        const form = await Form.findOne({ id: targetID }, '-_id -__v'); // Find form in database
        
        // Returns form corresponding to ID
        res.status(200).send({Form: form});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error: Form not in Database"}); // Error handling
    }
});

// Get All Endpoint
app.get('/starwars', async (req, res) => {
    try {
        // Get all forms
        const forms = await Form.find().select('-__v -_id');

        // Returns all forms
        res.status(200).send({Forms: forms});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error: No Forms in Database"}); // Error handling
    }
});







