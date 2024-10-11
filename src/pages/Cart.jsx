import React, { useContext } from 'react';
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from 'react-icons/fa';
import { CartContext } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Function to handle item quantity updates
  const handleUpdateQuantity = (name, quantity) => {
    updateCartQuantity(name, quantity);
    toast.info(`Quantity updated for ${name}`);  // Show toast for updating quantity
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (name) => {
    removeFromCart(name);
    toast.error(`${name} removed from cart`);  // Show toast for removing an item
  };

  return (
    <motion.div
      className="relative container mx-auto py-12 px-4 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background with animated gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-80"
        style={{ zIndex: -1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Subtle animated background blobs */}
      <motion.div
        className="absolute top-10 left-10 w-60 h-60 bg-blue-300 rounded-full opacity-30 filter blur-xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.9, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full opacity-30 filter blur-2xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.9, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror' }}
      />

      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-xl text-gray-200 text-center">No items in your cart. Add some medicines!</p>
      ) : (
        <motion.div
          className="bg-white/40 backdrop-blur-lg shadow-lg rounded-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-4"
                whileHover={{ scale: 1.02 }}
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />

                <div className="flex-1 mx-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-gray-600">Total: ₹{item.price * item.quantity}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <FaMinusCircle
                    onClick={() => {
                      if (item.quantity > 1) {
                        handleUpdateQuantity(item.name, item.quantity - 1);
                      }
                    }}
                    className="text-gray-600 cursor-pointer text-2xl hover:text-red-500"
                  />
                  <p>{item.quantity}</p>
                  <FaPlusCircle
                    onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}
                    className="text-gray-600 cursor-pointer text-2xl hover:text-green-500"
                  />
                </div>

                <FaTrashAlt
                  onClick={() => handleRemoveFromCart(item.name)}
                  className="text-red-600 cursor-pointer text-2xl hover:text-red-800"
                />
              </motion.div>
            ))}
          </div>

          {/* Total Price Section */}
          <motion.div
            className="flex justify-between items-center mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800">Total: ₹{calculateTotal()}</h2>
            <button className="bg-blue-600/80 text-white px-6 py-2 rounded-lg hover:bg-blue-700/90 transition">
              Proceed to Checkout
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </motion.div>
  );
};

export default Cart;
