# Histórico — Node

Log cronológico das sessões de estudo. Sessão é o número que aparece no cabeçalho de cada arquivo.
As datas das sessões 1 a 3 não foram registradas na época; ficam sem data de propósito, para não
inventar informação.

## Sessão 1 — data não registrada

Primeiro servidor Express, npm e o formato dos módulos. Aulas `00-aula-express` e
`01-aula-express-nodemon`.

- `01-modulos/01-commonjs-vs-esm.js` — CommonJS vs ES Modules
- `02-npm/01-package-json.js` — package.json: a identidade do projeto
- `02-npm/02-scripts-e-nodemon.js` — Scripts do npm e o nodemon
- `02-npm/03-dependencias-e-versoes.js` — dependencies, devDependencies e versão
- `04-express/01-servidor-e-rotas.js` — Servidor e rotas com Express

## Sessão 2 — data não registrada

Dado do usuário chegando no servidor e a organização em router + controllers.
Aulas `02-params-query-body` e `03-routers-controllers`.

- `04-express/02-params-query-body.js` — req.params, req.query e req.body
- `04-express/03-router-e-controllers.js` — Router e Controllers

## Sessão 3 — data não registrada

Páginas renderizadas e arquivos servidos crus. Aulas `04-views` e `05-conteudos-estaticos`.

- `03-arquivos-com-fs/01-path-e-dirname.js` — path e __dirname
- `03-arquivos-com-fs/02-ler-e-escrever.js` — fs: ler e escrever arquivos
- `04-express/04-views-com-ejs.js` — Views com EJS
- `04-express/05-arquivos-estaticos.js` — Arquivos estáticos com express.static

## Sessão 4 — 20/08/2026

Aula `06-webpack-e-middleware`: o projeto ganha middlewares, banco, sessão e build de frontend.

- `02-npm/04-variaveis-de-ambiente.js` — Variáveis de ambiente e o .env
- `04-express/06-middlewares.js` — Middlewares e a ordem de registro
- `05-mongodb/01-conexao-com-mongoose.js` — Conectando no MongoDB com Mongoose
- `05-mongodb/02-schema-e-model.js` — Schema e Model do Mongoose
- `06-sessao-e-seguranca/01-sessao-e-cookies.js` — Sessão e cookies
- `06-sessao-e-seguranca/02-mensagens-flash.js` — Mensagens flash e Post/Redirect/Get
- `07-extras/01-webpack-e-babel.js` — webpack e Babel

## Sessão 5 — 26/08/2026

Aula `07-api-rest`: a virada de banco e de formato. Sai MongoDB, entra SQL com
Sequelize; sai HTML renderizado, entra JSON. Autenticação deixa de ser sessão e
passa a ser token.

- `07-api-rest/src/configs/database.js` — conexão MariaDB com Sequelize
- `07-api-rest/src/models/` — Aluno e User (campo `VIRTUAL` + hash no `beforeSave`)
- `07-api-rest/src/database/migrations/` — `alunos` e `users`
- `07-api-rest/src/controllers/` — CRUD de alunos e usuários, com PUT × PATCH
- `07-api-rest/src/controllers/TokenController.js` — login que devolve JWT
- `07-api-rest/src/middlewares/loginRequired.js` — valida assinatura, validade e
  se o usuário do token ainda existe

## Sessão 6 — 28/08/2026

Fecha a `07-api-rest`: upload de arquivo e as travas de segurança da API.

- `07-api-rest/src/configs/multerConfig.js` — destino, nome gerado, filtro de
  tipo e limite de 2 MB
- `07-api-rest/src/models/Foto.js` — dono polimórfico (aluno **ou** usuário), FK
  com `ON DELETE CASCADE`
- `07-api-rest/src/controllers/FotoController.js` — upload, listagem e remoção do
  banco e do disco
- `07-api-rest/src/database/seeds/` — estado conhecido a cada boot com
  `sync({ force: true })`
- Listas fixas de entrada e de saída nos controllers: campo novo no model não
  vaza sozinho, e `id`/`password_hash` no corpo do pedido não mudam nada
