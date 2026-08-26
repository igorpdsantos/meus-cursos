# JavaScript

Estudos de JS. Cada arquivo é um tópico fechado: abre com o que é / quando usar / quando não
usar, traz os exemplos resolvidos e fecha com um resumo do que levar para a vida real.

## Como rodar

```bash
node JS/src/01-fundamentos/01-let-const-var.js   # um tópico qualquer
node docs/build.mjs                              # atualiza o site depois de mexer em src/
```

A documentação legível é o site em `docs/` — abra `docs/index.html` no navegador. Cada exemplo
roda ali mesmo, com terminal e código editável, e a lupa busca por tópico, exemplo ou conceito.

## Trilha

A numeração das pastas é a ordem de aprendizado: um tema só depende do que vem antes dele.

### 01-fundamentos

Variáveis, texto e número — a base de tudo.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-let-const-var.js](src/01-fundamentos/01-let-const-var.js) | as três formas de declarar variável em JS. | 1 |
| [02-strings.js](src/01-fundamentos/02-strings.js) | texto. Em JS a string é imutável — todo método devolve uma string NOVA. | 1 |
| [03-numeros.js](src/01-fundamentos/03-numeros.js) | número em JS é sempre decimal (float). Não existe tipo "inteiro" separado. | 1 |
| [04-split-e-join.js](src/01-fundamentos/04-split-e-join.js) | `split` quebra uma string em array por um separador; `join` cola o array de volta. | 7 |

### 02-arrays-e-objetos

Guardar, copiar e percorrer coleções de dados.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-arrays.js](src/02-arrays-e-objetos/01-arrays.js) | lista ordenada de valores, acessada por índice começando em 0. | 2 |
| [02-copiar-e-cortar.js](src/02-arrays-e-objetos/02-copiar-e-cortar.js) | `slice` COPIA um trecho. `splice` CORTA/INSERE no original. `[...a]` copia tudo. | 5 |
| [03-desestruturacao.js](src/02-arrays-e-objetos/03-desestruturacao.js) | tirar valores de dentro de um objeto/array direto para variáveis, em uma linha. | 2 |
| [04-object-freeze.js](src/02-arrays-e-objetos/04-object-freeze.js) | congela um objeto ou array. Depois disso não dá para alterar, adicionar nem | 7 |
| [05-object-keys-values-entries.js](src/02-arrays-e-objetos/05-object-keys-values-entries.js) | as três formas de transformar um objeto em array — só as chaves, só os valores, | 7 |
| [06-object-assign.js](src/02-arrays-e-objetos/06-object-assign.js) | copia os campos de um ou mais objetos para dentro de um objeto alvo, da esquerda | 7 |

### 03-controle-de-fluxo

Repetir, decidir e lidar com erro.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-for.js](src/03-controle-de-fluxo/01-for.js) | as três formas de repetir quando você sabe quantas voltas vai dar. | 3 |
| [02-while.js](src/03-controle-de-fluxo/02-while.js) | repetição por CONDIÇÃO, quando você não sabe quantas voltas vão acontecer. | 3 |
| [03-try-catch.js](src/03-controle-de-fluxo/03-try-catch.js) | capturar um erro para o programa não morrer no meio. | 3 |

### 04-funcoes

Dar nome a um pedaço de lógica e reaproveitar.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-funcoes-e-parametros.js](src/04-funcoes/01-funcoes-e-parametros.js) | bloco de código com nome, que recebe entradas e devolve uma saída. | 4 |
| [02-escopo.js](src/04-funcoes/02-escopo.js) | o escopo é definido por ONDE você escreveu o código, não por onde ele é chamado. | 4 |
| [03-closures.js](src/04-funcoes/03-closures.js) | uma função que continua lembrando das variáveis do lugar onde nasceu, | 4 |
| [04-callbacks.js](src/04-funcoes/04-callbacks.js) | passar uma função como argumento para que OUTRA decida quando chamá-la. | 4 |
| [05-factory-functions.js](src/04-funcoes/05-factory-functions.js) | uma função comum que MONTA e devolve um objeto pronto. Sem `new`. | 4 |
| [06-recursao.js](src/04-funcoes/06-recursao.js) | função que chama ela mesma até chegar num caso simples que sabe responder. | 4 |

### 05-transformar-listas

filter, map e reduce — o trio do dia a dia.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-foreach.js](src/05-transformar-listas/01-foreach.js) | percorre o array executando algo em cada item. Não devolve nada (`undefined`). | 5 |
| [02-filter.js](src/05-transformar-listas/02-filter.js) | devolve um array NOVO só com os itens em que o teste retornou true. | 5 |
| [03-map.js](src/05-transformar-listas/03-map.js) | devolve um array NOVO do MESMO tamanho, com cada item transformado. | 5 |
| [04-reduce.js](src/05-transformar-listas/04-reduce.js) | percorre o array acumulando UM resultado. Esse resultado pode ser número, | 5 |
| [05-encadeando.js](src/05-transformar-listas/05-encadeando.js) | usar os três na ordem natural do raciocínio — escolher, transformar, resumir. | 5 |

### 06-assincrono

Código que roda depois, sem travar o resto.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-settimeout-setinterval.js](src/06-assincrono/01-settimeout-setinterval.js) | agendar código para rodar depois (`setTimeout`) ou repetir a cada X ms (`setInterval`). | 3 |
| [02-promises.js](src/06-assincrono/02-promises.js) | um objeto que representa um resultado futuro. Ou ele chega (`resolve`), | 7 |
| [03-async-await.js](src/06-assincrono/03-async-await.js) | `await` pausa a função até a Promise responder; `async` marca a função que pode pausar. | 7 |
| [04-promise-combinadores.js](src/06-assincrono/04-promise-combinadores.js) | os quatro jeitos de esperar VÁRIAS promises ao mesmo tempo, cada um com uma regra | 9 |

### 07-extras

Bom conhecer: prototype, herança e o que virá antes de class.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-iife.js](src/07-extras/01-iife.js) | função que se define e se executa na mesma hora: `(function(){ ... })()`. | 4 |
| [02-constructor-functions.js](src/07-extras/02-constructor-functions.js) | função chamada com `new`, que preenche um objeto vazio através do `this`. | 4 |
| [03-geradoras.js](src/07-extras/03-geradoras.js) | função que PAUSA no `yield`, devolve um valor e continua de onde parou. | 4 |
| [04-geradoras-quando-usar.js](src/07-extras/04-geradoras-quando-usar.js) | o critério para escolher entre gerador, array pronto e callback. A pergunta que | 6 |
| [05-define-property.js](src/07-extras/05-define-property.js) | criar propriedade escolhendo as regras dela — se pode ser alterada, se aparece | 7 |
| [06-getters-e-setters.js](src/07-extras/06-getters-e-setters.js) | em vez de guardar um valor, a propriedade guarda duas funções — uma que roda ao ler | 7 |
| [07-descritores.js](src/07-extras/07-descritores.js) | o raio-x de uma propriedade — mostra o valor e as quatro regras dela (`writable`, | 7 |
| [08-prototype.js](src/07-extras/08-prototype.js) | todo objeto tem uma referência interna para outro objeto — o protótipo. Se o campo | 8 |
| [09-heranca-e-delegacao.js](src/07-extras/09-heranca-e-delegacao.js) | ligar o protótipo de um construtor ao de outro, para o filho aproveitar os métodos | 8 |
| [10-composicao-e-mixins.js](src/07-extras/10-composicao-e-mixins.js) | montar o protótipo juntando pequenos objetos de habilidade (mixins) com | 8 |
| [11-tres-formas-de-criar-objetos.js](src/07-extras/11-tres-formas-de-criar-objetos.js) | três padrões de projeto para a mesma tarefa — criar vários objetos do mesmo tipo. | 8 |

### 08-classes

O molde de objetos do JS moderno.

| Tópico | O que é | Sessão |
|---|---|---|
| [01-class-basico.js](src/08-classes/01-class-basico.js) | a sintaxe do JS para criar um molde de objetos — o `constructor` define os dados e | 8 |
| [02-heranca-com-extends.js](src/08-classes/02-heranca-com-extends.js) | `extends` liga uma classe à outra e `super(...)` chama o constructor do pai. | 8 |
| [03-sobrescrever-metodos.js](src/08-classes/03-sobrescrever-metodos.js) | escrever no filho um método com o MESMO nome do pai. Não existe palavra-chave: o | 8 |
| [04-metodos-estaticos.js](src/08-classes/04-metodos-estaticos.js) | método de instância pertence ao objeto criado com `new` e enxerga os dados dele; | 9 |

## Onde procurar quando bater dúvida

| Dúvida | Arquivo |
|---|---|
| "Quebrar texto em lista / juntar lista em texto" | [04-split-e-join.js](src/01-fundamentos/04-split-e-join.js) |
| "Copiei o objeto e alterou os dois" | [02-copiar-e-cortar.js](src/02-arrays-e-objetos/02-copiar-e-cortar.js), [06-object-assign.js](src/02-arrays-e-objetos/06-object-assign.js) |
| "Como percorrer um objeto" | [05-object-keys-values-entries.js](src/02-arrays-e-objetos/05-object-keys-values-entries.js) |
| "Somar/agrupar uma lista" | [04-reduce.js](src/05-transformar-listas/04-reduce.js) |
| "Esperar a API responder" | [02-promises.js](src/06-assincrono/02-promises.js), [03-async-await.js](src/06-assincrono/03-async-await.js) |
| "Vários pedidos ao mesmo tempo" | [04-promise-combinadores.js](src/06-assincrono/04-promise-combinadores.js) |
| "De onde vem esse método que eu não declarei" | [08-prototype.js](src/07-extras/08-prototype.js) |
| "Factory, constructor ou class?" | [11-tres-formas-de-criar-objetos.js](src/07-extras/11-tres-formas-de-criar-objetos.js) |
| "this virou undefined" | [01-class-basico.js](src/08-classes/01-class-basico.js) (bloco 8) |

## Depois deste curso

A trilha continua em **[Node](../Node/README.md)**: a mesma linguagem rodando fora do
navegador — módulos, npm, Express, MongoDB e sessão. Tudo que está aqui vale lá; o que muda
é o lugar onde o código roda e o que ele passa a alcançar (disco, rede e banco de dados).

## Regras da casa

- Cada bloco de exemplo é autossuficiente: declara os próprios dados e roda copiado e colado.
- `ESSENCIAL` tem 3 blocos, `NA PRÁTICA` até 4, `PEGADINHAS` até 2. Máximo de 8 por tópico.
- `_arquivo/` guarda rascunho antigo e **não** é referência.
- O padrão completo está em [CLAUDE.md](../CLAUDE.md).
