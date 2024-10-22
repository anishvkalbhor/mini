import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // Adjust the path according to your structure

const Navbar = () => {
  const { currentUser, userLoggedIn, loading, doSignOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Make sure to import useNavigate

  const handleLogout = async () => {
    try {
      await doSignOut();
      setIsMenuOpen(false);
      navigate('/login'); // Redirect to login or home page after logout
    } catch (error) {
      console.error('Error during sign-out', error);
    }
  };

  return (
    <nav className="bg-gray-800 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-2xl">
          <Link to="/" className="hover:text-gray-300 transition-all duration-300">
            CarryCure
          </Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-200 hover:text-gray-300 font-semibold transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/medicines"
            className="text-gray-200 hover:text-gray-300 font-semibold transition-all duration-300"
          >
            Medicines
          </Link>
          <Link
            to="/medicine"  // Corrected path for Health Blog
            className="text-gray-200 hover:text-gray-300 font-semibold transition-all duration-300"
          >
            Health Blog
          </Link>
          <Link
            to="/HealthBlog"  // Updated path for About Us
            className="text-gray-200 hover:text-gray-300 font-semibold transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-200 hover:text-gray-300 font-semibold transition-all duration-300"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="text-gray-200 hover:text-gray-300 font-semibold transition-all duration-300"
          >
            Cart
          </Link>
        </div>

        {/* User section */}
        <div className="flex items-center space-x-4">
          {userLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <span className="text-gray-200 font-semibold hover:text-gray-300 transition-all duration-300">
                  {currentUser?.displayName || currentUser?.email}
                </span>
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 shadow-md rounded-lg py-2 z-10">
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-600 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-600 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <Link
                to="/login"
                className="text-gray-200 hover:text-gray-300 font-medium transition-all duration-300"
              >
                Login/Register
              </Link>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-200 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 shadow-lg px-4 py-2 rounded-lg">
          <Link
            to="/"
            className="block text-gray-200 hover:bg-gray-600 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/medicines"
            className="block text-gray-200 hover:bg-gray-600 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Medicines
          </Link>
          <Link
            to="/medicine"  // Corrected path for Health Blog
            className="block text-gray-200 hover:bg-gray-600 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Health Blog
          </Link>
          <Link
            to="/HealthBlog"  // Updated path for About Us
            className="block text-gray-200 hover:bg-gray-600 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-gray-200 hover:bg-gray-600 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
