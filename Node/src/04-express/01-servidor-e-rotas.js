/**
 * Servidor e rotas com Express
 * Sessão 1 · Rodar: node src/04-express/01-servidor-e-rotas.js
 *
 * O QUE É: o Express é a biblioteca que transforma "programa Node" em "servidor web":
 *          uma rota é um par método + caminho ligado a uma função que responde.
 * QUANDO USAR: em qualquer site ou API em Node. Ele resolve rota, corpo, cabeçalho e
 *              erro, coisas que o módulo http cru deixa por sua conta.
 * QUANDO NÃO USAR: em script que roda e acaba (relatório, migração). Servidor fica de pé
 *                  esperando pedido; script termina e devolve o terminal.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O servidor mínimo ───
const express = require('express');   // npm init -y && npm install express

const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/contato', (req, res) => res.send('Obrigado por entrar em contato conosco!'));

// No projeto é `app.listen(3000)` e o servidor fica de pé. Aqui a porta 0 deixa o sistema
// escolher uma livre, o próprio exemplo faz os pedidos e no fim fecha — senão não terminaria.
const servidor = app.listen(0, async () => {
  const url = `http://localhost:${servidor.address().port}`;
  console.log('GET /        →', await fetch(url).then((r) => r.text()));
  console.log('GET /contato →', await fetch(url + '/contato').then((r) => r.text()));
  console.log('GET /nada    →', await fetch(url + '/nada').then((r) => r.status), '← 404 automático');
  servidor.close();
});

// ─── 2) req: tudo que o navegador mandou ───
const expresso = require('express');

const site = expresso();
site.get('/produtos/:id', (req, res) => {
  console.log('método:', req.method, '| caminho:', req.path);
  console.log('params:', { ...req.params }, '← pedaço da rota');
  console.log('query :', { ...req.query }, '← depois do "?"');
  res.send('ok');
});

const s2 = site.listen(0, async () => {
  await fetch(`http://localhost:${s2.address().port}/produtos/42?cor=preto&pagina=2`);
  s2.close();
});

// ─── 3) res: as formas de responder ───
const expr = require('express');

const api = expr();
api.get('/texto', (req, res) => res.send('<h1>Uma página</h1>'));
api.get('/dados', (req, res) => res.json({ produto: 'Teclado', preco: 199.9 }));
api.get('/sumiu', (req, res) => res.status(404).send('Produto não encontrado'));
api.get('/antigo', (req, res) => res.redirect('/dados'));

const s3 = api.listen(0, async () => {
  const url = `http://localhost:${s3.address().port}`;
  const texto = await fetch(url + '/texto');
  const dados = await fetch(url + '/dados');
  const sumiu = await fetch(url + '/sumiu');
  const antigo = await fetch(url + '/antigo', { redirect: 'manual' });

  console.log('send   →', texto.status, texto.headers.get('content-type'), await texto.text());
  console.log('json   →', dados.status, dados.headers.get('content-type'), await dados.text());
  console.log('status →', sumiu.status, await sumiu.text());
  console.log('redirect →', antigo.status, 'para', antigo.headers.get('location'));
  s3.close();
});

// ═══ NA PRÁTICA ═══

// ─── 4) O mesmo servidor sem Express, para ver o que ele economiza ───
const http = require('node:http');

const servidorCru = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') return res.end('Hello World!');
  if (req.method === 'GET' && req.url === '/contato') return res.end('Obrigado por entrar em contato!');
  res.statusCode = 404;                       // no Express isso já vem pronto
  res.end('Cannot GET ' + req.url);
});

servidorCru.listen(0, async () => {
  const url = `http://localhost:${servidorCru.address().port}`;
  console.log('GET /     →', await fetch(url).then((r) => r.text()));
  console.log('GET /nada →', await fetch(url + '/nada').then((r) => r.status));
  servidorCru.close();
});
// Cada `if` aqui vira um `app.get` lá. Com dez rotas, parâmetro na URL e corpo de
// formulário para ler, essa conta não fecha mais.

// ─── 5) O mesmo caminho, métodos diferentes ───
const framework = require('express');

const loja = framework();
loja.use(framework.urlencoded({ extended: true }));            // preenche req.body
loja.get('/contato', (req, res) => res.send('formulário de contato'));
loja.post('/contato', (req, res) => res.send(`recebido de ${req.body.nome}`));

const s5 = loja.listen(0, async () => {
  const url = `http://localhost:${s5.address().port}/contato`;
  console.log('GET  /contato →', await fetch(url).then((r) => r.text()));
  console.log('POST /contato →', await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'nome=Igor',
  }).then((r) => r.text()));
  s5.close();
});
// Formulário HTML só faz GET e POST. PUT e DELETE aparecem em API chamada por fetch.

// ─── 6) A porta vem do ambiente ───
const servidorWeb = require('express')();

const porta = process.env.PORT || 3000;   // a hospedagem define PORT; na sua máquina, 3000
servidorWeb.get('/', (req, res) => res.send('no ar'));

console.log('Vai subir em http://localhost:' + porta);
console.log('process.env.PORT está definido?', Boolean(process.env.PORT));
// O mesmo código sobe na sua máquina e no servidor sem editar nada — por isso essa linha
// aparece em todo projeto Node.

// ═══ PEGADINHAS ═══

// ─── 7) Rota específica precisa vir antes da rota com parâmetro ───
const aplicacao = require('express');

const errado = aplicacao();
errado.get('/produtos/:id', (req, res) => res.send('detalhe do produto ' + req.params.id));
errado.get('/produtos/novo', (req, res) => res.send('formulário de cadastro'));   // tarde demais

const certo = aplicacao();
certo.get('/produtos/novo', (req, res) => res.send('formulário de cadastro'));
certo.get('/produtos/:id', (req, res) => res.send('detalhe do produto ' + req.params.id));

const s7a = errado.listen(0, async () => {
  const s7b = certo.listen(0, async () => {
    const pedir = (s) => fetch(`http://localhost:${s.address().port}/produtos/novo`).then((r) => r.text());
    console.log('registro errado →', await pedir(s7a));
    console.log('registro certo  →', await pedir(s7b));
    s7a.close(); s7b.close();
  });
});
// O Express testa as rotas na ordem em que foram escritas e para na primeira que casa:
// `/produtos/:id` casa com "novo" e trata o formulário como se fosse um id.

// ─── 8) Responder duas vezes ───
const servidorFalho = require('express')();

servidorFalho.get('/', (req, res) => {
  res.send('primeira resposta');
  console.log('Já respondeu? res.headersSent =', res.headersSent);
  try {
    res.send('segunda resposta');
  } catch (erro) {
    console.log('Erro ao responder de novo:', erro.code);
  }
});

const s8 = servidorFalho.listen(0, async () => {
  const url = `http://localhost:${s8.address().port}`;
  console.log('O navegador recebeu:', await fetch(url).then((r) => r.text()));
  s8.close();
});
// É uma resposta por requisição. O erro clássico é chamar `res.send` dentro de um `if` e
// de novo no fim da função, esquecendo o `return`.

// ─── Resumo ───
// 1. `express()` cria o servidor; `app.listen(porta)` abre a porta e segura o programa de pé.
// 2. Rota = método + caminho + função `(req, res)`.
// 3. `req` traz method, path, params, query e body; `res` responde e encerra.
// 4. `res.send` texto, `res.json` API, `res.status(n)` código, `res.redirect` outra rota.
// 5. Caminho desconhecido cai no 404 automático do Express — sem `if` seu.
// 6. Rota específica antes da rota com `:parametro`, e uma resposta só por requisição.
