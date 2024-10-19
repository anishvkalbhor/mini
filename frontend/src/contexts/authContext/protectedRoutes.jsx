// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useAuth } from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
