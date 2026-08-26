/**
 * Funções geradoras (function*)
 * Sessão 4 · Rodar: node src/07-extras/03-geradoras.js
 *
 * O QUE É: função que PAUSA no `yield`, devolve um valor e continua de onde parou.
 * QUANDO USAR: gerar valores sob demanda (id sequencial, sequência infinita), percorrer
 *              estrutura grande sem carregar tudo na memória, paginação preguiçosa.
 * QUANDO NÃO USAR: coleção pequena que já está na memória — array com `map`/`filter` é
 *                  mais claro e todo mundo entende de primeira.
 */

// ═══ ESSENCIAL ═══

// ─── 1) next() e o objeto { value, done } ───
function* etapas() {
  yield 'separar';
  yield 'embalar';
  yield 'enviar';
}

const g = etapas();

console.log(g.next());   // { value: 'separar', done: false }
console.log(g.next());
console.log(g.next());
console.log(g.next());   // { value: undefined, done: true }

// ─── 2) for...of consome tudo, sem next() manual ───
function* passos() {
  yield 'a';
  yield 'b';
}

for (const passo of passos()) console.log('→', passo);

console.log('Vira array com spread:', [...passos()]);

// ─── 3) Gerador de id sequencial ───
function* gerarId(prefixo) {
  let n = 1;
  while (true) yield `${prefixo}-${String(n++).padStart(4, '0')}`;
}

const proximo = gerarId('PED');

console.log(proximo.next().value, proximo.next().value, proximo.next().value);
// `while (true)` só não trava porque cada volta espera alguém pedir o próximo.

// ═══ NA PRÁTICA ═══

// ─── 4) Processar em lotes ───
function* emLotes(itens, tamanho) {
  for (let i = 0; i < itens.length; i += tamanho) yield itens.slice(i, i + tamanho);
}

for (const lote of emLotes(['a', 'b', 'c', 'd', 'e'], 2)) console.log('Enviando:', lote);

// ─── 5) Paginação preguiçosa: só busca quando pedem ───
function* paginas() {
  let n = 1;
  while (n <= 2) {
    console.log(`  (buscou a página ${n})`);
    yield [`item${n}a`, `item${n}b`];
    n++;
  }
}

for (const pagina of paginas()) console.log('Recebi:', pagina);

// ─── 6) Sequência infinita, parando quando quiser ───
function* naturais() {
  let n = 1;
  while (true) yield n++;
}

const pares = [];

for (const n of naturais()) {
  if (n % 2 === 0) pares.push(n);
  if (pares.length === 5) break;    // o break encerra o gerador
}

console.log('5 primeiros pares:', pares);

// ─── 7) yield*: delegar para outro gerador (percorrer árvore) ───
const pastas = { nome: 'raiz', filhos: [{ nome: 'src', filhos: [{ nome: 'app.js' }] }] };

function* percorrer(no) {
  yield no.nome;
  for (const filho of no.filhos ?? []) yield* percorrer(filho);   // yield* repassa tudo
}

console.log([...percorrer(pastas)]);

// ═══ PEGADINHAS ═══

// ─── 8) O gerador só serve uma vez ───
function* tres() { yield 1; yield 2; yield 3; }

const usado = tres();

console.log('1ª volta:', [...usado]);
console.log('2ª volta:', [...usado], '← esgotado; chame a função de novo para recomeçar');

// ─── Resumo ───
// 1. `function*` + `yield` = função que pausa e continua de onde parou.
// 2. `next()` devolve `{ value, done }`; `for...of` e `[...gen]` consomem tudo sozinhos.
// 3. `while (true)` dentro de gerador é seguro: só avança quando alguém pede.
// 4. Serve para id sequencial, lotes, paginação preguiçosa e percorrer árvore com `yield*`.
// 5. Cada gerador é de uso único: depois de esgotado, chame a função de novo.
