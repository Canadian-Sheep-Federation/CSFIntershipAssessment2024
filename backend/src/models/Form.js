const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  movie: String,
});

module.exports = mongoose.model("Form", formSchema);
