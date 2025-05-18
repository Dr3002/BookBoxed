import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Bookboxed</h1>
      <p>Acesse sua conta ou cadastre-se:</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register">
        <button>Cadastro</button>
      </Link>
    </div>
  );
}

export default Home;
