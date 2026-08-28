/**
 * API REST em JSON
 * Sessão 5 · Rodar: node src/09-api-e-autenticacao/01-api-rest-em-json.js
 *
 * O QUE É: um servidor que responde dado em JSON em vez de página pronta — quem monta a
 *          tela é o cliente (React, aplicativo, outro serviço).
 * QUANDO USAR: quando a mesma informação atende mais de uma tela, ou quando o front é
 *              um projeto separado.
 * QUANDO NÃO USAR: em site simples que só mostra páginas. Aí `res.render` entrega tudo
 *                  de uma vez, sem um front inteiro no meio.
 */

// ═══ ESSENCIAL ═══

// ─── 1) A rota que devolve JSON ───
const express = require('express');
(async () => {
  const app = express();
  app.use(express.json());              // sem esta linha, req.body chega undefined

  const alunos = [{ id: 1, nome: 'Ana Paula' }];

  app.get('/alunos', (req, res) => res.json(alunos));
  app.post('/alunos', (req, res) => {
    const novo = { id: alunos.length + 1, nome: req.body.nome };
    alunos.push(novo);
    res.status(201).json(novo);         // 201 = criado, e devolve o que criou
  });

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}/alunos`;
    const criado = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Bruno Dias' }),
    });
    console.log('POST →', criado.status, JSON.stringify(await criado.json()));
    console.log('GET  →', JSON.stringify(await fetch(url).then((r) => r.json())));
    servidor.close();
  });
})();

// ─── 2) O status code faz parte da resposta ───
const expresso = require('express');
(async () => {
  const app = expresso();
  app.use(expresso.json());

  app.get('/alunos/:id', (req, res) => {
    if (Number.isNaN(Number(req.params.id))) return res.status(400).json({ errors: ['Id inválido.'] });
    if (req.params.id !== '1') return res.status(404).json({ errors: ['Aluno não existe.'] });
    return res.json({ id: 1, nome: 'Ana Paula' });
  });

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}/alunos/`;
    for (const [caminho, oQueE] of [['1', 'achou'], ['99', 'não existe'], ['abc', 'id sem sentido']]) {
      const r = await fetch(url + caminho);
      console.log(`GET /alunos/${caminho}`.padEnd(16), r.status, String(oQueE).padEnd(15), await r.text());
    }
    console.log('\n200 achei · 201 criei · 400 seu pedido está errado · 404 não existe');
    console.log('Devolver 200 com { erro: "não achei" } obriga o cliente a ler o corpo para');
    console.log('saber se deu certo. O número já diz.');
    servidor.close();
  });
})();

// ─── 3) O CRUD inteiro em quatro rotas ───
const expr = require('express');
(async () => {
  const app = expr();
  app.use(expr.json());

  const banco = new Map([[1, { id: 1, nome: 'Teclado', preco: 199.9 }]]);
  let proximoId = 2;

  app.get('/produtos', (req, res) => res.json([...banco.values()]));
  app.post('/produtos', (req, res) => {
    const novo = { id: proximoId++, nome: req.body.nome, preco: req.body.preco };
    banco.set(novo.id, novo);
    res.status(201).json(novo);
  });
  app.put('/produtos/:id', (req, res) => {
    const item = banco.get(Number(req.params.id));
    if (!item) return res.status(404).json({ errors: ['Produto não existe.'] });
    Object.assign(item, { nome: req.body.nome, preco: req.body.preco });
    return res.json(item);
  });
  app.delete('/produtos/:id', (req, res) => {
    const item = banco.get(Number(req.params.id));
    if (!item) return res.status(404).json({ errors: ['Produto não existe.'] });
    banco.delete(item.id);
    return res.json(item);              // devolve o que apagou, para o cliente poder desfazer
  });

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}/produtos`;
    const json = (m, c, b) => fetch(url + c, {
      method: m, headers: { 'Content-Type': 'application/json' },
      body: b && JSON.stringify(b),
    }).then(async (r) => `${r.status} ${JSON.stringify(await r.json())}`);

    console.log('POST   /produtos   →', await json('POST', '', { nome: 'Monitor', preco: 899 }));
    console.log('PUT    /produtos/2 →', await json('PUT', '/2', { nome: 'Monitor 27"', preco: 999 }));
    console.log('DELETE /produtos/1 →', await json('DELETE', '/1'));
    console.log('GET    /produtos   →', await json('GET', ''));
    servidor.close();
  });
})();

// ═══ NA PRÁTICA ═══

// ─── 4) PUT manda tudo; PATCH manda só o que mudou ───
const web = require('express');
(async () => {
  const app = web();
  app.use(web.json());

  const aluno = { id: 1, nome: 'Ana Paula', email: 'ana@escola.dev', idade: 22 };
  const CAMPOS = ['nome', 'email', 'idade'];

  app.put('/alunos/1', (req, res) => {
    const faltando = CAMPOS.filter((c) => req.body[c] === undefined);
    if (faltando.length) return res.status(400).json({ errors: [`Faltam: ${faltando.join(', ')}`] });
    for (const c of CAMPOS) aluno[c] = req.body[c];
    return res.json(aluno);
  });

  app.patch('/alunos/1', (req, res) => {
    for (const c of CAMPOS) if (req.body[c] !== undefined) aluno[c] = req.body[c];
    return res.json(aluno);
  });

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}/alunos/1`;
    const enviar = (m, b) => fetch(url, {
      method: m, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b),
    }).then(async (r) => `${r.status} ${JSON.stringify(await r.json())}`);

    console.log('PATCH { idade: 23 }        →', await enviar('PATCH', { idade: 23 }));
    console.log('PUT   { idade: 24 }        →', await enviar('PUT', { idade: 24 }));
    console.log('PUT   { tudo }             →', await enviar('PUT', { nome: 'Ana P. Souza', email: 'ana@escola.dev', idade: 24 }));
    console.log('\nPUT substitui o recurso inteiro: campo que faltou é 400, não "deixa como está".');
    servidor.close();
  });
})();

// ─── 5) Todo erro sai no mesmo formato ───
const framework = require('express');
(async () => {
  const app = framework();
  app.use(framework.json());

  // Um formato só — { errors: [...] } — para o cliente ter um jeito só de mostrar erro.
  app.post('/alunos', (req, res) => {
    const errors = [];
    if (!req.body.nome) errors.push('Nome é obrigatório.');
    if (!/^[^@]+@[^@]+$/.test(req.body.email || '')) errors.push('E-mail inválido.');
    if (errors.length) return res.status(400).json({ errors });
    return res.status(201).json({ id: 1, nome: req.body.nome });
  });

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}/alunos`;
    const r = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nao-e-email' }),
    });
    console.log(r.status, JSON.stringify(await r.json()));
    console.log('\nDevolva TODOS os erros de uma vez: um por vez faz o usuário mandar');
    console.log('o formulário quatro vezes para descobrir os quatro problemas.');
    console.log('O array do Sequelize encaixa direto: erro.errors.map((e) => e.message).');
    servidor.close();
  });
})();

// ─── 6) A resposta é uma lista fixa de campos ───
const servidorWeb = require('express');
(async () => {
  const app = servidorWeb();

  // O que veio do banco: tem coisa que nunca pode sair daqui.
  const doBanco = {
    id: 1, nome: 'Ana Paula', email: 'ana@escola.dev',
    password_hash: '$2b$08$K3jd...', token_reset: 'a1b2c3', created_at: '2026-08-26',
  };

  const PUBLICOS = ['id', 'nome', 'email'];
  const publico = (linha) => Object.fromEntries(PUBLICOS.map((c) => [c, linha[c]]));

  app.get('/errado', (req, res) => res.json(doBanco));       // devolve o registro inteiro
  app.get('/certo', (req, res) => res.json(publico(doBanco)));

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}`;
    for (const rota of ['/errado', '/certo']) {
      const corpo = await fetch(url + rota).then((r) => r.json());
      console.log(rota.padEnd(9), Object.keys(corpo).join(', '));
    }
    console.log('\nLista fixa de saída: a coluna que alguém acrescentar no model amanhã');
    console.log('não vaza sozinha para a internet.');
    servidor.close();
  });
})();

// ═══ PEGADINHAS ═══

// ─── 7) Sem express.json(), req.body chega undefined ───
const aplicacao = require('express');
(async () => {
  const app = aplicacao();
  // Faltou o app.use(express.json()) aqui de propósito.

  app.post('/alunos', (req, res) => res.json({ recebido: req.body ?? null }));

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}/alunos`;
    const r = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Ana Paula' }),
    });
    console.log('o cliente mandou : {"nome":"Ana Paula"}');
    console.log('o servidor viu   :', JSON.stringify(await r.json()));
    console.log('\nO corpo chega como fluxo de bytes; alguém precisa juntar e converter.');
    console.log('É o que express.json() faz — e ele tem que vir ANTES das rotas.');
    servidor.close();
  });
})();

// ─── 8) Aceitar o corpo inteiro deixa o cliente virar administrador ───
const apiWeb = require('express');
(async () => {
  const app = apiWeb();
  app.use(apiWeb.json());

  const conta = { id: 7, nome: 'Ana', email: 'ana@escola.dev', admin: false };

  app.patch('/errado', (req, res) => {
    Object.assign(conta, req.body);                 // confia em tudo que chegou
    res.json(conta);
  });

  const PERMITIDOS = ['nome', 'email'];             // id e admin ficam de fora de propósito
  app.patch('/certo', (req, res) => {
    for (const c of PERMITIDOS) if (req.body[c] !== undefined) conta[c] = req.body[c];
    res.json(conta);
  });

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}`;
    const atacar = (rota) => fetch(url + rota, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Ana', admin: true, id: 999 }),
    }).then((r) => r.json());

    console.log('/errado →', JSON.stringify(await atacar('/errado')));
    Object.assign(conta, { id: 7, admin: false });
    console.log('/certo  →', JSON.stringify(await atacar('/certo')));
    console.log('\nO formulário só tem dois campos, mas o pedido é escrito à mão em');
    console.log('qualquer terminal. Lista de entrada fixa, sempre.');
    servidor.close();
  });
})();

// ─── Resumo ───
// 1. `express.json()` antes das rotas; sem ele não existe `req.body`.
// 2. O status conta a história: 200, 201 criado, 400 pedido errado, 404 não existe.
// 3. CRUD é GET/POST/PUT/DELETE no mesmo caminho — o método já diz o que fazer.
// 4. PUT exige o recurso inteiro; PATCH aplica só o que veio.
// 5. Um formato só de erro (`{ errors: [...] }`) e todos os erros de uma vez.
// 6. Lista fixa na saída e na entrada: nada vaza e nada entra sem você ter escrito.
