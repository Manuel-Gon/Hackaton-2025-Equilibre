import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Front-end/Auth/AuthContext"; // Importar o AuthProvider
import Router from "./Front-end/Router/Router"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  </React.StrictMode>
);