/**
 * webpack e Babel — empacotando o frontend
 * Sessão 4 · Rodar: node src/07-extras/01-webpack-e-babel.js
 *
 * O QUE É: o webpack junta todos os arquivos do NAVEGADOR em um bundle.js só; o Babel
 *          traduz o JavaScript moderno para o que navegador antigo entende.
 * QUANDO USAR: quando o front tem vários arquivos, importa css e precisa rodar em
 *              navegador velho. Em projeto novo hoje, o Vite faz o mesmo com menos configuração.
 * QUANDO NÃO USAR: para uma página com 20 linhas de JS. Um `<script>` resolve, e configurar
 *                  build aí é trabalho sem retorno.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Entrada e saída ───
console.log('frontend/main.js   → o que VOCÊ escreve      (entry)');
console.log('   ↓ webpack + babel-loader + css-loader');
console.log('public/assets/js/bundle.js → o que o NAVEGADOR baixa (output)');
console.log('\nO Express serve public/. Ele nunca olha para frontend/.');

// ─── 2) webpack.config.js é um objeto JavaScript comum ───
const path = require('node:path');   // CommonJS: quem roda este arquivo é o Node, não o navegador

const config = {
  mode: 'production',                          // `npm run dev` sobrescreve com --mode development
  entry: './frontend/main.js',                 // por onde o webpack começa a montar o bundle
  output: {
    path: path.resolve('/projeto', 'public', 'assets', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  devtool: 'source-map',                       // gera o bundle.js.map, que liga o bundle ao fonte
};

console.log('entry :', config.entry);
console.log('saída :', path.join(config.output.path, config.output.filename));
for (const regra of config.module.rules)
  console.log('regra :', String(regra.test), '→', [regra.use].flat().join(' + '));
// `module.exports = config` no fim do arquivo, e o webpack lê isso ao rodar `npm run build`.

// ─── 3) Um loader por tipo de arquivo ───
const rules = [
  { test: '/\\.js$/', use: 'babel-loader', oQueFaz: 'traduz JS moderno' },
  { test: '/\\.css$/', use: 'css-loader → style-loader', oQueFaz: 'faz o import de css funcionar' },
];

for (const r of rules) console.log(r.test.padEnd(12), r.use.padEnd(26), r.oQueFaz);
console.log('\nA lista do `use` roda de TRÁS PARA A FRENTE: css-loader primeiro, style-loader depois.');
// css-loader transforma o css em módulo JS; style-loader injeta esse módulo na página.

// ═══ NA PRÁTICA ═══

// ─── 4) O que entra no bundle: tudo que o entry importa ───
const { writeFileSync, mkdirSync, mkdtempSync, readFileSync } = require('node:fs');
const { join, dirname } = require('node:path');
const { tmpdir } = require('node:os');

const front = mkdtempSync(join(tmpdir(), 'frontend-'));
mkdirSync(join(front, 'assets'), { recursive: true });
writeFileSync(join(front, 'main.js'), `
  import './assets/style.css';
  import { saudacao } from './saudacao.js';
  document.addEventListener('DOMContentLoaded', () => console.log(saudacao('Igor')));
`);
writeFileSync(join(front, 'saudacao.js'),
  "export const saudacao = (nome = 'visitante') => `Olá, ${nome}!`;");
writeFileSync(join(front, 'assets', 'style.css'), 'body { font-family: sans-serif; }');

// É isto que o webpack faz primeiro: seguir os imports a partir do entry.
const visitados = [];
const seguir = (arquivo) => {
  visitados.push(arquivo.replace(front + '/', ''));
  if (!arquivo.endsWith('.js')) return;
  for (const [, alvo] of readFileSync(arquivo, 'utf8').matchAll(/import\s+(?:.*?from\s+)?'(\.[^']+)'/g)) {
    seguir(join(dirname(arquivo), alvo));
  }
};
seguir(join(front, 'main.js'));

console.log('entry:', visitados[0]);
console.log('entra no bundle.js:', visitados.join(' + '));
console.log('O css também: o css-loader transforma em módulo e o style-loader injeta na página.');
// No frontend é `import`, código do navegador. No server.js é `require`, código do Node.
// Dois mundos no mesmo projeto — e o webpack é a ponte.

// ─── 5) O que o Babel faz com esse código ───
const moderno = "const saudacao = (nome = 'visitante') => `Olá, ${nome}!`;";
const traduzido = 'var saudacao = function (nome) {\n' +
  "  if (nome === undefined) nome = 'visitante';\n" +
  "  return 'Olá, ' + nome + '!';\n};";

console.log('Você escreve:\n' + moderno);
console.log('O navegador antigo recebe:\n' + traduzido);
// O ALVO da tradução não está no webpack.config.js: vem do campo `browserslist` do
// package.json ("> 0.5%", "last 2 versions", "not dead").

// ─── 6) Os scripts do dia a dia ───
console.log('npm run build → webpack --mode production            (gera o bundle minificado)');
console.log('npm run dev   → webpack --mode development --watch   (refaz a cada save)');
console.log('npm start     → nodemon server.js --ignore public --ignore frontend');
// O --ignore evita o loop: o build reescreve public/, o nodemon veria a mudança e
// reiniciaria o servidor sem parar.

// ═══ PEGADINHAS ═══

// ─── 7) Onde cada pacote entra: dependency ou devDependency ───
const pacotes = [
  ['webpack, webpack-cli', 'dev', 'roda na SUA máquina, no build'],
  ['babel-loader, @babel/preset-env', 'dev', 'idem'],
  ['css-loader, style-loader', 'dev', 'idem'],
  ['core-js', 'PROD', 'o Babel injeta esse código DENTRO do bundle → vai para o usuário'],
];

for (const [nome, onde, porque] of pacotes) console.log(onde.padEnd(5), nome.padEnd(34), porque);
console.log('\nA pergunta não é "é ferramenta?" — é "esse código chega no produto final?".');

// ─── 8) Editar o bundle.js gerado ───
console.log('public/assets/js/bundle.js é SAÍDA: o próximo `npm run build` apaga tudo.');
console.log('Mexa em frontend/main.js e rode o build de novo.');
// O bundle.js.map existe justamente para isso: no DevTools você vê o seu código-fonte,
// não o bundle minificado, mesmo depurando o arquivo empacotado.

// ─── Resumo ───
// 1. `entry` (frontend/) → webpack → `output` (public/), que é o que o Express serve.
// 2. Um loader por tipo de arquivo; a lista de `use` roda de trás para a frente.
// 3. O Babel traduz o JS moderno; o alvo vem do `browserslist` do package.json.
// 4. `import` no frontend, `require` no servidor — dois mundos no mesmo projeto.
// 5. core-js é dependency porque vai dentro do bundle; o resto do build é devDependency.
// 6. Nunca edite o bundle gerado; o build sobrescreve.
