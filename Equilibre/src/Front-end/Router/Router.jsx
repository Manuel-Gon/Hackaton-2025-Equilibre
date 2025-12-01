import { createBrowserRouter } from "react-router-dom";
import TelaInicial from "../TelaInicial/TelaInicial";


const Router = createBrowserRouter([

{ path: "/", element: <TelaInicial/> },
{ path: "/CadastroUsuario", element: <TelaInicial/> },



]); 

export default Router; 