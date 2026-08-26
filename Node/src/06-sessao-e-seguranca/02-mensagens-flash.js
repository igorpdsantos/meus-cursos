/**
 * Mensagens flash e Post/Redirect/Get
 * Sessão 4 · Rodar: node src/06-sessao-e-seguranca/02-mensagens-flash.js
 *
 * O QUE É: um recado guardado na sessão que é lido UMA vez e apagado sozinho. Serve para
 *          avisar "cadastrado com sucesso" numa requisição que veio depois de um redirect.
 * QUANDO USAR: sempre que um POST terminar em `res.redirect` — cadastro, edição, exclusão,
 *              login e logout.
 * QUANDO NÃO USAR: para dado que a próxima tela precisa de verdade. Flash é recado, não
 *                  transporte de dados: o que a página precisa, ela busca de novo.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O problema: responder o POST com HTML ───
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
let cadastrados = [];
app.post('/', (req, res) => {
  cadastrados.push(req.body.nome);
  res.send(`<h1>Cadastrado!</h1> total: ${cadastrados.length}`);   // ← o problema está aqui
});

const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}/`;
  const enviar = () => fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',
  }).then((r) => r.text());

  console.log('envio    →', await enviar());
  console.log('F5       →', await enviar(), '← o navegador reenviou o formulário');
  console.log('Cadastrados:', cadastrados, '← duas vezes a mesma pessoa');
  servidor.close();
});

// ─── 2) A solução: Post/Redirect/Get ───
const expresso = require('express');

const site = expresso();
site.use(expresso.urlencoded({ extended: true }));
const lista = [];
site.get('/', (req, res) => res.send('total: ' + lista.length));
site.post('/', (req, res) => {
  lista.push(req.body.nome);
  return res.redirect('/');                    // responde com um DESVIO, não com HTML
});

const s2 = site.listen(0, async () => {
  const url = `http://localhost:${s2.address().port}/`;
  const post = await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'nome=Igor', redirect: 'manual',
  });
  console.log('POST responde →', post.status, 'para', post.headers.get('location'));
  console.log('GET depois    →', await fetch(url).then((r) => r.text()));
  console.log('F5 agora repete só o GET, que é inofensivo. Ninguém cadastra de novo.');
  s2.close();
});

// ─── 3) O problema seguinte: o redirect apaga tudo ───
const framework = require('express');
const session = require('express-session');
const flash = require('connect-flash');          // npm install connect-flash

const loja = framework();
loja.use(framework.urlencoded({ extended: true }));
loja.use(session({ secret: 'algo-aleatorio', resave: false, saveUninitialized: false }));
loja.use(flash());                               // DEPOIS da sessão: o flash guarda dentro dela

loja.post('/', (req, res) => {
  req.flash('sucesso', `Formulário recebido. Olá, ${req.body.nome}!`);   // escreve...
  return res.redirect('/');
});
loja.get('/', (req, res) => res.send('recados: ' + JSON.stringify(req.flash('sucesso'))));  // ...e lê

const s3 = loja.listen(0, async () => {
  const url = `http://localhost:${s3.address().port}/`;
  const post = await fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'nome=Igor', redirect: 'manual',
  });
  const cookie = post.headers.get('set-cookie').split(';')[0];

  console.log('GET depois do POST →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));
  console.log('F5 na mesma página →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));
  s3.close();
});
// Ler ESVAZIA a fila: é essa a diferença entre flash e sessão comum. O contador de visitas
// fica; a mensagem passa uma vez e some.

// ═══ NA PRÁTICA ═══

// ─── 4) O controller completo, com erro e sucesso ───
const web = require('express');
const guardaSessao = require('express-session');
const recado = require('connect-flash');

const cadastro = web();
cadastro.use(web.urlencoded({ extended: true }));
cadastro.use(guardaSessao({ secret: 'algo-aleatorio', resave: false, saveUninitialized: false }));
cadastro.use(recado());

cadastro.post('/', (req, res) => {                 // src/controllers/homeController.js
  const nome = (req.body.nome || '').trim();
  if (!nome) req.flash('erro', 'O nome não pode ficar vazio.');
  else req.flash('sucesso', `Formulário recebido. Olá, ${nome}!`);
  return res.redirect('/');                        // redirect com erro TAMBÉM
});
cadastro.get('/', (req, res) => res.json({ sucessos: req.flash('sucesso'), erros: req.flash('erro') }));

const s4 = cadastro.listen(0, async () => {
  const url = `http://localhost:${s4.address().port}/`;
  const enviar = async (corpo) => {
    const post = await fetch(url, {
      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: corpo, redirect: 'manual',
    });
    const cookie = post.headers.get('set-cookie').split(';')[0];
    return fetch(url, { headers: { cookie } }).then((r) => r.text());
  };
  console.log('com nome →', await enviar('nome=Igor'));
  console.log('vazio    →', await enviar('nome=%20%20'));
  s4.close();
});

// ─── 5) O middleware que entrega o flash para as views ───
const servidorWeb = require('express');
const sessaoDeUsuario = require('express-session');
const mensagens = require('connect-flash');

const expoeFlash = (req, res, next) => {         // src/middlewares/middleware.js
  res.locals.sucessos = req.flash('sucesso');    // lê UMA vez, aqui...
  res.locals.erros = req.flash('erro');
  next();
};

const portal = servidorWeb();
portal.use(sessaoDeUsuario({ secret: 'x', resave: false, saveUninitialized: false }));
portal.use(mensagens());
portal.use(expoeFlash);                          // depois do flash(), senão req.flash não existe
portal.get('/avisar', (req, res) => { req.flash('sucesso', 'Contato salvo.'); res.redirect('/'); });
portal.get('/', (req, res) =>
  res.send(res.locals.sucessos.map((m) => `<div class="ok">${m}</div>`).join('') || '(sem recado)'));

const s5 = portal.listen(0, async () => {
  const url = `http://localhost:${s5.address().port}`;
  const ida = await fetch(url + '/avisar', { redirect: 'manual' });
  const cookie = ida.headers.get('set-cookie').split(';')[0];
  const abrir = () => fetch(url + '/', { headers: { cookie } }).then((r) => r.text());
  console.log('página depois do aviso →', await abrir());
  console.log('recarregando           →', await abrir());
  s5.close();
});
// Nenhum controller repete isso: todos os `res.render` já enxergam `sucessos` e `erros`.
// Na view: <% sucessos.forEach((msg) => { %><div class="ok"><%= msg %></div><% }) %>

// ═══ PEGADINHAS ═══

// ─── 6) Ler o flash duas vezes perde a mensagem ───
const aplicacao = require('express');
const guarda = require('express-session');
const aviso = require('connect-flash');

const app6 = aplicacao();
app6.use(guarda({ secret: 'x', resave: false, saveUninitialized: false }));
app6.use(aviso());
app6.get('/', (req, res) => {
  req.flash('sucesso', 'Contato salvo.');
  console.log('1ª leitura (o "confere" do controller):', req.flash('sucesso'));
  console.log('2ª leitura (o middleware da view)     :', req.flash('sucesso'), '← já era');
  res.send('fim');
});

const s6 = app6.listen(0, async () => {
  await fetch(`http://localhost:${s6.address().port}/`);
  console.log('Leia em um lugar só: no middleware que expõe para as views.');
  s6.close();
});

// ─── 7) O valor lido é sempre um array ───
const framework7 = require('express');
const sessao7 = require('express-session');
const flash7 = require('connect-flash');

const app7 = framework7();
app7.use(sessao7({ secret: 'x', resave: false, saveUninitialized: false }));
app7.use(flash7());
app7.get('/', (req, res) => {
  req.flash('erro', 'E-mail inválido.');
  req.flash('erro', 'Senha muito curta.');       // duas mensagens do mesmo tipo
  const erros = req.flash('erro');
  res.json({ tipo: Array.isArray(erros) ? 'array' : typeof erros, erros });
});

const s7 = app7.listen(0, async () => {
  console.log(await fetch(`http://localhost:${s7.address().port}/`).then((r) => r.text()));
  console.log('Por isso na view é forEach, não if: pode haver 0, 1 ou várias.');
  s7.close();
});

// ─── Resumo ───
// 1. Responder um POST com HTML faz o F5 reenviar o formulário: use Post/Redirect/Get.
// 2. O redirect cria uma requisição nova e limpa — o flash é o recado que atravessa.
// 3. `req.flash('sucesso', 'msg')` escreve; `req.flash('sucesso')` lê E APAGA.
// 4. Registre `flash()` depois de `session`, e o middleware que expõe depois de `flash()`.
// 5. Exponha uma vez em `res.locals` e leia na view; ler duas vezes perde a mensagem.
// 6. O valor lido é sempre array — na view, forEach.
