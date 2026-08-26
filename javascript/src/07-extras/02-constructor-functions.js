/**
 * Constructor functions e o caminho até class
 * Sessão 4 · Rodar: node src/07-extras/02-constructor-functions.js
 *
 * O QUE É: função chamada com `new`, que preenche um objeto vazio através do `this`.
 * QUANDO USAR: quando o projeto já segue esse padrão, e para entender código legado e como o
 *              prototype funciona por baixo — `class` é a mesma máquina com outra sintaxe.
 * QUANDO NÃO USAR: junto com os outros padrões no mesmo código. E lembre: aqui, esquecer o
 *                  `new` falha em silêncio; com `class`, dá erro na hora.
 */

// ═══ ESSENCIAL ═══

// ─── 1) new cria o objeto, this preenche ───
function Produto(nome, preco) {
  this.nome = nome;      // `new` criou um objeto vazio e apontou o this para ele
  this.preco = preco;
}

const teclado = new Produto('Teclado', 249.9);

console.log(teclado);
console.log('É instância de Produto?', teclado instanceof Produto);

// ─── 2) Por que o método vai no prototype ───
function Item(nome) { this.nome = nome; }
Item.prototype.etiqueta = function () { return `Item: ${this.nome}`; };   // compartilhado

const a = new Item('Mouse');
const b = new Item('Monitor');

console.log(a.etiqueta());
console.log('Compartilham o mesmo método?', a.etiqueta === b.etiqueta);
// Se cada objeto tivesse a própria cópia, mil itens = mil funções iguais na memória.

// ─── 3) A mesma coisa com class: a forma moderna ───
class ProdutoModerno {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
  etiqueta() { return `${this.nome} — R$ ${this.preco.toFixed(2)}`; }   // vai no prototype igual
}

console.log(new ProdutoModerno('Monitor', 1199).etiqueta());
console.log('class é açúcar sintático: por baixo é o mesmo prototype.');

// ═══ NA PRÁTICA ═══

// ─── 4) Herança: antes e depois ───
function Base(nome) { this.nome = nome; }
Base.prototype.descrever = function () { return `sou ${this.nome}`; };

function Digital(nome, mb) {
  Base.call(this, nome);                            // chama o "pai" com o this daqui
  this.mb = mb;
}
Digital.prototype = Object.create(Base.prototype);  // liga a cadeia
Digital.prototype.constructor = Digital;            // conserta o construtor
Digital.prototype.baixar = function () { return `baixando ${this.mb}MB`; };

const ebook = new Digital('Ebook', 12);
console.log(ebook.descrever(), '|', ebook.baixar());

class BaseModerna {
  constructor(nome) { this.nome = nome; }
  descrever() { return `sou ${this.nome}`; }
}
class DigitalModerno extends BaseModerna {          // 4 linhas viraram 1
  constructor(nome, mb) { super(nome); this.mb = mb; }
  baixar() { return `baixando ${this.mb}MB`; }
}

const curso = new DigitalModerno('Curso JS', 500);
console.log(curso.descrever(), '|', curso.baixar());

// ═══ PEGADINHAS ═══

// ─── 5) Esquecer o `new` quebra em silêncio ───
function Antiga(nome) { this.nome = nome; }

const semNew = Antiga('Erro');     // sem `new`, não devolve nada
console.log('Retorno sem new:', semNew);

class Moderna {
  constructor() { this.ok = true; }
}

try { Moderna(); }
catch (erro) { console.log('Com class:', erro.message); }   // avisa na hora — por isso é melhor

// ─── Resumo ───
// 1. `new` cria um objeto vazio, aponta o `this` para ele e devolve no fim.
// 2. Métodos vão no `prototype` para serem compartilhados, não copiados por objeto.
// 3. `class` é a mesma máquina com sintaxe melhor — e `extends`/`super` substituem 4 linhas.
// 4. Esquecer o `new` numa constructor function falha calado; com `class` dá erro na hora.
// 5. Factory, constructor function e class são padrões diferentes, não níveis de qualidade:
//    escolha um e mantenha. Veja o comparativo em 11-tres-formas-de-criar-objetos.
