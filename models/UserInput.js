const mongoose = require('mongoose');

const UserInputSchema = new mongoose.Schema({
    suggestion_number: Number,
    brand: String,
    category: String,
    tag: String,
    suggested_name: String,
    suggested_description: String
});

module.exports = mongoose.model('UserInput', UserInputSchema);
