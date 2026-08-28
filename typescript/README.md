# TypeScript

> Trilha 3 de 3. Vem depois de **[Node](../node/README.md)** — mas o pré-requisito de verdade é
> **[JavaScript](../javascript/README.md)**. TypeScript não é outra linguagem: é o mesmo
> JavaScript mais uma camada de tipos que o compilador confere e depois joga fora.

Estudos de TypeScript. Cada arquivo é um tópico fechado: abre com o que é / quando usar /
quando não usar, traz os exemplos resolvidos e fecha com um resumo do que levar para a vida real.

## Como rodar

```bash
node src/02-tipos-basicos/01-primitivos-e-array.ts   # um tópico qualquer

cd typescript && npm install                         # uma vez: só o typescript, para o tsc
npm run check                                        # confere os TIPOS de src/ inteiro

node ../docs/build.mjs                               # atualiza o site depois de mexer em src/
```

**Não existe passo de build.** O Node 22.18+ roda `.ts` direto: ele apaga os tipos e executa o
JavaScript que sobra. Nada de `ts-node`, nada de `tsc` antes de rodar.

Seis tópicos pedem uma flag a mais — o cabeçalho de cada arquivo diz o comando exato:

```bash
node --experimental-transform-types src/03-montar-tipos/03-intersection-e-enum.ts
```

São o tópico de `enum` e os cinco de classes, que usam propriedade de parâmetro no
construtor (`constructor(private nome: string)`). Essas duas construções não são tipo: viram
código de verdade, e o modo padrão do Node só sabe APAGAR, não traduzir. Quem decide isso não
é a mão: o `docs/build.mjs` tenta apagar os tipos de cada arquivo e põe a flag no comando de
quem não passa.

## As duas ferramentas, e por que são duas

| Comando | O que faz | O que não faz |
|---|---|---|
| `node arquivo.ts` | apaga os tipos e roda | não confere nada |
| `npm run check` (`tsc --noEmit`) | confere os tipos | não roda nada |
| o editor (VS Code) | confere enquanto você digita | é o mesmo `tsc`, ao vivo |

É por isso que os arquivos deste curso rodam limpo **e** têm erros de tipo dentro deles, de
propósito. Todo erro demonstrado está marcado com `// @ts-expect-error` e a mensagem do
compilador ao lado. Essa marcação é conferida nos dois sentidos: o `npm run check` passa
apenas se **todo** erro anotado for erro de verdade — e reclama se algum deixar de ser.

Onde o erro de tipo também estouraria na execução, o exemplo o executa dentro de um
`try/catch` e imprime a mensagem. Assim dá para ver, lado a lado, o que o `tsc` acusa antes
de salvar e o que o JavaScript só descobre quando chega na linha.

## O que tem aqui

| Tema | Tópicos | Sobre |
|---|---|---|
| [01-primeiros-passos](src/01-primeiros-passos/) | 3 | por que TypeScript, anotação × inferência, tsconfig e `strict` |
| [02-tipos-basicos](src/02-tipos-basicos/) | 4 | primitivos, array, tupla, objeto, `any`/`unknown`/`void`/`never`, `null` |
| [03-montar-tipos](src/03-montar-tipos/) | 3 | união e literais, `type` × `interface`, intersection e `enum` |
| [04-funcoes](src/04-funcoes/) | 2 | parâmetro e retorno, sobrecarga e `this` tipado |
| [05-estreitar-tipos](src/05-estreitar-tipos/) | 2 | type guards, `as` e tipagem estrutural |
| [06-classes](src/06-classes/) | 5 | modificadores de acesso, herança e `abstract`, `implements`, `static` e getters, relações entre classes |
| [07-generics](src/07-generics/) | 5 | o básico, restrições com `extends`, `keyof`/`typeof`, utility types, generics em interfaces e tipos |
| [08-extras](src/08-extras/) | 5 | decorators (dois tópicos), bibliotecas de fora, módulos e namespaces, do TS ao navegador |

A trilha é sequencial: um tema só depende do que vem antes dele.

## Como este curso foi montado

O conteúdo segue o [curso de TypeScript do Luiz Otávio Miranda](https://github.com/luizomf/cursojstypescript),
reorganizado na trilha deste repositório: as 71 aulas viraram 29 tópicos agrupados por
assunto, em vez da ordem cronológica das aulas.

Duas escolhas se afastam do original, e ficam registradas aqui:

- **Sem webpack e sem `ts-node` no repositório.** O curso original é de 2020, quando rodar
  TypeScript exigia build. Hoje o Node roda `.ts` sozinho, e o build só entra em projeto de
  frontend — que é o assunto do tópico
  [do TypeScript ao navegador](src/08-extras/05-do-typescript-ao-navegador.ts): ele mostra o
  `tsc`, o `webpack.config.js` e o tsconfig do front, sem montar um projeto de webpack aqui.
- **`namespace` mostrado pelo que ele vira.** A sintaxe `namespace` não roda com
  `node arquivo.ts` — e ela é a forma antiga, aposentada pelo `import`. O tópico
  [módulos e namespaces](src/08-extras/04-modulos-e-namespaces.ts) mostra o código do
  namespace e roda a função que o `tsc` gera no lugar dele, que é o que explica o custo dele.
- **Decorators sem a sintaxe `@`.** A `@` não roda em `node arquivo.ts`, e o formato legado
  (`experimentalDecorators`) foi substituído pelo padrão do TypeScript 5. O tópico ensina o
  mecanismo — a função que embrulha —, mostra a sintaxe e explica os dois formatos.

A documentação legível é o site em `docs/` — abra `docs/index.html` no navegador.
