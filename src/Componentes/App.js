import { useState } from "react";
import { Route, BrowserRouter, Routes} from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import CadPlano from "../Paginas/CadPlanos";
import PaginaCadastro from "../Paginas/PaginaCadastro";
import PaginaHome from "../Paginas/PaginaHome";
import PaginaLogin from "../Paginas/PaginaLogin";
import PaginaSubscriptions from "../Paginas/PaginaSubscriptions";

function App() {
   
    return (
        <>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                <Route path='/' element={<PaginaLogin />} />  
                <Route path='/sign-up' element={<PaginaCadastro />} />
                <Route path="/subscriptions" element={<PaginaSubscriptions/>} />
                <Route path="/home" element={<PaginaHome/>} />
                <Route path='/subscriptions/:IdPlanos' element={<CadPlano/>} />
                </Routes>

            </BrowserRouter>

        </>
    )

}

export default App