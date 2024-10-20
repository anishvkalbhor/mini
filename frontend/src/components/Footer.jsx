import React from 'react';
import { motion } from 'framer-motion';
import NearbyPharmacies from './NearbyPharmacies'; // Import your map component

const Footer = () => {

  return (
    <motion.footer
      className="bg-gradient-to-r from-blue-700 to-violet-600 py-12 px-6 md:px-12 text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Circles for Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-30 blur-lg"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500 rounded-full opacity-20 blur-lg"></div>

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
          <p className="text-gray-200">
            Email: <a href="mailto:anishkalhor2020@gmail.com" className="text-violet-300 hover:underline">anishkalhor2020@gmail.com</a><br />
            Phone: <span className="text-violet-300">+91 9325359422</span><br />
            Address: <span className="text-violet-300">Borivali (W), Mumbai, India</span>
          </p>

          {/* Links to Different Pages */}
          <ul className="space-y-2 text-gray-300">
            <li><a href="/about" className="hover:text-violet-200 transition-colors">About Us</a></li>
            <li><a href="/medicines" className="hover:text-violet-200 transition-colors">Medicines</a></li>
            <li><a href="/contact" className="hover:text-violet-200 transition-colors">Contact</a></li>
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
          <div className="h-50 w-full">
            <NearbyPharmacies />  
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative mt-8 text-center text-sm text-gray-200 border-t border-gray-500 pt-4">
        © 2024 CarryCure. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
