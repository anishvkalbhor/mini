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
    <div className="bg-gradient-to-b from-blue-100 to-blue-500 min-h-screen py-10 flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Available Medicines</h1>
      
      {/* Category Tabs */}
      <div className="flex mb-8">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

// Medicine Card Component
const MedicineCard = ({ medicine }) => (
  <div className="glassmorphism bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-[3.25rem] flex flex-col justify-between hover:shadow-xl transition">
    <div className="flex flex-col items-center">
      <img
        src={medicine.image}
        alt={medicine.name}
        className="w-24 h-24 mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
      <p className="text-gray-700">₹{medicine.price}</p>
    </div>
    <Link to={`/medicine-details/${medicine.id}`} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md">
      View Details
    </Link>
  </div>
);

export default Medicines;
