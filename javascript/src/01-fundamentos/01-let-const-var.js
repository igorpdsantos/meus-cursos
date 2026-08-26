/**
 * let, const e var
 * Sessão 1 · Rodar: node src/01-fundamentos/01-let-const-var.js
 *
 * O QUE É: as três formas de declarar variável em JS.
 * QUANDO USAR: `const` por padrão. `let` só quando o valor vai ser reatribuído.
 * QUANDO NÃO USAR: `var` — nunca em código novo. Ignora escopo de bloco e gera bug silencioso.
 */

// ═══ ESSENCIAL ═══

// ─── 1) const é o padrão; let só quando o valor muda ───
const loja = 'Mercado Central';   // nunca vai ser outro
let itens = 0;                    // vai mudar a cada clique

itens++;
itens++;
console.log(`${loja}: ${itens} itens`);

// ─── 2) const trava a variável, não o conteúdo ───
const carrinho = [];
carrinho.push('Teclado');         // permitido: o array continua sendo o mesmo
console.log(carrinho);

// carrinho = [];                 ← TypeError: Assignment to constant variable

// ─── 3) let e const só existem dentro do bloco ───
if (true) {
  const frete = 0;
  console.log('Dentro do if:', frete);
}
// console.log(frete);            ← ReferenceError: frete não existe aqui fora
console.log('Fora do if a variável frete não existe.');

// ═══ NA PRÁTICA ═══

// ─── 4) Congelar uma config para ninguém trocar por acidente ───
const CONFIG = Object.freeze({ moeda: 'BRL', tentativas: 3 });

CONFIG.tentativas = 99;           // ignorado em silêncio, sem erro
console.log(CONFIG.tentativas);

// ═══ PEGADINHAS ═══

// ─── 5) var vaza do bloco ───
for (var i = 0; i < 3; i++) { /* ... */ }
console.log('var i depois do loop:', i);   // 3 — escapou

for (let j = 0; j < 3; j++) { /* ... */ }
// console.log(j);                ← ReferenceError: let morre junto com o loop, que é o certo
console.log('let j não existe aqui — por isso var saiu de uso.');

// ─── Resumo ───
// 1. Escreva `const` sempre. Troque para `let` só quando precisar reatribuir.
// 2. `const` impede trocar a variável, não impede mudar o array/objeto de dentro.
// 3. Para congelar o conteúdo também, use `Object.freeze`.
// 4. `let`/`const` vivem entre `{ }`; `var` vaza — não use.
