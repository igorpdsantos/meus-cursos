# Node

> Trilha 2 de 2. Vem depois de **[JavaScript](../javascript/README.md)** — Node não é outra linguagem,
> é o mesmo JavaScript rodando fora do navegador. Função, objeto, array, `async/await` e
> desestruturação são exatamente os de lá.

Estudos de Node e Express. Cada arquivo é um tópico fechado: abre com o que é / quando usar /
quando não usar, traz os exemplos resolvidos e fecha com um resumo do que levar para a vida real.

## Como rodar

```bash
cd node && npm install                            # uma vez: express, ejs, mongoose, session, flash
node src/04-express/01-servidor-e-rotas.js        # um tópico qualquer
node ../docs/build.mjs                            # atualiza o site depois de mexer em src/
```

Os exemplos usam as bibliotecas **de verdade**: cada tópico de Express sobe um servidor numa
porta livre, faz os próprios pedidos com `fetch`, imprime as respostas e fecha. Nada de código
só comentado — o que está escrito é o que roda.

O que não dá para rodar sem infraestrutura aparece do jeito honesto: o tópico de MongoDB usa o
Mongoose de verdade para schema, validação e erros (que funcionam sem banco), e mostra a falha
de conexão como ela é.

`src/` é a teoria destilada. Os projetos completos das aulas ficam nas pastas ao lado — cada
um é um projeto npm independente, com o seu próprio `package.json` e o seu próprio
`npm install`.

A documentação legível é o site em `docs/` — abra `docs/index.html` no navegador.

## Projetos das aulas

Nenhum vem com `node_modules` no repositório. Para rodar qualquer um:

```bash
cd node/<projeto>
npm install
npm start
```

Os nove sobem e respondem em `http://localhost:3000` (o `07-api-rest` usa a 3001).

| Projeto | O que se constrói | Stack |
|---|---|---|
| [00-aula-express](00-aula-express/) | o primeiro servidor: uma rota, uma resposta. | express |
| [01-aula-express-nodemon](01-aula-express-nodemon/) | o mesmo servidor, agora reiniciando sozinho a cada save. | express · nodemon |
| [02-params-query-body](02-params-query-body/) | as três portas de entrada de dado: rota, query string e corpo do formulário. | express |
| [03-routers-controllers](03-routers-controllers/) | o mapa de rotas sai do `server.js` e a lógica vai para os controllers. | express · Router |
| [04-views](04-views/) | páginas renderizadas no servidor com EJS, em vez de HTML escrito na mão. | express · ejs |
| [05-conteudos-estaticos](05-conteudos-estaticos/) | CSS, imagem e JS servidos crus pela pasta `public/`. | express · ejs · static |
| [06-webpack-e-middleware](06-webpack-e-middleware/) | a virada: middlewares, MongoDB, sessão, flash e build de frontend. | express · mongoose · session · webpack |
| [07-api-rest](07-api-rest/) | API de escola em JSON: banco SQL com Sequelize, login por JWT, CRUD de alunos e usuários e upload de fotos. Único que escreve `import`/`export`, transpilado pelo sucrase. | express · sequelize · mariadb · jsonwebtoken · bcryptjs · multer · sucrase |
| [08-projeto-agenda](08-projeto-agenda/) | **projeto final** — cadastro, login com senha criptografada, CRUD de contatos e proteção contra CSRF. | express · mongoose · bcryptjs · csurf · helmet · webpack |

Os projetos que falam com banco precisam de um `.env`. Cada um traz um `.env.example`:
copie para `.env` e preencha — string de conexão do MongoDB nos que usam Mongoose, usuário
e senha do MariaDB no `07-api-rest`.

```bash
cp .env.example .env
```

## Trilha

A numeração das pastas é a ordem de aprendizado: um tema só depende do que vem antes dele.

### 01-modulos

Quebrar o programa em arquivos.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-commonjs-vs-esm.js](src/01-modulos/01-commonjs-vs-esm.js) | os dois jeitos de quebrar um programa em arquivos: `require` e `import`. | 1 |

### 02-npm

package.json, dependências, scripts e configuração de ambiente.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-package-json.js](src/02-npm/01-package-json.js) | o arquivo que diz o nome do projeto, o que ele precisa e o que ele sabe rodar. | 1 |
| [02-scripts-e-nodemon.js](src/02-npm/02-scripts-e-nodemon.js) | `npm start` e o nodemon reiniciando o servidor a cada save. | 1 |
| [03-dependencias-e-versoes.js](src/02-npm/03-dependencias-e-versoes.js) | dependencies x devDependencies e a notação `^5.2.1`. | 1 |
| [04-variaveis-de-ambiente.js](src/02-npm/04-variaveis-de-ambiente.js) | `process.env`, o `.env` e o dotenv. | 4 |

### 03-arquivos-com-fs

Caminhos e disco.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-path-e-dirname.js](src/03-arquivos-com-fs/01-path-e-dirname.js) | montar caminho que não quebra: `path.resolve(__dirname, ...)`. | 3 |
| [02-ler-e-escrever.js](src/03-arquivos-com-fs/02-ler-e-escrever.js) | ler, escrever, listar pasta e tratar arquivo que não existe. | 3 |

### 04-express

Servidor, rotas, views e middlewares.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-servidor-e-rotas.js](src/04-express/01-servidor-e-rotas.js) | `app.get`, `app.listen`, `req` e `res`. | 1 |
| [02-params-query-body.js](src/04-express/02-params-query-body.js) | os três caminhos por onde o dado do usuário entra. | 2 |
| [03-router-e-controllers.js](src/04-express/03-router-e-controllers.js) | separar o mapa de rotas da lógica que responde. | 2 |
| [04-views-com-ejs.js](src/04-express/04-views-com-ejs.js) | HTML com buracos, preenchido por `res.render`. | 3 |
| [05-arquivos-estaticos.js](src/04-express/05-arquivos-estaticos.js) | `express.static` e a pasta `public/`. | 3 |
| [06-middlewares.js](src/04-express/06-middlewares.js) | a fila `(req, res, next)` por onde toda requisição passa. | 4 |

### 05-mongodb

Guardar dados de verdade.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-conexao-com-mongoose.js](src/05-mongodb/01-conexao-com-mongoose.js) | conectar uma vez, na subida do servidor. | 4 |
| [02-schema-e-model.js](src/05-mongodb/02-schema-e-model.js) | o contrato do documento e as operações do model. | 4 |

### 06-sessao-e-seguranca

Lembrar do visitante entre requisições.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-sessao-e-cookies.js](src/06-sessao-e-seguranca/01-sessao-e-cookies.js) | o crachá: cookie com o id, dados no servidor. | 4 |
| [02-mensagens-flash.js](src/06-sessao-e-seguranca/02-mensagens-flash.js) | recado de uso único que sobrevive ao redirect. | 4 |

### 07-extras

Fora da trilha, bom conhecer.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-webpack-e-babel.js](src/07-extras/01-webpack-e-babel.js) | empacotar o frontend e servir pelo Express. | 4 |

## Onde procurar quando bater dúvida

| Dúvida | Arquivo |
|---|---|
| "req.body chegou undefined" | [02-params-query-body.js](src/04-express/02-params-query-body.js), [06-middlewares.js](src/04-express/06-middlewares.js) |
| "Em que ordem registrar os middlewares" | [06-middlewares.js](src/04-express/06-middlewares.js) (bloco 8) |
| "O css não carregou na página interna" | [05-arquivos-estaticos.js](src/04-express/05-arquivos-estaticos.js) (bloco 7) |
| "nome is not defined na view" | [04-views-com-ejs.js](src/04-express/04-views-com-ejs.js) (bloco 8) |
| "O F5 cadastrou tudo de novo" | [02-mensagens-flash.js](src/06-sessao-e-seguranca/02-mensagens-flash.js) |
| "Salvou no banco 'test' em vez do meu" | [01-conexao-com-mongoose.js](src/05-mongodb/01-conexao-com-mongoose.js) |
| "Onde guardar a senha do banco" | [04-variaveis-de-ambiente.js](src/02-npm/04-variaveis-de-ambiente.js) |
| "É dependency ou devDependency?" | [03-dependencias-e-versoes.js](src/02-npm/03-dependencias-e-versoes.js) |
| "require ou import?" | [01-commonjs-vs-esm.js](src/01-modulos/01-commonjs-vs-esm.js) |

## Regras da casa

- Cada bloco de exemplo é autossuficiente: declara os próprios dados e roda copiado e colado.
- `ESSENCIAL` tem 3 blocos, `NA PRÁTICA` até 4, `PEGADINHAS` até 2. Máximo de 8 por tópico.
- O padrão completo está em [CLAUDE.md](../CLAUDE.md).
