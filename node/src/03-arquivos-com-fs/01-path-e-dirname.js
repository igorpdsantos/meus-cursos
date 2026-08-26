/**
 * path e __dirname — montar caminhos que não quebram
 * Sessão 3 · Rodar: node src/03-arquivos-com-fs/01-path-e-dirname.js
 *
 * O QUE É: `path` é o módulo interno que monta e desmonta caminhos de arquivo;
 *          `__dirname` é a pasta onde o arquivo que está rodando mora.
 * QUANDO USAR: toda vez que apontar para uma pasta do projeto — views, public, uploads.
 *              É o que o Express pede em `app.set('views', ...)` e `express.static(...)`.
 * QUANDO NÃO USAR: para URL do navegador. `/assets/js/bundle.js` na view é caminho de
 *                  URL, não de disco — path não entra aí.
 */

// ═══ ESSENCIAL ═══

// ─── 1) join cola pedaços com a barra certa ───
const path = require('node:path');

console.log(path.join('src', 'views', 'index.ejs'));     // src/views/index.ejs no Mac/Linux
console.log(path.join('src', '..', 'public'));           // public — ele resolve o ".." sozinho
console.log('Separador deste sistema:', JSON.stringify(path.sep));
// No Windows sai src\views\index.ejs. É por isso que ninguém escreve 'src/views' na mão.

// ─── 2) __dirname: a pasta deste arquivo, não a de onde você rodou ───
console.log('__dirname :', __dirname);      // .../Node/src/03-arquivos-com-fs
console.log('__filename:', __filename);     // .../01-path-e-dirname.js
console.log('cwd       :', process.cwd());  // a pasta do terminal — pode ser QUALQUER uma
// Rodar `node node/src/03-arquivos-com-fs/01-path-e-dirname.js` de casa muda o cwd,
// mas não muda o __dirname. Por isso caminho de projeto sempre parte de __dirname.

// ─── 3) resolve devolve caminho absoluto ───
const { resolve, join, isAbsolute } = require('node:path');

console.log('join   :', join('src', 'views'));                  // relativo: src/views
console.log('resolve:', resolve(__dirname, 'src', 'views'));    // absoluto: /Users/.../src/views
console.log('É absoluto?', isAbsolute(resolve(__dirname, 'public')));
// Regra prática: `join` para juntar pedaços, `resolve(__dirname, ...)` para entregar
// caminho a uma biblioteca — ela não faz ideia de onde o seu terminal está.

// ═══ NA PRÁTICA ═══

// ─── 4) As duas linhas do server.js que usam path ───
const { resolve: abs } = require('node:path');
const { mkdirSync, writeFileSync, existsSync, mkdtempSync } = require('node:fs');
const { tmpdir } = require('node:os');

const raizDoProjeto = mkdtempSync(abs(tmpdir(), 'projeto-'));   // faz o papel do __dirname
mkdirSync(abs(raizDoProjeto, 'src', 'views'), { recursive: true });
writeFileSync(abs(raizDoProjeto, 'src', 'views', 'index.ejs'), '<h1>oi</h1>');

// server.js:
const pastaDeViews = abs(raizDoProjeto, 'src', 'views');        // app.set('views', ...)
const pastaPublica = abs(raizDoProjeto, 'public');              // express.static(...)

console.log('views  :', pastaDeViews.replace(raizDoProjeto, '<raiz>'));
console.log('public :', pastaPublica.replace(raizDoProjeto, '<raiz>'));
console.log('achou o index.ejs?', existsSync(abs(pastaDeViews, 'index.ejs')));
// No projeto, `raizDoProjeto` é `__dirname`. Sem ele, o servidor só sobe se você estiver
// na pasta certa do terminal — e quebra quando o serviço de hospedagem roda de outro lugar.

// ─── 5) Desmontando um caminho ───
const { basename, extname, dirname } = require('node:path');
const arquivo = '/Users/igor/projeto/public/assets/js/bundle.js';

console.log('dirname :', dirname(arquivo));    // .../assets/js
console.log('basename:', basename(arquivo));   // bundle.js
console.log('extname :', extname(arquivo));    // .js
console.log('sem ext :', basename(arquivo, '.js'));
// `basename(arquivo, '.js')` é como se descobre o nome de um tópico a partir do arquivo.

// ─── 6) Entrada e saída do webpack, no mesmo projeto ───
const { resolve: absoluto } = require('node:path');
const raiz = '/Users/igor/projeto';

console.log('entry (fonte)  :', './frontend/main.js');
console.log('output (gerado):', absoluto(raiz, 'public', 'assets', 'js'));
console.log('estático servido:', absoluto(raiz, 'public'));
// A saída do webpack cai DENTRO da pasta que o Express serve. É assim que as duas
// metades do projeto se encontram.

// ═══ PEGADINHAS ═══

// ─── 7) Barra no começo faz o resolve descartar o resto ───
const { resolve: montar } = require('node:path');

console.log(montar('/Users/igor/projeto', 'public'));    // /Users/igor/projeto/public
console.log(montar('/Users/igor/projeto', '/public'));   // /public  ← perdeu tudo!
// `resolve` lê da direita para a esquerda e para no primeiro caminho absoluto.
// A barra no começo, que na URL do navegador significa "raiz do site", aqui significa
// "raiz do disco". Nunca comece um pedaço de caminho com barra.

// ─── Resumo ───
// 1. `path.join` cola pedaços; `path.resolve` devolve absoluto e é o que se entrega a uma lib.
// 2. `__dirname` é a pasta do arquivo; `process.cwd()` é a do terminal — quase nunca iguais.
// 3. Todo caminho de projeto começa em `path.resolve(__dirname, ...)`.
// 4. `basename`, `extname` e `dirname` desmontam um caminho pronto.
// 5. Pedaço começando com "/" faz o resolve jogar fora o que veio antes.
// 6. Em ESM não existe `__dirname`: use `path.dirname(url.fileURLToPath(import.meta.url))`.
