import { createBrowserRouter } from "react-router-dom";
import TelaInicial from "../TelaInicial/TelaInicial";
import CadastroUsuario from "../CadastroLoginUsuario/CadastroUsuario/CadastroUsuario";
import LoginUsuario from "../CadastroLoginUsuario/LoginUsuario/LoginUsuario";


const Router = createBrowserRouter([

{ path: "/", element: <TelaInicial/> },
{ path: "/CadastroUsuario", element: <CadastroUsuario/> },
{ path: "/LoginUsuario", element: <LoginUsuario/> },


]); 

export default Router; 