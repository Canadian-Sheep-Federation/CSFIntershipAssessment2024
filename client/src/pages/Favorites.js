import React, { useState, useEffect } from "react";
import axios from "axios";
import CocktailCard from "../components/CocktailCard";

const Favorites = ({addFavorite}) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/cocktails/favorites"
        );
        const cocktailIds = response.data.cocktails;
        const res = await Promise.all(
          cocktailIds.map(async (cId) => {
            const cocktailData = await axios.get(
              `http://localhost:4000/api/cocktails/cocktail?id=${cId}`
            );
            return cocktailData.data.drinks[0];
          })
        );
        setFavorites(res);
        console.info("res", res);
        console.info("favorites", favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to fetch favorites. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/cocktails/favorites/${id}`);
      setFavorites(favorites.filter((favorite) => favorite.idDrink !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
      setError("Failed to remove favorite. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Favorite Cocktails</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((favorite) => (
            <CocktailCard
              key={favorite.idDrink}
              cocktail={favorite}
              addFavorite={addFavorite}
              isFavorite={true}
              removeFavorite={() => handleRemoveFavorite(favorite.idDrink)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;


