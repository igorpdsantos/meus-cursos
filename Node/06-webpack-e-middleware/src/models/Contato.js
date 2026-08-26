const mongoose = require('mongoose');

// O schema é o contrato do documento: o Mongoose recusa salvar o que não bate com ele.
// É a diferença principal para o driver puro, onde qualquer formato entra.
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  criadoEm: { type: Date, default: Date.now },
});

// 'Contato' vira a collection "contatos" no banco (o Mongoose pluraliza sozinho).
module.exports = mongoose.model('Contato', ContatoSchema);
