const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

const mongoUri = 'mongodb://localhost:27017/local';
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true, enum: ['black', 'white', 'brown', 'orange', 'grey', 'mixed'] },
    comment: String,
}, { collection: 'cats' });

const Form = mongoose.model('Form', formSchema);

app.post('/', async (req, res) => {
    try {
        const formData = new Form(req.body);
        const form = await formData.save();
        res.status(201).json({ id: form._id });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).send('Form not found');
        }
        res.status(200).json(form);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/', async (req, res) => {
    try {
        const forms = await Form.find({});
        res.status(200).json(forms);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));