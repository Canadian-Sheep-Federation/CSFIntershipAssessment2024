const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  cocktails: [
    {
      type: String,
      required: true,
    },
  ],
});

const Favorite = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorite;
