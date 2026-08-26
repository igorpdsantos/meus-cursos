const session = require('express-session');
const { MongoStore } = require('connect-mongo');   // v6 exporta nomeado, não default
const mongoose = require('mongoose');

// O segredo assina o cookie de sessão. Se vazar, dá para forjar sessão de qualquer
// usuário — por isso vive no .env, nunca no código.
const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error('SESSION_SECRET não encontrada. Confira o arquivo .env na raiz do projeto.');
}

const UMA_SEMANA = 1000 * 60 * 60 * 24 * 7;   // maxAge é em milissegundos

module.exports = session({
  secret,
  // Onde as sessões ficam guardadas. Sem isto o express-session usa memória, que
  // perde tudo a cada restart e vaza RAM conforme os acessos crescem.
  // Reaproveita a conexão que o Mongoose já abriu, em vez de abrir uma segunda.
  // `asPromise()` resolve quando o conectar() do database.js terminar.
  store: MongoStore.create({
    clientPromise: mongoose.connection.asPromise().then((conn) => conn.getClient()),
    // Sem dbName as sessões iriam para o banco "test", porque a URI do Atlas não
    // traz nome de banco. Mesma pegadinha do database.js.
    dbName: process.env.MONGODB_DBNAME,
  }),
  resave: false,              // não regrava a sessão no banco se nada mudou
  saveUninitialized: false,   // não cria sessão para quem só passou pelo site sem interagir
  cookie: {
    maxAge: UMA_SEMANA,
    httpOnly: true,           // JavaScript da página não consegue ler o cookie — barra roubo por XSS
    sameSite: 'lax',          // o cookie não viaja em requisição vinda de outro site (defesa contra CSRF)
    secure: false,            // em produção com HTTPS, mude para true
  },
});
