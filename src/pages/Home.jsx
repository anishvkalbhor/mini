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
    return <p>Loading medicines...</p>;
  }

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Banner with centered search bar */}
      <div className="relative">
        <div className="w-full h-72 bg-gradient-to-b from-blue-400 to-blue-300 flex items-center justify-center shadow-lg">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-10 text-4xl font-semibold text-gray-800"
          >
            Your Health, Our Priority
          </motion.h1>

          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-center">
            <div className="w-full max-w-xl px-4">
              <div className="glassmorphism p-4 rounded-md shadow-2xl">
                <input
                  type="text"
                  placeholder="Search for medicines..."
                  className="w-full px-4 py-3 rounded-md bg-white bg-opacity-70 text-gray-800 placeholder-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="mt-2 w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-md">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medicines Section */}
      <section className="py-12 px-4">
        <h2 className="text-3xl text-center font-semibold mb-6 text-blue-700">Browse Medicines</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-amber-50 py-16 shadow-md">
        <h2 className="text-3xl text-center font-semibold mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Medicine Card Component with similar design to Medicines page
const MedicineCard = ({ medicine }) => (
  <motion.div 
    className="glassmorphism bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-[3.25rem] flex flex-col justify-between hover:shadow-xl transition"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex flex-col items-center">
      <img
        src={medicine.image}
        alt={medicine.name}
        className="w-24 h-24 mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
      <h2 className="text-lg font-semibold text-gray-700">{medicine.category}</h2>
      <p className="text-gray-700">₹{medicine.price}</p>
      <p className={`text-${medicine.availability === 'In Stock' ? 'green' : 'red'}-600 font-semibold`}>
        {medicine.availability}
      </p>
    </div>
    <Link to={`/medicine-details/${medicine.id}`} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-md text-center">
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
