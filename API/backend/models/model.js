const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    seed1: {
        required: true, 
        type: String
    },
    seed2: {      
        required: false, 
        type: String
    },
    seed3: {
        required: false, 
        type: String
    },
    seed4: {
        required: false, 
        type: String
    },
    seed5: {
        required: false, 
        type: String
    },
    seed1type: {
        required: true,
        type: String
    },
    seed2type: {
        required: false,
        type: String
    },
    seed3type: {
        required: false,
        type: String
    },
    seed4type: {
        required: false,
        type: String
    },
    seed5type: {
        required: false,
        type: String
    },
    minbpm: {
        required: true,
        type: Number
    },
    maxbpm: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)