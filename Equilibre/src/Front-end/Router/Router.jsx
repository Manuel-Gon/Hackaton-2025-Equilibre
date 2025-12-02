import { createBrowserRouter } from "react-router-dom";
import TelaInicial from "../TelaInicial/TelaInicial";
import Chat from "../Chat/Chat.jsx";


const Router = createBrowserRouter([

{ path: "/", element: <TelaInicial/> },
{ path: "/CadastroUsuario", element: <TelaInicial/> },
{ path: "/Chat", element: <Chat/> },



]); 

export default Router; 