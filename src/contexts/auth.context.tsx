"use client";
import {
  getAuth,
  onAuthStateChanged,
  User,
  getIdTokenResult,
} from "firebase/auth";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import firebase_app, { firebase_analytics } from "../services/firebase.service";
import { setUserId } from "firebase/analytics";
import { createUser, getUsers } from "../controllers/user.controller";

const auth = getAuth(firebase_app);

interface CustomClaims {
  appuid?: string;
}

interface ExtendedUser extends User {
  appdata?: any; // Defina o tipo apropriado para os dados do aplicativo
}

interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const idTokenResult = await getIdTokenResult(firebaseUser);
        const claims = idTokenResult.claims as CustomClaims;

        let userData;
        if (!claims.appuid) {
          console.log("O usuário será criado");
          userData = await createUser(firebaseUser);
        } else {
          console.log("O usuário já existe");
          userData = await getUsers(claims.appuid);
        }
        setUser({ ...firebaseUser, appdata: userData });
        setUserId(firebase_analytics, firebaseUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
