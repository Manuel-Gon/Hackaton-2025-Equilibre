import { createBrowserRouter } from "react-router-dom";
import TelaInicial from "../TelaInicial/TelaInicial";
import Diario from "../Diario/Diario";
import CadastroUsuario from "../CadastroLoginUsuario/CadastroUsuario/CadastroUsuario";
import LoginUsuario from "../CadastroLoginUsuario/LoginUsuario/LoginUsuario";


const Router = createBrowserRouter([

{ path: "/", element: <TelaInicial/> },
{ path: "/Diario", element: <Diario/> },
{ path: "/CadastroUsuario", element: <CadastroUsuario/> },
{ path: "/LoginUsuario", element: <LoginUsuario/> },


]); 

export default Router; 