import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Form.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // HOOK para redirecionar a página

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      const { token, role } = res.data;
      alert(`Login realizado com sucesso!\nToken: ${token}\nrole: ${role.join(", ")}`);
      //Navigate redireciona a página após Login
      navigate("/dashboard");
    } catch (err) {
      alert("Erro no login");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
