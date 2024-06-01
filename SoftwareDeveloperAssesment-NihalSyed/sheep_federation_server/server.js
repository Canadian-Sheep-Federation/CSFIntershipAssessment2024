const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize, connectDB } = require('./db');
const { DataTypes } = require('sequelize');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cat Form Model
const Cat = sequelize.define('Cat', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    catFact: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Connect to the database
connectDB();

// POST endpoint to store the form data 
app.post('/', async (req, res) => {
    try {
        const { name, age, email, catFact } = req.body;
        const cat = await Cat.create({ name, age, email, catFact });
        console.log('Form inserted with ID:', cat.id);
        console.log('Form data:', cat.dataValues);
        res.status(201).json({ id: cat.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to retrieve all form responses
app.get('/list', async (req, res) => {
    // print('list')
    try {
        const cats = await Cat.findAll();
        if (!cats) {
            return res.status(404).json({ message: 'No cats found' });
        }
        res.json(cats);
    } catch (error) {
        console.error('Error retrieving rows:', error.message);
        res.status(400).json({ message: error.message });
    }
});

//GET endpoint to retrieve a specific form by ID
app.get('/:id', async (req, res) => {
    try {
        const cat = await Cat.findByPk(req.params.id);
        if (!cat) {
            return res.status(404).json({ message: 'Cat not found' });
        }
        res.json(cat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Serve the form page
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listen to Server
app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`Server is running on ${url}`);
});
