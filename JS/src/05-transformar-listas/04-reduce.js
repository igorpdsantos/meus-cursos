/**
 * reduce — resumir a lista em um valor
 * Sessão 5 · Rodar: node src/05-transformar-listas/04-reduce.js
 *
 * O QUE É: percorre o array acumulando UM resultado. Esse resultado pode ser número,
 *          texto, objeto ou outro array.
 * QUANDO USAR: somar, contar, agrupar por categoria, montar índice — "muitos itens → um".
 *              É o jeito natural (e mais eficiente) de fechar a lista em UMA resposta,
 *              decidindo item a item o que entra na conta: uma passada, sem variável de fora.
 * QUANDO NÃO USAR: quando `filter`/`map`/`some` já resolvem. Se o callback passar de ~6
 *                  linhas, um `for...of` fica mais legível.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Somar: o caso mais comum ───
const valores = [10, 20, 30];

//                            (acumulado, item) => novo acumulado    inicial ↓
console.log(valores.reduce((soma, v) => soma + v, 0));

console.log('Array vazio:', [].reduce((s, v) => s + v, 0));
// Sem o valor inicial, reduce em array vazio lança TypeError. Sempre passe o inicial.

// ─── 2) Contar ocorrências ───
const niveis = ['erro', 'info', 'erro', 'aviso', 'erro'];

const contagem = niveis.reduce((acc, nivel) => {
  acc[nivel] = (acc[nivel] ?? 0) + 1;
  return acc;                            // NUNCA esqueça de devolver o acumulador
}, {});

console.log(contagem);

// ─── 3) Agrupar por campo (group by) ───
const vendas = [
  { produto: 'Teclado', categoria: 'eletronicos' },
  { produto: 'Livro JS', categoria: 'livros' },
  { produto: 'Mouse', categoria: 'eletronicos' },
];

const porCategoria = vendas.reduce((grupos, v) => {
  grupos[v.categoria] ??= [];            // cria a lista na primeira vez que aparece
  grupos[v.categoria].push(v.produto);
  return grupos;
}, {});

console.log(porCategoria);
console.log('Object.groupBy faz o mesmo:', Object.keys(Object.groupBy(vendas, (v) => v.categoria)));

// ═══ NA PRÁTICA ═══

// ─── 4) Somar por chave e montar um ranking ───
const comissoes = [
  { vendedor: 'Ana', valor: 249.9 },
  { vendedor: 'Bruno', valor: 59.9 },
  { vendedor: 'Ana', valor: 1199 },
];

const porVendedor = comissoes.reduce((acc, c) => {
  acc[c.vendedor] = (acc[c.vendedor] ?? 0) + c.valor;
  return acc;
}, {});

console.log(porVendedor);

console.log(
  Object.entries(porVendedor)
    .sort(([, a], [, b]) => b - a)
    .map(([nome, total], i) => `${i + 1}º ${nome}: R$ ${total.toFixed(2)}`),
);

// ─── 5) Várias estatísticas numa passada só ───
const notas = [7.5, 9, 6, 10];

const stats = notas.reduce(
  (s, n) => ({
    qtd: s.qtd + 1,
    total: s.total + n,
    maior: Math.max(s.maior, n),
    menor: Math.min(s.menor, n),
  }),
  { qtd: 0, total: 0, maior: -Infinity, menor: Infinity },
);

console.log({ ...stats, media: +(stats.total / stats.qtd).toFixed(2) });

// ─── 6) Achar o item de maior valor (não só o número) ───
const pedidos = [
  { produto: 'Mouse', valor: 89.5 },
  { produto: 'Monitor', valor: 1199 },
];

const maior = pedidos.reduce((a, b) => (b.valor > a.valor ? b : a));

console.log('Maior venda:', maior);
// Math.max daria só o número; o reduce devolve o objeto inteiro.

// ─── 7) Resumir a lista: reduce em vez de forEach ───
const lancamentos = [
  { desc: 'Venda 1', valor: 249.9, aprovado: true },
  { desc: 'Venda 2', valor: 89.5, aprovado: false },
  { desc: 'Venda 3', valor: 1199, aprovado: true },
];

let totalForEach = 0;                            // precisa de uma variável fora do laço
lancamentos.forEach((l) => { if (l.aprovado) totalForEach += l.valor; });

const totalReduce = lancamentos.reduce((s, l) => (l.aprovado ? s + l.valor : s), 0);

console.log({ totalForEach, totalReduce });
// Mesmo resultado, mas o reduce fecha tudo dentro da expressão: nada vaza para fora,
// dá para usar direto em `const`, e o filtro do `if` acontece na mesma passada.

// ═══ PEGADINHAS ═══

// ─── 8) Esquecer de devolver o acumulador ───
const itens = [{ nome: 'a' }, { nome: 'b' }];

try {
  itens.reduce((acc, i) => { acc[i.nome] = true; }, {});   // sem return
} catch (erro) {
  console.log('Sem return:', erro.message.split('\n')[0]);
}

console.log('Na volta seguinte o acumulador virou undefined — daí o erro.');

// ─── Resumo ───
// 1. `reduce(callback, inicial)` — sempre passe o valor inicial.
// 2. O callback SEMPRE devolve o acumulador, senão a próxima volta recebe `undefined`.
// 3. O acumulador pode ser número, string, objeto ou array — não só total.
// 4. Agrupar, contar e indexar são os usos que mais aparecem no dia a dia.
// 5. Para "lista → um valor", prefira `reduce` a `forEach` com variável de fora: uma
//    passada só, decidindo na hora o que entra na conta, e o resultado já sai em `const`.
// 6. Callback grande demais? Troque por `for...of`: mesma lógica, mais legível.
