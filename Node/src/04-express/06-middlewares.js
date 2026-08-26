/**
 * Middlewares — a fila por onde toda requisição passa
 * Sessão 4 · Rodar: node src/04-express/06-middlewares.js
 *
 * O QUE É: uma função `(req, res, next)` que roda ANTES da rota. Ela pode olhar o pedido,
 *          acrescentar informação e chamar `next()` para passar adiante — ou responder e
 *          encerrar ali mesmo.
 * QUANDO USAR: para o que vale em várias rotas: log, autenticação, parser, mensagem flash,
 *              contador de visitas.
 * QUANDO NÃO USAR: para regra que só existe em uma rota — isso é código do controller.
 */

// ═══ ESSENCIAL ═══

// ─── 1) A fila roda na ordem de registro ───
const express = require('express');

const app = express();
app.use((req, res, next) => { console.log('1º middleware: passei por aqui'); next(); });
app.use((req, res, next) => { console.log('2º middleware: passei por aqui'); next(); });
app.get('/', (req, res) => { console.log('3º: a rota responde'); res.send('pronto'); });

const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}/`;
  console.log('Navegador recebeu:', await fetch(url).then((r) => r.text()));
  servidor.close();
});
// `next()` é literalmente "chame o próximo da fila". O Express é essa lista, mais o roteador.

// ─── 2) Middleware que ENRIQUECE o pedido ───
const expresso = require('express');

const site = expresso();
site.use((req, res, next) => {
  req.recebidoEm = new Date('2026-08-20T10:30:00');   // qualquer rota abaixo enxerga
  next();
});
site.get('/pedidos', (req, res) =>
  res.send('pedido recebido às ' + req.recebidoEm.toLocaleTimeString('pt-BR')));

const s2 = site.listen(0, async () => {
  console.log(await fetch(`http://localhost:${s2.address().port}/pedidos`).then((r) => r.text()));
  s2.close();
});
// É assim que `express.urlencoded` entrega `req.body` e o `express-session` entrega
// `req.session`: eles penduram coisa no req e chamam next().

// ─── 3) Esquecer o next() trava a requisição ───
const framework = require('express');

const travado = framework();
travado.use((req, res, next) => { console.log('middleware rodou... e não chamou next()'); });
travado.get('/', (req, res) => res.send('esta linha nunca roda'));

const s3 = travado.listen(0, async () => {
  const controle = new AbortController();
  setTimeout(() => controle.abort(), 200);          // o navegador ficaria girando; aqui desistimos
  try {
    await fetch(`http://localhost:${s3.address().port}/`, { signal: controle.signal });
    console.log('respondeu');
  } catch {
    console.log('Nenhuma resposta: sem next(), o pedido morre na fila e o navegador espera.');
  }
  s3.close();
  s3.closeAllConnections();
});
// Ou você responde, ou você chama next(). Fazer os dois dá "headers already sent".

// ═══ NA PRÁTICA ═══

// ─── 4) Middleware que BARRA em vez de passar ───
const expr = require('express');

const exigirLogin = (req, res, next) => {
  if (req.query.token !== 'secreto') return res.status(401).send('faça login');   // encerra
  next();                                                                        // libera
};

const painel = expr();
painel.get('/painel', exigirLogin, (req, res) => res.send('bem-vindo ao painel'));
painel.get('/', (req, res) => res.send('página pública'));      // não passa pelo exigirLogin

const s4 = painel.listen(0, async () => {
  const url = `http://localhost:${s4.address().port}`;
  const ver = (c) => fetch(url + c).then(async (r) => `${r.status} ${await r.text()}`);
  console.log('/                    →', await ver('/'));
  console.log('/painel              →', await ver('/painel'));
  console.log('/painel?token=secreto →', await ver('/painel?token=secreto'));
  s4.close();
});
// Passado no `route.get(caminho, middleware, controller)`, ele vale só naquela rota.

// ─── 5) Os três alcances: global, por prefixo e por rota ───
const web = require('express');

const marcar = (nome) => (req, res, next) => { req.passou = (req.passou || []).concat(nome); next(); };

const loja = web();
loja.use(marcar('global'));                       // toda requisição
loja.use('/admin', marcar('prefixo /admin'));     // só o que começa com /admin
loja.get('/admin/usuarios', marcar('só esta rota'), (req, res) => res.send(req.passou.join(' → ')));
loja.get('/', (req, res) => res.send(req.passou.join(' → ')));

const s5 = loja.listen(0, async () => {
  const url = `http://localhost:${s5.address().port}`;
  console.log('/               →', await fetch(url + '/').then((r) => r.text()));
  console.log('/admin/usuarios →', await fetch(url + '/admin/usuarios').then((r) => r.text()));
  s5.close();
});

// ─── 6) res.locals: do middleware direto para a view ───
const servidorWeb = require('express');

const contaVisitas = (req, res, next) => {        // src/middlewares/middleware.js
  res.locals.visitas = 7;                         // no projeto vem de req.session.visitas
  next();
};

const portal = servidorWeb();
portal.use(contaVisitas);
portal.get('/', (req, res) => res.send(`<footer>${res.locals.visitas} visitas</footer>`));

const s6 = portal.listen(0, async () => {
  console.log(await fetch(`http://localhost:${s6.address().port}/`).then((r) => r.text()));
  s6.close();
});
// `res.locals` é enxergado pela view sem passar pelo `res.render`. É por aí que o contador
// de visitas e as mensagens flash chegam no rodapé de todas as páginas.

// ─── 7) O middleware de erro tem QUATRO parâmetros ───
const aplicacao = require('express');

const api = aplicacao();
api.get('/relatorio', (req, res) => { throw new Error('MongoDB fora do ar'); });
api.use((erro, req, res, next) => {               // 4 parâmetros = tratador de erro
  console.log('Erro capturado:', erro.message);
  res.status(500).send('Algo deu errado. Tente de novo.');
});

const s7 = api.listen(0, async () => {
  const r = await fetch(`http://localhost:${s7.address().port}/relatorio`);
  console.log('O navegador recebeu:', r.status, await r.text());
  s7.close();
});
// Registre por último, depois do `app.use(routes)` — é a rede de segurança. Com três
// parâmetros o Express acha que é middleware comum e nunca chama.

// ═══ PEGADINHAS ═══

// ─── 8) Registrar as rotas antes dos middlewares ───
const servidorFalho = require('express');

const errado = servidorFalho();
errado.get('/', (req, res) => res.send('body: ' + JSON.stringify(req.body)));
errado.use(servidorFalho.urlencoded({ extended: true }));   // nunca chega a rodar

const s8 = errado.listen(0, async () => {
  const url = `http://localhost:${s8.address().port}/`;
  console.log('rota registrada primeiro →', await fetch(url).then((r) => r.text()));
  console.log('A ordem certa no server.js:');
  console.log(['express.urlencoded → preenche req.body',
    'session            → cria req.session',
    'flash()            → cria req.flash (guarda na sessão)',
    'expoeFlash         → lê req.flash e joga em res.locals',
    'routes             → os controllers, que usam tudo acima'].join('\n'));
  s8.close();
});
// A ordem não é estilo, é dependência: cada peça precisa da anterior. `flash()` antes de
// `session` derruba o servidor; `expoeFlash` antes de `flash()` dá "req.flash is not a function".

// ─── Resumo ───
// 1. Middleware é `(req, res, next)`; sem `next()` a requisição trava.
// 2. Roda na ordem de registro: parsers e estáticos antes das rotas, sempre.
// 3. Serve para enriquecer o pedido (`req.body`, `req.session`) ou barrar (`res.status(401)`).
// 4. `res.locals` é a ponte do middleware para todas as views.
// 5. `app.use(fn)` é global, `app.use('/admin', fn)` é por prefixo, no `route.get` é por rota.
// 6. Handler de erro tem 4 parâmetros e vai por último.
