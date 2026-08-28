/**
 * Módulos e namespaces
 * Sessão 8 · Rodar: node src/08-extras/04-modulos-e-namespaces.ts
 *
 * O QUE É: as duas formas de dividir código em TypeScript. `namespace` é a antiga, de quando
 *          o JavaScript não tinha módulo; `import`/`export` é a de hoje, e é a do JavaScript.
 * QUANDO USAR: módulo, sempre. `namespace` só onde ele ainda vive: dentro de arquivos `.d.ts`,
 *              para agrupar tipos de biblioteca e para estender tipos globais.
 * QUANDO NÃO USAR: `namespace` em código novo. Ele resolve um problema que o `import` já
 *                  resolveu melhor — e atrapalha o bundler, que não sabe o que descartar.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `namespace`: um nome só para várias coisas ───
const fonte = [
  'namespace Financeiro {',
  '  export const TAXA_JUROS = 0.02;              // sem `export`, fica preso lá dentro',
  '  const arredondar = (n: number) => Math.round(n * 100) / 100;   // privado do namespace',
  '',
  '  export function juros(valor: number, meses: number) {',
  '    return arredondar(valor * TAXA_JUROS * meses);',
  '  }',
  '',
  '  export type Parcela = { numero: number; valor: number };',
  '}',
];
for (const linha of fonte) console.log('  ' + linha);

// E isto é o que o `tsc` gera no lugar — namespace não é tipo: vira objeto de verdade.
const Financeiro = (function () {
  const TAXA_JUROS = 0.02;
  const arredondar = (n: number) => Math.round(n * 100) / 100;
  function juros(valor: number, meses: number) { return arredondar(valor * TAXA_JUROS * meses); }
  return { TAXA_JUROS, juros };                    // só o que tinha `export` sai
})();

console.log('\njuros de 1000 em 3x:', Financeiro.juros(1000, 3).toFixed(2));
console.log('taxa exportada     :', Financeiro.TAXA_JUROS);

// @ts-expect-error — Property 'arredondar' does not exist on type '{ TAXA_JUROS: number; juros: ...
console.log('o que ficou privado:', Financeiro.arredondar);

console.log('\nUma função que roda na hora e devolve um objeto: é só isso. O `namespace` é');
console.log('açúcar para esse fecho — e o tipo (`Financeiro.Parcela`) sai pelo mesmo nome.');

// ─── 2) O que o `import` faz melhor ───
// Namespace vira um objeto de verdade no JavaScript gerado — nada some, mesmo sem uso.
const arquivos = [
  '// financeiro/juros.ts',
  'export const TAXA_JUROS = 0.02;',
  'export function juros(valor: number, meses: number) { /* ... */ }',
  '',
  '// pedidos/checkout.ts',
  "import { juros } from '../financeiro/juros.js';   // o caminho é o namespace",
  "import type { Parcela } from '../financeiro/juros.js';",
];
for (const linha of arquivos) console.log('  ' + linha);

console.log('\nCada arquivo já é um escopo fechado: o que não tem `export` ninguém vê de fora.');
console.log('O caminho do arquivo faz o papel do nome do namespace, e o bundler consegue');
console.log('descartar o que ninguém importou — coisa que com namespace ele não consegue.');

// Há ainda a forma dinâmica, que roda na hora e devolve uma Promise — é o que permite
// carregar um pedaço do sistema só quando o usuário chega nele.
console.log("\n  const { juros } = await import('../financeiro/juros.js');   // import dinâmico");

// ─── 3) `/// <reference>`: como era antes do módulo ───
const antes = [
  '/// <reference path="./financeiro.ts" />        // "cole este arquivo antes deste aqui"',
  '/// <reference types="node" />                  // "puxe os tipos do pacote @types/node"',
  '',
  '// tsconfig.json de 2016: um único arquivo de saída, na ordem das referências',
  '{ "compilerOptions": { "outFile": "bundle.js" } }',
];
for (const linha of antes) console.log('  ' + linha);

console.log('\nEra assim que dois arquivos se enxergavam sem `import`: o `tsc` concatenava tudo');
console.log('num arquivo só, na ordem das referências. Hoje `/// <reference path>` não se usa');
console.log('mais em código. Já `/// <reference types="...">` continua vivo dentro de `.d.ts`,');
console.log('que é onde não existe `import` de valor para puxar junto.');

// ═══ NA PRÁTICA ═══

// ─── 4) Importar um JavaScript no meio do TypeScript ───
// Com `allowJs` ligado, o `require` de um `.js` sem tipos entrega `any`: tudo passa.
const legado: any = {                               // é o que `require('./legado.js')` devolve
  calcularFrete: (cep: string, peso: number) => (cep.startsWith('3') ? 12 : 25) + peso * 2,
};

console.log('frete:', legado.calcularFrete('30110-000', 3));
console.log('e isto também "compila":', typeof legado.calcularFreteee);   // any não confere nada

// A borda: descreva o que você usa e converse só com o tipo, nunca com o `any`.
interface Legado {
  calcularFrete(cep: string, peso: number): number;
}
const frete: Legado = legado;                       // uma linha, e o resto do arquivo fica seguro

console.log('pelo tipo:', frete.calcularFrete('01310-000', 1).toFixed(2));

// @ts-expect-error — Property 'calcularFreteee' does not exist on type 'Legado'.
console.log(frete.calcularFreteee);

console.log('\nAs três saídas, em ordem de preferência: `@types/pacote`, um `.d.ts` seu com o');
console.log('que você usa, ou `allowJs` + JSDoc no próprio `.js`. `any` solto não é saída.');

// ─── 5) Onde o namespace ainda aparece de verdade ───
const ondeVive = [
  '// arquivo .d.ts — agrupar tipos de uma biblioteca',
  'declare namespace Chart {',
  '  interface Opcoes { responsivo: boolean }',
  '  function criar(opcoes: Opcoes): void;',
  '}',
  '',
  '// estender um tipo global de terceiro (o `Request` do Express)',
  'declare global {',
  '  namespace Express {',
  '    interface Request { usuario?: { id: number } }',
  '  }',
  '}',
];
for (const linha of ondeVive) console.log('  ' + linha);

console.log('\nRepare que os dois casos são de TIPO, não de valor: `declare namespace` não gera');
console.log('código nenhum. É esse namespace que sobreviveu — o outro, o que vira objeto,');
console.log('foi aposentado pelo `import`.');

// ═══ PEGADINHAS ═══

// ─── 6) Um `export` no arquivo muda o significado de tudo ───
console.log('Arquivo SEM import/export: é script global — o `namespace` dele fica visível');
console.log('para o projeto inteiro, e duas variáveis com o mesmo nome em arquivos diferentes');
console.log('brigam entre si.');
console.log('Arquivo COM um `export` qualquer: vira módulo — nada dele vaza, e o namespace de');
console.log('dentro só existe para quem importar o arquivo.');

// É a origem do `export {}` solitário que se vê no fim de arquivos de tipo:
const truque = 'export {};   // não exporta nada, serve só para o arquivo virar módulo';
console.log('\n  ' + truque);

// E o custo do namespace que vira objeto: ele existe rodando, inteiro.
const Contabil = (function () {
  return { somar: (a: number, b: number) => a + b, subtrair: (a: number, b: number) => a - b };
})();

console.log('\no namespace existe em tempo de execução:', typeof Contabil, Object.keys(Contabil));
console.log('mesmo usando só `somar`, o `subtrair` vai junto para o navegador — ninguém');
console.log('consegue descartar a metade que você não usou. Com `import`, o bundler descarta.');

// ─── Resumo ───
// 1. `namespace` agrupa sob um nome, só deixa sair o `export` e vira um objeto no JS.
// 2. Módulo é o padrão de hoje: cada arquivo é um escopo, e o caminho faz o papel do nome.
// 3. `/// <reference path>` é do tempo do `outFile`; só o `types="..."` sobrevive em `.d.ts`.
// 4. JavaScript importado sem tipos chega como `any` — amarre num tipo seu logo na borda.
// 5. `declare namespace` (só tipo, sem código) é o namespace que continua útil.
// 6. Um `export` qualquer transforma o arquivo em módulo; sem nenhum, ele é script global.
