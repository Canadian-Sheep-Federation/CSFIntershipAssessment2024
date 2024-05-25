const express = require('express');
const router = express.Router();
const FormResponse = require('../models/formResponse');
const Joi = require('joi');

// POST / - Create a new form response
router.post('/', async (req, res) => {
  const schema = Joi.object({
    movieTitle: Joi.string().required(),
    rating: Joi.number().required(),
    director: Joi.string(), // Optional field
    // Add validation for other fields as needed
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }});

// GET /{id} - Get a specific form response
router.get('/:id', async (req, res) => {
  try {
    const response = await FormResponse.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ error: 'Response not found' });
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch response' });
  }
});

// GET / - Get all form responses
router.get('/', async (req, res) => {
  try {
    const responses = await FormResponse.find();
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

module.exports = router;