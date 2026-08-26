require('dotenv').config();   // PRIMEIRA linha: carrega o .env antes de qualquer módulo ler process.env

const path = require('path');
const express = require('express');
const routes = require('./routes.js');
const flash = require('connect-flash');
const sessao = require('./src/config/session.js');
const { meuMiddleware, expoeFlash, contaVisitas } = require('./src/middlewares/middleware.js');
const { conectar, desconectar } = require('./src/config/database.js');

const app = express();
const port = 3000;

// ─── Middlewares ───
// A ORDEM IMPORTA: tudo isto precisa vir ANTES de `app.use(routes)`.
// O Express executa os middlewares na ordem em que foram registrados; se a rota
// for registrada primeiro, ela roda antes do parser e `req.body` chega undefined.

// Faz o parse do corpo da requisição (formulário) para dentro de `req.body`.
// `extended: true` permite objetos e arrays aninhados, não só pares chave/valor.
app.use(express.urlencoded({ extended: true }));

// Serve a pasta `public/` como estática — é daqui que sai o /assets/js/bundle.js
// gerado pelo webpack.
app.use(express.static(path.resolve(__dirname, 'public')));

// ─── Sessão e flash ───
// A ORDEM aqui também é rígida: sessão PRIMEIRO, porque o flash guarda as mensagens
// dentro da sessão. Invertido, o connect-flash não acha `req.session` e estoura.
app.use(sessao);
app.use(flash());

// ─── Views ───
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middleware global: como está registrado antes das rotas, roda em toda requisição.
app.use(meuMiddleware);
app.use(contaVisitas);
app.use(expoeFlash);   // depois do flash() acima, senão req.flash não existe ainda

// ─── Rotas ───
app.use(routes);

// Conecta no banco ANTES de aceitar requisição: se o Mongo estiver fora,
// é melhor o servidor nem subir do que atender pedidos que vão falhar.
conectar()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    // Fecha conexão e servidor de forma limpa no Ctrl+C.
    process.on('SIGINT', async () => {
      server.close();
      await desconectar();
      process.exit(0);
    });
  })
  .catch((erro) => {
    console.error('Falha ao conectar no MongoDB:', erro.message);
    process.exit(1);
  });
