// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        fetchUserDetails(userId);
      } catch (error) {
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await api.get(`/api/user/${userId}/`);
      setUsername(response.data.username);
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      setIsAuthorized(false);
    }
  };

  const login = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, token);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    fetchUserDetails(userId);
  };

  const logout = () => {
    localStorage.clear();
    setUsername("");
    setIsAuthorized(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
