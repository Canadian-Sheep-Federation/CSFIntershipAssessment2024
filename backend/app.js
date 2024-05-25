import express from 'express';
import mongoose from 'mongoose';
import model from './model.js';
import currency_api from './currency_api.js';
import asyncHandler from 'express-async-handler'
import { configDotenv } from 'dotenv';

// config environment variables
configDotenv();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";
const app = express();

// set up body parser middleware
app.use(express.json());

// POST: Takes in the form and stores it in your chosen data store, return the id of the newly created form response
app.post('/', asyncHandler(async (req, res) => {
  try {
    const exchange_rate = await currency_api.getExchangeRate(req.body.currency_from, req.body.currency_to);
    const currency_form = new model.CurrencyForm({
      currency_from: req.body.currency_from,
      currency_to: req.body.currency_to,
      amount_from: req.body.amount_from,
      amount_to: req.body.amount_from * exchange_rate,
      title: req.body.title,
      exchange_rate: exchange_rate
    });

    await currency_form.save();
    return res.status(201).json({ id: currency_form._id });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}));

// GET: Returns the form corresponding to the id
app.get('/:id', (req, res) => {
  model.CurrencyForm.findById(req.params.id).then(form => {
    if (!form)
      return res.status(404).send("Form is not found!");
    return res.json(form);
  }).catch(error => {
    return res.status(500).send(error.message);
  });
});

// GET: Returns all responses to the form
app.get('/', (req, res) => {
  model.CurrencyForm.find({}).then(forms => {
    return res.json(forms);
  }).catch(error => {
    return res.status(500).send(error.message);
  });
});

// start server with database on PORT
mongoose.connect(DB_URL).then(() => {
  app.listen(PORT, (error) => {
    if (!error)
      console.log(`Server has successfully started on port ${PORT}`);
    else
      console.error(`Server init error: ${error}`)
  });
}).catch(error => {
  console.error(error.message);
});
