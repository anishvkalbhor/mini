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
import Payment from './pages/Payment';  
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './contexts/CartContext';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import Webcam  from 'react-webcam';


const App = () => {

  return (
    <CartProvider>
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
          <Route path="/payment" element={<Payment />} />
          <Route path="/webcam" element={<Webcam />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </CartProvider>
    
  );
};

export default App;