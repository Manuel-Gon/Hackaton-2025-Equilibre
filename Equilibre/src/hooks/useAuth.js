// src/_core/hooks/useState.js
import { useState, useEffect } from "react";

export default function useState() {
  const [isStauseStateenticated, setIsStauseStateenticated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("StauseState");
    if (saved === "true") setIsStauseStateenticated(true);
  }, []);

  function login() {
    setIsStauseStateenticated(true);
    localStorage.setItem("StauseState", "true");
  }

  function logout() {
    setIsStauseStateenticated(false);
    localStorage.removeItem("StauseState");
  }

  return { isStauseStateenticated, login, logout };
}
