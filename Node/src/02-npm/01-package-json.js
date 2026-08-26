/**
 * package.json — a identidade do projeto
 * Sessão 1 · Rodar: node src/02-npm/01-package-json.js
 *
 * O QUE É: o arquivo que diz o nome do projeto, quais pacotes ele precisa e quais
 *          comandos ele sabe rodar. É criado com `npm init -y`.
 * QUANDO USAR: em todo projeto Node. Sem ele não existe `npm install`, nem `npm start`,
 *              nem como outra pessoa reproduzir o seu ambiente.
 * QUANDO NÃO USAR: em um script solto de uma linha que só usa módulos internos do Node —
 *                  aí basta o arquivo .js.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O que `npm init -y` cria ───
const pacote = {
  name: 'aula-express',        // nome da pasta, em minúsculas e sem espaço
  version: '1.0.0',
  main: 'server.js',           // arquivo de entrada do projeto
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
  license: 'ISC',
};

console.log('Entra no projeto:', Object.keys(pacote).join(', '));
console.log('Ponto de partida:', pacote.main);
// `npm init -y` aceita tudo no padrão. Sem o -y, o npm pergunta campo por campo.

// ─── 2) `npm install express` mexe em três lugares ───
console.log('1. node_modules/  → o código do pacote baixado (nunca vai para o git)');
console.log('2. package.json   → a lista do que o projeto precisa, com a faixa de versão');
console.log('3. package-lock.json → a versão EXATA que foi instalada hoje');
// Quem clona o projeto roda `npm install` e o npm remonta o node_modules a partir desses dois.

// ─── 3) O package.json é lido como um objeto qualquer ───
const { writeFileSync, mkdtempSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const projeto = mkdtempSync(join(tmpdir(), 'npm-'));
writeFileSync(join(projeto, 'package.json'), JSON.stringify({
  name: 'loja',
  version: '2.1.0',
  dependencies: { express: '^5.2.1', ejs: '^6.0.1' },
}, null, 2));

const config = require(join(projeto, 'package.json'));   // require entende .json direto
console.log('Projeto:', config.name, 'v' + config.version);
console.log('Depende de:', Object.keys(config.dependencies).join(' + '));

// ═══ NA PRÁTICA ═══

// ─── 4) O package.json de um projeto Express de verdade ───
const real = {
  name: '06-webpack-e-middleware',
  private: true,                                    // trava publicação acidental no npm
  main: 'server.js',
  scripts: { start: 'nodemon server.js', build: 'webpack --mode production' },
  browserslist: ['> 0.5%', 'last 2 versions', 'not dead'],   // lido pelo Babel, não pelo npm
  dependencies: { express: '^5.2.1', ejs: '^6.0.1', mongoose: '^9.9.3' },
  devDependencies: { nodemon: '^3.1.14', webpack: '^5.109.2' },
};

for (const [campo, valor] of Object.entries(real)) {
  const resumo = Array.isArray(valor) ? valor.join(', ')
    : typeof valor === 'object' ? Object.keys(valor).join(', ') : String(valor);
  console.log(campo.padEnd(16), '→', resumo);
}
// Outras ferramentas também leem daqui: o Babel lê `browserslist`, o Node lê `type`.

// ─── 5) `"type": "module"` troca o formato do projeto inteiro ───
console.log('Sem "type"            → todo .js do projeto é CommonJS (require)');
console.log('"type": "module"      → todo .js do projeto é ES Module (import)');
console.log('Extensão vence sempre → .cjs é CommonJS, .mjs é ES Module, doa a quem doer');
// É por isso que um curso de Express costuma usar require: o package.json não tem "type".

// ═══ PEGADINHAS ═══

// ─── 6) Instalar sem package.json ───
const { mkdtempSync: novaPasta } = require('node:fs');
const { join: unir } = require('node:path');
const { tmpdir: temp } = require('node:os');
const { existsSync } = require('node:fs');

const vazia = novaPasta(unir(temp(), 'sem-pkg-'));
console.log('Tem package.json?', existsSync(unir(vazia, 'package.json')));
// Rodar `npm install express` aqui baixa o pacote, mas NÃO registra a dependência em lugar
// nenhum. Quem clonar a pasta não tem como saber que o projeto precisa do express.
// Regra: `npm init -y` PRIMEIRO, instalar depois.

// ─── 7) node_modules não vai para o repositório ───
console.log('.gitignore de todo projeto Node:');
console.log(['node_modules/', '.env'].join('\n'));
// A pasta tem milhares de arquivos e é 100% reconstruível com `npm install`.
// O que precisa ir para o git é o par package.json + package-lock.json.

// ─── Resumo ───
// 1. `npm init -y` cria o package.json — faça isso antes do primeiro install.
// 2. package.json guarda a FAIXA de versão; package-lock.json guarda a versão EXATA.
// 3. Os dois vão para o git; node_modules nunca vai — é reconstruído com `npm install`.
// 4. `main` diz o arquivo de entrada; `scripts` diz os comandos; `private: true` evita
//    publicar sem querer.
// 5. Outras ferramentas leem o package.json: Babel lê `browserslist`, Node lê `type`.
