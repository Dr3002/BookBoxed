import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  // Estados para o formulário de adicionar livros
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Lista de livros disponíveis
  const [livros, setLivros] = useState([]);

  // Pega o token e o tipo de usuário do localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Função para buscar livros do backend
  const fetchLivros = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/livros", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLivros(res.data); // atualiza o estado com os livros recebidos
    } catch (err) {
      console.error("Erro ao buscar livros", err);
    }
  };

  // Função para pedir empréstimo de um livro (somente usuários comuns)
  const handleEmprestar = async (livroId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/livros/${livroId}/emprestar`,
        {}, // corpo vazio
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Livro emprestado com sucesso!");
      fetchLivros(); // Atualiza a lista após empréstimo
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao pedir empréstimo.");
    }
  };

  // useEffect para buscar livros ao carregar o componente
  useEffect(() => {
    fetchLivros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Função para enviar novo livro (somente admins)
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
      // Limpa os campos do formulário
      setTitulo("");
      setAutor("");
      setDescricao("");
      setMensagem("Livro adicionado com sucesso.");
      fetchLivros(); // Atualiza a lista
    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao adicionar livro.");
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {/* Formulário de adicionar livro: visível apenas para administradores */}
      {role === "admin" && (
        <>
          <h3>Adicionar Livro</h3>
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
        </>
      )}

      {/* Lista de livros disponíveis para todos os usuários */}
      <h3>Livros Disponíveis</h3>
      <ul>
        {livros.map((livro) => (
          <li key={livro._id}>
            <strong>{livro.titulo}</strong> — {livro.autor}
            {/* Botão "Pedir emprestado" visível apenas para usuários comuns */}
            {role === "user" && (
              <button
                onClick={() => handleEmprestar(livro._id)}
                style={{ marginLeft: "10px" }}
              >
                Pedir emprestado
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
