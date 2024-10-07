import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // Adjust the path according to your structure

const Navbar = () => {
  const { user, doSignOut } = useAuth(); // Access the user and sign-out function
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For dropdown toggle

  const handleLogout = async () => {
    await doSignOut();
  };

  return (
    <nav className="bg-amber-50 bg-opacity-20 backdrop-blur-md shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-black font-bold text-2xl">
          <Link to="/home" className="hover:text-blue-300 transition duration-300">CarryCure</Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-8">
          <Link to="/home" className="text-black hover:text-blue-400 font-medium transition duration-300">Home</Link>
          <Link to="/medicines" className="text-black hover:text-blue-400 font-medium transition duration-300">Medicines</Link>
          <Link to="/about" className="text-black hover:text-blue-400 font-medium transition duration-300">About Us</Link>
          <Link to="/contact" className="text-black hover:text-blue-400 font-medium transition duration-300">Contact</Link>
        </div>

        {/* User section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="text-white hover:text-blue-300 transition duration-300">{user.displayName}</span>
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-md py-2 z-10">
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-black hover:text-blue-300 font-medium transition duration-300"
            >
              Login/Register
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg px-4 py-2">
          <Link to="/home" className="block text-gray-700 hover:bg-gray-100 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block text-gray-700 hover:bg-gray-100 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Medicines</Link>
          <Link to="/about" className="block text-gray-700 hover:bg-gray-100 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="block text-gray-700 hover:bg-gray-100 py-2 rounded-lg" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
