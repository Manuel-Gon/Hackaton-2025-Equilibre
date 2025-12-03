import { createBrowserRouter } from "react-router-dom";
import TelaInicial from "../TelaInicial/TelaInicial";
import Chat from "../Chat/Chat.jsx";
import Diario from "../Diario/Diario";
import CadastroUsuario from "../CadastroLoginUsuario/CadastroUsuario/CadastroUsuario";
import LoginUsuario from "../CadastroLoginUsuario/LoginUsuario/LoginUsuario";


const Router = createBrowserRouter([

{ path: "/", element: <TelaInicial/> },
{ path: "/Chat", element: <Chat/> },
{ path: "/Diario", element: <Diario/> },
{ path: "/CadastroUsuario", element: <CadastroUsuario/> },
{ path: "/LoginUsuario", element: <LoginUsuario/> },


]); 

export default Router; 