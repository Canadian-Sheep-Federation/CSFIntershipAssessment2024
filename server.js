
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const Product = require('./models/Product');
const UserInput = require('./models/UserInput');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoURL = 'mongodb://localhost:27017/makeup';
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Fetch and store products from external API (makeup-api.herokuapp.com) only once
const fetchAndStoreProducts = async () => {
    try {
        const response = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json');
        const products = response.data;

        for (const productData of products) {
            // Check if the product already exists based on the unique product ID
            const existingProduct = await Product.findOne({ id: productData.id });

            if (!existingProduct) {
                const product = new Product(productData);
                await product.save();
            }
        }

        console.log('Products fetched and stored successfully');
    } catch (err) {
        console.error('Error fetching or storing products', err);
    }
};

// Call the function to fetch and store products only once
fetchAndStoreProducts();

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /api/user-input: Takes in the form data and stores it in the data store
app.post('/api/user-input', async (req, res) => {
    try {
        const userInputData = req.body;
        const existingUserInput = await UserInput.findOne({ suggestion_number: userInputData.suggestion_number });
        if (existingUserInput) {
            return res.status(400).json({ error: 'Suggestion Number already exists' });
        }
        const userInput = new UserInput(userInputData);
        await userInput.save();
        res.status(201).json({ id: userInput.suggestion_number });
    } catch (err) {
        res.status(500).json({ error: 'Error saving user input' });
    }
});

// GET /api/user-input/:number: Returns the form corresponding to the suggestion number
app.get('/api/user-input/:number', async (req, res) => {
    try {
        const userInput = await UserInput.findOne({ suggestion_number: req.params.number });
        if (userInput) {
            res.status(200).json(userInput);
        } else {
            res.status(404).json({ error: 'User input not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user input' });
    }
});

// GET /api/user-input: Returns all responses to the form
app.get('/api/user-input', async (req, res) => {
    try {
        const userInputs = await UserInput.find();
        res.status(200).json(userInputs);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user inputs' });
    }
});

// GET /api/products: Returns all makeup products, with optional filtering
app.get('/api/products', async (req, res) => {
    const { brand, category, tag_list } = req.query;
    let query = {};

    if (brand) query.brand = brand;
    if (category) query.category = category;
    if (tag_list) query.tag_list = tag_list;

    console.log('Query:', query);  // Debugging line

    try {
        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
