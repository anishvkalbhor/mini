import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firebase setup
import { useAuth } from '../contexts/authContext/index'; // Custom auth context
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth(); // Get current user's UID

  // Fetch cart from Firestore for the logged-in user
  const fetchCartFromFirestore = async (userId) => {
    if (!userId) return; // Ensure user is logged in
    const cartRef = doc(db, 'carts', userId); // Use userId as document ID
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      setCart(cartSnap.data().items || []); // Set user's cart
    }
  };

  // Save cart to Firestore for the logged-in user
  const saveCartToFirestore = async (newCart) => {
    if (currentUser) { // Ensure user is logged in
      const cartRef = doc(db, 'carts', currentUser.uid); // Use currentUser's uid as document ID
      await setDoc(cartRef, { items: newCart }, { merge: true }); // Merge to keep existing data
    }
  };

  // Add item to cart
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find(item => item.name === newItem.name);
      let updatedCart;

      if (itemExists) {
        updatedCart = prevCart.map(item =>
          item.name === newItem.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...newItem, quantity: 1 }];
      }

      saveCartToFirestore(updatedCart); // Save cart to Firestore
      return updatedCart;
    });
  };

  // Update item quantity in cart
  const updateCartQuantity = (itemName, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      );

      saveCartToFirestore(updatedCart); // Save cart to Firestore
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (itemName) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.name !== itemName);
      saveCartToFirestore(updatedCart); // Save cart to Firestore
      return updatedCart;
    });
  };

  // Fetch user's cart on mount or when user changes
  useEffect(() => {
    if (currentUser) {
      fetchCartFromFirestore(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
