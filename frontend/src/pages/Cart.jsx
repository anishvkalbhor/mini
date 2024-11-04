import React, { useContext } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from "../firebase";
import {useAuth} from '../contexts/authContext/index';

const Cart = () => {
  const { carts, updateCartQuantity, removeFromCart, clearCart, addOrder } =
    useContext(CartContext);
  const navigate = useNavigate();
  const { currentUser } = useAuth();


  const calculateTotal = () => {
    return carts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleUpdateQuantity = (name, quantity) => {
    updateCartQuantity(name, quantity);
    toast.info(`Quantity updated for ${name}`);
  };

  const handleRemoveFromCart = (name) => {
    removeFromCart(name);
    toast.error(`${name} removed from cart`);
  };

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QBKOWP2oQkdeIloanCHIdd8E4XyNwksDammT3HfPWwpkKhsWpFUNCM9YNjq5NHO6aW7z1eMgAcbkd3tnXJ47y3n00KT9afTmk"
    );
  
    const body = { products: carts };
    const headers = { "Content-Type": "application/json" };
  
    try {
      const response = await fetch("http://localhost:7000/api/create-checkout-session", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
  
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
      if (result.error) {
        console.log(result.error);
        toast.error("Payment failed. Please try again.");
        return;
      }
  
      await addOrder(carts, calculateTotal()); 
      await clearCart(carts);
  
      toast.success("Payment successful! Redirecting to your orders...");
      setTimeout(() => navigate("/orderhistory"), 500);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="relative">
        <h1 className="text-4xl font-semibold text-gray-700 mb-8 text-center">
          Your Cart
        </h1>

        {carts.length === 0 ? (
          <p className="text-lg text-gray-500 text-center">
            No items in your cart. Add some medicines!
          </p>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 backdrop-blur-lg">
            <div className="grid grid-cols-1 gap-4">
              {carts.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div className="flex-1 mx-4">
                    <h3 className="text-md font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMinusCircle
                      onClick={() =>
                        item.quantity > 1 &&
                        handleUpdateQuantity(item.name, item.quantity - 1)
                      }
                      className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    />
                    <p className="text-md font-semibold">{item.quantity}</p>
                    <FaPlusCircle
                      onClick={() =>
                        handleUpdateQuantity(item.name, item.quantity + 1)
                      }
                      className="text-blue-500 hover:text-blue-600 cursor-pointer"
                    />
                    <FaTrashAlt
                      onClick={() => handleRemoveFromCart(item.name)}
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <h3 className="text-xl font-semibold text-gray-700">
                Total: ₹{calculateTotal()}
              </h3>
              <button
                onClick={handlePayment}
                className="mt-4 bg-blue-500 text-white font-medium py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Cart;
