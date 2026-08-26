# 06 — Express + webpack e middleware

Exemplo de referência de como ligar um **frontend empacotado pelo webpack** a um
**servidor Express**. Duas partes que se encontram em um lugar só: `public/`.

```
frontend/          código-fonte do NAVEGADOR (entra no webpack)
  main.js            entry: tudo começa aqui
  assets/css/        css importado pelo main.js
src/               código-fonte do SERVIDOR (o Node roda direto, sem build)
  config/            conexão com o MongoDB e configuração da sessão
  controllers/
  models/            schemas do Mongoose
  middlewares/       funções que rodam em toda requisição
  views/             templates .ejs
public/            servido estaticamente pelo Express
  assets/js/         ← SAÍDA do webpack (bundle.js + bundle.js.map) — não edite à mão
webpack.config.js
server.js
routes.js
```

A regra que organiza tudo: **`frontend/` é a entrada do webpack, `public/` é a saída.**
O Express só sabe servir `public/` — ele nunca olha para `frontend/`.

## Rodar

```bash
npm install
npm run build     # gera public/assets/js/bundle.js (+ .map)
npm start         # sobe o servidor em http://localhost:3000
```

Durante o desenvolvimento, dois terminais:

```bash
npm run dev       # webpack em --watch: reconstrói o bundle a cada save no frontend/
npm start         # nodemon: reinicia o servidor a cada save no src/
```

## Banco de dados

Usamos o **Mongoose** (ODM) por cima do MongoDB Atlas. A conexão fica em
`src/config/database.js` e as credenciais em `.env` — que está no `.gitignore` e
**nunca** vai para o repositório. O `server.js` carrega o `.env` na primeira linha,
antes de qualquer módulo ler `process.env`:

```js
require('dotenv').config();
```

O servidor só começa a aceitar requisições depois que a conexão responde. Se o banco
estiver fora, ele falha na hora em vez de atender pedidos que iriam quebrar.

Dois detalhes desta configuração:

**O nome do banco vai no código, não na URI.** A string que o Atlas gera termina em
`.mongodb.net` sem nome de banco. Sem informar o `dbName`, o Mongoose escreveria em um
banco chamado `test`. Por isso o `connect` recebe `{ dbName }`, lido de `MONGODB_DBNAME`.

**A conexão fica aberta.** O trecho de exemplo que o Atlas mostra fecha a conexão num
`finally`, porque é um script que roda uma vez e acaba. Em um servidor, fechar depois do
primeiro uso derrubaria todas as consultas seguintes — aqui o `disconnect()` só acontece
no Ctrl+C.

### Models

Cada model vive em `src/models/` e declara um **schema**: o contrato do documento.

```js
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  criadoEm: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Contato', ContatoSchema);
```

É a diferença principal para o driver puro: sem schema, qualquer formato entra no banco.
Com ele, `Contato.create({})` é recusado antes de chegar no MongoDB. O nome `'Contato'`
vira a collection `contatos` — o Mongoose pluraliza sozinho.

## Sessão e mensagens flash

### O problema que a sessão resolve

HTTP não tem memória. Cada requisição chega ao servidor como se fosse a primeira: ele
não sabe quem é você nem o que aconteceu antes. A **sessão** é o crachá que resolve isso.

Como funciona, em três passos:

1. Na primeira visita o servidor cria uma sessão e devolve um **cookie** com um id.
2. O navegador reenvia esse cookie em toda requisição seguinte, sozinho.
3. O servidor usa o id para achar os dados guardados — que ficam no **servidor**, não
   no cookie. O cookie carrega só o id, assinado com o `SESSION_SECRET`.

Por isso o segredo importa tanto: quem tem o segredo consegue forjar um cookie e virar
qualquer usuário. Ele vive no `.env` e nunca no código.

Na prática, é só escrever em `req.session`:

```js
req.session.visitas = (req.session.visitas || 0) + 1;
```

O contador no rodapé da página vem daí. Abra em uma janela anônima e ele volta para 1:
é outro cookie, outra sessão.

### Onde as sessões ficam guardadas

O `express-session` sem `store` usa a memória do processo. Isso tem dois problemas: some
tudo a cada restart do servidor, e a RAM cresce sem parar conforme os acessos aumentam.
Aqui usamos o **connect-mongo**, que guarda as sessões no MongoDB — e reaproveita a
conexão que o Mongoose já abriu, em vez de abrir uma segunda.

### O problema que o flash resolve

Depois de um POST bem-sucedido, você não quer responder com HTML. Se responder, o F5 do
navegador reenvia o formulário e cadastra tudo de novo. O padrão correto é
**Post/Redirect/Get**: o POST processa e responde `res.redirect('/')`, e o GET seguinte
desenha a página.

Só que o redirect é uma requisição **nova** — todas as variáveis do POST se perderam.
Como avisar "cadastrado com sucesso" numa requisição que não sabe que houve um cadastro?

A **mensagem flash** é a resposta: um recado guardado na sessão que é **lido uma vez e
apagado automaticamente**. Sobrevive ao redirect e some sozinho depois.

```js
// no controller, durante o POST
req.flash('sucesso', `Formulário recebido. Olá, ${nome}!`);
return res.redirect('/');
```

```js
// no middleware, entregando para a view
res.locals.sucessos = req.flash('sucesso');
```

Ler com `req.flash('sucesso')` **esvazia** a fila. É essa a diferença entre flash e
sessão comum: o contador de visitas fica, a mensagem passa.

### A ordem de registro no server.js

Aqui a ordem não é estilo, é dependência — cada peça precisa da anterior:

```
express.urlencoded  →  preenche req.body
session             →  cria req.session
flash()             →  cria req.flash (guarda dentro de req.session)
expoeFlash          →  lê req.flash e joga em res.locals
routes              →  os controllers, que usam tudo acima
```

Registrar `flash()` antes de `session` derruba o servidor: o connect-flash não acha
`req.session`. Registrar `expoeFlash` antes de `flash()` estoura em `req.flash is not
a function`.

## Dependências, e por que cada uma está onde está

`dependencies` — o que é preciso para **rodar**:

| pacote | para quê |
|---|---|
| `express` | o servidor |
| `ejs` | a view engine que renderiza `src/views/*.ejs` |
| `mongoose` | o ODM que fala com o MongoDB (traz o driver oficial junto) |
| `dotenv` | lê o `.env` para dentro de `process.env` |
| `express-session` | guarda dados por visitante entre requisições |
| `connect-mongo` | store da sessão: grava no MongoDB em vez da memória |
| `connect-flash` | mensagens de uso único, que sobrevivem a um redirect |
| `core-js` | os polyfills que o Babel injeta **dentro do bundle** — vai para o navegador do usuário, logo é dependência de produção |

`devDependencies` — o que é preciso só para **construir**:

| pacote | para quê |
|---|---|
| `webpack`, `webpack-cli` | o empacotador e seu comando de terminal |
| `babel-loader`, `@babel/core`, `@babel/preset-env` | traduzem o JS moderno do `frontend/` |
| `babel-plugin-polyfill-corejs3` | decide quais polyfills do core-js injetar |
| `css-loader`, `style-loader` | fazem o `import './style.css'` funcionar |
| `nodemon` | reinicia o servidor durante o desenvolvimento |

O alvo da tradução não fica no `webpack.config.js`: vem do campo `browserslist`
do `package.json`. É de lá que o Babel descobre quais navegadores precisa suportar.

## Dois detalhes que quebram calado

**1. A ordem dos middlewares no `server.js`.** O Express roda os middlewares na ordem
em que foram registrados. Se `app.use(routes)` vier antes de
`app.use(express.urlencoded(...))`, a rota executa antes do parser e `req.body` chega
`undefined` — o formulário para de funcionar sem nenhuma mensagem de erro.
Parsers e estáticos **sempre antes** das rotas.

**2. O caminho do `<script>` na view.** Use `/assets/js/bundle.js`, com barra na frente.
Com `./assets/js/bundle.js` funciona em `/`, mas quebra em qualquer rota aninhada
como `/produtos/1`, porque o navegador resolve relativo à URL atual.

## Fluxo completo

```
frontend/main.js ──┐
                   ├─ webpack (babel-loader + css-loader) ─→ public/assets/js/bundle.js
frontend/**.css ───┘                                                    │
                                                                        ▼
navegador ←── src/views/index.ejs ←── Express (express.static serve public/)
```
