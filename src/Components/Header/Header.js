import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import PawsomeLogo from '../../../src/Assets/Images/WideLogo.png';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Sidebar Toggle Button for smaller screens */}
            <button
                onMouseEnter={() => setIsOpen(true)}
                className="md:hidden absolute right-0 top-0 transform -translate-y-1/2 p-5 mt-20 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open main menu</span>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Sidebar Navigation for smaller screens */}
            <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute w-40 h-full top-0 right-0 bg-gray-800 shadow-xl z-50`}>
                <div className="p-5 text-white">
                    <Link to="/" className="block py-2 px-3 text-white hover:bg-blue-800 rounded mb-2">Home</Link>
                    <Link to="/memories" className="block py-2 px-3 text-white hover:bg-blue-800 rounded">Memories</Link>
                </div>
            </div>

            {/* Regular Navigation for md and larger screens */}

            {/* Main Content */}
            <section className="bg-gradient-to-br from-purple-600 to-blue-500 hidden md:block">
                <header className="text-white p-4 flex justify-center">
                    <div className='rounded-md'>
                        <img src={PawsomeLogo} className="rounded-full border-2" alt="logoPicture" />
                    </div>
                </header>

                <div className="hidden md:flex justify-center items-center text-gray-50 px-10 py-4">
                    <div>
                        <Link to="/" className="text-white px-4 py-2 rounded hover:bg-blue-700">Home</Link>
                        <Link to="/memories" className="text-white px-4 py-2 rounded hover:bg-blue-700">Memories</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
