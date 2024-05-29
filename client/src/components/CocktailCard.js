import React from "react";

const CocktailCard = ({
  cocktail,
  isFavorite,
  addFavorite,
  removeFavorite,
}) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    isFavorite ? removeFavorite(cocktail.idDrink) : addFavorite(cocktail);
  };

  return (
    <div className="cocktail-card border p-4 rounded">
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h2>{cocktail.strDrink}</h2>
      <p>{cocktail.strCategory}</p>
      <p>{cocktail.strAlcoholic}</p>
      <p>{cocktail.strGlass}</p>
      <button
        className="mt-2 bg-blue-500 text-white p-2 rounded"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "Remove Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default CocktailCard;
