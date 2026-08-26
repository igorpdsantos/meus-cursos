/**
 * Encadeando filter, map e reduce
 * Sessão 5 · Rodar: node src/05-transformar-listas/05-encadeando.js
 *
 * O QUE É: usar os três na ordem natural do raciocínio — escolher, transformar, resumir.
 * QUANDO USAR: relatório, dashboard, total de carrinho, ranking.
 * QUANDO NÃO USAR: lista com centenas de milhares de itens (cada método faz uma passada),
 *                  ou quando a corrente passa de ~4 elos e vira difícil de ler.
 */

// ═══ ESSENCIAL ═══

// ─── 1) A ordem certa: filtre primeiro, sempre ───
const vendas = [
  { valor: 249.9, cancelada: false },
  { valor: 89.5, cancelada: true },
  { valor: 1199, cancelada: false },
];

const faturamento = vendas
  .filter((v) => !v.cancelada)     // 1º joga fora o que não conta
  .map((v) => v.valor)             // 2º fica só com o número
  .reduce((s, n) => s + n, 0);     // 3º resume em um valor

console.log('Faturamento: R$', faturamento.toFixed(2));
// Filtrar depois de mapear obrigaria o map a processar itens que iam ser descartados.

// ─── 2) Leia a corrente como uma frase ───
const produtos = [
  { nome: 'Teclado', preco: 249.9 },
  { nome: 'Mouse', preco: 89.5 },
  { nome: 'Monitor', preco: 1199 },
];

const caros = produtos
  .filter((p) => p.preco > 200)    // "dos produtos acima de 200,"
  .map((p) => p.nome);             // "pegue o nome"

console.log(caros);

// ─── 3) Dê nome aos passos quando a corrente crescer ───
const pedidos = [
  { mes: 1, valor: 100, pago: true },
  { mes: 2, valor: 300, pago: true },
  { mes: 2, valor: 50, pago: false },
];

const pagos = pedidos.filter((p) => p.pago);
const doMes2 = pagos.filter((p) => p.mes === 2);
const total = doMes2.reduce((s, p) => s + p.valor, 0);

console.log(`Mês 2: ${doMes2.length} pedidos, R$ ${total.toFixed(2)}`);
// Três linhas com nome batem uma corrente de seis elos.

// ═══ NA PRÁTICA ═══

// ─── 4) Ranking de vendedores ───
const comissoes = [
  { vendedor: 'Ana', valor: 250, cancelada: false },
  { vendedor: 'Bruno', valor: 90, cancelada: true },
  { vendedor: 'Ana', valor: 1200, cancelada: false },
  { vendedor: 'Carla', valor: 250, cancelada: false },
];

const totais = comissoes
  .filter((c) => !c.cancelada)
  .reduce((acc, c) => ({ ...acc, [c.vendedor]: (acc[c.vendedor] ?? 0) + c.valor }), {});

console.log(
  Object.entries(totais)
    .sort(([, a], [, b]) => b - a)
    .map(([nome, valor], i) => `${i + 1}º ${nome.padEnd(6)} R$ ${valor.toFixed(2)}`)
    .join('\n'),
);

// ─── 5) Total do carrinho com desconto por faixa ───
const carrinho = [
  { preco: 249.9, qtd: 1 },
  { preco: 89.5, qtd: 2 },
];

const subtotal = carrinho
  .map((i) => i.preco * i.qtd)
  .reduce((s, v) => s + v, 0);

const [, percentual] = [[500, 0.15], [300, 0.1], [0, 0]].find(([min]) => subtotal >= min);

console.log(`Subtotal R$ ${subtotal.toFixed(2)} − ${percentual * 100}% = R$ ${(subtotal * (1 - percentual)).toFixed(2)}`);

// ─── 6) Top N mais vendidos ───
const itens = ['Teclado', 'Mouse', 'Teclado', 'Monitor', 'Teclado', 'Mouse'];

const top2 = Object.entries(itens.reduce((acc, i) => ({ ...acc, [i]: (acc[i] ?? 0) + 1 }), {}))
  .sort(([, a], [, b]) => b - a)
  .slice(0, 2);

console.log('Mais vendidos:', top2);

// ═══ PEGADINHAS ═══

// ─── 7) Cada elo é uma passada no array ───
const lista = [1, 2, 3, 4];

let visitasFilter = 0;
let visitasMap = 0;

lista
  .filter((n) => { visitasFilter++; return n % 2 === 0; })
  .map((n) => { visitasMap++; return n * 10; });

console.log(`filter visitou ${visitasFilter}, map visitou ${visitasMap} — 2 passadas`);

let visitasLoop = 0;
const saida = [];
for (const n of lista) { visitasLoop++; if (n % 2 === 0) saida.push(n * 10); }

console.log(`for...of visitou ${visitasLoop} — 1 passada, mesmo resultado:`, saida);
// Com 4 itens não muda nada. Com 500 mil, muda. Só otimize quando medir que dói.

// ─── Resumo ───
// 1. A ordem natural é filter → map → reduce: escolher, transformar, resumir.
// 2. Filtre primeiro: o que foi descartado não precisa ser transformado.
// 3. Leia a corrente como uma frase. Se não der para ler, quebre em variáveis com nome.
// 4. `reduce` + `Object.entries` + `sort` é a receita de qualquer ranking.
// 5. Cada elo faz uma passada. Só vire `for...of` quando a lista for enorme de verdade.
