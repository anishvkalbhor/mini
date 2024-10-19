import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { CartContext } from '../contexts/CartContext'; // Import CartContext
import { toast } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const Medicines = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext); // Destructure addToCart from context

  const categories = ['All', 'Pain Relief', 'Vitamins', 'Antacids', 'Cold & Flu', 'Sexual Wellness', 'Fitness Supplements', 'Ayurvedic'];

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

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    toast.success(`${medicine.name} added to cart!`, { autoClose: 2000 }); // Triggering toast notification
  };

  return (
    <motion.div
      className="relative container mx-auto py-12 px-4 min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 opacity-50"
        style={{ zIndex: -1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Title */}
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-8">Check Out the Medicines Here!!</h1>
      
      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl transition-all duration-300 mx-2 border-2 ${
              selectedCategory === category ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300'
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
            <MedicineCard medicine={medicine} onAddToCart={handleAddToCart} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Medicine Card Component with Framer Motion Hover Effect
const MedicineCard = ({ medicine, onAddToCart }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between items-center transition-all"
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
        transition: { duration: 0.3 },
      }}
    />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{medicine.name}</h3>
    <h4 className="text-md font-medium text-gray-600 mb-2">{medicine.category}</h4>
    <p className="text-lg font-medium text-gray-700 mb-1">₹{medicine.price}</p>
    <p className={`text-md ${medicine.availability ? 'text-green-600' : 'text-red-600'} mb-3`}>
      {medicine.availability ? 'In Stock' : 'Out of Stock'}
    </p>

    {/* Button Container for View Details and Add to Cart */}
    <div className="flex space-x-4 mt-2"> {/* Flex container with spacing */}
      {/* View Details Button */}
      <Link to={`/medicine-details/${medicine.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        View Details
      </Link>

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => onAddToCart(medicine)} // Triggering add to cart with toast
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.div>
);

export default Medicines;
