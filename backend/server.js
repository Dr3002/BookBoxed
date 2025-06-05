const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://user123:<senha123>@bookboxed.rd9hwbm.mongodb.net/?retryWrites=true&w=majority&appName=BookBoxed", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conectado ao MongoDB");
})
.catch((err) => {
  console.error("Erro ao conectar ao MongoDB:", err);
});

// Importação das rotas
const authRoutes = require("./routes/auth");           // Rotas de login e registro
const livrosRoutes = require("./routes/authLivros");   // Rotas protegidas para livros

// Uso das rotas
app.use("/api/auth", authRoutes);
app.use("/api/livros", livrosRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
