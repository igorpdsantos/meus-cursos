/**
 * Schema e Model do Mongoose
 * Sessão 4 · Rodar: node src/05-mongodb/02-schema-e-model.js
 *
 * O QUE É: o schema é o contrato do documento (campos, tipos, obrigatoriedade); o model é
 *          o objeto que usa esse contrato para criar, buscar, atualizar e apagar no banco.
 * QUANDO USAR: um model por tipo de coisa que o sistema guarda — Contato, Produto, Usuario.
 * QUANDO NÃO USAR: para dado que muda de formato a cada registro e não tem regra nenhuma —
 *                  aí o schema atrapalha em vez de ajudar.
 */

// ═══ ESSENCIAL ═══

// ─── 1) src/models/Contato.js ───
const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  criadoEm: { type: Date, default: Date.now },
});

const Contato = mongoose.model('Contato', ContatoSchema);   // module.exports = ...

console.log('Model    :', Contato.modelName, '(singular, com inicial maiúscula)');
console.log('Collection:', Contato.collection.name, '← o Mongoose deixa minúsculo e pluraliza');

// ─── 2) O schema arruma o dado antes de salvar ───
const odm = require('mongoose');

const ProdutoSchema = new odm.Schema({
  nome: { type: String, required: true, trim: true },        // tira espaço das pontas
  email: { type: String, lowercase: true },                  // deixa minúsculo
  estoque: { type: Number, default: 0 },                     // valor padrão
});
const Produto = odm.model('Produto', ProdutoSchema);

const item = new Produto({ nome: '  Teclado  ', email: 'VENDAS@Loja.COM' });
console.log('nome   :', JSON.stringify(item.nome), '← trim');
console.log('email  :', item.email, '← lowercase');
console.log('estoque:', item.estoque, '← default');
console.log('_id    :', item._id.toString().length, 'caracteres — gerado antes de ir ao banco');

// ─── 3) O que não bate com o contrato é recusado ───
const mongo = require('mongoose');

const ClienteSchema = new mongo.Schema({
  nome: { type: String, required: true, trim: true },
  idade: { type: Number, min: 0 },
});
const Cliente = mongo.model('Cliente', ClienteSchema);

(async () => {
  try {
    await new Cliente({ nome: '   ' }).validate();       // trim deixa vazio → falha o required
  } catch (erro) {
    console.log(erro.name + ':', erro.errors.nome.message);
  }
  try {
    await new Cliente({ nome: 'Ana', idade: -5 }).validate();
  } catch (erro) {
    console.log(erro.name + ':', erro.errors.idade.message);
  }
  const valido = await new Cliente({ nome: 'Ana', idade: 31 }).validate();
  console.log('Documento válido passa?', valido === undefined);
})();
// Sem schema (driver puro), qualquer formato entra no banco e o problema só aparece depois.

// ═══ NA PRÁTICA ═══

// ─── 4) As operações do model ───
const operacoes = [
  ['await Contato.create({ nome })', 'cria um documento'],
  ['await Contato.find({})', 'lista (array vazio se não achar)'],
  ['await Contato.findById(id)', 'um só pelo _id (null se não achar)'],
  ['await Contato.findByIdAndUpdate(id, dados, { new: true })', 'atualiza e devolve o NOVO'],
  ['await Contato.findByIdAndDelete(id)', 'apaga'],
];

for (const [chamada, oQueFaz] of operacoes) console.log(chamada.padEnd(58), oQueFaz);
console.log('\nTodas devolvem Promise: sempre com await, dentro de um controller async.');
console.log('Sem `{ new: true }` o update devolve o documento COMO ERA antes — e você');
console.log('mostra o valor antigo na tela achando que não salvou.');

// ─── 5) A validação acontece ANTES de falar com o banco ───
const banco = require('mongoose');

const PedidoSchema = new banco.Schema({ cliente: { type: String, required: true } });
const Pedido = banco.model('Pedido', PedidoSchema);

(async () => {
  const inicio = Date.now();
  try {
    await Pedido.create({});                    // sem banco nenhum conectado
  } catch (erro) {
    console.log(erro.name + ':', erro.message);
    console.log('Demorou menos de 100ms?', Date.now() - inicio < 100, '← nem chegou a viajar');
  }
})();
// Por isso o controller usa try/catch: erro de validação é exceção, não valor de retorno.
//   try { await Contato.create({ nome }); req.flash('sucesso', 'Salvo.'); }
//   catch (erro) { req.flash('erro', erro.message); }
//   return res.redirect('/');

// ─── 6) O _id não é uma string qualquer ───
const orm = require('mongoose');

console.log('formato válido  :', orm.Types.ObjectId.isValid('65f1c2a4e8b9d1234567890a'));
console.log('id inventado    :', orm.Types.ObjectId.isValid('abc'));

const ContaSchema = new orm.Schema({ titular: String });
const Conta = orm.model('Conta', ContaSchema);

(async () => {
  try {
    await Conta.findById('abc');               // veio de /contas/abc digitado na URL
  } catch (erro) {
    console.log(erro.name + ':', erro.message.split(' for model')[0]);
  }
})();
// Repare: LANÇA, não devolve null. Sem try/catch, uma URL digitada errado vira erro 500.
// O certo é checar com isValid e responder 404.

// ═══ PEGADINHAS ═══

// ─── 7) Model é singular; a collection é que vira plural ───
const mangusto = require('mongoose');

for (const nome of ['Categoria', 'Pessoa', 'Endereco', 'Fornecedor']) {
  const Modelo = mangusto.model(nome, new mangusto.Schema({ campo: String }));
  console.log(`mongoose.model('${nome}')`.padEnd(30), '→ collection', Modelo.collection.name);
}
console.log('\nO pluralizador é INGLÊS: "Fornecedor" vira "fornecedors", não "fornecedores".');
console.log('E model no plural piora: "Contatos" viraria a collection "contatoss".');
console.log('Se o nome incomodar, passe o seu: mongoose.model(nome, schema, "fornecedores").');

// ─── Resumo ───
// 1. Schema = contrato do documento; model = as operações. Um arquivo por model, no singular.
// 2. `mongoose.model('Contato', ...)` grava na collection "contatos".
// 3. `required`, `trim`, `lowercase`, `default` e `min` arrumam e validam antes do banco.
// 4. create / find / findById / findByIdAndUpdate / findByIdAndDelete — todas com await.
// 5. Validação lança exceção: sempre try/catch. `{ new: true }` para receber o atualizado.
// 6. Id malformado lança CastError — cheque com `ObjectId.isValid` e responda 404.
