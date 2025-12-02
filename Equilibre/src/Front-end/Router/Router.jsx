import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppL/AppLayout";
import TelaInicial from "../TelaInicial/TelaInicial";
import CadastroUsuario from "../CadastroLoginUsuario/CadastroUsuario/CadastroUsuario";
import LoginUsuario from "../CadastroLoginUsuario/LoginUsuario/LoginUsuario";
import Dashboard from "../Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <TelaInicial /> },
      { path: "cadastro", element: <CadastroUsuario /> },
      { path: "login", element: <LoginUsuario /> },
      { path: "dashboard", element: <Dashboard /> }
    ],
  },
]);

export default router;