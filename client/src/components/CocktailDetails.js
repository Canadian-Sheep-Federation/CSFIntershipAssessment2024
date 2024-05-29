import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CocktailDetails = () => {
  const { id } = useParams(); 
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `http://localhost:4000/api/cocktails//lookup/11007?id=${id}`;
        const response = await axios.get(url);
        if (response.data && response.data.drinks && response.data.drinks.length > 0) {
          setCocktail(response.data.drinks[0]);  
        } else {
          setError("No details found for this cocktail.");
        }
      } catch (err) {
        console.error("Error fetching cocktail details:", err);
        setError("Failed to fetch cocktail details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCocktailDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;

  return (
    <div className="container mx-auto px-4">
      {cocktail && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{cocktail.strDrink}</h2>
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            className="w-full h-60 object-cover mb-4"
          />
          <p><strong>Category:</strong> {cocktail.strCategory}</p>
          <p><strong>Alcoholic:</strong> {cocktail.strAlcoholic}</p>
          <p><strong>Glass:</strong> {cocktail.strGlass}</p>
          <p><strong>Instructions:</strong> {cocktail.strInstructions}</p>
          <h3 className="text-xl font-bold mt-4">Ingredients</h3>
          <ul>
            {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
              const ingredient = cocktail[`strIngredient${i}`];
              const measure = cocktail[`strMeasure${i}`];
              return ingredient ? (
                <li key={i}>
                  {ingredient} - {measure}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CocktailDetails;
