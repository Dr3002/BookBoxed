import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MeusEmprestimos from "./pages/MeusEmprestimos";


//Rotas Principais 
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Início</Link> | <Link to="/login">Login</Link> | <Link to="/register">Cadastro</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meus-emprestimos" element={<MeusEmprestimos />} />
      </Routes>
    </Router>
  );
}

export default App;
