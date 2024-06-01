const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  isValid: { type: Boolean, required: true },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
