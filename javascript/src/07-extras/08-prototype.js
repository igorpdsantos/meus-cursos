/**
 * prototype e a cadeia de protótipos
 * Sessão 8 · Rodar: node src/07-extras/08-prototype.js
 *
 * O QUE É: todo objeto tem uma referência interna para outro objeto — o protótipo. Se o campo
 *          não está nele mesmo, o JS sobe por essa cadeia até achar (ou até chegar em `null`).
 * QUANDO USAR: para colocar método em UM lugar só e todas as instâncias compartilharem.
 * QUANDO NÃO USAR: para escrever herança à mão em código novo — `class` faz isso melhor.
 *                  Entender prototype é o que faz `class` deixar de ser mágica.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O problema: método dentro do construtor é copiado por instância ───
function PessoaRuim(nome, sobrenome) {
  this.nome = nome;
  this.sobrenome = sobrenome;
  this.nomeCompleto = () => `${this.nome} ${this.sobrenome}`;   // uma função NOVA por pessoa
}

const ruim1 = new PessoaRuim('Luiz', 'O.');
const ruim2 = new PessoaRuim('Maria', 'A.');

console.log(ruim1.nomeCompleto(), '|', ruim2.nomeCompleto());
console.log('Mesma função?', ruim1.nomeCompleto === ruim2.nomeCompleto);
// false: 10 mil pessoas = 10 mil cópias da mesma função ocupando memória do cliente.

// ─── 2) A solução: uma função só, no prototype ───
function Pessoa(nome, sobrenome) {
  this.nome = nome;                                  // só DADO fica na instância
  this.sobrenome = sobrenome;
}

Pessoa.prototype.nomeCompleto = function () {        // COMPORTAMENTO fica no protótipo
  return `${this.nome} ${this.sobrenome}`;
};

const p1 = new Pessoa('Luiz', 'O.');
const p2 = new Pessoa('Maria', 'A.');

console.log(p1.nomeCompleto(), '|', p2.nomeCompleto());
console.log('Mesma função?', p1.nomeCompleto === p2.nomeCompleto);   // true: uma só na memória
console.log('É da instância?', p1.hasOwnProperty('nomeCompleto'));   // false: veio de cima

// ─── 3) A cadeia: onde o JS procura ───
function Produto(nome) { this.nome = nome; }
Produto.prototype.etiqueta = function () { return `[${this.nome}]`; };

const caneca = new Produto('Caneca');

console.log(Object.getPrototypeOf(caneca) === Produto.prototype);          // 1º degrau
console.log(Object.getPrototypeOf(Produto.prototype) === Object.prototype); // 2º degrau
console.log(Object.getPrototypeOf(Object.prototype));                      // null = topo
console.log(caneca.etiqueta(), '| toString veio lá de cima:', caneca.toString());
// Use SEMPRE getPrototypeOf/setPrototypeOf. `__proto__` é legado, existe só por compatibilidade.

// ═══ NA PRÁTICA ═══

// ─── 4) Métodos compartilhados de verdade ───
function Item(nome, preco) {
  this.nome = nome;
  this.preco = preco;
}

Item.prototype.aumento = function (pct) { this.preco += this.preco * (pct / 100); return this; };
Item.prototype.desconto = function (pct) { this.preco -= this.preco * (pct / 100); return this; };

const camiseta = new Item('Camiseta', 50);
camiseta.aumento(10).desconto(50);                   // `return this` permite encadear

console.log(camiseta, '| métodos no objeto:', Object.keys(camiseta));

// ─── 5) Dar um protótipo a um objeto literal ───
function Produto2(nome, preco) { this.nome = nome; this.preco = preco; }
Produto2.prototype.aumento = function (pct) { this.preco += this.preco * (pct / 100); };

const literal = { nome: 'Caneca', preco: 15 };       // nasceu sem passar pelo construtor

Object.setPrototypeOf(literal, Produto2.prototype);  // agora enxerga os métodos
literal.aumento(10);

console.log(literal, '| instanceof Produto2?', literal instanceof Produto2);
// Funciona, mas `setPrototypeOf` num objeto já criado é lento — o motor perde otimizações.

// ─── 6) Object.create: já nasce com o protótipo certo ───
function Produto3(nome, preco) { this.nome = nome; this.preco = preco; }
Produto3.prototype.aumento = function (pct) { this.preco += this.preco * (pct / 100); };

const p3 = Object.create(Produto3.prototype);        // herda os métodos, mas NÃO roda o construtor
p3.preco = 113;
p3.aumento(10);

console.log(p3);                                     // Produto3 { preco: 124.3 } — sem `nome`
console.log('Sem construtor, nenhum campo é preenchido sozinho.');

// ═══ PEGADINHAS ═══

// ─── 7) Escrever nunca altera o protótipo ───
function Config() {}
Config.prototype.tema = 'claro';                     // valor compartilhado por todos

const c1 = new Config();
const c2 = new Config();

c1.tema = 'escuro';                                  // cria uma propriedade PRÓPRIA em c1

console.log(c1.tema, '|', c2.tema, '| c2 mudou?', c2.tema === 'claro');
console.log('c1 tem a própria?', c1.hasOwnProperty('tema'), '| c2:', c2.hasOwnProperty('tema'));
delete c1.tema;
console.log('Apagou a própria e voltou a enxergar a de cima:', c1.tema);

// ─── 8) Arrow function no prototype não enxerga o objeto ───
function Cliente(nome) { this.nome = nome; }

Cliente.prototype.comArrow = () => `Olá, ${this.nome}`;          // `this` é o do módulo, não o cliente
Cliente.prototype.comFuncao = function () { return `Olá, ${this.nome}`; };

const cli = new Cliente('Ana');

console.log(cli.comArrow(), '|', cli.comFuncao());
// No prototype, sempre `function`. Arrow só serve dentro do construtor (aí ela captura o this dele).

// ─── Resumo ───
// 1. Dado vai na instância (`this.x`); comportamento vai no `Construtor.prototype`.
// 2. Método no construtor é copiado por objeto; no protótipo existe uma cópia só.
// 3. O JS procura no objeto, depois no protótipo, subindo até `null` — é a cadeia.
// 4. Use `Object.getPrototypeOf`/`setPrototypeOf` e `Object.create`; `__proto__` é legado.
// 5. Escrever sempre cria propriedade própria e "esconde" a do protótipo, sem alterá-la.
