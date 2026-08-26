/**
 * forEach
 * Sessão 5 · Rodar: node src/05-transformar-listas/01-foreach.js
 *
 * O QUE É: percorre o array executando algo em cada item. Não devolve nada (`undefined`).
 * QUANDO USAR: EFEITO COLATERAL — imprimir, salvar no banco, disparar e-mail, atualizar a tela.
 * QUANDO NÃO USAR: quando você quer um novo array (`map`), um total (`reduce`) ou um
 *                  subconjunto (`filter`). E quando precisa parar no meio: não tem break.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Os três argumentos: item, índice, array ───
const pedidos = ['#1042', '#1043', '#1044'];

pedidos.forEach((pedido, i) => {
  console.log(`${i + 1}. ${pedido}`);
});

// ─── 2) Para que ele serve: FAZER algo, não produzir algo ───
const pendentes = [
  { cliente: 'Ana', status: 'pago' },
  { cliente: 'Bruno', status: 'pendente' },
];

pendentes
  .filter((p) => p.status === 'pendente')
  .forEach((p) => console.log(`Cobrança enviada para ${p.cliente}`));

// ─── 3) forEach não devolve nada ───
const valores = [10, 20];

console.log('forEach:', valores.forEach((v) => v * 2));   // undefined
console.log('map:    ', valores.map((v) => v * 2));       // [20, 40]

// ═══ NA PRÁTICA ═══

// ─── 4) Percorrer as chaves de um objeto ───
const estoque = { teclado: 3, mouse: 0, monitor: 7 };

Object.entries(estoque).forEach(([produto, qtd]) => {
  if (qtd === 0) console.log('Repor:', produto);
});

// ─── 5) Alimentar variáveis de fora ───
const vendas = [
  { cliente: 'Ana', total: 340, pago: true },
  { cliente: 'Bruno', total: 120, pago: false },
  { cliente: 'Carla', total: 890, pago: true },
];

let faturamento = 0;
const clientes = [];

vendas.forEach((v) => {
  if (!v.pago) return;          // `return` pula só ESTE item (é o continue do forEach)
  faturamento += v.total;
  clientes.push(v.cliente);
});

console.log(`R$ ${faturamento} de ${clientes.join(' e ')}`);

// ═══ PEGADINHAS ═══

// ─── 6) Não existe break nem continue ───
const ids = [1, 2, 3];

ids.forEach((id) => {
  if (id === 2) return;         // pula. Mas NÃO tem como parar o loop aqui.
  console.log('forEach visitou', id);
});

for (const id of ids) {         // precisa parar no meio? use for...of
  if (id === 2) break;
  console.log('for...of parou antes do 2, no', id);
}

// ─── 7) forEach ignora async: ele não espera ───
const salvar = (id) => new Promise((r) => setTimeout(() => r(id), 10));

[1, 2].forEach(async (id) => { await salvar(id); });   // o await é engolido
console.log('Chegou aqui ANTES de salvar qualquer coisa.');

(async () => {
  for (const id of [1, 2]) await salvar(id);           // for...of espera de verdade
  console.log('Agora sim: tudo salvo, um de cada vez.');

  console.log('Em paralelo:', await Promise.all([1, 2].map(salvar)));
})();

// ─── Resumo ───
// 1. `forEach` é para FAZER algo com cada item, não para produzir um resultado.
// 2. Ele sempre devolve `undefined` — não dá para encadear depois dele.
// 3. `return` dentro dele pula um item; não existe `break`.
// 4. Quer parar no meio? `for...of`. Quer um valor de volta? `map`/`filter`/`reduce`.
// 5. Com `async`, `forEach` não espera. Use `for...of` + `await`, ou `Promise.all(map)`.
