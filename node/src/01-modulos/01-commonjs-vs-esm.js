/**
 * CommonJS vs ES Modules
 * Sessão 1 · Rodar: node src/01-modulos/01-commonjs-vs-esm.js
 *
 * O QUE É: os dois jeitos de quebrar um programa em arquivos. CommonJS (`require` /
 *          `module.exports`) é o formato original do Node; ES Modules (`import` /
 *          `export`) é o formato oficial da linguagem.
 * QUANDO USAR: CommonJS quando o projeto já é CommonJS — é o padrão de todo curso e
 *              tutorial de Node/Express. ES Modules em projeto novo seu.
 * QUANDO NÃO USAR: nunca os dois no MESMO arquivo. Node escolhe UM formato por arquivo,
 *                  e misturar `import` com `module.exports` quebra na hora.
 */

// ═══ ESSENCIAL ═══

// ─── 1) As duas sintaxes, lado a lado ───
const formas = [
  ['importar tudo', "const express = require('express')", "import express from 'express'"],
  ['importar um pedaço', "const { Router } = require('express')", "import { Router } from 'express'"],
  ['exportar um valor', 'module.exports = route', 'export default route'],
  ['exportar vários', 'exports.paginaInicial = fn', 'export const paginaInicial = fn'],
];

console.log('                     CommonJS (require)              ES Modules (import)');
for (const [oQue, cjs, esm] of formas) console.log(oQue.padEnd(20), cjs.padEnd(36), esm);
console.log('\nNode entende os DOIS. O que ele NÃO aceita é os dois no mesmo arquivo.');

// ─── 2) module.exports é o que o require devolve ───
const { writeFileSync, mkdtempSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const pasta = mkdtempSync(join(tmpdir(), 'modulos-'));
writeFileSync(join(pasta, 'frete.js'), `
  const TAXA = 12.5;                       // privado: só existe dentro deste arquivo
  function calcular(peso) { return peso * TAXA; }
  module.exports = { calcular };           // só isto sai do arquivo
`);

const frete = require(join(pasta, 'frete.js'));
console.log('Frete de 3kg:', frete.calcular(3));
console.log('A TAXA vazou para fora?', frete.TAXA);   // undefined — cada arquivo é um escopo

// ─── 3) Ligar ES Modules no Node hoje NÃO precisa de Babel ───
const { writeFileSync: escrever, mkdtempSync: criarPasta } = require('node:fs');
const { join: caminho } = require('node:path');
const { tmpdir: temp } = require('node:os');
const { execFileSync } = require('node:child_process');

const dir = criarPasta(caminho(temp(), 'esm-'));
// Basta a extensão .mjs (ou "type": "module" no package.json) — Node já roda ES Modules sozinho.
escrever(caminho(dir, 'desconto.mjs'), `
  export function aplicar(valor) { return valor * 0.9; }
`);
escrever(caminho(dir, 'main.mjs'), `
  import { aplicar } from './desconto.mjs';
  console.log('Preço com 10% off:', aplicar(200));
`);

console.log(execFileSync('node', [caminho(dir, 'main.mjs')], { encoding: 'utf8' }).trim());
console.log('Rodou ES Modules sem transpilador nenhum.');

// ═══ NA PRÁTICA ═══

// ─── 4) O trio do Express, montado em três arquivos de verdade ───
const express = require('express');
const { writeFileSync: por, mkdirSync: criarPasta2, mkdtempSync: novoProjeto, rmSync } = require('node:fs');
const { join: ligar } = require('node:path');

// A pasta nasce ao lado deste arquivo (e não em /tmp) para que o `require('express')` lá
// dentro ache o node_modules do projeto — é assim que o Node procura: subindo as pastas.
const projeto = novoProjeto(ligar(__dirname, 'tmp-trio-'));
criarPasta2(ligar(projeto, 'controllers'));

por(ligar(projeto, 'controllers', 'homeController.js'), `
  exports.paginaInicial = (req, res) => res.send('página inicial');   // atalho de module.exports.x
`);
por(ligar(projeto, 'routes.js'), `
  const express = require('express');
  const route = express.Router();
  const HomeController = require('./controllers/homeController.js');

  route.get('/', HomeController.paginaInicial);
  module.exports = route;                       // é ISTO que o server.js recebe
`);

const app = express();
app.use(require(ligar(projeto, 'routes.js')));   // no projeto: require('./routes.js')

const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}/`;
  console.log('GET / →', await fetch(url).then((r) => r.text()));
  console.log('Três arquivos, um `require` cada, e o Express montado.');
  servidor.close();
  rmSync(projeto, { recursive: true });          // limpa a pasta de exemplo
});

// ─── 5) O mesmo trio em ES Modules ───
const trio = [
  ['controllers/homeController.js', 'exports.paginaInicial = fn', 'export const paginaInicial = fn'],
  ['routes.js (importar)', "require('./controllers/homeController.js')",
    "import { paginaInicial } from './controllers/homeController.js'"],
  ['routes.js (exportar)', 'module.exports = route', 'export default route'],
  ['server.js', "const routes = require('./routes.js')", "import routes from './routes.js'"],
];

for (const [arquivo, cjs, esm] of trio) {
  console.log(arquivo);
  console.log('   CJS:', cjs);
  console.log('   ESM:', esm);
}
console.log('\nExige "type": "module" no package.json — e a extensão .js no import é OBRIGATÓRIA.');

// ═══ PEGADINHAS ═══

// ─── 6) Misturar os dois no mesmo arquivo quebra ───
const { writeFileSync: gravar, mkdtempSync: novaPasta } = require('node:fs');
const { join: unir } = require('node:path');
const { tmpdir: tmp } = require('node:os');
const { execFileSync: rodar } = require('node:child_process');

const misto = novaPasta(unir(tmp(), 'misto-'));
gravar(unir(misto, 'routes.js'), `
  import algo from 'node:path';   // um único import já marca o arquivo como ES Module...
  module.exports = { rota: '/' }; // ...e aí "module" não existe mais aqui dentro
`);
gravar(unir(misto, 'server.js'), `const routes = require('./routes.js');`);

try {
  rodar('node', [unir(misto, 'server.js')], { encoding: 'utf8', stdio: 'pipe' });
} catch (erro) {
  console.log('Erro:', erro.stderr.split('\n').find((l) => l.includes('Error')));
}
// ReferenceError: module is not defined in ES module scope.
// Um `import` perdido no meio de um arquivo CommonJS derruba o servidor inteiro.

// ─── 7) `exports = algo` não exporta nada ───
const { writeFileSync: salvar, mkdtempSync: abrirPasta } = require('node:fs');
const { join: montar } = require('node:path');
const { tmpdir: pastaTemp } = require('node:os');

const base = abrirPasta(montar(pastaTemp(), 'exports-'));
salvar(montar(base, 'errado.js'), `exports = { total: 99 };`);            // reatribuiu a variável
salvar(montar(base, 'certo.js'), `module.exports = { total: 99 };`);      // trocou o que sai do arquivo

console.log('Com `exports = {...}`:', require(montar(base, 'errado.js')));   // {} — vazio
console.log('Com `module.exports = {...}`:', require(montar(base, 'certo.js')));
// `exports` é só um apelido para `module.exports`. Reatribuir o apelido não muda o original.
// Por isso `exports.paginaInicial = fn` funciona, mas `exports = fn` não.

// ─── Resumo ───
// 1. CommonJS (`require`/`module.exports`) é o formato ORIGINAL do Node — é o que você vê
//    em todo curso de Express, e não tem nada a ver com navegador.
// 2. Navegador é o contrário: entende `import`/`export` com `<script type="module">` e não
//    entende `require` sem um bundler (Vite, webpack).
// 3. Babel não é mais necessário para ESM no Node: use `.mjs` ou `"type": "module"`.
// 4. Um arquivo é CommonJS OU ES Module — nunca os dois. Misturar dá ReferenceError.
// 5. Em ESM a extensão no import é obrigatória: `'./routes.js'`, não `'./routes'`.
// 6. `exports.x = fn` funciona; `exports = fn` não — só `module.exports` troca a saída.
