/**
 * Migrations
 * Sessão 5 · Rodar: node src/08-sequelize/02-migrations.js
 *
 * O QUE É: um arquivo com data no nome que descreve UMA mudança no banco — criar tabela,
 *          acrescentar coluna — e sabe desfazê-la.
 * QUANDO USAR: sempre que a estrutura do banco mudar. É o histórico versionado do banco,
 *              que sobe junto com o código e roda igual na sua máquina e no servidor.
 * QUANDO NÃO USAR: para dado, não. Linha de exemplo é seed; migration mexe em estrutura.
 */

// ═══ ESSENCIAL ═══

// ─── 1) src/database/migrations/20260826203722-alunos.js ───
const { Sequelize, DataTypes } = require('sequelize');
(async () => {
  const conexao = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });

  // Uma migration é só um objeto com `up` e `down`. O sequelize-cli entrega o queryInterface.
  const migration = {
    async up(queryInterface) {
      await queryInterface.createTable('alunos', {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE, allowNull: false },
      });
    },
    async down(queryInterface) {
      await queryInterface.dropTable('alunos');
    },
  };

  await migration.up(conexao.getQueryInterface());
  const colunas = await conexao.getQueryInterface().describeTable('alunos');
  for (const [nome, def] of Object.entries(colunas))
    console.log(nome.padEnd(12), def.type.padEnd(14), def.primaryKey ? 'chave primária' : def.allowNull ? 'aceita nulo' : 'NOT NULL');
  await conexao.close();
})();
// O nome começa com a data (20260826203722) porque é ela que define a ORDEM de execução.

// ─── 2) O `down` existe para desfazer ───
const { Sequelize: SequelizeORM, DataTypes: Tipos } = require('sequelize');
(async () => {
  const conexao = new SequelizeORM({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const qi = conexao.getQueryInterface();

  const criarCursos = {
    up: (q) => q.createTable('cursos', {
      id: { type: Tipos.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Tipos.STRING, allowNull: false },
    }),
    down: (q) => q.dropTable('cursos'),
  };

  await criarCursos.up(qi);
  console.log('depois do up  :', (await qi.showAllTables()).join(', ') || '(nenhuma tabela)');

  await criarCursos.down(qi);                 // é isto que `db:migrate:undo` chama
  console.log('depois do down:', (await qi.showAllTables()).join(', ') || '(nenhuma tabela)');

  console.log('\nMigration sem `down` é migration que não dá para voltar atrás.');
  await conexao.close();
})();

// ─── 3) Mudou de ideia? Migration NOVA, nunca editar a antiga ───
const { Sequelize: SequelizeSQL, DataTypes: Coluna } = require('sequelize');
(async () => {
  const conexao = new SequelizeSQL({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const qi = conexao.getQueryInterface();

  await qi.createTable('alunos', {
    id: { type: Coluna.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: Coluna.STRING, allowNull: false },
  });
  console.log('v1:', Object.keys(await qi.describeTable('alunos')).join(', '));

  // 20260827100000-adiciona-idade-em-alunos.js — o arquivo seguinte, não o de cima editado
  const adicionaIdade = {
    up: (q) => q.addColumn('alunos', 'idade', { type: Coluna.INTEGER, allowNull: true }),
    down: (q) => q.removeColumn('alunos', 'idade'),
  };

  await adicionaIdade.up(qi);
  console.log('v2:', Object.keys(await qi.describeTable('alunos')).join(', '));

  console.log('\nO servidor já rodou a v1. Editar a v1 não muda nada lá — o banco dele já');
  console.log('a marcou como executada. Só uma migration nova chega ao banco de produção.');
  await conexao.close();
})();

// ═══ NA PRÁTICA ═══

// ─── 4) Os comandos do sequelize-cli ───
const comandos = [
  ['npx sequelize migration:create --name alunos', 'cria o arquivo com a data no nome'],
  ['npx sequelize db:migrate', 'roda as pendentes, na ordem da data'],
  ['npx sequelize db:migrate:undo', 'desfaz a última'],
  ['npx sequelize db:migrate:undo:all', 'desfaz todas'],
  ['npx sequelize seed:generate --name alunos', 'cria um arquivo de seed'],
  ['npx sequelize db:seed:all', 'roda as seeds'],
];

for (const [comando, oQueFaz] of comandos) console.log(comando.padEnd(46), oQueFaz);

// O .sequelizerc é o que diz ao cli onde estão as coisas — sem ele, ele procura em `config/`
// e não acha nada:
//   const { resolve } = require('path');
//   module.exports = {
//     config: resolve(__dirname, 'src', 'configs', 'database.js'),
//     'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
//     'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
//   };
console.log('\nO cli lê o .sequelizerc na raiz do projeto para achar config, migrations e seeds.');

// ─── 5) Chave estrangeira: a migration que amarra duas tabelas ───
const { Sequelize: SequelizeBD, DataTypes: Campo } = require('sequelize');
(async () => {
  const conexao = new SequelizeBD({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const qi = conexao.getQueryInterface();

  await qi.createTable('alunos', {
    id: { type: Campo.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: Campo.STRING, allowNull: false },
  });
  await qi.createTable('fotos', {
    id: { type: Campo.INTEGER, autoIncrement: true, primaryKey: true },
    arquivo: { type: Campo.STRING, allowNull: false },
    aluno_id: {
      type: Campo.INTEGER,
      references: { model: 'alunos', key: 'id' },   // nome da TABELA, não do model
      onDelete: 'CASCADE',                          // apagou o aluno, some a foto junto
      onUpdate: 'CASCADE',
    },
  });

  const fotos = await qi.describeTable('fotos');
  console.log('colunas de fotos:', Object.keys(fotos).join(', '));
  console.log('aluno_id aponta para alunos.id, com ON DELETE CASCADE');
  console.log('\nSem a FK o banco aceita foto de aluno que não existe — e um dia');
  console.log('a tela quebra tentando mostrar o nome de ninguém.');
  await conexao.close();
})();

// ─── 6) Migration ou sync? ───
const situacoes = [
  ['Estudo, banco descartável', 'sync({ force: true })', 'boot devolve estado conhecido'],
  ['Time, com outra pessoa', 'migrations', 'ela roda db:migrate e chega no mesmo banco'],
  ['Produção', 'migrations', 'histórico, revisão e volta atrás'],
  ['Teste automatizado', 'sync({ force: true })', 'banco zerado a cada rodada'],
];

for (const [quando, o_que, porque] of situacoes)
  console.log(quando.padEnd(26), o_que.padEnd(22), porque);

console.log('\nsync olha o MODEL e tenta deixar o banco parecido. Migration é um roteiro');
console.log('explícito e versionado. Só o roteiro dá para revisar num pull request.');

// ═══ PEGADINHAS ═══

// ─── 7) A tabela SequelizeMeta guarda o que já rodou ───
const { Sequelize: SequelizeBase, DataTypes: Tipo } = require('sequelize');
(async () => {
  const conexao = new SequelizeBase({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const qi = conexao.getQueryInterface();

  // É esta tabela que o cli cria sozinho e consulta antes de rodar qualquer coisa.
  await qi.createTable('SequelizeMeta', { name: { type: Tipo.STRING, primaryKey: true } });
  await qi.bulkInsert('SequelizeMeta', [
    { name: '20260826203722-alunos.js' },
    { name: '20260826210500-users.js' },
  ]);

  const jaRodaram = (await conexao.query('SELECT name FROM SequelizeMeta', { type: 'SELECT' }))
    .map((l) => l.name);
  console.log('já rodaram:', jaRodaram.join('\n            '));

  const naPasta = ['20260826203722-alunos.js', '20260826210500-users.js', '20260828120000-fotos.js'];
  console.log('\npendentes :', naPasta.filter((m) => !jaRodaram.includes(m)).join(', '));
  console.log('\nÉ só isso: `db:migrate` roda o que está na pasta e não está nesta tabela.');
  console.log('Por isso editar arquivo antigo não tem efeito — o nome dele já está aqui.');
  await conexao.close();
})();

// ─── Resumo ───
// 1. Migration é uma mudança de ESTRUTURA, versionada: `up` faz, `down` desfaz.
// 2. A data no nome do arquivo é a ordem de execução — não mexa nela.
// 3. Mudou de ideia depois de rodar? Migration nova. Editar a antiga não chega em produção.
// 4. `references` + `onDelete: 'CASCADE'` amarra as tabelas e limpa o que ficou órfão.
// 5. `db:migrate` compara a pasta com a tabela SequelizeMeta e roda só o que falta.
// 6. sync({ force }) é para banco descartável; migration é para banco que tem dono.
