import React, { useContext } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, addOrder } =
    useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleUpdateQuantity = (name, quantity) => {
    updateCartQuantity(name, quantity);
    toast.info(`Quantity updated for ${name}`);
  };

  const handleRemoveFromCart = (name) => {
    removeFromCart(name);
    toast.error(`${name} removed from cart`);
  };

  // payment integration

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QBKOWP2oQkdeIloanCHIdd8E4XyNwksDammT3HfPWwpkKhsWpFUNCM9YNjq5NHO6aW7z1eMgAcbkd3tnXJ47y3n00KT9afTmk"
    );

    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:7000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
        toast.error("Payment failed. Please try again.");
        return; // Exit if there's an error
      }

      await addOrder(cart, calculateTotal());
      await clearCart();
      toast.success("Payment successful! Redirecting to your orders...");

      navigate("/orderhistory");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  // const handlePayment = async () => {
  //   const stripe = await loadStripe("pk_test_...");
  //   const body = { products: cart };
  //   const headers = { "Content-Type": "application/json" };

  //   try {
  //     const response = await fetch("http://localhost:7000/api/create-checkout-session", {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(body),
  //     });
  //     const session = await response.json();

  //     const result = await stripe.redirectToCheckout({ sessionId: session.id });

  //     if (result.error) {
  //       toast.error("Payment failed. Please try again.");
  //       return;
  //     }

  //     await addOrder(cart, calculateTotal());
  //     await clearCart();
  //     toast.success("Payment successful! Redirecting to your orders...");

  //     navigate("/order-history");

  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     toast.error("Payment failed. Please try again.");
  //   }
  // };

  return (
    <motion.div className="relative container mx-auto py-12 px-4 min-h-screen">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-80"
        style={{ zIndex: -1 }}
      />
      <motion.div className="absolute top-10 left-10 w-60 h-60 bg-blue-300 rounded-full opacity-30 filter blur-xl" />
      <motion.div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full opacity-30 filter blur-2xl" />

      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-xl text-gray-200 text-center">
          No items in your cart. Add some medicines!
        </p>
      ) : (
        <motion.div className="bg-white/40 backdrop-blur-lg shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 mx-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMinusCircle
                    onClick={() =>
                      item.quantity > 1 &&
                      handleUpdateQuantity(item.name, item.quantity - 1)
                    }
                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                  />
                  <p className="text-lg">{item.quantity}</p>
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
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: ₹{calculateTotal()}
            </h3>
            <motion.button
              onClick={handlePayment}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </motion.div>
      )}

      <ToastContainer />
    </motion.div>
  );
};

export default Cart;
