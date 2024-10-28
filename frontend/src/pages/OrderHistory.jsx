import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/authContext/index';
import { collection, query, where, getDocs } from 'firebase/firestore';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });

        setOrders(fetchedOrders);
      }
    };
    fetchOrders();
  }, [currentUser]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Your Order History</h1>
      {orders.length === 0 ? (
        <p className="text-xl text-center">You have no previous orders.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <h4 className="mt-4 font-semibold">Items:</h4>
              <ul className="list-disc pl-5">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity} x ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
