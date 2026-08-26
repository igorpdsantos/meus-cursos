/**
 * Factory, constructor function e class
 * Sessão 8 · Rodar: node src/07-extras/11-tres-formas-de-criar-objetos.js
 *
 * O QUE É: três padrões de projeto para a mesma tarefa — criar vários objetos do mesmo tipo.
 *          São escolhas de estilo, não degraus de evolução: nenhum é "o certo".
 * QUANDO USAR: sempre um dos três. O critério é o que você e o time leem com mais facilidade,
 *              e o que o projeto já usa — misturar os três no mesmo código é o que atrapalha.
 * QUANDO NÃO USAR: nenhum deles, quando é um objeto só. Aí um literal `{}` basta.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O mesmo produto, nas três formas ───
function criaProduto(nome, preco) {                       // factory: função comum, sem `new`
  return { nome, preco, etiqueta() { return `${this.nome}: ${this.preco}`; } };
}

function Produto(nome, preco) { this.nome = nome; this.preco = preco; }   // constructor function
Produto.prototype.etiqueta = function () { return `${this.nome}: ${this.preco}`; };

class ProdutoClass {                                      // class
  constructor(nome, preco) { this.nome = nome; this.preco = preco; }
  etiqueta() { return `${this.nome}: ${this.preco}`; }
}

console.log(criaProduto('Caneca', 15).etiqueta());
console.log(new Produto('Caneca', 15).etiqueta());
console.log(new ProdutoClass('Caneca', 15).etiqueta());
// Mesma saída, três caminhos. Escolher é decisão de projeto, não de qualidade.

// ─── 2) O que muda por dentro ───
const daFactory = { nome: 'A', etiqueta() { return this.nome; } };

function Construtora(nome) { this.nome = nome; }
Construtora.prototype.etiqueta = function () { return this.nome; };

class Classe { constructor(nome) { this.nome = nome; } etiqueta() { return this.nome; } }

console.log('Factory  — método no objeto:', daFactory.hasOwnProperty('etiqueta'));
console.log('Construtor — método no objeto:', new Construtora('A').hasOwnProperty('etiqueta'));
console.log('Class    — método no objeto:', new Classe('A').hasOwnProperty('etiqueta'));
// Constructor function e class são a MESMA máquina: método no protótipo. A factory devolve
// um objeto solto — a não ser que você mesmo ligue um protótipo nela.

// ─── 3) Factory também pode usar protótipo ───
const metodos = { etiqueta() { return `${this.nome}: ${this.preco}`; } };

const criaComProto = (nome, preco) => Object.assign(Object.create(metodos), { nome, preco });

const x = criaComProto('Fone', 199);
const y = criaComProto('Mouse', 89);

console.log(x.etiqueta(), '| método compartilhado?', x.etiqueta === y.etiqueta);
console.log('Ou seja: "factory gasta memória" não é regra — depende de como você escreve.');

// ═══ NA PRÁTICA ═══

// ─── 4) O que a factory entrega de graça ───
function criaConta(titular, saldoInicial) {
  let saldo = saldoInicial;                               // closure: ninguém alcança de fora
  return {
    titular,
    depositar(v) { saldo += v; return this; },
    extrato() { return `${titular}: R$ ${saldo.toFixed(2)}`; },
  };
}

const conta = criaConta('Ana', 100);
conta.depositar(50);
conta.saldo = 999999;                    // cria um campo novo e inútil: o saldo real é a closure

console.log(conta.extrato(), '| o saldo de verdade não tem como ser alcançado de fora');
console.log('Sem `new`: se esquecer, não quebra nada — é uma função comum.');

// ─── 5) O que a class entrega de graça ───
class Base {
  #segredo = 'privado de verdade';                        // campo privado nativo
  constructor(nome) { this.nome = nome; }
  revelar() { return this.#segredo; }
}

class Filha extends Base {                                // herança em uma palavra
  constructor(nome) { super(nome); }
}

const f = new Filha('Ana');

console.log(f.revelar(), '| instanceof Base:', f instanceof Base);
try { Base('sem new'); } catch (e) { console.log('Esqueceu o new:', e.message); }  // avisa na hora

// ─── 6) Constructor function: onde ela ainda aparece ───
function Pessoa(nome) { this.nome = nome; }
Pessoa.prototype.falar = function () { return `${this.nome} falou`; };

const antiga = new Pessoa('Luiz');

console.log(antiga.falar(), '| é a mesma coisa que class?',
  typeof Pessoa === 'function' && typeof ProdutoClass === 'function');
console.log('Dominá-la é o que faz `class` deixar de ser mágica — e é o que tem em código antigo.');

// ═══ PEGADINHAS ═══

// ─── 7) O custo aparece quando o método nasce dentro da função ───
function criaCaro(nome) {
  return { nome, etiqueta() { return this.nome; } };      // função NOVA a cada chamada
}

console.log('Método por objeto:', criaCaro('a').etiqueta === criaCaro('b').etiqueta);

class Barata { constructor(nome) { this.nome = nome; } etiqueta() { return this.nome; } }

console.log('Método compartilhado:', new Barata('a').etiqueta === new Barata('b').etiqueta);
// Só vira problema com MUITOS objetos. Para dezenas, escreva o que ficar mais claro.

// ─── 8) Método de class perde o `this` ao virar callback ───
class Contador {
  constructor() { this.valor = 0; }
  somar() { this.valor++; return this.valor; }
}

const criaContador = () => { let valor = 0; return { somar: () => ++valor }; };

const daClasse = new Contador();
const executar = (fn) => { try { return fn(); } catch (e) { return 'quebrou: ' + e.message; } };

console.log('Class:  ', executar(daClasse.somar));        // `this` se perdeu no caminho
console.log('Amarrado:', executar(daClasse.somar.bind(daClasse)));
console.log('Factory:', executar(criaContador().somar)); // closure não depende de `this`

// ─── Resumo ───
// 1. Factory, constructor function e class resolvem o mesmo problema — são padrões, não níveis.
// 2. Constructor function e class são a mesma máquina: método no protótipo, criação com `new`.
// 3. Factory dá privacidade por closure, dispensa `new` e não sofre com `this` perdido.
// 4. Class dá `extends`/`super`, campo `#privado`, `instanceof` e erro na hora se faltar `new`.
// 5. Escolha o que você lê melhor e o que o projeto já usa; o problema é misturar os três.
