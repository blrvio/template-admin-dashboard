// context/auth.js
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase_app from 'src/services/firebase.service';
const auth = getAuth(firebase_app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
