import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/livros",
        { titulo, autor, descricao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensagem("Livro adicionado com sucesso!");
      setTitulo("");
      setAutor("");
      setDescricao("");
    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao adicionar livro.");
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Livro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>
        <button type="submit">Adicionar Livro</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default Dashboard;
