import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?name=${searchTerm}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center w-full max-w-lg">
          <img
            src="https://www.thecocktaildb.com/images/ingredients/gin-Small.png"
            alt="Gin"
            className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32"
          />
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
            Welcome to Cocktail Finder
          </h1>
          <p className="text-gray-600 mb-8">
            Explore a wide variety of cocktails and find your favorites
          </p>
          <div className="max-w-md mx-auto">
            <input
              className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search cocktails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search cocktails"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full mt-2 w-full sm:w-auto sm:ml-2"
            >
              Search
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            Don't know what to search?{" "}
            <Link to="/cocktails" className="text-blue-500">
              Browse cocktails
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
