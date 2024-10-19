import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login'; 
import Home from './pages/Home'; 
import Medicines from './pages/Medicines'; 
import MedicineDetails from './pages/MedicineDetails'; 
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './contexts/CartContext';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import WebcamCapture from './pages/WebcamCapture';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QBKOWP2oQkdeIloanCHIdd8E4XyNwksDammT3HfPWwpkKhsWpFUNCM9YNjq5NHO6aW7z1eMgAcbkd3tnXJ47y3n00KT9afTmk'); // Replace with your publishable key


const App = () => {
  return (
    <CartProvider>
      <Elements stripe={stripePromise}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/medicine-details/:id" element={<MedicineDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/webcam" element={<WebcamCapture />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </Router>
      </Elements>
    </CartProvider>
  );
};

export default App;