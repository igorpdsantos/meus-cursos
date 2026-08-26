/**
 * setTimeout e setInterval
 * Sessão 3 · Rodar: node src/06-assincrono/01-settimeout-setinterval.js
 *
 * O QUE É: agendar código para rodar depois (`setTimeout`) ou repetir a cada X ms (`setInterval`).
 * QUANDO USAR: debounce de busca, aviso que some sozinho, contador, polling, retry com espera.
 * QUANDO NÃO USAR: para "esperar" outro código terminar. Isso é trabalho de Promise/async.
 */

// ═══ ESSENCIAL ═══

// ─── 1) setTimeout: roda uma vez, depois do tempo ───
console.log('1. agora');
setTimeout(() => console.log('3. depois de 100ms'), 100);
console.log('2. ainda agora');     // o JS não fica parado esperando

// ─── 2) Cancelar antes de disparar ───
const id = setTimeout(() => console.log('não vai aparecer'), 50);
clearTimeout(id);
console.log('Timeout cancelado antes de disparar.');

// ─── 3) setInterval: repete até você mandar parar ───
let restante = 3;

const contador = setInterval(() => {
  console.log('Contagem:', restante);
  restante--;
  if (restante === 0) {
    clearInterval(contador);       // sem isto, repete para sempre
    console.log('Fim da contagem');
  }
}, 30);

// ═══ NA PRÁTICA ═══

// ─── 4) Debounce: só busca quando o usuário para de digitar ───
function criarDebounce(fn, espera) {
  let id;
  return (...args) => {
    clearTimeout(id);              // cada tecla cancela o agendamento anterior
    id = setTimeout(() => fn(...args), espera);
  };
}

const buscar = criarDebounce((termo) => console.log('BUSCOU:', termo), 60);

buscar('t');
buscar('te');
buscar('teclado');                 // só a última sobrevive

// ─── 5) Throttle: no máximo uma execução por intervalo ───
function criarThrottle(fn, intervalo) {
  let liberado = true;
  return (...args) => {
    if (!liberado) return;         // ignora enquanto estiver no intervalo
    liberado = false;
    fn(...args);
    setTimeout(() => { liberado = true; }, intervalo);
  };
}

const aoRolar = criarThrottle((y) => console.log('SCROLL em', y), 50);

aoRolar(0);
aoRolar(10);
aoRolar(20);                       // só o primeiro passa

// ─── 6) Esperar de verdade: setTimeout dentro de Promise ───
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

(async () => {
  console.log('Tentativa 1 falhou, esperando...');
  await esperar(40);
  console.log('Sucesso na tentativa 2');
})();

// ═══ PEGADINHAS ═══

// ─── 7) O tempo é o MÍNIMO, não o exato ───
setTimeout(() => console.log('Agendado com 0ms — ainda assim roda por último'), 0);
console.log('Este console.log vem antes, mesmo com 0ms lá em cima.');

// ─── Resumo ───
// 1. `setTimeout` agenda uma vez; `setInterval` repete até `clearInterval`.
// 2. Todo `setInterval` precisa de uma condição de saída, senão roda para sempre.
// 3. Debounce = espera parar de acontecer. Throttle = no máximo 1 por intervalo.
// 4. `new Promise(r => setTimeout(r, ms))` é o jeito de dar `await` numa espera.
// 5. O tempo informado é o mínimo: o JS só executa quando a fila atual esvazia.
