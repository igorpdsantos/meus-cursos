/**
 * Funções e parâmetros
 * Sessão 4 · Rodar: node src/04-funcoes/01-funcoes-e-parametros.js
 *
 * O QUE É: bloco de código com nome, que recebe entradas e devolve uma saída.
 * QUANDO USAR: quando o mesmo raciocínio aparece duas vezes, ou quando um trecho merece
 *              um nome para o código se explicar sozinho.
 * QUANDO NÃO USAR: uma função que faz cinco coisas diferentes. Quebre em cinco.
 */

// ═══ ESSENCIAL ═══

// ─── 1) As três formas de escrever ───
function frete(peso) { return peso * 2.5; }          // declaração
const frete2 = function (peso) { return peso * 2.5; };  // expressão
const frete3 = (peso) => peso * 2.5;                 // arrow: return implícito

console.log(frete(4), frete2(4), frete3(4));

// ─── 2) Valor padrão para o que não veio ───
function formatarPreco(valor, moeda = 'R$', casas = 2) {
  return `${moeda} ${valor.toFixed(casas)}`;
}

console.log(formatarPreco(19.9));
console.log(formatarPreco(19.9, 'US$'));

// ─── 3) Early return: trate o caso ruim primeiro e saia ───
function aplicarCupom(valor, cupom) {
  if (!cupom) return valor;              // sai cedo
  if (cupom.expirado) return valor;
  if (valor < cupom.minimo) return valor;
  return valor - cupom.desconto;         // o caso feliz fica limpo, sem aninhamento
}

const cupom = { desconto: 30, minimo: 100, expirado: false };
console.log(aplicarCupom(200, cupom));
console.log(aplicarCupom(50, cupom));

// ═══ NA PRÁTICA ═══

// ─── 4) Rest: quantidade indefinida de argumentos ───
function somar(...valores) {
  return valores.reduce((total, v) => total + v, 0);
}

console.log(somar(10, 20, 30));
console.log(somar(...[5, 5, 5]));

// ─── 5) Objeto de opções em vez de 5 parâmetros na ordem ───
function criarUsuario({ nome, email, admin = false }) {
  return `${nome} <${email}>${admin ? ' [admin]' : ''}`;
}

console.log(criarUsuario({ nome: 'Ana', email: 'ana@x.com', admin: true }));
// Compare com criarUsuario('Ana', 'ana@x.com', true, false, true) — qual é qual?

// ─── 6) Função pura: não mexe no que recebeu ───
const precos = [100, 200];

const pura = (lista) => lista.map((p) => p * 1.1);       // devolve lista nova
const suja = (lista) => { lista[0] = 999; };             // altera a de fora!

console.log('Pura devolve:', pura(precos), '→ original:', precos);
suja(precos);
console.log('Suja alterou: ', precos);

// ═══ PEGADINHAS ═══

// ─── 7) Argumento que ninguém passou vem undefined ───
function calcularIdade(anoNascimento) {
  if (anoNascimento === undefined) throw new Error('anoNascimento é obrigatório');
  return 2026 - anoNascimento;
}

try { calcularIdade(); } catch (erro) { console.log(erro.message); }
console.log(calcularIdade(1990), 'anos');

// ─── Resumo ───
// 1. Arrow (`=>`) para função curta; `function` quando precisa de nome e hoisting.
// 2. Valor padrão no parâmetro evita um monte de `if` no começo do corpo.
// 3. Early return achata o código: caso ruim sai cedo, caso feliz fica sem indentação.
// 4. Mais de 3 parâmetros? Troque por um objeto de opções — a chamada se explica.
// 5. Prefira função pura: recebe, calcula e devolve, sem alterar o que veio de fora.
