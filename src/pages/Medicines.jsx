import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Medicines = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Pain Relief', 'Vitamins', 'Antacids', 'Cold & Flu'];

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicinesCollection = collection(db, 'medicine');
        const medicineSnapshot = await getDocs(medicinesCollection);
        
        const medicineList = medicineSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMedicines(medicineList);
      } catch (error) {
        console.error("Error fetching medicines: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const filteredMedicines = selectedCategory === 'All' 
    ? medicines 
    : medicines.filter(medicine => medicine.category === selectedCategory);

  if (loading) {
    return <p>Loading medicines...</p>; // Loading indicator
  }

  return (
    <motion.div
      className="relative container mx-auto py-12 px-4 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 opacity-90"
        style={{ zIndex: -1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Subtle animated background blobs */}
      <motion.div
        className="absolute top-10 left-10 w-60 h-60 bg-blue-300 rounded-full opacity-30 filter blur-xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.9, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400 rounded-full opacity-30 filter blur-2xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.9, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror' }}
      />

      <h1 className="text-4xl font-semibold text-center text-white mb-8">Check Out the Medicines Here!!</h1>
      
      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl transition-all duration-300 mx-2 ${
              selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
            } shadow-lg hover:shadow-xl`}
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Medicines Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMedicines.map(medicine => (
          <motion.div 
            key={medicine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MedicineCard medicine={medicine} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Medicine Card Component with Framer Motion Hover Effect
const MedicineCard = ({ medicine }) => (
  <motion.div 
    className="bg-white/40 backdrop-blur-lg rounded-lg shadow-lg p-6 flex flex-col justify-between items-center transition-all"
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.3 },
    }}
  >
    <motion.img
      src={medicine.image}
      alt={medicine.name}
      className="w-32 h-32 mb-4 object-cover rounded-md"
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.3 },
      }}
    />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{medicine.name}</h3>
    <h4 className="text-md font-medium text-gray-600 mb-2">{medicine.category}</h4>
    <p className="text-lg font-medium text-gray-700 mb-1">₹{medicine.price}</p>
    <p className={`text-md ${medicine.availability ? 'text-green-600' : 'text-red-600'} mb-3`}>
      {medicine.availability ? 'In Stock' : 'Out of Stock'}
    </p>
    <Link to={`/medicine-details/${medicine.id}`} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
      View Details
    </Link>
  </motion.div>
);

export default Medicines;
