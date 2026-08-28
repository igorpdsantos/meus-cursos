/**
 * Senha com bcrypt
 * Sessão 5 · Rodar: node src/09-api-e-autenticacao/02-senha-com-bcrypt.js
 *
 * O QUE É: uma função que transforma a senha num hash de mão única — dá para conferir se
 *          a senha bate, mas não dá para voltar do hash para a senha.
 * QUANDO USAR: em toda senha, sem exceção. Vazou o banco, vazaram os hashes, não as senhas.
 * QUANDO NÃO USAR: em dado que você precisa ler de volta (CPF, e-mail, cartão). Aí é
 *                  criptografia com chave, que desfaz — não hash.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Guardar o hash, conferir depois ───
const bcryptjs = require('bcryptjs');
(async () => {
  const digitadaNoCadastro = '123456';
  const hash = await bcryptjs.hash(digitadaNoCadastro, 8);   // é ISTO que vai para o banco

  console.log('formato do hash :', hash.slice(0, 7) + '...', '(' + hash.length + ' caracteres)');
  console.log('senha certa     :', await bcryptjs.compare('123456', hash));
  console.log('senha errada    :', await bcryptjs.compare('12345', hash));
  console.log('\nO banco nunca vê "123456". E ninguém desfaz o hash para descobrir.');
})();

// ─── 2) O mesmo "123456" gera hashes diferentes ───
const bcrypt = require('bcryptjs');
(async () => {
  const um = await bcrypt.hash('123456', 8);
  const dois = await bcrypt.hash('123456', 8);

  console.log('hashes iguais?      ', um === dois, '← cada um leva um sal sorteado na hora');
  console.log('os dois conferem?   ', await bcrypt.compare('123456', um),
    await bcrypt.compare('123456', dois));
  console.log('o sal fica no hash  :', um.slice(0, 29).length, 'caracteres — versão, custo e sal');

  console.log('\nÉ por isso que a comparação é `compare`, nunca `===`: duas contas com a');
  console.log('mesma senha têm hashes diferentes, e olhar o banco não denuncia isso.');
})();

// ─── 3) src/models/User.js: o campo VIRTUAL e o hook ───
const { Sequelize, DataTypes } = require('sequelize');
const cripto = require('bcryptjs');
(async () => {
  const conexao = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });

  const User = conexao.define('User', {
    email: { type: DataTypes.STRING, allowNull: false },
    password_hash: { type: DataTypes.STRING },      // a coluna que existe no banco
    password: {
      type: DataTypes.VIRTUAL,                      // só em memória: não vira coluna
      validate: { len: { args: [6, 50], msg: 'Senha deve ter entre 6 e 50 caracteres.' } },
    },
  }, { tableName: 'users', timestamps: false });

  // Roda no create E no update: a senha nunca chega ao banco em texto.
  User.beforeSave(async (user) => {
    if (user.password) user.password_hash = await cripto.hash(user.password, 8);
  });

  await conexao.sync();
  const ana = await User.create({ email: 'ana@escola.dev', password: '123456' });

  const [linha] = await conexao.query('SELECT * FROM users', { type: 'SELECT' });
  console.log('colunas no banco   :', Object.keys(linha).join(', '), '← password não está aqui');
  console.log('o que ficou gravado:', linha.password_hash.slice(0, 7) + '...');
  console.log('em memória         :', ana.password, '← existe só durante o pedido');

  try {
    await User.create({ email: 'bruno@escola.dev', password: '123' });
  } catch (erro) {
    console.log('senha curta        :', erro.errors[0].message);
  }
  await conexao.close();
})();

// ═══ NA PRÁTICA ═══

// ─── 4) O custo: por que 8 e não 4 ───
const bc = require('bcryptjs');
(async () => {
  for (const custo of [4, 8, 10]) {
    const hash = await bc.hash('123456', custo);
    console.log(`custo ${custo}`.padEnd(9), hash.slice(0, 7), '← o custo fica escrito no hash');
  }

  console.log('\nCada ponto DOBRA o trabalho: 10 é 64 vezes mais caro que 4.');
  console.log('Isso é de propósito. Lento para você é aceitável (uma vez por login);');
  console.log('lento para quem roubou o banco é a diferença entre horas e séculos.');
  console.log('8 a 12 é a faixa de uso. Menos que isso não protege nada.');
})();

// ─── 5) O login que não conta quem existe ───
const hasher = require('bcryptjs');
(async () => {
  const banco = [{ id: 1, email: 'ana@escola.dev', password_hash: await hasher.hash('123456', 8) }];

  async function entrar(email, senha) {
    const user = banco.find((u) => u.email === email);
    // Mesma resposta para "não existe" e para "senha errada", de propósito.
    if (!user || !(await hasher.compare(senha, user.password_hash)))
      return { status: 401, corpo: { errors: ['Usuário ou senha inválidos.'] } };
    return { status: 200, corpo: { id: user.id, email: user.email } };
  }

  for (const [email, senha, caso] of [
    ['ana@escola.dev', '123456', 'tudo certo'],
    ['ana@escola.dev', 'errada', 'senha errada'],
    ['ninguem@escola.dev', '123456', 'não existe'],
  ]) {
    const r = await entrar(email, senha);
    console.log(caso.padEnd(14), r.status, JSON.stringify(r.corpo));
  }

  console.log('\n"E-mail não cadastrado" parece prestativo e é uma lista de clientes de graça:');
  console.log('dá para descobrir quem tem conta testando e-mails, um por um.');
})();

// ═══ PEGADINHAS ═══

// ─── 6) Não gravou hash nenhum? A comparação não te avisa ───
const senhaLib = require('bcryptjs');
(async () => {
  // Conta antiga, importada de outro sistema, que ficou sem password_hash.
  const semHash = { email: 'antigo@escola.dev', password_hash: null };

  console.log('compare com null :', await senhaLib.compare('qualquer-coisa', semHash.password_hash || ''));
  console.log('compare com ""   :', await senhaLib.compare('', ''));

  const hash = await senhaLib.hash('123456', 8);
  console.log('comparando com ===:', hash === '123456', '← nunca funciona, e parece um bug');

  console.log('\nDuas travas que valem a pena:');
  console.log('1. `password` obrigatório no cadastro — conta sem hash não deveria nascer.');
  console.log('2. Se o password_hash estiver vazio, recuse o login em vez de comparar.');
})();

// ─── Resumo ───
// 1. Grave o hash, nunca a senha. `bcryptjs.hash(senha, 8)` no cadastro.
// 2. Confira com `bcryptjs.compare(digitada, hash)` — `===` nunca vai bater.
// 3. O sal sorteado faz o mesmo "123456" virar hashes diferentes a cada conta.
// 4. No model: `password` VIRTUAL, `password_hash` coluna, e o hook `beforeSave` no meio.
// 5. O custo (8 a 12) é lentidão de propósito, e ela protege quem roubou o banco de você.
// 6. Login errado responde 401 com mensagem única: não diga quem tem conta.
