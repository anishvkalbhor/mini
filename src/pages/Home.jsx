import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicinesCollection = collection(db, 'medicine');
        const medicineSnapshot = await getDocs(medicinesCollection);
        
        let medicineList = medicineSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Randomly select 4 to 5 medicines
        medicineList = medicineList.sort(() => 0.5 - Math.random()).slice(0, 5);

        setMedicines(medicineList);
      } catch (error) {
        console.error("Error fetching medicines: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return <p className="text-center text-blue-600 mt-12">Loading medicines...</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Banner with centered search bar */}
      <div className="relative">
        <div className="w-full h-80 bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-12 text-4xl font-extrabold text-white"
          >
            Your Health, Our Priority
          </motion.h1>

          <div className="absolute bottom-12 w-full flex justify-center">
            <div className="w-full max-w-xl px-4">
              <div className="p-4 rounded-lg shadow-lg bg-white bg-opacity-90">
                <input
                  type="text"
                  placeholder="Search for medicines..."
                  className="w-full px-4 py-3 rounded-md bg-white bg-opacity-80 text-gray-800 placeholder-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medicines Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl text-center font-bold mb-8 text-blue-700">Recommended Medicines</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 shadow-inner">
        <h2 className="text-3xl text-center font-bold mb-10 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-blue-100 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Medicine Card Component with modern design
const MedicineCard = ({ medicine }) => (
  <motion.div 
    className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between hover:shadow-lg transition transform hover:scale-105"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img
      src={medicine.image}
      alt={medicine.name}
      className="w-24 h-24 object-cover mb-4"
    />
    <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
    <p className="text-gray-600">{medicine.category}</p>
    <p className="text-blue-600 font-bold">₹{medicine.price}</p>
    <p className={`text-${medicine.availability === 'In Stock' ? 'green' : 'red'}-600 font-semibold`}>
      {medicine.availability}
    </p>
    <Link to={`/medicine-details/${medicine.id}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
      View Details
    </Link>
  </motion.div>
);

// Dummy data for services
const services = [
  {
    title: 'Free Home Delivery',
    description: 'Get your medicines delivered to your doorstep at no extra cost.',
  },
  {
    title: '24/7 Customer Support',
    description: 'We\'re here to assist you anytime, day or night.',
  },
  {
    title: 'Affordable Prices',
    description: 'We offer medicines and health products at competitive prices.',
  },
];

export default Home;
