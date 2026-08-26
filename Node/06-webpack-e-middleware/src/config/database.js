const mongoose = require('mongoose');

// A URI vem do .env — nunca escreva usuário e senha direto no código.
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI não encontrada. Confira o arquivo .env na raiz do projeto.');
}

// A URI do Atlas não traz o nome do banco, então ele vai aqui.
// Sem isto o Mongoose usaria "test" por padrão.
const dbName = process.env.MONGODB_DBNAME || 'cursojs01';

/** Abre a conexão. Chame uma vez, quando o servidor sobe. */
async function conectar() {
  await mongoose.connect(uri, { dbName });
  console.log(`MongoDB: conectado ao banco "${mongoose.connection.name}".`);
  return mongoose.connection;
}

/** Fecha a conexão. Só no shutdown do servidor. */
async function desconectar() {
  await mongoose.disconnect();
  console.log('MongoDB: conexão fechada.');
}

module.exports = { mongoose, conectar, desconectar };
