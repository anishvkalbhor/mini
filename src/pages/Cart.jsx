import React from 'react';
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from 'react-icons/fa';

const Cart = ({ cart, updateCartItem, removeCartItem }) => {
  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">No items in your cart. Add some medicines!</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-4"
              >
                {/* Medicine Image */}
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />

                {/* Medicine Details */}
                <div className="flex-1 mx-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-gray-600">Total: ₹{item.price * item.quantity}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center">
                  <FaMinusCircle
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    className="text-gray-600 cursor-pointer text-xl hover:text-red-500"
                  />
                  <p className="mx-4">{item.quantity}</p>
                  <FaPlusCircle
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    className="text-gray-600 cursor-pointer text-xl hover:text-green-500"
                  />
                </div>

                {/* Remove Item */}
                <FaTrashAlt
                  onClick={() => removeCartItem(item.id)}
                  className="text-red-600 cursor-pointer text-xl hover:text-red-800"
                />
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Total: ₹{calculateTotal()}</h2>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
