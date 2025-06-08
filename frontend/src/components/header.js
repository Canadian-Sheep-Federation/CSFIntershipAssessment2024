import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);


  return (
      
     <header className="shadow-md tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 px-10 py-3 bg-slate-800 min-h-[65px]">
        <Link to="/" className="text-white text-lg font-semibold">
          Meal Reviews
        </Link>

        {/* Hamburger Icon */}
        <div className="flex lg:hidden">
          <button onClick={toggleMenu} className="cursor-pointer">
            <svg
              className="w-7 h-7"
              fill="#fff" // White fill
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:right-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50`}
        >
          <button
            onClick={closeMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
            </svg>
          </button>

          <ul onClick={closeMenu} className="text-white lg:flex lg:gap-5">
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="/" className="block font-medium text-[15px] text-black lg:text-white hover:text-gray-400">
                Home
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <Link to="/reviewlist" className="block font-medium text-[15px] text-black lg:text-white hover:text-gray-400">
                All Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;