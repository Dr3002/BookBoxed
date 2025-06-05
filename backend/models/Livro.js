const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  descricao: { type: String },
  disponivel: { type: Boolean, default: false },
  emprestadoPara: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

module.exports = mongoose.model("Livro", livroSchema);
