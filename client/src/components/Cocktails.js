import React, { useState, useEffect } from "react";
import axios from "axios";

const Cocktails = ({ addFavorite, removeFavorite }) => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => setCocktails(response.data.drinks))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cocktails</h2>
      <div className="bg-green-200 text-green-800 p-2 rounded mb-4"></div>
      <div className="grid grid-cols-3 gap-4">
        {cocktails.map((cocktail) => (
          <div key={cocktail.strDrink} className="border p-4 rounded">
            <h3 className="text-lg font-bold mb-2">{cocktail.strDrink}</h3>
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="w-full h-40 object-cover mb-2"
            />
            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
              Add to Favorite
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">
              Remove Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cocktails;
