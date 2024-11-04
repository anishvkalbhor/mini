import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

// Chat Window Component
const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:7000/api/prompt-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      const botMessage = { text: data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div
      className={`fixed bottom-1/4 right-1/2 transform translate-x-1/2 w-[900px] h-[440px] bg-gray-200 bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg transition-transform ${
        isOpen ? "transform translate-y-0" : "transform translate-y-full"
      }`}
      style={{ display: isOpen ? "block" : "none", zIndex: 50 }}
    >
      <div className="p-4">
        <h2 className="mb-2 text-2xl font-bold text-center">Medicine AI</h2>
        <div className="overflow-y-auto h-80 border rounded-lg p-2 flex flex-col bg-white bg-opacity-50 backdrop-blur-lg shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-1 p-2 rounded-lg flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  msg.sender === "user" ? "bg-teal-300" : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-2 h-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 h-12 border rounded-l-lg px-4 bg-white bg-opacity-80 backdrop-blur-sm shadow-md"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-teal-500 h-12 text-white px-4 rounded-r-lg hover:bg-teal-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-1 right-5 font-bold text-2xl text-red-500 hover:scale-110 transition-transform">
        X
      </button>
    </div>
  );
};

// Medicine Card Component
const MedicineCard = ({ medicine, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
    >
      <Link to={`/medicine-details/${medicine.id}`}>
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{medicine.name}</h3>
        <p className="text-gray-600 mb-2">Price: {medicine.price}</p>
      </Link>
      <button
        onClick={() => onAddToCart(medicine)}
        className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-200"
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

const Home = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicinesCollection = collection(db, "medicine");
        const medicineSnapshot = await getDocs(medicinesCollection);

        const medicineList = medicineSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const randomMedicines = medicineList
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
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
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMedicines(filtered);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <header className="flex flex-col items-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl font-bold text-gray-900 mb-6"
        >
          Your Health, Our Commitment
        </motion.h1>

        <div className="w-full max-w-lg px-4">
          <div className="p-4 rounded-lg shadow-sm bg-gray-100">
            {loading ? (
              <Skeleton height={45} />
            ) : (
              <input
                type="text"
                placeholder="Search for medicines..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-2 rounded-md text-gray-700 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            )}
            <button
              onClick={handleSearch}
              className="mt-4 w-full bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl text-center font-bold mb-8 text-gray-900">
          ...Medicines for you...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} height={300} width="100%" />
              ))
            : filteredMedicines.map((medicine) => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                  onAddToCart={addToCart}
                />
              ))}
        </div>
      </section>

      <button
        onClick={() => setChatOpen(true)}
        className="absolute bottom-7 right-5 bg-teal-500 text-white p-3 rounded-full shadow hover:shadow-4xl transition"
      >
        🤖
      </button>

      <ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Home;
