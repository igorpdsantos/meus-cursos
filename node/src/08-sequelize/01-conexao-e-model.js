/**
 * Conexão e Model com Sequelize
 * Sessão 5 · Rodar: node src/08-sequelize/01-conexao-e-model.js
 *
 * O QUE É: o tradutor entre objeto JavaScript e tabela SQL — você descreve a tabela uma vez
 *          e chama métodos em vez de escrever SQL na mão.
 * QUANDO USAR: quando o dado tem formato fixo e se relaciona com outro — aluno, matrícula, nota.
 * QUANDO NÃO USAR: em relatório com muita junção e soma, onde o SQL escrito à mão é mais claro
 *                  e mais rápido. Aí a saída é `sequelize.query('SELECT ...')`.
 */

// ═══ ESSENCIAL ═══

// ─── 1) src/configs/database.js ───
const { Sequelize } = require('sequelize');
(async () => {
  // O objeto é o mesmo para qualquer banco: só mudam dialect, host e credenciais.
  // Em produção: { dialect: 'mariadb', host: process.env.DATABASE_HOST, ... }
  const conexao = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',      // banco que vive na memória: some quando o processo fecha
    logging: false,           // true mostra no console todo SQL que o Sequelize gera
  });

  await conexao.authenticate();     // só aqui o Sequelize realmente fala com o banco
  console.log('Conectado?', true, '— dialeto:', conexao.getDialect());

  // Banco fora do ar, senha errada, host errado: tudo estoura aqui, no authenticate.
  const inacessivel = new Sequelize({
    dialect: 'sqlite', storage: '/pasta/que/nao/existe/escola.sqlite',
    logging: false, retry: { max: 0 },
  });
  try {
    await inacessivel.authenticate();
  } catch (erro) {
    console.log('Banco inacessível :', erro.message);
  }
  console.log('Por isso o server.js só sobe o Express DEPOIS que o authenticate passa.');
  await conexao.close();
})();

// ─── 2) src/models/Aluno.js ───
const { Sequelize: SequelizeORM, DataTypes: Tipos } = require('sequelize');
(async () => {
  const conexao = new SequelizeORM({ dialect: 'sqlite', storage: ':memory:', logging: false });

  const Aluno = conexao.define('Aluno', {
    nome: { type: Tipos.STRING, allowNull: false },
    email: { type: Tipos.STRING, allowNull: false, unique: true },
    idade: { type: Tipos.INTEGER },
  }, {
    tableName: 'alunos',        // sem isto o Sequelize pluraliza em inglês: "Alunos"
    timestamps: true,           // ganha created_at e updated_at de graça
    underscored: true,          // nome_completo no banco, nomeCompleto no JavaScript
  });

  console.log('Model   :', Aluno.name, '— singular, inicial maiúscula');
  console.log('Tabela  :', Aluno.getTableName());
  console.log('Colunas :', Object.keys(Aluno.getAttributes()).join(', '));
  await conexao.close();
})();
// O model não cria a tabela: ele descreve a que deve existir. Quem cria é a migration.

// ─── 3) Criar a tabela e gravar a primeira linha ───
const { Sequelize: SequelizeSQL, DataTypes: Coluna } = require('sequelize');
(async () => {
  const conexao = new SequelizeSQL({ dialect: 'sqlite', storage: ':memory:', logging: false });

  const Produto = conexao.define('Produto', {
    nome: { type: Coluna.STRING, allowNull: false },
    preco: { type: Coluna.DECIMAL(10, 2), allowNull: false },
  }, { tableName: 'produtos', timestamps: false });

  await conexao.sync();                       // CREATE TABLE IF NOT EXISTS produtos (...)

  const teclado = await Produto.create({ nome: 'Teclado', preco: 199.9 });
  console.log('id gerado pelo banco:', teclado.id);
  console.log('nome                :', teclado.nome);

  const todos = await Produto.findAll();
  console.log('linhas na tabela    :', todos.length);
  await conexao.close();
})();

// ═══ NA PRÁTICA ═══

// ─── 4) As duas validações: a do banco e a do JavaScript ───
const { Sequelize: SequelizeBD, DataTypes: Campo } = require('sequelize');
(async () => {
  const conexao = new SequelizeBD({ dialect: 'sqlite', storage: ':memory:', logging: false });

  const Cliente = conexao.define('Cliente', {
    nome: {
      type: Campo.STRING,
      allowNull: false,                       // vira NOT NULL na tabela
      validate: {                             // roda no Node, ANTES de mandar o INSERT
        len: { args: [3, 60], msg: 'Nome deve ter entre 3 e 60 caracteres.' },
      },
    },
    email: {
      type: Campo.STRING,
      validate: { isEmail: { msg: 'E-mail inválido.' } },
    },
  }, { tableName: 'clientes', timestamps: false });

  await conexao.sync();

  try {
    await Cliente.create({ nome: 'Jo', email: 'nao-e-email' });
  } catch (erro) {
    console.log(erro.name);
    for (const e of erro.errors) console.log(' -', e.path + ':', e.message);
  }
  await conexao.close();
})();
// `validate` junta TODOS os erros num array e nem chega a viajar até o banco. É dele que
// sai a lista de mensagens que a API devolve em `{ errors: [...] }`.

// ─── 5) Os tipos que se usa de verdade ───
const { DataTypes: tipos } = require('sequelize');

const usados = [
  ['STRING', 'VARCHAR(255)', 'nome, e-mail, título'],
  ['TEXT', 'TEXT', 'descrição longa, comentário'],
  ['INTEGER', 'INTEGER', 'idade, quantidade'],
  ['DECIMAL(10,2)', 'DECIMAL', 'dinheiro — nunca FLOAT'],
  ['BOOLEAN', 'TINYINT(1)', 'ativo, pago'],
  ['DATE', 'DATETIME', 'data com hora'],
  ['DATEONLY', 'DATE', 'aniversário, vencimento'],
  ['VIRTUAL', '— não existe no banco', 'senha em texto, url montada'],
];

for (const [tipo, coluna, quando] of usados)
  console.log(`DataTypes.${tipo}`.padEnd(24), coluna.padEnd(22), quando);

console.log('\nExistem mesmo?', usados.every(([t]) => tipos[t.split('(')[0]] !== undefined));
console.log('FLOAT para dinheiro erra no centavo: 0.1 + 0.2 =', 0.1 + 0.2);

// ─── 6) O que o Sequelize inventa quando você não diz nada ───
const { Sequelize: SequelizeBase, DataTypes: Tipo } = require('sequelize');
(async () => {
  const conexao = new SequelizeBase({ dialect: 'sqlite', storage: ':memory:', logging: false });

  const Padrao = conexao.define('Fornecedor', { nomeFantasia: Tipo.STRING });
  const Meu = conexao.define('FornecedorMeu', { nomeFantasia: Tipo.STRING }, {
    tableName: 'fornecedores', timestamps: false, underscored: true,
  });

  console.log('sem opções :', Padrao.getTableName().padEnd(13), Object.keys(Padrao.getAttributes()).join(', '));
  console.log('com opções :', Meu.getTableName().padEnd(13), Object.keys(Meu.getAttributes()).join(', '));
  console.log('\nO pluralizador é inglês: "Fornecedor" virou "Fornecedors".');
  console.log('`id` aparece nos dois: a chave primária o Sequelize põe sozinho.');
  console.log('E `underscored` muda só a COLUNA — no JavaScript o nome continua o mesmo:');
  console.log('  nomeFantasia →', Meu.getAttributes().nomeFantasia.field);
  await conexao.close();
})();

// ═══ PEGADINHAS ═══

// ─── 7) sync({ force: true }) apaga a tabela inteira ───
const { Sequelize: SequelizeDados, DataTypes: Formato } = require('sequelize');
(async () => {
  const conexao = new SequelizeDados({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const Nota = conexao.define('Nota', { valor: Formato.INTEGER }, { tableName: 'notas', timestamps: false });

  await conexao.sync();
  await Nota.create({ valor: 10 });
  console.log('antes do force :', await Nota.count(), 'linha(s)');

  await conexao.sync({ force: true });        // DROP TABLE notas; CREATE TABLE notas (...)
  console.log('depois do force:', await Nota.count(), 'linha(s) ← os dados foram embora');

  console.log('\nÉ o ddl-auto: create-drop do Spring. Ótimo para estudar, porque cada boot');
  console.log('devolve o mesmo estado. Em banco que você não pode perder, é destruição total.');
  console.log('Fora do estudo: sync() sem force, ou nem isso — só as migrations.');
  await conexao.close();
})();

// ─── Resumo ───
// 1. Uma conexão só, num arquivo só (`src/configs/database.js`), lida do `.env`.
// 2. `define` descreve a tabela; ele não cria nada — quem cria é a migration.
// 3. `tableName`, `timestamps` e `underscored` explícitos: o padrão pluraliza em inglês.
// 4. `allowNull` é regra do banco; `validate` é regra do Node e junta os erros num array.
// 5. Dinheiro é DECIMAL, nunca FLOAT. `VIRTUAL` é campo que existe só em memória.
// 6. `sync({ force: true })` derruba e recria: só em banco de estudo.
