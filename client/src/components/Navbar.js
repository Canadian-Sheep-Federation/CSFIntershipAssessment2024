import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold">Cocktail Finder</Link>
        <div>
          <Link to="/" className="text-white mx-2">Home</Link>
          <Link to="/cocktails" className="text-white mx-2">Cocktails</Link>
          <Link to="/favorites" className="text-white mx-2">Favorites</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
