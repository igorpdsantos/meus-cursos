# Meus Cursos

Estudos de programação com **documentação que roda**: cada exemplo abre com um terminal do
lado, você aperta ▶ e vê a saída — igual à do `node`, mas dentro do navegador.

### 👉 **[Abrir a documentação interativa](https://igorpds-fullstack.github.io/meus-cursos/)**

Dois cursos, em sequência:

```
Trilha 1 · JavaScript   a linguagem: variável, função, lista, objeto, assíncrono, classe
        ↓
Trilha 2 · Node         a mesma linguagem no servidor: npm, Express, MongoDB, sessão
```

---

## Os cursos

### [JavaScript](javascript/README.md) · 43 tópicos · 8 temas

A linguagem, do zero ao protótipo. Cada arquivo é um tópico fechado.

| Tema | Assuntos |
|---|---|
| [01-fundamentos](javascript/src/01-fundamentos/) | `let`/`const`/`var`, strings, números, `split` e `join` |
| [02-arrays-e-objetos](javascript/src/02-arrays-e-objetos/) | arrays, `slice`/`splice`, desestruturação, `freeze`, `keys`/`values`/`entries`, `assign` |
| [03-controle-de-fluxo](javascript/src/03-controle-de-fluxo/) | `for`, `while`, `try/catch` |
| [04-funcoes](javascript/src/04-funcoes/) | parâmetros, escopo, closures, callbacks, factory functions, recursão |
| [05-transformar-listas](javascript/src/05-transformar-listas/) | `forEach`, `filter`, `map`, `reduce` e encadeamento |
| [06-assincrono](javascript/src/06-assincrono/) | `setTimeout`, Promises, `async/await`, combinadores (`all`, `race`…) |
| [07-extras](javascript/src/07-extras/) | IIFE, constructor functions, geradoras, `defineProperty`, getters/setters, prototype, herança, mixins |
| [08-classes](javascript/src/08-classes/) | `class`, `extends`/`super`, sobrescrita de métodos, métodos estáticos |

### [Node](node/README.md) · 18 tópicos · 7 temas · 9 projetos

A mesma linguagem fora do navegador — disco, rede e banco de dados.

| Tema | Assuntos |
|---|---|
| [01-modulos](node/src/01-modulos/) | CommonJS (`require`) vs ESM (`import`) |
| [02-npm](node/src/02-npm/) | `package.json`, scripts, nodemon, versionamento `^`, `.env` e `process.env` |
| [03-arquivos-com-fs](node/src/03-arquivos-com-fs/) | `path.resolve`, `__dirname`, ler/escrever/listar arquivos |
| [04-express](node/src/04-express/) | rotas, params/query/body, Router e controllers, views com EJS, estáticos, middlewares |
| [05-mongodb](node/src/05-mongodb/) | conexão com Mongoose, schema, model e validação |
| [06-sessao-e-seguranca](node/src/06-sessao-e-seguranca/) | sessão, cookies e mensagens flash |
| [07-extras](node/src/07-extras/) | webpack e Babel para empacotar o frontend |

Mais os **[projetos das aulas](node/README.md#projetos-das-aulas)** — do primeiro `app.get`
até a agenda completa com login, senha criptografada, CRUD e CSRF.

---

## Como estudar

**Pelo site** (recomendado): [abra a documentação](https://igorpds-fullstack.github.io/meus-cursos/)
ou dê duplo clique em [`docs/index.html`](docs/index.html). Não precisa instalar nada.

Cada exemplo é editável: mude o código, rode de novo, e `↺ original` volta ao que era. Suas
edições e o seu progresso ficam salvos no navegador.
Atalhos: `⌘K` busca por tópico ou exemplo · `◐` troca claro/escuro.

**Pelo terminal**, se preferir:

```bash
node javascript/src/06-assincrono/03-async-await.js       # qualquer tópico de JavaScript

cd node && npm install                            # uma vez: express, ejs, mongoose…
node src/04-express/06-middlewares.js             # qualquer tópico de Node
```

---

## Estrutura do repositório

| Pasta | O que é |
|---|---|
| [`docs/`](docs/) | o site de documentação — HTML puro, sem build, publicado no GitHub Pages |
| [`javascript/`](javascript/README.md) | curso de JavaScript: teoria em `javascript/src/` |
| [`node/`](node/README.md) | curso de Node: teoria em `node/src/`, projetos nas pastas numeradas |
| [`CLAUDE.md`](CLAUDE.md) | o padrão que todo curso segue, para quando for acrescentar tópico |

Cada curso segue o mesmo formato:

```
<CURSO>/
  README.md          índice do curso: trilha, tópicos e onde procurar quando bater dúvida
  HISTORICO.md       log cronológico: o que foi aprendido em cada sessão
  src/NN-<tema>/     um arquivo por tópico, numerado na ordem de aprendizado
  _arquivo/          rascunho antigo — nunca é referência
```

Todo arquivo de tópico abre com **o que é / quando usar / quando não usar**, traz os exemplos
já resolvidos em três seções (`ESSENCIAL`, `NA PRÁTICA`, `PEGADINHAS`) e fecha com um resumo.
Cada bloco é autossuficiente: roda copiado e colado, sem depender de nada acima dele.

### Como as coisas são nomeadas

Pasta e arquivo de tópico sempre em minúsculas, sem acento, com hífen: `05-conteudos-estaticos`.

Já o **código de cada curso segue a convenção do próprio ecossistema**, não uma regra
inventada aqui — a ideia é que o formato visto no estudo seja o mesmo dos projetos de
verdade. Em Node, `LoginModel.js` com maiúscula porque exporta uma classe, e
`homeController.js` com minúscula porque exporta funções soltas. Em Python seria
`snake_case`; em React, `PascalCase` no componente. A tabela completa está no
[CLAUDE.md](CLAUDE.md#como-nomear-pasta-e-arquivo).

---

## Rodando os projetos

Nenhum `node_modules` está no repositório. Em qualquer projeto:

```bash
cd node/08-projeto-agenda
npm install
cp .env.example .env    # preencha com a sua string de conexão do MongoDB
npm start
```

Nenhum segredo é versionado: os `.env` estão no `.gitignore` e o que vai para o repositório
é sempre o `.env.example`, sem valores reais.

---

## Depois de mexer no código de algum tópico

O site é **gerado** a partir dos arquivos em `<CURSO>/src/**` — eles são a única fonte da
verdade. Depois de qualquer mudança:

```bash
node docs/build.mjs      # regenera o conteúdo do site
node docs/testar.mjs     # confere que todo exemplo roda sem erro
node docs/comparar.mjs   # confere que a saída no site é a mesma do terminal
```
