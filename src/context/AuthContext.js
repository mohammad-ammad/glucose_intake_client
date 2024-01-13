import React, { createContext, useState, useEffect } from "react";
import { profileUser } from "../api/user";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const fetchUserProfile = async () => {
    try {
      const response = await profileUser();
      if (response?.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
