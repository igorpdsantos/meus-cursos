/**
 * Repetir com while: while, do...while, break e continue
 * Sessão 3 · Rodar: node src/03-controle-de-fluxo/02-while.js
 *
 * O QUE É: repetição por CONDIÇÃO, quando você não sabe quantas voltas vão acontecer.
 * QUANDO USAR: paginação de API, tentar de novo até dar certo, consumir uma fila.
 * QUANDO NÃO USAR: quando a quantidade de voltas já é conhecida — aí é `for`/`for...of`.
 */

// ═══ ESSENCIAL ═══

// ─── 1) while: testa antes de entrar ───
let saldo = 1000;
let meses = 0;

while (saldo >= 300) {
  saldo -= 300;
  meses++;
}

console.log(`Durou ${meses} meses, sobrou R$ ${saldo}`);

// ─── 2) do...while: roda pelo menos uma vez ───
let tentativas = 0;

do {
  tentativas++;                    // acontece mesmo que a condição já seja falsa
} while (tentativas < 1);

console.log('Rodou', tentativas, 'vez — o do...while sempre executa a primeira.');

// ─── 3) break sai do loop, continue pula a volta ───
const pedidos = [
  { id: 1, status: 'pago' },
  { id: 2, status: 'cancelado' },
  { id: 3, status: 'pago' },
  { id: 4, status: 'fraude' },
];

for (const pedido of pedidos) {
  if (pedido.status === 'cancelado') continue;                         // ignora e segue
  if (pedido.status === 'fraude') { console.log('Fraude! parando'); break; }
  console.log('Processado:', pedido.id);
}

// ═══ NA PRÁTICA ═══

// ─── 4) Paginação: não dá para saber quantas páginas existem ───
const banco = ['a', 'b', 'c', 'd', 'e'];
const buscarPagina = (n) => banco.slice((n - 1) * 2, n * 2);   // devolve [] quando acaba

let pagina = 1;
let coletados = [];
let lote = buscarPagina(pagina);

while (lote.length > 0) {
  coletados = [...coletados, ...lote];
  pagina++;
  lote = buscarPagina(pagina);
}

console.log(`${coletados.length} itens em ${pagina - 1} páginas`);

// ─── 5) Tentar de novo, com limite ───
const chamarApi = (n) => { if (n < 3) throw new Error('timeout'); return 'dados ok'; };

let vez = 0;
let resultado = null;

while (vez < 5 && resultado === null) {
  vez++;
  try {
    resultado = chamarApi(vez);
  } catch (erro) {
    console.log(`Tentativa ${vez} falhou (${erro.message})`);
  }
}

console.log(resultado ?? 'Desisti');

// ─── 6) Fila que cresce durante o processo ───
const links = { '/home': ['/sobre', '/blog'], '/sobre': [], '/blog': ['/home'] };
const paraVisitar = ['/home'];
const visitados = [];

while (paraVisitar.length > 0) {          // a fila muda de tamanho a cada volta
  const pagina = paraVisitar.shift();
  if (visitados.includes(pagina)) continue;
  visitados.push(pagina);
  paraVisitar.push(...links[pagina]);
}

console.log('Visitados:', visitados.join(' → '));

// ═══ PEGADINHAS ═══

// ─── 7) Esquecer de mexer na condição = loop infinito ───
let n = 0;

while (n < 3) {
  n++;     // ← sem esta linha o programa trava para sempre
}

console.log('Saiu com n =', n);

// ─── Resumo ───
// 1. Sabe quantas voltas? `for`. Não sabe? `while`.
// 2. `do...while` garante a primeira execução — bom para perguntar/validar.
// 3. `continue` pula a volta; `break` abandona o loop.
// 4. Todo `while` precisa de uma linha que mexe na condição, senão trava.
// 5. Retry: combine `while` com contador máximo — sempre tenha uma saída.
