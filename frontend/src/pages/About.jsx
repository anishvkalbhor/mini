import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaCheckCircle, FaUsers, FaEnvelope } from 'react-icons/fa';

const About = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 md:p-16 relative overflow-hidden"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaHeartbeat className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              Our mission is to ensure that everyone has access to affordable and reliable healthcare products. We offer a wide range of medicines and health products that meet the highest standards of quality and safety.
            </p>
          </motion.div>

          {/* Quality Assurance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Quality Assurance</h2>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              We take the quality of our products very seriously. All our medicines are sourced from reputable manufacturers and stored under optimal conditions to ensure their efficacy and safety.
            </p>
          </motion.div>

          {/* Our Team */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaUsers className="text-gray-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              Our team of experienced pharmacists, healthcare professionals, and customer service representatives are dedicated to providing the best service to our customers.
            </p>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaEnvelope className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              If you have any questions, feel free to reach out to us at{' '}
              <a href="mailto:support@carrycure.com" className="text-green-600 hover:underline">
                support@carrycure.com
              </a>.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-300 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
    </div>
  );
};

export default About;
