import mongoose from 'mongoose';

// schema for currency exchange forms
const currency_schema = new mongoose.Schema({
  currency_from: String,
  currency_to: String,
  amount_from: Number,
  amount_to: Number,
  exhcange_rate: Number,
  title: String,
  date: { type: Date, default: Date.now }
});

const CurrencyForm = mongoose.model('conversion', currency_schema);

export default {
  CurrencyForm
};