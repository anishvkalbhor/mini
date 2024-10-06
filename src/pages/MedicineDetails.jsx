import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { FaRegCalendarAlt, FaShoppingCart } from 'react-icons/fa';

const MedicineDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const medicineRef = doc(db, 'medicine', id);
        const medicineDoc = await getDoc(medicineRef);
        if (medicineDoc.exists()) {
          setMedicine(medicineDoc.data());
        } else {
          console.log('No such medicine!');
        }
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!medicine) {
    return <p>No details available for this medicine.</p>;
  }

  // Convert Firebase Timestamp to a readable date
  const formatDate = (timestamp) => {
    return timestamp ? timestamp.toDate().toLocaleDateString() : 'N/A';
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 relative overflow-hidden"
      >
        <motion.img 
          src={medicine.image} 
          alt={medicine.name} 
          className="w-48 h-48 mx-auto mb-6 rounded-lg shadow-md" 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">{medicine.name}</h1>
        
        <div className="flex flex-col items-center mb-4">
          <span className="text-lg text-gray-700">Category: {medicine.category}</span>
          <span className="text-md text-gray-600">{medicine.description}</span>
        </div>

        <div className="flex justify-between mt-6 border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <FaRegCalendarAlt className="text-gray-500 mr-2" />
            <p className="text-lg text-gray-600">Manufacture Date: {formatDate(medicine.manufacture_date)}</p>
          </div>
          <div className="flex items-center">
            <FaRegCalendarAlt className="text-gray-500 mr-2" />
            <p className="text-lg text-gray-600">Expiry Date: {formatDate(medicine.expiry_date)}</p>
          </div>
        </div>

        <p className="text-lg text-center text-gray-700 mt-6">Price: <span className="font-bold">₹{medicine.price}</span></p>
        <p className="text-lg text-center text-gray-700 mb-4">Availability: <span className={`font-bold ${medicine.availability ? 'text-green-600' : 'text-red-600'}`}>{medicine.availability ? 'In Stock' : 'Out of Stock'}</span></p>
        
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => addToCart(medicine)}
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicineDetails;
