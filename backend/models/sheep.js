const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')('mongoose')

const sheepSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    motto: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("sheep", sheepSchema)