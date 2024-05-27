// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-white text-xl font-bold">
          MovieSearch
        </Link>
      </div>
    </header>
  );
};

export default Header;
