import { Routes, Route } from "react-router-dom"
import Home from "@/Pages/Home/Home"
import Header from "@/components/Header"
import "./App.css"

function App() {
    return (
        <>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/signup" element={<Home />}></Route>
                    <Route path="/login" element={<Home />}></Route>
                </Routes>
            </div>
        </>
    )
}

export default App
