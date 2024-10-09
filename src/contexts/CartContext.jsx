// CartContext.js (assuming you have a context to manage cart state)
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const itemExists = prevCart.find(item => item.name === newItem.name);

      if (itemExists) {
        // If item exists, update its quantity
        return prevCart.map(item => 
          item.name === newItem.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add new item to cart
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Update item quantity
  const updateCartQuantity = (itemName, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (itemName) => {
    setCart(prevCart => prevCart.filter(item => item.name !== itemName));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
