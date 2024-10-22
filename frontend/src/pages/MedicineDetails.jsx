import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { FaRegCalendarAlt, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [recommendedMedicines, setRecommendedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

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
        setRecommendedMedicines(medicines.slice(0, 3));
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

  const formatDate = (timestamp) => {
    return timestamp ? timestamp.toDate().toLocaleDateString() : 'N/A';
  };

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    toast.success(`${medicine.name} added to cart!`, { autoClose: 2000 });
  };

  return (
<<<<<<< HEAD
    <div className="bg-gray-100 py-12 min-h-screen relative">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-400 to-transparent opacity-10" />
=======
    <div className="bg-gradient-to-r from-teal-300 via-teal-100 to-white py-12 min-h-screen relative">
      {/* Background design */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500 to-transparent opacity-20" />
>>>>>>> a5e87940ab914dd1d86d9ee5ba95fccced44c3ab
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-6xl bg-white shadow-lg rounded-3xl p-6 md:p-12 overflow-hidden"
      >
        {/* Medicine Info Section */}
        <div className="md:flex items-start justify-between space-y-6 md:space-y-0">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left"
          >
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg mb-6"
            />
<<<<<<< HEAD
            <h1 className="text-4xl font-bold text-green-600 mb-3">{medicine.name}</h1>
            <h4 className="text-xl text-gray-700 mb-6">{medicine.category}</h4>
=======
            <h1 className="text-4xl font-bold text-teal-700 mb-3">{medicine.name}</h1>
            <h4 className="text-xl text-gray-600 mb-6">{medicine.category}</h4>
>>>>>>> a5e87940ab914dd1d86d9ee5ba95fccced44c3ab
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{medicine.description}</p>

            <div className="flex space-x-6">
              <div className="flex items-center text-gray-500">
                <FaRegCalendarAlt className="mr-2" />
                <span>Manufacture: {formatDate(medicine.manufacture_date)}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <FaRegCalendarAlt className="mr-2" />
                <span>Expiry: {formatDate(medicine.expiry_date)}</span>
              </div>
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
<<<<<<< HEAD
            className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl shadow-lg text-center md:text-left"
          >
            <p className="text-3xl font-semibold text-gray-900 mb-4">
              ₹<span className="font-bold text-green-600">{medicine.price}</span>
=======
            className="w-full md:w-1/3 bg-teal-50 p-6 rounded-xl shadow-lg text-center md:text-left"
          >
            <p className="text-3xl font-semibold text-gray-900 mb-4">
              ₹<span className="font-bold text-teal-700">{medicine.price}</span>
>>>>>>> a5e87940ab914dd1d86d9ee5ba95fccced44c3ab
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Availability: <span className={`font-bold ${medicine.availability ? 'text-green-600' : 'text-red-600'}`}>
                {medicine.availability ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
              className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition-all"
              onClick={() => handleAddToCart(medicine)}
=======
              className="w-full bg-teal-600 text-white py-3 rounded-lg shadow hover:bg-teal-700 transition-all"
              onClick={() => handleAddToCart(medicine)} // Triggering add to cart with toast
>>>>>>> a5e87940ab914dd1d86d9ee5ba95fccced44c3ab
            >
              <FaShoppingCart className="mr-2 inline-block" /> Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Recommended Medicines */}
      <div className="relative z-10 mt-16 max-w-6xl mx-auto">
<<<<<<< HEAD
        <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">Recommended Medicines</h2>
=======
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">More Medicines from {medicine.category} Category</h2>
>>>>>>> a5e87940ab914dd1d86d9ee5ba95fccced44c3ab
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedMedicines.map((med) => (
            <motion.div
              key={med.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-xl p-4 transition-all hover:shadow-xl"
            >
              <Link to={`/medicine-details/${med.id}`}>
                <img src={med.image} alt={med.name} className="w-full h-48 object-cover rounded-lg mb-4" />
<<<<<<< HEAD
                <h3 className="text-lg font-bold text-green-600">{med.name}</h3>
=======
                <h3 className="text-lg font-bold text-teal-700">{med.name}</h3>
>>>>>>> a5e87940ab914dd1d86d9ee5ba95fccced44c3ab
                <h4 className="text-gray-600">Price: Rs.{med.price}</h4>
                <p className="text-gray-600">{med.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
