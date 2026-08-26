/**
 * Arquivos estáticos com express.static
 * Sessão 3 · Rodar: node src/04-express/05-arquivos-estaticos.js
 *
 * O QUE É: uma pasta que o Express entrega crua para o navegador — css, imagem, o
 *          bundle.js do frontend. Sem rota, sem controller, sem view.
 * QUANDO USAR: para tudo que é arquivo pronto e público: `public/`.
 * QUANDO NÃO USAR: para arquivo que depende de quem está logado (nota fiscal, comprovante).
 *                  Dentro de public, qualquer um com o link baixa.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Uma linha publica a pasta inteira ───
const express = require('express');
const { writeFileSync, mkdirSync, mkdtempSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const publico = mkdtempSync(join(tmpdir(), 'public-'));                  // no projeto: public/
mkdirSync(join(publico, 'assets', 'css'), { recursive: true });
writeFileSync(join(publico, 'assets', 'css', 'style.css'), 'body { color: teal; }');

const app = express();
app.use(express.static(publico));      // no projeto: express.static(path.resolve(__dirname, 'public'))

const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}`;
  const css = await fetch(url + '/assets/css/style.css');
  console.log('GET /assets/css/style.css →', css.status, await css.text());
  console.log('O nome "public" NÃO aparece na URL: ele é a raiz do que é servido.');
  servidor.close();
});

// ─── 2) O tipo do arquivo vem junto ───
const expresso = require('express');
const { writeFileSync: gravar, mkdtempSync: criarPasta } = require('node:fs');
const { join: unir } = require('node:path');
const { tmpdir: temp } = require('node:os');

const pasta = criarPasta(unir(temp(), 'tipos-'));
gravar(unir(pasta, 'style.css'), 'h1 { color: teal; }');
gravar(unir(pasta, 'bundle.js'), 'console.log("oi")');

const site = expresso();
site.use(expresso.static(pasta));

const s2 = site.listen(0, async () => {
  const url = `http://localhost:${s2.address().port}`;
  for (const arquivo of ['/style.css', '/bundle.js', '/naoexiste.png']) {
    const r = await fetch(url + arquivo);
    console.log(arquivo.padEnd(15), r.status, r.headers.get('content-type'));
  }
  s2.close();
});
// É o Content-Type que faz o navegador aplicar o css em vez de mostrá-lo como texto.
// Arquivo que não existe cai no 404 — o static apenas passa adiante.

// ─── 3) Na view, o caminho começa com barra ───
console.log('<link rel="stylesheet" href="/assets/css/style.css">');
console.log('<script src="/assets/js/bundle.js"></script>');
console.log('\nO <script> vai no fim do <body> (ou com defer): assim o HTML já existe');
console.log('quando o JavaScript procura os elementos da página.');

// ═══ NA PRÁTICA ═══

// ─── 4) A ordem: estáticos antes das rotas ───
const framework = require('express');
const { writeFileSync: escrever, mkdtempSync: novaPasta } = require('node:fs');
const { join: montar } = require('node:path');
const { tmpdir: tmp } = require('node:os');

const dir = novaPasta(montar(tmp(), 'ordem-'));
escrever(montar(dir, 'logo.png'), 'imagem-de-mentira');

const loja = framework();
loja.use(framework.static(dir));                                  // 1º: arquivo pronto
loja.get('/{*qualquer}', (req, res) => res.send('página do site'));  // 2º: rota que pega o resto

const s4 = loja.listen(0, async () => {
  const url = `http://localhost:${s4.address().port}`;
  console.log('/logo.png →', await fetch(url + '/logo.png').then((r) => r.text()));
  console.log('/contato  →', await fetch(url + '/contato').then((r) => r.text()));
  s4.close();
});
// Invertido, a rota curinga responderia "página do site" também para /logo.png.
// Estáticos e parsers vêm sempre antes de `app.use(routes)`.

// ─── 5) Um prefixo na URL ───
const web = require('express');
const { writeFileSync: salvar, mkdtempSync: abrir } = require('node:fs');
const { join: caminho } = require('node:path');
const { tmpdir: pastaTemp } = require('node:os');

const arquivos = abrir(caminho(pastaTemp(), 'prefixo-'));
salvar(caminho(arquivos, 'logo.png'), 'imagem-de-mentira');

const portal = web();
portal.use('/static', web.static(arquivos));      // a pasta continua a mesma; muda só a URL

const s5 = portal.listen(0, async () => {
  const url = `http://localhost:${s5.address().port}`;
  const status = (caminho) => fetch(url + caminho).then((r) => r.status);
  console.log('/static/logo.png →', await status('/static/logo.png'));
  console.log('/logo.png        →', await status('/logo.png'), '← sem o prefixo, 404');
  s5.close();
});
// Útil quando o site já tem uma rota /assets, ou para colocar um CDN na frente depois.

// ─── 6) public/ é a SAÍDA do build ───
console.log('frontend/   → o que VOCÊ escreve (entra no webpack)');
console.log('public/     → o que o webpack GERA e o Express serve');
console.log('O Express nunca olha para frontend/. O navegador nunca vê frontend/.');
// Por isso `public/assets/js/bundle.js` não se edita na mão: o próximo build apaga.

// ═══ PEGADINHAS ═══

// ─── 7) Caminho relativo quebra em rota aninhada ───
const servidorWeb = require('express');
const { writeFileSync: por, mkdirSync: criarArvore, mkdtempSync: raiz } = require('node:fs');
const { join: ligar } = require('node:path');
const { tmpdir: t } = require('node:os');

const estaticos = raiz(ligar(t(), 'relativo-'));
criarArvore(ligar(estaticos, 'assets'), { recursive: true });
por(ligar(estaticos, 'assets', 'app.js'), 'console.log("carregou")');

const app7 = servidorWeb();
app7.use(servidorWeb.static(estaticos));
app7.get('/produtos/:id', (req, res) => res.send('produto ' + req.params.id));

const s7 = app7.listen(0, async () => {
  const url = `http://localhost:${s7.address().port}`;
  // Em /produtos/1, "./assets/app.js" faz o navegador pedir /produtos/assets/app.js:
  const status = (caminho) => fetch(url + caminho).then((r) => r.status);
  console.log('relativo  → /produtos/assets/app.js →', await status('/produtos/assets/app.js'));
  console.log('com barra → /assets/app.js          →', await status('/assets/app.js'));
  s7.close();
});
// A página abre sem estilo e sem script, e nada no terminal avisa. Sempre "/assets/...".

// ─── Resumo ───
// 1. `app.use(express.static(path.resolve(__dirname, 'public')))` publica a pasta inteira.
// 2. O nome da pasta some da URL: public/logo.png vira /logo.png.
// 3. Registre os estáticos antes das rotas; arquivo inexistente segue para o roteador.
// 4. Nos links da view, sempre `/assets/...` com barra na frente.
// 5. public/ é saída de build — não edite arquivo gerado lá dentro.
// 6. Tudo em public é público: arquivo privado nunca mora ali.
