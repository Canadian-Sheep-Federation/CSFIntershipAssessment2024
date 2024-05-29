import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CocktailCard from "../components/CocktailCard";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("name");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:4000/api/cocktails/search?name=${searchTerm}`;
        const response = await axios.get(url);
        setSearchResults(response.data.drinks);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const handleAddFavorite = async (cocktail) => {
    try {
      const payload = { idDrink: cocktail.idDrink };
      console.log("Payload being sent to the server:", payload);
      const response = await axios.post(
        "http://localhost:4000/api/cocktails/favorites",
        payload
      );

      console.log("Favorite added:", response.data);
      setFavorites((prevFavorites) => [...prevFavorites, cocktail]);
    } catch (err) {
      console.error("Error adding favorite:", err);
      setError("Failed to add favorite. Please try again.");
    }
  };

  const handleRemoveFavorite = async (idDrink) => {
    try {
      console.log("Removing favorite with idDrink:", idDrink);
      await axios.delete(`http://localhost:4000/api/cocktails/favorites/${idDrink}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.idDrink !== idDrink)
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
      setError("Failed to remove favorite. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((cocktail) => (
            <CocktailCard
              className="border p-4 rounded"
              key={cocktail.idDrink}
              cocktail={cocktail}
              isFavorite={favorites.some(
                (fav) => fav.idDrink === cocktail.idDrink
              )}
              addFavorite={handleAddFavorite}
              removeFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
