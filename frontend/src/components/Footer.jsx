import React from 'react';
import { motion } from 'framer-motion';
import NearbyPharmacies from './NearbyPharmacies'; // Import your map component

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 py-12 px-6 md:px-12 text-gray-200 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Circles for Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gray-700 rounded-full opacity-30 blur-lg"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-600 rounded-full opacity-20 blur-lg"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Company Info and Links */}
        <motion.div
          className="space-y-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-extrabold text-white">CarryCure</h2>
          <p className="text-gray-300">
            <strong>Contact Us:</strong>
          </p>
          <p className="text-gray-300">
            Email: <a href="mailto:anishkalhor2020@gmail.com" className="text-gray-100 hover:underline">anishkalhor2020@gmail.com</a><br />
            Phone: <span className="text-gray-100">+91 9325359422</span><br />
            Address: <span className="text-gray-100">Borivali (W), Mumbai, India</span>
          </p>

          {/* Links to Different Pages */}
          <ul className="space-y-2 text-gray-300">
            <li><a href="/about" className="hover:text-gray-100 transition-colors">About Us</a></li>
            <li><a href="/medicines" className="hover:text-gray-100 transition-colors">Medicines</a></li>
            <li><a href="/contact" className="hover:text-gray-100 transition-colors">Contact</a></li>
          </ul>
        </motion.div>

        {/* Right Section: Map */}
        <motion.div
          className="space-y-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-extrabold text-white">Nearby Pharmacies</h2>
          
          {/* Map Component */}
          <div className="h-50 w-full bg-gray-700 rounded-lg p-2">
            <NearbyPharmacies />  
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative mt-8 text-center text-sm text-gray-400 border-t border-gray-600 pt-4">
        © 2024 CarryCure. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
