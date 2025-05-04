import React, { useState } from "react";
import axios from "axios";
import './Form.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(["user"]); // valor padrão

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role,
      });
      alert("Registrado com sucesso!");
    } catch (err) {
      alert("Erro no registro");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={e => setPassword(e.target.value)}
      />

      <select value={role[0]} onChange={e => setRole([e.target.value])}>
        <option value="user">Usuário</option>
        <option value="admin">Gerente</option>
      </select>

      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
