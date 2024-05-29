const express = require("express");
const router = express.Router();
const cocktailController = require("../controllers/cocktailController");

router.get("/api/cocktails/search", cocktailController.searchCocktailByName);
router.post("/api/cocktails/favorites", cocktailController.addFavorite);
router.get("/api/cocktails/cocktail", cocktailController.findCocktial);
router.get("/api/cocktails/favorites", cocktailController.getFavorites);
router.delete(
  "/api/cocktails/favorites/:id",
  cocktailController.deleteFavorite
);

module.exports = router;
