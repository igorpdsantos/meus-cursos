/**
 * Conectando no MongoDB com Mongoose
 * Sessão 4 · Rodar: node src/05-mongodb/01-conexao-com-mongoose.js
 *
 * O QUE É: MongoDB é o banco que guarda documentos (objetos JSON) em vez de linhas e
 *          colunas. Mongoose é a biblioteca que fala com ele e ainda impõe um formato.
 * QUANDO USAR: quando o dado do sistema precisa sobreviver ao restart do servidor —
 *              cadastro, pedido, contato. É o passo depois de guardar em arquivo.
 * QUANDO NÃO USAR: para configuração (isso é .env) e para dado descartável de um script
 *                  que roda uma vez e acaba.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Conectar, e falhar direito quando o banco está fora ───
const mongoose = require('mongoose');   // npm install mongoose

// A URI de verdade vem do .env: mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net
// Aqui apontamos para um MongoDB que não existe, só para ver o erro que aparece.
mongoose
  .connect('mongodb://127.0.0.1:27017', { dbName: 'cursojs01', serverSelectionTimeoutMS: 700 })
  .then(() => console.log('Servidor pode subir: banco no ar.'))
  .catch((erro) => {
    console.log('Falha ao conectar no MongoDB:', erro.message);
    console.log('Aqui o server.js faria process.exit(1) — melhor nem subir.');
  });
// Um servidor de pé sem banco só serve para dar erro 500 na cara de cada visitante.

// ─── 2) O dbName não está na URI ───
const enderecos = [
  'mongodb+srv://igor:senha@cluster0.exemplo.net/?retryWrites=true',   // no Atlas o host acaba em .mongodb.net
  'mongodb://127.0.0.1:27017/loja',                                    // com banco no fim
];

for (const uri of enderecos) {
  const caminho = new URL(uri).pathname.replace('/', '');
  console.log(caminho || '(nenhum)', '←', uri.slice(0, 42) + '...');
}
console.log('\nSem `{ dbName }`, o Mongoose grava num banco chamado "test" — e você jura que sumiu.');
console.log('Por isso: mongoose.connect(uri, { dbName: process.env.MONGODB_DBNAME })');

// ─── 3) Em que estado a conexão está ───
const odm = require('mongoose');

const estados = { 0: 'desconectado', 1: 'conectado', 2: 'conectando', 3: 'desconectando' };
const conexao = odm.createConnection();          // uma conexão nova, que ainda não conectou
console.log('readyState:', conexao.readyState, '→', estados[conexao.readyState]);
console.log('Todos os estados:', Object.entries(estados).map(([n, nome]) => `${n}=${nome}`).join(' · '));
// Serve para uma rota /health responder se o servidor consegue mesmo falar com o banco.

// ═══ NA PRÁTICA ═══

// ─── 4) src/config/database.js: conectar e desconectar em um lugar só ───
const banco = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DBNAME || 'cursojs01';

async function conectar() {
  await banco.connect(uri, { dbName, serverSelectionTimeoutMS: 700 });
  console.log(`MongoDB: conectado ao banco "${banco.connection.name}".`);
  return banco.connection;
}
async function desconectar() {
  await banco.disconnect();
  console.log('MongoDB: conexão fechada.');
}

conectar().catch((erro) => console.log('conectar() falhou:', erro.name));
console.log('module.exports = { mongoose, conectar, desconectar }');
// `conectar()` uma vez, quando o servidor sobe. `desconectar()` uma vez, no Ctrl+C:
//   process.on('SIGINT', async () => { server.close(); await desconectar(); process.exit(0); });

// ─── 5) A conexão fica ABERTA ───
console.log('Script que roda e acaba → conecta, usa, fecha no finally. Correto.');
console.log('Servidor               → conecta na subida e NÃO fecha. Também correto.');
console.log('mongoose.connect() já abre um POOL e reaproveita em toda requisição.');
// O exemplo que o Atlas mostra no site é o primeiro caso. Copiar aquele
// `finally { client.close() }` para dentro de um servidor derruba tudo depois do 1º pedido.
// E chamar `connect` dentro de um controller abre conexão a cada clique do usuário.

// ─── 6) A ordem no server.js ───
console.log(`
conectar()
  .then(() => {
    const server = app.listen(port, () => console.log('http://localhost:' + port));
    process.on('SIGINT', async () => { server.close(); await desconectar(); process.exit(0); });
  })
  .catch((erro) => {
    console.error('Falha ao conectar no MongoDB:', erro.message);
    process.exit(1);
  });`.trim());
// Primeiro o banco responde, depois a porta abre. Nessa ordem.

// ═══ PEGADINHAS ═══

// ─── 7) Senha com caractere especial precisa ser escapada ───
const senha = 'p@ss:word/2026';

console.log('crua     → mongodb+srv://igor:' + senha + '@cluster... (URI inválida)');
console.log('escapada → mongodb+srv://igor:' + encodeURIComponent(senha) + '@cluster...');

try {
  new URL('mongodb+srv://igor:' + senha + '@cluster0.exemplo.net');
} catch (erro) {
  console.log('O que o Node diz:', erro.message);
}
// @ : / e ? têm significado dentro da URI. Senha com esses caracteres vira "Invalid
// connection string" ou, pior, "bad auth" — e você jura que a senha está certa.

// ─── Resumo ───
// 1. URI e dbName vêm do .env; senha nunca no código.
// 2. Informe `{ dbName }`: a URI do Atlas não traz nome de banco, e o padrão é "test".
// 3. Conecte uma vez na subida e só desconecte no shutdown — `connect` já é um pool.
// 4. Falhou a conexão? `process.exit(1)`: não suba um servidor que não atende.
// 5. `readyState` diz em que pé está a conexão (0 desconectado, 1 conectado).
// 6. Senha com @ : / ? precisa de `encodeURIComponent`.
