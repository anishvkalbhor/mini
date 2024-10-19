import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicinesCollection = collection(db, 'medicine');
        const medicineSnapshot = await getDocs(medicinesCollection);
        
        const medicineList = medicineSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const randomMedicines = medicineList.sort(() => 0.5 - Math.random()).slice(0, 4);
        setMedicines(medicineList);
        setFilteredMedicines(randomMedicines);
      } catch (error) {
        console.error("Error fetching medicines: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = medicines.filter(medicine => 
      medicine.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMedicines(filtered);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  if (loading) {
    return <p className="text-center text-blue-600 mt-12">Loading medicines...</p>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 min-h-screen py-8">
      {/* Header with a Search Bar */}
      <header className="flex flex-col items-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl font-extrabold text-gray-800 mb-4"
        >
          Your Health, Our Priority
        </motion.h1>
        
        <div className="w-full max-w-lg px-4">
          <div className="p-4 rounded-lg shadow-lg bg-white bg-opacity-90">
            <input
              type="text"
              placeholder="Search for medicines..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full px-4 py-3 rounded-md text-gray-800 placeholder-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button 
              onClick={handleSearch} 
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Medicines Section */}
      <section className="mb-16">
        <h2 className="text-4xl text-center font-bold mb-8 text-gray-800">Recommended Medicines</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 max-w-8xl mx-auto">
          {filteredMedicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

const MedicineCard = ({ medicine, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(medicine);
    toast.success(`${medicine.name} added to cart!`, { autoClose: 2000 });
  };

  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center justify-between hover:shadow-lg transition transform hover:scale-105 w-84"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={medicine.image}
        alt={medicine.name}
        className="w-32 h-32 object-cover mb-6 rounded-md"
      />
      <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
      <p className="text-gray-600">{medicine.category}</p>
      <p className="text-blue-600 font-bold">₹{medicine.price}</p>
      <p className={`font-semibold text-${medicine.availability === 'In Stock' ? 'green' : 'red'}-600`}>
        {medicine.availability}
      </p>

      <div className="mt-4 flex gap-4 justify-center">
        <Link to={`/medicine-details/${medicine.id}`} className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          View Details
        </Link>
        <button 
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
