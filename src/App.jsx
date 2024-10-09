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
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './contexts/CartContext';
import About from './pages/About';

const App = () => {

  // const [cart, setCart] = useState([]);

  // const addToCart = (item) => {
  //   const exists = cart.find(cartItem => cartItem.id === item.id);
    
  //   if (exists) {
  //     setCart(
  //       cart.map(cartItem =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       )
  //     );
  //     toast.info("Quantity increased!", { position: toast.POSITION.TOP_RIGHT });
  //   } else {
  //     setCart([...cart, { ...item, quantity: 1 }]);
  //     toast.success("Item added to cart!", { position: toast.POSITION.TOP_RIGHT });
  //   }
  // };

  // const updateCartItem = (id, newQuantity) => {
  //   setCart(cart.map(item => 
  //     item.id === id ? { ...item, quantity: newQuantity } : item
  //   ));
  // };

  // const removeCartItem = (id) => {
  //   setCart(cart.filter(item => item.id !== id));
  // };

  return (
    <CartProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/medicines" element={<Medicines  />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/medicine-details/:id" element={<MedicineDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    </CartProvider>

  );
};

export default App;
