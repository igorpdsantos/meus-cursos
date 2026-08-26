/**
 * Repetir com for: for...of, for clássico e for...in
 * Sessão 3 · Rodar: node src/03-controle-de-fluxo/01-for.js
 *
 * O QUE É: as três formas de repetir quando você sabe quantas voltas vai dar.
 * QUANDO USAR: `for...of` no dia a dia. `for` clássico quando o índice importa.
 *              `for...in` só para chaves de OBJETO.
 * QUANDO NÃO USAR: `for...in` em array — a ordem não é garantida e o índice vem como texto.
 */

// ═══ ESSENCIAL ═══

// ─── 1) for...of: quando você só quer os valores ───
const produtos = ['Teclado', 'Mouse', 'Monitor'];

for (const produto of produtos) {
  console.log('·', produto);
}

// ─── 2) for clássico: quando o índice manda ───
const notas = [7, 9, 6];

for (let i = 0; i < notas.length; i++) {
  console.log(`${i + 1}ª nota: ${notas[i]}`);
}

for (let i = notas.length - 1; i >= 0; i--) process.stdout.write(notas[i] + ' ');
console.log('← de trás para frente, só o for clássico faz direto');

// ─── 3) Precisa do índice E do valor: entries() ───
const cores = ['azul', 'verde'];

for (const [i, cor] of cores.entries()) {
  console.log(i, cor);
}

// ═══ NA PRÁTICA ═══

// ─── 4) for...in: as chaves de um objeto ───
const preferencias = { tema: 'escuro', idioma: 'pt-BR' };

for (const chave in preferencias) {
  console.log(`${chave} = ${preferencias[chave]}`);
}

// ─── 5) Somar e separar numa passada ───
const estoque = [
  { nome: 'Teclado', preco: 249.9, qtd: 3 },
  { nome: 'Mouse', preco: 89.5, qtd: 0 },
];

let valorParado = 0;
const repor = [];

for (const item of estoque) {
  valorParado += item.preco * item.qtd;
  if (item.qtd === 0) repor.push(item.nome);
}

console.log('Valor parado: R$', valorParado.toFixed(2));
console.log('Repor:', repor);

// ─── 6) Loop dentro de loop: grade de variações ───
const tamanhos = ['P', 'M'];
const modelos = ['preto', 'branco'];
const variacoes = [];

for (const modelo of modelos) {
  for (const tam of tamanhos) variacoes.push(`${modelo}-${tam}`);
}

console.log(variacoes);

// ═══ PEGADINHAS ═══

// ─── 7) for...in num array devolve TEXTO, não número ───
const valores = [10, 20, 30];

for (const i in valores) process.stdout.write(typeof i + ' ');
console.log('← for...in');

for (const [i] of valores.entries()) process.stdout.write(typeof i + ' ');
console.log('← entries()');

// ─── Resumo ───
// 1. Padrão do dia a dia: `for...of`. Só troque quando faltar alguma coisa.
// 2. Precisa do índice: `array.entries()` no for...of, ou o for clássico.
// 3. `for` clássico é o único que anda de trás para frente ou pula de N em N.
// 4. `for...in` é para objeto. Em array ele entrega o índice como STRING.
// 5. Para acumular total, declare a variável fora do loop e some dentro.
