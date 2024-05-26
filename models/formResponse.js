const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
    name: String,
    email: String,
    favoriteCharacter: String,
    comments: String
});

module.exports = mongoose.model('FormResponse', formResponseSchema);
