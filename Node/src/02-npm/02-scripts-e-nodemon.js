/**
 * Scripts do npm e o nodemon
 * Sessão 1 · Rodar: node src/02-npm/02-scripts-e-nodemon.js
 *
 * O QUE É: `scripts` é a lista de comandos do projeto. `npm start` roda o servidor;
 *          o nodemon é o programa que reinicia esse servidor sozinho a cada save.
 * QUANDO USAR: sempre. Um comando curto (`npm start`) no lugar de decorar a linha
 *              inteira, e o nodemon durante todo o desenvolvimento.
 * QUANDO NÃO USAR: nodemon em produção — lá o processo sobe uma vez e fica de pé
 *                  (`node server.js`, ou um gerenciador como o pm2).
 */

// ═══ ESSENCIAL ═══

// ─── 1) Um script é um apelido para uma linha de terminal ───
const scripts = {
  start: 'nodemon server.js',
  build: 'webpack --mode production',
  dev: 'webpack --mode development --watch',
};

for (const [nome, comando] of Object.entries(scripts)) {
  console.log(`npm run ${nome}`.padEnd(14), '→', comando);
}
console.log('\n`start` e `test` dispensam o "run": `npm start` já funciona.');

// ─── 2) O que o nodemon resolve ───
console.log('Sem nodemon: salvou o arquivo → Ctrl+C → node server.js → recarrega o navegador');
console.log('Com nodemon: salvou o arquivo → o servidor já reiniciou sozinho');
// Instalação: npm install --save-dev nodemon  (é ferramenta de desenvolvimento, vai em devDependencies)
// E no package.json:  "start": "nodemon server.js"

// ─── 3) Scripts enxergam os binários de node_modules/.bin ───
console.log('No terminal:  nodemon server.js  → "command not found" (não está instalado global)');
console.log('Em um script: nodemon server.js  → funciona, o npm põe node_modules/.bin no PATH');
console.log('Fora do script, o equivalente é: npx nodemon server.js');
// Por isso não é preciso instalar nada com -g: o pacote local basta.

// ═══ NA PRÁTICA ═══

// ─── 4) Simulando o ciclo do nodemon com fs.watch ───
const { writeFileSync, mkdtempSync, watch } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const pasta = mkdtempSync(join(tmpdir(), 'nodemon-'));
const arquivo = join(pasta, 'server.js');
writeFileSync(arquivo, 'console.log("v1");');

const vigia = watch(arquivo, () => {
  console.log('[nodemon] restarting due to changes...');   // é literalmente esta a mensagem dele
  vigia.close();
});

setTimeout(() => writeFileSync(arquivo, 'console.log("v2");'), 30);   // simula o Ctrl+S
// O nodemon faz isto para a pasta inteira, e em vez de logar, mata e sobe o processo de novo.

// ─── 5) Ignorar pastas que o próprio build gera ───
const { watch: vigiar, writeFileSync: gravar, mkdirSync: criar, mkdtempSync: novaPasta } = require('node:fs');
const { join: unir, relative } = require('node:path');
const { tmpdir: temp } = require('node:os');

const projeto = novaPasta(unir(temp(), 'ignore-'));
criar(unir(projeto, 'public'), { recursive: true });
gravar(unir(projeto, 'server.js'), 'console.log("v1")');
gravar(unir(projeto, 'public', 'bundle.js'), 'gerado pelo webpack');

const ignorar = ['public'];                    // "start": "nodemon server.js --ignore public"
const reagir = (arquivo) => {
  const pasta = relative(projeto, arquivo).split('/')[0];
  console.log(ignorar.includes(pasta) ? `${pasta}/ mudou → ignorado` : 'server.js mudou → restart');
};

reagir(unir(projeto, 'server.js'));
reagir(unir(projeto, 'public', 'bundle.js'));
console.log('Sem o --ignore, o build reescreve public/, o nodemon reinicia, e não para mais.');
// É o loop infinito clássico de quem roda `npm run dev` e `npm start` ao mesmo tempo.

// ─── 6) Dois terminais durante o desenvolvimento ───
console.log('Terminal 1 → npm run dev   (webpack --watch: refaz o bundle a cada save no frontend)');
console.log('Terminal 2 → npm start     (nodemon: reinicia o servidor a cada save no src)');
// São dois vigias diferentes: um cuida do código do navegador, o outro do código do servidor.

// ═══ PEGADINHAS ═══

// ─── 7) `npm run build` não é `npm build` ───
console.log('npm start / npm test       → atalhos oficiais, funcionam sem o "run"');
console.log('npm run build / npm run dev → qualquer outro nome EXIGE o "run"');
console.log('npm build                   → Unknown command: "build"');
// O npm não tem comando `build`: sem o `run`, ele nem procura o seu script.

// ─── Resumo ───
// 1. `scripts` guarda os comandos do projeto; `npm run <nome>` executa.
// 2. Só `start` e `test` dispensam o `run`.
// 3. nodemon = reinício automático no desenvolvimento; instale com --save-dev.
// 4. Script enxerga node_modules/.bin — não precisa instalar nada com -g.
// 5. Use --ignore para pastas geradas (public/), senão o build entra em loop de restart.
// 6. Em produção é `node server.js`, sem nodemon.
