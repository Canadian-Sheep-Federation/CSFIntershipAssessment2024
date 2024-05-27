const express = require('express');
const router = express.Router();
const Form = require('../models/movieDetails');

// POST /: Ingest a new response
router.post('/', async (req, res) => {
  try {
    const { customerName, movieTitle, movieRating } = req.body;
    const newForm = new Form({ customerName, movieTitle, movieRating });
    const savedForm = await newForm.save();
    res.status(200).json({ id: savedForm._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /:id: Retrieve response by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /: Retrieve all responses
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
