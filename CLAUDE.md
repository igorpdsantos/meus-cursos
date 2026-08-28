# Cursos — Regras do Repositório

Repositório de estudos. Cada curso vive em sua própria pasta na raiz (`javascript/`, `python/`, `sql/`...).
Este arquivo define o padrão que **todo** curso segue. Não altere o padrão sem pedido explícito.

## Estrutura de um curso

```
<CURSO>/
  README.md          # índice: o que já foi aprendido, mapa de arquivos, como rodar
  HISTORICO.md       # log cronológico: data + sessões + tópicos adicionados
  src/
    NN-<tema>/
      README.md      # teoria do tema: o que é, quando usar, quando não usar, pegadinhas
      NN-<topico>.<ext>
  _arquivo/          # anotações antigas/rascunhos. Nunca é referência.
```

- Pastas e arquivos numerados (`01-`, `02-`) para manter a ordem de aprendizado.
- Um arquivo por tópico. Se um tópico ficar com mais de ~120 linhas, quebre em dois.
- A numeração das pastas é a **trilha de aprendizado**: um tema só pode depender do que
  vem antes dele. Tópico que não cabe na trilha vai para `07-extras`.
- Projetos de aula ficam na raiz do curso, numerados na mesma trilha
  (`00-aula-express/`, `07-api-rest/`, `08-projeto-agenda/`). Cada um é um projeto
  independente, com o seu `package.json`, o seu `.gitignore` e o seu `npm install`.

## Como nomear pasta e arquivo

**A regra geral, que vale em todo curso:** pasta e arquivo de tópico em minúsculas,
sem acento, separados por hífen (`kebab-case`). `05-conteudos-estaticos`, não
`05 - Conteúdos Estáticos`.

Fora disso, **o código de cada curso segue a convenção do próprio ecossistema** — não a
deste repositório. O objetivo é que o aprendiz veja aqui o mesmo formato que vai encontrar
em qualquer projeto de verdade lá fora. Forçar um padrão único no repositório inteiro
deixaria tudo uniforme e todo mundo errado.

| Curso | Pastas | Arquivos de código | Exemplo |
|---|---|---|---|
| **Todos** | `kebab-case` | tópico da trilha em `kebab-case` | `src/04-express/06-middlewares.js` |
| **JavaScript** | `kebab-case` | `kebab-case` | `03-async-await.js` |
| **Node / Express** | `kebab-case` | `PascalCase` se o arquivo exporta uma classe ou um model; `camelCase` para o resto | `models/LoginModel.js`, `controllers/homeController.js`, `routes/homeRoutes.js` |
| **TypeScript** | `kebab-case` | igual ao Node; tipo e interface em `PascalCase` dentro do arquivo | `services/userService.ts`, `models/User.ts` |
| **React** | `kebab-case` | `PascalCase` para componente (arquivo e função com o mesmo nome); `camelCase` para hook (`use…`) e utilitário | `components/CardProduto.jsx`, `hooks/useCarrinho.js` |
| **Python** | `snake_case` | `snake_case` — é o que a PEP 8 manda | `validacao_cpf.py` |

Documento na raiz do curso é `MAIÚSCULO.md`: `README.md`, `HISTORICO.md`, `CLAUDE.md`.

Curso novo que não esteja na tabela: acrescente a linha dele aqui antes de criar o
primeiro arquivo.

## Padrão de cada arquivo de código

Todo arquivo começa com este cabeçalho e nada mais:

```js
/**
 * <Tópico>
 * Sessão <N> · Rodar: node src/<pasta>/<arquivo>
 *
 * O QUE É: uma frase.
 * QUANDO USAR: uma ou duas frases.
 * QUANDO NÃO USAR: uma ou duas frases.
 */
```

Depois, os exercícios **já resolvidos**, divididos em três seções nesta ordem:

```js
// ═══ ESSENCIAL ═══
// ─── 1) <Título curto> ────────────────────────────────────────

// ═══ NA PRÁTICA ═══
// ─── 4) <Título curto> ────────────────────────────────────────

// ═══ PEGADINHAS ═══
// ─── 7) <Título curto> ────────────────────────────────────────
```

**Regra que manda em todas as outras: cada bloco é autossuficiente.**
Ele declara os próprios dados e roda sozinho, copiado e colado em qualquer lugar. Nenhum
bloco pode usar variável declarada em outro bloco, nem no topo do arquivo. Se dois blocos
precisam do mesmo dado, cada um declara o seu — repetir três linhas é melhor do que obrigar
o aprendiz a rolar a página para trás procurando de onde saiu a variável. Não existe
código antes do primeiro `// ═══`; o `docs/build.mjs` avisa se aparecer.

Cada bloco deve caber na tela: prefira o exemplo mais curto que ainda prova o ponto.

Regras das seções:
- **`ESSENCIAL` tem exatamente 3 blocos.** É o mínimo para alguém dizer que sabe o tópico.
  São os únicos que abrem por padrão no site — o resto fica recolhido.
- **`NA PRÁTICA`**: de 1 a 4 blocos, onde o assunto aparece em trabalho de verdade.
- **`PEGADINHAS`**: de 1 a 2 blocos, o que costuma dar errado. Opcional.
- Um tópico tem no máximo 8 blocos no total. Passou disso, corte ou vire dois tópicos.

Regras dos exemplos:
- **Título curto e direto**, sem prefixo repetido. A seção já diz o que é: não escreva
  "Caso real:" dentro de `NA PRÁTICA`.
- **Caso real sempre.** Carrinho de compras, folha de pagamento, validação de formulário,
  relatório de vendas, lista de tarefas. Nunca `foo`, `bar`, `teste1`.
- **Direto ao ponto.** Sem classes, sem framework, sem abstração que o tópico não exige.
- **Código que roda, não código comentado.** Se o tópico é sobre Express, o bloco usa Express
  de verdade: sobe o servidor numa porta livre, faz o pedido com `fetch`, imprime a resposta
  e fecha. Trecho comentado só para mostrar como aquilo fica dividido nos arquivos do projeto.
- **Comentário só onde explica o porquê**, não o óbvio. Uma linha, no fim da linha de código
  ou logo acima do bloco.
- **Sempre imprime resultado** com `console.log` para o aprendiz ver rodando.
- O arquivo tem que rodar limpo: `node <arquivo>` sem erro e sem depender de navegador.
  Se o tópico for de navegador (`prompt`, `document`), simule a entrada com uma variável.
- Fecha com um bloco `// ─── Resumo ───` de 3 a 6 linhas: o que levar para a vida real.

## Onde a documentação vive

Não existe `README.md` por tema. A documentação legível é o site em `docs/`, gerado a
partir dos próprios arquivos de código. O que o site mostra vem daqui:

| No site | De onde sai |
|---|---|
| Título e sessão do tópico | 1ª e 2ª linha do cabeçalho |
| Cartões "Quando usar" / "Quando não usar" | campos do cabeçalho |
| Seções recolhíveis | `// ═══ NOME ═══` |
| Cada exemplo com terminal | `// ─── N) título ───` |
| Bloco final "O que levar" | `// ─── Resumo ───` |

Ou seja: **escrever o arquivo de código no padrão já é escrever a documentação.**
Linguagem simples, em português. Termo técnico só se necessário — e aí explica na hora,
com exemplo. Sem parágrafo longo, sem repetir o que o código já mostra.

## Quando o Igor disser "aprendi X, Y, Z"

1. Descubra a que tema/sessão os tópicos pertencem (ou crie a próxima pasta `NN-<tema>`).
2. Crie um arquivo de código por tópico, seguindo o padrão acima.
3. Se for tema novo, registre título/ícone/cor/resumo no mapa `TEMAS` de `docs/build.mjs`.
   Se for CURSO novo, registre também no mapa `CURSOS` (título, selo, ordem na trilha e o
   curso que vem antes) — é o que põe o curso na sequência certa do site.
4. Rode `node` em cada arquivo novo e confirme que a saída está correta.
5. Rode `node docs/build.mjs` para o site enxergar o tópico novo, `node docs/testar.mjs`
   para conferir que todo bloco roda no sandbox e `node docs/comparar.mjs` para conferir que
   a saída no site é a mesma do terminal. Biblioteca nova usada num exemplo precisa de uma
   imitação no `app.js` — senão o bloco só roda no terminal.
6. Nunca reescreva conteúdo já existente sem pedido — só acrescente.

## Site de documentação (`docs/`)

Documentação interativa em HTML puro, sem build e sem dependência. Abre com duplo clique
em `docs/index.html`. Cada exemplo roda no próprio navegador, com terminal e código editável.

Os cursos aparecem em sequência (JavaScript → Node), porque a trilha é sequencial: Node é a
mesma linguagem rodando fora do navegador. O sandbox do site imita `require`, `path`, `fs`,
`os`, `http`, `express`, `ejs`, `express-session`, `connect-flash`, `mongoose`, `sequelize`,
`bcryptjs`, `jsonwebtoken` e `multer` (com `FormData`, `Blob` e `Buffer`), então os
exemplos de servidor, de banco e de upload rodam ali mesmo. Exemplo que dependa de algo que o navegador não tem
(`child_process`, por exemplo) avisa para rodar no terminal.

O site **lê** os arquivos de `<CURSO>/src/**` — nunca o contrário. O padrão de cabeçalho e de
blocos definido acima é o que o gerador usa para montar as páginas, então segui-lo à risca
é o que mantém o site correto. Depois de qualquer mudança em `src/`, rode:

```
node docs/build.mjs
```

Só `docs/content.js` é gerado; o resto (`index.html`, `style.css`, `app.js`) é escrito à mão.
