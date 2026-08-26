/**
 * Router e Controllers — separar rota de lógica
 * Sessão 2 · Rodar: node src/04-express/03-router-e-controllers.js
 *
 * O QUE É: `express.Router()` é um mini-app só com rotas; o controller é o arquivo onde
 *          moram as funções que respondem. O router diz QUEM responde, o controller diz COMO.
 * QUANDO USAR: assim que o server.js passar de umas poucas rotas — a partir daí ele vira
 *              uma parede de funções e ninguém acha nada.
 * QUANDO NÃO USAR: em um exemplo de três rotas para aprender. Separar antes da hora só
 *                  espalha código por arquivos vazios.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O Router é um mini-app de rotas ───
const express = require('express');

const route = express.Router();                   // vive em routes.js
route.get('/', (req, res) => res.send('página inicial'));
route.get('/contato', (req, res) => res.send('fale conosco'));

const app = express();
app.use(route);                                   // server.js: app.use(routes)

const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}`;
  console.log('GET /        →', await fetch(url).then((r) => r.text()));
  console.log('GET /contato →', await fetch(url + '/contato').then((r) => r.text()));
  servidor.close();
});
// No projeto, routes.js termina com `module.exports = route;` e o server.js dá require nele.

// ─── 2) A função é PASSADA, não chamada ───
const expresso = require('express');

const HomeController = {                          // vive em controllers/homeController.js
  paginaInicial: (req, res) => res.send('formulário'),
  trataPost: (req, res) => res.send(`Recebido! Nome: ${req.body.nome}`),
};

const rotas = expresso.Router();
rotas.get('/', HomeController.paginaInicial);     // sem parênteses: o Express chama na hora certa
rotas.post('/', HomeController.trataPost);

const site = expresso();
site.use(expresso.urlencoded({ extended: true }));
site.use(rotas);

const s2 = site.listen(0, async () => {
  const url = `http://localhost:${s2.address().port}/`;
  console.log('GET  / →', await fetch(url).then((r) => r.text()));
  console.log('POST / →', await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',
  }).then((r) => r.text()));
  s2.close();
});
// `HomeController.paginaInicial()` com parênteses chamaria a função AGORA e registraria o
// retorno dela (undefined) como se fosse a rota.

// ─── 3) Os três arquivos, e o que cada um exporta ───
console.log('controllers/homeController.js  →  exports.paginaInicial = (req, res) => ...');
console.log('routes.js                      →  module.exports = route');
console.log('server.js                      →  const routes = require("./routes.js")');
console.log('                                  app.use(routes)');
// É a divisão de qualquer projeto Express que você vai abrir por aí: server.js sobe o
// servidor, routes.js mapeia caminho → função, o controller responde.

// ═══ NA PRÁTICA ═══

// ─── 4) Um router por assunto, com prefixo ───
const framework = require('express');

const produtos = framework.Router();
produtos.get('/', (req, res) => res.send('lista de produtos'));          // atende /produtos
produtos.get('/:id', (req, res) => res.send('produto ' + req.params.id)); // atende /produtos/42

const clientes = framework.Router();
clientes.get('/', (req, res) => res.send('lista de clientes'));

const loja = framework();
loja.use('/produtos', produtos);                  // o prefixo fica AQUI...
loja.use('/clientes', clientes);                  // ...e some de dentro do router

const s4 = loja.listen(0, async () => {
  const url = `http://localhost:${s4.address().port}`;
  const pedir = (c) => fetch(url + c).then((r) => r.text());
  console.log('/produtos     →', await pedir('/produtos'));
  console.log('/produtos/42  →', await pedir('/produtos/42'));
  console.log('/clientes     →', await pedir('/clientes'));
  s4.close();
});

// ─── 5) O controller responde, não retorna ───
const expr = require('express');

const ClienteController = {
  index: (req, res) => res.json([{ nome: 'Ana' }, { nome: 'Bruno' }]),
  show: (req, res) => {
    const encontrado = req.params.id === '1';
    if (!encontrado) return res.status(404).send('Cliente não encontrado');   // return encerra
    res.json({ id: 1, nome: 'Ana' });
  },
};

const api = expr();
api.get('/clientes', ClienteController.index);
api.get('/clientes/:id', ClienteController.show);

const s5 = api.listen(0, async () => {
  const url = `http://localhost:${s5.address().port}/clientes`;
  console.log('index →', await fetch(url).then((r) => r.text()));
  console.log('show 1 →', await fetch(url + '/1').then((r) => r.text()));
  console.log('show 9 →', await fetch(url + '/9').then(async (r) => `${r.status} ${await r.text()}`));
  s5.close();
});
// Quem chama o controller é o Express, e ele ignora qualquer valor devolvido. O `return`
// serve só para parar a função ali — sem ele, o código continua e tenta responder de novo.

// ─── 6) Nomes de ação que se explicam ───
const acoes = [
  ['index', 'GET    /produtos       lista tudo'],
  ['show', 'GET    /produtos/:id   mostra um'],
  ['create', 'GET    /produtos/novo  formulário de cadastro'],
  ['store', 'POST   /produtos       salva o que o formulário mandou'],
  ['update', 'PUT    /produtos/:id   atualiza'],
  ['destroy', 'DELETE /produtos/:id   apaga'],
];

for (const [nome, rota] of acoes) console.log(nome.padEnd(9), rota);
// Não é regra do Express, é convenção — mas é a que a maioria dos projetos segue.

// ═══ PEGADINHAS ═══

// ─── 7) Esquecer o module.exports do routes.js ───
const { writeFileSync, mkdtempSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const pasta = mkdtempSync(join(tmpdir(), 'rotas-'));
writeFileSync(join(pasta, 'routes.js'), `
  const rotas = [];               // definiu as rotas...
  rotas.push({ caminho: '/' });   // ...e esqueceu o module.exports no fim
`);

const routes = require(join(pasta, 'routes.js'));
console.log('O que o require devolveu:', routes);
console.log('app.use(', routes, ') → TypeError: Router.use() requires a middleware function');
// Erro clássico de quem cria o routes.js na mão: tudo certo, menos a última linha.

// ─── Resumo ───
// 1. `express.Router()` cria um mini-app de rotas; `module.exports = route` no fim do arquivo.
// 2. O router só mapeia caminho → função; a lógica fica no controller.
// 3. Passe a função sem parênteses: `HomeController.paginaInicial`.
// 4. No controller, `exports.nomeDaAcao = (req, res) => ...`.
// 5. Um router por assunto, com o prefixo no `app.use` e caminho curto lá dentro.
// 6. O controller responde (`res.send`); o `return` só serve para parar a função.
