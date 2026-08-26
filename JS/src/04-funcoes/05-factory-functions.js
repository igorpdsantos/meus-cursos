/**
 * Factory Functions
 * Sessão 4 · Rodar: node src/04-funcoes/05-factory-functions.js
 *
 * O QUE É: uma função comum que MONTA e devolve um objeto pronto. Sem `new`.
 * QUANDO USAR: quando você quer objetos com dado privado, ou quando a criação tem regra
 *              (validar, calcular, escolher variação).
 * QUANDO NÃO USAR: criando milhares de objetos — cada um ganha a própria cópia dos métodos.
 *                  Aí `class` economiza memória.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Uma função que devolve objeto ───
function criarProduto(nome, preco) {
  return {
    nome,
    preco,
    etiqueta() { return `${nome} — R$ ${preco.toFixed(2)}`; },
  };
}

console.log(criarProduto('Teclado', 249.9).etiqueta());

// ─── 2) Com validação: o objeto só nasce se estiver certo ───
function criarCliente({ nome, email }) {
  if (!nome?.trim()) throw new Error('nome é obrigatório');
  if (!email?.includes('@')) throw new Error('e-mail inválido');

  return { nome: nome.trim(), email: email.toLowerCase() };   // já normaliza na criação
}

console.log(criarCliente({ nome: '  Ana  ', email: 'ANA@X.COM' }));

try { criarCliente({ nome: 'Bruno', email: 'errado' }); }
catch (erro) { console.log('Recusado:', erro.message); }

// ─── 3) Dado privado: factory + closure ───
function criarCarrinho() {
  const itens = [];      // ninguém de fora alcança esta lista

  return {
    adicionar(nome, preco) { itens.push({ nome, preco }); return this; },   // this permite encadear
    total() { return itens.reduce((s, i) => s + i.preco, 0); },
    resumo() { return itens.map((i) => i.nome).join(', '); },
  };
}

const carrinho = criarCarrinho()
  .adicionar('Teclado', 249.9)
  .adicionar('Mouse', 89.5);

console.log(carrinho.resumo(), '= R$', carrinho.total().toFixed(2));
console.log('Mexer na lista direto?', carrinho.itens);   // undefined

// ═══ NA PRÁTICA ═══

// ─── 4) Composição: juntar habilidades sem herança ───
const podeVoar = (nome) => ({ voar: () => `${nome} decolou` });
const podeNadar = (nome) => ({ nadar: () => `${nome} mergulhou` });

const criarPato = (nome) => ({ nome, ...podeVoar(nome), ...podeNadar(nome) });
const criarPeixe = (nome) => ({ nome, ...podeNadar(nome) });

console.log(criarPato('Donald').voar());
console.log(criarPato('Donald').nadar());
console.log(criarPeixe('Nemo').nadar());
// Cada habilidade é uma peça solta. Você combina o que precisa, sem árvore de classes.

// ─── 5) Variações do mesmo objeto ───
function criarBotao(tipo) {
  const base = { largura: 120, altura: 40 };
  const estilos = {
    primario: { cor: '#f5d76e' },
    perigo: { cor: '#ff5f57' },
  };
  return { ...base, ...(estilos[tipo] ?? estilos.primario), tipo };
}

console.log(criarBotao('perigo'));
console.log(criarBotao('inexistente'));   // caiu no padrão

// ═══ PEGADINHAS ═══

// ─── 6) Método com `this` não pode ser arrow ───
const comArrow = { nome: 'Ana', saudar: () => `Oi, ${this?.nome}` };
const comMetodo = { nome: 'Ana', saudar() { return `Oi, ${this.nome}`; } };

console.log('Arrow: ', comArrow.saudar());     // arrow não tem this próprio
console.log('Método:', comMetodo.saudar());

// ─── Resumo ───
// 1. Factory é função comum que devolve objeto. Sem `new`, sem `this` na criação.
// 2. Validar e normalizar dentro dela garante que objeto inválido nunca existe.
// 3. Combinada com closure, dá dado 100% privado — mais simples que classe.
// 4. Composição com spread substitui herança: junte só as habilidades necessárias.
// 5. Método que usa `this` precisa da forma `metodo() {}`, não de arrow.
