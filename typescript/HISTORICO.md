# Histórico — TypeScript

Log cronológico das sessões de estudo. Sessão é o número que aparece no cabeçalho de cada arquivo.
O curso entrou de uma vez, com base no repositório
[luizomf/cursojstypescript](https://github.com/luizomf/cursojstypescript), então as oito
sessões abaixo foram registradas na mesma data.

## Sessão 1 — 28/08/2026

O que o TypeScript acrescenta ao JavaScript, como ele roda sem build e o que o `strict` cobra.

- `01-primeiros-passos/01-por-que-typescript.ts` — Por que TypeScript
- `01-primeiros-passos/02-anotacao-e-inferencia.ts` — Anotação e inferência
- `01-primeiros-passos/03-tsconfig-e-strict.ts` — tsconfig e o modo strict

## Sessão 2 — 28/08/2026

O vocabulário básico: os tipos que descrevem valor e os quatro que não descrevem.

- `02-tipos-basicos/01-primitivos-e-array.ts` — Primitivos e array
- `02-tipos-basicos/02-tupla-e-objeto.ts` — Tupla e tipo de objeto
- `02-tipos-basicos/03-any-unknown-void-never.ts` — any, unknown, void e never
- `02-tipos-basicos/04-null-e-opcional.ts` — null, undefined e opcional

## Sessão 3 — 28/08/2026

Combinar tipos: união, literal, alias, interface, intersection e enum.

- `03-montar-tipos/01-union-e-literais.ts` — União e tipos literais
- `03-montar-tipos/02-alias-e-interface.ts` — type alias e interface
- `03-montar-tipos/03-intersection-e-enum.ts` — Intersection e enum

## Sessão 4 — 28/08/2026

O contrato de uma função escrito por inteiro.

- `04-funcoes/01-parametros-e-retorno.ts` — Parâmetros e retorno
- `04-funcoes/02-overload-e-this.ts` — Sobrecarga e o this tipado

## Sessão 5 — 28/08/2026

Sair de um tipo largo para o certo — e a diferença entre conferir e afirmar.

- `05-estreitar-tipos/01-type-guards.ts` — Type guards
- `05-estreitar-tipos/02-assertions-e-structural.ts` — Type assertions e tipagem estrutural

## Sessão 6 — 28/08/2026

As classes do JavaScript com o que o TypeScript acrescenta a elas.

- `06-classes/01-modificadores-de-acesso.ts` — Modificadores de acesso
- `06-classes/02-heranca-e-abstract.ts` — Herança e classe abstrata
- `06-classes/03-implements-e-interface.ts` — implements e interface na classe
- `06-classes/04-static-e-getters.ts` — static, getters e construtor privado

## Sessão 7 — 28/08/2026

Tipo virando parâmetro, e os tipos que se derivam de outros.

- `07-generics/01-o-basico.ts` — Generics: o básico
- `07-generics/02-restricoes-com-extends.ts` — Restrições com extends
- `07-generics/03-keyof-e-typeof.ts` — keyof, typeof e tipos indexados
- `07-generics/04-utility-types.ts` — Utility types

## Sessão 8 — 28/08/2026

Fora da trilha, mas aparece em projeto de verdade.

- `08-extras/01-decorators.ts` — Decorators
- `08-extras/02-bibliotecas-e-types.ts` — Bibliotecas de fora e declaration files

## Sessão 9 — 28/08/2026

Fechando as aulas do curso original que ainda não tinham lugar na trilha: relações entre
classes, generics em tipos, o resto dos decoradores, módulos e o caminho até o navegador.

- `04-funcoes/02-overload-e-this.ts` — bloco novo: `this` como tipo de retorno (cadeia fluente)
- `06-classes/05-relacoes-entre-classes.ts` — pilares da POO, associação, agregação,
  composição e inversão de dependência
- `07-generics/05-generics-em-interfaces-e-tipos.ts` — `Array`/`Promise`/`Map` como generics,
  interface e type alias genéricos, generic com intersection
- `08-extras/03-decorators-por-dentro.ts` — quando o decorator roda, fábrica, ordem de
  aplicação, decorator de propriedade e de parâmetro
- `08-extras/04-modulos-e-namespaces.ts` — namespace, `/// <reference>`, módulo de hoje,
  JavaScript importado no TypeScript
- `08-extras/05-do-typescript-ao-navegador.ts` — `tsc`, opções de build, bundler, tsconfig do
  front e a validação de formulário tipada

E quatro explicações que faltavam, acrescentadas em tópicos que já existiam:

- `03-montar-tipos/02-alias-e-interface.ts` — `type` × `interface`: o que só cada um faz e a
  regra prática para escolher
- `06-classes/01-modificadores-de-acesso.ts` — `protected` é para superclasse, para classe
  escrita para ser estendida
- `06-classes/02-heranca-e-abstract.ts` — classe abstrata como classe que nunca se instancia,
  método abstrato como contrato e o bloco novo de atributo abstrato
- `06-classes/04-static-e-getters.ts` — a convenção `private _preco` com `get preco`/`set preco`

## Sessão 10 — 29/08/2026

Dois buracos fechados a partir de um exercício de enquete: o curso ensinava `as const` e os
utility types de objeto, mas nada do que filtra tipo sem alargar nem do que filtra união.

- `05-estreitar-tipos/02-assertions-e-structural.ts` — bloco novo de `satisfies`: o contraste
  entre `:` (confere e troca o tipo), `as` (troca sem conferir) e `satisfies` (confere e não
  troca), com `keyof typeof` provando quais chaves sobraram
- `07-generics/04-utility-types.ts` — bloco novo de `Extract` e `Exclude` sobre uma união de
  eventos de loja, mais `NonNullable`: eles filtram MEMBROS de união, não campos de objeto

Os exercícios soltos saíram de `src/` para `exercicios/`, na raiz do curso — dentro de `src/`
o `docs/build.mjs` os tratava como um tema da trilha. A pasta ficou registrada onde faltava:

- `tsconfig.json` — `include` passou a ser `["src", "exercicios"]`. Os exercícios também têm
  `@ts-expect-error`, e marcação que ninguém confere é marcação que envelhece calada.
- `README.md` — seção "Fora da trilha", com `exercicios/` e `.vscode/` (o botão ▷ da extensão
  Code Runner, já com a flag `--experimental-transform-types`).
- `CLAUDE.md` da raiz — `exercicios/` entrou no diagrama de estrutura e virou regra: exercício
  solto fica na raiz do curso, fora da trilha e fora do site, mas dentro do conferidor de tipos.

## Infraestrutura acrescentada nesta leva

O `docs/` aprendeu a lidar com `.ts` sem ganhar dependência nenhuma:

- `docs/build.mjs` lê `.ts` além de `.js`, grava junto de cada bloco a versão sem tipos
  (feita pelo mesmo removedor que o `node arquivo.ts` usa) e descobre sozinho quais arquivos
  precisam da flag `--experimental-transform-types` no comando do cabeçalho.
- `docs/app.js` ganhou um removedor de tipos próprio, para o código **editado** no navegador —
  o único caso em que não há build a consultar.
- `docs/testar.mjs` roda todo bloco de TypeScript pelos dois caminhos e compara a saída, de
  modo que uma divergência entre o removedor do site e o do Node aparece antes de ir para o ar.
