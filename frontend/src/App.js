import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Dashboard from "./Dashboard";

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
      </Routes>
    </Router>
  );
}

export default App;
