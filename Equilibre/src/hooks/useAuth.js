// src/_core/hooks/useAuth.js
import { useState, useEffect } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved === "true";
  });

  // Sincroniza login/logout entre abas do navegador
  useEffect(() => {
    function handleStorageChange() {
      const saved = localStorage.getItem("auth");
      setIsAuthenticated(saved === "true");
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
