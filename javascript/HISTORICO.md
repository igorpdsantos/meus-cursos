# Histórico — JavaScript

Log cronológico das sessões de estudo. Sessão é o número que aparece no cabeçalho de cada arquivo.
As datas das sessões 1 a 6 não foram registradas na época; ficam sem data de propósito, para não
inventar informação.

## Sessão 1 — data não registrada

Fundamentos: variável, texto e número.

- `01-fundamentos/01-let-const-var.js` — let, const e var
- `01-fundamentos/02-strings.js` — Strings: tratamento de texto
- `01-fundamentos/03-numeros.js` — Números: Math e Number

## Sessão 2 — data não registrada

Arrays, objetos e desestruturação.

- `02-arrays-e-objetos/01-arrays.js` — Arrays: criar, buscar e ordenar
- `02-arrays-e-objetos/03-desestruturacao.js` — Desestruturação de objetos e arrays

## Sessão 3 — data não registrada

Laços, erro e agendamento de código.

- `03-controle-de-fluxo/01-for.js` — Repetir com for: for...of, for clássico e for...in
- `03-controle-de-fluxo/02-while.js` — Repetir com while: while, do...while, break e continue
- `03-controle-de-fluxo/03-try-catch.js` — Tratar erro: try, catch e finally
- `06-assincrono/01-settimeout-setinterval.js` — setTimeout e setInterval

## Sessão 4 — data não registrada

Funções: escopo, closure, callback, factory e o caminho até class.

- `04-funcoes/01-funcoes-e-parametros.js` — Funções e parâmetros
- `04-funcoes/02-escopo.js` — Escopo: quem enxerga quem
- `04-funcoes/03-closures.js` — Closures
- `04-funcoes/04-callbacks.js` — Callbacks
- `04-funcoes/05-factory-functions.js` — Factory Functions
- `04-funcoes/06-recursao.js` — Recursão
- `07-extras/01-iife.js` — IIFE — função que se executa sozinha
- `07-extras/02-constructor-functions.js` — Constructor functions e o caminho até class
- `07-extras/03-geradoras.js` — Funções geradoras (function)

## Sessão 5 — data não registrada

Transformar listas e copiar coleções sem estragar o original.

- `02-arrays-e-objetos/02-copiar-e-cortar.js` — Copiar e cortar arrays: slice, splice e spread
- `05-transformar-listas/01-foreach.js` — forEach
- `05-transformar-listas/02-filter.js` — filter — escolher itens
- `05-transformar-listas/03-map.js` — map — transformar itens
- `05-transformar-listas/04-reduce.js` — reduce — resumir a lista em um valor
- `05-transformar-listas/05-encadeando.js` — Encadeando filter, map e reduce

## Sessão 6 — data não registrada

Quando funções geradoras valem a pena.

- `07-extras/04-geradoras-quando-usar.js` — Geradoras: quando usar (e quando não)

## Sessão 7 — 2026-08-19

Texto ↔ lista, congelar e inspecionar objetos, e a base de assíncrono.

- `01-fundamentos/04-split-e-join.js` — split e join — texto vira lista, lista vira texto
- `02-arrays-e-objetos/04-object-freeze.js` — Object.freeze — travar o conteúdo do objeto
- `02-arrays-e-objetos/05-object-keys-values-entries.js` — Object.keys, values e entries
- `02-arrays-e-objetos/06-object-assign.js` — Object.assign — juntar objetos
- `06-assincrono/02-promises.js` — Promise — o valor que ainda não chegou
- `06-assincrono/03-async-await.js` — async e await — Promise escrita de cima para baixo
- `07-extras/05-define-property.js` — Object.defineProperty e defineProperties
- `07-extras/06-getters-e-setters.js` — get e set dentro de defineProperty
- `07-extras/07-descritores.js` — getOwnPropertyDescriptor e getOwnPropertyDescriptors

## Sessão 8 — 2026-08-19

Prototype, delegação, composição e classes.

- `07-extras/08-prototype.js` — prototype e a cadeia de protótipos
- `07-extras/09-heranca-e-delegacao.js` — Herança (que na verdade é delegação)
- `07-extras/10-composicao-e-mixins.js` — Composição e mixins com prototype
- `07-extras/11-tres-formas-de-criar-objetos.js` — Factory, constructor function e class
- `08-classes/01-class-basico.js` — class: o básico
- `08-classes/02-heranca-com-extends.js` — Herança com extends e super
- `08-classes/03-sobrescrever-metodos.js` — Sobrescrever métodos do pai

## Sessão 9 — 2026-08-20

Estáticos e os combinadores de Promise.

- `06-assincrono/04-promise-combinadores.js` — Promise.all, allSettled, race e any
- `08-classes/04-metodos-estaticos.js` — Métodos de instância e estáticos

## Como registrar uma sessão nova

1. Crie/atualize os arquivos em `src/`, seguindo o padrão de [CLAUDE.md](../CLAUDE.md).
2. Numere a sessão no cabeçalho de cada arquivo novo (`Sessão N · Rodar: ...`).
3. Rode `node <arquivo>` em cada um e confira a saída.
4. Rode `node docs/build.mjs` para o site enxergar o tópico novo.
5. Acrescente a sessão aqui e a linha correspondente no [README.md](README.md).
