import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { FaRegCalendarAlt, FaShoppingCart } from 'react-icons/fa';

const MedicineDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [recommendedMedicines, setRecommendedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const medicineRef = doc(db, 'medicine', id);
        const medicineDoc = await getDoc(medicineRef);
        if (medicineDoc.exists()) {
          setMedicine(medicineDoc.data());
          fetchRecommendedMedicines(medicineDoc.data().category);
        } else {
          console.log('No such medicine!');
        }
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedMedicines = async (category) => {
      try {
        const medicinesRef = collection(db, 'medicine');
        const q = query(medicinesRef, where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const medicines = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== id) {
            medicines.push({ id: doc.id, ...doc.data() });
          }
        });
        setRecommendedMedicines(medicines.slice(0, 3)); // Get 3 recommended medicines
      } catch (error) {
        console.error('Error fetching recommended medicines:', error);
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row md:space-x-12 relative overflow-hidden"
      >
        {/* Left Section: Image & Info */}
        <div className="md:w-2/3">
          <motion.img
            src={medicine.image}
            alt={medicine.name}
            className="w-50 h-64 md:h-80 object-cover rounded-lg shadow-md mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{medicine.name}</h1>
          <h6 className="text-2xl font-bold text-gray-700 mb-4">{medicine.category}</h6>
          <p className="text-md text-gray-600 mb-4">{medicine.description}</p>

          <div className="flex flex-wrap justify-between items-center mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <FaRegCalendarAlt className="text-gray-500 mr-2" />
              <p className="text-lg text-gray-600">Manufacture Date: {formatDate(medicine.manufacture_date)}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaRegCalendarAlt className="text-gray-500 mr-2" />
              <p className="text-lg text-gray-600">Expiry Date: {formatDate(medicine.expiry_date)}</p>
            </div>
          </div>
        </div>

        {/* Right Section: Pricing & Add to Cart */}
        <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Price: <span className="font-bold">₹{medicine.price}</span>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Availability: <span className={`font-bold ${medicine.availability ? 'text-green-600' : 'text-red-600'}`}>
              {medicine.availability ? 'In Stock' : 'Out of Stock'}
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() => addToCart(medicine)}
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </motion.button>
        </div>
      </motion.div>

      {/* Recommended Medicines Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Medicines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedMedicines.map((recMed) => (
            <motion.div
              key={recMed.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img src={recMed.image} alt={recMed.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{recMed.name}</h3>
              <p className="text-gray-600 mb-2">Price: ₹{recMed.price}</p>
              <p className="text-gray-700 mb-2">
                Availability: <span className={`font-bold ${recMed.availability ? 'text-green-600' : 'text-red-600'}`}>
                  {recMed.availability ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
              <Link to={`/medicine-details/${recMed.id}`}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700 transition">
                  Visit Details
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
