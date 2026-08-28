/**
 * Autenticação com JWT
 * Sessão 5 · Rodar: node src/09-api-e-autenticacao/03-token-jwt.js
 *
 * O QUE É: um crachá assinado pelo servidor. O cliente guarda e manda em todo pedido; o
 *          servidor confere a assinatura e sabe quem é, sem guardar nada.
 * QUANDO USAR: em API consumida por aplicativo, front separado ou outro serviço — coisas
 *              que não têm cookie de navegador para chamar de suas.
 * QUANDO NÃO USAR: em site com páginas renderizadas no servidor. Sessão com cookie é mais
 *                  simples e dá para derrubar na hora, coisa que o token não permite.
 */

// ═══ ESSENCIAL ═══

// ─── 1) src/controllers/TokenController.js ───
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
(async () => {
  const SEGREDO = process.env.TOKEN_SECRET || 'segredo-longo-e-aleatorio-do-.env';
  const banco = [{ id: 1, email: 'ana@escola.dev', password_hash: await bcryptjs.hash('123456', 8) }];

  async function store(email, senha) {
    const user = banco.find((u) => u.email === email);
    if (!user || !(await bcryptjs.compare(senha, user.password_hash)))
      return { status: 401, corpo: { errors: ['Usuário ou senha inválidos.'] } };

    // Só id e e-mail: o token viaja em todo pedido e é lido por qualquer um.
    const token = jwt.sign({ id: user.id, email: user.email }, SEGREDO, { expiresIn: '7d' });
    return { status: 200, corpo: { token } };
  }

  const ok = await store('ana@escola.dev', '123456');
  console.log('login certo :', ok.status, '· token com', ok.corpo.token.split('.').length, 'partes');
  const nao = await store('ana@escola.dev', 'errada');
  console.log('login errado:', nao.status, JSON.stringify(nao.corpo));
})();

// ─── 2) O token não é segredo: é assinado, não escondido ───
const jsonwebtoken = require('jsonwebtoken');
(() => {
  const token = jsonwebtoken.sign({ id: 1, email: 'ana@escola.dev' }, 'segredo', { expiresIn: '7d' });
  const [cabecalho, dados, assinatura] = token.split('.');
  const ler = (parte) => JSON.parse(Buffer.from(parte, 'base64url').toString());

  console.log('1. cabeçalho :', JSON.stringify(ler(cabecalho)));
  console.log('2. dados     :', JSON.stringify({ ...ler(dados), iat: '...', exp: '...' }));
  console.log('3. assinatura:', assinatura.length, 'caracteres — só quem tem o segredo produz');

  console.log('\nQualquer pessoa lê os dados: é base64, não criptografia. Nunca ponha');
  console.log('senha, CPF ou cartão aí dentro. O que a assinatura garante é outra coisa:');
  console.log('que ninguém trocou o id por outro sem o servidor perceber.');
})();

// ─── 3) verify: o que pode dar errado ───
const jwtLib = require('jsonwebtoken');
(() => {
  const token = jwtLib.sign({ id: 1 }, 'segredo-certo', { expiresIn: '7d' });
  const expirado = jwtLib.sign({ id: 1 }, 'segredo-certo', { expiresIn: '-1s' });

  const conferir = (t, segredo, caso) => {
    try {
      const dados = jwtLib.verify(t, segredo);
      console.log(caso.padEnd(22), '✓ id =', dados.id);
    } catch (erro) {
      console.log(caso.padEnd(22), '✕', erro.name + ':', erro.message);
    }
  };

  conferir(token, 'segredo-certo', 'token bom');
  conferir(token, 'outro-segredo', 'segredo trocado');
  conferir(token.slice(0, -3) + 'aaa', 'segredo-certo', 'assinatura adulterada');
  conferir(expirado, 'segredo-certo', 'passou da validade');
  conferir('isso-nao-e-token', 'segredo-certo', 'lixo no lugar do token');

  console.log('\nverify LANÇA em vez de devolver false: o middleware sempre usa try/catch.');
})();

// ═══ NA PRÁTICA ═══

// ─── 4) src/middlewares/loginRequired.js ───
const express = require('express');
const cracha = require('jsonwebtoken');
(async () => {
  const SEGREDO = 'segredo-do-.env';

  const loginRequired = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ errors: ['Login obrigatório.'] });

    const [, token] = authorization.split(' ');          // "Bearer eyJhbGci..."
    try {
      req.userId = cracha.verify(token, SEGREDO).id;        // o resto da rota lê daqui
      return next();
    } catch {
      return res.status(401).json({ errors: ['Token expirado ou inválido.'] });
    }
  };

  const app = express();
  app.get('/alunos', loginRequired, (req, res) => res.json({ alunos: ['Ana', 'Bruno'], visto_por: req.userId }));
  app.get('/', (req, res) => res.json({ ok: 'rota aberta' }));

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}`;
    const pedir = (cabecalhos) => fetch(url + '/alunos', { headers: cabecalhos })
      .then(async (r) => `${r.status} ${JSON.stringify(await r.json())}`);

    console.log('sem cabeçalho :', await pedir({}));
    console.log('token inventado:', await pedir({ Authorization: 'Bearer nao-e-token' }));
    const token = cracha.sign({ id: 7 }, SEGREDO, { expiresIn: '7d' });
    console.log('token bom      :', await pedir({ Authorization: `Bearer ${token}` }));
    servidor.close();
  });
})();

// ─── 5) O id sai do token, não da URL ───
const expresso = require('express');
const assinador = require('jsonwebtoken');
(async () => {
  const SEGREDO = 'segredo-do-.env';

  const contas = { 1: { id: 1, nome: 'Ana' }, 2: { id: 2, nome: 'Bruno' } };
  const app = expresso();

  app.use((req, res, next) => {                    // loginRequired encurtado
    const [, token] = (req.headers.authorization || '').split(' ');
    try { req.userId = assinador.verify(token, SEGREDO).id; next(); }
    catch { res.status(401).json({ errors: ['Login obrigatório.'] }); }
  });

  app.delete('/errado/:id', (req, res) => res.json({ apagou: contas[req.params.id] }));
  app.delete('/certo', (req, res) => res.json({ apagou: contas[req.userId] }));

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}`;
    const token = assinador.sign({ id: 1 }, SEGREDO);    // token da Ana
    const chamar = (rota) => fetch(url + rota, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json());

    console.log('DELETE /errado/2 →', JSON.stringify(await chamar('/errado/2')), '← a Ana apagou o Bruno');
    console.log('DELETE /certo    →', JSON.stringify(await chamar('/certo')), '← só a própria conta');
    console.log('\nPor isso PUT, PATCH e DELETE de /users não recebem :id na 07-api-rest.');
    console.log('Trocar um número na URL é a coisa mais fácil do mundo.');
    servidor.close();
  });
})();

// ─── 6) Sessão ou token? ───
const comparacao = [
  ['Onde fica o estado', 'no servidor', 'no próprio token'],
  ['O cliente guarda', 'um cookie com o id', 'o token inteiro'],
  ['Servir aplicativo', 'desajeitado', 'natural'],
  ['Vários servidores', 'precisa de Redis compartilhado', 'qualquer um confere sozinho'],
  ['Derrubar o acesso', 'apaga a sessão, cai na hora', 'só quando o token expira'],
];

const largura = [22, 30, 30];
const linha = (cs) => cs.map((c, i) => c.padEnd(largura[i])).join(' ');
console.log(linha(['', 'SESSÃO (06-sessao)', 'TOKEN (aqui)']));
console.log(linha(['─'.repeat(20), '─'.repeat(28), '─'.repeat(28)]));
for (const l of comparacao) console.log(linha(l));

console.log('\nA última linha é a que dói: token roubado vale até expirar. Por isso a');
console.log('validade é curta e o middleware ainda confere o usuário no banco.');

// ═══ PEGADINHAS ═══

// ─── 7) O token vale mesmo depois de apagar o usuário ───
const jwtToken = require('jsonwebtoken');
(async () => {
  const SEGREDO = 'segredo-do-.env';

  let banco = [{ id: 1, email: 'ana@escola.dev' }];
  const token = jwtToken.sign({ id: 1, email: 'ana@escola.dev' }, SEGREDO, { expiresIn: '7d' });

  banco = banco.filter((u) => u.id !== 1);           // a conta foi apagada agora

  const soAssinatura = jwtToken.verify(token, SEGREDO);
  console.log('verify ainda passa   : id', soAssinatura.id, '← a assinatura continua boa');

  const noBanco = banco.find((u) => u.id === soAssinatura.id);
  console.log('existe no banco?     :', Boolean(noBanco), '← aqui a fraude aparece');

  console.log('\nO token é uma FOTO de quando foi emitido. Se a conta foi apagada, ou se a');
  console.log('pessoa deixou de ser administradora, ele não sabe: continua dizendo o antigo.');
  console.log('Por isso o loginRequired busca o usuário e confere id e e-mail antes do next().');
})();

// ─── Resumo ───
// 1. `jwt.sign({ id, email }, segredo, { expiresIn })` no login; o cliente guarda o token.
// 2. O token é legível por qualquer um: assinado, não escondido. Nada de sigiloso dentro.
// 3. `jwt.verify` lança — o middleware é try/catch e responde 401.
// 4. `Authorization: Bearer <token>` no cabeçalho de todo pedido protegido.
// 5. O id do dono sai do token (`req.userId`), nunca da URL.
// 6. Token é foto do passado: confira o usuário no banco e use validade curta.
