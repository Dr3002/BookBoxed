import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [livros, setLivros] = useState([]); 

  const token = localStorage.getItem("token");

  // Função para buscar livros do backend
  const fetchLivros = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/livros", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLivros(res.data);
    } catch (err) {
      console.error("Erro ao buscar livros", err);
    }
  };

  // Buscar livros ao montar componente
  useEffect(() => {
    fetchLivros();
  }, []);

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
      setTitulo("");
      setAutor("");
      setDescricao("");
      fetchLivros();  // Atualiza lista após adicionar livro
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

      <h2>Lista de Livros Disponíveis</h2>
      <ul>
        {livros.map((livro) => (
          <li key={livro._id}>
            <strong>{livro.titulo}</strong> — {livro.autor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
