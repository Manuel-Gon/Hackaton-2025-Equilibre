import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // <--- Importe o Provider
import Router from "./Front-end/Router/Router"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
