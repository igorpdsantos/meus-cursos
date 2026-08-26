/**
 * Views com EJS
 * Sessão 3 · Rodar: node src/04-express/04-views-com-ejs.js
 *
 * O QUE É: uma view é um arquivo HTML com buracos. O EJS é a engine que preenche esses
 *          buracos com os dados que o controller entrega em `res.render('index', { ... })`.
 * QUANDO USAR: quando o servidor devolve PÁGINA pronta — site institucional, painel,
 *              formulário. Tira o HTML de dentro das aspas do controller.
 * QUANDO NÃO USAR: em API consumida por React/Vue/app. Aí o servidor devolve `res.json`
 *                  e quem monta a tela é o frontend.
 */

// ═══ ESSENCIAL ═══

// ─── 1) As três marcas do EJS ───
const ejs = require('ejs');   // npm install ejs

const template = `
  <h1><%= titulo %></h1>
  <%- destaque %>
  <% if (itens > 0) { %><p>Você tem <%= itens %> itens.</p><% } %>
`;

const dados = { titulo: 'Carrinho <b>novo</b>', destaque: '<b>Promoção!</b>', itens: 3 };
console.log(ejs.render(template, dados).trim());
// <%= imprime ESCAPANDO html (o <b> do título virou texto) · <%- imprime cru · <% só executa.

// ─── 2) O servidor renderizando uma view ───
const express = require('express');
const { writeFileSync, mkdtempSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const views = mkdtempSync(join(tmpdir(), 'views-'));                      // no projeto: src/views/
writeFileSync(join(views, 'index.ejs'), '<h1>Testes</h1><p>Olá, <%= nome %>!</p>');

const app = express();
app.set('views', views);              // onde procurar os arquivos .ejs
app.set('view engine', 'ejs');        // quem sabe preencher — não precisa dar require no ejs

app.get('/', (req, res) => res.render('index', { nome: 'Igor' }));

const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}/`;
  console.log(await fetch(url).then((r) => r.text()));
  servidor.close();
});
// No projeto: app.set('views', path.resolve(__dirname, 'src', 'views')).

// ─── 3) Listar dados com forEach ───
const motor = require('ejs');

const lista = `<ul>
<% produtos.forEach((p) => { %>  <li><%= p.nome %> — R$ <%= p.preco.toFixed(2) %></li>
<% }) %></ul>`;

console.log(motor.render(lista, {
  produtos: [{ nome: 'Teclado', preco: 199.9 }, { nome: 'Mouse', preco: 89.5 }],
}));
// É JavaScript de verdade dentro das tags: forEach, map, if, template string, tudo vale.

// ═══ NA PRÁTICA ═══

// ─── 4) Controller e view, o par completo ───
const web = require('express');
const { writeFileSync: gravar, mkdtempSync: criarPasta } = require('node:fs');
const { join: unir } = require('node:path');
const { tmpdir: temp } = require('node:os');

const pasta = criarPasta(unir(temp(), 'form-'));
gravar(unir(pasta, 'index.ejs'), `<h1>Contato</h1>
<% if (typeof nome !== 'undefined') { %><p>Recebido, <%= nome %>!</p><% } %>`);

const HomeController = {                                     // src/controllers/homeController.js
  paginaInicial: (req, res) => res.render('index'),          // GET não manda nada
  trataPost: (req, res) => res.render('index', { nome: req.body.nome }),
};

const site = web();
site.use(web.urlencoded({ extended: true }));
site.set('views', pasta);
site.set('view engine', 'ejs');
site.get('/', HomeController.paginaInicial);
site.post('/', HomeController.trataPost);

const s4 = site.listen(0, async () => {
  const url = `http://localhost:${s4.address().port}/`;
  console.log('GET  →', await fetch(url).then((r) => r.text()));
  console.log('POST →', await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',
  }).then((r) => r.text()));
  s4.close();
});
// O `typeof nome !== 'undefined'` protege o GET, que renderiza a mesma view sem passar nada.

// ─── 5) res.locals: dado que aparece em TODA view ───
const servidorWeb = require('express');
const { writeFileSync: escrever, mkdtempSync: novaPasta } = require('node:fs');
const { join: montar } = require('node:path');
const { tmpdir: tmp } = require('node:os');

const dir = novaPasta(montar(tmp(), 'locals-'));
escrever(montar(dir, 'topo.ejs'), '<header><%= usuario %> · <%= visitas %> visitas</header><%= pagina %>');

const painel = servidorWeb();
painel.set('views', dir);
painel.set('view engine', 'ejs');
painel.use((req, res, next) => {                  // um middleware escreve...
  res.locals.usuario = 'Igor';
  res.locals.visitas = 7;
  next();
});
painel.get('/', (req, res) => res.render('topo', { pagina: 'início' }));   // ...e o render só completa

const s5 = painel.listen(0, async () => {
  const url = `http://localhost:${s5.address().port}/`;
  console.log(await fetch(url).then((r) => r.text()));
  s5.close();
});
// É assim que usuário logado, contador de visitas e mensagem flash chegam em todas as
// páginas sem o controller repetir isso em cada `res.render`.

// ─── 6) include: cabeçalho e rodapé em um lugar só ───
const template2 = require('ejs');
const { writeFileSync: salvar, readFileSync: ler, mkdtempSync: abrirPasta } = require('node:fs');
const { join: caminho } = require('node:path');
const { tmpdir: pastaTemp } = require('node:os');

const base = abrirPasta(caminho(pastaTemp(), 'partials-'));                  // no projeto: src/views/
salvar(caminho(base, 'cabecalho.ejs'), '<header><h1><%= titulo %></h1></header>');
salvar(caminho(base, 'pagina.ejs'), `<%- include('cabecalho', { titulo: 'Produtos' }) %>
<main>lista aqui</main>`);

const pagina = caminho(base, 'pagina.ejs');
// filename diz ao EJS onde procurar o arquivo do include:
console.log(template2.render(ler(pagina, 'utf8'), {}, { filename: pagina }));
// include usa <%- (sem escape): o pedaço incluído JÁ é HTML. Com <%= as tags apareceriam
// como texto na tela.

// ═══ PEGADINHAS ═══

// ─── 7) Variável que a view espera e o controller não mandou ───
const engine = require('ejs');

try {
  console.log(engine.render('<p>Olá, <%= nome %>!</p>', { titulo: 'Contato' }));   // esqueceu "nome"
} catch (erro) {
  console.log('Na tela do usuário aparece:', erro.message.split('\n').pop());
}
const protegida = "<% if (typeof nome !== 'undefined') { %><p>Olá!</p><% } %>";
console.log('Defesa:', engine.render(protegida, {}) || '(nada, e sem quebrar)');
// "nome is not defined" é o erro mais comum de EJS: a view não adivinha o que o controller
// esqueceu. Ou proteja com `typeof`, ou mande sempre um valor padrão.

// ─── Resumo ───
// 1. `app.set('views', ...)` + `app.set('view engine', 'ejs')` fazem o render achar o .ejs.
// 2. `<%= %>` imprime escapado, `<%- %>` imprime HTML cru, `<% %>` só executa.
// 3. O objeto do `res.render('index', { nome })` vira variável dentro da view.
// 4. `res.locals` vale para todas as views — bom para usuário logado e flash.
// 5. `include` corta cabeçalho e rodapé repetidos, e vai com `<%- %>`.
// 6. Variável não enviada estoura "not defined": proteja com `typeof` ou mande padrão.
