/**
 * Recursão
 * Sessão 4 · Rodar: node src/04-funcoes/06-recursao.js
 *
 * O QUE É: função que chama ela mesma até chegar num caso simples que sabe responder.
 * QUANDO USAR: dado em forma de árvore — menu com submenu, pastas, comentários com respostas.
 * QUANDO NÃO USAR: lista simples (use loop) ou profundidade muito grande — a pilha estoura.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Anatomia: caso base + passo que reduz o problema ───
function contarRegressiva(n) {
  if (n === 0) return 'fim';        // CASO BASE: sem ele, roda para sempre
  process.stdout.write(n + ' ');
  return contarRegressiva(n - 1);   // PASSO: chama com um problema menor
}

console.log(contarRegressiva(5));

// ─── 2) Percorrer uma estrutura com profundidade indefinida ───
const menu = [
  { nome: 'Início' },
  { nome: 'Produtos', filhos: [{ nome: 'Livros' }, { nome: 'Eletrônicos' }] },
];

function imprimir(itens, nivel = 0) {
  for (const item of itens) {
    console.log('  '.repeat(nivel) + '· ' + item.nome);
    if (item.filhos) imprimir(item.filhos, nivel + 1);   // mesma função, um nível abaixo
  }
}

imprimir(menu);

// ─── 3) Buscar lá no fundo e devolver subindo ───
const arvore = [
  { nome: 'Produtos', filhos: [{ nome: 'Eletrônicos', filhos: [{ nome: 'Monitores' }] }] },
];

function encontrar(itens, alvo) {
  for (const item of itens) {
    if (item.nome === alvo) return item;
    const achado = item.filhos && encontrar(item.filhos, alvo);
    if (achado) return achado;
  }
  return null;
}

console.log(encontrar(arvore, 'Monitores'));
console.log(encontrar(arvore, 'Inexistente'));

// ═══ NA PRÁTICA ═══

// ─── 4) Somar o tamanho de uma árvore de pastas ───
const disco = {
  tipo: 'pasta',
  filhos: [
    { tipo: 'arquivo', kb: 12 },
    { tipo: 'pasta', filhos: [{ tipo: 'arquivo', kb: 30 }, { tipo: 'arquivo', kb: 8 }] },
  ],
};

function tamanhoTotal(no) {
  if (no.tipo === 'arquivo') return no.kb;                      // caso base
  return no.filhos.reduce((s, f) => s + tamanhoTotal(f), 0);    // soma os filhos
}

console.log('Total:', tamanhoTotal(disco), 'kb');

// ─── 5) Achatar objeto aninhado (útil para formulário e CSV) ───
function achatar(obj, prefixo = '') {
  const saida = {};

  for (const [chave, valor] of Object.entries(obj)) {
    const caminho = prefixo ? `${prefixo}.${chave}` : chave;
    if (valor && typeof valor === 'object') Object.assign(saida, achatar(valor, caminho));
    else saida[caminho] = valor;
  }

  return saida;
}

console.log(achatar({ nome: 'Ana', endereco: { cidade: 'Recife', cep: { numero: '50000' } } }));

// ═══ PEGADINHAS ═══

// ─── 6) Sem caso base, a pilha estoura ───
function semFim(n) { return semFim(n + 1); }

try { semFim(0); }
catch (erro) { console.log('Estourou:', erro.message); }

// ─── 7) Recursão ingênua repete trabalho ───
let chamadas = 0;

function fib(n) {
  chamadas++;
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log('fib(20) =', fib(20), 'em', chamadas, 'chamadas — muita conta repetida');
// Com cache (ver o tópico de Closures) isso cai para 21 chamadas.

// ─── Resumo ───
// 1. Toda recursão precisa de caso base + passo que reduz o problema. Sem base, trava.
// 2. Use quando o dado tem profundidade desconhecida: menu, pastas, comentários.
// 3. Para percorrer e imprimir, passe o nível como parâmetro e use `repeat` no recuo.
// 4. Para somar/contar a árvore, combine recursão com `reduce`.
// 5. Lista simples? Use loop. Recursão só paga quando a estrutura é aninhada.
