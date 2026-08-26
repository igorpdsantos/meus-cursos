/**
 * Object.defineProperty e defineProperties
 * Sessão 7 · Rodar: node src/07-extras/05-define-property.js
 *
 * O QUE É: criar propriedade escolhendo as regras dela — se pode ser alterada, se aparece
 *          nas listagens, se pode ser removida, ou se é calculada na hora (`get`/`set`).
 * QUANDO USAR: campo derivado, campo interno que não deve vazar em log/JSON, validação na
 *              escrita, e quando você precisa ler as regras de uma propriedade existente.
 * QUANDO NÃO USAR: no dia a dia. Para objeto comum, `obj.campo = valor` é mais claro.
 *                  Em classe, `get`/`set` na própria classe resolvem sem essa verbosidade.
 */

// ═══ ESSENCIAL ═══

// ─── 1) A diferença para o `obj.campo = valor` ───
const produto = { nome: 'Teclado' };            // atribuição normal: solta e livre

Object.defineProperty(produto, 'codigo', { value: 'TEC-01' });   // sem dizer mais nada

produto.codigo = 'OUTRO';                       // não muda: writable é false por padrão
console.log(produto.codigo, '| listado?', Object.keys(produto));
// O que você não declara vem como FALSE: writable, enumerable e configurable.

// ─── 2) Ler as regras de uma propriedade ───
const pedido = { total: 250 };

console.log(Object.getOwnPropertyDescriptor(pedido, 'total'));   // tudo true na atribuição normal

Object.defineProperty(pedido, 'id', { value: 99, enumerable: true });
console.log(Object.getOwnPropertyDescriptor(pedido, 'id'));

// ─── 3) defineProperties: várias de uma vez ───
const cliente = {};

Object.defineProperties(cliente, {
  nome:  { value: 'Ana', writable: true, enumerable: true },
  cpf:   { value: '12345678900', enumerable: true },           // só leitura
  senha: { value: 'hash-abc', writable: true },                // não aparece nas listagens
});

console.log(cliente, '| chaves visíveis:', Object.keys(cliente));

// ═══ NA PRÁTICA ═══

// ─── 4) Campo calculado na hora (get) ───
const carrinho = { itens: [{ preco: 89.5 }, { preco: 249.9 }] };

Object.defineProperty(carrinho, 'total', {
  get() { return this.itens.reduce((s, i) => s + i.preco, 0); },   // roda a cada leitura
  enumerable: true,
});

console.log('Total:', carrinho.total);
carrinho.itens.push({ preco: 10 });
console.log('Depois de incluir:', carrinho.total);   // acompanha sozinho, sem recalcular na mão

// ─── 5) Esconder campo interno do log e do JSON ───
const usuario = { nome: 'Ana', email: 'ana@empresa.com' };

Object.defineProperty(usuario, 'tokenSessao', { value: 'eyJhbGciOi', writable: true });

console.log(JSON.stringify(usuario));           // o token não vai para a resposta da API
console.log('Mas dá para ler:', usuario.tokenSessao);
// enumerable: false esconde de Object.keys, do JSON e do for...in — não é segurança, é higiene.

// ─── 6) Validar na escrita (set) ───
const item = { nome: 'Monitor' };
let precoInterno = 0;

Object.defineProperty(item, 'preco', {
  get() { return precoInterno; },
  set(valor) {
    if (typeof valor !== 'number' || valor < 0) return console.log('Preço recusado:', valor);
    precoInterno = valor;
  },
  enumerable: true,
});

item.preco = 1199;
item.preco = -50;                               // barrado antes de sujar o objeto
console.log('Preço guardado:', item.preco);

// ═══ PEGADINHAS ═══

// ─── 7) Os padrões são o contrário do que você espera ───
const config = {};

Object.defineProperty(config, 'moeda', { value: 'BRL' });   // esqueceu os três flags

config.moeda = 'USD';                           // falha calada fora do modo estrito
console.log(config.moeda, '| Object.keys:', Object.keys(config), '| JSON:', JSON.stringify(config));
console.log('A propriedade existe, mas some de tudo. Declare os flags que você quer.');

// ─── 8) É isso que o Object.freeze faz por baixo ───
const taxa = Object.freeze({ percentual: 5 });

console.log(Object.getOwnPropertyDescriptor(taxa, 'percentual'));
// freeze = writable: false + configurable: false em toda propriedade. E configurable: false
// não tem volta: nem defineProperty consegue reabrir depois (lança TypeError).

// ─── Resumo ───
// 1. `defineProperty(obj, nome, regras)` cria/ajusta uma propriedade com regras explícitas.
// 2. Tudo que você não declarar vira `false` — o oposto da atribuição normal.
// 3. `writable` (dá para alterar), `enumerable` (aparece em keys/JSON), `configurable` (dá para
//    redefinir ou apagar).
// 4. `get`/`set` fazem campo calculado e validação na escrita, com cara de campo normal.
// 5. `getOwnPropertyDescriptor` mostra as regras — é como se enxerga o que o `freeze` fez.
