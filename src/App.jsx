import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login'; // Login/Register page
import Home from './pages/Home'; // Home page
import Medicines from './pages/Medicines'; // Medicines page
// import AboutPage from './components/AboutPage'; // About us page
// import ContactPage from './components/ContactPage'; // Contact page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medicines" element={<Medicines />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
