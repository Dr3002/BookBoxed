const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  descricao: { type: String },
});

module.exports = mongoose.model("Livro", livroSchema);
