
// Semente de dados: roda depois do sync({ force: true }), com o banco zerado.
// Os users passam por create() (e não bulkCreate) de propósito: é o create que
// dispara o hook beforeSave e transforma a senha em hash.
const USERS = [
  { nome: "Igor Santos", email: "igor@escola.dev", password: "123456" },
  { nome: "Maria Silva", email: "maria@escola.dev", password: "123456" },
];

const ALUNOS = [
  { nome: "Ana", sobrenome: "Souza", email: "ana@aluno.dev", idade: 21, peso: 58.4, altura: 1.62 },
  { nome: "Bruno", sobrenome: "Lima", email: "bruno@aluno.dev", idade: 25, peso: 79.1, altura: 1.81 },
  { nome: "Carla", sobrenome: "Mendes", email: "carla@aluno.dev", idade: 19, peso: 63, altura: 1.7 },
  { nome: "Diego", sobrenome: "Rocha", email: "diego@aluno.dev", idade: 32, peso: 88.5, altura: 1.78 },
];

export default async function semear(models) {
  const { User, Aluno } = models;

  for (const user of USERS) {
    await User.create(user);
  }

  for (const aluno of ALUNOS) {
    await Aluno.create(aluno);
  }

  console.log(`Seeds: ${USERS.length} usuários e ${ALUNOS.length} alunos criados.`);
  console.log(`Seeds: login de teste → ${USERS[0].email} / ${USERS[0].password}`);
}
