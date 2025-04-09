// src/context/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { verifyUserAPI } from "../../helpers/apiCommunicators";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
    const verifyUser = async () => {
      const result = await verifyUserAPI();
      if (result.error) {
        setAuthUser(null);
        localStorage.removeItem("authUser");
      } else {
        setAuthUser(result.user);
        localStorage.setItem("authUser", JSON.stringify(result.user));
      }
      setIsLoading(false);
    };
    verifyUser();
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
