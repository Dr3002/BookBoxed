const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  descricao: { type: String },
  status: {
    type: String,
    enum: ['disponível', 'emprestado'],
    default: 'disponível'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }
});

module.exports = mongoose.model("Livro", livroSchema);
