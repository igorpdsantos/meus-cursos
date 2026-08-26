/**
 * getOwnPropertyDescriptor e getOwnPropertyDescriptors
 * Sessão 7 · Rodar: node src/07-extras/07-descritores.js
 *
 * O QUE É: o raio-x de uma propriedade — mostra o valor e as quatro regras dela (`writable`,
 *          `enumerable`, `configurable`) ou o `get`/`set` que estão por trás.
 * QUANDO USAR: investigar por que um campo não muda ou some do JSON, e clonar objeto sem
 *              perder getter nem os flags.
 * QUANDO NÃO USAR: para ler o valor. Isso é `obj.campo` — descritor é para entender a REGRA.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O raio-x de uma propriedade ───
const pedido = { total: 250 };

console.log(Object.getOwnPropertyDescriptor(pedido, 'total'));
console.log('Campo que não existe:', Object.getOwnPropertyDescriptor(pedido, 'desconto'));

// ─── 2) Todas de uma vez ───
const usuario = { nome: 'Ana' };
Object.defineProperty(usuario, 'token', { value: 'abc', enumerable: false });

console.log(Object.getOwnPropertyDescriptors(usuario));   // inclui as que Object.keys esconde

// ─── 3) O mesmo campo, três origens diferentes ───
const alvo = { normal: 1 };
Object.defineProperty(alvo, 'definido', { value: 2 });    // flags não declarados = false
const congelado = Object.freeze({ travado: 3 });

console.log('normal:  ', Object.getOwnPropertyDescriptor(alvo, 'normal'));
console.log('definido:', Object.getOwnPropertyDescriptor(alvo, 'definido'));
console.log('congelado:', Object.getOwnPropertyDescriptor(congelado, 'travado'));

// ═══ NA PRÁTICA ═══

// ─── 4) Descobrir por que o campo não muda ───
const config = Object.freeze({ moeda: 'BRL' });

config.moeda = 'USD';                                     // falhou calado
const regras = Object.getOwnPropertyDescriptor(config, 'moeda');

console.log('Continua', config.moeda, '— porque writable é', regras.writable);
console.log('Dá para redefinir?', regras.configurable);

// ─── 5) Clonar sem perder o getter ───
const carrinho = { itens: [{ preco: 100 }, { preco: 50 }] };
Object.defineProperty(carrinho, 'total', {
  get() { return this.itens.reduce((s, i) => s + i.preco, 0); },
  enumerable: true,
});

const comAssign = Object.assign({}, carrinho);            // dispara o get e copia o NÚMERO
const comDescritores = Object.create(
  Object.getPrototypeOf(carrinho),
  Object.getOwnPropertyDescriptors(carrinho),             // copia o get em si
);

comAssign.itens.push({ preco: 30 });
console.log('assign:', comAssign.total, '| descritores:', comDescritores.total);
// O do assign congelou em 150; o outro continua sendo um getter e acompanhou.

// ─── 6) Ver o que um objeto esconde ───
const conta = { titular: 'Ana' };
Object.defineProperties(conta, {
  _saldo: { value: 1000, writable: true },                // escondido das listagens
  saldo: { get() { return `R$ ${this._saldo}`; }, enumerable: true },
});

for (const [nome, d] of Object.entries(Object.getOwnPropertyDescriptors(conta))) {
  const tipo = d.get || d.set ? 'acessor (get/set)' : `dado = ${d.value}`;
  console.log(`${nome.padEnd(9)} ${tipo} | visível: ${d.enumerable}`);
}

// ═══ PEGADINHAS ═══

// ─── 7) "Own" quer dizer só o que é do próprio objeto ───
const base = { plano: 'free' };
const filho = Object.create(base);                        // herda de base
filho.nome = 'Ana';

console.log('Lê normal:', filho.plano);                                   // herdou o valor
console.log('Descritor:', Object.getOwnPropertyDescriptor(filho, 'plano'));  // undefined
console.log('No pai:', Object.getOwnPropertyDescriptor(Object.getPrototypeOf(filho), 'plano'));

// ─── 8) O descritor é um retrato, não um controle remoto ───
const produto = { preco: 100 };
const foto = Object.getOwnPropertyDescriptor(produto, 'preco');

foto.value = 999;                                         // mexer no retrato não muda nada
console.log('Objeto:', produto.preco, '| retrato:', foto.value);

Object.defineProperty(produto, 'preco', foto);            // para valer, é preciso reaplicar
console.log('Depois de reaplicar:', produto.preco);

// ─── Resumo ───
// 1. `getOwnPropertyDescriptor(obj, nome)` mostra as regras de UMA propriedade; o plural, de todas.
// 2. Atribuição normal deixa tudo `true`; `defineProperty` e `freeze` fecham os flags.
// 3. É a ferramenta para descobrir por que um campo não muda ou não aparece no JSON.
// 4. `Object.create(proto, getOwnPropertyDescriptors(obj))` clona preservando getter e flags —
//    coisa que `assign` e spread não fazem: eles disparam o getter e copiam o valor.
// 5. "Own" ignora o que veio do protótipo, e o descritor devolvido é só uma cópia de leitura.
