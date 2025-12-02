import { createBrowserRouter } from "react-router-dom";
import TelaInicial from "../TelaInicial/TelaInicial";
<<<<<<< HEAD
import Chat from "../Chat/Chat.jsx";
=======
import Diario from "../Diario/Diario";
import CadastroUsuario from "../CadastroLoginUsuario/CadastroUsuario/CadastroUsuario";
import LoginUsuario from "../CadastroLoginUsuario/LoginUsuario/LoginUsuario";
>>>>>>> 90db31584331659c7593a0563a206d91ad10a5b1


const Router = createBrowserRouter([

{ path: "/", element: <TelaInicial/> },
<<<<<<< HEAD
{ path: "/CadastroUsuario", element: <TelaInicial/> },
{ path: "/Chat", element: <Chat/> },

=======
{ path: "/Diario", element: <Diario/> },
{ path: "/CadastroUsuario", element: <CadastroUsuario/> },
{ path: "/LoginUsuario", element: <LoginUsuario/> },
>>>>>>> 90db31584331659c7593a0563a206d91ad10a5b1


]); 

export default Router; 