import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // Adjust the path according to your structure

const Navbar = () => {
  const { currentUser, userLoggedIn, loading, doSignOut } = useAuth(); // Access the user, auth state, and sign-out function
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For dropdown toggle

  const handleLogout = async () => {
    try {
      await doSignOut();
      setIsMenuOpen(false);
      navigate('/login');  // Redirect to login or home page after logout
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-opacity-30 backdrop-blur-xl shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-extrabold text-2xl">
          <Link to="/" className="hover:text-blue-200 transition-all duration-300">
            CarryCure
          </Link>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-blue-300 font-semibold transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/medicines"
            className="text-white hover:text-blue-300 font-semibold transition-all duration-300"
          >
            Medicines
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-blue-300 font-semibold transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-blue-300 font-semibold transition-all duration-300"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            className="text-white hover:text-blue-300 font-semibold transition-all duration-300"
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
                <span className="text-white font-semibold hover:text-blue-300 transition-all duration-300">
                  {currentUser?.displayName || currentUser?.email}
                </span>
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-md py-2 z-10">
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-all duration-200"
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
                className="text-white hover:text-blue-200 font-medium transition-all duration-300"
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
            className="text-white focus:outline-none"
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
        <div className="md:hidden bg-blue-600 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg px-4 py-2">
          <Link
            to="/home"
            className="block text-white hover:bg-blue-500 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/medicines"
            className="block text-white hover:bg-blue-500 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Medicines
          </Link>
          <Link
            to="/about"
            className="block text-white hover:bg-blue-500 py-2 rounded-lg transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:bg-blue-500 py-2 rounded-lg transition-all duration-200"
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
