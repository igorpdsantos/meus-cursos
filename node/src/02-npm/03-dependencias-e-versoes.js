/**
 * dependencies, devDependencies e versão
 * Sessão 1 · Rodar: node src/02-npm/03-dependencias-e-versoes.js
 *
 * O QUE É: a separação entre o que o projeto precisa para RODAR e o que ele precisa só
 *          para CONSTRUIR, mais a notação `^5.2.1` que define a faixa de versão aceita.
 * QUANDO USAR: em toda instalação — decida na hora se é `npm i pacote` ou `npm i -D pacote`.
 * QUANDO NÃO USAR: não jogue tudo em dependencies "para não errar": em produção isso
 *                  baixa webpack, Babel e nodemon sem necessidade.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Os dois comandos e onde cada um grava ───
console.log('npm install express        → dependencies    (precisa para RODAR)');
console.log('npm install --save-dev nodemon → devDependencies (precisa só para CONSTRUIR)');
console.log('npm install -D nodemon     → -D é o atalho de --save-dev');
console.log('\nEm produção: npm install --omit=dev  → pula tudo de devDependencies.');

// ─── 2) O teste que decide onde o pacote vai ───
const pacotes = [
  { nome: 'express', usadoEmProducao: true },
  { nome: 'ejs', usadoEmProducao: true },
  { nome: 'mongoose', usadoEmProducao: true },
  { nome: 'nodemon', usadoEmProducao: false },
  { nome: 'webpack', usadoEmProducao: false },
];

for (const p of pacotes) {
  // A pergunta é sempre a mesma: o servidor em produção executa esse código?
  console.log(p.nome.padEnd(10), '→', p.usadoEmProducao ? 'dependencies' : 'devDependencies');
}

// ─── 3) Lendo `^5.2.1` ───
const versao = '5.2.1';
const [maior, menor, correcao] = versao.split('.');
console.log(`${maior} MAIOR    → mudou de forma incompatível; pode quebrar seu código`);
console.log(`${menor} MENOR    → ganhou recurso novo, sem quebrar nada`);
console.log(`${correcao} CORREÇÃO → só conserto de bug`);
console.log('\n^5.2.1 → aceita 5.2.2 e 5.9.0, recusa 6.0.0  (trava o número MAIOR)');
console.log('~5.2.1 → aceita 5.2.9, recusa 5.3.0            (trava também o MENOR)');
console.log(' 5.2.1 → só essa, exatamente');

// ═══ NA PRÁTICA ═══

// ─── 4) O caso que não segue a regra: core-js ───
console.log('webpack        → devDependency: roda na SUA máquina, no build');
console.log('babel-loader   → devDependency: idem');
console.log('core-js        → dependency! o Babel injeta esse código DENTRO do bundle.js,');
console.log('                 que é baixado pelo navegador do usuário final');
// A pergunta certa não é "é ferramenta?", é "esse código chega no produto final?".

// ─── 5) Para que serve o package-lock.json ───
const { writeFileSync, mkdtempSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const pasta = mkdtempSync(join(tmpdir(), 'lock-'));
writeFileSync(join(pasta, 'package.json'), JSON.stringify({ dependencies: { express: '^5.2.1' } }));
writeFileSync(join(pasta, 'package-lock.json'), JSON.stringify({
  packages: { 'node_modules/express': { version: '5.2.1', resolved: 'https://registry.npmjs.org/...' } },
}));

const lock = require(join(pasta, 'package-lock.json'));
console.log('package.json diz (faixa) :', require(join(pasta, 'package.json')).dependencies.express);
console.log('package-lock diz (exata) :', lock.packages['node_modules/express'].version);
// Sem o lock, cada colega instalaria uma versão diferente dentro da faixa ^5.2.1 e o bug
// apareceria só na máquina de um. Por isso o lock VAI para o git.

// ─── 6) `npm ci` no lugar de `npm install` ───
console.log('npm install → respeita a FAIXA, pode atualizar e reescrever o lock');
console.log('npm ci      → instala EXATAMENTE o lock, apaga node_modules antes. Use em CI/deploy.');

// ═══ PEGADINHAS ═══

// ─── 7) Instalar com -g não deixa registro no projeto ───
const { writeFileSync: guardar, mkdtempSync: criarProjeto } = require('node:fs');
const { join: caminho } = require('node:path');
const { tmpdir: pastaTemp } = require('node:os');

const clone = criarProjeto(caminho(pastaTemp(), 'global-'));
guardar(caminho(clone, 'package.json'), JSON.stringify({
  name: 'meu-site',
  dependencies: { express: '^5.2.1' },
  // `npm install -g nodemon` instalou na SUA máquina e não escreveu nada aqui:
  devDependencies: {},
}, null, 2));

const pacote = require(caminho(clone, 'package.json'));
console.log('O colega clona o projeto e roda npm install. Ele recebe:');
console.log('  dependencies   :', Object.keys(pacote.dependencies).join(', ') || '(nada)');
console.log('  devDependencies:', Object.keys(pacote.devDependencies).join(', ') || '(nada)');
console.log('E aí `npm start` quebra: "nodemon: command not found".');
// Funciona no seu computador e em nenhum outro. Instale local e chame por npx.

// ─── Resumo ───
// 1. `npm i pacote` = dependencies (roda em produção); `npm i -D pacote` = devDependencies.
// 2. O teste é "esse código chega no produto final?" — por isso core-js é dependency
//    mesmo sendo coisa de build.
// 3. `^` trava o número MAIOR, `~` trava também o MENOR, sem símbolo é versão exata.
// 4. package-lock.json guarda a versão exata e vai para o git; `npm ci` obedece a ele.
// 5. Evite -g: instalação local + npx mantém o projeto reproduzível.
