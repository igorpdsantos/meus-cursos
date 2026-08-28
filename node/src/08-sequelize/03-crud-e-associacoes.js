/**
 * CRUD e Associações
 * Sessão 5 · Rodar: node src/08-sequelize/03-crud-e-associacoes.js
 *
 * O QUE É: os métodos do model que gravam, buscam, atualizam e apagam, e o jeito de dizer
 *          que uma tabela pertence a outra.
 * QUANDO USAR: em todo controller. É o que substitui o INSERT, o SELECT e o UPDATE na mão.
 * QUANDO NÃO USAR: quando a consulta vira três junções e um GROUP BY. Aí o SQL direto, em
 *                  `sequelize.query`, é mais curto e mais honesto.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Criar e buscar ───
const { Sequelize, DataTypes } = require('sequelize');
(async () => {
  const conexao = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const Aluno = conexao.define('Aluno', {
    nome: DataTypes.STRING, email: DataTypes.STRING, idade: DataTypes.INTEGER,
  }, { tableName: 'alunos', timestamps: false });
  await conexao.sync();

  await Aluno.create({ nome: 'Ana Paula', email: 'ana@escola.dev', idade: 22 });
  await Aluno.bulkCreate([                       // vários de uma vez, num INSERT só
    { nome: 'Bruno Dias', email: 'bruno@escola.dev', idade: 31 },
    { nome: 'Carla Reis', email: 'carla@escola.dev', idade: 27 },
  ]);

  const todos = await Aluno.findAll();
  console.log('findAll   :', todos.map((a) => a.nome).join(', '));
  console.log('findByPk 2:', (await Aluno.findByPk(2)).nome);
  console.log('findOne   :', (await Aluno.findOne({ where: { email: 'carla@escola.dev' } })).nome);
  console.log('não achou :', await Aluno.findByPk(999), '← null, não é erro');
  await conexao.close();
})();

// ─── 2) Atualizar e apagar ───
const { Sequelize: SequelizeORM, DataTypes: Tipos } = require('sequelize');
(async () => {
  const conexao = new SequelizeORM({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const Produto = conexao.define('Produto', {
    nome: Tipos.STRING, estoque: Tipos.INTEGER,
  }, { tableName: 'produtos', timestamps: false });
  await conexao.sync();
  await Produto.bulkCreate([
    { nome: 'Teclado', estoque: 4 }, { nome: 'Monitor', estoque: 0 },
  ]);

  // O caminho do controller: busca, confere se existe, atualiza a instância.
  const teclado = await Produto.findByPk(1);
  await teclado.update({ estoque: 10 });
  console.log('depois do update:', teclado.nome, '→', teclado.estoque, 'em estoque');

  const monitor = await Produto.findByPk(2);
  await monitor.destroy();
  console.log('sobraram        :', (await Produto.findAll()).map((p) => p.nome).join(', '));
  console.log('o apagado ainda existe em memória:', monitor.nome, '← dá para devolver na resposta');
  await conexao.close();
})();

// ─── 3) Filtrar, ordenar e escolher as colunas ───
const { Sequelize: SequelizeSQL, DataTypes: Coluna } = require('sequelize');
(async () => {
  const conexao = new SequelizeSQL({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const Venda = conexao.define('Venda', {
    vendedor: Coluna.STRING, valor: Coluna.INTEGER, regiao: Coluna.STRING,
  }, { tableName: 'vendas', timestamps: false });
  await conexao.sync();
  await Venda.bulkCreate([
    { vendedor: 'Ana', valor: 800, regiao: 'sul' },
    { vendedor: 'Bruno', valor: 1500, regiao: 'sul' },
    { vendedor: 'Carla', valor: 1200, regiao: 'norte' },
    { vendedor: 'Diego', valor: 300, regiao: 'sul' },
  ]);

  const top = await Venda.findAll({
    where: { regiao: 'sul' },                    // WHERE regiao = 'sul'
    order: [['valor', 'DESC']],                  // ORDER BY valor DESC
    limit: 2,                                    // LIMIT 2
    attributes: ['vendedor', 'valor'],           // SELECT vendedor, valor
  });

  for (const v of top) console.log(v.vendedor.padEnd(8), 'R$', v.valor);
  console.log('veio a coluna regiao?', top[0].regiao, '← attributes cortou fora');
  console.log('total do sul:', await Venda.count({ where: { regiao: 'sul' } }), 'vendas');
  await conexao.close();
})();

// ═══ NA PRÁTICA ═══

// ─── 4) Uma tabela que pertence a outra ───
const { Sequelize: SequelizeBD, DataTypes: Campo } = require('sequelize');
(async () => {
  const conexao = new SequelizeBD({ dialect: 'sqlite', storage: ':memory:', logging: false });

  const Aluno = conexao.define('Aluno', { nome: Campo.STRING },
    { tableName: 'alunos', timestamps: false });
  const Foto = conexao.define('Foto', { arquivo: Campo.STRING, aluno_id: Campo.INTEGER },
    { tableName: 'fotos', timestamps: false });

  // Os dois lados: quem guarda a chave é quem "pertence".
  Foto.belongsTo(Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
  Aluno.hasMany(Foto, { foreignKey: 'aluno_id', as: 'fotos' });

  await conexao.sync();
  const ana = await Aluno.create({ nome: 'Ana Paula' });
  await Foto.bulkCreate([
    { arquivo: 'ana-1.png', aluno_id: ana.id }, { arquivo: 'ana-2.png', aluno_id: ana.id },
  ]);

  // include = JOIN: traz o aluno e as fotos dele num pedido só ao banco.
  const comFotos = await Aluno.findByPk(ana.id, { include: { association: 'fotos' } });
  console.log(comFotos.nome, 'tem', comFotos.fotos.length, 'fotos:',
    comFotos.fotos.map((f) => f.arquivo).join(', '));

  const daFoto = await Foto.findByPk(1, { include: { association: 'aluno' } });
  console.log('a foto', daFoto.arquivo, 'é de', daFoto.aluno.nome);
  await conexao.close();
})();

// ─── 5) Buscar por parecido, por faixa e por lista ───
const { Sequelize: SequelizeBase, DataTypes: Tipo, Op: OpFiltro } = require('sequelize');
(async () => {
  const conexao = new SequelizeBase({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const Aluno = conexao.define('Aluno', { nome: Tipo.STRING, idade: Tipo.INTEGER },
    { tableName: 'alunos', timestamps: false });
  await conexao.sync();
  await Aluno.bulkCreate([
    { nome: 'Ana Paula', idade: 22 }, { nome: 'Ana Clara', idade: 35 },
    { nome: 'Bruno Dias', idade: 31 }, { nome: 'Carla Reis', idade: 17 },
  ]);

  const busca = (r) => r.map((a) => a.nome).join(', ');
  console.log('nome com "Ana"   :', busca(await Aluno.findAll({ where: { nome: { [OpFiltro.like]: 'Ana%' } } })));
  console.log('maior de idade   :', busca(await Aluno.findAll({ where: { idade: { [OpFiltro.gte]: 18 } } })));
  console.log('entre 20 e 32    :', busca(await Aluno.findAll({ where: { idade: { [OpFiltro.between]: [20, 32] } } })));
  console.log('Bruno ou Carla   :', busca(await Aluno.findAll({ where: { nome: { [OpFiltro.in]: ['Bruno Dias', 'Carla Reis'] } } })));
  console.log('\nSem OpFiltro, `where: { idade: 22 }` só sabe comparar por igual.');
  await conexao.close();
})();

// ─── 6) Página de resultados ───
const { Sequelize: SequelizeDados, DataTypes: Formato } = require('sequelize');
(async () => {
  const conexao = new SequelizeDados({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const Pedido = conexao.define('Pedido', { cliente: Formato.STRING },
    { tableName: 'pedidos', timestamps: false });
  await conexao.sync();
  await Pedido.bulkCreate(Array.from({ length: 23 }, (_, i) => ({ cliente: `Cliente ${i + 1}` })));

  const porPagina = 10;
  const pagina = 3;                                        // veio de /pedidos?pagina=3

  const { count, rows } = await Pedido.findAndCountAll({   // conta o total E traz a fatia
    order: [['id', 'ASC']],
    limit: porPagina,
    offset: (pagina - 1) * porPagina,
  });

  console.log('total no banco :', count);
  console.log('páginas        :', Math.ceil(count / porPagina));
  console.log(`página ${pagina}       :`, rows.map((p) => p.cliente).join(', '));
  console.log('\nfindAll traria as 23 linhas para a memória só para mostrar 10.');
  await conexao.close();
})();

// ═══ PEGADINHAS ═══

// ─── 7) Model.update não devolve a linha atualizada ───
const { Sequelize: SequelizeMotor, DataTypes: Valor } = require('sequelize');
(async () => {
  const conexao = new SequelizeMotor({ dialect: 'sqlite', storage: ':memory:', logging: false });
  const Aluno = conexao.define('Aluno', { nome: Valor.STRING, ativo: Valor.BOOLEAN },
    { tableName: 'alunos', timestamps: false });
  await conexao.sync();
  await Aluno.bulkCreate([{ nome: 'Ana', ativo: true }, { nome: 'Bruno', ativo: true }]);

  const resposta = await Aluno.update({ ativo: false }, { where: { nome: 'Ana' } });
  console.log('Aluno.update devolveu:', JSON.stringify(resposta), '← quantas linhas mudaram');
  console.log('res.json(resposta) mandaria isto para o cliente. Não é o aluno.');

  const aluno = await Aluno.findByPk(1);          // busca, confere, atualiza a instância
  await aluno.update({ ativo: true });
  console.log('\ninstancia.update devolve:', aluno.nome, '— o objeto, pronto para a resposta');
  await conexao.close();
})();

// ─── 8) Uma consulta vira N+1 sem você ver ───
const { Sequelize: SequelizeLoja, DataTypes: Dado } = require('sequelize');
(async () => {
  let consultas = 0;
  const conexao = new SequelizeLoja({
    dialect: 'sqlite', storage: ':memory:', logging: () => { consultas++; },
  });
  const Aluno = conexao.define('Aluno', { nome: Dado.STRING }, { tableName: 'alunos', timestamps: false });
  const Foto = conexao.define('Foto', { arquivo: Dado.STRING, aluno_id: Dado.INTEGER },
    { tableName: 'fotos', timestamps: false });
  Aluno.hasMany(Foto, { foreignKey: 'aluno_id', as: 'fotos' });
  await conexao.sync();
  await Aluno.bulkCreate([{ nome: 'Ana' }, { nome: 'Bruno' }, { nome: 'Carla' }]);
  await Foto.bulkCreate([1, 2, 3].map((id) => ({ arquivo: `${id}.png`, aluno_id: id })));

  consultas = 0;
  for (const aluno of await Aluno.findAll()) await aluno.getFotos();   // 1 + 3
  console.log('um por um :', consultas, 'consultas ao banco');

  consultas = 0;
  await Aluno.findAll({ include: { association: 'fotos' } });
  console.log('com include:', consultas, 'consulta');

  console.log('\nCom 3 alunos ninguém percebe. Com 3 mil, a tela leva 20 segundos.');
  await conexao.close();
})();

// ─── Resumo ───
// 1. create, findAll, findByPk, findOne — e `null` quando não acha, não exceção.
// 2. Busque, confira se existe, e chame `.update()`/`.destroy()` NA INSTÂNCIA.
// 3. `Model.update` em massa devolve contagem, não a linha: nunca mande na resposta.
// 4. where + order + limit + attributes é o SELECT inteiro, em objeto.
// 5. belongsTo/hasMany nos dois lados, e `include` para trazer tudo num pedido só.
// 6. Comparação que não é "igual" precisa de `Op`: like, gte, between, in.
