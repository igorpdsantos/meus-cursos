/**
 * Arrays: criar, buscar e ordenar
 * Sessão 2 · Rodar: node src/02-arrays-e-objetos/01-arrays.js
 *
 * O QUE É: lista ordenada de valores, acessada por índice começando em 0.
 * QUANDO USAR: qualquer coleção — itens do carrinho, usuários, linhas de relatório.
 * QUANDO NÃO USAR: quando você busca sempre pela mesma chave. Aí um objeto ou Map é mais direto.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Acessar pelo índice ───
const tarefas = ['Estudar JS', 'Treinar', 'Ler 10 páginas'];

console.log('Primeira:', tarefas[0]);
console.log('Última:  ', tarefas.at(-1));   // at(-1) é mais claro que [length - 1]
console.log('Quantas: ', tarefas.length);

// ─── 2) Adicionar e remover nas pontas ───
const fila = ['Ana', 'Bruno'];

fila.push('Carla');       // entra no fim
fila.unshift('Zeca');     // entra no começo
console.log(fila);

console.log('Saiu do começo:', fila.shift());
console.log('Saiu do fim:   ', fila.pop());
console.log('Restaram:', fila);

// ─── 3) Procurar dentro do array ───
const produtos = [
  { id: 1, nome: 'Teclado', preco: 249.9 },
  { id: 2, nome: 'Mouse', preco: 89.5 },
];

console.log('Achou o objeto:', produtos.find((p) => p.id === 2));
console.log('Em que posição:', produtos.findIndex((p) => p.id === 2));  // -1 se não achar
console.log('Algum > 200?   ', produtos.some((p) => p.preco > 200));    // pelo menos um
console.log('Todos > 50?    ', produtos.every((p) => p.preco > 50));    // todos
console.log('Tem "Mouse"?   ', ['Mouse', 'Teclado'].includes('Mouse')); // valor simples

// ═══ NA PRÁTICA ═══

// ─── 4) Ordenar sem estragar o original ───
const precos = [30, 10, 20];
const ordenados = [...precos].sort((a, b) => a - b);   // copie antes: sort altera!

console.log('Ordenado:', ordenados);
console.log('Original:', precos);

const nomes = ['Zeca', 'ana', 'Bruno'];
console.log([...nomes].sort((a, b) => a.localeCompare(b)));  // respeita acento e caixa

// ─── 5) Juntar, inverter e virar texto ───
const cores = ['azul', 'verde'];

console.log(cores.join(' · '));
console.log([...cores].reverse());       // reverse também altera o original
console.log([...cores, 'vermelho']);     // spread junta sem alterar nada

// ═══ PEGADINHAS ═══

// ─── 6) sort() sem função compara como TEXTO ───
console.log([10, 9, 100, 1].sort());                 // [ 1, 10, 100, 9 ] — errado
console.log([10, 9, 100, 1].sort((a, b) => a - b));  // [ 1, 9, 10, 100 ] — certo

// ─── 7) delete deixa buraco; use splice ───
const comDelete = ['a', 'b', 'c'];
delete comDelete[1];
console.log('delete:', comDelete, '| length ainda é', comDelete.length);

const comSplice = ['a', 'b', 'c'];
comSplice.splice(1, 1);
console.log('splice:', comSplice, '| length agora é', comSplice.length);

// ─── Resumo ───
// 1. `at(-1)` para o último; `length` para contar.
// 2. `push`/`pop` no fim, `unshift`/`shift` no começo.
// 3. Buscar: `includes` (valor), `find` (objeto), `findIndex` (posição), `some`/`every` (sim/não).
// 4. `sort` e `reverse` ALTERAM o original — copie com `[...array]` antes.
// 5. `sort` sem função ordena como texto: passe `(a, b) => a - b` para número.
// 6. Nunca use `delete` em array; ele deixa buraco. Use `splice`.
