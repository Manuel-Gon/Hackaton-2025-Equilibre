import { createBrowserRouter } from "react-router-dom";
import TelaInicial from "../TelaInicial/TelaInicial";
import Diario from "../Diario/Diario";


const Router = createBrowserRouter([

{ path: "/", element: <TelaInicial/> },
{ path: "/CadastroUsuario", element: <TelaInicial/> },
{ path: "/Diario", element: <Diario/> },




]); 

export default Router; 