import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  return (
    <>
        <Navbar/>

        <div className="container">
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="contact" element={ <Contact/> } />
                <Route path="user/login" element={ <Login/> } />
                <Route path="user/register" element={ <Register/> } />
            </Routes>
        </div>
    </>
  );
}

export default App;
