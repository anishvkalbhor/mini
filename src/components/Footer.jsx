import React from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

const Footer = () => {
  const userLocation = { lat: 19.229, lng: 72.854 }; // Example: Borivali (W), Mumbai

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

        {/* Right Section: Google Map for Nearby Pharmacies */}
        <motion.div
          className="rounded-lg overflow-hidden shadow-xl"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerClassName="w-full h-64 rounded-lg"
              center={userLocation}
              zoom={14}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }]
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e0e0e0" }]
                  },
                ],
              }}
            >
              <Marker position={userLocation} label="You" />
              {/* Additional pharmacy markers can be added here */}
            </GoogleMap>
          </LoadScript>
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
