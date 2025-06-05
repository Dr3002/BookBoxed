const express = require("express"); 
const router = express.Router();
const Livro = require("../models/Livro");
const auth = require("../middlewares/auth");

// Apenas gerente pode adicionar livros
router.post("/", auth, async (req, res) => {
  if (req.user.role.includes("user")) {
    return res.status(403).json({ message: "Acesso negado. Somente gerente pode adicionar livros." });
  }
  try {
    const { titulo, autor, descricao } = req.body;
    const livro = new Livro({ titulo, autor, descricao, disponivel: true });
    await livro.save();
    res.status(201).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar livro." });
  }
});

// Listar TODOS os livros (pública)
router.get("/", async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar livros." });
  }
});

// Listar SOMENTE livros disponíveis
router.get("/disponiveis", async (req, res) => {
  try {
    const livrosDisponiveis = await Livro.find({ disponivel: true });
    res.json(livrosDisponiveis);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar livros disponíveis." });
  }
});

// Solicitar empréstimo (usuário autenticado)
router.post("/:id/emprestar", auth, async (req, res) => {
  console.log("📥 Recebida requisição para empréstimo do livro:", req.params.id);
  console.log("👤 Usuário autenticado:", req.user);

  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ message: "Livro não encontrado." });
    if (!livro.disponivel) return res.status(400).json({ message: "Livro já está emprestado." });

    livro.disponivel = false;
    livro.emprestadoPara = req.user.id;
    await livro.save();

    console.log("✅ Livro emprestado com sucesso:", livro);
    res.json({ message: "Livro emprestado com sucesso." });
  } catch (err) {
    console.error("❌ Erro ao emprestar o livro:", err);
    res.status(500).json({ message: "Erro ao emprestar o livro." });
  }
});

// Listar livros emprestados pelo usuário logado
router.get("/meus-emprestimos", auth, async (req, res) => {
  try {
    const livros = await Livro.find({ emprestadoPara: req.user.id });
    res.json(livros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar seus empréstimos." });
  }
});

// Devolver livro
router.post("/:id/devolver", auth, async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ message: "Livro não encontrado." });

    if (!livro.emprestadoPara || livro.emprestadoPara.toString() !== req.user.id) {
      return res.status(403).json({ message: "Você não pode devolver este livro." });
    }

    livro.disponivel = true;
    livro.emprestadoPara = null;
    await livro.save();

    res.json({ message: "Livro devolvido com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao devolver o livro." });
  }
});

module.exports = router;
