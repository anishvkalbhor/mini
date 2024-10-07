import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs.send('service_xm6rvrf', 'template_yt0o0xa', templateParams, 'qXRSsWLLDUqAN-eR3')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 md:p-16 relative overflow-hidden"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Contact Details</h2>
            <p className="text-lg text-gray-700 mb-4">
              If you have any questions or need further assistance, feel free to contact us.
            </p>
            <div className="flex items-center mb-4">
              <FaPhone className="text-gray-500 mr-3" />
              <p className="text-lg text-gray-700">+91 9325359422</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-gray-500 mr-3" />
              <p className="text-lg text-gray-700">anishkalbhor2020@gmail.com</p>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-gray-500 mr-3" />
              <p className="text-lg text-gray-700">Borivali (W), Mumbai, India</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-lg mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                  rows="5"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
              {success && <p className="text-green-600 mt-4">Message sent successfully!</p>}
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
    </div>
  );
};

export default Contact;
