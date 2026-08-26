/**
 * Composição e mixins com prototype
 * Sessão 8 · Rodar: node src/07-extras/10-composicao-e-mixins.js
 *
 * O QUE É: montar o protótipo juntando pequenos objetos de habilidade (mixins) com
 *          `Object.assign`, e criar as instâncias com `Object.create` apontando para ele.
 * QUANDO USAR: quando os comportamentos se combinam de formas diferentes ("pode voar",
 *              "pode nadar") e uma árvore de herança não daria conta.
 * QUANDO NÃO USAR: quando existe mesmo uma relação "é um" simples — aí `class` é mais direto.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Cada habilidade é um objeto solto ───
const falar = { falar() { return `${this.nome} está falando`; } };   // `this` = quem receber
const comer = { comer() { return `${this.nome} está comendo`; } };
const beber = { beber() { return `${this.nome} está bebendo`; } };

const pessoaPrototype = Object.assign({}, falar, comer, beber);      // junta tudo num protótipo

console.log(Object.keys(pessoaPrototype));
console.log(falar.falar.call({ nome: 'Ana' }));   // o método não é de ninguém até ser chamado

// ─── 2) A factory: dados próprios, métodos compartilhados ───
const habilidades = Object.assign({}, { falar() { return `${this.nome} falou`; } });

function criaPessoa(nome, sobrenome) {
  return Object.create(habilidades, {                // protótipo + descritores dos campos
    nome: { value: nome, enumerable: true },
    sobrenome: { value: sobrenome, enumerable: true },
  });
}

const p1 = criaPessoa('Luiz', 'Otávio');
const p2 = criaPessoa('Maria', 'A.');

console.log(p1.falar(), '|', p2.falar());
console.log('Método é o mesmo objeto?', p1.falar === p2.falar);      // uma cópia só na memória
console.log('Dados são próprios?', p1.hasOwnProperty('nome'), '| método:', p1.hasOwnProperty('falar'));

// ─── 3) Onde o método fica guardado ───
const nadar = { nadar() { return `${this.nome} nadou`; } };

const criaSolto = (nome) => ({ nome, nadar() { return `${this.nome} nadou`; } });  // função nova
const criaEspalhado = (nome) => ({ nome, ...nadar });        // copia a referência do mixin
const criaComProto = (nome) => Object.assign(Object.create(nadar), { nome });

console.log('Método escrito na factory:', criaSolto('a').nadar === criaSolto('b').nadar);
console.log('Espalhado do mixin:       ', criaEspalhado('a').nadar === criaEspalhado('b').nadar);
console.log('Cada objeto guarda o método?', criaEspalhado('a').hasOwnProperty('nadar'),
  '| com protótipo:', criaComProto('a').hasOwnProperty('nadar'));
// Escrever o método dentro da factory cria uma função NOVA por objeto — é o desperdício real.
// O spread não duplica a função, mas cada objeto ainda carrega um campo apontando para ela.
// Com protótipo, o campo existe uma vez só, e as instâncias só guardam dado.

// ═══ NA PRÁTICA ═══

// ─── 4) As mesmas peças, tipos diferentes ───
const voa = { voar() { return `${this.nome} decolou`; } };
const nada = { nadar() { return `${this.nome} mergulhou`; } };
const anda = { andar() { return `${this.nome} andou`; } };

const patoProto = Object.assign({}, voa, nada, anda);   // escolhe as habilidades por tipo
const peixeProto = Object.assign({}, nada);

const criaPato = (nome) => Object.assign(Object.create(patoProto), { nome });
const criaPeixe = (nome) => Object.assign(Object.create(peixeProto), { nome });

console.log(criaPato('Donald').voar(), '|', criaPato('Donald').nadar());
console.log(criaPeixe('Nemo').nadar(), '| peixe voa?', 'voar' in criaPeixe('Nemo'));

// ─── 5) Campos com regra própria na hora de criar ───
const contaProto = { extrato() { return `${this.titular}: R$ ${this.saldo.toFixed(2)}`; } };

function criaConta(titular, saldo) {
  return Object.create(contaProto, {
    titular: { value: titular, enumerable: true },                    // só leitura
    saldo: { value: saldo, writable: true, enumerable: true },        // pode mudar
    senha: { value: '1234', writable: true },                         // fora do JSON e do log
  });
}

const conta = criaConta('Ana', 1000);
conta.titular = 'Outro';                                              // ignorado
conta.saldo += 500;

console.log(conta.extrato(), '|', JSON.stringify(conta));

// ─── 6) Adicionar habilidades a uma class já existente ───
class Usuario {
  constructor(nome) { this.nome = nome; }
}

const podeLogar = { logar() { return `${this.nome} entrou`; } };
const podeNotificar = { notificar(msg) { return `Para ${this.nome}: ${msg}`; } };

Object.assign(Usuario.prototype, podeLogar, podeNotificar);   // mixin direto no protótipo

const u = new Usuario('Ana');
console.log(u.logar(), '|', u.notificar('pedido enviado'));

// ═══ PEGADINHAS ═══

// ─── 7) Em Object.create, o descritor começa tudo `false` ───
const proto = { oi() { return `oi, ${this.nome}`; } };

const escondido = Object.create(proto, { nome: { value: 'Ana' } });   // faltou enumerable
const visivel = Object.create(proto, { nome: { value: 'Ana', enumerable: true } });

console.log('Funciona:', escondido.oi(), '| mas o log mostra:', escondido);
console.log('Com enumerable:', visivel, '| JSON:', JSON.stringify(escondido));
// O campo existe e responde — só não aparece em log, `Object.keys` nem JSON. Declare os flags.

// ─── 8) Mixin com dado dentro vira estado compartilhado ───
const comCarrinho = { itens: [], add(p) { this.itens.push(p); return this; } };

const cliente1 = Object.create(comCarrinho);
const cliente2 = Object.create(comCarrinho);

cliente1.add('Teclado');
console.log('Carrinho do cliente2:', cliente2.itens);   // o array é o MESMO objeto, lá em cima
console.log('Mixin só com métodos; dado é criado por instância, na factory.');

// ─── Resumo ───
// 1. Mixin é um objeto só com métodos que usam `this` — ele não sabe quem vai usá-lo.
// 2. `Object.assign({}, a, b, c)` junta as habilidades num protótipo único.
// 3. `Object.create(proto, descritores)` cria a instância: método compartilhado, dado próprio.
// 4. Método escrito dentro da factory é uma função nova por objeto; no protótipo, uma só.
// 5. Nunca ponha array/objeto no mixin: todas as instâncias vão dividir a mesma referência.
