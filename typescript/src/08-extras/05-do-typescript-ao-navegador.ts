/**
 * Do TypeScript ao navegador
 * Sessão 8 · Rodar: node src/08-extras/05-do-typescript-ao-navegador.ts
 *
 * O QUE É: o caminho que o código faz até virar o `.js` que a página carrega — o `tsc`, o
 *          bundler (webpack, Vite, esbuild) e o tsconfig que o front pede.
 * QUANDO USAR: em qualquer projeto de navegador. Ali não dá para "rodar o `.ts` direto":
 *              o navegador não conhece tipo, nem `import` de `node_modules`.
 * QUANDO NÃO USAR: no back-end de hoje. O Node roda `.ts` sozinho — montar webpack para um
 *                  servidor é trabalho que não paga nada.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O que o `tsc` faz: apaga o tipo e nivela a sintaxe ───
const antes = [
  '// entrada: src/carrinho.ts',
  'export function total(itens: { preco: number; qtd: number }[]): number {',
  '  return itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);',
  '}',
];
const depois = [
  '// saída: dist/carrinho.js  (target: ES2020, module: esnext)',
  'export function total(itens) {',
  '  return itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);',
  '}',
];
for (const linha of antes) console.log('  ' + linha);
console.log('');
for (const linha of depois) console.log('  ' + linha);

console.log('\nSão duas coisas num comando só: TIRAR os tipos (que não existem no JavaScript)');
console.log('e TRADUZIR a sintaxe nova para a versão que o `target` pede. Se o target fosse');
console.log('ES5, a arrow function acima viraria `function (soma, i) { ... }`.');

// ─── 2) As opções de build que decidem tudo ───
const opcoes = [
  ['opção',       'para que serve'],
  ['outDir',      'onde o .js gerado cai — nunca junto do .ts'],
  ['rootDir',     'a raiz do que entra, para o dist espelhar a estrutura'],
  ['target',      'até que versão do JavaScript traduzir (ES2020 é o padrão sensato)'],
  ['module',      'o formato do import gerado: esnext no front, commonjs no Node antigo'],
  ['lib',         'que APIs existem: ["DOM", "ES2020"] no navegador, sem DOM no servidor'],
  ['sourceMap',   'o mapa que faz o erro apontar a linha do .ts, não a do .js'],
  ['declaration', 'gera o .d.ts junto — só quando você PUBLICA uma biblioteca'],
];
for (const [opcao, serve] of opcoes) console.log(`  ${opcao.padEnd(13)} ${serve}`);

console.log('\nO ciclo do dia a dia é `tsc --watch`: ele fica de olho em `src/` e regenera o');
console.log('`dist/` a cada salvar. O `npm run check` deste curso é o mesmo `tsc` com');
console.log('`--noEmit`: confere e não gera nada, porque aqui quem roda o `.ts` é o Node.');

// ─── 3) Por que o navegador ainda precisa de um bundler ───
const config = [
  '// webpack.config.js — o que o curso original monta na aula de configuração',
  "const path = require('path');",
  'module.exports = {',
  "  entry: './src/index.ts',",
  "  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },",
  "  resolve: { extensions: ['.ts', '.js'] },",
  "  module: { rules: [{ test: /\\.ts$/, use: 'ts-loader', exclude: /node_modules/ }] },",
  "  devtool: 'source-map',",
  '};',
  '',
  '<!-- index.html: uma tag só, para o arquivo que saiu do build -->',
  '<script src="dist/bundle.js"></script>',
];
for (const linha of config) console.log('  ' + linha);

console.log('\nO `tsc` sozinho resolve o TIPO. O bundler resolve o resto: junta os arquivos num');
console.log('só, sabe achar `node_modules`, cuida de CSS e imagem e recarrega a página ao');
console.log('salvar. Hoje o mesmo papel é feito por Vite ou esbuild, com menos configuração —');
console.log('a ideia é a mesma, e o `ts-loader` vira `esbuild` por baixo.');

// ═══ NA PRÁTICA ═══

// ─── 4) O exercício clássico: validar um formulário com tipos ───
// No navegador viria de `document.querySelector`; aqui a entrada é uma variável.
type CampoFormulario = { nome: string; email: string; senha: string; idade: string };
type Erro = { campo: keyof CampoFormulario; mensagem: string };

function validar(dados: CampoFormulario): Erro[] {
  const erros: Erro[] = [];
  if (dados.nome.trim().length < 3) erros.push({ campo: 'nome', mensagem: 'nome curto demais' });
  if (!dados.email.includes('@')) erros.push({ campo: 'email', mensagem: 'e-mail inválido' });
  if (dados.senha.length < 8) erros.push({ campo: 'senha', mensagem: 'senha com menos de 8' });
  const idade = Number(dados.idade);
  if (!Number.isInteger(idade) || idade < 18) {
    erros.push({ campo: 'idade', mensagem: 'precisa ser maior de idade' });
  }
  return erros;
}

const enviado: CampoFormulario = { nome: 'Al', email: 'ana.exemplo.com', senha: '123', idade: '17' };
const errosEncontrados = validar(enviado);

console.log(`${errosEncontrados.length} erro(s):`);
for (const erro of errosEncontrados) console.log(`  ${erro.campo}: ${erro.mensagem}`);

const corrigido: CampoFormulario = { nome: 'Ana Lima', email: 'ana@exemplo.com', senha: 'senha1234', idade: '32' };
console.log('depois de corrigir:', validar(corrigido).length, 'erro(s)');

// `keyof` no campo é o que impede o erro bobo de escrever um nome de campo que não existe.
// @ts-expect-error — Type '"telefone"' is not assignable to type 'keyof CampoFormulario'.
const erroInventado: Erro = { campo: 'telefone', mensagem: 'não existe' };
console.log('mesmo assim rodaria:', erroInventado.campo, '← o tipo some no navegador');

// ─── 5) O mesmo formulário, agora falando com o DOM ───
const noNavegador = [
  "const formulario = document.querySelector('#cadastro') as HTMLFormElement;",
  "const campoEmail = document.querySelector<HTMLInputElement>('#email');",
  '',
  "formulario.addEventListener('submit', (evento) => {",
  '  evento.preventDefault();',
  '  const dados = {',
  "    nome: (document.querySelector('#nome') as HTMLInputElement).value,",
  "    email: campoEmail?.value ?? '',",
  '    // ...',
  '  };',
  '  const erros = validar(dados);',
  '});',
];
for (const linha of noNavegador) console.log('  ' + linha);

console.log('\nDuas coisas aparecem aqui e em nenhum outro lugar do curso: o `lib: ["DOM"]`, que');
console.log('é o que faz `document` existir para o compilador, e o `as HTMLInputElement` —');
console.log('`querySelector` devolve `Element | null`, e só você sabe que aquele id é um input.');
console.log('`querySelector<HTMLInputElement>(...)` diz o mesmo sem `as`, e é o preferível.');

// ═══ PEGADINHAS ═══

// ─── 6) O tipo não valida o formulário: ele some no build ───
type Cadastro = { nome: string; email: string; senha: string; idade: string };

function conferir(dados: Cadastro): string[] {
  const erros: string[] = [];
  if (dados.senha.length < 8) erros.push('senha');
  if (!Number.isInteger(Number(dados.idade))) erros.push('idade');
  return erros;
}

const doUsuario = JSON.parse('{"nome":"Ana","email":"ana@exemplo.com","senha":"1234","idade":"vinte"}');
const comoSeFosse = doUsuario as Cadastro;          // o `as` promete; ninguém conferiu nada

console.log('idade prometida como string:', typeof comoSeFosse.idade, '· valor:', comoSeFosse.idade);
console.log('Number("vinte") =', Number(comoSeFosse.idade), '← o tipo estava "certo" e o dado, errado');
console.log('validando de verdade:', conferir(comoSeFosse));

console.log('\nO build joga os tipos fora: no navegador não sobra conferência nenhuma. Tipo é');
console.log('para a hora de escrever; validação é para a hora de rodar — e ela precisa existir');
console.log('também no servidor, porque o formulário do navegador qualquer um contorna.');

// ─── Resumo ───
// 1. `tsc` faz duas coisas: apaga o tipo e traduz a sintaxe até o `target` pedido.
// 2. `outDir`, `target`, `module`, `lib` e `sourceMap` são as opções que decidem o build.
// 3. O bundler (webpack, Vite, esbuild) junta os arquivos e resolve `node_modules` para a página.
// 4. `lib: ["DOM"]` é o que faz `document` existir; `querySelector<HTMLInputElement>` evita o `as`.
// 5. Formulário tipado com `keyof` não deixa você inventar campo que não existe no formulário.
// 6. Nada disso valida dado: o tipo some no build, e a validação de verdade roda no servidor.
