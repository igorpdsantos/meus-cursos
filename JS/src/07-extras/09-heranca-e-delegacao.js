/**
 * Herança (que na verdade é delegação)
 * Sessão 8 · Rodar: node src/07-extras/09-heranca-e-delegacao.js
 *
 * O QUE É: ligar o protótipo de um construtor ao de outro, para o filho aproveitar os métodos
 *          do pai. Todo mundo chama de herança, mas nada é copiado: o que falta é DELEGADO
 *          para cima na cadeia de protótipos.
 * QUANDO USAR: quando um tipo é realmente um caso específico do outro (camiseta É um produto).
 * QUANDO NÃO USAR: quando a relação for "tem um" em vez de "é um" — aí componha em vez de
 *                  herdar. Se o projeto usa `class`, `extends`/`super` fazem isto em uma linha.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Montar a cadeia na mão ───
function Produto(nome, preco) { this.nome = nome; this.preco = preco; }
Produto.prototype.aumento = function (quantia) { this.preco += quantia; };

function Camiseta(nome, preco, cor) {
  Produto.call(this, nome, preco);                    // roda o construtor do pai com o this daqui
  this.cor = cor;
}

Camiseta.prototype = Object.create(Produto.prototype); // objeto vazio cujo protótipo é o do pai
Camiseta.prototype.constructor = Camiseta;             // conserta: sem isso, aponta para Produto

const c = new Camiseta('Camiseta', 50, 'preta');
c.aumento(10);

console.log(c, '| método veio do pai:', c.preco);

// ─── 2) Por que "delegação" descreve melhor ───
function Base(nome) { this.nome = nome; }
function Filho(nome) { Base.call(this, nome); }
Filho.prototype = Object.create(Base.prototype);
Filho.prototype.constructor = Filho;

const obj = new Filho('Ana');

Base.prototype.saudacao = function () { return `Oi, ${this.nome}`; };   // criado DEPOIS do objeto

console.log(obj.saudacao());
console.log('O objeto tem o método?', obj.hasOwnProperty('saudacao'));
// Se fosse herança de verdade, o objeto teria copiado o pai no nascimento e não veria nada novo.
// Ele não copiou nada: na hora da chamada, pede emprestado para quem está acima na cadeia.

// ─── 3) A mesma cadeia com class ───
class ProdutoModerno {
  constructor(nome, preco) { this.nome = nome; this.preco = preco; }
  aumento(quantia) { this.preco += quantia; }
}

class CamisetaModerna extends ProdutoModerno {         // substitui as 3 linhas do bloco 1
  constructor(nome, preco, cor) { super(nome, preco); this.cor = cor; }
}

const cm = new CamisetaModerna('Camiseta', 50, 'azul');
cm.aumento(10);

console.log(cm, '| a máquina por baixo é a mesma:',
  Object.getPrototypeOf(CamisetaModerna.prototype) === ProdutoModerno.prototype);

// ═══ NA PRÁTICA ═══

// ─── 4) Sobrescrever o método do pai (e ainda usar o dele) ───
function Item(nome, preco) { this.nome = nome; this.preco = preco; }
Item.prototype.etiqueta = function () { return `${this.nome}: R$ ${this.preco.toFixed(2)}`; };

function Promocional(nome, preco, validade) {
  Item.call(this, nome, preco);
  this.validade = validade;
}
Promocional.prototype = Object.create(Item.prototype);
Promocional.prototype.constructor = Promocional;

Promocional.prototype.etiqueta = function () {         // o filho vem primeiro na busca
  return `${Item.prototype.etiqueta.call(this)} (até ${this.validade})`;   // o `super` na mão
};

console.log(new Promocional('Fone', 199, '30/09').etiqueta());
console.log(new Item('Fone', 199).etiqueta());         // o pai continua intacto

// ─── 5) Onde cada coisa mora ───
function Veiculo(placa) { this.placa = placa; }
Veiculo.prototype.andar = function () { return 'andando'; };

function Carro(placa) { Veiculo.call(this, placa); }
Carro.prototype = Object.create(Veiculo.prototype);
Carro.prototype.constructor = Carro;

const meu = new Carro('ABC-1234');

console.log('instanceof Carro:', meu instanceof Carro, '| Veiculo:', meu instanceof Veiculo);
console.log('placa é própria?', meu.hasOwnProperty('placa'), '| andar?', meu.hasOwnProperty('andar'));
console.log('Veiculo.prototype está na cadeia?', Veiculo.prototype.isPrototypeOf(meu));

// ─── 6) Três níveis: a busca sobe até achar ───
function A() {}
A.prototype.oi = function () { return 'veio de A'; };
function B() {} B.prototype = Object.create(A.prototype); B.prototype.constructor = B;
function C() {} C.prototype = Object.create(B.prototype); C.prototype.constructor = C;

const tres = new C();

console.log(tres.oi());                                 // C → B → A
console.log('Cadeia:', [C, B, A].map((f) => f.name).join(' → '), '→ Object → null');
B.prototype.oi = function () { return 'agora B responde primeiro'; };
console.log(tres.oi());                                 // quem está mais perto ganha

// ═══ PEGADINHAS ═══

// ─── 7) Esquecer o Produto.call(this, ...) ───
function Pai(nome, preco) { this.nome = nome; this.preco = preco; }
Pai.prototype.mostrar = function () { return `${this.nome} — ${this.preco}`; };

function FilhoRuim(nome, preco, cor) { this.cor = cor; }   // não chamou o construtor do pai
FilhoRuim.prototype = Object.create(Pai.prototype);

console.log(new FilhoRuim('Caneca', 15, 'branca').mostrar());
console.log('Os métodos chegaram, os DADOS não: só o construtor do pai preenche isso.');

// ─── 8) Ligar direto no prototype do pai polui o pai ───
function Origem() {}
Origem.prototype.tipo = 'origem';

function Copia() {}
Copia.prototype = Origem.prototype;                     // MESMO objeto, sem Object.create
Copia.prototype.extra = 'só do filho';                  // escreveu no pai também

console.log('O pai ganhou o método do filho?', Origem.prototype.extra);
console.log('Use sempre Object.create(Pai.prototype): cria um elo NOVO apontando para o pai.');

// ─── Resumo ───
// 1. `Pai.call(this, ...)` traz os DADOS; `Object.create(Pai.prototype)` traz os MÉTODOS.
// 2. Depois disso, conserte `Filho.prototype.constructor = Filho`.
// 3. Nada é copiado: o objeto delega para cima na cadeia, na hora da chamada. Por isso método
//    adicionado no pai depois já aparece nos objetos que existiam antes.
// 4. Método do filho com o mesmo nome esconde o do pai; para usar o do pai, `.call(this)`.
// 5. `class ... extends` + `super` fazem tudo isso em duas palavras — mesma máquina por baixo.
