import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

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
      </Routes>
    </Router>
  );
}

export default App;
