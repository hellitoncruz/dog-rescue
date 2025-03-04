import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Form from "./pages/Form"
import Dogs from "./pages/Dogs"


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/form" element={<Form />}></Route>
                <Route path="/dogs" element={<Dogs />}></Route>
            </Routes>
        </BrowserRouter>
    )
}