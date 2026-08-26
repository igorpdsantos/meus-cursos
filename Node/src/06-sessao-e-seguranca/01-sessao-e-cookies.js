/**
 * Sessão e cookies
 * Sessão 4 · Rodar: node src/06-sessao-e-seguranca/01-sessao-e-cookies.js
 *
 * O QUE É: HTTP não tem memória — cada requisição chega como se fosse a primeira. A sessão
 *          é o crachá: o servidor guarda os dados e manda ao navegador um cookie só com o id.
 * QUANDO USAR: para lembrar quem está logado, o que tem no carrinho, a preferência de tema.
 * QUANDO NÃO USAR: para guardar muita coisa. A sessão é lida em TODA requisição; jogue lá
 *                  o id do usuário, não o perfil inteiro.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Sem sessão, o servidor não lembra de nada ───
const express = require('express');

const app = express();
let contador = 0;
app.get('/', (req, res) => res.send('visitas no servidor inteiro: ' + ++contador));

const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}/`;
  console.log(await fetch(url).then((r) => r.text()));
  console.log(await fetch(url).then((r) => r.text()), '← e se fosse OUTRA pessoa? Mesmo número.');
  console.log('Um contador solto conta TODO MUNDO junto. É por isso que a sessão existe.');
  servidor.close();
});

// ─── 2) Com sessão, cada visitante tem o seu ───
const expresso = require('express');
const session = require('express-session');       // npm install express-session

const site = expresso();
site.use(session({
  secret: 'algo-bem-aleatorio',                   // no projeto isto vem do .env
  resave: false,                                  // não regrava a sessão se nada mudou
  saveUninitialized: false,                       // não cria sessão para quem só passou pelo site
}));
site.get('/', (req, res) => {
  req.session.visitas = (req.session.visitas || 0) + 1;   // escrever é só isto
  res.send('suas visitas: ' + req.session.visitas);
});

const s2 = site.listen(0, async () => {
  const url = `http://localhost:${s2.address().port}/`;
  const primeira = await fetch(url);
  const cookie = primeira.headers.get('set-cookie').split(';')[0];   // o navegador guarda sozinho

  console.log('1ª visita  →', await primeira.text());
  console.log('2ª visita  →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));
  console.log('3ª visita  →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));
  console.log('sem cookie →', await fetch(url).then((r) => r.text()), '← janela anônima');
  s2.close();
});

// ─── 3) O que viaja no cookie é só o id ───
const framework = require('express');
const sessao = require('express-session');

const loja = framework();
loja.use(sessao({ secret: 'algo-bem-aleatorio', resave: false, saveUninitialized: false }));
loja.get('/', (req, res) => {
  req.session.usuario = 'Igor';
  req.session.carrinho = ['Teclado', 'Mouse'];
  res.send('guardado');
});

const s3 = loja.listen(0, async () => {
  const resposta = await fetch(`http://localhost:${s3.address().port}/`);
  const cookie = resposta.headers.get('set-cookie');
  console.log('Nome do cookie   :', cookie.split('=')[0]);
  console.log('Tem "Igor" nele? :', cookie.includes('Igor'), '← os dados ficam no SERVIDOR');
  console.log('Tem HttpOnly?    :', cookie.includes('HttpOnly'), '← o JS da página não lê o cookie');
  s3.close();
});
// Por isso o `secret` importa tanto: ele assina o id. Quem tem o segredo forja um cookie
// e vira qualquer usuário — e é por isso que ele mora no .env, nunca no código.

// ═══ NA PRÁTICA ═══

// ─── 4) Login: o padrão de todo sistema com usuário ───
const web = require('express');
const guardaSessao = require('express-session');

const painel = web();
painel.use(web.urlencoded({ extended: true }));
painel.use(guardaSessao({ secret: 'algo-bem-aleatorio', resave: false, saveUninitialized: false }));

painel.post('/login', (req, res) => {
  if (req.body.senha !== '1234') return res.status(401).send('senha errada');
  req.session.usuario = req.body.email;           // o "crachá" é isto: um dado na sessão
  res.send('bem-vindo, ' + req.session.usuario);
});
painel.get('/painel', (req, res) => {
  if (!req.session.usuario) return res.status(401).send('faça login primeiro');
  res.send('painel de ' + req.session.usuario);
});
painel.post('/sair', (req, res) => req.session.destroy(() => res.send('até logo')));

const s4 = painel.listen(0, async () => {
  const url = `http://localhost:${s4.address().port}`;
  console.log('painel sem login →', await fetch(url + '/painel').then((r) => r.text()));

  const entrada = await fetch(url + '/login', {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'email=igor@email.com&senha=1234',
  });
  const cookie = entrada.headers.get('set-cookie').split(';')[0];
  const verPainel = () => fetch(url + '/painel', { headers: { cookie } }).then((r) => r.text());

  console.log('login            →', await entrada.text());
  console.log('painel com login →', await verPainel());

  await fetch(url + '/sair', { method: 'POST', headers: { cookie } });
  console.log('depois do logout →', await verPainel());
  s4.close();
});

// ─── 5) Onde as sessões ficam guardadas ───
console.log('Sem store (o padrão) → memória do processo:');
console.log('  · some tudo a cada restart (e o nodemon reinicia o dia inteiro)');
console.log('  · a memória cresce sem parar conforme os acessos aumentam');
console.log('Com connect-mongo    → grava no MongoDB, reaproveitando a conexão do Mongoose:');
console.log(`
  store: MongoStore.create({
    clientPromise: mongoose.connection.asPromise().then((conn) => conn.getClient()),
    dbName: process.env.MONGODB_DBNAME,   // sem isto as sessões vão para o banco "test"
  }),`.trim());
// Reaproveitar a conexão importa: abrir uma segunda só para as sessões é conexão jogada fora.

// ─── 6) As opções do cookie que são segurança ───
const opcoes = [
  ['httpOnly: true', 'o JavaScript da página não lê o cookie — barra roubo por XSS'],
  ['sameSite: "lax"', 'o cookie não viaja em pedido vindo de outro site — defesa contra CSRF'],
  ['secure: true', 'só trafega em HTTPS. Em produção, ligue; no localhost, false'],
  ['maxAge: 604800000', 'validade em MILISSEGUNDOS — aqui, uma semana'],
];

for (const [opcao, porque] of opcoes) console.log(opcao.padEnd(20), porque);
console.log('\nUma semana em ms:', 1000 * 60 * 60 * 24 * 7);

// ═══ PEGADINHAS ═══

// ─── 7) Sessão registrada depois da rota não existe ───
const servidorWeb = require('express');
const memoria = require('express-session');

const errado = servidorWeb();
errado.get('/', (req, res) => res.send('req.session é ' + req.session));
errado.use(memoria({ secret: 'x', resave: false, saveUninitialized: false }));   // tarde demais

const s7 = errado.listen(0, async () => {
  const url = `http://localhost:${s7.address().port}/`;
  console.log('rota antes da sessão →', await fetch(url).then((r) => r.text()));
  console.log('A ordem no server.js: parser → session → flash → middlewares → routes.');
  s7.close();
});
// `flash()` antes de `session` derruba o servidor, porque o connect-flash guarda dentro
// de `req.session`. A ordem aqui é dependência, não estilo.

// ─── Resumo ───
// 1. HTTP não lembra nada; a sessão é o crachá — cookie com o id, dados no servidor.
// 2. Usar é só escrever e ler `req.session.algo`.
// 3. `secret` assina o cookie e mora no .env; `req.session.destroy()` faz o logout.
// 4. Sempre com store (connect-mongo): memória perde tudo no restart e vaza RAM.
// 5. `httpOnly`, `sameSite: 'lax'` e, em produção, `secure: true`.
// 6. Ordem no server.js: parser → session → flash → middlewares → routes.
