# Site de documentação

Documentação interativa dos cursos. Sem build, sem `npm install`, funciona offline.

## Abrir

Duplo clique em `docs/index.html` (ou arraste para o navegador).

## Como o site é organizado

Três cursos, em sequência — a trilha é essa e não é por acaso: **Node é JavaScript rodando
fora do navegador** e **TypeScript é JavaScript com tipos**. Os três são a mesma linguagem
vista de três lugares.

```
Trilha 1 · JavaScript   a linguagem: variável, função, lista, objeto, assíncrono, classe
        ↓
Trilha 2 · Node         a mesma linguagem no servidor: módulos, npm, Express, banco, sessão
        ↓
Trilha 3 · TypeScript   a mesma linguagem com contrato: tipo, interface, classe tipada, generics
```

A capa mostra as três trilhas com o progresso de cada uma; a barra lateral separa os cursos;
e o rodapé do último tópico de um curso já aponta para o primeiro do seguinte.

## O que tem

- **Cada página abre com 3 exemplos.** É o `ESSENCIAL`. `NA PRÁTICA` e `PEGADINHAS`
  ficam recolhidos logo abaixo — abra quando quiser ir além.
- **Todo exemplo roda no navegador.** Aperte `▶ Rodar` (ou `⌘↵` dentro do editor).
  O terminal mostra a mesma saída que o `node` daria — inclusive código assíncrono,
  que aparece marcado com `⏱`.
- **O código é editável.** Mude, rode de novo, aperte `↺ original` para voltar.
  As edições ficam salvas no navegador.
- **Busca** com `⌘K` (ou `/`): acha tópicos e exemplos por nome ou conceito.
- **Progresso**: marque cada tópico como estudado; o anel na barra lateral acompanha.
- Tema claro/escuro no botão `◐`.

Cada bloco é independente: declara os próprios dados e roda sozinho. Você pode copiar
qualquer bloco e colar em outro lugar que ele funciona igual.

## Os exemplos de Node rodando no navegador

Navegador não tem `require`, nem disco, nem porta de rede. Para os exemplos de Node rodarem
mesmo assim, o `app.js` traz uma imitação enxuta dos módulos internos:

| Módulo | Como se comporta aqui |
|---|---|
| `path` | igual ao de verdade — é só cálculo de texto |
| `fs`, `fs/promises` | disco de mentira, na memória; some ao recarregar a página |
| `os` | `tmpdir()`, `homedir()` e `platform()` com valores fixos |
| `http` | servidor na memória; o `fetch` da caixa fala com ele |
| `express` | rotas, Router, middlewares, params/query/body, send/json/render/redirect/static |
| `ejs` | `<%= %>`, `<%- %>`, `<% %>` e `include` |
| `express-session`, `connect-flash` | sessão com cookie e id, e o flash lido-uma-vez |
| `mongoose` | Schema, model, validação, ValidationError e CastError |
| `sequelize` | conexão, `define`, validação, hooks, associação, `Op` e queryInterface — tabela em memória |
| `bcryptjs` | hash de 60 caracteres com sal sorteado, e `compare` que confere |
| `jsonwebtoken` | as três partes, a validade e os erros com os nomes de verdade |
| `multer`, `FormData`, `Blob`, `Buffer` | multipart montado no envio e separado na chegada; grava no disco de mentira |
| `require('./arquivo.js')` | carrega arquivo escrito pelo próprio exemplo, com `module.exports` |
| `__dirname`, `process.cwd()` | caminho de mentira (`/Users/igor/Cursos/...`), só para a saída ficar realista |
| `Promise` | instrumentada, para o `console.log` imprimir `Promise { 42 }` como o node, e não `{}` |

Não é encenação: `node docs/comparar.mjs` roda cada bloco **duas vezes** — no Node de verdade,
com as bibliotecas instaladas em `node/`, e aqui no sandbox — e compara as duas saídas. Hoje
**nenhum dos 647 blocos diverge**. O relatório separa em quatro grupos, porque nem toda
diferença é defeito:

| Grupo | O que quer dizer |
|---|---|
| ✓ igual | o site mostra exatamente o que o node mostra — todo o resto |
| ~ instável | o próprio node muda de saída a cada rodada, então não há o que comparar — 3 a 5 blocos, os que medem tempo em ms ou sorteiam |
| ⌨ só terminal | usa módulo que o navegador não tem, e o site avisa em vez de fingir — 2 blocos |
| ≠ diferente | divergência de verdade, para investigar — **nenhum** |

Para não acusar o site à toa, o comparador roda o node mais cinco vezes antes de apontar
diferença: se o node não repete a própria saída, o bloco entra em *instável*.

Um exemplo que peça algo fora dessa lista (`child_process`, por exemplo) não quebra: o terminal
mostra um aviso **ⓘ** com o comando para rodar de verdade no seu terminal.

## Os exemplos de TypeScript rodando no navegador

O sandbox executa JavaScript, e `new Function` não sabe o que fazer com `: string`. O tipo
some antes de chegar nele, e por dois caminhos:

- **Código como veio do arquivo**: o `docs/build.mjs` grava no `content.js`, junto de cada
  bloco, a versão sem tipos — feita pelo mesmo removedor que o `node arquivo.ts` usa por dentro.
  O que aparece na tela continua sendo o código com os tipos.
- **Código editado no bloco**: aí não há build a consultar, e o `app.js` tira os tipos na hora,
  com um removedor próprio, escrito para o TypeScript que o curso usa.

O `docs/testar.mjs` roda **todo** bloco de TypeScript pelos dois caminhos e compara a saída
linha por linha. Enquanto ele passar, o que você edita no site se comporta como o que o
`node` roda no terminal.

Isso é o site. No seu computador, os arquivos em `<CURSO>/src/**` rodam com o Node de verdade:
`node node/src/04-express/06-middlewares.js`.

## Atualizar depois de mexer no código

Os arquivos em `<CURSO>/src/**` (hoje `javascript/` e `node/`) são a única fonte da verdade.
Depois de adicionar ou editar um tópico, regenere o conteúdo do site:

```
node docs/build.mjs
```

Isso reescreve `docs/content.js` lendo os cabeçalhos (`O QUE É` / `QUANDO USAR` /
`QUANDO NÃO USAR`), as seções `// ═══ NOME ═══`, os blocos `// ─── N) título ───` e o
bloco final `// ─── Resumo ───`.
Seguindo o padrão do `CLAUDE.md`, o tópico novo aparece sozinho — não há nada para
editar à mão aqui.

## Conferir se está tudo rodando

```
node docs/testar.mjs      # todo bloco roda? (não precisa de npm install)
node docs/comparar.mjs    # o site mostra a mesma saída que o node? (precisa do npm install em node/)
```

Passa **todos** os blocos do site pelo mesmo sandbox do navegador e lista o que quebrou.
É o jeito rápido de garantir duas coisas depois de mexer em `src/`: que cada bloco roda
sozinho (sem depender de variável declarada em outro) e que nada quebrou no site.

Nos blocos de TypeScript ele confere uma terceira: roda cada um pelos **dois** removedores de
tipo — o do build e o do `app.js`, usado no código editado — e compara a saída linha por linha.
É o que mantém o bloco editado se comportando como o que o `node` roda no terminal.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | estrutura da página |
| `style.css` | tema, layout, realce de sintaxe |
| `app.js` | roteamento, editor, busca, o sandbox que executa o código e o removedor de tipos do TypeScript editado |
| `build.mjs` | lê `<CURSO>/src/**`, ordena a trilha, tira os tipos dos `.ts` e gera o `content.js` |
| `testar.mjs` | roda todo bloco no sandbox, aponta o que falha e compara os dois removedores de tipo |
| `comparar.mjs` | roda cada bloco no node e no sandbox e compara a saída |
| `content.js` | **gerado** — não edite à mão |
