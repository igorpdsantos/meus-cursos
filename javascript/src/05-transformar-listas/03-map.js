/**
 * map — transformar itens
 * Sessão 5 · Rodar: node src/05-transformar-listas/03-map.js
 *
 * O QUE É: devolve um array NOVO do MESMO tamanho, com cada item transformado.
 * QUANDO USAR: converter formato (API → tela), calcular campo novo, extrair uma propriedade.
 * QUANDO NÃO USAR: só para percorrer sem usar o retorno (`forEach`) ou quando o tamanho
 *                  do resultado muda (`filter`/`flatMap`).
 */

// ═══ ESSENCIAL ═══

// ─── 1) Transformar cada valor ───
const precos = [100, 250, 80];

console.log(precos.map((p) => p * 2));
console.log(precos.map((p) => `R$ ${p.toFixed(2)}`));
console.log('Original intacto:', precos);

// ─── 2) Extrair uma propriedade ───
const produtos = [
  { id: 1, nome: 'Teclado', preco: 249.9 },
  { id: 2, nome: 'Mouse', preco: 89.5 },
];

console.log(produtos.map((p) => p.nome));
console.log(produtos.map((p) => p.id));

// ─── 3) Calcular campo novo sem mexer no original ───
const carrinho = [{ nome: 'Teclado', preco: 100 }];

const comDesconto = carrinho.map((item) => ({ ...item, preco: item.preco * 0.9 }));

console.log(comDesconto);
console.log('Original:', carrinho);

// ═══ NA PRÁTICA ═══

// ─── 4) Adaptar o formato da API para o que a tela precisa ───
const daApi = [{ user_id: 7, full_name: 'ana paula', created_at: '2026-01-15' }];

const paraTela = daApi.map((u) => ({
  id: u.user_id,
  nome: u.full_name.toUpperCase(),
  link: `/usuario/${u.user_id}`,
}));

console.log(paraTela);

// ─── 5) Normalizar dados inconsistentes ───
const bagunca = [
  { nome: '  ana  ', idade: '30' },
  { nome: 'BRUNO', idade: null },
];

console.log(bagunca.map((p) => ({
  nome: p.nome.trim().toLowerCase(),
  idade: Number(p.idade) || 0,
})));

// ─── 6) flatMap: quando um item vira zero, um ou vários ───
const pedidos = [
  { id: 1, itens: ['Teclado', 'Mouse'] },
  { id: 2, itens: [] },
  { id: 3, itens: ['Livro'] },
];

console.log('map:     ', pedidos.map((p) => p.itens));       // array de arrays
console.log('flatMap: ', pedidos.flatMap((p) => p.itens));   // já vem achatado

// ─── 7) Virar índice para busca instantânea ───
const catalogo = [{ id: 1, nome: 'Teclado' }, { id: 2, nome: 'Mouse' }];

const porId = Object.fromEntries(catalogo.map((p) => [p.id, p.nome]));

console.log(porId);
console.log('Produto 2 é o', porId[2]);   // sem percorrer a lista de novo

// ═══ PEGADINHAS ═══

// ─── 8) Chave `{` sem `return` devolve undefined ───
const nomes = [{ nome: 'Ana' }, { nome: 'Bruno' }];

console.log(nomes.map((p) => { p.nome; }));   // [undefined, undefined]: abriu corpo e não devolveu
console.log(nomes.map((p) => p.nome));        // certo

console.log([1, 2].map((n) => ({ valor: n })));   // objeto na arrow curta pede ( { } )
console.log('Sem os parênteses o JS acha que `{` abre o corpo da função.');

// ─── Resumo ───
// 1. `map` sempre devolve array do mesmo tamanho — um item entra, um item sai.
// 2. Para não alterar o original, devolva objeto novo com spread: `{ ...item, campo: novo }`.
// 3. Não usa o retorno? Não é `map`, é `forEach`.
// 4. Um item vira vários (ou nenhum)? `flatMap`.
// 5. Arrow curta devolvendo objeto precisa de parênteses: `(p) => ({ ... })`.
