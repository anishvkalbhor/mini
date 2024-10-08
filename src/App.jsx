import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login'; // Login/Register page
import Home from './pages/Home'; // Home page
import Medicines from './pages/Medicines'; // Medicines page
import MedicineDetails from './pages/MedicineDetails'; // Medicines page
import Contact from './pages/Contact'; // Contact page
import Cart from './pages/Cart';

const App = () => {

  const [cart, setCart] = useState([]);

  const addToCart = (medicine) => {
    setCart((prevCart) => [...prevCart, medicine]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/cart" element={<Cart cart={cart}/>} />
        <Route path="/medicine-details/:id" element={<MedicineDetails addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
