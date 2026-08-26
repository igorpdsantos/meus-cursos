/**
 * split e join — texto vira lista, lista vira texto
 * Sessão 7 · Rodar: node src/01-fundamentos/04-split-e-join.js
 *
 * O QUE É: `split` quebra uma string em array por um separador; `join` cola o array de volta.
 * QUANDO USAR: campo de tags, linha de CSV, ler log linha a linha, montar texto para o usuário.
 * QUANDO NÃO USAR: para formato com regra própria (JSON, HTML, CSV com vírgula dentro de aspas).
 *                  Aí use o parser da linguagem, não o split.
 */

// ═══ ESSENCIAL ═══

// ─── 1) split: texto → array ───
const tags = 'promocao,verao,camiseta';

console.log(tags.split(','));                 // separa pela vírgula
console.log('Ana Paula Silva'.split(' '));    // separa pelo espaço
console.log('ABC'.split(''));                 // string vazia = letra por letra
console.log('sem separador'.split('|'));      // não achou: devolve a string inteira em 1 item

// ─── 2) join: array → texto ───
const compras = ['arroz', 'feijão', 'café'];

console.log(compras.join());                  // sem argumento, o padrão é vírgula
console.log(compras.join(', '));
console.log(compras.join(' · '));
console.log(compras.join(''));                // cola sem nada no meio

// ─── 3) Ida e volta: quebrar, mexer, remontar ───
const frase = 'js é a linguagem da web';

const titulo = frase
  .split(' ')                                 // quebra em palavras
  .map((p) => p[0].toUpperCase() + p.slice(1))
  .join(' ');                                 // remonta

console.log(titulo);

// ═══ NA PRÁTICA ═══

// ─── 4) Campo de tags digitado pelo usuário ───
const digitado = ' Promoção , verao,, CAMISETA , verao ';

const limpas = [...new Set(
  digitado
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean),                         // tira os vazios do ",," e das pontas
)];

console.log(limpas);
console.log('Para salvar no banco:', limpas.join(','));

// ─── 5) Ler uma linha de CSV ───
const cabecalho = 'nome,email,plano';
const linha = 'Ana,ana@empresa.com,premium';

const colunas = cabecalho.split(',');
const valores = linha.split(',');
const cliente = Object.fromEntries(colunas.map((c, i) => [c, valores[i]]));

console.log(cliente);

// ─── 6) Lista legível: "Ana, Bruno e Carla" ───
const convidados = ['Ana', 'Bruno', 'Carla'];

const ultimo = convidados[convidados.length - 1];
const resto = convidados.slice(0, -1);

console.log(resto.length ? `${resto.join(', ')} e ${ultimo}` : ultimo);
console.log('Nativo:', new Intl.ListFormat('pt-BR').format(convidados));

// ═══ PEGADINHAS ═══

// ─── 7) Espaço a mais vira item vazio ───
const bagunca = 'a,,b, c';

console.log(bagunca.split(','));                          // tem '' e ' c'
console.log(bagunca.split(',').map((s) => s.trim()).filter(Boolean));   // sempre limpe depois

// ─── 8) join engole null e undefined ───
const notas = ['ok', null, undefined, 'fim'];

console.log(`[${notas.join(',')}]`);          // viram string vazia, não some o item
console.log(`[${[].join(',')}]`);             // array vazio devolve string vazia

// ─── Resumo ───
// 1. `split(sep)` quebra texto em array; `join(sep)` cola array em texto.
// 2. `split('')` separa letra a letra; `join()` sem argumento usa vírgula.
// 3. O combo do dia a dia é split → map/filter → join.
// 4. Entrada de usuário sempre pede `.map(trim)` e `.filter(Boolean)` depois do split.
// 5. `null`/`undefined` viram string vazia no `join` — trate antes se importar.
