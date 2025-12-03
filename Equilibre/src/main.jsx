import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner"; 
import Router from "./Front-end/Router/Router"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Coloque o Toaster aqui, antes ou depois do RouterProvider */}
    <Toaster position="top-right" richColors />
    
    <RouterProvider router={Router} />
  </React.StrictMode>
);