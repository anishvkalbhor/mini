import React, { useContext, useEffect, useState } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Modal from 'react-modal';

const stripePromise = loadStripe('pk_test_51QBKOWP2oQkdeIloanCHIdd8E4XyNwksDammT3HfPWwpkKhsWpFUNCM9YNjq5NHO6aW7z1eMgAcbkd3tnXJ47y3n00KT9afTmk'); // Replace with your publishable key

Modal.setAppElement('#root'); // For accessibility with modal

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, currentUser } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.displayName : "",
    address: "",
    contact: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      toast.success("Payment Successful!");
    }
  }, [location]);

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

  const handlePayment = async () => {
    const amount = calculateTotal() * 100; // Convert to cents/paise
    try {
      const res = await fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret); // Set the client secret for Stripe
      setModalIsOpen(true); // Open the modal when payment intent is created
    } catch (error) {
      toast.error("Failed to create payment intent");
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formData.name,
          address: {
            line1: formData.address,
          },
          phone: formData.contact,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      toast.success("Payment Successful!");
      clearCart(); // Clear the cart after payment
      setModalIsOpen(false); // Close the modal on success
      navigate("/", { state: { paymentSuccess: true } });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div className="relative container mx-auto py-12 px-4 min-h-screen">
      {/* Background Effects */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-80" style={{ zIndex: -1 }} />
      <motion.div className="absolute top-10 left-10 w-60 h-60 bg-blue-300 rounded-full opacity-30 filter blur-xl" />
      <motion.div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full opacity-30 filter blur-2xl" />

      <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-xl text-gray-200 text-center">No items in your cart. Add some medicines!</p>
      ) : (
        <motion.div className="bg-white/40 backdrop-blur-lg shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item) => (
              <motion.div key={item.id} className="flex justify-between items-center border-b border-gray-200 py-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1 mx-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMinusCircle onClick={() => item.quantity > 1 && handleUpdateQuantity(item.name, item.quantity - 1)} className="text-blue-500 hover:text-blue-600 cursor-pointer" />
                  <p className="text-lg">{item.quantity}</p>
                  <FaPlusCircle onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)} className="text-blue-500 hover:text-blue-600 cursor-pointer" />
                  <FaTrashAlt onClick={() => handleRemoveFromCart(item.name)} className="text-red-500 hover:text-red-600 cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <h3 className="text-2xl font-bold text-gray-800">Total: ₹{calculateTotal()}</h3>
            <motion.button onClick={handlePayment} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              Proceed to Checkout
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Modal for Payment Details */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Payment Modal" className="modal-container">
        <motion.div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Enter Payment Details</h2>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <CardElement className="p-3 border rounded-md" />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors w-full">
              Pay Now
            </button>
          </form>
          <button onClick={() => setModalIsOpen(false)} className="mt-4 text-blue-500 hover:underline">Cancel</button>
        </motion.div>
      </Modal>

      <ToastContainer />
    </motion.div>
  );
};

export default Cart;
