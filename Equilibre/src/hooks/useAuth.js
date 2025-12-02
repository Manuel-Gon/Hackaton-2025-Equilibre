// src/_core/hooks/useAuth.js
import { useState, useEffect } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved === "true") setIsAuthenticated(true);
  }, []);

  function login() {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  }

  return { isAuthenticated, login, logout };
}
