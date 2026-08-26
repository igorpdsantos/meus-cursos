/**
 * Copiar e cortar arrays: slice, splice e spread
 * Sessão 5 · Rodar: node src/02-arrays-e-objetos/02-copiar-e-cortar.js
 *
 * O QUE É: `slice` COPIA um trecho. `splice` CORTA/INSERE no original. `[...a]` copia tudo.
 * QUANDO USAR: slice para paginar e copiar; splice para mexer no meio da lista.
 * QUANDO NÃO USAR: splice em array que outra parte do sistema também está lendo — ele
 *                  altera o original e o efeito colateral surpreende.
 */

// ═══ ESSENCIAL ═══

// ─── 1) slice: copia um pedaço e não toca no original ───
const meses = ['jan', 'fev', 'mar', 'abr', 'mai'];

console.log(meses.slice(0, 3));   // do 0 até ANTES do 3
console.log(meses.slice(-2));     // os 2 últimos
console.log(meses.slice());       // cópia inteira
console.log('Original ainda tem', meses.length);

// ─── 2) splice: altera o original e devolve o que saiu ───
const lista = ['a', 'b', 'c', 'd'];

console.log('Removidos:', lista.splice(1, 2));   // do índice 1, remove 2
console.log('Sobrou:   ', lista);

lista.splice(1, 0, 'X');                          // remove 0, insere no meio
console.log('Depois de inserir:', lista);

// ─── 3) Juntar arrays sem alterar nada ───
const camisas = ['P', 'M'];
const calcas = ['38', '40'];

console.log([...camisas, ...calcas]);
console.log(camisas.concat(calcas));   // mesma coisa, sintaxe antiga
console.log('Originais intactos:', camisas, calcas);

// ═══ NA PRÁTICA ═══

// ─── 4) Paginação ───
const pedidos = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];
const porPagina = 3;
const pagina = 2;

const inicio = (pagina - 1) * porPagina;

console.log('Página 2:', pedidos.slice(inicio, inicio + porPagina));
console.log('Total de páginas:', Math.ceil(pedidos.length / porPagina));

// ─── 5) Mover item de posição (drag and drop) ───
const colunas = ['Nome', 'E-mail', 'Telefone', 'Status'];
const copia = [...colunas];

const [movido] = copia.splice(3, 1);   // tira o "Status"
copia.splice(0, 0, movido);            // põe no começo

console.log(copia);
console.log('Original:', colunas);

// ─── 6) Histórico com tamanho máximo ───
let historico = ['abriu', 'editou', 'salvou'];

historico = [...historico, 'fechou'].slice(-3);   // slice negativo mantém os últimos

console.log(historico);

// ═══ PEGADINHAS ═══

// ─── 7) A cópia é RASA: objetos de dentro continuam compartilhados ───
const originais = [{ nome: 'Ana' }];
const rasa = [...originais];

rasa.push({ nome: 'Bruno' });   // ok: a lista de fora é nova
rasa[0].nome = 'ALTERADA';      // vaza: o objeto de dentro é o MESMO

console.log('Original:', originais);

const profunda = structuredClone(originais);   // cópia de verdade, em todos os níveis
profunda[0].nome = 'outra';
console.log('Depois do structuredClone:', originais);

// ─── Resumo ───
// 1. `slice` copia e devolve; `splice` corta no original. Nomes parecidos, efeitos opostos.
// 2. `slice(inicio, fim)` não inclui o `fim`. Índice negativo conta do final.
// 3. `[...a, ...b]` é a forma padrão de juntar sem efeito colateral.
// 4. `slice` + `Math.ceil` resolvem paginação inteira.
// 5. Spread copia só o primeiro nível. Para aninhado, use `structuredClone`.
