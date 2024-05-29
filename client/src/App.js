import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cocktails from "./components/Cocktails";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";
import CocktailDetails from "./components/CocktailDetails";

function App() {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (cocktail) => {
    setFavorites([...favorites, cocktail]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cocktails"
          element={
            <Cocktails />
          }
        />
        <Route
          path="/favorites" element={
            <Favorites/>
          }
        />
        <Route path="/search" element={<SearchResults addFavorite={addFavorite} />} />
        <Route path="/cocktail/:id" element={<CocktailDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
