# 07 — API REST

API de escola com Express + Sequelize (MariaDB): autenticação por JWT, CRUD de
usuários e alunos, e upload de fotos com Multer.

## Rodar

```bash
npm install
cp .env.example .env   # ajuste usuário e senha do banco
npm run dev            # ou npm start
```

O banco (`escola`) precisa existir. As **tabelas** não: o boot cria tudo.

## O banco é recriado a cada boot

Com `DB_SYNC_FORCE=true` no `.env`, todo boot **apaga todas as tabelas, recria
zeradas e roda as seeds** — é o `ddl-auto: create-drop` do Spring/JPA, feito com
`sequelize.sync({ force: true })`.

> **Isso destrói os dados.** Serve para estudar, porque cada reinício devolve o
> mesmo estado conhecido. Em qualquer banco que você não possa perder, deixe
> `DB_SYNC_FORCE=false` e use as migrations (`npx sequelize db:migrate`).

Depois do sync, `src/database/seeds/` cria 2 usuários e 4 alunos. Login de teste:
`igor@escola.dev` / `123456`.

## Autenticação

`POST /tokens` troca e-mail + senha por um token válido por 7 dias. Todas as
outras rotas — menos `POST /users`, que é o cadastro — exigem:

```
Authorization: Bearer <token>
```

O middleware `loginRequired` confere a assinatura, a validade **e** se o usuário
do token ainda existe no banco.

## Rotas

| Método | Rota | O que faz |
|---|---|---|
| POST | `/tokens` | login → token |
| POST | `/users` | cadastro (aberta) |
| GET | `/users` `/users/:id` | lista / mostra |
| PUT | `/users` | atualiza o dono do token — exige o corpo completo |
| PATCH | `/users` | atualiza o dono do token — só o que enviar |
| DELETE | `/users` | apaga o dono do token |
| GET/POST | `/alunos` `/alunos/:id` | CRUD de alunos |
| PUT/PATCH/DELETE | `/alunos/:id` | idem — PUT completo, PATCH parcial |
| GET | `/fotos` `/fotos/:id` | lista / mostra |
| POST | `/fotos` | upload (multipart) |
| DELETE | `/fotos/:id` | apaga do banco e do disco |

Usuário mexe em si mesmo: `PUT/PATCH/DELETE /users` não recebem `:id` — o id sai
do token, então ninguém edita a conta alheia trocando um número na URL.

### PUT × PATCH

Os dois atualizam, e a diferença é a exigência do corpo:

- **PUT** substitui o recurso inteiro. Faltou um campo, dá 400.
- **PATCH** aplica só o que veio. Manda `{"idade": 30}` e o resto fica como está.

## Fotos

`POST /fotos` é `multipart/form-data` com o arquivo em `foto` e **um** dono —
`aluno_id` **ou** `user_id`, nunca os dois:

```bash
curl -X POST http://localhost:3001/fotos \
  -H "Authorization: Bearer $TOKEN" \
  -F "foto=@caminho/da/imagem.png" \
  -F "aluno_id=1"
```

Só PNG e JPG, até 2 MB. O arquivo vai para `uploads/` com nome gerado (data +
número aleatório), e a resposta traz a `url` pronta, servida em `/uploads`.
Apagar o dono apaga as fotos junto (FK com `ON DELETE CASCADE`).

## Travas de segurança

- **Senha nunca é gravada em texto.** O model tem um campo `VIRTUAL` `password`
  que existe só em memória; o hook `beforeSave` gera o `password_hash` com
  bcrypt. `password_hash` não entra em nenhuma resposta.
- **Lista de saída.** Cada controller monta a resposta a partir de uma lista fixa
  de campos públicos — coluna nova no model não vaza sozinha.
- **Lista de entrada.** Só campos conhecidos são lidos do corpo. Mandar
  `{"id": 999}` ou `{"password_hash": "..."}` no JSON não muda nada.
- **Login não revela quem existe.** E-mail inexistente e senha errada devolvem a
  mesma mensagem.
- **Upload falhou, arquivo sai do disco.** Se a validação estourar depois do
  Multer gravar, o arquivo é apagado — não sobra órfão.

## Mapa

```
app.js                    middlewares e montagem das rotas
server.js                 prepara o banco e só então sobe o servidor
src/configs/database.js   conexão (DB_LOG=true mostra o SQL)
src/config/multerConfig   destino, nome do arquivo, filtro e limite
src/database/index.js     init dos models, associações e o sync({ force })
src/database/seeds/       dados iniciais
src/middlewares/          loginRequired (JWT)
src/models/               User (hash + virtual), Aluno, Foto
src/controllers/          Home, Token, User, Aluno, Foto
src/routes/               uma rota por recurso
```
