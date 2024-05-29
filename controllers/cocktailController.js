const fetch = require("node-fetch");
const Favorite = require("../models/favoriteModel");

const COCKTAIL_API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

exports.searchCocktailByName = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await fetch(
      `${COCKTAIL_API_BASE_URL}/search.php?s=${name}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findCocktial = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await fetch(`${COCKTAIL_API_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { idDrink } = req.body;
    const updateResult = await Favorite.updateOne({
      $addToSet: { cocktails: idDrink },
    });

    if (updateResult.nModified === 0) {
      return res.status(404).json({ message: "Failed to add favorite" });
    }

    res.status(201).json({ message: "Favorite added successfully", idDrink });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findOne();
    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};
exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const cocktail = await Favorite.findOne({ cocktails: id });
    if (!cocktail) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    cocktail.cocktails.pull(id);
    await cocktail.save();

    res.json({ message: "Favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
