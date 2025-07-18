const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registro
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
   //Verifica se o usuário já existe
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Usuário já existe." });
     // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);
    //Cria novo usuário padrão com role fornecido ou padrão
    const user = new User({
      email,
      password: hashedPassword,
      role: role && role.length ? role : ["user"] 
    });
    // Salva usuário no BD
    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Verifica se o usuário existe
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Usuário não encontrado." });
     //Compara a senha digitada com a armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Senha incorreta." });
     // Gera Token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
