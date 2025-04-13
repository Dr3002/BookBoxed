
import React, { useState } from "react";
import axios from "axios";
import './Form.css';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { email, password });
      alert("Registrado com sucesso!");
    } catch (err) {
      alert("Erro no registro");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
