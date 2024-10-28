import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/authContext/index';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();

  const fetchCartFromFirestore = async (userId) => {
    if (!userId) return;
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      setCart(cartSnap.data().items || []);
    }
  };

  const saveCartToFirestore = async (newCart) => {
    if (currentUser) {
      const cartRef = doc(db, 'carts', currentUser.uid);
      await setDoc(cartRef, { items: newCart }, { merge: true });
    }
  };

  const addToCart = (newItem) => {
    if (!newItem.availability) {
      console.log("Item is out of stock");
      return;
    }
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
      saveCartToFirestore(updatedCart);
      return updatedCart;
    });
  };
  

  const updateCartQuantity = (itemName, newQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      );
      saveCartToFirestore(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (itemName) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.name !== itemName);
      saveCartToFirestore(updatedCart);
      return updatedCart;
    });
  };

  // Save order details to Firebase
  const addOrder = async (cart, totalAmount) => {
    if (currentUser) {
      const orderData = {
        userId: currentUser.uid,
        items: cart,
        totalAmount,
        createdAt: new Date().toISOString(),
      };
      try {
        const ordersCollectionRef = collection(db, 'orders');
        await addDoc(ordersCollectionRef, orderData);
      } catch (error) {
        console.error("Error saving order: ", error);
      }
    }
  };

  const clearCart = async () => {
    try {
      if (currentUser) {
        await setDoc(doc(db, 'carts', currentUser.uid), { items: [] });
        setCart([]);
      }
    } catch (error) {
      console.error("Error clearing cart: ", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCartFromFirestore(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, addOrder, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
