const express = require("express"); 
const router = express.Router();
const Livro = require("../models/Livro");
const auth = require("../middlewares/auth");

// Rota para só gerente poder adicionar livros
router.post("/", auth, async (req, res) => {
  if (req.user.role.includes("user")) {
    return res.status(403).json({ message: "Acesso negado. Somente gerente pode adicionar livros." });
  }
  try {
    const { titulo, autor, descricao } = req.body;
    const livro = new Livro({ titulo, autor, descricao });
    await livro.save();
    res.status(201).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar livro." });
  }
});

// Rota pública para listar livros disponíveis
router.get("/", async (req, res) => {
    try {
      const livros = await Livro.find(); // busca todos os livros
      res.json(livros);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar livros." });
    }
  });
  

module.exports = router;
