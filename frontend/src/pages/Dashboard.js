import React, { useState, useEffect } from "react";
import axios from "axios";

const MeusEmprestimos = () => {
  const [livrosEmprestados, setLivrosEmprestados] = useState([]);
  const token = localStorage.getItem("token");

  const fetchEmprestimos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/livros/meus-emprestimos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivrosEmprestados(res.data);
    } catch (err) {
      alert("Erro ao carregar empréstimos.");
    }
  };

  useEffect(() => {
    fetchEmprestimos();
  }, []);

  const handleDevolver = async (livroId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/livros/${livroId}/devolver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Livro devolvido com sucesso!");
      fetchEmprestimos();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao devolver o livro.");
    }
  };

  return (
    <div>
      <h3>Meus Empréstimos</h3>
      {livrosEmprestados.length === 0 ? (
        <p>Você não tem livros emprestados.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {livrosEmprestados.map((livro) => (
            <div
              key={livro._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                width: "250px",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h4>{livro.titulo}</h4>
              <p><strong>Autor:</strong> {livro.autor}</p>
              {livro.descricao && <p>{livro.descricao}</p>}
              <button
                onClick={() => handleDevolver(livro._id)}
                style={{ marginTop: "10px", backgroundColor: "#f55", color: "#fff", padding: "6px 12px", border: "none", borderRadius: "4px" }}
              >
                Devolver
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const Dashboard = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [livros, setLivros] = useState([]);
  const [mostrarEmprestimos, setMostrarEmprestimos] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchLivros = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/livros", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros(res.data);
    } catch (err) {
      console.error("Erro ao buscar livros", err);
    }
  };

  const handleEmprestar = async (livroId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/livros/${livroId}/emprestar`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Livro emprestado com sucesso!");
      // Remove o livro emprestado da lista
      setLivros((prevLivros) => prevLivros.filter((livro) => livro._id !== livroId));
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao pedir empréstimo.");
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/livros",
        { titulo, autor, descricao },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitulo("");
      setAutor("");
      setDescricao("");
      setMensagem("Livro adicionado com sucesso.");
      fetchLivros();
    } catch (err) {
      setMensagem(err.response?.data?.message || "Erro ao adicionar livro.");
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button
        onClick={() => setMostrarEmprestimos(!mostrarEmprestimos)}
        style={{ marginBottom: "15px" }}
      >
        {mostrarEmprestimos ? "Mostrar Livros Disponíveis" : "Mostrar Meus Empréstimos"}
      </button>

      {mostrarEmprestimos ? (
        <MeusEmprestimos />
      ) : (
        <>
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

          <h3>Livros Disponíveis</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {livros.map((livro) => (
              <div
                key={livro._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "8px",
                  width: "250px",
                  boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <h4>{livro.titulo}</h4>
                <p><strong>Autor:</strong> {livro.autor}</p>
                {livro.descricao && <p>{livro.descricao}</p>}
                {role === "user" && (
                  <button
                    onClick={() => handleEmprestar(livro._id)}
                    style={{ marginTop: "10px" }}
                  >
                    Pedir emprestado
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
