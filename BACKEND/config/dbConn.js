const mongoose = require('mongoose')

const connectDB = async () => {
    // Connect to MongoDB cluster
    try {
        await mongoose.connect("mongodb+srv://MaazCSF:sheepdatabase@cluster0.zbpgxuo.mongodb.net/")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB