import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/authContext/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';


const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!currentUser) return;

      try {
        const orderRef = doc(db, "carts", currentUser.uid);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          // Retrieve the items from the cart document
          setOrderHistory(orderSnap.data().items || []);
        } else {
          console.log("No order history found.");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, [currentUser]);

  const calculateTotal = () => {
    return orderHistory.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="relative">
        <h1 className="text-4xl font-semibold text-gray-700 mb-8 text-center">
          Order History
        </h1>

        {orderHistory.length === 0 ? (
          <p className="text-lg text-gray-500 text-center">
            No previous orders found.
          </p>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 backdrop-blur-lg">
            <div className="grid grid-cols-1 gap-4">
              {orderHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                  <div className="flex-1 mx-4">
                    <h3 className="text-md font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Spent: ₹{calculateTotal()}
              </h3>
            </div>
          </div>
        )}
      </div>
        <div className="flex justify-center items-center"> 
          <Link to={"/"}
          className="flex justify-centeritems-center mt-4 bg-blue-500 text-white font-medium py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
          >
          Browse more Meds
          </Link>
        </div>
      <ToastContainer />
    </div>
  );
};

export default OrderHistory;
