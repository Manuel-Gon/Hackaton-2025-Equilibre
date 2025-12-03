import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppL/AppLayout";
import TelaInicial from "../TelaInicial/TelaInicial";
import Chat from "../Chat/Chat.jsx";
import Diario from "../Diario/Diario";
import CadastroUsuario from "../CadastroLoginUsuario/CadastroUsuario/CadastroUsuario";
import LoginUsuario from "../CadastroLoginUsuario/LoginUsuario/LoginUsuario";
import Dashboard from "../Dashboard/Dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <TelaInicial /> },
      { path: "/Chat", element: <Chat/>},
      { path: "/Diario", element: <Diario/> },
      { path: "/CadastroUsuario", element: <CadastroUsuario/> },
      { path: "/LoginUsuario", element: <LoginUsuario/> },
      { path: "/Dashboard", element: <Dashboard /> }
    ],
  },
]);



export default Router; 

