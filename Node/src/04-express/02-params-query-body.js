/**
 * req.params, req.query e req.body
 * Sessão 2 · Rodar: node src/04-express/02-params-query-body.js
 *
 * O QUE É: os três lugares por onde o dado do usuário entra no servidor — pedaço da URL,
 *          o que vem depois do "?", e o corpo enviado por um formulário ou fetch.
 * QUANDO USAR: params para identificar um recurso (/produtos/42), query para filtro e
 *              paginação (?pagina=2), body para cadastrar e editar.
 * QUANDO NÃO USAR: nunca mande senha por params ou query — a URL fica no histórico do
 *                  navegador e nos logs do servidor. Senha vai no body, com HTTPS.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Os três, na mesma requisição ───
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.post('/testes/:idUsuarios/:parametro', (req, res) => {
  console.log('req.params →', { ...req.params }, '← pedaços da rota');
  console.log('req.query  →', { ...req.query }, '← depois do "?"');
  console.log('req.body   →', req.body, '← o corpo enviado');
  res.send('ok');
});

const servidor = app.listen(0, async () => {
  await fetch(`http://localhost:${servidor.address().port}/testes/123/abc?nome=Igor&idade=21`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'cidade=Recife',
  });
  console.log('Tudo chega como TEXTO: "21" e "123" são strings.');
  servidor.close();
});

// ─── 2) params: a rota declara o nome ───
const expresso = require('express');

const loja = expresso();
loja.get('/produtos/:id/avaliacoes/:nota', (req, res) => res.json(req.params));
loja.get('/testes{/:id}{/:parametro}', (req, res) => res.json(req.params));   // Express 5: {} é opcional

const s2 = loja.listen(0, async () => {
  const url = `http://localhost:${s2.address().port}`;
  const pedir = (caminho) => fetch(url + caminho).then((r) => r.text());
  console.log('/produtos/42/avaliacoes/5 →', await pedir('/produtos/42/avaliacoes/5'));
  console.log('/testes                   →', await pedir('/testes'));
  console.log('/testes/123               →', await pedir('/testes/123'));
  console.log('/testes/123/abc           →', await pedir('/testes/123/abc'));
  s2.close();
});
// No Express 4 o parâmetro opcional era '/testes/:id?'. No 5 vai entre chaves.

// ─── 3) query: filtro e paginação ───
const framework = require('express');

const busca = framework();
busca.get('/produtos', (req, res) => {
  const pagina = Number(req.query.pagina) || 1;             // sem Number, "2" + 1 vira "21"
  const emEstoque = req.query.emEstoque === 'true';         // sem ===, a string "false" é verdadeira
  res.send(`busca="${req.query.busca ?? ''}" pagina=${pagina} proxima=${pagina + 1} emEstoque=${emEstoque}`);
});

const s3 = busca.listen(0, async () => {
  const url = `http://localhost:${s3.address().port}/produtos`;
  console.log(await fetch(url + '?busca=teclado&pagina=2&emEstoque=true').then((r) => r.text()));
  console.log(await fetch(url + '?emEstoque=false').then((r) => r.text()), '← sem query, os padrões');
  s3.close();
});

// ═══ NA PRÁTICA ═══

// ─── 4) req.body só existe com o parser ligado ───
const expr = require('express');

const semParser = expr();
semParser.post('/', (req, res) => res.send('req.body é ' + req.body));

const comParser = expr();
comParser.use(expr.urlencoded({ extended: true }));          // formulário HTML
comParser.post('/', (req, res) => res.send('req.body.nome é ' + req.body.nome));

const enviar = (s) => fetch(`http://localhost:${s.address().port}/`, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: 'nome=Igor',
}).then((r) => r.text());

const s4a = semParser.listen(0, () => {
  const s4b = comParser.listen(0, async () => {
    console.log('sem express.urlencoded →', await enviar(s4a));
    console.log('com express.urlencoded →', await enviar(s4b));
    s4a.close(); s4b.close();
  });
});
// `extended: true` aceita objeto e array aninhados (endereco[rua]=...), não só pares simples.
// Para fetch/axios mandando JSON, o parser é outro: app.use(express.json()).

// ─── 5) O formulário e o POST que o recebe ───
const web = require('express');

const site = web();
site.use(web.urlencoded({ extended: true }));
site.get('/', (req, res) => res.send(`
  <form action="/" method="POST">
    <input type="text" name="nome" required>
    <button type="submit">Enviar</button>
  </form>
`));
site.post('/', (req, res) => res.send(`Formulário recebido! Nome: ${req.body.nome}`));

const s5 = site.listen(0, async () => {
  const url = `http://localhost:${s5.address().port}/`;
  console.log('O que o navegador mostra:', (await fetch(url).then((r) => r.text())).match(/name="(\w+)"/)[0]);
  console.log('Ao enviar:', await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'nome=Igor',
  }).then((r) => r.text()));
  s5.close();
});
// O atributo `name` do input é a CHAVE em req.body. Sem name, o campo nem é enviado.

// ─── 6) Validar o que chega, sempre ───
const aplicacao = require('express');

const cadastro = aplicacao();
cadastro.use(aplicacao.urlencoded({ extended: true }));
cadastro.post('/clientes', (req, res) => {
  const nome = (req.body.nome || '').trim();               // undefined quebraria no .trim()
  const idade = Number(req.body.idade);

  if (!nome) return res.status(400).send('O nome não pode ficar vazio.');
  if (!Number.isInteger(idade) || idade < 0) return res.status(400).send('Idade inválida.');
  res.status(201).send(`Cadastrado: ${nome}, ${idade} anos.`);
});

const s6 = cadastro.listen(0, async () => {
  const enviarForm = (corpo) => fetch(`http://localhost:${s6.address().port}/clientes`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: corpo,
  }).then(async (r) => `${r.status} ${await r.text()}`);

  console.log(await enviarForm('nome=Ana&idade=31'));
  console.log(await enviarForm('nome=%20%20&idade=31'));
  console.log(await enviarForm('nome=Bruno&idade=trinta'));
  s6.close();
});
// `required` no HTML é conveniência para o usuário; qualquer um manda um POST sem passar
// pelo formulário. Validação de verdade é a do servidor.

// ═══ PEGADINHAS ═══

// ─── 7) Registrar a rota antes do parser zera o req.body ───
const servidorWeb = require('express');

const ordemErrada = servidorWeb();
ordemErrada.post('/', (req, res) => res.send('body: ' + JSON.stringify(req.body)));
ordemErrada.use(servidorWeb.urlencoded({ extended: true }));   // tarde demais

const s7 = ordemErrada.listen(0, async () => {
  console.log('rota registrada antes do parser →', await fetch(`http://localhost:${s7.address().port}/`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',
  }).then((r) => r.text()));
  console.log('Nenhum erro no terminal: o formulário só para de funcionar.');
  s7.close();
});
// O Express roda os middlewares na ordem de registro. Parser SEMPRE antes das rotas.

// ─── 8) params e query são sempre string ───
const recebido = { id: '10', pagina: '2', ativo: 'false' };   // é assim que chega do Express

console.log('id === 10        ?', recebido.id === 10, '← string comparada com número');
console.log('Number(id) === 10 ?', Number(recebido.id) === 10);
console.log('if (ativo)       ?', Boolean(recebido.ativo), '← a string "false" é verdadeira');
console.log('ativo === "true" ?', recebido.ativo === 'true');

// ─── Resumo ───
// 1. params = pedaço da rota (/produtos/:id); query = depois do "?"; body = corpo do POST.
// 2. `req.body` exige `express.urlencoded()` ou `express.json()` registrado ANTES das rotas.
// 3. O `name` do input é a chave de `req.body`.
// 4. Tudo chega como string: converta com Number() e compare com === 'true'.
// 5. Valide no servidor; `required` no HTML não protege nada.
// 6. Senha e token nunca na URL — só no body.
