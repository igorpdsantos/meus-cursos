/**
 * IIFE — função que se executa sozinha
 * Sessão 4 · Rodar: node src/07-extras/01-iife.js
 *
 * O QUE É: função que se define e se executa na mesma hora: `(function(){ ... })()`.
 * QUANDO USAR: hoje, quase só para rodar um `await` no topo de um script solto.
 * QUANDO NÃO USAR: em projeto com módulos (`import/export`), cada arquivo JÁ é um escopo
 *                  isolado. Está aqui para você reconhecer quando encontrar em código antigo.
 */

// ═══ ESSENCIAL ═══

// ─── 1) A forma básica ───
(function () {
  const senhaTemporaria = 'abc123';    // não existe fora daqui
  console.log('Rodou na hora, e a senha morreu junto:', senhaTemporaria.length, 'chars');
})();

(() => {
  console.log('Mesma coisa, com arrow');
})();

// ─── 2) Por que os parênteses de fora existem ───
// function () {}();     ← SyntaxError: o JS lê como DECLARAÇÃO de função
// (function () {})();   ← certo: os parênteses transformam em EXPRESSÃO
console.log('Os parênteses de fora fazem o JS ler "expressão" em vez de "declaração".');

// ─── 3) O uso que ainda vale hoje: await em script solto ───
(async () => {
  const dados = await new Promise((r) => setTimeout(() => r('dados carregados'), 20));
  console.log('IIFE async:', dados);
})();

// ═══ NA PRÁTICA ═══

// ─── 4) O padrão módulo, de antes do import/export ───
const Logger = (() => {
  const historico = [];                // privado

  return {
    registrar: (msg) => { historico.push(msg); },
    ultimos: () => [...historico],     // devolve CÓPIA, para ninguém alterar o original
  };
})();

Logger.registrar('app iniciou');
Logger.registrar('falha no pagamento');

console.log(Logger.ultimos());
console.log('Alcança o histórico direto?', Logger.historico);
// Hoje isto seria um arquivo com `export`, ou uma factory function — mais legível.

// ─── 5) Calcular um valor que precisa de várias linhas ───
const configuracao = (() => {
  const ambiente = 'producao';
  const base = { retries: 3 };

  return ambiente === 'producao'
    ? { ...base, url: 'https://api.loja.com', debug: false }
    : { ...base, url: 'http://localhost:3000', debug: true };
})();

console.log(configuracao);

// ─── Resumo ───
// 1. `(() => { ... })()` define e roda na hora, sem deixar nome no escopo de fora.
// 2. Os parênteses externos são obrigatórios: sem eles é erro de sintaxe.
// 3. O uso que sobrevive é `(async () => { await ... })()` em script sem módulo.
// 4. Você vai encontrar o "padrão módulo" com IIFE em código legado — agora reconhece.
// 5. Em código novo, use `import/export` ou uma factory function.
