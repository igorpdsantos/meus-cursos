/* GERADO por docs/build.mjs — não edite à mão. Edite os .js em <CURSO>/src/ e rode o build. */
window.CONTEUDO = [
 {
  "slug": "JS",
  "titulo": "JavaScript",
  "selo": "JS",
  "subtitulo": "A linguagem",
  "ordem": 1,
  "cor": "#f5d76e",
  "resumo": "A base de tudo: variável, texto, lista, objeto, função, assíncrono e classe. O mesmo JavaScript que roda no navegador e no servidor.",
  "depoisDe": null,
  "temas": [
   {
    "slug": "01-fundamentos",
    "titulo": "Fundamentos",
    "icone": "◆",
    "cor": "#f2c14e",
    "resumo": "Variáveis, texto e número — a base de tudo.",
    "topicos": [
     {
      "slug": "01-let-const-var",
      "arquivo": "JS/src/01-fundamentos/01-let-const-var.js",
      "comando": "node src/01-fundamentos/01-let-const-var.js",
      "titulo": "let, const e var",
      "sessao": 1,
      "oQueE": "as três formas de declarar variável em JS.",
      "quandoUsar": "`const` por padrão. `let` só quando o valor vai ser reatribuído.",
      "quandoNaoUsar": "`var` — nunca em código novo. Ignora escopo de bloco e gera bug silencioso.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "const é o padrão; let só quando o valor muda",
        "secao": "ESSENCIAL",
        "codigo": "const loja = 'Mercado Central';   // nunca vai ser outro\nlet itens = 0;                    // vai mudar a cada clique\n\nitens++;\nitens++;\nconsole.log(`${loja}: ${itens} itens`);"
       },
       {
        "n": 2,
        "titulo": "const trava a variável, não o conteúdo",
        "secao": "ESSENCIAL",
        "codigo": "const carrinho = [];\ncarrinho.push('Teclado');         // permitido: o array continua sendo o mesmo\nconsole.log(carrinho);\n\n// carrinho = [];                 ← TypeError: Assignment to constant variable"
       },
       {
        "n": 3,
        "titulo": "let e const só existem dentro do bloco",
        "secao": "ESSENCIAL",
        "codigo": "if (true) {\n  const frete = 0;\n  console.log('Dentro do if:', frete);\n}\n// console.log(frete);            ← ReferenceError: frete não existe aqui fora\nconsole.log('Fora do if a variável frete não existe.');"
       },
       {
        "n": 4,
        "titulo": "Congelar uma config para ninguém trocar por acidente",
        "secao": "NA PRÁTICA",
        "codigo": "const CONFIG = Object.freeze({ moeda: 'BRL', tentativas: 3 });\n\nCONFIG.tentativas = 99;           // ignorado em silêncio, sem erro\nconsole.log(CONFIG.tentativas);"
       },
       {
        "n": 5,
        "titulo": "var vaza do bloco",
        "secao": "PEGADINHAS",
        "codigo": "for (var i = 0; i < 3; i++) { /* ... */ }\nconsole.log('var i depois do loop:', i);   // 3 — escapou\n\nfor (let j = 0; j < 3; j++) { /* ... */ }\n// console.log(j);                ← ReferenceError: let morre junto com o loop, que é o certo\nconsole.log('let j não existe aqui — por isso var saiu de uso.');"
       }
      ],
      "resumo": [
       "Escreva `const` sempre. Troque para `let` só quando precisar reatribuir.",
       "`const` impede trocar a variável, não impede mudar o array/objeto de dentro.",
       "Para congelar o conteúdo também, use `Object.freeze`.",
       "`let`/`const` vivem entre `{ }`; `var` vaza — não use."
      ]
     },
     {
      "slug": "02-strings",
      "arquivo": "JS/src/01-fundamentos/02-strings.js",
      "comando": "node src/01-fundamentos/02-strings.js",
      "titulo": "Strings: tratamento de texto",
      "sessao": 1,
      "oQueE": "texto. Em JS a string é imutável — todo método devolve uma string NOVA.",
      "quandoUsar": "nome, e-mail, CPF, slug, mensagem, qualquer dado que o usuário digita.",
      "quandoNaoUsar": "para guardar número que vai entrar em cálculo. Converta antes.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Limpar o que o usuário digitou",
        "secao": "ESSENCIAL",
        "codigo": "const digitado = '   Ana Paula SILVA  ';\n\nconsole.log(`[${digitado.trim()}]`);              // tira espaço das pontas\nconsole.log(digitado.trim().toLowerCase());\nconsole.log(digitado.trim().toUpperCase());"
       },
       {
        "n": 2,
        "titulo": "Procurar dentro do texto",
        "secao": "ESSENCIAL",
        "codigo": "const email = 'ana@empresa.com.br';\n\nconsole.log('Tem @?    ', email.includes('@'));\nconsole.log('É .br?    ', email.endsWith('.br'));\nconsole.log('Onde é o @:', email.indexOf('@'));   // -1 quando não acha"
       },
       {
        "n": 3,
        "titulo": "Cortar e juntar",
        "secao": "ESSENCIAL",
        "codigo": "const nomeCompleto = 'Ana Paula Silva';\n\nconsole.log(nomeCompleto.split(' '));             // texto → array\nconsole.log(nomeCompleto.split(' ')[0]);          // primeiro nome\nconsole.log(nomeCompleto.slice(0, 3));            // 3 primeiras letras\nconsole.log(`Olá, ${nomeCompleto.split(' ')[0]}!`);"
       },
       {
        "n": 4,
        "titulo": "Iniciais para o avatar",
        "secao": "NA PRÁTICA",
        "codigo": "const cliente = 'Ana Paula da Silva';\nconst conectivos = ['de', 'da', 'do', 'dos', 'e'];\n\nconst iniciais = cliente\n  .split(' ')\n  .filter((parte) => !conectivos.includes(parte.toLowerCase()))\n  .map((parte) => parte[0])\n  .join('');\n\nconsole.log('Avatar:', iniciais);"
       },
       {
        "n": 5,
        "titulo": "Slug de URL a partir do título",
        "secao": "NA PRÁTICA",
        "codigo": "const titulo = 'Promoção de Verão: até 50% OFF!';\n\nconst slug = titulo\n  .toLowerCase()\n  .normalize('NFD').replace(/[̀-ͯ]/g, '')   // tira acento\n  .replace(/[^a-z0-9]+/g, '-')                        // o que não é letra/número vira hífen\n  .replace(/^-|-$/g, '');                             // apara as pontas\n\nconsole.log('/promo/' + slug);"
       },
       {
        "n": 6,
        "titulo": "Mascarar dado sensível",
        "secao": "NA PRÁTICA",
        "codigo": "const cartao = '5432123412349876';\nconsole.log('**** **** **** ' + cartao.slice(-4));    // índice negativo = do fim\n\nconst cpf = '12345678900';\nconsole.log(cpf.slice(0, 3) + '.***.***-' + cpf.slice(-2));"
       },
       {
        "n": 7,
        "titulo": "Alinhar colunas no relatório",
        "secao": "NA PRÁTICA",
        "codigo": "const produto = 'Teclado';\nconst preco = 249.9;\n\nconsole.log(produto.padEnd(12, '.') + ('R$ ' + preco.toFixed(2)).padStart(10));\nconsole.log('Mouse'.padEnd(12, '.') + 'R$ 89.50'.padStart(10));"
       },
       {
        "n": 8,
        "titulo": "String é imutável: o método devolve, não altera",
        "secao": "PEGADINHAS",
        "codigo": "const palavra = 'javascript';\n\npalavra.toUpperCase();                    // resultado jogado fora\nconsole.log('Sem guardar:', palavra);\nconsole.log('Guardando: ', palavra.toUpperCase());"
       }
      ],
      "resumo": [
       "Todo método de string devolve uma string nova — guarde o retorno.",
       "Trate a entrada do usuário na porta: `trim()` e normalize antes de salvar.",
       "`split` + `join` resolvem a maioria dos \"quebrar e remontar\".",
       "Índice negativo em `slice` conta do fim: `slice(-4)` pega os 4 últimos.",
       "`padEnd`/`padStart` alinham relatório de terminal sem gambiarra."
      ]
     },
     {
      "slug": "03-numeros",
      "arquivo": "JS/src/01-fundamentos/03-numeros.js",
      "comando": "node src/01-fundamentos/03-numeros.js",
      "titulo": "Números: Math e Number",
      "sessao": 1,
      "oQueE": "número em JS é sempre decimal (float). Não existe tipo \"inteiro\" separado.",
      "quandoUsar": "Math para arredondar, sortear e achar maior/menor. Number para converter.",
      "quandoNaoUsar": "para dinheiro em sistema financeiro sério — trabalhe em centavos (inteiro).",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Converter: o formulário sempre entrega texto",
        "secao": "ESSENCIAL",
        "codigo": "const qtdDigitada = '3';\nconst precoDigitado = '19,90';\n\nconsole.log(Number(qtdDigitada) + 1);                         // 4\nconsole.log(Number(precoDigitado));                           // NaN — a vírgula quebra\nconsole.log(parseFloat(precoDigitado.replace(',', '.')));     // 19.9"
       },
       {
        "n": 2,
        "titulo": "Validar antes de calcular",
        "secao": "ESSENCIAL",
        "codigo": "const entrada = 'abc';\nconst numero = Number(entrada);\n\nconsole.log('É NaN?     ', Number.isNaN(numero));\nconsole.log('É inteiro? ', Number.isInteger(Number('2.5')));\nconsole.log('É inteiro? ', Number.isInteger(Number('4')));"
       },
       {
        "n": 3,
        "titulo": "Arredondar: cada um serve para uma coisa",
        "secao": "ESSENCIAL",
        "codigo": "console.log('round (mais perto):', Math.round(2.5), Math.round(2.4));\nconsole.log('floor (pra baixo): ', Math.floor(2.9));   // páginas, índices\nconsole.log('ceil  (pra cima):  ', Math.ceil(2.1));    // caixas, entregas\nconsole.log('toFixed (exibir):  ', (2.567).toFixed(2));"
       },
       {
        "n": 4,
        "titulo": "Total com frete e desconto",
        "secao": "NA PRÁTICA",
        "codigo": "const subtotal = 428.9;\nconst frete = subtotal >= 300 ? 0 : 24.9;\nconst desconto = subtotal * 0.1;\n\nconsole.log('Subtotal: R$', subtotal.toFixed(2));\nconsole.log('Desconto: R$', desconto.toFixed(2));\nconsole.log('Frete:    R$', frete.toFixed(2));\nconsole.log('Total:    R$', (subtotal - desconto + frete).toFixed(2));"
       },
       {
        "n": 5,
        "titulo": "Maior, menor e média",
        "secao": "NA PRÁTICA",
        "codigo": "const notas = [7.5, 9, 6, 10, 8.5];\n\nconsole.log('Maior:', Math.max(...notas));   // ... espalha o array em argumentos\nconsole.log('Menor:', Math.min(...notas));\nconsole.log('Média:', (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1));"
       },
       {
        "n": 6,
        "titulo": "Sortear um brinde",
        "secao": "NA PRÁTICA",
        "codigo": "const participantes = ['Ana', 'Bruno', 'Carla', 'Diego'];\nconst sorteado = participantes[Math.floor(Math.random() * participantes.length)];\n\nconsole.log('Ganhador:', sorteado);   // floor + length nunca estoura o array"
       },
       {
        "n": 7,
        "titulo": "0.1 + 0.2 não dá 0.3",
        "secao": "PEGADINHAS",
        "codigo": "console.log(0.1 + 0.2);                 // 0.30000000000000004\nconsole.log((0.1 + 0.2).toFixed(2));    // como exibir\nconsole.log((10 + 20) / 100);           // como calcular: em centavos"
       },
       {
        "n": 8,
        "titulo": "toFixed devolve STRING",
        "secao": "PEGADINHAS",
        "codigo": "const valor = (19.9).toFixed(2);\n\nconsole.log(typeof valor);\nconsole.log(valor + 10);            // '19.9010' — concatenou!\nconsole.log(Number(valor) + 10);    // 29.9 — converta de volta para somar"
       }
      ],
      "resumo": [
       "Tudo de formulário é texto: converta com `Number`/`parseFloat` antes de calcular.",
       "Valide com `Number.isNaN` e `Number.isInteger` — nunca confie no que chegou.",
       "`floor` pra baixo, `ceil` pra cima, `round` pro mais perto, `toFixed` só pra exibir.",
       "Dinheiro dá erro de centavo: guarde em centavos (inteiro) e divida só ao mostrar.",
       "`toFixed` devolve string — o `+` vira concatenação se você esquecer."
      ]
     },
     {
      "slug": "04-split-e-join",
      "arquivo": "JS/src/01-fundamentos/04-split-e-join.js",
      "comando": "node src/01-fundamentos/04-split-e-join.js",
      "titulo": "split e join — texto vira lista, lista vira texto",
      "sessao": 7,
      "oQueE": "`split` quebra uma string em array por um separador; `join` cola o array de volta.",
      "quandoUsar": "campo de tags, linha de CSV, ler log linha a linha, montar texto para o usuário.",
      "quandoNaoUsar": "para formato com regra própria (JSON, HTML, CSV com vírgula dentro de aspas). Aí use o parser da linguagem, não o split.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "split: texto → array",
        "secao": "ESSENCIAL",
        "codigo": "const tags = 'promocao,verao,camiseta';\n\nconsole.log(tags.split(','));                 // separa pela vírgula\nconsole.log('Ana Paula Silva'.split(' '));    // separa pelo espaço\nconsole.log('ABC'.split(''));                 // string vazia = letra por letra\nconsole.log('sem separador'.split('|'));      // não achou: devolve a string inteira em 1 item"
       },
       {
        "n": 2,
        "titulo": "join: array → texto",
        "secao": "ESSENCIAL",
        "codigo": "const compras = ['arroz', 'feijão', 'café'];\n\nconsole.log(compras.join());                  // sem argumento, o padrão é vírgula\nconsole.log(compras.join(', '));\nconsole.log(compras.join(' · '));\nconsole.log(compras.join(''));                // cola sem nada no meio"
       },
       {
        "n": 3,
        "titulo": "Ida e volta: quebrar, mexer, remontar",
        "secao": "ESSENCIAL",
        "codigo": "const frase = 'js é a linguagem da web';\n\nconst titulo = frase\n  .split(' ')                                 // quebra em palavras\n  .map((p) => p[0].toUpperCase() + p.slice(1))\n  .join(' ');                                 // remonta\n\nconsole.log(titulo);"
       },
       {
        "n": 4,
        "titulo": "Campo de tags digitado pelo usuário",
        "secao": "NA PRÁTICA",
        "codigo": "const digitado = ' Promoção , verao,, CAMISETA , verao ';\n\nconst limpas = [...new Set(\n  digitado\n    .split(',')\n    .map((t) => t.trim().toLowerCase())\n    .filter(Boolean),                         // tira os vazios do \",,\" e das pontas\n)];\n\nconsole.log(limpas);\nconsole.log('Para salvar no banco:', limpas.join(','));"
       },
       {
        "n": 5,
        "titulo": "Ler uma linha de CSV",
        "secao": "NA PRÁTICA",
        "codigo": "const cabecalho = 'nome,email,plano';\nconst linha = 'Ana,ana@empresa.com,premium';\n\nconst colunas = cabecalho.split(',');\nconst valores = linha.split(',');\nconst cliente = Object.fromEntries(colunas.map((c, i) => [c, valores[i]]));\n\nconsole.log(cliente);"
       },
       {
        "n": 6,
        "titulo": "Lista legível: \"Ana, Bruno e Carla\"",
        "secao": "NA PRÁTICA",
        "codigo": "const convidados = ['Ana', 'Bruno', 'Carla'];\n\nconst ultimo = convidados[convidados.length - 1];\nconst resto = convidados.slice(0, -1);\n\nconsole.log(resto.length ? `${resto.join(', ')} e ${ultimo}` : ultimo);\nconsole.log('Nativo:', new Intl.ListFormat('pt-BR').format(convidados));"
       },
       {
        "n": 7,
        "titulo": "Espaço a mais vira item vazio",
        "secao": "PEGADINHAS",
        "codigo": "const bagunca = 'a,,b, c';\n\nconsole.log(bagunca.split(','));                          // tem '' e ' c'\nconsole.log(bagunca.split(',').map((s) => s.trim()).filter(Boolean));   // sempre limpe depois"
       },
       {
        "n": 8,
        "titulo": "join engole null e undefined",
        "secao": "PEGADINHAS",
        "codigo": "const notas = ['ok', null, undefined, 'fim'];\n\nconsole.log(`[${notas.join(',')}]`);          // viram string vazia, não some o item\nconsole.log(`[${[].join(',')}]`);             // array vazio devolve string vazia"
       }
      ],
      "resumo": [
       "`split(sep)` quebra texto em array; `join(sep)` cola array em texto.",
       "`split('')` separa letra a letra; `join()` sem argumento usa vírgula.",
       "O combo do dia a dia é split → map/filter → join.",
       "Entrada de usuário sempre pede `.map(trim)` e `.filter(Boolean)` depois do split.",
       "`null`/`undefined` viram string vazia no `join` — trate antes se importar."
      ]
     }
    ]
   },
   {
    "slug": "02-arrays-e-objetos",
    "titulo": "Arrays e Objetos",
    "icone": "▤",
    "cor": "#5ec8d8",
    "resumo": "Guardar e acessar coleções de dados.",
    "topicos": [
     {
      "slug": "01-arrays",
      "arquivo": "JS/src/02-arrays-e-objetos/01-arrays.js",
      "comando": "node src/02-arrays-e-objetos/01-arrays.js",
      "titulo": "Arrays: criar, buscar e ordenar",
      "sessao": 2,
      "oQueE": "lista ordenada de valores, acessada por índice começando em 0.",
      "quandoUsar": "qualquer coleção — itens do carrinho, usuários, linhas de relatório.",
      "quandoNaoUsar": "quando você busca sempre pela mesma chave. Aí um objeto ou Map é mais direto.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Acessar pelo índice",
        "secao": "ESSENCIAL",
        "codigo": "const tarefas = ['Estudar JS', 'Treinar', 'Ler 10 páginas'];\n\nconsole.log('Primeira:', tarefas[0]);\nconsole.log('Última:  ', tarefas.at(-1));   // at(-1) é mais claro que [length - 1]\nconsole.log('Quantas: ', tarefas.length);"
       },
       {
        "n": 2,
        "titulo": "Adicionar e remover nas pontas",
        "secao": "ESSENCIAL",
        "codigo": "const fila = ['Ana', 'Bruno'];\n\nfila.push('Carla');       // entra no fim\nfila.unshift('Zeca');     // entra no começo\nconsole.log(fila);\n\nconsole.log('Saiu do começo:', fila.shift());\nconsole.log('Saiu do fim:   ', fila.pop());\nconsole.log('Restaram:', fila);"
       },
       {
        "n": 3,
        "titulo": "Procurar dentro do array",
        "secao": "ESSENCIAL",
        "codigo": "const produtos = [\n  { id: 1, nome: 'Teclado', preco: 249.9 },\n  { id: 2, nome: 'Mouse', preco: 89.5 },\n];\n\nconsole.log('Achou o objeto:', produtos.find((p) => p.id === 2));\nconsole.log('Em que posição:', produtos.findIndex((p) => p.id === 2));  // -1 se não achar\nconsole.log('Algum > 200?   ', produtos.some((p) => p.preco > 200));    // pelo menos um\nconsole.log('Todos > 50?    ', produtos.every((p) => p.preco > 50));    // todos\nconsole.log('Tem \"Mouse\"?   ', ['Mouse', 'Teclado'].includes('Mouse')); // valor simples"
       },
       {
        "n": 4,
        "titulo": "Ordenar sem estragar o original",
        "secao": "NA PRÁTICA",
        "codigo": "const precos = [30, 10, 20];\nconst ordenados = [...precos].sort((a, b) => a - b);   // copie antes: sort altera!\n\nconsole.log('Ordenado:', ordenados);\nconsole.log('Original:', precos);\n\nconst nomes = ['Zeca', 'ana', 'Bruno'];\nconsole.log([...nomes].sort((a, b) => a.localeCompare(b)));  // respeita acento e caixa"
       },
       {
        "n": 5,
        "titulo": "Juntar, inverter e virar texto",
        "secao": "NA PRÁTICA",
        "codigo": "const cores = ['azul', 'verde'];\n\nconsole.log(cores.join(' · '));\nconsole.log([...cores].reverse());       // reverse também altera o original\nconsole.log([...cores, 'vermelho']);     // spread junta sem alterar nada"
       },
       {
        "n": 6,
        "titulo": "sort() sem função compara como TEXTO",
        "secao": "PEGADINHAS",
        "codigo": "console.log([10, 9, 100, 1].sort());                 // [ 1, 10, 100, 9 ] — errado\nconsole.log([10, 9, 100, 1].sort((a, b) => a - b));  // [ 1, 9, 10, 100 ] — certo"
       },
       {
        "n": 7,
        "titulo": "delete deixa buraco; use splice",
        "secao": "PEGADINHAS",
        "codigo": "const comDelete = ['a', 'b', 'c'];\ndelete comDelete[1];\nconsole.log('delete:', comDelete, '| length ainda é', comDelete.length);\n\nconst comSplice = ['a', 'b', 'c'];\ncomSplice.splice(1, 1);\nconsole.log('splice:', comSplice, '| length agora é', comSplice.length);"
       }
      ],
      "resumo": [
       "`at(-1)` para o último; `length` para contar.",
       "`push`/`pop` no fim, `unshift`/`shift` no começo.",
       "Buscar: `includes` (valor), `find` (objeto), `findIndex` (posição), `some`/`every` (sim/não).",
       "`sort` e `reverse` ALTERAM o original — copie com `[...array]` antes.",
       "`sort` sem função ordena como texto: passe `(a, b) => a - b` para número.",
       "Nunca use `delete` em array; ele deixa buraco. Use `splice`."
      ]
     },
     {
      "slug": "02-copiar-e-cortar",
      "arquivo": "JS/src/02-arrays-e-objetos/02-copiar-e-cortar.js",
      "comando": "node src/02-arrays-e-objetos/02-copiar-e-cortar.js",
      "titulo": "Copiar e cortar arrays: slice, splice e spread",
      "sessao": 5,
      "oQueE": "`slice` COPIA um trecho. `splice` CORTA/INSERE no original. `[...a]` copia tudo.",
      "quandoUsar": "slice para paginar e copiar; splice para mexer no meio da lista.",
      "quandoNaoUsar": "splice em array que outra parte do sistema também está lendo — ele altera o original e o efeito colateral surpreende.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "slice: copia um pedaço e não toca no original",
        "secao": "ESSENCIAL",
        "codigo": "const meses = ['jan', 'fev', 'mar', 'abr', 'mai'];\n\nconsole.log(meses.slice(0, 3));   // do 0 até ANTES do 3\nconsole.log(meses.slice(-2));     // os 2 últimos\nconsole.log(meses.slice());       // cópia inteira\nconsole.log('Original ainda tem', meses.length);"
       },
       {
        "n": 2,
        "titulo": "splice: altera o original e devolve o que saiu",
        "secao": "ESSENCIAL",
        "codigo": "const lista = ['a', 'b', 'c', 'd'];\n\nconsole.log('Removidos:', lista.splice(1, 2));   // do índice 1, remove 2\nconsole.log('Sobrou:   ', lista);\n\nlista.splice(1, 0, 'X');                          // remove 0, insere no meio\nconsole.log('Depois de inserir:', lista);"
       },
       {
        "n": 3,
        "titulo": "Juntar arrays sem alterar nada",
        "secao": "ESSENCIAL",
        "codigo": "const camisas = ['P', 'M'];\nconst calcas = ['38', '40'];\n\nconsole.log([...camisas, ...calcas]);\nconsole.log(camisas.concat(calcas));   // mesma coisa, sintaxe antiga\nconsole.log('Originais intactos:', camisas, calcas);"
       },
       {
        "n": 4,
        "titulo": "Paginação",
        "secao": "NA PRÁTICA",
        "codigo": "const pedidos = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];\nconst porPagina = 3;\nconst pagina = 2;\n\nconst inicio = (pagina - 1) * porPagina;\n\nconsole.log('Página 2:', pedidos.slice(inicio, inicio + porPagina));\nconsole.log('Total de páginas:', Math.ceil(pedidos.length / porPagina));"
       },
       {
        "n": 5,
        "titulo": "Mover item de posição (drag and drop)",
        "secao": "NA PRÁTICA",
        "codigo": "const colunas = ['Nome', 'E-mail', 'Telefone', 'Status'];\nconst copia = [...colunas];\n\nconst [movido] = copia.splice(3, 1);   // tira o \"Status\"\ncopia.splice(0, 0, movido);            // põe no começo\n\nconsole.log(copia);\nconsole.log('Original:', colunas);"
       },
       {
        "n": 6,
        "titulo": "Histórico com tamanho máximo",
        "secao": "NA PRÁTICA",
        "codigo": "let historico = ['abriu', 'editou', 'salvou'];\n\nhistorico = [...historico, 'fechou'].slice(-3);   // slice negativo mantém os últimos\n\nconsole.log(historico);"
       },
       {
        "n": 7,
        "titulo": "A cópia é RASA: objetos de dentro continuam compartilhados",
        "secao": "PEGADINHAS",
        "codigo": "const originais = [{ nome: 'Ana' }];\nconst rasa = [...originais];\n\nrasa.push({ nome: 'Bruno' });   // ok: a lista de fora é nova\nrasa[0].nome = 'ALTERADA';      // vaza: o objeto de dentro é o MESMO\n\nconsole.log('Original:', originais);\n\nconst profunda = structuredClone(originais);   // cópia de verdade, em todos os níveis\nprofunda[0].nome = 'outra';\nconsole.log('Depois do structuredClone:', originais);"
       }
      ],
      "resumo": [
       "`slice` copia e devolve; `splice` corta no original. Nomes parecidos, efeitos opostos.",
       "`slice(inicio, fim)` não inclui o `fim`. Índice negativo conta do final.",
       "`[...a, ...b]` é a forma padrão de juntar sem efeito colateral.",
       "`slice` + `Math.ceil` resolvem paginação inteira.",
       "Spread copia só o primeiro nível. Para aninhado, use `structuredClone`."
      ]
     },
     {
      "slug": "03-desestruturacao",
      "arquivo": "JS/src/02-arrays-e-objetos/03-desestruturacao.js",
      "comando": "node src/02-arrays-e-objetos/03-desestruturacao.js",
      "titulo": "Desestruturação de objetos e arrays",
      "sessao": 2,
      "oQueE": "tirar valores de dentro de um objeto/array direto para variáveis, em uma linha.",
      "quandoUsar": "ler resposta de API, receber parâmetros de função, pegar \"o resto\" de um objeto.",
      "quandoNaoUsar": "quando o aninhamento passa de 2 níveis — vira ilegível. Aí quebre em passos.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Objeto: pegar campos pelo nome",
        "secao": "ESSENCIAL",
        "codigo": "const usuario = { id: 7, nome: 'Igor', cidade: 'Recife' };\n\nconst { nome, cidade } = usuario;\nconsole.log(nome, '—', cidade);\n\nconst { nome: apelido } = usuario;                // renomeando\nconst { telefone = 'não informado' } = usuario;   // valor padrão se não existir\nconsole.log(apelido, '|', telefone);"
       },
       {
        "n": 2,
        "titulo": "Array: pegar pela posição",
        "secao": "ESSENCIAL",
        "codigo": "const medalhas = ['ouro', 'prata', 'bronze'];\n\nconst [primeiro, segundo] = medalhas;\nconsole.log(primeiro, segundo);\n\nconst [, , terceiro] = medalhas;   // vírgula pula posição\nconsole.log('Terceiro:', terceiro);"
       },
       {
        "n": 3,
        "titulo": "Rest: o que sobrou",
        "secao": "ESSENCIAL",
        "codigo": "const cadastro = { id: 7, nome: 'Ana', email: 'ana@x.com' };\n\nconst { id, ...semId } = cadastro;   // útil para não mandar o id no PATCH\nconsole.log('id:  ', id);\nconsole.log('resto:', semId);\n\nconst [campeao, ...demais] = ['Ana', 'Bruno', 'Carla'];\nconsole.log(campeao, 'venceu.', demais.length, 'ficaram pelo caminho.');"
       },
       {
        "n": 4,
        "titulo": "Nos parâmetros da função: a ordem some",
        "secao": "NA PRÁTICA",
        "codigo": "function criarPedido({ cliente, frete = 0, cupom = null }) {\n  return `${cliente} · frete R$ ${frete}${cupom ? ` · ${cupom}` : ''}`;\n}\n\nconsole.log(criarPedido({ cliente: 'Ana', frete: 20 }));\nconsole.log(criarPedido({ cupom: 'BEMVINDO', cliente: 'Bruno' }));   // ordem não importa"
       },
       {
        "n": 5,
        "titulo": "Resposta de API aninhada",
        "secao": "NA PRÁTICA",
        "codigo": "const resposta = {\n  dados: { usuario: { nome: 'Carla', plano: 'pro' } },\n  meta: { total: 57 },\n};\n\nconst { dados: { usuario: { nome: quem, plano } }, meta: { total } } = resposta;\nconsole.log(`${quem} · plano ${plano} · ${total} registros`);\n\n// Passando de 2 níveis, quebrar lê melhor:\nconst { dados } = resposta;\nconsole.log('Mais legível:', dados.usuario.plano);"
       },
       {
        "n": 6,
        "titulo": "Percorrer objeto como lista de pares",
        "secao": "NA PRÁTICA",
        "codigo": "const estoque = { teclado: 3, mouse: 0, monitor: 7 };\n\nfor (const [produto, qtd] of Object.entries(estoque)) {\n  console.log(`${produto.padEnd(8)} ${qtd > 0 ? qtd + ' un' : 'esgotado'}`);\n}"
       },
       {
        "n": 7,
        "titulo": "Desestruturar undefined explode",
        "secao": "PEGADINHAS",
        "codigo": "function lerTema(config) {\n  const { tema = 'claro' } = config ?? {};   // o ?? {} evita o TypeError\n  return tema;\n}\n\nconsole.log(lerTema({ tema: 'escuro' }));\nconsole.log(lerTema(undefined));"
       }
      ],
      "resumo": [
       "Objeto casa pelo NOME (`{ nome }`), array casa pela POSIÇÃO (`[a, b]`).",
       "`{ x: y }` renomeia, `{ x = 1 }` dá valor padrão — juntos: `{ x: y = 1 }`.",
       "`...resto` recolhe o que sobrou; ótimo para tirar um campo antes de enviar.",
       "Desestruturar nos parâmetros elimina a ordem dos argumentos e documenta a função.",
       "Aninhou 3 níveis? Quebre em passos. E use `?? {}` para não explodir com undefined."
      ]
     },
     {
      "slug": "04-object-freeze",
      "arquivo": "JS/src/02-arrays-e-objetos/04-object-freeze.js",
      "comando": "node src/02-arrays-e-objetos/04-object-freeze.js",
      "titulo": "Object.freeze — travar o conteúdo do objeto",
      "sessao": 7,
      "oQueE": "congela um objeto ou array. Depois disso não dá para alterar, adicionar nem remover propriedade — e não existe \"descongelar\".",
      "quandoUsar": "config da aplicação, tabela de constantes, valor padrão que ninguém pode sujar.",
      "quandoNaoUsar": "em dado que muda o tempo todo (estado de tela, carrinho, formulário). Aí o certo é criar um objeto novo a cada mudança, não congelar o antigo.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "const trava o nome; freeze trava o conteúdo",
        "secao": "ESSENCIAL",
        "codigo": "const semFreeze = { moeda: 'BRL' };\nsemFreeze.moeda = 'USD';                       // const não impediu: o objeto é o mesmo\nconsole.log('Sem freeze:', semFreeze);\n\nconst comFreeze = Object.freeze({ moeda: 'BRL' });\ncomFreeze.moeda = 'USD';                       // não acontece nada\nconsole.log('Com freeze:', comFreeze);"
       },
       {
        "n": 2,
        "titulo": "O que fica bloqueado",
        "secao": "ESSENCIAL",
        "codigo": "const status = Object.freeze({ ATIVO: 'ativo', INATIVO: 'inativo' });\n\nstatus.ATIVO = 'ligado';                       // alterar: bloqueado\nstatus.PENDENTE = 'pendente';                  // adicionar: bloqueado\ndelete status.INATIVO;                         // remover: bloqueado\n\nconsole.log(status, '| congelado?', Object.isFrozen(status));"
       },
       {
        "n": 3,
        "titulo": "O congelamento é RASO",
        "secao": "ESSENCIAL",
        "codigo": "const config = Object.freeze({\n  moeda: 'BRL',\n  email: { remetente: 'nao-responda@empresa.com' },\n});\n\nconfig.moeda = 'USD';                          // bloqueado\nconfig.email.remetente = 'hacker@fora.com';    // passou! o objeto de dentro não foi congelado\n\nconsole.log(config.moeda, '|', config.email.remetente);"
       },
       {
        "n": 4,
        "titulo": "Congelar de verdade: freeze em tudo que é objeto",
        "secao": "NA PRÁTICA",
        "codigo": "function congelarFundo(alvo) {\n  for (const valor of Object.values(alvo)) {\n    if (valor && typeof valor === 'object') congelarFundo(valor);   // desce um nível\n  }\n  return Object.freeze(alvo);\n}\n\nconst app = congelarFundo({ nome: 'Loja', limites: { itens: 50, abas: { max: 3 } } });\n\napp.limites.abas.max = 999;\nconsole.log('Fundo congelado:', app.limites.abas.max);"
       },
       {
        "n": 5,
        "titulo": "Array congelado: lista fixa de opções",
        "secao": "NA PRÁTICA",
        "codigo": "const FORMAS_PAGAMENTO = Object.freeze(['pix', 'cartao', 'boleto']);\n\nFORMAS_PAGAMENTO[0] = 'dinheiro';              // não troca\nFORMAS_PAGAMENTO[3] = 'cheque';                // não entra\n\nconsole.log(FORMAS_PAGAMENTO, '| aceita pix?', FORMAS_PAGAMENTO.includes('pix'));\n// Atenção: `.push` num array congelado lança TypeError na hora, mesmo fora do modo estrito."
       },
       {
        "n": 6,
        "titulo": "Congelado não é imutável na marra: gere um novo",
        "secao": "NA PRÁTICA",
        "codigo": "const padrao = Object.freeze({ tema: 'claro', notificar: true });\n\nconst doUsuario = { ...padrao, tema: 'escuro' };   // cópia com a mudança, o padrão fica intacto\n\nconsole.log('Padrão:', padrao, '| Do usuário:', doUsuario);\n// É esse o hábito que o freeze te obriga a ter: em vez de alterar, criar a versão nova."
       },
       {
        "n": 7,
        "titulo": "Fora do modo estrito, a alteração falha em SILÊNCIO",
        "secao": "PEGADINHAS",
        "codigo": "const taxa = Object.freeze({ percentual: 5 });\n\ntaxa.percentual = 99;                          // nenhum erro, nenhum aviso\nconsole.log('Continua', taxa.percentual, '— o código \"funcionou\" e não mudou nada.');\n// Em módulo ESM (ou com 'use strict'), a mesma linha lança TypeError. Não confie no silêncio:\n// escreva o código assumindo que vai estourar."
       },
       {
        "n": 8,
        "titulo": "freeze não devolve cópia: congela o objeto que você passou",
        "secao": "PEGADINHAS",
        "codigo": "const original = { plano: 'free' };\nconst retorno = Object.freeze(original);\n\nconsole.log('Mesmo objeto?', retorno === original);\noriginal.plano = 'premium';                    // quem guardou a referência antiga também travou\nconsole.log('Original:', original.plano);"
       }
      ],
      "resumo": [
       "`const` trava a variável; `Object.freeze` trava o conteúdo do objeto.",
       "Bloqueia alterar, adicionar e remover — e não tem volta (`Object.isFrozen` confere).",
       "É raso: objeto dentro de objeto continua livre. Para tudo, percorra e congele recursivo.",
       "Serve para config e constante; para dado que muda, crie um objeto novo com spread.",
       "Fora do modo estrito a alteração falha calada — o bug aparece longe da causa."
      ]
     },
     {
      "slug": "05-object-keys-values-entries",
      "arquivo": "JS/src/02-arrays-e-objetos/05-object-keys-values-entries.js",
      "comando": "node src/02-arrays-e-objetos/05-object-keys-values-entries.js",
      "titulo": "Object.keys, values e entries",
      "sessao": 7,
      "oQueE": "as três formas de transformar um objeto em array — só as chaves, só os valores, ou os pares [chave, valor].",
      "quandoUsar": "percorrer objeto, contar campos, somar valores, filtrar campos antes de enviar para a API — qualquer coisa que exija tratar o objeto como lista.",
      "quandoNaoUsar": "quando você já sabe o nome do campo. Aí é só `obj.campo`.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "As três leituras do mesmo objeto",
        "secao": "ESSENCIAL",
        "codigo": "const estoque = { teclado: 12, mouse: 0, monitor: 5 };\n\nconsole.log(Object.keys(estoque));      // ['teclado', 'mouse', 'monitor']\nconsole.log(Object.values(estoque));    // [12, 0, 5]\nconsole.log(Object.entries(estoque));   // [['teclado', 12], ...] — pares chave/valor"
       },
       {
        "n": 2,
        "titulo": "Percorrer o objeto",
        "secao": "ESSENCIAL",
        "codigo": "const precos = { teclado: 249.9, mouse: 89.5 };\n\nfor (const [produto, preco] of Object.entries(precos)) {   // desestrutura o par direto\n  console.log(`${produto}: R$ ${preco.toFixed(2)}`);\n}"
       },
       {
        "n": 3,
        "titulo": "fromEntries: a volta, de array para objeto",
        "secao": "ESSENCIAL",
        "codigo": "const pares = [['nome', 'Ana'], ['plano', 'premium']];\n\nconsole.log(Object.fromEntries(pares));\n\nconst url = new URLSearchParams('busca=teclado&pagina=2');\nconsole.log(Object.fromEntries(url));   // uso clássico: query string vira objeto"
       },
       {
        "n": 4,
        "titulo": "O formulário tem campo preenchido?",
        "secao": "NA PRÁTICA",
        "codigo": "const formulario = { nome: '', email: '', telefone: '' };\n\nconsole.log('Quantidade de campos:', Object.keys(formulario).length);\nconsole.log('Está vazio?', Object.values(formulario).every((v) => v === ''));\nconsole.log('Faltando:', Object.entries(formulario).filter(([, v]) => !v).map(([c]) => c));"
       },
       {
        "n": 5,
        "titulo": "Limpar campos vazios antes de enviar",
        "secao": "NA PRÁTICA",
        "codigo": "const edicao = { nome: 'Ana', apelido: '', idade: 30, bio: null };\n\nconst limpo = Object.fromEntries(\n  Object.entries(edicao).filter(([, valor]) => valor !== '' && valor != null),\n);\n\nconsole.log(limpo);   // o padrão entries → filter/map → fromEntries é o \"map de objeto\""
       },
       {
        "n": 6,
        "titulo": "Somar e achar o maior valor",
        "secao": "NA PRÁTICA",
        "codigo": "const vendasPorMes = { jan: 12000, fev: 9500, mar: 21000 };\n\nconst total = Object.values(vendasPorMes).reduce((s, v) => s + v, 0);\nconst melhor = Object.entries(vendasPorMes).sort(([, a], [, b]) => b - a)[0];\n\nconsole.log('Total:', total, '| Melhor mês:', melhor[0], 'com', melhor[1]);"
       },
       {
        "n": 7,
        "titulo": "Só pega o que é próprio e enumerável",
        "secao": "PEGADINHAS",
        "codigo": "const usuario = { nome: 'Ana' };\nObject.defineProperty(usuario, 'token', { value: 'abc', enumerable: false });\n\nconsole.log(Object.keys(usuario));                    // o token não aparece\nconsole.log('Mas existe:', usuario.token, '| tem?', 'token' in usuario);\nconsole.log('Todas mesmo:', Object.getOwnPropertyNames(usuario));"
       },
       {
        "n": 8,
        "titulo": "Chave que parece número fura a ordem",
        "secao": "PEGADINHAS",
        "codigo": "const ranking = { '2': 'Bruno', b: 'Ana', '1': 'Carla', a: 'Diego' };\n\nconsole.log(Object.keys(ranking));\n// Chaves numéricas vêm primeiro e em ordem crescente; o resto na ordem de inserção.\n// Se a ordem importa, use array ou Map — objeto não é lista ordenada."
       }
      ],
      "resumo": [
       "`keys` = chaves, `values` = valores, `entries` = pares [chave, valor].",
       "`for (const [k, v] of Object.entries(obj))` é o jeito padrão de percorrer objeto.",
       "`entries` → `filter`/`map` → `fromEntries` é o \"map de objeto\" que o JS não tem.",
       "`Object.keys(obj).length` conta os campos e diz se o objeto está vazio.",
       "Ignora herdadas e não-enumeráveis, e chave numérica vem primeiro na ordem."
      ]
     },
     {
      "slug": "06-object-assign",
      "arquivo": "JS/src/02-arrays-e-objetos/06-object-assign.js",
      "comando": "node src/02-arrays-e-objetos/06-object-assign.js",
      "titulo": "Object.assign — juntar objetos",
      "sessao": 7,
      "oQueE": "copia os campos de um ou mais objetos para dentro de um objeto alvo, da esquerda para a direita. Devolve o próprio alvo, já alterado.",
      "quandoUsar": "mesclar configuração em camadas, aplicar valores padrão, copiar campos para um objeto que já existe.",
      "quandoNaoUsar": "quando `{ ...a, ...b }` resolve — o spread faz o mesmo e não altera ninguém. `assign` se justifica quando o alvo TEM que ser aquele objeto específico.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O primeiro argumento é o alvo e ele MUDA",
        "secao": "ESSENCIAL",
        "codigo": "const alvo = { nome: 'Ana' };\nconst retorno = Object.assign(alvo, { plano: 'premium' }, { ativo: true });\n\nconsole.log(alvo);\nconsole.log('Devolveu o próprio alvo?', retorno === alvo);   // não é cópia"
       },
       {
        "n": 2,
        "titulo": "Quem vem depois ganha",
        "secao": "ESSENCIAL",
        "codigo": "const padrao = { tema: 'claro', idioma: 'pt-BR', notificar: true };\nconst doUsuario = { tema: 'escuro' };\n\nconsole.log(Object.assign({}, padrao, doUsuario));   // alvo vazio = ninguém é alterado"
       },
       {
        "n": 3,
        "titulo": "Cópia rasa de um objeto",
        "secao": "ESSENCIAL",
        "codigo": "const original = { produto: 'Teclado', preco: 249.9 };\nconst copia = Object.assign({}, original);\n\ncopia.preco = 199;\nconsole.log(original.preco, '|', copia.preco);       // o original ficou intacto\nconsole.log('Com spread é igual:', { ...original }); // e mais curto — prefira o spread"
       },
       {
        "n": 4,
        "titulo": "Configuração em camadas",
        "secao": "NA PRÁTICA",
        "codigo": "const daBiblioteca = { tentativas: 3, timeoutMs: 5000, log: false };\nconst doAmbiente = { timeoutMs: 15000 };\nconst daChamada = { log: true };\n\nconst config = Object.assign({}, daBiblioteca, doAmbiente, daChamada);\n\nconsole.log(config);   // a ordem dos argumentos É a regra de precedência"
       },
       {
        "n": 5,
        "titulo": "Atualizar um objeto que outras partes já seguram",
        "secao": "NA PRÁTICA",
        "codigo": "const carrinho = { itens: 2, total: 339.4 };\nconst carrinhoNoRelatorio = carrinho;                // outra parte do código aponta para o mesmo\n\nObject.assign(carrinho, { itens: 3, total: 429.4 }); // atualiza no lugar, sem trocar a referência\n\nconsole.log(carrinhoNoRelatorio);                    // enxergou a mudança\n// Com `carrinho = {...}` a outra variável continuaria vendo o objeto velho."
       },
       {
        "n": 6,
        "titulo": "Preencher só o que está faltando",
        "secao": "NA PRÁTICA",
        "codigo": "const recebido = { nome: 'Monitor', preco: 1199 };\nconst obrigatorios = { nome: '', preco: 0, estoque: 0, ativo: true };\n\nconst completo = Object.assign({}, obrigatorios, recebido);\n\nconsole.log(completo);   // garante que todo campo existe, sem perder o que veio"
       },
       {
        "n": 7,
        "titulo": "É raso: o objeto de dentro é o MESMO",
        "secao": "PEGADINHAS",
        "codigo": "const perfilPadrao = { nome: 'Ana', endereco: { cidade: 'São Paulo' } };\n\nconst rasa = Object.assign({}, perfilPadrao);\nconst funda = structuredClone(perfilPadrao);         // clone de verdade, nível por nível\n\nfunda.endereco.cidade = 'Recife';                    // só a cópia funda muda\nrasa.endereco.cidade = 'Salvador';                   // aqui o original vai junto\n\nconsole.log('Original:', perfilPadrao.endereco.cidade, '| rasa:', rasa.endereco.cidade,\n  '| funda:', funda.endereco.cidade);\n// E não existe mescla funda: um `endereco` novo substitui o antigo inteiro, não se junta a ele."
       },
       {
        "n": 8,
        "titulo": "undefined também sobrescreve",
        "secao": "PEGADINHAS",
        "codigo": "const base = { tema: 'claro', idioma: 'pt-BR' };\nconst vindoDoFormulario = { tema: undefined };\n\nconsole.log(Object.assign({}, base, vindoDoFormulario));   // tema virou undefined\nconsole.log('Filtrando antes:', Object.assign({}, base,\n  Object.fromEntries(Object.entries(vindoDoFormulario).filter(([, v]) => v !== undefined))));"
       }
      ],
      "resumo": [
       "`Object.assign(alvo, ...fontes)` copia para o alvo e devolve o alvo — o alvo MUDA.",
       "Use `{}` como alvo quando não quiser alterar nada: `Object.assign({}, a, b)`.",
       "Quem vem por último vence — a ordem dos argumentos é a regra de precedência.",
       "`{ ...a, ...b }` faz o mesmo e é mais legível; `assign` vale quando o alvo é fixo.",
       "A cópia é rasa e `undefined` sobrescreve: limpe a fonte antes de mesclar."
      ]
     }
    ]
   },
   {
    "slug": "03-controle-de-fluxo",
    "titulo": "Controle de Fluxo",
    "icone": "⇄",
    "cor": "#b48ef0",
    "resumo": "Repetir, decidir e lidar com erro.",
    "topicos": [
     {
      "slug": "01-for",
      "arquivo": "JS/src/03-controle-de-fluxo/01-for.js",
      "comando": "node src/03-controle-de-fluxo/01-for.js",
      "titulo": "Repetir com for: for...of, for clássico e for...in",
      "sessao": 3,
      "oQueE": "as três formas de repetir quando você sabe quantas voltas vai dar.",
      "quandoUsar": "`for...of` no dia a dia. `for` clássico quando o índice importa. `for...in` só para chaves de OBJETO.",
      "quandoNaoUsar": "`for...in` em array — a ordem não é garantida e o índice vem como texto.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "for...of: quando você só quer os valores",
        "secao": "ESSENCIAL",
        "codigo": "const produtos = ['Teclado', 'Mouse', 'Monitor'];\n\nfor (const produto of produtos) {\n  console.log('·', produto);\n}"
       },
       {
        "n": 2,
        "titulo": "for clássico: quando o índice manda",
        "secao": "ESSENCIAL",
        "codigo": "const notas = [7, 9, 6];\n\nfor (let i = 0; i < notas.length; i++) {\n  console.log(`${i + 1}ª nota: ${notas[i]}`);\n}\n\nfor (let i = notas.length - 1; i >= 0; i--) process.stdout.write(notas[i] + ' ');\nconsole.log('← de trás para frente, só o for clássico faz direto');"
       },
       {
        "n": 3,
        "titulo": "Precisa do índice E do valor: entries()",
        "secao": "ESSENCIAL",
        "codigo": "const cores = ['azul', 'verde'];\n\nfor (const [i, cor] of cores.entries()) {\n  console.log(i, cor);\n}"
       },
       {
        "n": 4,
        "titulo": "for...in: as chaves de um objeto",
        "secao": "NA PRÁTICA",
        "codigo": "const preferencias = { tema: 'escuro', idioma: 'pt-BR' };\n\nfor (const chave in preferencias) {\n  console.log(`${chave} = ${preferencias[chave]}`);\n}"
       },
       {
        "n": 5,
        "titulo": "Somar e separar numa passada",
        "secao": "NA PRÁTICA",
        "codigo": "const estoque = [\n  { nome: 'Teclado', preco: 249.9, qtd: 3 },\n  { nome: 'Mouse', preco: 89.5, qtd: 0 },\n];\n\nlet valorParado = 0;\nconst repor = [];\n\nfor (const item of estoque) {\n  valorParado += item.preco * item.qtd;\n  if (item.qtd === 0) repor.push(item.nome);\n}\n\nconsole.log('Valor parado: R$', valorParado.toFixed(2));\nconsole.log('Repor:', repor);"
       },
       {
        "n": 6,
        "titulo": "Loop dentro de loop: grade de variações",
        "secao": "NA PRÁTICA",
        "codigo": "const tamanhos = ['P', 'M'];\nconst modelos = ['preto', 'branco'];\nconst variacoes = [];\n\nfor (const modelo of modelos) {\n  for (const tam of tamanhos) variacoes.push(`${modelo}-${tam}`);\n}\n\nconsole.log(variacoes);"
       },
       {
        "n": 7,
        "titulo": "for...in num array devolve TEXTO, não número",
        "secao": "PEGADINHAS",
        "codigo": "const valores = [10, 20, 30];\n\nfor (const i in valores) process.stdout.write(typeof i + ' ');\nconsole.log('← for...in');\n\nfor (const [i] of valores.entries()) process.stdout.write(typeof i + ' ');\nconsole.log('← entries()');"
       }
      ],
      "resumo": [
       "Padrão do dia a dia: `for...of`. Só troque quando faltar alguma coisa.",
       "Precisa do índice: `array.entries()` no for...of, ou o for clássico.",
       "`for` clássico é o único que anda de trás para frente ou pula de N em N.",
       "`for...in` é para objeto. Em array ele entrega o índice como STRING.",
       "Para acumular total, declare a variável fora do loop e some dentro."
      ]
     },
     {
      "slug": "02-while",
      "arquivo": "JS/src/03-controle-de-fluxo/02-while.js",
      "comando": "node src/03-controle-de-fluxo/02-while.js",
      "titulo": "Repetir com while: while, do...while, break e continue",
      "sessao": 3,
      "oQueE": "repetição por CONDIÇÃO, quando você não sabe quantas voltas vão acontecer.",
      "quandoUsar": "paginação de API, tentar de novo até dar certo, consumir uma fila.",
      "quandoNaoUsar": "quando a quantidade de voltas já é conhecida — aí é `for`/`for...of`.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "while: testa antes de entrar",
        "secao": "ESSENCIAL",
        "codigo": "let saldo = 1000;\nlet meses = 0;\n\nwhile (saldo >= 300) {\n  saldo -= 300;\n  meses++;\n}\n\nconsole.log(`Durou ${meses} meses, sobrou R$ ${saldo}`);"
       },
       {
        "n": 2,
        "titulo": "do...while: roda pelo menos uma vez",
        "secao": "ESSENCIAL",
        "codigo": "let tentativas = 0;\n\ndo {\n  tentativas++;                    // acontece mesmo que a condição já seja falsa\n} while (tentativas < 1);\n\nconsole.log('Rodou', tentativas, 'vez — o do...while sempre executa a primeira.');"
       },
       {
        "n": 3,
        "titulo": "break sai do loop, continue pula a volta",
        "secao": "ESSENCIAL",
        "codigo": "const pedidos = [\n  { id: 1, status: 'pago' },\n  { id: 2, status: 'cancelado' },\n  { id: 3, status: 'pago' },\n  { id: 4, status: 'fraude' },\n];\n\nfor (const pedido of pedidos) {\n  if (pedido.status === 'cancelado') continue;                         // ignora e segue\n  if (pedido.status === 'fraude') { console.log('Fraude! parando'); break; }\n  console.log('Processado:', pedido.id);\n}"
       },
       {
        "n": 4,
        "titulo": "Paginação: não dá para saber quantas páginas existem",
        "secao": "NA PRÁTICA",
        "codigo": "const banco = ['a', 'b', 'c', 'd', 'e'];\nconst buscarPagina = (n) => banco.slice((n - 1) * 2, n * 2);   // devolve [] quando acaba\n\nlet pagina = 1;\nlet coletados = [];\nlet lote = buscarPagina(pagina);\n\nwhile (lote.length > 0) {\n  coletados = [...coletados, ...lote];\n  pagina++;\n  lote = buscarPagina(pagina);\n}\n\nconsole.log(`${coletados.length} itens em ${pagina - 1} páginas`);"
       },
       {
        "n": 5,
        "titulo": "Tentar de novo, com limite",
        "secao": "NA PRÁTICA",
        "codigo": "const chamarApi = (n) => { if (n < 3) throw new Error('timeout'); return 'dados ok'; };\n\nlet vez = 0;\nlet resultado = null;\n\nwhile (vez < 5 && resultado === null) {\n  vez++;\n  try {\n    resultado = chamarApi(vez);\n  } catch (erro) {\n    console.log(`Tentativa ${vez} falhou (${erro.message})`);\n  }\n}\n\nconsole.log(resultado ?? 'Desisti');"
       },
       {
        "n": 6,
        "titulo": "Fila que cresce durante o processo",
        "secao": "NA PRÁTICA",
        "codigo": "const links = { '/home': ['/sobre', '/blog'], '/sobre': [], '/blog': ['/home'] };\nconst paraVisitar = ['/home'];\nconst visitados = [];\n\nwhile (paraVisitar.length > 0) {          // a fila muda de tamanho a cada volta\n  const pagina = paraVisitar.shift();\n  if (visitados.includes(pagina)) continue;\n  visitados.push(pagina);\n  paraVisitar.push(...links[pagina]);\n}\n\nconsole.log('Visitados:', visitados.join(' → '));"
       },
       {
        "n": 7,
        "titulo": "Esquecer de mexer na condição = loop infinito",
        "secao": "PEGADINHAS",
        "codigo": "let n = 0;\n\nwhile (n < 3) {\n  n++;     // ← sem esta linha o programa trava para sempre\n}\n\nconsole.log('Saiu com n =', n);"
       }
      ],
      "resumo": [
       "Sabe quantas voltas? `for`. Não sabe? `while`.",
       "`do...while` garante a primeira execução — bom para perguntar/validar.",
       "`continue` pula a volta; `break` abandona o loop.",
       "Todo `while` precisa de uma linha que mexe na condição, senão trava.",
       "Retry: combine `while` com contador máximo — sempre tenha uma saída."
      ]
     },
     {
      "slug": "03-try-catch",
      "arquivo": "JS/src/03-controle-de-fluxo/03-try-catch.js",
      "comando": "node src/03-controle-de-fluxo/03-try-catch.js",
      "titulo": "Tratar erro: try, catch e finally",
      "sessao": 3,
      "oQueE": "capturar um erro para o programa não morrer no meio.",
      "quandoUsar": "onde o erro é ESPERADO — JSON inválido, API fora, dado do usuário torto.",
      "quandoNaoUsar": "para esconder bug (`catch` vazio) nem para validação que um `if` resolve.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O básico: JSON que veio quebrado",
        "secao": "ESSENCIAL",
        "codigo": "try {\n  const config = JSON.parse('{tema: escuro}');\n  console.log(config);\n} catch (erro) {\n  console.log('JSON inválido:', erro.message);\n}\n\nconsole.log('O programa continua vivo.');"
       },
       {
        "n": 2,
        "titulo": "Lançar o próprio erro, com mensagem útil",
        "secao": "ESSENCIAL",
        "codigo": "function sacar(saldo, valor) {\n  if (valor <= 0) throw new Error('Valor precisa ser maior que zero');\n  if (valor > saldo) throw new Error(`Saldo insuficiente: você tem R$ ${saldo}`);\n  return saldo - valor;\n}\n\ntry {\n  console.log('Novo saldo:', sacar(500, 200));\n  console.log('Novo saldo:', sacar(300, 999));\n} catch (erro) {\n  console.log('Recusado:', erro.message);\n}"
       },
       {
        "n": 3,
        "titulo": "finally roda sempre",
        "secao": "ESSENCIAL",
        "codigo": "function processar(quebrar) {\n  console.log('  abriu conexão');\n  try {\n    if (quebrar) throw new Error('falhou');\n    return 'sucesso';\n  } catch {\n    return 'erro tratado';\n  } finally {\n    console.log('  fechou conexão');   // limpeza que não pode ser pulada\n  }\n}\n\nconsole.log(processar(false));\nconsole.log(processar(true));"
       },
       {
        "n": 4,
        "titulo": "Erro com tipo próprio, para tratar cada caso diferente",
        "secao": "NA PRÁTICA",
        "codigo": "class ErroDeValidacao extends Error {\n  constructor(campo, mensagem) {\n    super(mensagem);\n    this.name = 'ErroDeValidacao';\n    this.campo = campo;              // dado extra para a tela destacar o campo\n  }\n}\n\ntry {\n  throw new ErroDeValidacao('email', 'E-mail inválido');\n} catch (erro) {\n  if (erro instanceof ErroDeValidacao) console.log(`Campo \"${erro.campo}\": ${erro.message}`);\n  else throw erro;                   // não é meu problema: deixa subir\n}"
       },
       {
        "n": 5,
        "titulo": "Processar lote sem parar no primeiro defeito",
        "secao": "NA PRÁTICA",
        "codigo": "const linhas = ['{\"id\":1}', 'quebrado', '{\"id\":3}'];\nconst importados = [];\nconst falhas = [];\n\nfor (const [i, linha] of linhas.entries()) {\n  try {\n    importados.push(JSON.parse(linha));\n  } catch {\n    falhas.push(i + 1);              // catch sem variável: quando o erro não interessa\n  }\n}\n\nconsole.log(`${importados.length} importadas, falhou na linha ${falhas.join(', ')}`);"
       },
       {
        "n": 6,
        "titulo": "catch vazio é desligar o alarme de incêndio",
        "secao": "PEGADINHAS",
        "codigo": "try {\n  JSON.parse('{quebrado}');\n} catch {\n  // nada aqui: o bug some e você nunca fica sabendo\n}\n\nconsole.log('Seguiu como se nada tivesse acontecido — e esse é exatamente o problema.');"
       }
      ],
      "resumo": [
       "`try/catch` é para erro ESPERADO. Bug de programação deve aparecer, não sumir.",
       "`throw new Error('mensagem clara')` — a mensagem é o que você lê no log às 3h.",
       "`finally` sempre roda: use para fechar conexão, liberar arquivo, esconder o loading.",
       "Classe própria (`extends Error`) deixa você tratar cada tipo do seu jeito.",
       "No `catch`, ou trate o erro ou dê `throw` de novo. Nunca deixe vazio."
      ]
     }
    ]
   },
   {
    "slug": "04-funcoes",
    "titulo": "Funções",
    "icone": "ƒ",
    "cor": "#6ee7a8",
    "resumo": "Dar nome a um pedaço de lógica e reaproveitar.",
    "topicos": [
     {
      "slug": "01-funcoes-e-parametros",
      "arquivo": "JS/src/04-funcoes/01-funcoes-e-parametros.js",
      "comando": "node src/04-funcoes/01-funcoes-e-parametros.js",
      "titulo": "Funções e parâmetros",
      "sessao": 4,
      "oQueE": "bloco de código com nome, que recebe entradas e devolve uma saída.",
      "quandoUsar": "quando o mesmo raciocínio aparece duas vezes, ou quando um trecho merece um nome para o código se explicar sozinho.",
      "quandoNaoUsar": "uma função que faz cinco coisas diferentes. Quebre em cinco.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "As três formas de escrever",
        "secao": "ESSENCIAL",
        "codigo": "function frete(peso) { return peso * 2.5; }          // declaração\nconst frete2 = function (peso) { return peso * 2.5; };  // expressão\nconst frete3 = (peso) => peso * 2.5;                 // arrow: return implícito\n\nconsole.log(frete(4), frete2(4), frete3(4));"
       },
       {
        "n": 2,
        "titulo": "Valor padrão para o que não veio",
        "secao": "ESSENCIAL",
        "codigo": "function formatarPreco(valor, moeda = 'R$', casas = 2) {\n  return `${moeda} ${valor.toFixed(casas)}`;\n}\n\nconsole.log(formatarPreco(19.9));\nconsole.log(formatarPreco(19.9, 'US$'));"
       },
       {
        "n": 3,
        "titulo": "Early return: trate o caso ruim primeiro e saia",
        "secao": "ESSENCIAL",
        "codigo": "function aplicarCupom(valor, cupom) {\n  if (!cupom) return valor;              // sai cedo\n  if (cupom.expirado) return valor;\n  if (valor < cupom.minimo) return valor;\n  return valor - cupom.desconto;         // o caso feliz fica limpo, sem aninhamento\n}\n\nconst cupom = { desconto: 30, minimo: 100, expirado: false };\nconsole.log(aplicarCupom(200, cupom));\nconsole.log(aplicarCupom(50, cupom));"
       },
       {
        "n": 4,
        "titulo": "Rest: quantidade indefinida de argumentos",
        "secao": "NA PRÁTICA",
        "codigo": "function somar(...valores) {\n  return valores.reduce((total, v) => total + v, 0);\n}\n\nconsole.log(somar(10, 20, 30));\nconsole.log(somar(...[5, 5, 5]));"
       },
       {
        "n": 5,
        "titulo": "Objeto de opções em vez de 5 parâmetros na ordem",
        "secao": "NA PRÁTICA",
        "codigo": "function criarUsuario({ nome, email, admin = false }) {\n  return `${nome} <${email}>${admin ? ' [admin]' : ''}`;\n}\n\nconsole.log(criarUsuario({ nome: 'Ana', email: 'ana@x.com', admin: true }));\n// Compare com criarUsuario('Ana', 'ana@x.com', true, false, true) — qual é qual?"
       },
       {
        "n": 6,
        "titulo": "Função pura: não mexe no que recebeu",
        "secao": "NA PRÁTICA",
        "codigo": "const precos = [100, 200];\n\nconst pura = (lista) => lista.map((p) => p * 1.1);       // devolve lista nova\nconst suja = (lista) => { lista[0] = 999; };             // altera a de fora!\n\nconsole.log('Pura devolve:', pura(precos), '→ original:', precos);\nsuja(precos);\nconsole.log('Suja alterou: ', precos);"
       },
       {
        "n": 7,
        "titulo": "Argumento que ninguém passou vem undefined",
        "secao": "PEGADINHAS",
        "codigo": "function calcularIdade(anoNascimento) {\n  if (anoNascimento === undefined) throw new Error('anoNascimento é obrigatório');\n  return 2026 - anoNascimento;\n}\n\ntry { calcularIdade(); } catch (erro) { console.log(erro.message); }\nconsole.log(calcularIdade(1990), 'anos');"
       }
      ],
      "resumo": [
       "Arrow (`=>`) para função curta; `function` quando precisa de nome e hoisting.",
       "Valor padrão no parâmetro evita um monte de `if` no começo do corpo.",
       "Early return achata o código: caso ruim sai cedo, caso feliz fica sem indentação.",
       "Mais de 3 parâmetros? Troque por um objeto de opções — a chamada se explica.",
       "Prefira função pura: recebe, calcula e devolve, sem alterar o que veio de fora."
      ]
     },
     {
      "slug": "02-escopo",
      "arquivo": "JS/src/04-funcoes/02-escopo.js",
      "comando": "node src/04-funcoes/02-escopo.js",
      "titulo": "Escopo: quem enxerga quem",
      "sessao": 4,
      "oQueE": "o escopo é definido por ONDE você escreveu o código, não por onde ele é chamado. De dentro se enxerga o que está fora; de fora não se enxerga o de dentro.",
      "quandoUsar": "é a base de closures, de módulos e de esconder dado privado.",
      "quandoNaoUsar": "n/a — é comportamento da linguagem. O que se evita é variável global.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "De dentro para fora sempre funciona",
        "secao": "ESSENCIAL",
        "codigo": "const empresa = 'Loja XPTO';\n\nfunction emitirNota(valor) {\n  const imposto = valor * 0.1;                  // só existe dentro desta função\n  return `${empresa}: R$ ${valor} (imposto R$ ${imposto})`;   // enxerga o de fora\n}\n\nconsole.log(emitirNota(100));\n// console.log(imposto);   ← ReferenceError: de fora não se vê o de dentro"
       },
       {
        "n": 2,
        "titulo": "Vale onde foi ESCRITA, não de onde foi CHAMADA",
        "secao": "ESSENCIAL",
        "codigo": "const moeda = 'BRL';\n\nfunction mostrarMoeda() { return moeda; }   // \"moeda\" foi resolvida aqui, ao escrever\n\nfunction outroLugar() {\n  const moeda = 'USD';                      // outra variável, sem relação com a de cima\n  return mostrarMoeda();\n}\n\nconsole.log(outroLugar());   // BRL"
       },
       {
        "n": 3,
        "titulo": "Shadowing: nome de dentro cobre o de fora",
        "secao": "ESSENCIAL",
        "codigo": "const status = 'global';\n\nfunction processar() {\n  const status = 'local';    // cobre o de fora, só aqui dentro\n  return status;\n}\n\nconsole.log(processar(), '→ lá fora continua', status);"
       },
       {
        "n": 4,
        "titulo": "Esconder o estado de um módulo",
        "secao": "NA PRÁTICA",
        "codigo": "function criarContador() {\n  let total = 0;             // ninguém de fora alcança\n\n  return {\n    registrar() { total++; },\n    quantos() { return total; },\n  };\n}\n\nconst acessos = criarContador();\nacessos.registrar();\nacessos.registrar();\n\nconsole.log('Acessos:', acessos.quantos());\nconsole.log('Alcança o total direto?', acessos.total);   // undefined — protegido"
       },
       {
        "n": 5,
        "titulo": "Por que variável global dá dor de cabeça",
        "secao": "NA PRÁTICA",
        "codigo": "let usuarioLogado = 'Ana';        // qualquer função pode trocar isto\n\nconst trocar = () => { usuarioLogado = 'Bruno'; };\nconst saudar = () => `Olá, ${usuarioLogado}`;\n\nconsole.log(saudar());\ntrocar();                         // efeito invisível de longe\nconsole.log(saudar(), '← mudou e o saudar() não faz ideia de por quê');\n\nconst saudarBem = (usuario) => `Olá, ${usuario}`;   // o dado entra pela porta da frente\nconsole.log(saudarBem('Carla'));"
       },
       {
        "n": 6,
        "titulo": "O bloco também é escopo",
        "secao": "PEGADINHAS",
        "codigo": "if (true) {\n  const dentroDoIf = 'existe só aqui';\n  console.log(dentroDoIf);\n}\n// console.log(dentroDoIf);   ← ReferenceError\n\nconsole.log('let e const respeitam as chaves { }; var não respeitava — por isso saiu de uso.');"
       }
      ],
      "resumo": [
       "Escopo vem de onde o código foi ESCRITO, não de onde foi chamado.",
       "De dentro enxerga-se o de fora; nunca o contrário.",
       "Nome repetido no escopo interno cobre o externo (shadowing) só ali dentro.",
       "Variável dentro de função é privada — é assim que se esconde estado.",
       "Global torna o bug difícil de achar: passe o dado por parâmetro."
      ]
     },
     {
      "slug": "03-closures",
      "arquivo": "JS/src/04-funcoes/03-closures.js",
      "comando": "node src/04-funcoes/03-closures.js",
      "titulo": "Closures",
      "sessao": 4,
      "oQueE": "uma função que continua lembrando das variáveis do lugar onde nasceu, mesmo depois que a função de fora já terminou.",
      "quandoUsar": "guardar estado privado, cache, configurar uma função uma vez e reutilizar.",
      "quandoNaoUsar": "quando um objeto simples resolve. Closure segurando dado grande também segura memória — cuidado ao criar milhares delas.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "A variável sobrevive ao fim da função",
        "secao": "ESSENCIAL",
        "codigo": "function criarContador() {\n  let total = 0;          // criarContador() já terminou, mas isto continua vivo\n  return () => ++total;\n}\n\nconst contar = criarContador();\nconsole.log(contar(), contar(), contar());\n\nconst outro = criarContador();\nconsole.log('Contador novo começa do zero:', outro());   // cada chamada tem seu próprio total"
       },
       {
        "n": 2,
        "titulo": "Estado privado de verdade",
        "secao": "ESSENCIAL",
        "codigo": "function criarConta(saldoInicial) {\n  let saldo = saldoInicial;      // inacessível de fora\n\n  return {\n    depositar: (valor) => (saldo += valor),\n    consultar: () => saldo,\n  };\n}\n\nconst conta = criarConta(100);\nconta.depositar(50);\n\nconsole.log('Saldo:', conta.consultar());\nconsole.log('Mexer direto?', conta.saldo);   // undefined"
       },
       {
        "n": 3,
        "titulo": "Configurar uma vez, usar muitas",
        "secao": "ESSENCIAL",
        "codigo": "function criarFormatador(moeda) {\n  return (valor) => `${moeda} ${valor.toFixed(2)}`;   // lembra da moeda\n}\n\nconst emReal = criarFormatador('R$');\nconst emDolar = criarFormatador('US$');\n\nconsole.log(emReal(1500), '|', emDolar(1500));"
       },
       {
        "n": 4,
        "titulo": "Cache (memoização)",
        "secao": "NA PRÁTICA",
        "codigo": "function comCache(fn) {\n  const guardados = new Map();       // vive entre as chamadas\n\n  return (arg) => {\n    if (guardados.has(arg)) return `${guardados.get(arg)} (do cache)`;\n    const resultado = fn(arg);\n    guardados.set(arg, resultado);\n    return resultado;\n  };\n}\n\nconst buscarCep = comCache((cep) => {\n  console.log('  ...consultando a API para', cep);\n  return `Rua Exemplo, ${cep}`;\n});\n\nconsole.log(buscarCep('50000-000'));\nconsole.log(buscarCep('50000-000'));   // não consulta de novo"
       },
       {
        "n": 5,
        "titulo": "Limite de tentativas por usuário",
        "secao": "NA PRÁTICA",
        "codigo": "function criarControle(maximo) {\n  const tentativas = new Map();\n\n  return (usuario) => {\n    const n = (tentativas.get(usuario) ?? 0) + 1;\n    tentativas.set(usuario, n);\n    return n > maximo ? `${usuario}: bloqueado` : `${usuario}: tentativa ${n}/${maximo}`;\n  };\n}\n\nconst login = criarControle(2);\nconsole.log(login('ana'));\nconsole.log(login('bruno'));\nconsole.log(login('ana'));\nconsole.log(login('ana'));"
       },
       {
        "n": 6,
        "titulo": "Closure dentro de loop: var quebra, let funciona",
        "secao": "PEGADINHAS",
        "codigo": "const comVar = [];\nfor (var i = 0; i < 3; i++) comVar.push(() => i);   // todas veem o MESMO i\nconsole.log('var:', comVar.map((f) => f()));        // [3, 3, 3]\n\nconst comLet = [];\nfor (let j = 0; j < 3; j++) comLet.push(() => j);   // cada volta tem seu j\nconsole.log('let:', comLet.map((f) => f()));        // [0, 1, 2]"
       }
      ],
      "resumo": [
       "Closure = função + as variáveis do lugar onde ela nasceu, guardadas junto.",
       "Cada chamada da função de fora cria um conjunto NOVO e independente de variáveis.",
       "É assim que se faz dado privado em JS: sem `#`, sem classe, só escopo.",
       "Serve para cache, contador, limite de tentativas e função pré-configurada.",
       "Em loop, use `let`: com `var` todas as closures acabam vendo o mesmo valor final."
      ]
     },
     {
      "slug": "04-callbacks",
      "arquivo": "JS/src/04-funcoes/04-callbacks.js",
      "comando": "node src/04-funcoes/04-callbacks.js",
      "titulo": "Callbacks",
      "sessao": 4,
      "oQueE": "passar uma função como argumento para que OUTRA decida quando chamá-la.",
      "quandoUsar": "eventos, operações que terminam depois, e para deixar a regra de fora da função — quem chama escolhe o comportamento.",
      "quandoNaoUsar": "para encadear várias operações assíncronas — vira \"callback hell\". Nesse caso: Promise / async-await.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Quem chama define a regra",
        "secao": "ESSENCIAL",
        "codigo": "function aplicarDesconto(precos, regra) {\n  return precos.map(regra);      // a função não sabe QUAL desconto — quem chama sabe\n}\n\nconsole.log(aplicarDesconto([100, 250], (p) => p * 0.9));\nconsole.log(aplicarDesconto([100, 250], (p) => p - 20));"
       },
       {
        "n": 2,
        "titulo": "É o que faz map, filter e sort funcionarem",
        "secao": "ESSENCIAL",
        "codigo": "const numeros = [5, 1, 4];\n\nconsole.log(numeros.filter((n) => n > 2));           // callback decide quem fica\nconsole.log(numeros.map((n) => n * 10));             // callback decide a transformação\nconsole.log([...numeros].sort((a, b) => a - b));     // callback decide a ordem"
       },
       {
        "n": 3,
        "titulo": "Sucesso e erro em callbacks separados",
        "secao": "ESSENCIAL",
        "codigo": "function salvar(pedido, aoSalvar, aoFalhar) {\n  if (pedido.itens.length === 0) return aoFalhar('pedido vazio');\n  aoSalvar({ ...pedido, id: 1042 });\n}\n\nsalvar(\n  { itens: ['Teclado'] },\n  (p) => console.log('Salvo com id', p.id),\n  (msg) => console.log('Erro:', msg),\n);\n\nsalvar({ itens: [] }, () => {}, (msg) => console.log('Erro:', msg));"
       },
       {
        "n": 4,
        "titulo": "Comportamento injetável: uma função, vários canais",
        "secao": "NA PRÁTICA",
        "codigo": "function notificar(mensagem, enviar) {\n  return enviar(mensagem);\n}\n\nconst porEmail = (txt) => `E-mail: ${txt}`;\nconst porSms = (txt) => `SMS: ${txt}`;\n\nconsole.log(notificar('Pedido a caminho', porEmail));\nconsole.log(notificar('Pedido a caminho', porSms));"
       },
       {
        "n": 5,
        "titulo": "Erro primeiro: o padrão histórico do Node",
        "secao": "NA PRÁTICA",
        "codigo": "function lerArquivo(nome, callback) {\n  if (!nome.endsWith('.json')) return callback(new Error('formato não suportado'));\n  callback(null, '{\"ok\":true}');     // null no primeiro argumento = deu certo\n}\n\nlerArquivo('config.json', (erro, dados) => {\n  if (erro) return console.log('Falhou:', erro.message);\n  console.log('Conteúdo:', dados);\n});\n\nlerArquivo('config.txt', (erro) => console.log('Falhou:', erro.message));"
       },
       {
        "n": 6,
        "titulo": "Passe a função, não o resultado dela",
        "secao": "PEGADINHAS",
        "codigo": "const avisar = () => 'executou!';\n\nconsole.log('avisar   →', typeof avisar);     // function: a função em si\nconsole.log('avisar() →', typeof avisar());   // string: já é o RESULTADO\n\nsetTimeout(avisar, 10);        // certo: entrego a função, o setTimeout chama na hora\n// setTimeout(avisar(), 10);   ← TypeError: entregou 'executou!' no lugar da função"
       },
       {
        "n": 7,
        "titulo": "Callback hell: o motivo de Promise existir",
        "secao": "PEGADINHAS",
        "codigo": "const passo = (nome, proximo) => proximo(nome);\n\npasso('login', (a) =>\n  passo('carregar perfil', (b) =>\n    passo('carregar pedidos', (c) =>\n      console.log(`${a} → ${b} → ${c}`))));\n\n// Cada etapa nova empurra tudo para a direita. Com 6 etapas, é ilegível.\n// A saída é `await`, que escreve a mesma coisa de cima para baixo."
       }
      ],
      "resumo": [
       "Callback é função passada como argumento para outra chamar na hora certa.",
       "É o mecanismo por trás de `map`, `filter`, `sort`, `forEach` e dos eventos.",
       "Serve para injetar comportamento: a função fica genérica, quem chama decide a regra.",
       "`fn` passa a função; `fn()` passa o RESULTADO. Essa é a confusão mais comum.",
       "Encadear muitos callbacks assíncronos vira aninhamento ilegível — aí use async/await."
      ]
     },
     {
      "slug": "05-factory-functions",
      "arquivo": "JS/src/04-funcoes/05-factory-functions.js",
      "comando": "node src/04-funcoes/05-factory-functions.js",
      "titulo": "Factory Functions",
      "sessao": 4,
      "oQueE": "uma função comum que MONTA e devolve um objeto pronto. Sem `new`.",
      "quandoUsar": "quando você quer objetos com dado privado, ou quando a criação tem regra (validar, calcular, escolher variação).",
      "quandoNaoUsar": "criando milhares de objetos — cada um ganha a própria cópia dos métodos. Aí `class` economiza memória.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Uma função que devolve objeto",
        "secao": "ESSENCIAL",
        "codigo": "function criarProduto(nome, preco) {\n  return {\n    nome,\n    preco,\n    etiqueta() { return `${nome} — R$ ${preco.toFixed(2)}`; },\n  };\n}\n\nconsole.log(criarProduto('Teclado', 249.9).etiqueta());"
       },
       {
        "n": 2,
        "titulo": "Com validação: o objeto só nasce se estiver certo",
        "secao": "ESSENCIAL",
        "codigo": "function criarCliente({ nome, email }) {\n  if (!nome?.trim()) throw new Error('nome é obrigatório');\n  if (!email?.includes('@')) throw new Error('e-mail inválido');\n\n  return { nome: nome.trim(), email: email.toLowerCase() };   // já normaliza na criação\n}\n\nconsole.log(criarCliente({ nome: '  Ana  ', email: 'ANA@X.COM' }));\n\ntry { criarCliente({ nome: 'Bruno', email: 'errado' }); }\ncatch (erro) { console.log('Recusado:', erro.message); }"
       },
       {
        "n": 3,
        "titulo": "Dado privado: factory + closure",
        "secao": "ESSENCIAL",
        "codigo": "function criarCarrinho() {\n  const itens = [];      // ninguém de fora alcança esta lista\n\n  return {\n    adicionar(nome, preco) { itens.push({ nome, preco }); return this; },   // this permite encadear\n    total() { return itens.reduce((s, i) => s + i.preco, 0); },\n    resumo() { return itens.map((i) => i.nome).join(', '); },\n  };\n}\n\nconst carrinho = criarCarrinho()\n  .adicionar('Teclado', 249.9)\n  .adicionar('Mouse', 89.5);\n\nconsole.log(carrinho.resumo(), '= R$', carrinho.total().toFixed(2));\nconsole.log('Mexer na lista direto?', carrinho.itens);   // undefined"
       },
       {
        "n": 4,
        "titulo": "Composição: juntar habilidades sem herança",
        "secao": "NA PRÁTICA",
        "codigo": "const podeVoar = (nome) => ({ voar: () => `${nome} decolou` });\nconst podeNadar = (nome) => ({ nadar: () => `${nome} mergulhou` });\n\nconst criarPato = (nome) => ({ nome, ...podeVoar(nome), ...podeNadar(nome) });\nconst criarPeixe = (nome) => ({ nome, ...podeNadar(nome) });\n\nconsole.log(criarPato('Donald').voar());\nconsole.log(criarPato('Donald').nadar());\nconsole.log(criarPeixe('Nemo').nadar());\n// Cada habilidade é uma peça solta. Você combina o que precisa, sem árvore de classes."
       },
       {
        "n": 5,
        "titulo": "Variações do mesmo objeto",
        "secao": "NA PRÁTICA",
        "codigo": "function criarBotao(tipo) {\n  const base = { largura: 120, altura: 40 };\n  const estilos = {\n    primario: { cor: '#f5d76e' },\n    perigo: { cor: '#ff5f57' },\n  };\n  return { ...base, ...(estilos[tipo] ?? estilos.primario), tipo };\n}\n\nconsole.log(criarBotao('perigo'));\nconsole.log(criarBotao('inexistente'));   // caiu no padrão"
       },
       {
        "n": 6,
        "titulo": "Método com `this` não pode ser arrow",
        "secao": "PEGADINHAS",
        "codigo": "const comArrow = { nome: 'Ana', saudar: () => `Oi, ${this?.nome}` };\nconst comMetodo = { nome: 'Ana', saudar() { return `Oi, ${this.nome}`; } };\n\nconsole.log('Arrow: ', comArrow.saudar());     // arrow não tem this próprio\nconsole.log('Método:', comMetodo.saudar());"
       }
      ],
      "resumo": [
       "Factory é função comum que devolve objeto. Sem `new`, sem `this` na criação.",
       "Validar e normalizar dentro dela garante que objeto inválido nunca existe.",
       "Combinada com closure, dá dado 100% privado — mais simples que classe.",
       "Composição com spread substitui herança: junte só as habilidades necessárias.",
       "Método que usa `this` precisa da forma `metodo() {}`, não de arrow."
      ]
     },
     {
      "slug": "06-recursao",
      "arquivo": "JS/src/04-funcoes/06-recursao.js",
      "comando": "node src/04-funcoes/06-recursao.js",
      "titulo": "Recursão",
      "sessao": 4,
      "oQueE": "função que chama ela mesma até chegar num caso simples que sabe responder.",
      "quandoUsar": "dado em forma de árvore — menu com submenu, pastas, comentários com respostas.",
      "quandoNaoUsar": "lista simples (use loop) ou profundidade muito grande — a pilha estoura.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Anatomia: caso base + passo que reduz o problema",
        "secao": "ESSENCIAL",
        "codigo": "function contarRegressiva(n) {\n  if (n === 0) return 'fim';        // CASO BASE: sem ele, roda para sempre\n  process.stdout.write(n + ' ');\n  return contarRegressiva(n - 1);   // PASSO: chama com um problema menor\n}\n\nconsole.log(contarRegressiva(5));"
       },
       {
        "n": 2,
        "titulo": "Percorrer uma estrutura com profundidade indefinida",
        "secao": "ESSENCIAL",
        "codigo": "const menu = [\n  { nome: 'Início' },\n  { nome: 'Produtos', filhos: [{ nome: 'Livros' }, { nome: 'Eletrônicos' }] },\n];\n\nfunction imprimir(itens, nivel = 0) {\n  for (const item of itens) {\n    console.log('  '.repeat(nivel) + '· ' + item.nome);\n    if (item.filhos) imprimir(item.filhos, nivel + 1);   // mesma função, um nível abaixo\n  }\n}\n\nimprimir(menu);"
       },
       {
        "n": 3,
        "titulo": "Buscar lá no fundo e devolver subindo",
        "secao": "ESSENCIAL",
        "codigo": "const arvore = [\n  { nome: 'Produtos', filhos: [{ nome: 'Eletrônicos', filhos: [{ nome: 'Monitores' }] }] },\n];\n\nfunction encontrar(itens, alvo) {\n  for (const item of itens) {\n    if (item.nome === alvo) return item;\n    const achado = item.filhos && encontrar(item.filhos, alvo);\n    if (achado) return achado;\n  }\n  return null;\n}\n\nconsole.log(encontrar(arvore, 'Monitores'));\nconsole.log(encontrar(arvore, 'Inexistente'));"
       },
       {
        "n": 4,
        "titulo": "Somar o tamanho de uma árvore de pastas",
        "secao": "NA PRÁTICA",
        "codigo": "const disco = {\n  tipo: 'pasta',\n  filhos: [\n    { tipo: 'arquivo', kb: 12 },\n    { tipo: 'pasta', filhos: [{ tipo: 'arquivo', kb: 30 }, { tipo: 'arquivo', kb: 8 }] },\n  ],\n};\n\nfunction tamanhoTotal(no) {\n  if (no.tipo === 'arquivo') return no.kb;                      // caso base\n  return no.filhos.reduce((s, f) => s + tamanhoTotal(f), 0);    // soma os filhos\n}\n\nconsole.log('Total:', tamanhoTotal(disco), 'kb');"
       },
       {
        "n": 5,
        "titulo": "Achatar objeto aninhado (útil para formulário e CSV)",
        "secao": "NA PRÁTICA",
        "codigo": "function achatar(obj, prefixo = '') {\n  const saida = {};\n\n  for (const [chave, valor] of Object.entries(obj)) {\n    const caminho = prefixo ? `${prefixo}.${chave}` : chave;\n    if (valor && typeof valor === 'object') Object.assign(saida, achatar(valor, caminho));\n    else saida[caminho] = valor;\n  }\n\n  return saida;\n}\n\nconsole.log(achatar({ nome: 'Ana', endereco: { cidade: 'Recife', cep: { numero: '50000' } } }));"
       },
       {
        "n": 6,
        "titulo": "Sem caso base, a pilha estoura",
        "secao": "PEGADINHAS",
        "codigo": "function semFim(n) { return semFim(n + 1); }\n\ntry { semFim(0); }\ncatch (erro) { console.log('Estourou:', erro.message); }"
       },
       {
        "n": 7,
        "titulo": "Recursão ingênua repete trabalho",
        "secao": "PEGADINHAS",
        "codigo": "let chamadas = 0;\n\nfunction fib(n) {\n  chamadas++;\n  return n <= 1 ? n : fib(n - 1) + fib(n - 2);\n}\n\nconsole.log('fib(20) =', fib(20), 'em', chamadas, 'chamadas — muita conta repetida');\n// Com cache (ver o tópico de Closures) isso cai para 21 chamadas."
       }
      ],
      "resumo": [
       "Toda recursão precisa de caso base + passo que reduz o problema. Sem base, trava.",
       "Use quando o dado tem profundidade desconhecida: menu, pastas, comentários.",
       "Para percorrer e imprimir, passe o nível como parâmetro e use `repeat` no recuo.",
       "Para somar/contar a árvore, combine recursão com `reduce`.",
       "Lista simples? Use loop. Recursão só paga quando a estrutura é aninhada."
      ]
     }
    ]
   },
   {
    "slug": "05-transformar-listas",
    "titulo": "Transformar Listas",
    "icone": "≡",
    "cor": "#ff9e6d",
    "resumo": "filter, map e reduce — o trio do dia a dia.",
    "topicos": [
     {
      "slug": "01-foreach",
      "arquivo": "JS/src/05-transformar-listas/01-foreach.js",
      "comando": "node src/05-transformar-listas/01-foreach.js",
      "titulo": "forEach",
      "sessao": 5,
      "oQueE": "percorre o array executando algo em cada item. Não devolve nada (`undefined`).",
      "quandoUsar": "EFEITO COLATERAL — imprimir, salvar no banco, disparar e-mail, atualizar a tela.",
      "quandoNaoUsar": "quando você quer um novo array (`map`), um total (`reduce`) ou um subconjunto (`filter`). E quando precisa parar no meio: não tem break.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Os três argumentos: item, índice, array",
        "secao": "ESSENCIAL",
        "codigo": "const pedidos = ['#1042', '#1043', '#1044'];\n\npedidos.forEach((pedido, i) => {\n  console.log(`${i + 1}. ${pedido}`);\n});"
       },
       {
        "n": 2,
        "titulo": "Para que ele serve: FAZER algo, não produzir algo",
        "secao": "ESSENCIAL",
        "codigo": "const pendentes = [\n  { cliente: 'Ana', status: 'pago' },\n  { cliente: 'Bruno', status: 'pendente' },\n];\n\npendentes\n  .filter((p) => p.status === 'pendente')\n  .forEach((p) => console.log(`Cobrança enviada para ${p.cliente}`));"
       },
       {
        "n": 3,
        "titulo": "forEach não devolve nada",
        "secao": "ESSENCIAL",
        "codigo": "const valores = [10, 20];\n\nconsole.log('forEach:', valores.forEach((v) => v * 2));   // undefined\nconsole.log('map:    ', valores.map((v) => v * 2));       // [20, 40]"
       },
       {
        "n": 4,
        "titulo": "Percorrer as chaves de um objeto",
        "secao": "NA PRÁTICA",
        "codigo": "const estoque = { teclado: 3, mouse: 0, monitor: 7 };\n\nObject.entries(estoque).forEach(([produto, qtd]) => {\n  if (qtd === 0) console.log('Repor:', produto);\n});"
       },
       {
        "n": 5,
        "titulo": "Alimentar variáveis de fora",
        "secao": "NA PRÁTICA",
        "codigo": "const vendas = [\n  { cliente: 'Ana', total: 340, pago: true },\n  { cliente: 'Bruno', total: 120, pago: false },\n  { cliente: 'Carla', total: 890, pago: true },\n];\n\nlet faturamento = 0;\nconst clientes = [];\n\nvendas.forEach((v) => {\n  if (!v.pago) return;          // `return` pula só ESTE item (é o continue do forEach)\n  faturamento += v.total;\n  clientes.push(v.cliente);\n});\n\nconsole.log(`R$ ${faturamento} de ${clientes.join(' e ')}`);"
       },
       {
        "n": 6,
        "titulo": "Não existe break nem continue",
        "secao": "PEGADINHAS",
        "codigo": "const ids = [1, 2, 3];\n\nids.forEach((id) => {\n  if (id === 2) return;         // pula. Mas NÃO tem como parar o loop aqui.\n  console.log('forEach visitou', id);\n});\n\nfor (const id of ids) {         // precisa parar no meio? use for...of\n  if (id === 2) break;\n  console.log('for...of parou antes do 2, no', id);\n}"
       },
       {
        "n": 7,
        "titulo": "forEach ignora async: ele não espera",
        "secao": "PEGADINHAS",
        "codigo": "const salvar = (id) => new Promise((r) => setTimeout(() => r(id), 10));\n\n[1, 2].forEach(async (id) => { await salvar(id); });   // o await é engolido\nconsole.log('Chegou aqui ANTES de salvar qualquer coisa.');\n\n(async () => {\n  for (const id of [1, 2]) await salvar(id);           // for...of espera de verdade\n  console.log('Agora sim: tudo salvo, um de cada vez.');\n\n  console.log('Em paralelo:', await Promise.all([1, 2].map(salvar)));\n})();"
       }
      ],
      "resumo": [
       "`forEach` é para FAZER algo com cada item, não para produzir um resultado.",
       "Ele sempre devolve `undefined` — não dá para encadear depois dele.",
       "`return` dentro dele pula um item; não existe `break`.",
       "Quer parar no meio? `for...of`. Quer um valor de volta? `map`/`filter`/`reduce`.",
       "Com `async`, `forEach` não espera. Use `for...of` + `await`, ou `Promise.all(map)`."
      ]
     },
     {
      "slug": "02-filter",
      "arquivo": "JS/src/05-transformar-listas/02-filter.js",
      "comando": "node src/05-transformar-listas/02-filter.js",
      "titulo": "filter — escolher itens",
      "sessao": 5,
      "oQueE": "devolve um array NOVO só com os itens em que o teste retornou true.",
      "quandoUsar": "sempre que a frase for \"só os que...\". Busca, listagem com filtro, remover item.",
      "quandoNaoUsar": "quando quer UM item (`find`), um sim/não (`some`/`every`) ou mudar o valor (`map`). O filter mantém o item exatamente como está.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Um teste que devolve true ou false",
        "secao": "ESSENCIAL",
        "codigo": "const idades = [15, 22, 17, 30];\n\nconsole.log(idades.filter((i) => i >= 18));\nconsole.log('Original intacto:', idades);"
       },
       {
        "n": 2,
        "titulo": "Várias condições",
        "secao": "ESSENCIAL",
        "codigo": "const funcionarios = [\n  { nome: 'Ana', setor: 'TI', ativo: true },\n  { nome: 'Bruno', setor: 'Vendas', ativo: true },\n  { nome: 'Carla', setor: 'TI', ativo: false },\n];\n\nconst tiAtivos = funcionarios.filter((f) => f.setor === 'TI' && f.ativo);\nconsole.log(tiAtivos.map((f) => f.nome));"
       },
       {
        "n": 3,
        "titulo": "Remover um item sem alterar o original",
        "secao": "ESSENCIAL",
        "codigo": "const tarefas = ['Estudar', 'Treinar', 'Ler'];\n\nconsole.log(tarefas.filter((t) => t !== 'Treinar'));\nconsole.log('Original continua com', tarefas.length);"
       },
       {
        "n": 4,
        "titulo": "Busca com filtros opcionais",
        "secao": "NA PRÁTICA",
        "codigo": "const produtos = [\n  { nome: 'Teclado', preco: 249.9, categoria: 'eletronicos' },\n  { nome: 'Livro JS', preco: 79.9, categoria: 'livros' },\n  { nome: 'Monitor', preco: 1199, categoria: 'eletronicos' },\n];\n\nfunction buscar(lista, { categoria, precoMax } = {}) {\n  return lista.filter((p) => {\n    if (categoria && p.categoria !== categoria) return false;   // filtro ausente = não filtra\n    if (precoMax && p.preco > precoMax) return false;\n    return true;\n  });\n}\n\nconsole.log(buscar(produtos, { categoria: 'eletronicos' }).map((p) => p.nome));\nconsole.log(buscar(produtos, { precoMax: 100 }).map((p) => p.nome));\nconsole.log(buscar(produtos).length, '← sem filtro, devolve tudo');"
       },
       {
        "n": 5,
        "titulo": "Limpar dados sujos",
        "secao": "NA PRÁTICA",
        "codigo": "const entradas = ['ana@x.com', '', null, '  ', 'bruno@x.com', undefined];\n\nconsole.log(entradas.filter(Boolean));                 // tira null/undefined/''\nconsole.log(entradas.filter((e) => e?.trim()));        // tira também o só-espaço"
       },
       {
        "n": 6,
        "titulo": "Remover duplicados",
        "secao": "NA PRÁTICA",
        "codigo": "const emails = ['a@x.com', 'b@x.com', 'a@x.com'];\n\nconsole.log(emails.filter((e, i, arr) => arr.indexOf(e) === i));   // mantém a 1ª ocorrência\nconsole.log([...new Set(emails)]);                                 // mais direto"
       },
       {
        "n": 7,
        "titulo": "Separar em dois grupos de uma vez",
        "secao": "NA PRÁTICA",
        "codigo": "const notas = [7, 4, 9, 3];\n\nconst aprovados = notas.filter((n) => n >= 6);\nconst reprovados = notas.filter((n) => n < 6);\n\nconsole.log(`${aprovados.length} aprovados, ${reprovados.length} reprovados`);"
       },
       {
        "n": 8,
        "titulo": "Esquecer o return no callback com chaves",
        "secao": "PEGADINHAS",
        "codigo": "const ativos = [{ ativo: true }, { ativo: true }, { ativo: false }];\n\nconsole.log(ativos.filter((a) => { a.ativo; }).length, '← 0: sem return, devolve undefined');\nconsole.log(ativos.filter((a) => { return a.ativo; }).length, '← 2: com return');\nconsole.log(ativos.filter((a) => a.ativo).length, '← 2: arrow curta já retorna');"
       }
      ],
      "resumo": [
       "`filter` devolve array NOVO com os aprovados; o original nunca muda.",
       "O callback precisa devolver true/false — com chaves `{}`, o `return` é obrigatório.",
       "Nada passou? Vem `[]`, não `null`. Sempre dá para encadear depois.",
       "`filter(Boolean)` é o jeito rápido de tirar valores vazios da lista.",
       "Duplicados: `[...new Set(lista)]` para valores simples."
      ]
     },
     {
      "slug": "03-map",
      "arquivo": "JS/src/05-transformar-listas/03-map.js",
      "comando": "node src/05-transformar-listas/03-map.js",
      "titulo": "map — transformar itens",
      "sessao": 5,
      "oQueE": "devolve um array NOVO do MESMO tamanho, com cada item transformado.",
      "quandoUsar": "converter formato (API → tela), calcular campo novo, extrair uma propriedade.",
      "quandoNaoUsar": "só para percorrer sem usar o retorno (`forEach`) ou quando o tamanho do resultado muda (`filter`/`flatMap`).",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Transformar cada valor",
        "secao": "ESSENCIAL",
        "codigo": "const precos = [100, 250, 80];\n\nconsole.log(precos.map((p) => p * 2));\nconsole.log(precos.map((p) => `R$ ${p.toFixed(2)}`));\nconsole.log('Original intacto:', precos);"
       },
       {
        "n": 2,
        "titulo": "Extrair uma propriedade",
        "secao": "ESSENCIAL",
        "codigo": "const produtos = [\n  { id: 1, nome: 'Teclado', preco: 249.9 },\n  { id: 2, nome: 'Mouse', preco: 89.5 },\n];\n\nconsole.log(produtos.map((p) => p.nome));\nconsole.log(produtos.map((p) => p.id));"
       },
       {
        "n": 3,
        "titulo": "Calcular campo novo sem mexer no original",
        "secao": "ESSENCIAL",
        "codigo": "const carrinho = [{ nome: 'Teclado', preco: 100 }];\n\nconst comDesconto = carrinho.map((item) => ({ ...item, preco: item.preco * 0.9 }));\n\nconsole.log(comDesconto);\nconsole.log('Original:', carrinho);"
       },
       {
        "n": 4,
        "titulo": "Adaptar o formato da API para o que a tela precisa",
        "secao": "NA PRÁTICA",
        "codigo": "const daApi = [{ user_id: 7, full_name: 'ana paula', created_at: '2026-01-15' }];\n\nconst paraTela = daApi.map((u) => ({\n  id: u.user_id,\n  nome: u.full_name.toUpperCase(),\n  link: `/usuario/${u.user_id}`,\n}));\n\nconsole.log(paraTela);"
       },
       {
        "n": 5,
        "titulo": "Normalizar dados inconsistentes",
        "secao": "NA PRÁTICA",
        "codigo": "const bagunca = [\n  { nome: '  ana  ', idade: '30' },\n  { nome: 'BRUNO', idade: null },\n];\n\nconsole.log(bagunca.map((p) => ({\n  nome: p.nome.trim().toLowerCase(),\n  idade: Number(p.idade) || 0,\n})));"
       },
       {
        "n": 6,
        "titulo": "flatMap: quando um item vira zero, um ou vários",
        "secao": "NA PRÁTICA",
        "codigo": "const pedidos = [\n  { id: 1, itens: ['Teclado', 'Mouse'] },\n  { id: 2, itens: [] },\n  { id: 3, itens: ['Livro'] },\n];\n\nconsole.log('map:     ', pedidos.map((p) => p.itens));       // array de arrays\nconsole.log('flatMap: ', pedidos.flatMap((p) => p.itens));   // já vem achatado"
       },
       {
        "n": 7,
        "titulo": "Virar índice para busca instantânea",
        "secao": "NA PRÁTICA",
        "codigo": "const catalogo = [{ id: 1, nome: 'Teclado' }, { id: 2, nome: 'Mouse' }];\n\nconst porId = Object.fromEntries(catalogo.map((p) => [p.id, p.nome]));\n\nconsole.log(porId);\nconsole.log('Produto 2 é o', porId[2]);   // sem percorrer a lista de novo"
       },
       {
        "n": 8,
        "titulo": "Chave `{` sem `return` devolve undefined",
        "secao": "PEGADINHAS",
        "codigo": "const nomes = [{ nome: 'Ana' }, { nome: 'Bruno' }];\n\nconsole.log(nomes.map((p) => { p.nome; }));   // [undefined, undefined]: abriu corpo e não devolveu\nconsole.log(nomes.map((p) => p.nome));        // certo\n\nconsole.log([1, 2].map((n) => ({ valor: n })));   // objeto na arrow curta pede ( { } )\nconsole.log('Sem os parênteses o JS acha que `{` abre o corpo da função.');"
       }
      ],
      "resumo": [
       "`map` sempre devolve array do mesmo tamanho — um item entra, um item sai.",
       "Para não alterar o original, devolva objeto novo com spread: `{ ...item, campo: novo }`.",
       "Não usa o retorno? Não é `map`, é `forEach`.",
       "Um item vira vários (ou nenhum)? `flatMap`.",
       "Arrow curta devolvendo objeto precisa de parênteses: `(p) => ({ ... })`."
      ]
     },
     {
      "slug": "04-reduce",
      "arquivo": "JS/src/05-transformar-listas/04-reduce.js",
      "comando": "node src/05-transformar-listas/04-reduce.js",
      "titulo": "reduce — resumir a lista em um valor",
      "sessao": 5,
      "oQueE": "percorre o array acumulando UM resultado. Esse resultado pode ser número, texto, objeto ou outro array.",
      "quandoUsar": "somar, contar, agrupar por categoria, montar índice — \"muitos itens → um\". É o jeito natural (e mais eficiente) de fechar a lista em UMA resposta, decidindo item a item o que entra na conta: uma passada, sem variável de fora.",
      "quandoNaoUsar": "quando `filter`/`map`/`some` já resolvem. Se o callback passar de ~6 linhas, um `for...of` fica mais legível.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Somar: o caso mais comum",
        "secao": "ESSENCIAL",
        "codigo": "const valores = [10, 20, 30];\n\n//                            (acumulado, item) => novo acumulado    inicial ↓\nconsole.log(valores.reduce((soma, v) => soma + v, 0));\n\nconsole.log('Array vazio:', [].reduce((s, v) => s + v, 0));\n// Sem o valor inicial, reduce em array vazio lança TypeError. Sempre passe o inicial."
       },
       {
        "n": 2,
        "titulo": "Contar ocorrências",
        "secao": "ESSENCIAL",
        "codigo": "const niveis = ['erro', 'info', 'erro', 'aviso', 'erro'];\n\nconst contagem = niveis.reduce((acc, nivel) => {\n  acc[nivel] = (acc[nivel] ?? 0) + 1;\n  return acc;                            // NUNCA esqueça de devolver o acumulador\n}, {});\n\nconsole.log(contagem);"
       },
       {
        "n": 3,
        "titulo": "Agrupar por campo (group by)",
        "secao": "ESSENCIAL",
        "codigo": "const vendas = [\n  { produto: 'Teclado', categoria: 'eletronicos' },\n  { produto: 'Livro JS', categoria: 'livros' },\n  { produto: 'Mouse', categoria: 'eletronicos' },\n];\n\nconst porCategoria = vendas.reduce((grupos, v) => {\n  grupos[v.categoria] ??= [];            // cria a lista na primeira vez que aparece\n  grupos[v.categoria].push(v.produto);\n  return grupos;\n}, {});\n\nconsole.log(porCategoria);\nconsole.log('Object.groupBy faz o mesmo:', Object.keys(Object.groupBy(vendas, (v) => v.categoria)));"
       },
       {
        "n": 4,
        "titulo": "Somar por chave e montar um ranking",
        "secao": "NA PRÁTICA",
        "codigo": "const comissoes = [\n  { vendedor: 'Ana', valor: 249.9 },\n  { vendedor: 'Bruno', valor: 59.9 },\n  { vendedor: 'Ana', valor: 1199 },\n];\n\nconst porVendedor = comissoes.reduce((acc, c) => {\n  acc[c.vendedor] = (acc[c.vendedor] ?? 0) + c.valor;\n  return acc;\n}, {});\n\nconsole.log(porVendedor);\n\nconsole.log(\n  Object.entries(porVendedor)\n    .sort(([, a], [, b]) => b - a)\n    .map(([nome, total], i) => `${i + 1}º ${nome}: R$ ${total.toFixed(2)}`),\n);"
       },
       {
        "n": 5,
        "titulo": "Várias estatísticas numa passada só",
        "secao": "NA PRÁTICA",
        "codigo": "const notas = [7.5, 9, 6, 10];\n\nconst stats = notas.reduce(\n  (s, n) => ({\n    qtd: s.qtd + 1,\n    total: s.total + n,\n    maior: Math.max(s.maior, n),\n    menor: Math.min(s.menor, n),\n  }),\n  { qtd: 0, total: 0, maior: -Infinity, menor: Infinity },\n);\n\nconsole.log({ ...stats, media: +(stats.total / stats.qtd).toFixed(2) });"
       },
       {
        "n": 6,
        "titulo": "Achar o item de maior valor (não só o número)",
        "secao": "NA PRÁTICA",
        "codigo": "const pedidos = [\n  { produto: 'Mouse', valor: 89.5 },\n  { produto: 'Monitor', valor: 1199 },\n];\n\nconst maior = pedidos.reduce((a, b) => (b.valor > a.valor ? b : a));\n\nconsole.log('Maior venda:', maior);\n// Math.max daria só o número; o reduce devolve o objeto inteiro."
       },
       {
        "n": 7,
        "titulo": "Resumir a lista: reduce em vez de forEach",
        "secao": "NA PRÁTICA",
        "codigo": "const lancamentos = [\n  { desc: 'Venda 1', valor: 249.9, aprovado: true },\n  { desc: 'Venda 2', valor: 89.5, aprovado: false },\n  { desc: 'Venda 3', valor: 1199, aprovado: true },\n];\n\nlet totalForEach = 0;                            // precisa de uma variável fora do laço\nlancamentos.forEach((l) => { if (l.aprovado) totalForEach += l.valor; });\n\nconst totalReduce = lancamentos.reduce((s, l) => (l.aprovado ? s + l.valor : s), 0);\n\nconsole.log({ totalForEach, totalReduce });\n// Mesmo resultado, mas o reduce fecha tudo dentro da expressão: nada vaza para fora,\n// dá para usar direto em `const`, e o filtro do `if` acontece na mesma passada."
       },
       {
        "n": 8,
        "titulo": "Esquecer de devolver o acumulador",
        "secao": "PEGADINHAS",
        "codigo": "const itens = [{ nome: 'a' }, { nome: 'b' }];\n\ntry {\n  itens.reduce((acc, i) => { acc[i.nome] = true; }, {});   // sem return\n} catch (erro) {\n  console.log('Sem return:', erro.message.split('\\n')[0]);\n}\n\nconsole.log('Na volta seguinte o acumulador virou undefined — daí o erro.');"
       }
      ],
      "resumo": [
       "`reduce(callback, inicial)` — sempre passe o valor inicial.",
       "O callback SEMPRE devolve o acumulador, senão a próxima volta recebe `undefined`.",
       "O acumulador pode ser número, string, objeto ou array — não só total.",
       "Agrupar, contar e indexar são os usos que mais aparecem no dia a dia.",
       "Para \"lista → um valor\", prefira `reduce` a `forEach` com variável de fora: uma",
       "passada só, decidindo na hora o que entra na conta, e o resultado já sai em `const`.",
       "Callback grande demais? Troque por `for...of`: mesma lógica, mais legível."
      ]
     },
     {
      "slug": "05-encadeando",
      "arquivo": "JS/src/05-transformar-listas/05-encadeando.js",
      "comando": "node src/05-transformar-listas/05-encadeando.js",
      "titulo": "Encadeando filter, map e reduce",
      "sessao": 5,
      "oQueE": "usar os três na ordem natural do raciocínio — escolher, transformar, resumir.",
      "quandoUsar": "relatório, dashboard, total de carrinho, ranking.",
      "quandoNaoUsar": "lista com centenas de milhares de itens (cada método faz uma passada), ou quando a corrente passa de ~4 elos e vira difícil de ler.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "A ordem certa: filtre primeiro, sempre",
        "secao": "ESSENCIAL",
        "codigo": "const vendas = [\n  { valor: 249.9, cancelada: false },\n  { valor: 89.5, cancelada: true },\n  { valor: 1199, cancelada: false },\n];\n\nconst faturamento = vendas\n  .filter((v) => !v.cancelada)     // 1º joga fora o que não conta\n  .map((v) => v.valor)             // 2º fica só com o número\n  .reduce((s, n) => s + n, 0);     // 3º resume em um valor\n\nconsole.log('Faturamento: R$', faturamento.toFixed(2));\n// Filtrar depois de mapear obrigaria o map a processar itens que iam ser descartados."
       },
       {
        "n": 2,
        "titulo": "Leia a corrente como uma frase",
        "secao": "ESSENCIAL",
        "codigo": "const produtos = [\n  { nome: 'Teclado', preco: 249.9 },\n  { nome: 'Mouse', preco: 89.5 },\n  { nome: 'Monitor', preco: 1199 },\n];\n\nconst caros = produtos\n  .filter((p) => p.preco > 200)    // \"dos produtos acima de 200,\"\n  .map((p) => p.nome);             // \"pegue o nome\"\n\nconsole.log(caros);"
       },
       {
        "n": 3,
        "titulo": "Dê nome aos passos quando a corrente crescer",
        "secao": "ESSENCIAL",
        "codigo": "const pedidos = [\n  { mes: 1, valor: 100, pago: true },\n  { mes: 2, valor: 300, pago: true },\n  { mes: 2, valor: 50, pago: false },\n];\n\nconst pagos = pedidos.filter((p) => p.pago);\nconst doMes2 = pagos.filter((p) => p.mes === 2);\nconst total = doMes2.reduce((s, p) => s + p.valor, 0);\n\nconsole.log(`Mês 2: ${doMes2.length} pedidos, R$ ${total.toFixed(2)}`);\n// Três linhas com nome batem uma corrente de seis elos."
       },
       {
        "n": 4,
        "titulo": "Ranking de vendedores",
        "secao": "NA PRÁTICA",
        "codigo": "const comissoes = [\n  { vendedor: 'Ana', valor: 250, cancelada: false },\n  { vendedor: 'Bruno', valor: 90, cancelada: true },\n  { vendedor: 'Ana', valor: 1200, cancelada: false },\n  { vendedor: 'Carla', valor: 250, cancelada: false },\n];\n\nconst totais = comissoes\n  .filter((c) => !c.cancelada)\n  .reduce((acc, c) => ({ ...acc, [c.vendedor]: (acc[c.vendedor] ?? 0) + c.valor }), {});\n\nconsole.log(\n  Object.entries(totais)\n    .sort(([, a], [, b]) => b - a)\n    .map(([nome, valor], i) => `${i + 1}º ${nome.padEnd(6)} R$ ${valor.toFixed(2)}`)\n    .join('\\n'),\n);"
       },
       {
        "n": 5,
        "titulo": "Total do carrinho com desconto por faixa",
        "secao": "NA PRÁTICA",
        "codigo": "const carrinho = [\n  { preco: 249.9, qtd: 1 },\n  { preco: 89.5, qtd: 2 },\n];\n\nconst subtotal = carrinho\n  .map((i) => i.preco * i.qtd)\n  .reduce((s, v) => s + v, 0);\n\nconst [, percentual] = [[500, 0.15], [300, 0.1], [0, 0]].find(([min]) => subtotal >= min);\n\nconsole.log(`Subtotal R$ ${subtotal.toFixed(2)} − ${percentual * 100}% = R$ ${(subtotal * (1 - percentual)).toFixed(2)}`);"
       },
       {
        "n": 6,
        "titulo": "Top N mais vendidos",
        "secao": "NA PRÁTICA",
        "codigo": "const itens = ['Teclado', 'Mouse', 'Teclado', 'Monitor', 'Teclado', 'Mouse'];\n\nconst top2 = Object.entries(itens.reduce((acc, i) => ({ ...acc, [i]: (acc[i] ?? 0) + 1 }), {}))\n  .sort(([, a], [, b]) => b - a)\n  .slice(0, 2);\n\nconsole.log('Mais vendidos:', top2);"
       },
       {
        "n": 7,
        "titulo": "Cada elo é uma passada no array",
        "secao": "PEGADINHAS",
        "codigo": "const lista = [1, 2, 3, 4];\n\nlet visitasFilter = 0;\nlet visitasMap = 0;\n\nlista\n  .filter((n) => { visitasFilter++; return n % 2 === 0; })\n  .map((n) => { visitasMap++; return n * 10; });\n\nconsole.log(`filter visitou ${visitasFilter}, map visitou ${visitasMap} — 2 passadas`);\n\nlet visitasLoop = 0;\nconst saida = [];\nfor (const n of lista) { visitasLoop++; if (n % 2 === 0) saida.push(n * 10); }\n\nconsole.log(`for...of visitou ${visitasLoop} — 1 passada, mesmo resultado:`, saida);\n// Com 4 itens não muda nada. Com 500 mil, muda. Só otimize quando medir que dói."
       }
      ],
      "resumo": [
       "A ordem natural é filter → map → reduce: escolher, transformar, resumir.",
       "Filtre primeiro: o que foi descartado não precisa ser transformado.",
       "Leia a corrente como uma frase. Se não der para ler, quebre em variáveis com nome.",
       "`reduce` + `Object.entries` + `sort` é a receita de qualquer ranking.",
       "Cada elo faz uma passada. Só vire `for...of` quando a lista for enorme de verdade."
      ]
     }
    ]
   },
   {
    "slug": "06-assincrono",
    "titulo": "Assíncrono",
    "icone": "◷",
    "cor": "#79c0ff",
    "resumo": "Código que roda depois, sem travar o resto.",
    "topicos": [
     {
      "slug": "01-settimeout-setinterval",
      "arquivo": "JS/src/06-assincrono/01-settimeout-setinterval.js",
      "comando": "node src/06-assincrono/01-settimeout-setinterval.js",
      "titulo": "setTimeout e setInterval",
      "sessao": 3,
      "oQueE": "agendar código para rodar depois (`setTimeout`) ou repetir a cada X ms (`setInterval`).",
      "quandoUsar": "debounce de busca, aviso que some sozinho, contador, polling, retry com espera.",
      "quandoNaoUsar": "para \"esperar\" outro código terminar. Isso é trabalho de Promise/async.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "setTimeout: roda uma vez, depois do tempo",
        "secao": "ESSENCIAL",
        "codigo": "console.log('1. agora');\nsetTimeout(() => console.log('3. depois de 100ms'), 100);\nconsole.log('2. ainda agora');     // o JS não fica parado esperando"
       },
       {
        "n": 2,
        "titulo": "Cancelar antes de disparar",
        "secao": "ESSENCIAL",
        "codigo": "const id = setTimeout(() => console.log('não vai aparecer'), 50);\nclearTimeout(id);\nconsole.log('Timeout cancelado antes de disparar.');"
       },
       {
        "n": 3,
        "titulo": "setInterval: repete até você mandar parar",
        "secao": "ESSENCIAL",
        "codigo": "let restante = 3;\n\nconst contador = setInterval(() => {\n  console.log('Contagem:', restante);\n  restante--;\n  if (restante === 0) {\n    clearInterval(contador);       // sem isto, repete para sempre\n    console.log('Fim da contagem');\n  }\n}, 30);"
       },
       {
        "n": 4,
        "titulo": "Debounce: só busca quando o usuário para de digitar",
        "secao": "NA PRÁTICA",
        "codigo": "function criarDebounce(fn, espera) {\n  let id;\n  return (...args) => {\n    clearTimeout(id);              // cada tecla cancela o agendamento anterior\n    id = setTimeout(() => fn(...args), espera);\n  };\n}\n\nconst buscar = criarDebounce((termo) => console.log('BUSCOU:', termo), 60);\n\nbuscar('t');\nbuscar('te');\nbuscar('teclado');                 // só a última sobrevive"
       },
       {
        "n": 5,
        "titulo": "Throttle: no máximo uma execução por intervalo",
        "secao": "NA PRÁTICA",
        "codigo": "function criarThrottle(fn, intervalo) {\n  let liberado = true;\n  return (...args) => {\n    if (!liberado) return;         // ignora enquanto estiver no intervalo\n    liberado = false;\n    fn(...args);\n    setTimeout(() => { liberado = true; }, intervalo);\n  };\n}\n\nconst aoRolar = criarThrottle((y) => console.log('SCROLL em', y), 50);\n\naoRolar(0);\naoRolar(10);\naoRolar(20);                       // só o primeiro passa"
       },
       {
        "n": 6,
        "titulo": "Esperar de verdade: setTimeout dentro de Promise",
        "secao": "NA PRÁTICA",
        "codigo": "const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));\n\n(async () => {\n  console.log('Tentativa 1 falhou, esperando...');\n  await esperar(40);\n  console.log('Sucesso na tentativa 2');\n})();"
       },
       {
        "n": 7,
        "titulo": "O tempo é o MÍNIMO, não o exato",
        "secao": "PEGADINHAS",
        "codigo": "setTimeout(() => console.log('Agendado com 0ms — ainda assim roda por último'), 0);\nconsole.log('Este console.log vem antes, mesmo com 0ms lá em cima.');"
       }
      ],
      "resumo": [
       "`setTimeout` agenda uma vez; `setInterval` repete até `clearInterval`.",
       "Todo `setInterval` precisa de uma condição de saída, senão roda para sempre.",
       "Debounce = espera parar de acontecer. Throttle = no máximo 1 por intervalo.",
       "`new Promise(r => setTimeout(r, ms))` é o jeito de dar `await` numa espera.",
       "O tempo informado é o mínimo: o JS só executa quando a fila atual esvazia."
      ]
     },
     {
      "slug": "02-promises",
      "arquivo": "JS/src/06-assincrono/02-promises.js",
      "comando": "node src/06-assincrono/02-promises.js",
      "titulo": "Promise — o valor que ainda não chegou",
      "sessao": 7,
      "oQueE": "um objeto que representa um resultado futuro. Ou ele chega (`resolve`), ou dá erro (`reject`) — e só acontece uma vez.",
      "quandoUsar": "qualquer coisa que demora e não é sua: rede, banco, arquivo, timer. Consumir com `.then` compensa quando é um passo só, ou quando você entrega a promise para outra função em vez de esperar por ela aqui.",
      "quandoNaoUsar": "em código que já tem a resposta na mão — Promise só adiciona espera. E evite encadear três, quatro `.then`: a partir daí `async/await` lê melhor (veja 03-async-await).",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Criar e consumir",
        "secao": "ESSENCIAL",
        "codigo": "const buscarCep = (cep) => new Promise((resolve, reject) => {\n  setTimeout(() => {                                  // finge a demora da rede\n    if (cep.length === 8) resolve({ cep, cidade: 'São Paulo' });\n    else reject(new Error('CEP inválido'));\n  }, 20);\n});\n\nbuscarCep('01310100')\n  .then((endereco) => console.log('1) Achou:', endereco))\n  .catch((erro) => console.log('1) Falhou:', erro.message))\n  .finally(() => console.log('1) Esconde o loading (roda dando certo ou errado)'));"
       },
       {
        "n": 2,
        "titulo": "Os três estados",
        "secao": "ESSENCIAL",
        "codigo": "const pendente = new Promise((resolve) => setTimeout(resolve, 50));\n\nconsole.log('2) Recém-criada:', pendente);            // pending — ainda não tem valor\nPromise.resolve('já pronta').then((v) => console.log('2) resolvida:', v));\nPromise.reject(new Error('já falhou')).catch((e) => console.log('2) rejeitada:', e.message));"
       },
       {
        "n": 3,
        "titulo": "Encadear: o fim do callback hell",
        "secao": "ESSENCIAL",
        "codigo": "const passo = (nome, valor) => new Promise((r) => setTimeout(() => {\n  console.log('3) passo', nome);\n  r(valor);\n}, 10));\n\npasso('login', { id: 7 })\n  .then((usuario) => passo('carrinho do usuário ' + usuario.id, ['Mouse']))\n  .then((itens) => passo('pagamento de ' + itens.length + ' item', 'pago'))\n  .then((status) => console.log('3) Fim:', status));\n// Cada `.then` devolve uma Promise nova — por isso dá para empilhar sem aninhar."
       },
       {
        "n": 4,
        "titulo": "Promise.all: tudo ao mesmo tempo",
        "secao": "NA PRÁTICA",
        "codigo": "const carregar = (nome, ms) => new Promise((r) => setTimeout(() => r(nome), ms));\n\nPromise.all([carregar('perfil', 30), carregar('pedidos', 20), carregar('cupons', 25)])\n  .then((tudo) => console.log('4) Chegou junto:', tudo));   // ordem do array, não de chegada\n// Leva o tempo do mais lento (30ms), não a soma (75ms). Se UM falhar, o all inteiro falha."
       },
       {
        "n": 5,
        "titulo": "Promise.allSettled: quero todos, mesmo com falha",
        "secao": "NA PRÁTICA",
        "codigo": "const relatorio = (nome, ok) => new Promise((res, rej) =>\n  setTimeout(() => (ok ? res(nome) : rej(new Error('sem acesso a ' + nome))), 15));\n\nPromise.allSettled([relatorio('vendas', true), relatorio('folha', false)])\n  .then((r) => console.log('5)', r.map((x) => `${x.status}: ${x.value ?? x.reason.message}`)));\n// Use quando uma falha não pode derrubar o resto do painel."
       },
       {
        "n": 6,
        "titulo": "Promise.race: timeout",
        "secao": "NA PRÁTICA",
        "codigo": "const requisicao = new Promise((r) => setTimeout(() => r('resposta da API'), 200));\nconst limite = new Promise((_, rej) => setTimeout(() => rej(new Error('demorou demais')), 60));\n\nPromise.race([requisicao, limite])\n  .then((v) => console.log('6)', v))\n  .catch((e) => console.log('6) Timeout:', e.message));    // quem terminar primeiro decide"
       },
       {
        "n": 7,
        "titulo": "Esquecer o return dentro do .then",
        "secao": "PEGADINHAS",
        "codigo": "const dobrar = (n) => new Promise((r) => setTimeout(() => r(n * 2), 10));\n\nPromise.resolve(5)\n  .then((n) => { dobrar(n); })              // sem return: a corrente não espera\n  .then((v) => console.log('7) Sem return:', v));            // undefined\n\nPromise.resolve(5)\n  .then((n) => dobrar(n))                   // com return, o próximo recebe o valor\n  .then((v) => console.log('7) Com return:', v));"
       },
       {
        "n": 8,
        "titulo": "Erro sem .catch some",
        "secao": "PEGADINHAS",
        "codigo": "const arriscada = () => Promise.reject(new Error('falha no pagamento'));\n\narriscada().catch((e) => console.log('8) Tratado:', e.message));\n// Sem esse .catch, o Node derruba o processo com UnhandledPromiseRejection."
       }
      ],
      "resumo": [
       "Promise é resultado futuro: resolve (deu certo) ou reject (deu erro), uma vez só.",
       "`.then` para o sucesso, `.catch` para o erro, `.finally` para o que roda sempre.",
       "Todo `.then` devolve outra Promise — encadeie em vez de aninhar callback.",
       "`all` = tudo ou nada em paralelo; `allSettled` = quero todos os resultados; `race` = timeout.",
       "Sempre devolva (`return`) a Promise dentro do `.then`, e sempre termine com `.catch`.",
       "`.then` para um passo; corrente longa, `if`/`for` ou erro para tratar → `async/await`,",
       "onde o `try/catch` faz o papel do `.catch`."
      ]
     },
     {
      "slug": "03-async-await",
      "arquivo": "JS/src/06-assincrono/03-async-await.js",
      "comando": "node src/06-assincrono/03-async-await.js",
      "titulo": "async e await — Promise escrita de cima para baixo",
      "sessao": 7,
      "oQueE": "`await` pausa a função até a Promise responder; `async` marca a função que pode pausar.",
      "quandoUsar": "como padrão para consumir Promise, principalmente quando um passo depende do anterior, quando há erro para tratar com `try/catch`, ou quando o código tem `if`/`for` no meio da espera.",
      "quandoNaoUsar": "quando é um passo só e o retorno já vai direto para outro lugar — `.then` cabe numa linha. E nunca `await` em fila para tarefas independentes: isso soma as esperas em vez de somar as forças. Use `Promise.all`.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O mesmo .then, sem encadear",
        "secao": "ESSENCIAL",
        "codigo": "const buscarUsuario = (id) => new Promise((r) => setTimeout(() => r({ id, nome: 'Ana' }), 20));\n\n(async () => {\n  const usuario = await buscarUsuario(7);       // a função pausa aqui, o resto do programa não\n  console.log('1) Usuário:', usuario.nome);\n})();"
       },
       {
        "n": 2,
        "titulo": "try/catch no lugar do .catch",
        "secao": "ESSENCIAL",
        "codigo": "const cobrar = (valor) => new Promise((res, rej) =>\n  setTimeout(() => (valor <= 500 ? res('aprovado') : rej(new Error('limite excedido'))), 20));\n\n(async () => {\n  try {\n    console.log('2) Compra de 300:', await cobrar(300));\n    console.log('2) Compra de 900:', await cobrar(900));   // lança aqui\n  } catch (erro) {\n    console.log('2) Recusado:', erro.message);\n  } finally {\n    console.log('2) Fecha a tela de pagamento');\n  }\n})();"
       },
       {
        "n": 3,
        "titulo": "Toda função async devolve uma Promise",
        "secao": "ESSENCIAL",
        "codigo": "async function total() {\n  return 249.9;                                  // valor comum, sem Promise\n}\n\nconsole.log('3) O retorno é:', total());         // Promise { 249.9 }\ntotal().then((v) => console.log('3) Com then:', v));\n(async () => console.log('3) Com await:', await total()))();"
       },
       {
        "n": 4,
        "titulo": "Em fila x em paralelo",
        "secao": "NA PRÁTICA",
        "codigo": "const carregar = (nome) => new Promise((r) => setTimeout(() => r(nome), 60));\n\n(async () => {\n  const inicio = Date.now();\n  await carregar('perfil');\n  await carregar('pedidos');                     // só começa quando o de cima termina\n  console.log('4) Em fila:', Date.now() - inicio, 'ms');\n\n  const inicio2 = Date.now();\n  const [a, b] = await Promise.all([carregar('perfil'), carregar('pedidos')]);\n  console.log('4) Em paralelo:', a, b, Date.now() - inicio2, 'ms');\n})();\n// Só use await em fila quando o segundo pedido depende da resposta do primeiro."
       },
       {
        "n": 5,
        "titulo": "Repetir até dar certo (retry com espera)",
        "secao": "NA PRÁTICA",
        "codigo": "const esperar = (ms) => new Promise((r) => setTimeout(r, ms));\nlet tentativa = 0;\n\nconst instavel = () => new Promise((res, rej) =>\n  (++tentativa < 3 ? rej(new Error('rede caiu')) : res('dados do relatório')));\n\n(async () => {\n  for (let i = 1; i <= 4; i++) {\n    try {\n      console.log('5) OK na tentativa', i, '→', await instavel());\n      break;\n    } catch (erro) {\n      console.log('5) Tentativa', i, 'falhou:', erro.message);\n      await esperar(20 * i);                     // espera mais a cada falha\n    }\n  }\n})();"
       },
       {
        "n": 6,
        "titulo": "Percorrer lista esperando cada item",
        "secao": "NA PRÁTICA",
        "codigo": "const salvar = (id) => new Promise((r) => setTimeout(() => r('pedido ' + id), 15));\n\n(async () => {\n  for (const id of [1, 2, 3]) console.log('6) Em fila:', await salvar(id));  // for...of espera\n  console.log('6) De uma vez:', await Promise.all([1, 2, 3].map(salvar)));\n})();\n// `forEach` NÃO espera await — ou for...of, ou Promise.all(map)."
       },
       {
        "n": 7,
        "titulo": "O mesmo trecho nas duas formas",
        "secao": "NA PRÁTICA",
        "codigo": "const buscarPedido = (id) => new Promise((r) => setTimeout(() => r({ id, valor: 250 }), 20));\nconst buscarCliente = (id) => new Promise((r) => setTimeout(() => r({ id, nome: 'Ana' }), 20));\n\nbuscarPedido(7)                                          // .then: uma linha por etapa\n  .then((pedido) => buscarCliente(pedido.id))\n  .then((cliente) => console.log('7) then: ', cliente.nome))\n  .catch((erro) => console.log('7) erro:', erro.message));\n\n(async () => {                                           // await: leitura de cima para baixo\n  try {\n    const pedido = await buscarPedido(7);\n    const cliente = await buscarCliente(pedido.id);      // depende do passo anterior\n    console.log('7) await:', cliente.nome);\n  } catch (erro) {\n    console.log('7) erro:', erro.message);               // o try/catch faz o papel do .catch\n  }\n})();\n// Regra prática: um passo só e sem tratamento de erro → `.then` resolve. Dois ou mais passos,\n// `if`/`for` no meio, ou erro para tratar → `async/await`. Tarefas independentes → `Promise.all`\n// (que também é chamado com `await`, e continua sendo paralelo)."
       },
       {
        "n": 8,
        "titulo": "Esquecer o await",
        "secao": "PEGADINHAS",
        "codigo": "const precoFinal = async () => 99.9;\n\n(async () => {\n  console.log('8) Sem await:', precoFinal());                 // Promise, não número\n  console.log('8) Sem await + 10:', precoFinal() + 10);       // vira texto grudado\n  console.log('8) Com await + 10:', (await precoFinal()) + 10);\n})();"
       }
      ],
      "resumo": [
       "`await` só existe dentro de `async` (ou no topo de um módulo ESM).",
       "Função `async` sempre devolve Promise, mesmo retornando número.",
       "`try/catch` em volta do `await` é o `.catch` da corrente de Promise.",
       "`await` em sequência é lento: se os pedidos não dependem um do outro, use `Promise.all`.",
       "Esqueceu o `await`? Você está manipulando a Promise, não o valor dela.",
       "Escolha rápida: 1 passo → `.then`; passos encadeados, `if`/`for` ou `try/catch` → `await`;",
       "tarefas independentes → `await Promise.all([...])`."
      ]
     },
     {
      "slug": "04-promise-combinadores",
      "arquivo": "JS/src/06-assincrono/04-promise-combinadores.js",
      "comando": "node src/06-assincrono/04-promise-combinadores.js",
      "titulo": "Promise.all, allSettled, race e any",
      "sessao": 9,
      "oQueE": "os quatro jeitos de esperar VÁRIAS promises ao mesmo tempo, cada um com uma regra diferente para decidir quando terminou e o que fazer se alguma falhar.",
      "quandoUsar": "sempre que os pedidos não dependem um do outro — esperar um por vez é desperdício.",
      "quandoNaoUsar": "quando o segundo pedido precisa da resposta do primeiro. Aí é `await` em fila.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "all: tudo ou nada",
        "secao": "ESSENCIAL",
        "codigo": "const carregar = (nome, ms) => new Promise((r) => setTimeout(() => r(nome), ms));\n\n(async () => {\n  const inicio = Date.now();\n  const [perfil, pedidos, cupons] = await Promise.all([\n    carregar('perfil', 60), carregar('pedidos', 30), carregar('cupons', 45),\n  ]);\n  console.log('1)', perfil, pedidos, cupons, '|', Date.now() - inicio, 'ms');\n  // Resultado na ordem do ARRAY, não na ordem de chegada. Tempo = o do mais lento (60), não 135.\n\n  try {\n    await Promise.all([carregar('ok', 20), Promise.reject(new Error('token expirado'))]);\n  } catch (erro) {\n    console.log('1) Uma falhou, o all inteiro falhou:', erro.message);\n  }\n})();"
       },
       {
        "n": 2,
        "titulo": "allSettled: nunca rejeita",
        "secao": "ESSENCIAL",
        "codigo": "const relatorio = (nome, ok) => new Promise((res, rej) =>\n  setTimeout(() => (ok ? res(nome) : rej(new Error('sem acesso a ' + nome))), 20));\n\n(async () => {\n  const resultados = await Promise.allSettled([\n    relatorio('vendas', true), relatorio('folha', false), relatorio('estoque', true),\n  ]);\n\n  console.log('2)', resultados.map((r) => r.status));\n  console.log('2) Deu certo:', resultados.filter((r) => r.status === 'fulfilled').map((r) => r.value));\n  console.log('2) Falhou:  ', resultados.filter((r) => r.status === 'rejected').map((r) => r.reason.message));\n})();"
       },
       {
        "n": 3,
        "titulo": "race x any: o primeiro a terminar x o primeiro que dá certo",
        "secao": "ESSENCIAL",
        "codigo": "const rapidaComErro = () => new Promise((_, rej) => setTimeout(() => rej(new Error('falhou logo')), 20));\nconst lentaComSucesso = () => new Promise((r) => setTimeout(() => r('cheguei depois'), 60));\n\n(async () => {\n  try {\n    await Promise.race([rapidaComErro(), lentaComSucesso()]);\n  } catch (erro) {\n    console.log('3) race:', erro.message, '← quem terminar primeiro decide, mesmo dando erro');\n  }\n\n  console.log('3) any: ', await Promise.any([rapidaComErro(), lentaComSucesso()]));\n  // any ignora as falhas e espera o primeiro SUCESSO.\n})();"
       },
       {
        "n": 4,
        "titulo": "Montar a tela: paralelo x fila",
        "secao": "NA PRÁTICA",
        "codigo": "const buscar = (nome) => new Promise((r) => setTimeout(() => r(nome), 50));\n\n(async () => {\n  const t1 = Date.now();\n  await buscar('usuario'); await buscar('extrato'); await buscar('avisos');\n  console.log('4) Em fila:    ', Date.now() - t1, 'ms');\n\n  const t2 = Date.now();\n  await Promise.all([buscar('usuario'), buscar('extrato'), buscar('avisos')]);\n  console.log('4) Com all:    ', Date.now() - t2, 'ms');\n})();"
       },
       {
        "n": 5,
        "titulo": "Importar um lote sem perder o que deu certo",
        "secao": "NA PRÁTICA",
        "codigo": "const salvarLinha = (linha) => new Promise((res, rej) =>\n  setTimeout(() => (linha.cpf ? res(linha.nome) : rej(new Error(`linha ${linha.id} sem CPF`))), 15));\n\n(async () => {\n  const planilha = [\n    { id: 1, nome: 'Ana', cpf: '111' }, { id: 2, nome: 'Bruno' }, { id: 3, nome: 'Carla', cpf: '333' },\n  ];\n\n  const r = await Promise.allSettled(planilha.map(salvarLinha));\n  const ok = r.filter((x) => x.status === 'fulfilled');\n\n  console.log(`5) ${ok.length}/${planilha.length} importadas |`,\n    r.filter((x) => x.status === 'rejected').map((x) => x.reason.message));\n  // Com `all`, a linha 2 derrubaria a importação inteira e as boas seriam perdidas.\n})();"
       },
       {
        "n": 6,
        "titulo": "race para timeout, any para redundância",
        "secao": "NA PRÁTICA",
        "codigo": "const comTimeout = (promessa, ms) => Promise.race([\n  promessa,\n  new Promise((_, rej) => setTimeout(() => rej(new Error(`passou de ${ms}ms`)), ms)),\n]);\n\nconst servidor = (nome, ms, ok = true) => new Promise((res, rej) =>\n  setTimeout(() => (ok ? res(`resposta de ${nome}`) : rej(new Error(nome + ' fora do ar'))), ms));\n\n(async () => {\n  try { await comTimeout(servidor('api lenta', 200), 50); }\n  catch (erro) { console.log('6) Timeout:', erro.message); }\n\n  console.log('6) Espelhos:', await Promise.any([\n    servidor('espelho-1', 30, false), servidor('espelho-2', 60), servidor('espelho-3', 90),\n  ]));\n  // O primeiro caiu; `any` esperou o próximo que respondesse, sem derrubar nada.\n})();"
       },
       {
        "n": 7,
        "titulo": "Falhar rápido não cancela as outras",
        "secao": "PEGADINHAS",
        "codigo": "const demorada = (nome) => new Promise((r) => setTimeout(() => {\n  console.log('7) [' + nome + '] terminou mesmo assim');\n  r(nome);\n}, 80));\n\n(async () => {\n  try {\n    await Promise.all([demorada('upload'), Promise.reject(new Error('validação'))]);\n  } catch (erro) {\n    console.log('7) all rejeitou na hora:', erro.message);\n  }\n  // O upload continua rodando: `all` só para de ESPERAR, não cancela nada. Para cancelar\n  // de verdade é preciso AbortController.\n})();"
       },
       {
        "n": 8,
        "titulo": "A promise começa ao ser criada, não no await",
        "secao": "PEGADINHAS",
        "codigo": "const tarefa = (nome) => new Promise((r) => setTimeout(() => r(nome), 40));\n\n(async () => {\n  const jaComecaram = [tarefa('a'), tarefa('b')];        // as duas dispararam AGORA\n  const t1 = Date.now();\n  await jaComecaram[0]; await jaComecaram[1];\n  console.log('8) Await em fila, mas paralelo:', Date.now() - t1, 'ms');\n\n  const t2 = Date.now();\n  await tarefa('c'); await tarefa('d');                  // criadas uma depois da outra\n  console.log('8) Criadas em fila:            ', Date.now() - t2, 'ms');\n\n  console.log('8) all de array vazio:', await Promise.all([]));\n  try { await Promise.any([]); } catch (e) { console.log('8) any de array vazio:', e.constructor.name); }\n})();"
       }
      ],
      "resumo": [
       "`all`: tudo ou nada. Devolve na ordem do array e falha inteiro se uma falhar.",
       "`allSettled`: nunca rejeita — devolve `status`, `value` ou `reason` de cada uma.",
       "`race`: o primeiro a terminar decide, dando certo ou errado — é o timeout.",
       "`any`: ignora as falhas e devolve o primeiro sucesso; sem nenhum, dá `AggregateError`.",
       "Falhar não cancela as outras, e a promise começa a rodar quando é criada, não no `await`."
      ]
     }
    ]
   },
   {
    "slug": "07-extras",
    "titulo": "Extras e Legado",
    "icone": "◇",
    "cor": "#8b95a8",
    "resumo": "Bom conhecer, raro escrever hoje.",
    "topicos": [
     {
      "slug": "01-iife",
      "arquivo": "JS/src/07-extras/01-iife.js",
      "comando": "node src/07-extras/01-iife.js",
      "titulo": "IIFE — função que se executa sozinha",
      "sessao": 4,
      "oQueE": "função que se define e se executa na mesma hora: `(function(){ ... })()`.",
      "quandoUsar": "hoje, quase só para rodar um `await` no topo de um script solto.",
      "quandoNaoUsar": "em projeto com módulos (`import/export`), cada arquivo JÁ é um escopo isolado. Está aqui para você reconhecer quando encontrar em código antigo.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "A forma básica",
        "secao": "ESSENCIAL",
        "codigo": "(function () {\n  const senhaTemporaria = 'abc123';    // não existe fora daqui\n  console.log('Rodou na hora, e a senha morreu junto:', senhaTemporaria.length, 'chars');\n})();\n\n(() => {\n  console.log('Mesma coisa, com arrow');\n})();"
       },
       {
        "n": 2,
        "titulo": "Por que os parênteses de fora existem",
        "secao": "ESSENCIAL",
        "codigo": "// function () {}();     ← SyntaxError: o JS lê como DECLARAÇÃO de função\n// (function () {})();   ← certo: os parênteses transformam em EXPRESSÃO\nconsole.log('Os parênteses de fora fazem o JS ler \"expressão\" em vez de \"declaração\".');"
       },
       {
        "n": 3,
        "titulo": "O uso que ainda vale hoje: await em script solto",
        "secao": "ESSENCIAL",
        "codigo": "(async () => {\n  const dados = await new Promise((r) => setTimeout(() => r('dados carregados'), 20));\n  console.log('IIFE async:', dados);\n})();"
       },
       {
        "n": 4,
        "titulo": "O padrão módulo, de antes do import/export",
        "secao": "NA PRÁTICA",
        "codigo": "const Logger = (() => {\n  const historico = [];                // privado\n\n  return {\n    registrar: (msg) => { historico.push(msg); },\n    ultimos: () => [...historico],     // devolve CÓPIA, para ninguém alterar o original\n  };\n})();\n\nLogger.registrar('app iniciou');\nLogger.registrar('falha no pagamento');\n\nconsole.log(Logger.ultimos());\nconsole.log('Alcança o histórico direto?', Logger.historico);\n// Hoje isto seria um arquivo com `export`, ou uma factory function — mais legível."
       },
       {
        "n": 5,
        "titulo": "Calcular um valor que precisa de várias linhas",
        "secao": "NA PRÁTICA",
        "codigo": "const configuracao = (() => {\n  const ambiente = 'producao';\n  const base = { retries: 3 };\n\n  return ambiente === 'producao'\n    ? { ...base, url: 'https://api.loja.com', debug: false }\n    : { ...base, url: 'http://localhost:3000', debug: true };\n})();\n\nconsole.log(configuracao);"
       }
      ],
      "resumo": [
       "`(() => { ... })()` define e roda na hora, sem deixar nome no escopo de fora.",
       "Os parênteses externos são obrigatórios: sem eles é erro de sintaxe.",
       "O uso que sobrevive é `(async () => { await ... })()` em script sem módulo.",
       "Você vai encontrar o \"padrão módulo\" com IIFE em código legado — agora reconhece.",
       "Em código novo, use `import/export` ou uma factory function."
      ]
     },
     {
      "slug": "02-constructor-functions",
      "arquivo": "JS/src/07-extras/02-constructor-functions.js",
      "comando": "node src/07-extras/02-constructor-functions.js",
      "titulo": "Constructor functions e o caminho até class",
      "sessao": 4,
      "oQueE": "função chamada com `new`, que preenche um objeto vazio através do `this`.",
      "quandoUsar": "quando o projeto já segue esse padrão, e para entender código legado e como o prototype funciona por baixo — `class` é a mesma máquina com outra sintaxe.",
      "quandoNaoUsar": "junto com os outros padrões no mesmo código. E lembre: aqui, esquecer o `new` falha em silêncio; com `class`, dá erro na hora.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "new cria o objeto, this preenche",
        "secao": "ESSENCIAL",
        "codigo": "function Produto(nome, preco) {\n  this.nome = nome;      // `new` criou um objeto vazio e apontou o this para ele\n  this.preco = preco;\n}\n\nconst teclado = new Produto('Teclado', 249.9);\n\nconsole.log(teclado);\nconsole.log('É instância de Produto?', teclado instanceof Produto);"
       },
       {
        "n": 2,
        "titulo": "Por que o método vai no prototype",
        "secao": "ESSENCIAL",
        "codigo": "function Item(nome) { this.nome = nome; }\nItem.prototype.etiqueta = function () { return `Item: ${this.nome}`; };   // compartilhado\n\nconst a = new Item('Mouse');\nconst b = new Item('Monitor');\n\nconsole.log(a.etiqueta());\nconsole.log('Compartilham o mesmo método?', a.etiqueta === b.etiqueta);\n// Se cada objeto tivesse a própria cópia, mil itens = mil funções iguais na memória."
       },
       {
        "n": 3,
        "titulo": "A mesma coisa com class: a forma moderna",
        "secao": "ESSENCIAL",
        "codigo": "class ProdutoModerno {\n  constructor(nome, preco) {\n    this.nome = nome;\n    this.preco = preco;\n  }\n  etiqueta() { return `${this.nome} — R$ ${this.preco.toFixed(2)}`; }   // vai no prototype igual\n}\n\nconsole.log(new ProdutoModerno('Monitor', 1199).etiqueta());\nconsole.log('class é açúcar sintático: por baixo é o mesmo prototype.');"
       },
       {
        "n": 4,
        "titulo": "Herança: antes e depois",
        "secao": "NA PRÁTICA",
        "codigo": "function Base(nome) { this.nome = nome; }\nBase.prototype.descrever = function () { return `sou ${this.nome}`; };\n\nfunction Digital(nome, mb) {\n  Base.call(this, nome);                            // chama o \"pai\" com o this daqui\n  this.mb = mb;\n}\nDigital.prototype = Object.create(Base.prototype);  // liga a cadeia\nDigital.prototype.constructor = Digital;            // conserta o construtor\nDigital.prototype.baixar = function () { return `baixando ${this.mb}MB`; };\n\nconst ebook = new Digital('Ebook', 12);\nconsole.log(ebook.descrever(), '|', ebook.baixar());\n\nclass BaseModerna {\n  constructor(nome) { this.nome = nome; }\n  descrever() { return `sou ${this.nome}`; }\n}\nclass DigitalModerno extends BaseModerna {          // 4 linhas viraram 1\n  constructor(nome, mb) { super(nome); this.mb = mb; }\n  baixar() { return `baixando ${this.mb}MB`; }\n}\n\nconst curso = new DigitalModerno('Curso JS', 500);\nconsole.log(curso.descrever(), '|', curso.baixar());"
       },
       {
        "n": 5,
        "titulo": "Esquecer o `new` quebra em silêncio",
        "secao": "PEGADINHAS",
        "codigo": "function Antiga(nome) { this.nome = nome; }\n\nconst semNew = Antiga('Erro');     // sem `new`, não devolve nada\nconsole.log('Retorno sem new:', semNew);\n\nclass Moderna {\n  constructor() { this.ok = true; }\n}\n\ntry { Moderna(); }\ncatch (erro) { console.log('Com class:', erro.message); }   // avisa na hora — por isso é melhor"
       }
      ],
      "resumo": [
       "`new` cria um objeto vazio, aponta o `this` para ele e devolve no fim.",
       "Métodos vão no `prototype` para serem compartilhados, não copiados por objeto.",
       "`class` é a mesma máquina com sintaxe melhor — e `extends`/`super` substituem 4 linhas.",
       "Esquecer o `new` numa constructor function falha calado; com `class` dá erro na hora.",
       "Factory, constructor function e class são padrões diferentes, não níveis de qualidade:",
       "escolha um e mantenha. Veja o comparativo em 11-tres-formas-de-criar-objetos."
      ]
     },
     {
      "slug": "03-geradoras",
      "arquivo": "JS/src/07-extras/03-geradoras.js",
      "comando": "node src/07-extras/03-geradoras.js",
      "titulo": "Funções geradoras (function*)",
      "sessao": 4,
      "oQueE": "função que PAUSA no `yield`, devolve um valor e continua de onde parou.",
      "quandoUsar": "gerar valores sob demanda (id sequencial, sequência infinita), percorrer estrutura grande sem carregar tudo na memória, paginação preguiçosa.",
      "quandoNaoUsar": "coleção pequena que já está na memória — array com `map`/`filter` é mais claro e todo mundo entende de primeira.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "next() e o objeto { value, done }",
        "secao": "ESSENCIAL",
        "codigo": "function* etapas() {\n  yield 'separar';\n  yield 'embalar';\n  yield 'enviar';\n}\n\nconst g = etapas();\n\nconsole.log(g.next());   // { value: 'separar', done: false }\nconsole.log(g.next());\nconsole.log(g.next());\nconsole.log(g.next());   // { value: undefined, done: true }"
       },
       {
        "n": 2,
        "titulo": "for...of consome tudo, sem next() manual",
        "secao": "ESSENCIAL",
        "codigo": "function* passos() {\n  yield 'a';\n  yield 'b';\n}\n\nfor (const passo of passos()) console.log('→', passo);\n\nconsole.log('Vira array com spread:', [...passos()]);"
       },
       {
        "n": 3,
        "titulo": "Gerador de id sequencial",
        "secao": "ESSENCIAL",
        "codigo": "function* gerarId(prefixo) {\n  let n = 1;\n  while (true) yield `${prefixo}-${String(n++).padStart(4, '0')}`;\n}\n\nconst proximo = gerarId('PED');\n\nconsole.log(proximo.next().value, proximo.next().value, proximo.next().value);\n// `while (true)` só não trava porque cada volta espera alguém pedir o próximo."
       },
       {
        "n": 4,
        "titulo": "Processar em lotes",
        "secao": "NA PRÁTICA",
        "codigo": "function* emLotes(itens, tamanho) {\n  for (let i = 0; i < itens.length; i += tamanho) yield itens.slice(i, i + tamanho);\n}\n\nfor (const lote of emLotes(['a', 'b', 'c', 'd', 'e'], 2)) console.log('Enviando:', lote);"
       },
       {
        "n": 5,
        "titulo": "Paginação preguiçosa: só busca quando pedem",
        "secao": "NA PRÁTICA",
        "codigo": "function* paginas() {\n  let n = 1;\n  while (n <= 2) {\n    console.log(`  (buscou a página ${n})`);\n    yield [`item${n}a`, `item${n}b`];\n    n++;\n  }\n}\n\nfor (const pagina of paginas()) console.log('Recebi:', pagina);"
       },
       {
        "n": 6,
        "titulo": "Sequência infinita, parando quando quiser",
        "secao": "NA PRÁTICA",
        "codigo": "function* naturais() {\n  let n = 1;\n  while (true) yield n++;\n}\n\nconst pares = [];\n\nfor (const n of naturais()) {\n  if (n % 2 === 0) pares.push(n);\n  if (pares.length === 5) break;    // o break encerra o gerador\n}\n\nconsole.log('5 primeiros pares:', pares);"
       },
       {
        "n": 7,
        "titulo": "yield*: delegar para outro gerador (percorrer árvore)",
        "secao": "NA PRÁTICA",
        "codigo": "const pastas = { nome: 'raiz', filhos: [{ nome: 'src', filhos: [{ nome: 'app.js' }] }] };\n\nfunction* percorrer(no) {\n  yield no.nome;\n  for (const filho of no.filhos ?? []) yield* percorrer(filho);   // yield* repassa tudo\n}\n\nconsole.log([...percorrer(pastas)]);"
       },
       {
        "n": 8,
        "titulo": "O gerador só serve uma vez",
        "secao": "PEGADINHAS",
        "codigo": "function* tres() { yield 1; yield 2; yield 3; }\n\nconst usado = tres();\n\nconsole.log('1ª volta:', [...usado]);\nconsole.log('2ª volta:', [...usado], '← esgotado; chame a função de novo para recomeçar');"
       }
      ],
      "resumo": [
       "`function*` + `yield` = função que pausa e continua de onde parou.",
       "`next()` devolve `{ value, done }`; `for...of` e `[...gen]` consomem tudo sozinhos.",
       "`while (true)` dentro de gerador é seguro: só avança quando alguém pede.",
       "Serve para id sequencial, lotes, paginação preguiçosa e percorrer árvore com `yield*`.",
       "Cada gerador é de uso único: depois de esgotado, chame a função de novo."
      ]
     },
     {
      "slug": "04-geradoras-quando-usar",
      "arquivo": "JS/src/07-extras/04-geradoras-quando-usar.js",
      "comando": "node src/07-extras/04-geradoras-quando-usar.js",
      "titulo": "Geradoras: quando usar (e quando não)",
      "sessao": 6,
      "oQueE": "o critério para escolher entre gerador, array pronto e callback. A pergunta que decide é uma só — quem dita o ritmo, quem produz ou quem consome? Se a resposta certa é quem consome, é gerador.",
      "quandoUsar": "\"isso chega aos poucos\" (página de API, linha de arquivo, lote). \"isso não tem fim\" (id sequencial, numeração de NF, retry). \"talvez eu pare no meio\" (achei o que procurava, deu erro, o usuário cancelou). \"cada item é caro\" (custa requisição, disco, dinheiro de API). \"quem usa não precisa saber de onde vem\" (esconder paginação, cache ou duas fontes atrás de um for..of comum).",
      "quandoNaoUsar": "\"já tenho o array inteiro na mão\" — use map/filter. \"é um item só, não uma sequência\" — buscar usuário por id não é gerador. \"preciso passar duas vezes\" — gerador é de uso único. \"preciso de length, sort ou o último\" — isso exige ter tudo junto, então é array.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Gerador é torneira: só sai o que você pede",
        "secao": "ESSENCIAL",
        "codigo": "function apiPedidos(pagina) {\n  const paginas = {\n    1: [{ id: 101, status: 'pago' }, { id: 102, status: 'pago' }],\n    2: [{ id: 103, status: 'cancelado' }, { id: 104, status: 'pago' }],\n    3: [{ id: 105, status: 'pago' }, { id: 106, status: 'pago' }],\n  };\n  console.log(`  (a API cobrou uma requisição: página ${pagina})`);\n  return { itens: paginas[pagina] ?? [], temMais: pagina < 3 };\n}\n\nfunction* todosOsPedidos() {\n  let pagina = 1;\n  while (true) {\n    const { itens, temMais } = apiPedidos(pagina);\n    for (const pedido of itens) yield pedido;   // pausa aqui, entrega um pedido\n    if (!temMais) return;\n    pagina++;\n  }\n}\n\nfor (const pedido of todosOsPedidos()) {\n  console.log('processando', pedido.id, pedido.status);\n  if (pedido.status === 'cancelado') break;     // a página 3 nunca é buscada\n}"
       },
       {
        "n": 2,
        "titulo": "Array pronto é balde: enche tudo antes de você olhar o primeiro",
        "secao": "ESSENCIAL",
        "codigo": "function buscarPagina(pagina) {\n  const paginas = {\n    1: [{ id: 101, status: 'pago' }, { id: 102, status: 'pago' }],\n    2: [{ id: 103, status: 'cancelado' }, { id: 104, status: 'pago' }],\n    3: [{ id: 105, status: 'pago' }, { id: 106, status: 'pago' }],\n  };\n  console.log(`  (a API cobrou uma requisição: página ${pagina})`);\n  return { itens: paginas[pagina] ?? [], temMais: pagina < 3 };\n}\n\nconst todos = [];\nlet pag = 1;\nlet temMais = true;\n\nwhile (temMais) {\n  const resp = buscarPagina(pag++);\n  todos.push(...resp.itens);\n  temMais = resp.temMais;\n}\n\nconsole.log('cancelado:', todos.find((p) => p.status === 'cancelado').id);\nconsole.log('mas paguei 3 requisições para achar algo que estava na 2ª.');\n// Com 500 páginas isso vira espera longa + memória cheia, mesmo achando no começo."
       },
       {
        "n": 3,
        "titulo": "Callback: quem manda é a função, não você",
        "secao": "ESSENCIAL",
        "codigo": "function cadaPedido(callback) {\n  const paginas = [\n    [{ id: 201, status: 'pago' }, { id: 202, status: 'pago' }],\n    [{ id: 203, status: 'cancelado' }, { id: 204, status: 'pago' }],\n  ];\n  for (const pagina of paginas) for (const pedido of pagina) callback(pedido);\n}\n\nlet cancelado = null;\n\ncadaPedido((pedido) => {\n  if (cancelado) return;              // gambiarra: `break` não existe aqui dentro\n  console.log('processando', pedido.id);\n  if (pedido.status === 'cancelado') cancelado = pedido;\n});\n\nconsole.log('achei', cancelado.id, '— mas o laço rodou até o fim do mesmo jeito.');\n// Isso é inversão de controle: sem `break`, sem `return` que interrompa, sem pausar."
       },
       {
        "n": 4,
        "titulo": "API de verdade: async function* e for await",
        "secao": "NA PRÁTICA",
        "codigo": "async function buscarClientes(pagina) {\n  const paginas = { 1: ['Ana', 'Bruno'], 2: ['Carla', 'Diego'] };\n  await new Promise((r) => setTimeout(r, 50));       // a rede demora\n  return { itens: paginas[pagina] ?? [], temMais: pagina < 2 };\n}\n\nasync function* todosOsClientes() {\n  let pagina = 1;\n  while (true) {\n    const { itens, temMais } = await buscarClientes(pagina);   // await dentro do gerador\n    for (const nome of itens) yield nome;\n    if (!temMais) return;\n    pagina++;\n  }\n}\n\n(async () => {\n  for await (const nome of todosOsClientes()) console.log('cliente:', nome);\n})();\n// Quem consome escreve um `for await` comum e nem fica sabendo que existe paginação."
       },
       {
        "n": 5,
        "titulo": "Sem gerador, o estado fica por sua conta",
        "secao": "NA PRÁTICA",
        "codigo": "class PaginadorNotas {\n  constructor(paginas) { this.paginas = paginas; this.p = 0; this.i = 0; }\n  proximo() {\n    if (this.p >= this.paginas.length) return { done: true };\n    const nota = this.paginas[this.p][this.i++];\n    if (this.i >= this.paginas[this.p].length) { this.i = 0; this.p++; }\n    return { value: nota, done: false };\n  }\n}\n\nconst it = new PaginadorNotas([['NF-1', 'NF-2'], ['NF-3']]);\nlet r;\n\nwhile (!(r = it.proximo()).done) console.log('classe:', r.value);\n\nfunction* paginadorNotas(paginas) {\n  for (const pagina of paginas) for (const nota of pagina) yield nota;\n}\n\nfor (const nota of paginadorNotas([['NF-1', 'NF-2'], ['NF-3']])) console.log('gerador:', nota);\n// Mesmo resultado: a classe guarda `p` e `i` na mão, o gerador guarda sozinho —\n// ele fica literalmente parado na linha do `yield` e retoma dali."
       },
       {
        "n": 6,
        "titulo": "Esconder de onde vêm os dados",
        "secao": "NA PRÁTICA",
        "codigo": "function* estoqueTotal() {\n  const loja = [{ nome: 'camiseta', qtd: 3 }, { nome: 'boné', qtd: 0 }];\n  const deposito = [{ nome: 'tênis', qtd: 7 }];\n  for (const item of loja) yield { ...item, origem: 'loja' };\n  for (const item of deposito) yield { ...item, origem: 'depósito' };\n}\n\nfor (const item of estoqueTotal()) console.log(item.origem, '→', item.nome, item.qtd);\n// Duas fontes viram uma sequência só. Amanhã entra uma terceira e quem consome nem muda."
       },
       {
        "n": 7,
        "titulo": "Se você precisa de length, sort ou segunda volta, é array",
        "secao": "PEGADINHAS",
        "codigo": "function* vendasDoDia() {\n  yield { produto: 'camiseta', valor: 80 };\n  yield { produto: 'tênis', valor: 250 };\n  yield { produto: 'boné', valor: 40 };\n}\n\nconsole.log('length do gerador:', vendasDoDia().length);   // undefined: gerador não tem tamanho\n\nconst vendas = [...vendasDoDia()];                          // materializou: agora é array\n\nconsole.log('quantidade:', vendas.length);\nconsole.log('mais cara:', [...vendas].sort((a, b) => b.valor - a.valor)[0].produto);\n// Ordenar e contar exigem ter tudo junto. Aí o gerador não ajuda — atrapalha."
       },
       {
        "n": 8,
        "titulo": "Chamar a função geradora não executa nada",
        "secao": "PEGADINHAS",
        "codigo": "function* cobrancaMensal() {\n  console.log('  (só agora o corpo começou a rodar)');\n  let mes = 1;\n  while (true) yield `mensalidade ${mes++}/12`;\n}\n\nconst cobranca = cobrancaMensal();\n\nconsole.log('criei o gerador — repare que nada foi impresso acima');\nconsole.log(cobranca.next().value);\nconsole.log(cobranca.next().value);\n// O corpo só roda no primeiro `next()`. É isso que deixa `while (true)` seguro."
       }
      ],
      "resumo": [
       "Gerador é torneira, array é balde: o balde enche tudo antes, a torneira dá um copo por vez.",
       "A pergunta que decide: quem dita o ritmo, quem produz ou quem consome? Consumidor → gerador.",
       "Sinais de gerador: chega aos poucos, não tem fim, cada item é caro, talvez eu pare no meio.",
       "Vale só para esconder complexidade: paginação, cache, duas fontes — tudo vira um for..of.",
       "Sinais de array: já tenho tudo na mão, é um item só, preciso de length/sort/segunda volta.",
       "Callback percorre tudo e não deixa você parar; classe iteradora faz o mesmo com estado na mão."
      ]
     },
     {
      "slug": "05-define-property",
      "arquivo": "JS/src/07-extras/05-define-property.js",
      "comando": "node src/07-extras/05-define-property.js",
      "titulo": "Object.defineProperty e defineProperties",
      "sessao": 7,
      "oQueE": "criar propriedade escolhendo as regras dela — se pode ser alterada, se aparece nas listagens, se pode ser removida, ou se é calculada na hora (`get`/`set`).",
      "quandoUsar": "campo derivado, campo interno que não deve vazar em log/JSON, validação na escrita, e quando você precisa ler as regras de uma propriedade existente.",
      "quandoNaoUsar": "no dia a dia. Para objeto comum, `obj.campo = valor` é mais claro. Em classe, `get`/`set` na própria classe resolvem sem essa verbosidade.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "A diferença para o `obj.campo = valor`",
        "secao": "ESSENCIAL",
        "codigo": "const produto = { nome: 'Teclado' };            // atribuição normal: solta e livre\n\nObject.defineProperty(produto, 'codigo', { value: 'TEC-01' });   // sem dizer mais nada\n\nproduto.codigo = 'OUTRO';                       // não muda: writable é false por padrão\nconsole.log(produto.codigo, '| listado?', Object.keys(produto));\n// O que você não declara vem como FALSE: writable, enumerable e configurable."
       },
       {
        "n": 2,
        "titulo": "Ler as regras de uma propriedade",
        "secao": "ESSENCIAL",
        "codigo": "const pedido = { total: 250 };\n\nconsole.log(Object.getOwnPropertyDescriptor(pedido, 'total'));   // tudo true na atribuição normal\n\nObject.defineProperty(pedido, 'id', { value: 99, enumerable: true });\nconsole.log(Object.getOwnPropertyDescriptor(pedido, 'id'));"
       },
       {
        "n": 3,
        "titulo": "defineProperties: várias de uma vez",
        "secao": "ESSENCIAL",
        "codigo": "const cliente = {};\n\nObject.defineProperties(cliente, {\n  nome:  { value: 'Ana', writable: true, enumerable: true },\n  cpf:   { value: '12345678900', enumerable: true },           // só leitura\n  senha: { value: 'hash-abc', writable: true },                // não aparece nas listagens\n});\n\nconsole.log(cliente, '| chaves visíveis:', Object.keys(cliente));"
       },
       {
        "n": 4,
        "titulo": "Campo calculado na hora (get)",
        "secao": "NA PRÁTICA",
        "codigo": "const carrinho = { itens: [{ preco: 89.5 }, { preco: 249.9 }] };\n\nObject.defineProperty(carrinho, 'total', {\n  get() { return this.itens.reduce((s, i) => s + i.preco, 0); },   // roda a cada leitura\n  enumerable: true,\n});\n\nconsole.log('Total:', carrinho.total);\ncarrinho.itens.push({ preco: 10 });\nconsole.log('Depois de incluir:', carrinho.total);   // acompanha sozinho, sem recalcular na mão"
       },
       {
        "n": 5,
        "titulo": "Esconder campo interno do log e do JSON",
        "secao": "NA PRÁTICA",
        "codigo": "const usuario = { nome: 'Ana', email: 'ana@empresa.com' };\n\nObject.defineProperty(usuario, 'tokenSessao', { value: 'eyJhbGciOi', writable: true });\n\nconsole.log(JSON.stringify(usuario));           // o token não vai para a resposta da API\nconsole.log('Mas dá para ler:', usuario.tokenSessao);\n// enumerable: false esconde de Object.keys, do JSON e do for...in — não é segurança, é higiene."
       },
       {
        "n": 6,
        "titulo": "Validar na escrita (set)",
        "secao": "NA PRÁTICA",
        "codigo": "const item = { nome: 'Monitor' };\nlet precoInterno = 0;\n\nObject.defineProperty(item, 'preco', {\n  get() { return precoInterno; },\n  set(valor) {\n    if (typeof valor !== 'number' || valor < 0) return console.log('Preço recusado:', valor);\n    precoInterno = valor;\n  },\n  enumerable: true,\n});\n\nitem.preco = 1199;\nitem.preco = -50;                               // barrado antes de sujar o objeto\nconsole.log('Preço guardado:', item.preco);"
       },
       {
        "n": 7,
        "titulo": "Os padrões são o contrário do que você espera",
        "secao": "PEGADINHAS",
        "codigo": "const config = {};\n\nObject.defineProperty(config, 'moeda', { value: 'BRL' });   // esqueceu os três flags\n\nconfig.moeda = 'USD';                           // falha calada fora do modo estrito\nconsole.log(config.moeda, '| Object.keys:', Object.keys(config), '| JSON:', JSON.stringify(config));\nconsole.log('A propriedade existe, mas some de tudo. Declare os flags que você quer.');"
       },
       {
        "n": 8,
        "titulo": "É isso que o Object.freeze faz por baixo",
        "secao": "PEGADINHAS",
        "codigo": "const taxa = Object.freeze({ percentual: 5 });\n\nconsole.log(Object.getOwnPropertyDescriptor(taxa, 'percentual'));\n// freeze = writable: false + configurable: false em toda propriedade. E configurable: false\n// não tem volta: nem defineProperty consegue reabrir depois (lança TypeError)."
       }
      ],
      "resumo": [
       "`defineProperty(obj, nome, regras)` cria/ajusta uma propriedade com regras explícitas.",
       "Tudo que você não declarar vira `false` — o oposto da atribuição normal.",
       "`writable` (dá para alterar), `enumerable` (aparece em keys/JSON), `configurable` (dá para",
       "redefinir ou apagar).",
       "`get`/`set` fazem campo calculado e validação na escrita, com cara de campo normal.",
       "`getOwnPropertyDescriptor` mostra as regras — é como se enxerga o que o `freeze` fez."
      ]
     },
     {
      "slug": "06-getters-e-setters",
      "arquivo": "JS/src/07-extras/06-getters-e-setters.js",
      "comando": "node src/07-extras/06-getters-e-setters.js",
      "titulo": "get e set dentro de defineProperty",
      "sessao": 7,
      "oQueE": "em vez de guardar um valor, a propriedade guarda duas funções — uma que roda ao ler (`get`) e outra que roda ao escrever (`set`). Quem usa nem percebe: parece campo normal.",
      "quandoUsar": "campo derivado de outros, normalizar/validar o que entra, campo antigo que precisa continuar funcionando apontando para o novo.",
      "quandoNaoUsar": "em objeto literal e classe, escreva `get nome() {}` direto — é a mesma coisa, sem a verbosidade. `defineProperty` é para quando o campo é montado em tempo de execução, ou quando você precisa mexer nos outros flags junto.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Descritor de dado x descritor de acesso",
        "secao": "ESSENCIAL",
        "codigo": "const pedido = { itens: 3 };\n\nObject.defineProperty(pedido, 'resumo', {\n  get() { return `${this.itens} itens`; },      // roda a cada leitura, com `this` = pedido\n  enumerable: true,\n});\n\nconsole.log(pedido.resumo, '| sem parênteses: é lido como campo');\n\ntry {\n  Object.defineProperty(pedido, 'x', { value: 1, get() { return 2; } });\n} catch (erro) {\n  console.log('Não dá para misturar:', erro.message);   // ou value/writable, ou get/set\n}"
       },
       {
        "n": 2,
        "titulo": "set: interceptar a escrita",
        "secao": "ESSENCIAL",
        "codigo": "const pessoa = { nome: 'Ana', sobrenome: 'Silva' };\n\nObject.defineProperty(pessoa, 'nomeCompleto', {\n  get() { return `${this.nome} ${this.sobrenome}`; },\n  set(valor) { [this.nome, this.sobrenome] = valor.split(' '); },   // quebra e distribui\n  enumerable: true,\n});\n\nconsole.log(pessoa.nomeCompleto);\npessoa.nomeCompleto = 'Bruno Almeida';          // parece atribuição, mas roda o set\nconsole.log(pessoa.nome, '|', pessoa.sobrenome);"
       },
       {
        "n": 3,
        "titulo": "Só get = somente leitura",
        "secao": "ESSENCIAL",
        "codigo": "const conta = { saldo: 1000 };\n\nObject.defineProperty(conta, 'saldoFormatado', {\n  get() { return `R$ ${this.saldo.toFixed(2)}`; },\n  enumerable: true,\n});\n\nconta.saldoFormatado = 'R$ 999999,00';          // sem `set`, a escrita é ignorada em silêncio\nconsole.log(conta.saldoFormatado);              // (em módulo ESM isso lança TypeError)"
       },
       {
        "n": 4,
        "titulo": "Normalizar o que entra",
        "secao": "NA PRÁTICA",
        "codigo": "const cadastro = {};\n\nObject.defineProperties(cadastro, {\n  _email: { value: '', writable: true },        // campo interno, escondido das listagens\n  email: {\n    get() { return this._email; },\n    set(v) { this._email = String(v).trim().toLowerCase(); },\n    enumerable: true,\n  },\n});\n\ncadastro.email = '  ANA@Empresa.COM  ';\nconsole.log(cadastro.email, '| o que vai para o banco já está limpo');"
       },
       {
        "n": 5,
        "titulo": "Validar antes de deixar entrar",
        "secao": "NA PRÁTICA",
        "codigo": "const produto = { nome: 'Monitor', _preco: 0 };\n\nObject.defineProperty(produto, 'preco', {\n  get() { return this._preco; },\n  set(v) {\n    if (typeof v !== 'number' || Number.isNaN(v) || v < 0) {\n      return console.log('Recusado:', v);       // o objeto nunca chega a ficar inválido\n    }\n    this._preco = v;\n  },\n  enumerable: true,\n});\n\nproduto.preco = 1199;\nproduto.preco = -50;\nproduto.preco = 'caro';\nconsole.log('Preço guardado:', produto.preco);"
       },
       {
        "n": 6,
        "titulo": "Campo renomeado sem quebrar quem usa o nome antigo",
        "secao": "NA PRÁTICA",
        "codigo": "const config = { tempoLimiteMs: 3000 };\n\nObject.defineProperty(config, 'timeout', {      // nome antigo continua funcionando\n  get() { console.log('[aviso] \"timeout\" virou \"tempoLimiteMs\"'); return this.tempoLimiteMs; },\n  set(v) { console.log('[aviso] use \"tempoLimiteMs\"'); this.tempoLimiteMs = v; },\n});\n\nconsole.log('Código velho leu:', config.timeout);\nconfig.timeout = 5000;\nconsole.log('Campo novo:', config.tempoLimiteMs);"
       },
       {
        "n": 7,
        "titulo": "Setter que chama a si mesmo trava tudo",
        "secao": "PEGADINHAS",
        "codigo": "const item = { nome: 'Teclado' };\n\nObject.defineProperty(item, 'quantidade', {\n  set(v) { this.quantidade = v; },              // isto chama o próprio set, para sempre\n});\n\ntry {\n  item.quantidade = 2;\n} catch (erro) {\n  console.log('Loop infinito:', erro.constructor.name);\n}\nconsole.log('Guarde em OUTRO campo (_quantidade), nunca no mesmo nome.');"
       },
       {
        "n": 8,
        "titulo": "O get roda a CADA leitura",
        "secao": "PEGADINHAS",
        "codigo": "const relatorio = { linhas: [1, 2, 3] };\nlet vezes = 0;\n\nObject.defineProperty(relatorio, 'total', {\n  get() { vezes++; return this.linhas.reduce((s, n) => s + n, 0); },\n});\n\nconsole.log(relatorio.total, relatorio.total, relatorio.total);\nconsole.log('O get rodou', vezes, 'vezes — se o cálculo for caro, guarde o resultado antes.');"
       }
      ],
      "resumo": [
       "`get` roda ao ler, `set` roda ao escrever — para quem usa, parece campo comum.",
       "Ou o descritor tem `value`/`writable`, ou tem `get`/`set`. Misturar lança TypeError.",
       "Sem `set`, a propriedade vira somente leitura (silencioso fora do modo estrito).",
       "Guarde o valor real em outro campo (`_email`), senão o setter chama a si mesmo.",
       "Serve para normalizar, validar e manter nome antigo vivo — mas o get roda toda vez que lê."
      ]
     },
     {
      "slug": "07-descritores",
      "arquivo": "JS/src/07-extras/07-descritores.js",
      "comando": "node src/07-extras/07-descritores.js",
      "titulo": "getOwnPropertyDescriptor e getOwnPropertyDescriptors",
      "sessao": 7,
      "oQueE": "o raio-x de uma propriedade — mostra o valor e as quatro regras dela (`writable`, `enumerable`, `configurable`) ou o `get`/`set` que estão por trás.",
      "quandoUsar": "investigar por que um campo não muda ou some do JSON, e clonar objeto sem perder getter nem os flags.",
      "quandoNaoUsar": "para ler o valor. Isso é `obj.campo` — descritor é para entender a REGRA.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O raio-x de uma propriedade",
        "secao": "ESSENCIAL",
        "codigo": "const pedido = { total: 250 };\n\nconsole.log(Object.getOwnPropertyDescriptor(pedido, 'total'));\nconsole.log('Campo que não existe:', Object.getOwnPropertyDescriptor(pedido, 'desconto'));"
       },
       {
        "n": 2,
        "titulo": "Todas de uma vez",
        "secao": "ESSENCIAL",
        "codigo": "const usuario = { nome: 'Ana' };\nObject.defineProperty(usuario, 'token', { value: 'abc', enumerable: false });\n\nconsole.log(Object.getOwnPropertyDescriptors(usuario));   // inclui as que Object.keys esconde"
       },
       {
        "n": 3,
        "titulo": "O mesmo campo, três origens diferentes",
        "secao": "ESSENCIAL",
        "codigo": "const alvo = { normal: 1 };\nObject.defineProperty(alvo, 'definido', { value: 2 });    // flags não declarados = false\nconst congelado = Object.freeze({ travado: 3 });\n\nconsole.log('normal:  ', Object.getOwnPropertyDescriptor(alvo, 'normal'));\nconsole.log('definido:', Object.getOwnPropertyDescriptor(alvo, 'definido'));\nconsole.log('congelado:', Object.getOwnPropertyDescriptor(congelado, 'travado'));"
       },
       {
        "n": 4,
        "titulo": "Descobrir por que o campo não muda",
        "secao": "NA PRÁTICA",
        "codigo": "const config = Object.freeze({ moeda: 'BRL' });\n\nconfig.moeda = 'USD';                                     // falhou calado\nconst regras = Object.getOwnPropertyDescriptor(config, 'moeda');\n\nconsole.log('Continua', config.moeda, '— porque writable é', regras.writable);\nconsole.log('Dá para redefinir?', regras.configurable);"
       },
       {
        "n": 5,
        "titulo": "Clonar sem perder o getter",
        "secao": "NA PRÁTICA",
        "codigo": "const carrinho = { itens: [{ preco: 100 }, { preco: 50 }] };\nObject.defineProperty(carrinho, 'total', {\n  get() { return this.itens.reduce((s, i) => s + i.preco, 0); },\n  enumerable: true,\n});\n\nconst comAssign = Object.assign({}, carrinho);            // dispara o get e copia o NÚMERO\nconst comDescritores = Object.create(\n  Object.getPrototypeOf(carrinho),\n  Object.getOwnPropertyDescriptors(carrinho),             // copia o get em si\n);\n\ncomAssign.itens.push({ preco: 30 });\nconsole.log('assign:', comAssign.total, '| descritores:', comDescritores.total);\n// O do assign congelou em 150; o outro continua sendo um getter e acompanhou."
       },
       {
        "n": 6,
        "titulo": "Ver o que um objeto esconde",
        "secao": "NA PRÁTICA",
        "codigo": "const conta = { titular: 'Ana' };\nObject.defineProperties(conta, {\n  _saldo: { value: 1000, writable: true },                // escondido das listagens\n  saldo: { get() { return `R$ ${this._saldo}`; }, enumerable: true },\n});\n\nfor (const [nome, d] of Object.entries(Object.getOwnPropertyDescriptors(conta))) {\n  const tipo = d.get || d.set ? 'acessor (get/set)' : `dado = ${d.value}`;\n  console.log(`${nome.padEnd(9)} ${tipo} | visível: ${d.enumerable}`);\n}"
       },
       {
        "n": 7,
        "titulo": "\"Own\" quer dizer só o que é do próprio objeto",
        "secao": "PEGADINHAS",
        "codigo": "const base = { plano: 'free' };\nconst filho = Object.create(base);                        // herda de base\nfilho.nome = 'Ana';\n\nconsole.log('Lê normal:', filho.plano);                                   // herdou o valor\nconsole.log('Descritor:', Object.getOwnPropertyDescriptor(filho, 'plano'));  // undefined\nconsole.log('No pai:', Object.getOwnPropertyDescriptor(Object.getPrototypeOf(filho), 'plano'));"
       },
       {
        "n": 8,
        "titulo": "O descritor é um retrato, não um controle remoto",
        "secao": "PEGADINHAS",
        "codigo": "const produto = { preco: 100 };\nconst foto = Object.getOwnPropertyDescriptor(produto, 'preco');\n\nfoto.value = 999;                                         // mexer no retrato não muda nada\nconsole.log('Objeto:', produto.preco, '| retrato:', foto.value);\n\nObject.defineProperty(produto, 'preco', foto);            // para valer, é preciso reaplicar\nconsole.log('Depois de reaplicar:', produto.preco);"
       }
      ],
      "resumo": [
       "`getOwnPropertyDescriptor(obj, nome)` mostra as regras de UMA propriedade; o plural, de todas.",
       "Atribuição normal deixa tudo `true`; `defineProperty` e `freeze` fecham os flags.",
       "É a ferramenta para descobrir por que um campo não muda ou não aparece no JSON.",
       "`Object.create(proto, getOwnPropertyDescriptors(obj))` clona preservando getter e flags —",
       "coisa que `assign` e spread não fazem: eles disparam o getter e copiam o valor.",
       "\"Own\" ignora o que veio do protótipo, e o descritor devolvido é só uma cópia de leitura."
      ]
     },
     {
      "slug": "08-prototype",
      "arquivo": "JS/src/07-extras/08-prototype.js",
      "comando": "node src/07-extras/08-prototype.js",
      "titulo": "prototype e a cadeia de protótipos",
      "sessao": 8,
      "oQueE": "todo objeto tem uma referência interna para outro objeto — o protótipo. Se o campo não está nele mesmo, o JS sobe por essa cadeia até achar (ou até chegar em `null`).",
      "quandoUsar": "para colocar método em UM lugar só e todas as instâncias compartilharem.",
      "quandoNaoUsar": "para escrever herança à mão em código novo — `class` faz isso melhor. Entender prototype é o que faz `class` deixar de ser mágica.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O problema: método dentro do construtor é copiado por instância",
        "secao": "ESSENCIAL",
        "codigo": "function PessoaRuim(nome, sobrenome) {\n  this.nome = nome;\n  this.sobrenome = sobrenome;\n  this.nomeCompleto = () => `${this.nome} ${this.sobrenome}`;   // uma função NOVA por pessoa\n}\n\nconst ruim1 = new PessoaRuim('Luiz', 'O.');\nconst ruim2 = new PessoaRuim('Maria', 'A.');\n\nconsole.log(ruim1.nomeCompleto(), '|', ruim2.nomeCompleto());\nconsole.log('Mesma função?', ruim1.nomeCompleto === ruim2.nomeCompleto);\n// false: 10 mil pessoas = 10 mil cópias da mesma função ocupando memória do cliente."
       },
       {
        "n": 2,
        "titulo": "A solução: uma função só, no prototype",
        "secao": "ESSENCIAL",
        "codigo": "function Pessoa(nome, sobrenome) {\n  this.nome = nome;                                  // só DADO fica na instância\n  this.sobrenome = sobrenome;\n}\n\nPessoa.prototype.nomeCompleto = function () {        // COMPORTAMENTO fica no protótipo\n  return `${this.nome} ${this.sobrenome}`;\n};\n\nconst p1 = new Pessoa('Luiz', 'O.');\nconst p2 = new Pessoa('Maria', 'A.');\n\nconsole.log(p1.nomeCompleto(), '|', p2.nomeCompleto());\nconsole.log('Mesma função?', p1.nomeCompleto === p2.nomeCompleto);   // true: uma só na memória\nconsole.log('É da instância?', p1.hasOwnProperty('nomeCompleto'));   // false: veio de cima"
       },
       {
        "n": 3,
        "titulo": "A cadeia: onde o JS procura",
        "secao": "ESSENCIAL",
        "codigo": "function Produto(nome) { this.nome = nome; }\nProduto.prototype.etiqueta = function () { return `[${this.nome}]`; };\n\nconst caneca = new Produto('Caneca');\n\nconsole.log(Object.getPrototypeOf(caneca) === Produto.prototype);          // 1º degrau\nconsole.log(Object.getPrototypeOf(Produto.prototype) === Object.prototype); // 2º degrau\nconsole.log(Object.getPrototypeOf(Object.prototype));                      // null = topo\nconsole.log(caneca.etiqueta(), '| toString veio lá de cima:', caneca.toString());\n// Use SEMPRE getPrototypeOf/setPrototypeOf. `__proto__` é legado, existe só por compatibilidade."
       },
       {
        "n": 4,
        "titulo": "Métodos compartilhados de verdade",
        "secao": "NA PRÁTICA",
        "codigo": "function Item(nome, preco) {\n  this.nome = nome;\n  this.preco = preco;\n}\n\nItem.prototype.aumento = function (pct) { this.preco += this.preco * (pct / 100); return this; };\nItem.prototype.desconto = function (pct) { this.preco -= this.preco * (pct / 100); return this; };\n\nconst camiseta = new Item('Camiseta', 50);\ncamiseta.aumento(10).desconto(50);                   // `return this` permite encadear\n\nconsole.log(camiseta, '| métodos no objeto:', Object.keys(camiseta));"
       },
       {
        "n": 5,
        "titulo": "Dar um protótipo a um objeto literal",
        "secao": "NA PRÁTICA",
        "codigo": "function Produto2(nome, preco) { this.nome = nome; this.preco = preco; }\nProduto2.prototype.aumento = function (pct) { this.preco += this.preco * (pct / 100); };\n\nconst literal = { nome: 'Caneca', preco: 15 };       // nasceu sem passar pelo construtor\n\nObject.setPrototypeOf(literal, Produto2.prototype);  // agora enxerga os métodos\nliteral.aumento(10);\n\nconsole.log(literal, '| instanceof Produto2?', literal instanceof Produto2);\n// Funciona, mas `setPrototypeOf` num objeto já criado é lento — o motor perde otimizações."
       },
       {
        "n": 6,
        "titulo": "Object.create: já nasce com o protótipo certo",
        "secao": "NA PRÁTICA",
        "codigo": "function Produto3(nome, preco) { this.nome = nome; this.preco = preco; }\nProduto3.prototype.aumento = function (pct) { this.preco += this.preco * (pct / 100); };\n\nconst p3 = Object.create(Produto3.prototype);        // herda os métodos, mas NÃO roda o construtor\np3.preco = 113;\np3.aumento(10);\n\nconsole.log(p3);                                     // Produto3 { preco: 124.3 } — sem `nome`\nconsole.log('Sem construtor, nenhum campo é preenchido sozinho.');"
       },
       {
        "n": 7,
        "titulo": "Escrever nunca altera o protótipo",
        "secao": "PEGADINHAS",
        "codigo": "function Config() {}\nConfig.prototype.tema = 'claro';                     // valor compartilhado por todos\n\nconst c1 = new Config();\nconst c2 = new Config();\n\nc1.tema = 'escuro';                                  // cria uma propriedade PRÓPRIA em c1\n\nconsole.log(c1.tema, '|', c2.tema, '| c2 mudou?', c2.tema === 'claro');\nconsole.log('c1 tem a própria?', c1.hasOwnProperty('tema'), '| c2:', c2.hasOwnProperty('tema'));\ndelete c1.tema;\nconsole.log('Apagou a própria e voltou a enxergar a de cima:', c1.tema);"
       },
       {
        "n": 8,
        "titulo": "Arrow function no prototype não enxerga o objeto",
        "secao": "PEGADINHAS",
        "codigo": "function Cliente(nome) { this.nome = nome; }\n\nCliente.prototype.comArrow = () => `Olá, ${this.nome}`;          // `this` é o do módulo, não o cliente\nCliente.prototype.comFuncao = function () { return `Olá, ${this.nome}`; };\n\nconst cli = new Cliente('Ana');\n\nconsole.log(cli.comArrow(), '|', cli.comFuncao());\n// No prototype, sempre `function`. Arrow só serve dentro do construtor (aí ela captura o this dele)."
       }
      ],
      "resumo": [
       "Dado vai na instância (`this.x`); comportamento vai no `Construtor.prototype`.",
       "Método no construtor é copiado por objeto; no protótipo existe uma cópia só.",
       "O JS procura no objeto, depois no protótipo, subindo até `null` — é a cadeia.",
       "Use `Object.getPrototypeOf`/`setPrototypeOf` e `Object.create`; `__proto__` é legado.",
       "Escrever sempre cria propriedade própria e \"esconde\" a do protótipo, sem alterá-la."
      ]
     },
     {
      "slug": "09-heranca-e-delegacao",
      "arquivo": "JS/src/07-extras/09-heranca-e-delegacao.js",
      "comando": "node src/07-extras/09-heranca-e-delegacao.js",
      "titulo": "Herança (que na verdade é delegação)",
      "sessao": 8,
      "oQueE": "ligar o protótipo de um construtor ao de outro, para o filho aproveitar os métodos do pai. Todo mundo chama de herança, mas nada é copiado: o que falta é DELEGADO para cima na cadeia de protótipos.",
      "quandoUsar": "quando um tipo é realmente um caso específico do outro (camiseta É um produto).",
      "quandoNaoUsar": "quando a relação for \"tem um\" em vez de \"é um\" — aí componha em vez de herdar. Se o projeto usa `class`, `extends`/`super` fazem isto em uma linha.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Montar a cadeia na mão",
        "secao": "ESSENCIAL",
        "codigo": "function Produto(nome, preco) { this.nome = nome; this.preco = preco; }\nProduto.prototype.aumento = function (quantia) { this.preco += quantia; };\n\nfunction Camiseta(nome, preco, cor) {\n  Produto.call(this, nome, preco);                    // roda o construtor do pai com o this daqui\n  this.cor = cor;\n}\n\nCamiseta.prototype = Object.create(Produto.prototype); // objeto vazio cujo protótipo é o do pai\nCamiseta.prototype.constructor = Camiseta;             // conserta: sem isso, aponta para Produto\n\nconst c = new Camiseta('Camiseta', 50, 'preta');\nc.aumento(10);\n\nconsole.log(c, '| método veio do pai:', c.preco);"
       },
       {
        "n": 2,
        "titulo": "Por que \"delegação\" descreve melhor",
        "secao": "ESSENCIAL",
        "codigo": "function Base(nome) { this.nome = nome; }\nfunction Filho(nome) { Base.call(this, nome); }\nFilho.prototype = Object.create(Base.prototype);\nFilho.prototype.constructor = Filho;\n\nconst obj = new Filho('Ana');\n\nBase.prototype.saudacao = function () { return `Oi, ${this.nome}`; };   // criado DEPOIS do objeto\n\nconsole.log(obj.saudacao());\nconsole.log('O objeto tem o método?', obj.hasOwnProperty('saudacao'));\n// Se fosse herança de verdade, o objeto teria copiado o pai no nascimento e não veria nada novo.\n// Ele não copiou nada: na hora da chamada, pede emprestado para quem está acima na cadeia."
       },
       {
        "n": 3,
        "titulo": "A mesma cadeia com class",
        "secao": "ESSENCIAL",
        "codigo": "class ProdutoModerno {\n  constructor(nome, preco) { this.nome = nome; this.preco = preco; }\n  aumento(quantia) { this.preco += quantia; }\n}\n\nclass CamisetaModerna extends ProdutoModerno {         // substitui as 3 linhas do bloco 1\n  constructor(nome, preco, cor) { super(nome, preco); this.cor = cor; }\n}\n\nconst cm = new CamisetaModerna('Camiseta', 50, 'azul');\ncm.aumento(10);\n\nconsole.log(cm, '| a máquina por baixo é a mesma:',\n  Object.getPrototypeOf(CamisetaModerna.prototype) === ProdutoModerno.prototype);"
       },
       {
        "n": 4,
        "titulo": "Sobrescrever o método do pai (e ainda usar o dele)",
        "secao": "NA PRÁTICA",
        "codigo": "function Item(nome, preco) { this.nome = nome; this.preco = preco; }\nItem.prototype.etiqueta = function () { return `${this.nome}: R$ ${this.preco.toFixed(2)}`; };\n\nfunction Promocional(nome, preco, validade) {\n  Item.call(this, nome, preco);\n  this.validade = validade;\n}\nPromocional.prototype = Object.create(Item.prototype);\nPromocional.prototype.constructor = Promocional;\n\nPromocional.prototype.etiqueta = function () {         // o filho vem primeiro na busca\n  return `${Item.prototype.etiqueta.call(this)} (até ${this.validade})`;   // o `super` na mão\n};\n\nconsole.log(new Promocional('Fone', 199, '30/09').etiqueta());\nconsole.log(new Item('Fone', 199).etiqueta());         // o pai continua intacto"
       },
       {
        "n": 5,
        "titulo": "Onde cada coisa mora",
        "secao": "NA PRÁTICA",
        "codigo": "function Veiculo(placa) { this.placa = placa; }\nVeiculo.prototype.andar = function () { return 'andando'; };\n\nfunction Carro(placa) { Veiculo.call(this, placa); }\nCarro.prototype = Object.create(Veiculo.prototype);\nCarro.prototype.constructor = Carro;\n\nconst meu = new Carro('ABC-1234');\n\nconsole.log('instanceof Carro:', meu instanceof Carro, '| Veiculo:', meu instanceof Veiculo);\nconsole.log('placa é própria?', meu.hasOwnProperty('placa'), '| andar?', meu.hasOwnProperty('andar'));\nconsole.log('Veiculo.prototype está na cadeia?', Veiculo.prototype.isPrototypeOf(meu));"
       },
       {
        "n": 6,
        "titulo": "Três níveis: a busca sobe até achar",
        "secao": "NA PRÁTICA",
        "codigo": "function A() {}\nA.prototype.oi = function () { return 'veio de A'; };\nfunction B() {} B.prototype = Object.create(A.prototype); B.prototype.constructor = B;\nfunction C() {} C.prototype = Object.create(B.prototype); C.prototype.constructor = C;\n\nconst tres = new C();\n\nconsole.log(tres.oi());                                 // C → B → A\nconsole.log('Cadeia:', [C, B, A].map((f) => f.name).join(' → '), '→ Object → null');\nB.prototype.oi = function () { return 'agora B responde primeiro'; };\nconsole.log(tres.oi());                                 // quem está mais perto ganha"
       },
       {
        "n": 7,
        "titulo": "Esquecer o Produto.call(this, ...)",
        "secao": "PEGADINHAS",
        "codigo": "function Pai(nome, preco) { this.nome = nome; this.preco = preco; }\nPai.prototype.mostrar = function () { return `${this.nome} — ${this.preco}`; };\n\nfunction FilhoRuim(nome, preco, cor) { this.cor = cor; }   // não chamou o construtor do pai\nFilhoRuim.prototype = Object.create(Pai.prototype);\n\nconsole.log(new FilhoRuim('Caneca', 15, 'branca').mostrar());\nconsole.log('Os métodos chegaram, os DADOS não: só o construtor do pai preenche isso.');"
       },
       {
        "n": 8,
        "titulo": "Ligar direto no prototype do pai polui o pai",
        "secao": "PEGADINHAS",
        "codigo": "function Origem() {}\nOrigem.prototype.tipo = 'origem';\n\nfunction Copia() {}\nCopia.prototype = Origem.prototype;                     // MESMO objeto, sem Object.create\nCopia.prototype.extra = 'só do filho';                  // escreveu no pai também\n\nconsole.log('O pai ganhou o método do filho?', Origem.prototype.extra);\nconsole.log('Use sempre Object.create(Pai.prototype): cria um elo NOVO apontando para o pai.');"
       }
      ],
      "resumo": [
       "`Pai.call(this, ...)` traz os DADOS; `Object.create(Pai.prototype)` traz os MÉTODOS.",
       "Depois disso, conserte `Filho.prototype.constructor = Filho`.",
       "Nada é copiado: o objeto delega para cima na cadeia, na hora da chamada. Por isso método",
       "adicionado no pai depois já aparece nos objetos que existiam antes.",
       "Método do filho com o mesmo nome esconde o do pai; para usar o do pai, `.call(this)`.",
       "`class ... extends` + `super` fazem tudo isso em duas palavras — mesma máquina por baixo."
      ]
     },
     {
      "slug": "10-composicao-e-mixins",
      "arquivo": "JS/src/07-extras/10-composicao-e-mixins.js",
      "comando": "node src/07-extras/10-composicao-e-mixins.js",
      "titulo": "Composição e mixins com prototype",
      "sessao": 8,
      "oQueE": "montar o protótipo juntando pequenos objetos de habilidade (mixins) com `Object.assign`, e criar as instâncias com `Object.create` apontando para ele.",
      "quandoUsar": "quando os comportamentos se combinam de formas diferentes (\"pode voar\", \"pode nadar\") e uma árvore de herança não daria conta.",
      "quandoNaoUsar": "quando existe mesmo uma relação \"é um\" simples — aí `class` é mais direto.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Cada habilidade é um objeto solto",
        "secao": "ESSENCIAL",
        "codigo": "const falar = { falar() { return `${this.nome} está falando`; } };   // `this` = quem receber\nconst comer = { comer() { return `${this.nome} está comendo`; } };\nconst beber = { beber() { return `${this.nome} está bebendo`; } };\n\nconst pessoaPrototype = Object.assign({}, falar, comer, beber);      // junta tudo num protótipo\n\nconsole.log(Object.keys(pessoaPrototype));\nconsole.log(falar.falar.call({ nome: 'Ana' }));   // o método não é de ninguém até ser chamado"
       },
       {
        "n": 2,
        "titulo": "A factory: dados próprios, métodos compartilhados",
        "secao": "ESSENCIAL",
        "codigo": "const habilidades = Object.assign({}, { falar() { return `${this.nome} falou`; } });\n\nfunction criaPessoa(nome, sobrenome) {\n  return Object.create(habilidades, {                // protótipo + descritores dos campos\n    nome: { value: nome, enumerable: true },\n    sobrenome: { value: sobrenome, enumerable: true },\n  });\n}\n\nconst p1 = criaPessoa('Luiz', 'Otávio');\nconst p2 = criaPessoa('Maria', 'A.');\n\nconsole.log(p1.falar(), '|', p2.falar());\nconsole.log('Método é o mesmo objeto?', p1.falar === p2.falar);      // uma cópia só na memória\nconsole.log('Dados são próprios?', p1.hasOwnProperty('nome'), '| método:', p1.hasOwnProperty('falar'));"
       },
       {
        "n": 3,
        "titulo": "Onde o método fica guardado",
        "secao": "ESSENCIAL",
        "codigo": "const nadar = { nadar() { return `${this.nome} nadou`; } };\n\nconst criaSolto = (nome) => ({ nome, nadar() { return `${this.nome} nadou`; } });  // função nova\nconst criaEspalhado = (nome) => ({ nome, ...nadar });        // copia a referência do mixin\nconst criaComProto = (nome) => Object.assign(Object.create(nadar), { nome });\n\nconsole.log('Método escrito na factory:', criaSolto('a').nadar === criaSolto('b').nadar);\nconsole.log('Espalhado do mixin:       ', criaEspalhado('a').nadar === criaEspalhado('b').nadar);\nconsole.log('Cada objeto guarda o método?', criaEspalhado('a').hasOwnProperty('nadar'),\n  '| com protótipo:', criaComProto('a').hasOwnProperty('nadar'));\n// Escrever o método dentro da factory cria uma função NOVA por objeto — é o desperdício real.\n// O spread não duplica a função, mas cada objeto ainda carrega um campo apontando para ela.\n// Com protótipo, o campo existe uma vez só, e as instâncias só guardam dado."
       },
       {
        "n": 4,
        "titulo": "As mesmas peças, tipos diferentes",
        "secao": "NA PRÁTICA",
        "codigo": "const voa = { voar() { return `${this.nome} decolou`; } };\nconst nada = { nadar() { return `${this.nome} mergulhou`; } };\nconst anda = { andar() { return `${this.nome} andou`; } };\n\nconst patoProto = Object.assign({}, voa, nada, anda);   // escolhe as habilidades por tipo\nconst peixeProto = Object.assign({}, nada);\n\nconst criaPato = (nome) => Object.assign(Object.create(patoProto), { nome });\nconst criaPeixe = (nome) => Object.assign(Object.create(peixeProto), { nome });\n\nconsole.log(criaPato('Donald').voar(), '|', criaPato('Donald').nadar());\nconsole.log(criaPeixe('Nemo').nadar(), '| peixe voa?', 'voar' in criaPeixe('Nemo'));"
       },
       {
        "n": 5,
        "titulo": "Campos com regra própria na hora de criar",
        "secao": "NA PRÁTICA",
        "codigo": "const contaProto = { extrato() { return `${this.titular}: R$ ${this.saldo.toFixed(2)}`; } };\n\nfunction criaConta(titular, saldo) {\n  return Object.create(contaProto, {\n    titular: { value: titular, enumerable: true },                    // só leitura\n    saldo: { value: saldo, writable: true, enumerable: true },        // pode mudar\n    senha: { value: '1234', writable: true },                         // fora do JSON e do log\n  });\n}\n\nconst conta = criaConta('Ana', 1000);\nconta.titular = 'Outro';                                              // ignorado\nconta.saldo += 500;\n\nconsole.log(conta.extrato(), '|', JSON.stringify(conta));"
       },
       {
        "n": 6,
        "titulo": "Adicionar habilidades a uma class já existente",
        "secao": "NA PRÁTICA",
        "codigo": "class Usuario {\n  constructor(nome) { this.nome = nome; }\n}\n\nconst podeLogar = { logar() { return `${this.nome} entrou`; } };\nconst podeNotificar = { notificar(msg) { return `Para ${this.nome}: ${msg}`; } };\n\nObject.assign(Usuario.prototype, podeLogar, podeNotificar);   // mixin direto no protótipo\n\nconst u = new Usuario('Ana');\nconsole.log(u.logar(), '|', u.notificar('pedido enviado'));"
       },
       {
        "n": 7,
        "titulo": "Em Object.create, o descritor começa tudo `false`",
        "secao": "PEGADINHAS",
        "codigo": "const proto = { oi() { return `oi, ${this.nome}`; } };\n\nconst escondido = Object.create(proto, { nome: { value: 'Ana' } });   // faltou enumerable\nconst visivel = Object.create(proto, { nome: { value: 'Ana', enumerable: true } });\n\nconsole.log('Funciona:', escondido.oi(), '| mas o log mostra:', escondido);\nconsole.log('Com enumerable:', visivel, '| JSON:', JSON.stringify(escondido));\n// O campo existe e responde — só não aparece em log, `Object.keys` nem JSON. Declare os flags."
       },
       {
        "n": 8,
        "titulo": "Mixin com dado dentro vira estado compartilhado",
        "secao": "PEGADINHAS",
        "codigo": "const comCarrinho = { itens: [], add(p) { this.itens.push(p); return this; } };\n\nconst cliente1 = Object.create(comCarrinho);\nconst cliente2 = Object.create(comCarrinho);\n\ncliente1.add('Teclado');\nconsole.log('Carrinho do cliente2:', cliente2.itens);   // o array é o MESMO objeto, lá em cima\nconsole.log('Mixin só com métodos; dado é criado por instância, na factory.');"
       }
      ],
      "resumo": [
       "Mixin é um objeto só com métodos que usam `this` — ele não sabe quem vai usá-lo.",
       "`Object.assign({}, a, b, c)` junta as habilidades num protótipo único.",
       "`Object.create(proto, descritores)` cria a instância: método compartilhado, dado próprio.",
       "Método escrito dentro da factory é uma função nova por objeto; no protótipo, uma só.",
       "Nunca ponha array/objeto no mixin: todas as instâncias vão dividir a mesma referência."
      ]
     },
     {
      "slug": "11-tres-formas-de-criar-objetos",
      "arquivo": "JS/src/07-extras/11-tres-formas-de-criar-objetos.js",
      "comando": "node src/07-extras/11-tres-formas-de-criar-objetos.js",
      "titulo": "Factory, constructor function e class",
      "sessao": 8,
      "oQueE": "três padrões de projeto para a mesma tarefa — criar vários objetos do mesmo tipo. São escolhas de estilo, não degraus de evolução: nenhum é \"o certo\".",
      "quandoUsar": "sempre um dos três. O critério é o que você e o time leem com mais facilidade, e o que o projeto já usa — misturar os três no mesmo código é o que atrapalha.",
      "quandoNaoUsar": "nenhum deles, quando é um objeto só. Aí um literal `{}` basta.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O mesmo produto, nas três formas",
        "secao": "ESSENCIAL",
        "codigo": "function criaProduto(nome, preco) {                       // factory: função comum, sem `new`\n  return { nome, preco, etiqueta() { return `${this.nome}: ${this.preco}`; } };\n}\n\nfunction Produto(nome, preco) { this.nome = nome; this.preco = preco; }   // constructor function\nProduto.prototype.etiqueta = function () { return `${this.nome}: ${this.preco}`; };\n\nclass ProdutoClass {                                      // class\n  constructor(nome, preco) { this.nome = nome; this.preco = preco; }\n  etiqueta() { return `${this.nome}: ${this.preco}`; }\n}\n\nconsole.log(criaProduto('Caneca', 15).etiqueta());\nconsole.log(new Produto('Caneca', 15).etiqueta());\nconsole.log(new ProdutoClass('Caneca', 15).etiqueta());\n// Mesma saída, três caminhos. Escolher é decisão de projeto, não de qualidade."
       },
       {
        "n": 2,
        "titulo": "O que muda por dentro",
        "secao": "ESSENCIAL",
        "codigo": "const daFactory = { nome: 'A', etiqueta() { return this.nome; } };\n\nfunction Construtora(nome) { this.nome = nome; }\nConstrutora.prototype.etiqueta = function () { return this.nome; };\n\nclass Classe { constructor(nome) { this.nome = nome; } etiqueta() { return this.nome; } }\n\nconsole.log('Factory  — método no objeto:', daFactory.hasOwnProperty('etiqueta'));\nconsole.log('Construtor — método no objeto:', new Construtora('A').hasOwnProperty('etiqueta'));\nconsole.log('Class    — método no objeto:', new Classe('A').hasOwnProperty('etiqueta'));\n// Constructor function e class são a MESMA máquina: método no protótipo. A factory devolve\n// um objeto solto — a não ser que você mesmo ligue um protótipo nela."
       },
       {
        "n": 3,
        "titulo": "Factory também pode usar protótipo",
        "secao": "ESSENCIAL",
        "codigo": "const metodos = { etiqueta() { return `${this.nome}: ${this.preco}`; } };\n\nconst criaComProto = (nome, preco) => Object.assign(Object.create(metodos), { nome, preco });\n\nconst x = criaComProto('Fone', 199);\nconst y = criaComProto('Mouse', 89);\n\nconsole.log(x.etiqueta(), '| método compartilhado?', x.etiqueta === y.etiqueta);\nconsole.log('Ou seja: \"factory gasta memória\" não é regra — depende de como você escreve.');"
       },
       {
        "n": 4,
        "titulo": "O que a factory entrega de graça",
        "secao": "NA PRÁTICA",
        "codigo": "function criaConta(titular, saldoInicial) {\n  let saldo = saldoInicial;                               // closure: ninguém alcança de fora\n  return {\n    titular,\n    depositar(v) { saldo += v; return this; },\n    extrato() { return `${titular}: R$ ${saldo.toFixed(2)}`; },\n  };\n}\n\nconst conta = criaConta('Ana', 100);\nconta.depositar(50);\nconta.saldo = 999999;                    // cria um campo novo e inútil: o saldo real é a closure\n\nconsole.log(conta.extrato(), '| o saldo de verdade não tem como ser alcançado de fora');\nconsole.log('Sem `new`: se esquecer, não quebra nada — é uma função comum.');"
       },
       {
        "n": 5,
        "titulo": "O que a class entrega de graça",
        "secao": "NA PRÁTICA",
        "codigo": "class Base {\n  #segredo = 'privado de verdade';                        // campo privado nativo\n  constructor(nome) { this.nome = nome; }\n  revelar() { return this.#segredo; }\n}\n\nclass Filha extends Base {                                // herança em uma palavra\n  constructor(nome) { super(nome); }\n}\n\nconst f = new Filha('Ana');\n\nconsole.log(f.revelar(), '| instanceof Base:', f instanceof Base);\ntry { Base('sem new'); } catch (e) { console.log('Esqueceu o new:', e.message); }  // avisa na hora"
       },
       {
        "n": 6,
        "titulo": "Constructor function: onde ela ainda aparece",
        "secao": "NA PRÁTICA",
        "codigo": "function Pessoa(nome) { this.nome = nome; }\nPessoa.prototype.falar = function () { return `${this.nome} falou`; };\n\nconst antiga = new Pessoa('Luiz');\n\nconsole.log(antiga.falar(), '| é a mesma coisa que class?',\n  typeof Pessoa === 'function' && typeof ProdutoClass === 'function');\nconsole.log('Dominá-la é o que faz `class` deixar de ser mágica — e é o que tem em código antigo.');"
       },
       {
        "n": 7,
        "titulo": "O custo aparece quando o método nasce dentro da função",
        "secao": "PEGADINHAS",
        "codigo": "function criaCaro(nome) {\n  return { nome, etiqueta() { return this.nome; } };      // função NOVA a cada chamada\n}\n\nconsole.log('Método por objeto:', criaCaro('a').etiqueta === criaCaro('b').etiqueta);\n\nclass Barata { constructor(nome) { this.nome = nome; } etiqueta() { return this.nome; } }\n\nconsole.log('Método compartilhado:', new Barata('a').etiqueta === new Barata('b').etiqueta);\n// Só vira problema com MUITOS objetos. Para dezenas, escreva o que ficar mais claro."
       },
       {
        "n": 8,
        "titulo": "Método de class perde o `this` ao virar callback",
        "secao": "PEGADINHAS",
        "codigo": "class Contador {\n  constructor() { this.valor = 0; }\n  somar() { this.valor++; return this.valor; }\n}\n\nconst criaContador = () => { let valor = 0; return { somar: () => ++valor }; };\n\nconst daClasse = new Contador();\nconst executar = (fn) => { try { return fn(); } catch (e) { return 'quebrou: ' + e.message; } };\n\nconsole.log('Class:  ', executar(daClasse.somar));        // `this` se perdeu no caminho\nconsole.log('Amarrado:', executar(daClasse.somar.bind(daClasse)));\nconsole.log('Factory:', executar(criaContador().somar)); // closure não depende de `this`"
       }
      ],
      "resumo": [
       "Factory, constructor function e class resolvem o mesmo problema — são padrões, não níveis.",
       "Constructor function e class são a mesma máquina: método no protótipo, criação com `new`.",
       "Factory dá privacidade por closure, dispensa `new` e não sofre com `this` perdido.",
       "Class dá `extends`/`super`, campo `#privado`, `instanceof` e erro na hora se faltar `new`.",
       "Escolha o que você lê melhor e o que o projeto já usa; o problema é misturar os três."
      ]
     }
    ]
   },
   {
    "slug": "08-classes",
    "titulo": "Classes",
    "icone": "⬢",
    "cor": "#f78fb3",
    "resumo": "O molde de objetos do JS moderno.",
    "topicos": [
     {
      "slug": "01-class-basico",
      "arquivo": "JS/src/08-classes/01-class-basico.js",
      "comando": "node src/08-classes/01-class-basico.js",
      "titulo": "class: o básico",
      "sessao": 8,
      "oQueE": "a sintaxe do JS para criar um molde de objetos — o `constructor` define os dados e os métodos vão automaticamente para o prototype, sem você escrever uma linha disso.",
      "quandoUsar": "quando vários objetos compartilham os mesmos dados e comportamentos: produto, usuário, pedido, carrinho.",
      "quandoNaoUsar": "para um objeto só (use um literal) ou quando o projeto já resolve tudo com factory function — misturar padrões é que confunde.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "A mesma Pessoa, com e sem class",
        "secao": "ESSENCIAL",
        "codigo": "class Pessoa {\n  constructor(nome, sobrenome) {                 // roda no `new`, monta os dados\n    this.nome = nome;\n    this.sobrenome = sobrenome;\n  }\n  falar() { return `${this.nome} está falando`; }        // método fica DENTRO da classe\n  comer() { return `${this.nome} está comendo`; }\n}\n\nfunction Pessoa2(nome, sobrenome) { this.nome = nome; this.sobrenome = sobrenome; }\nPessoa2.prototype.falar = function () { return `${this.nome} está falando`; };\nPessoa2.prototype.comer = function () { return `${this.nome} está comendo`; };\n\nconsole.log(new Pessoa('Luiz', 'Miranda').falar());\nconsole.log(new Pessoa2('Luiz', 'Miranda').falar());\n// Mesmo resultado. A class junta construtor e métodos num bloco só, sem repetir `prototype`."
       },
       {
        "n": 2,
        "titulo": "O JS coloca os métodos no prototype sozinho",
        "secao": "ESSENCIAL",
        "codigo": "class Produto {\n  constructor(nome) { this.nome = nome; }\n  etiqueta() { return `[${this.nome}]`; }\n}\n\nconst p1 = new Produto('Caneca');\n\nconsole.log('Dado é do objeto:', p1.hasOwnProperty('nome'));\nconsole.log('Método é do objeto?', p1.hasOwnProperty('etiqueta'));      // false: está no protótipo\nconsole.log('Onde ele mora:', Object.getOwnPropertyNames(Produto.prototype));\nconsole.log('Compartilhado?', p1.etiqueta === new Produto('Outra').etiqueta);\n// É o mesmo `__proto__` do console do navegador: constructor, falar, comer... tudo junto ali."
       },
       {
        "n": 3,
        "titulo": "O constructor deixa o objeto pronto para usar",
        "secao": "ESSENCIAL",
        "codigo": "class Pedido {\n  constructor(cliente, itens = [], status = 'aberto') {   // valor padrão direto na assinatura\n    this.cliente = cliente.trim();                        // já normaliza o que entra\n    this.itens = itens;\n    this.status = status;\n    this.criadoEm = '2026-08-19';\n  }\n  total() { return this.itens.reduce((s, i) => s + i.preco, 0); }\n}\n\nconst pedido = new Pedido('  Ana  ', [{ preco: 50 }, { preco: 30 }]);\n\nconsole.log(pedido);\nconsole.log('Total:', pedido.total());"
       },
       {
        "n": 4,
        "titulo": "Métodos que devolvem `this` encadeiam",
        "secao": "NA PRÁTICA",
        "codigo": "class Carrinho {\n  constructor() { this.itens = []; }\n  add(nome, preco) { this.itens.push({ nome, preco }); return this; }\n  remover(nome) { this.itens = this.itens.filter((i) => i.nome !== nome); return this; }\n  total() { return this.itens.reduce((s, i) => s + i.preco, 0); }\n}\n\nconst carrinho = new Carrinho().add('Teclado', 249.9).add('Mouse', 89.5).remover('Mouse');\n\nconsole.log(carrinho.itens, '| Total: R$', carrinho.total().toFixed(2));"
       },
       {
        "n": 5,
        "titulo": "O objeto nunca nasce inválido",
        "secao": "NA PRÁTICA",
        "codigo": "class Cliente {\n  constructor(nome, email) {\n    if (!nome?.trim()) throw new Error('nome é obrigatório');\n    if (!email?.includes('@')) throw new Error('e-mail inválido');\n    this.nome = nome.trim();\n    this.email = email.toLowerCase();\n  }\n}\n\nconsole.log(new Cliente('Ana', 'ANA@Empresa.com'));\n\ntry { new Cliente('', 'ana@empresa.com'); }\ncatch (erro) { console.log('Barrado na porta:', erro.message); }"
       },
       {
        "n": 6,
        "titulo": "Várias instâncias viram relatório",
        "secao": "NA PRÁTICA",
        "codigo": "class Venda {\n  constructor(vendedor, valor) { this.vendedor = vendedor; this.valor = valor; }\n  comissao() { return this.valor * 0.1; }\n}\n\nconst vendas = [new Venda('Ana', 1200), new Venda('Bruno', 800), new Venda('Ana', 500)];\n\nconsole.log('Comissões:', vendas.map((v) => `${v.vendedor}: ${v.comissao().toFixed(2)}`));\nconsole.log('Faturamento:', vendas.reduce((s, v) => s + v.valor, 0));"
       },
       {
        "n": 7,
        "titulo": "`new` é obrigatório e a classe não é içada",
        "secao": "PEGADINHAS",
        "codigo": "class Usuario { constructor(nome) { this.nome = nome; } }\n\ntry { Usuario('Ana'); }\ncatch (erro) { console.log('Sem new:', erro.message); }        // avisa na hora, não falha calado\n\ntry { new Categoria(); }\ncatch (erro) { console.log('Antes de declarar:', erro.message); }\nclass Categoria {}                                             // declarada só aqui embaixo"
       },
       {
        "n": 8,
        "titulo": "O método perde o `this` ao virar callback",
        "secao": "PEGADINHAS",
        "codigo": "class Contador {\n  constructor() { this.valor = 0; }\n  somar() { this.valor++; return this.valor; }\n  somarSeguro = () => { this.valor++; return this.valor; };   // campo de classe: arrow amarrada\n}\n\nconst c = new Contador();\nconst executar = (fn) => { try { return fn(); } catch (e) { return 'quebrou'; } };\n\nconsole.log('Método solto:', executar(c.somar));\nconsole.log('Com bind:    ', executar(c.somar.bind(c)));\nconsole.log('Campo arrow: ', executar(c.somarSeguro));\n// Passou o método para setTimeout/addEventListener/map? Amarre com bind ou use campo arrow."
       }
      ],
      "resumo": [
       "`constructor` recebe os argumentos do `new` e monta os dados em `this`.",
       "Método escrito dentro da classe vai para o prototype sozinho — nada de escrever prototype.",
       "Dado é de cada objeto; método é um só, compartilhado por todas as instâncias.",
       "Validar no constructor garante que objeto inválido nunca chega a existir.",
       "Esquecer o `new` dá erro na hora, e o método solto perde o `this`: use `bind` ou campo arrow."
      ]
     },
     {
      "slug": "02-heranca-com-extends",
      "arquivo": "JS/src/08-classes/02-heranca-com-extends.js",
      "comando": "node src/08-classes/02-heranca-com-extends.js",
      "titulo": "Herança com extends e super",
      "sessao": 8,
      "oQueE": "`extends` liga uma classe à outra e `super(...)` chama o constructor do pai. A cadeia de protótipos é montada pelo JS — você não escreve `Object.create` nem conserta `constructor`.",
      "quandoUsar": "quando o filho É um caso específico do pai: smartphone é um dispositivo.",
      "quandoNaoUsar": "quando a relação é \"tem um\" ou as habilidades se combinam livremente — aí composição encaixa melhor do que uma árvore de classes.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "extends + super: o filho aproveita tudo",
        "secao": "ESSENCIAL",
        "codigo": "class DispositivoEletronico {\n  constructor(nome) {\n    this.nome = nome;\n    this.ligado = false;\n  }\n  ligar() {\n    if (this.ligado) return `${this.nome} já ligado`;\n    this.ligado = true;\n    return `${this.nome} ligou`;\n  }\n  desligar() {\n    if (!this.ligado) return `${this.nome} já desligado`;\n    this.ligado = false;\n    return `${this.nome} desligou`;\n  }\n}\n\nclass Smartphone extends DispositivoEletronico {\n  constructor(nome, cor, modelo) {\n    super(nome);                       // roda o constructor do pai: nome e ligado\n    this.cor = cor;                    // só o que é específico do filho\n    this.modelo = modelo;\n  }\n}\n\nconst s1 = new Smartphone('Samsung', 'Preto', 'Galaxy S23');\n\nconsole.log(s1);\nconsole.log(s1.ligar(), '|', s1.ligar());   // método do pai, funcionando no filho"
       },
       {
        "n": 2,
        "titulo": "O que o extends fez sozinho",
        "secao": "ESSENCIAL",
        "codigo": "class Base { oi() { return 'oi do pai'; } }\nclass Filha extends Base {}                 // sem constructor: o do pai é usado direto\n\nconst f = new Filha();\n\nconsole.log(f.oi());\nconsole.log('Cadeia ligada:', Object.getPrototypeOf(Filha.prototype) === Base.prototype);\nconsole.log('constructor certo:', f.constructor === Filha);\nconsole.log('instanceof:', f instanceof Filha, '|', f instanceof Base);\n// Na mão seriam 3 linhas: Pai.call(this), Object.create(Pai.prototype) e o conserto do\n// constructor. O `extends` faz as três, e ainda liga a classe pai à filha."
       },
       {
        "n": 3,
        "titulo": "super também funciona dentro de método",
        "secao": "ESSENCIAL",
        "codigo": "class Aparelho {\n  constructor(nome) { this.nome = nome; }\n  ficha() { return `${this.nome}`; }\n}\n\nclass Notebook extends Aparelho {\n  constructor(nome, ram) { super(nome); this.ram = ram; }\n  ficha() { return `${super.ficha()} — ${this.ram}GB de RAM`; }   // usa o do pai e acrescenta\n}\n\nconsole.log(new Notebook('Dell', 16).ficha());\nconsole.log(new Aparelho('Dell').ficha(), '← o pai continua intacto');"
       },
       {
        "n": 4,
        "titulo": "Cada filho acrescenta o que é seu",
        "secao": "NA PRÁTICA",
        "codigo": "class Dispositivo {\n  constructor(nome) { this.nome = nome; this.ligado = false; }\n  ligar() { this.ligado = true; return `${this.nome} ligou`; }\n}\n\nclass Tablet extends Dispositivo {\n  constructor(nome, polegadas) { super(nome); this.polegadas = polegadas; }\n  girarTela() { return `${this.nome} girou a tela de ${this.polegadas}\"`; }\n}\n\nclass Celular extends Dispositivo {\n  constructor(nome, operadora) { super(nome); this.operadora = operadora; }\n  ligarPara(numero) { return `${this.nome} discou ${numero} pela ${this.operadora}`; }\n}\n\nconsole.log(new Tablet('iPad', 11).girarTela());\nconsole.log(new Celular('Moto G', 'Vivo').ligarPara('9999-0000'));"
       },
       {
        "n": 5,
        "titulo": "A mesma chamada, respostas diferentes",
        "secao": "NA PRÁTICA",
        "codigo": "class Produto {\n  constructor(nome, preco) { this.nome = nome; this.preco = preco; }\n  frete() { return 20; }\n  resumo() { return `${this.nome}: R$ ${(this.preco + this.frete()).toFixed(2)}`; }\n}\n\nclass Digital extends Produto { frete() { return 0; } }                    // download não tem frete\nclass Pesado extends Produto { frete() { return this.preco * 0.1; } }\n\nconst catalogo = [new Produto('Caneca', 30), new Digital('Ebook', 40), new Pesado('Geladeira', 3000)];\n\nfor (const item of catalogo) console.log(item.resumo());\n// `resumo` está escrito uma vez só, no pai — mas chama o `frete` de cada filho."
       },
       {
        "n": 6,
        "titulo": "Obrigar o filho a implementar",
        "secao": "NA PRÁTICA",
        "codigo": "class Relatorio {\n  constructor(titulo) {\n    if (new.target === Relatorio) throw new Error('Relatorio é base: use uma subclasse');\n    this.titulo = titulo;\n  }\n  gerar() { throw new Error(`${this.constructor.name} precisa implementar gerar()`); }\n}\n\nclass RelatorioVendas extends Relatorio {\n  gerar() { return `${this.titulo}: 3 vendas`; }\n}\n\nconsole.log(new RelatorioVendas('Agosto').gerar());\ntry { new Relatorio('X'); } catch (e) { console.log('Base:', e.message); }\ntry { new (class Incompleto extends Relatorio {})('Y').gerar(); }\ncatch (e) { console.log('Faltou implementar:', e.message); }"
       },
       {
        "n": 7,
        "titulo": "`this` só existe depois do super()",
        "secao": "PEGADINHAS",
        "codigo": "class Pai { constructor(nome) { this.nome = nome; } }\n\nclass FilhoErrado extends Pai {\n  constructor(nome, cor) {\n    try { this.cor = cor; } catch (e) { console.log('Antes do super:', e.constructor.name); }\n    super(nome);\n    this.cor = cor;                    // agora sim\n  }\n}\n\nconsole.log(new FilhoErrado('TV', 'preta'));\n// Se o filho tem constructor, o `super()` é obrigatório e vem primeiro. Sem constructor\n// próprio, o JS repassa os argumentos para o pai automaticamente."
       },
       {
        "n": 8,
        "titulo": "Campo de classe do filho é atribuído DEPOIS do super()",
        "secao": "PEGADINHAS",
        "codigo": "class Motor {\n  constructor() { this.status = this.descrever(); }   // chama método que o filho sobrescreveu\n  descrever() { return 'motor genérico'; }\n}\n\nclass MotorTurbo extends Motor {\n  potencia = 300;                                     // só existe depois do super() terminar\n  descrever() { return `turbo de ${this.potencia}cv`; }\n}\n\nconsole.log(new MotorTurbo());\nconsole.log('O pai chamou descrever() antes de `potencia` existir — daí o undefined.');"
       }
      ],
      "resumo": [
       "`class Filho extends Pai` liga a cadeia; `super(...)` roda o constructor do pai.",
       "Sem constructor no filho, os argumentos vão direto para o pai.",
       "`super.metodo()` chama a versão do pai de dentro do método sobrescrito.",
       "Método escrito no pai chama a versão sobrescrita do filho — é isso que dá polimorfismo.",
       "`this` só existe depois do `super()`, e campos do filho são atribuídos depois dele."
      ]
     },
     {
      "slug": "03-sobrescrever-metodos",
      "arquivo": "JS/src/08-classes/03-sobrescrever-metodos.js",
      "comando": "node src/08-classes/03-sobrescrever-metodos.js",
      "titulo": "Sobrescrever métodos do pai",
      "sessao": 8,
      "oQueE": "escrever no filho um método com o MESMO nome do pai. Não existe palavra-chave: o nome igual já basta, porque a busca para no primeiro que encontrar na cadeia.",
      "quandoUsar": "quando o filho faz a mesma coisa de um jeito diferente — frete grátis, desconto próprio, formato de relatório específico.",
      "quandoNaoUsar": "quando o filho faz algo DIFERENTE do pai. Aí é outro método, com outro nome: nome igual promete comportamento equivalente para quem chama.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Mesmo nome: o filho ganha",
        "secao": "ESSENCIAL",
        "codigo": "class Funcionario {\n  constructor(nome, salario) { this.nome = nome; this.salario = salario; }\n  bonus() { return this.salario * 0.1; }\n}\n\nclass Gerente extends Funcionario {\n  bonus() { return this.salario * 0.3; }        // mesmo nome, regra própria\n}\n\nconsole.log('Funcionário:', new Funcionario('Ana', 5000).bonus());\nconsole.log('Gerente:    ', new Gerente('Bruno', 5000).bonus());\nconsole.log('O pai continua com a regra dele — nada foi alterado lá.');"
       },
       {
        "n": 2,
        "titulo": "Aproveitar o do pai com super",
        "secao": "ESSENCIAL",
        "codigo": "class Item {\n  constructor(nome, preco) { this.nome = nome; this.preco = preco; }\n  etiqueta() { return `${this.nome}: R$ ${this.preco.toFixed(2)}`; }\n}\n\nclass ItemPromocional extends Item {\n  constructor(nome, preco, validade) { super(nome, preco); this.validade = validade; }\n  etiqueta() { return `${super.etiqueta()} (até ${this.validade})`; }   // reaproveita e acrescenta\n}\n\nconsole.log(new ItemPromocional('Fone', 199, '30/09').etiqueta());\nconsole.log(new Item('Fone', 199).etiqueta());"
       },
       {
        "n": 3,
        "titulo": "Quem decide é o objeto, na hora da chamada",
        "secao": "ESSENCIAL",
        "codigo": "class Animal {\n  som() { return '...'; }\n  apresentar() { return `Eu faço: ${this.som()}`; }   // escrito UMA vez, no pai\n}\n\nclass Cachorro extends Animal { som() { return 'au au'; } }\nclass Gato extends Animal { som() { return 'miau'; } }\n\nfor (const bicho of [new Animal(), new Cachorro(), new Gato()]) console.log(bicho.apresentar());\n// `apresentar` não sabe quais filhos existem. Ele chama `this.som()` e o objeto responde."
       },
       {
        "n": 4,
        "titulo": "Sobrescrever toString, herdado de Object",
        "secao": "NA PRÁTICA",
        "codigo": "class Produto {\n  constructor(nome, preco) { this.nome = nome; this.preco = preco; }\n  toString() { return `${this.nome} — R$ ${this.preco.toFixed(2)}`; }\n}\n\nconst caneca = new Produto('Caneca', 15);\n\nconsole.log(`${caneca}`);                       // template usa o toString automaticamente\nconsole.log('Sem sobrescrever seria:', {}.toString());"
       },
       {
        "n": 5,
        "titulo": "Regra de negócio por tipo",
        "secao": "NA PRÁTICA",
        "codigo": "class Assinatura {\n  constructor(cliente, valor) { this.cliente = cliente; this.valor = valor; }\n  desconto() { return 0; }\n  cobrar() { return `${this.cliente}: R$ ${(this.valor - this.desconto()).toFixed(2)}`; }\n}\n\nclass Anual extends Assinatura { desconto() { return this.valor * 0.2; } }\nclass Estudante extends Assinatura { desconto() { return this.valor * 0.5; } }\n\nfor (const a of [new Assinatura('Ana', 100), new Anual('Bruno', 100), new Estudante('Carla', 100)]) {\n  console.log(a.cobrar());\n}\n// Nasceu um plano novo? Crie a subclasse. `cobrar` não muda uma linha."
       },
       {
        "n": 6,
        "titulo": "Acrescentar sem substituir",
        "secao": "NA PRÁTICA",
        "codigo": "class Repositorio {\n  salvar(registro) { return `gravado: ${JSON.stringify(registro)}`; }\n}\n\nclass RepositorioComLog extends Repositorio {\n  salvar(registro) {\n    console.log('[log] salvando', registro.id);   // faz o extra...\n    return super.salvar(registro);                // ...e delega o trabalho real\n  }\n}\n\nconsole.log(new RepositorioComLog().salvar({ id: 7, nome: 'Ana' }));"
       },
       {
        "n": 7,
        "titulo": "Nome errado não avisa nada",
        "secao": "PEGADINHAS",
        "codigo": "class Pai {\n  calcular() { return 'cálculo do pai'; }\n}\n\nclass FilhoComTypo extends Pai {\n  calcularr() { return 'cálculo do filho'; }      // dois \"r\": criou um método NOVO\n}\n\nconst filho = new FilhoComTypo();\n\nconsole.log(filho.calcular());                    // continua vindo do pai, calado\nconsole.log('Métodos do filho:', Object.getOwnPropertyNames(FilhoComTypo.prototype));\n// O JS não tem @Override: nome errado vira método novo em vez de erro."
       },
       {
        "n": 8,
        "titulo": "Mudar a assinatura quebra quem chama pelo pai",
        "secao": "PEGADINHAS",
        "codigo": "class Notificador {\n  enviar(mensagem) { return `enviando: ${mensagem}`; }\n}\n\nclass NotificadorSMS extends Notificador {\n  enviar(numero, mensagem) { return `SMS para ${numero}: ${mensagem}`; }   // exige 2 argumentos\n}\n\nfunction despachar(notificador) { return notificador.enviar('pedido aprovado'); }\n\nconsole.log(despachar(new Notificador()));\nconsole.log(despachar(new NotificadorSMS()));     // o segundo argumento nunca chega\nconsole.log('Sobrescreveu? Mantenha os mesmos parâmetros e o mesmo tipo de retorno.');"
       }
      ],
      "resumo": [
       "Mesmo nome no filho substitui o do pai — sem palavra-chave, é só o nome.",
       "A busca para no primeiro que achar: filho, depois pai, depois acima.",
       "`super.metodo()` chama a versão do pai de dentro da sobrescrita.",
       "Método do pai que chama `this.outro()` executa a versão do filho: é o polimorfismo.",
       "Nome errado cria método novo sem aviso, e assinatura diferente quebra quem usa o pai."
      ]
     },
     {
      "slug": "04-metodos-estaticos",
      "arquivo": "JS/src/08-classes/04-metodos-estaticos.js",
      "comando": "node src/08-classes/04-metodos-estaticos.js",
      "titulo": "Métodos de instância e estáticos",
      "sessao": 9,
      "oQueE": "método de instância pertence ao objeto criado com `new` e enxerga os dados dele; método `static` pertence à CLASSE, roda sem instanciar e não vê `this.nome` nenhum.",
      "quandoUsar": "`static` para o que é do tipo, não do objeto — validar, formatar, contar, e criar instâncias a partir de outro formato.",
      "quandoNaoUsar": "`static` quando o comportamento depende dos dados de um objeto específico.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Um pertence ao objeto, o outro à classe",
        "secao": "ESSENCIAL",
        "codigo": "class Temperatura {\n  constructor(celsius) { this.celsius = celsius; }\n  emFahrenheit() { return this.celsius * 1.8 + 32; }        // instância: usa this.celsius\n  static celsiusParaF(c) { return c * 1.8 + 32; }           // estático: recebe tudo por parâmetro\n}\n\nconsole.log('Sem instanciar:', Temperatura.celsiusParaF(30));\nconsole.log('Com instância: ', new Temperatura(30).emFahrenheit());"
       },
       {
        "n": 2,
        "titulo": "O estático não tem acesso aos dados da instância",
        "secao": "ESSENCIAL",
        "codigo": "class Produto {\n  constructor(nome) { this.nome = nome; }\n  daInstancia() { return `instância: ${this.nome}`; }\n  static daClasse() { return `estático: ${this.name} (e this.nome é ${this.nome})`; }\n}\n\nconsole.log(new Produto('Caneca').daInstancia());\nconsole.log(Produto.daClasse());        // `this` é a classe: tem `name`, não tem `nome` de objeto\nconsole.log('Dentro do static, this é a classe — não existe objeto para consultar.');"
       },
       {
        "n": 3,
        "titulo": "Campo estático: valor único, da classe inteira",
        "secao": "ESSENCIAL",
        "codigo": "class Pedido {\n  static taxa = 0.05;                                       // um valor para todos\n  static criados = 0;\n\n  constructor(valor) {\n    this.valor = valor;\n    Pedido.criados++;                                       // conta na classe, não no objeto\n  }\n  totalComTaxa() { return this.valor * (1 + Pedido.taxa); }\n}\n\nconst primeiro = new Pedido(100);\nnew Pedido(200);\n\nconsole.log('Taxa da casa:', Pedido.taxa, '| pedidos criados:', Pedido.criados);\nconsole.log('Total do primeiro com taxa:', primeiro.totalComTaxa());"
       },
       {
        "n": 4,
        "titulo": "Construtor alternativo com nome",
        "secao": "NA PRÁTICA",
        "codigo": "class Usuario {\n  constructor(nome, email) { this.nome = nome; this.email = email; }\n\n  static deJSON(texto) {                                    // Usuario.deJSON(...) explica sozinho\n    const { nome, email } = JSON.parse(texto);\n    return new Usuario(nome, email);\n  }\n  static anonimo() { return new Usuario('Visitante', 'sem@email.com'); }\n}\n\nconsole.log(Usuario.deJSON('{\"nome\":\"Ana\",\"email\":\"ana@empresa.com\"}'));\nconsole.log(Usuario.anonimo());\n// O constructor é um só; estáticos dão vários \"jeitos de nascer\", cada um com nome claro."
       },
       {
        "n": 5,
        "titulo": "Validar antes de existir objeto",
        "secao": "NA PRÁTICA",
        "codigo": "class Cpf {\n  constructor(numero) {\n    if (!Cpf.valido(numero)) throw new Error('CPF inválido');\n    this.numero = Cpf.formatar(numero);\n  }\n  static valido(numero) { return String(numero).replace(/\\D/g, '').length === 11; }\n  static formatar(numero) {\n    const d = String(numero).replace(/\\D/g, '');\n    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;\n  }\n}\n\nconsole.log('Checagem no formulário:', Cpf.valido('123'), Cpf.valido('12345678900'));\nconsole.log(new Cpf('12345678900'));\n// A validação roda ANTES de existir objeto — por isso precisa ser estática."
       },
       {
        "n": 6,
        "titulo": "A classe guardando o registro de tudo",
        "secao": "NA PRÁTICA",
        "codigo": "class Sessao {\n  static ativas = [];\n\n  constructor(usuario) { this.usuario = usuario; Sessao.ativas.push(this); }\n  encerrar() { Sessao.ativas = Sessao.ativas.filter((s) => s !== this); }\n\n  static quantas() { return Sessao.ativas.length; }\n}\n\nconst s1 = new Sessao('Ana');\nnew Sessao('Bruno');\ns1.encerrar();\n\nconsole.log('Sessões ativas:', Sessao.quantas(), Sessao.ativas.map((s) => s.usuario));"
       },
       {
        "n": 7,
        "titulo": "Cada um só responde no seu lugar",
        "secao": "PEGADINHAS",
        "codigo": "class Relatorio {\n  constructor(titulo) { this.titulo = titulo; }\n  gerar() { return `gerando ${this.titulo}`; }\n  static formatos() { return ['pdf', 'csv']; }\n}\n\nconst r = new Relatorio('Vendas');\n\nconsole.log(r.gerar(), '|', Relatorio.formatos());\n\ntry { r.formatos(); } catch (e) { console.log('Estático pela instância:', e.message); }\ntry { Relatorio.gerar(); } catch (e) { console.log('Instância pela classe:', e.message); }"
       },
       {
        "n": 8,
        "titulo": "Estáticos são herdados, e `this` é quem chamou",
        "secao": "PEGADINHAS",
        "codigo": "class Base {\n  static criar() { return new this('feito por ' + this.name); }   // `this` = a classe da chamada\n  constructor(origem) { this.origem = origem; }\n}\n\nclass Especial extends Base {}\n\nconsole.log(Base.criar());\nconsole.log(Especial.criar(), '| virou Especial?', Especial.criar() instanceof Especial);\n\nconst solto = Base.criar;\ntry { solto(); } catch (e) { console.log('Método estático solto:', e.constructor.name); }\n// Tirou o método da classe? Perdeu o `this`, igual acontece com método de instância."
       }
      ],
      "resumo": [
       "Método de instância precisa de `new` e enxerga os dados daquele objeto.",
       "`static` pertence à classe: roda sem instanciar e não tem dados de instância para ler.",
       "Dentro de um `static`, `this` é a própria classe — útil para campos estáticos.",
       "Os usos clássicos: validar, formatar, contar e criar instância a partir de outro formato.",
       "Estático não é chamado pela instância nem instância pela classe — cada um no seu lugar."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "Node",
  "titulo": "Node",
  "selo": "N",
  "subtitulo": "JavaScript no servidor",
  "ordem": 2,
  "cor": "#6ee7a8",
  "resumo": "A mesma linguagem, fora do navegador: módulos, npm, arquivos, Express, MongoDB e sessão. Aqui o JavaScript ganha porta, rota e banco de dados.",
  "depoisDe": "JS",
  "exigencia": "Continua o curso de JavaScript. A linguagem é a mesma — o que muda é onde ela roda e o que ela passa a alcançar: disco, rede e banco de dados.",
  "temas": [
   {
    "slug": "01-modulos",
    "titulo": "Módulos",
    "icone": "▤",
    "cor": "#6ee7a8",
    "resumo": "Quebrar o programa em arquivos: require, module.exports e os módulos internos.",
    "topicos": [
     {
      "slug": "01-commonjs-vs-esm",
      "arquivo": "Node/src/01-modulos/01-commonjs-vs-esm.js",
      "comando": "node src/01-modulos/01-commonjs-vs-esm.js",
      "titulo": "CommonJS vs ES Modules",
      "sessao": 1,
      "oQueE": "os dois jeitos de quebrar um programa em arquivos. CommonJS (`require` / `module.exports`) é o formato original do Node; ES Modules (`import` / `export`) é o formato oficial da linguagem.",
      "quandoUsar": "CommonJS quando o projeto já é CommonJS — é o padrão de todo curso e tutorial de Node/Express. ES Modules em projeto novo seu.",
      "quandoNaoUsar": "nunca os dois no MESMO arquivo. Node escolhe UM formato por arquivo, e misturar `import` com `module.exports` quebra na hora.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "As duas sintaxes, lado a lado",
        "secao": "ESSENCIAL",
        "codigo": "const formas = [\n  ['importar tudo', \"const express = require('express')\", \"import express from 'express'\"],\n  ['importar um pedaço', \"const { Router } = require('express')\", \"import { Router } from 'express'\"],\n  ['exportar um valor', 'module.exports = route', 'export default route'],\n  ['exportar vários', 'exports.paginaInicial = fn', 'export const paginaInicial = fn'],\n];\n\nconsole.log('                     CommonJS (require)              ES Modules (import)');\nfor (const [oQue, cjs, esm] of formas) console.log(oQue.padEnd(20), cjs.padEnd(36), esm);\nconsole.log('\\nNode entende os DOIS. O que ele NÃO aceita é os dois no mesmo arquivo.');"
       },
       {
        "n": 2,
        "titulo": "module.exports é o que o require devolve",
        "secao": "ESSENCIAL",
        "codigo": "const { writeFileSync, mkdtempSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst pasta = mkdtempSync(join(tmpdir(), 'modulos-'));\nwriteFileSync(join(pasta, 'frete.js'), `\n  const TAXA = 12.5;                       // privado: só existe dentro deste arquivo\n  function calcular(peso) { return peso * TAXA; }\n  module.exports = { calcular };           // só isto sai do arquivo\n`);\n\nconst frete = require(join(pasta, 'frete.js'));\nconsole.log('Frete de 3kg:', frete.calcular(3));\nconsole.log('A TAXA vazou para fora?', frete.TAXA);   // undefined — cada arquivo é um escopo"
       },
       {
        "n": 3,
        "titulo": "Ligar ES Modules no Node hoje NÃO precisa de Babel",
        "secao": "ESSENCIAL",
        "codigo": "const { writeFileSync: escrever, mkdtempSync: criarPasta } = require('node:fs');\nconst { join: caminho } = require('node:path');\nconst { tmpdir: temp } = require('node:os');\nconst { execFileSync } = require('node:child_process');\n\nconst dir = criarPasta(caminho(temp(), 'esm-'));\n// Basta a extensão .mjs (ou \"type\": \"module\" no package.json) — Node já roda ES Modules sozinho.\nescrever(caminho(dir, 'desconto.mjs'), `\n  export function aplicar(valor) { return valor * 0.9; }\n`);\nescrever(caminho(dir, 'main.mjs'), `\n  import { aplicar } from './desconto.mjs';\n  console.log('Preço com 10% off:', aplicar(200));\n`);\n\nconsole.log(execFileSync('node', [caminho(dir, 'main.mjs')], { encoding: 'utf8' }).trim());\nconsole.log('Rodou ES Modules sem transpilador nenhum.');"
       },
       {
        "n": 4,
        "titulo": "O trio do Express, montado em três arquivos de verdade",
        "secao": "NA PRÁTICA",
        "codigo": "const express = require('express');\nconst { writeFileSync: por, mkdirSync: criarPasta2, mkdtempSync: novoProjeto, rmSync } = require('node:fs');\nconst { join: ligar } = require('node:path');\n\n// A pasta nasce ao lado deste arquivo (e não em /tmp) para que o `require('express')` lá\n// dentro ache o node_modules do projeto — é assim que o Node procura: subindo as pastas.\nconst projeto = novoProjeto(ligar(__dirname, 'tmp-trio-'));\ncriarPasta2(ligar(projeto, 'controllers'));\n\npor(ligar(projeto, 'controllers', 'homeController.js'), `\n  exports.paginaInicial = (req, res) => res.send('página inicial');   // atalho de module.exports.x\n`);\npor(ligar(projeto, 'routes.js'), `\n  const express = require('express');\n  const route = express.Router();\n  const HomeController = require('./controllers/homeController.js');\n\n  route.get('/', HomeController.paginaInicial);\n  module.exports = route;                       // é ISTO que o server.js recebe\n`);\n\nconst app = express();\napp.use(require(ligar(projeto, 'routes.js')));   // no projeto: require('./routes.js')\n\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}/`;\n  console.log('GET / →', await fetch(url).then((r) => r.text()));\n  console.log('Três arquivos, um `require` cada, e o Express montado.');\n  servidor.close();\n  rmSync(projeto, { recursive: true });          // limpa a pasta de exemplo\n});"
       },
       {
        "n": 5,
        "titulo": "O mesmo trio em ES Modules",
        "secao": "NA PRÁTICA",
        "codigo": "const trio = [\n  ['controllers/homeController.js', 'exports.paginaInicial = fn', 'export const paginaInicial = fn'],\n  ['routes.js (importar)', \"require('./controllers/homeController.js')\",\n    \"import { paginaInicial } from './controllers/homeController.js'\"],\n  ['routes.js (exportar)', 'module.exports = route', 'export default route'],\n  ['server.js', \"const routes = require('./routes.js')\", \"import routes from './routes.js'\"],\n];\n\nfor (const [arquivo, cjs, esm] of trio) {\n  console.log(arquivo);\n  console.log('   CJS:', cjs);\n  console.log('   ESM:', esm);\n}\nconsole.log('\\nExige \"type\": \"module\" no package.json — e a extensão .js no import é OBRIGATÓRIA.');"
       },
       {
        "n": 6,
        "titulo": "Misturar os dois no mesmo arquivo quebra",
        "secao": "PEGADINHAS",
        "codigo": "const { writeFileSync: gravar, mkdtempSync: novaPasta } = require('node:fs');\nconst { join: unir } = require('node:path');\nconst { tmpdir: tmp } = require('node:os');\nconst { execFileSync: rodar } = require('node:child_process');\n\nconst misto = novaPasta(unir(tmp(), 'misto-'));\ngravar(unir(misto, 'routes.js'), `\n  import algo from 'node:path';   // um único import já marca o arquivo como ES Module...\n  module.exports = { rota: '/' }; // ...e aí \"module\" não existe mais aqui dentro\n`);\ngravar(unir(misto, 'server.js'), `const routes = require('./routes.js');`);\n\ntry {\n  rodar('node', [unir(misto, 'server.js')], { encoding: 'utf8', stdio: 'pipe' });\n} catch (erro) {\n  console.log('Erro:', erro.stderr.split('\\n').find((l) => l.includes('Error')));\n}\n// ReferenceError: module is not defined in ES module scope.\n// Um `import` perdido no meio de um arquivo CommonJS derruba o servidor inteiro."
       },
       {
        "n": 7,
        "titulo": "`exports = algo` não exporta nada",
        "secao": "PEGADINHAS",
        "codigo": "const { writeFileSync: salvar, mkdtempSync: abrirPasta } = require('node:fs');\nconst { join: montar } = require('node:path');\nconst { tmpdir: pastaTemp } = require('node:os');\n\nconst base = abrirPasta(montar(pastaTemp(), 'exports-'));\nsalvar(montar(base, 'errado.js'), `exports = { total: 99 };`);            // reatribuiu a variável\nsalvar(montar(base, 'certo.js'), `module.exports = { total: 99 };`);      // trocou o que sai do arquivo\n\nconsole.log('Com `exports = {...}`:', require(montar(base, 'errado.js')));   // {} — vazio\nconsole.log('Com `module.exports = {...}`:', require(montar(base, 'certo.js')));\n// `exports` é só um apelido para `module.exports`. Reatribuir o apelido não muda o original.\n// Por isso `exports.paginaInicial = fn` funciona, mas `exports = fn` não."
       }
      ],
      "resumo": [
       "CommonJS (`require`/`module.exports`) é o formato ORIGINAL do Node — é o que você vê",
       "em todo curso de Express, e não tem nada a ver com navegador.",
       "Navegador é o contrário: entende `import`/`export` com `<script type=\"module\">` e não",
       "entende `require` sem um bundler (Vite, webpack).",
       "Babel não é mais necessário para ESM no Node: use `.mjs` ou `\"type\": \"module\"`.",
       "Um arquivo é CommonJS OU ES Module — nunca os dois. Misturar dá ReferenceError.",
       "Em ESM a extensão no import é obrigatória: `'./routes.js'`, não `'./routes'`.",
       "`exports.x = fn` funciona; `exports = fn` não — só `module.exports` troca a saída."
      ]
     }
    ]
   },
   {
    "slug": "02-npm",
    "titulo": "npm",
    "icone": "⬢",
    "cor": "#f2c14e",
    "resumo": "package.json, dependências e scripts.",
    "topicos": [
     {
      "slug": "01-package-json",
      "arquivo": "Node/src/02-npm/01-package-json.js",
      "comando": "node src/02-npm/01-package-json.js",
      "titulo": "package.json — a identidade do projeto",
      "sessao": 1,
      "oQueE": "o arquivo que diz o nome do projeto, quais pacotes ele precisa e quais comandos ele sabe rodar. É criado com `npm init -y`.",
      "quandoUsar": "em todo projeto Node. Sem ele não existe `npm install`, nem `npm start`, nem como outra pessoa reproduzir o seu ambiente.",
      "quandoNaoUsar": "em um script solto de uma linha que só usa módulos internos do Node — aí basta o arquivo .js.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O que `npm init -y` cria",
        "secao": "ESSENCIAL",
        "codigo": "const pacote = {\n  name: 'aula-express',        // nome da pasta, em minúsculas e sem espaço\n  version: '1.0.0',\n  main: 'server.js',           // arquivo de entrada do projeto\n  scripts: { test: 'echo \"Error: no test specified\" && exit 1' },\n  license: 'ISC',\n};\n\nconsole.log('Entra no projeto:', Object.keys(pacote).join(', '));\nconsole.log('Ponto de partida:', pacote.main);\n// `npm init -y` aceita tudo no padrão. Sem o -y, o npm pergunta campo por campo."
       },
       {
        "n": 2,
        "titulo": "`npm install express` mexe em três lugares",
        "secao": "ESSENCIAL",
        "codigo": "console.log('1. node_modules/  → o código do pacote baixado (nunca vai para o git)');\nconsole.log('2. package.json   → a lista do que o projeto precisa, com a faixa de versão');\nconsole.log('3. package-lock.json → a versão EXATA que foi instalada hoje');\n// Quem clona o projeto roda `npm install` e o npm remonta o node_modules a partir desses dois."
       },
       {
        "n": 3,
        "titulo": "O package.json é lido como um objeto qualquer",
        "secao": "ESSENCIAL",
        "codigo": "const { writeFileSync, mkdtempSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst projeto = mkdtempSync(join(tmpdir(), 'npm-'));\nwriteFileSync(join(projeto, 'package.json'), JSON.stringify({\n  name: 'loja',\n  version: '2.1.0',\n  dependencies: { express: '^5.2.1', ejs: '^6.0.1' },\n}, null, 2));\n\nconst config = require(join(projeto, 'package.json'));   // require entende .json direto\nconsole.log('Projeto:', config.name, 'v' + config.version);\nconsole.log('Depende de:', Object.keys(config.dependencies).join(' + '));"
       },
       {
        "n": 4,
        "titulo": "O package.json de um projeto Express de verdade",
        "secao": "NA PRÁTICA",
        "codigo": "const real = {\n  name: '06-webpack-e-middleware',\n  private: true,                                    // trava publicação acidental no npm\n  main: 'server.js',\n  scripts: { start: 'nodemon server.js', build: 'webpack --mode production' },\n  browserslist: ['> 0.5%', 'last 2 versions', 'not dead'],   // lido pelo Babel, não pelo npm\n  dependencies: { express: '^5.2.1', ejs: '^6.0.1', mongoose: '^9.9.3' },\n  devDependencies: { nodemon: '^3.1.14', webpack: '^5.109.2' },\n};\n\nfor (const [campo, valor] of Object.entries(real)) {\n  const resumo = Array.isArray(valor) ? valor.join(', ')\n    : typeof valor === 'object' ? Object.keys(valor).join(', ') : String(valor);\n  console.log(campo.padEnd(16), '→', resumo);\n}\n// Outras ferramentas também leem daqui: o Babel lê `browserslist`, o Node lê `type`."
       },
       {
        "n": 5,
        "titulo": "`\"type\": \"module\"` troca o formato do projeto inteiro",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('Sem \"type\"            → todo .js do projeto é CommonJS (require)');\nconsole.log('\"type\": \"module\"      → todo .js do projeto é ES Module (import)');\nconsole.log('Extensão vence sempre → .cjs é CommonJS, .mjs é ES Module, doa a quem doer');\n// É por isso que um curso de Express costuma usar require: o package.json não tem \"type\"."
       },
       {
        "n": 6,
        "titulo": "Instalar sem package.json",
        "secao": "PEGADINHAS",
        "codigo": "const { mkdtempSync: novaPasta } = require('node:fs');\nconst { join: unir } = require('node:path');\nconst { tmpdir: temp } = require('node:os');\nconst { existsSync } = require('node:fs');\n\nconst vazia = novaPasta(unir(temp(), 'sem-pkg-'));\nconsole.log('Tem package.json?', existsSync(unir(vazia, 'package.json')));\n// Rodar `npm install express` aqui baixa o pacote, mas NÃO registra a dependência em lugar\n// nenhum. Quem clonar a pasta não tem como saber que o projeto precisa do express.\n// Regra: `npm init -y` PRIMEIRO, instalar depois."
       },
       {
        "n": 7,
        "titulo": "node_modules não vai para o repositório",
        "secao": "PEGADINHAS",
        "codigo": "console.log('.gitignore de todo projeto Node:');\nconsole.log(['node_modules/', '.env'].join('\\n'));\n// A pasta tem milhares de arquivos e é 100% reconstruível com `npm install`.\n// O que precisa ir para o git é o par package.json + package-lock.json."
       }
      ],
      "resumo": [
       "`npm init -y` cria o package.json — faça isso antes do primeiro install.",
       "package.json guarda a FAIXA de versão; package-lock.json guarda a versão EXATA.",
       "Os dois vão para o git; node_modules nunca vai — é reconstruído com `npm install`.",
       "`main` diz o arquivo de entrada; `scripts` diz os comandos; `private: true` evita",
       "publicar sem querer.",
       "Outras ferramentas leem o package.json: Babel lê `browserslist`, Node lê `type`."
      ]
     },
     {
      "slug": "02-scripts-e-nodemon",
      "arquivo": "Node/src/02-npm/02-scripts-e-nodemon.js",
      "comando": "node src/02-npm/02-scripts-e-nodemon.js",
      "titulo": "Scripts do npm e o nodemon",
      "sessao": 1,
      "oQueE": "`scripts` é a lista de comandos do projeto. `npm start` roda o servidor; o nodemon é o programa que reinicia esse servidor sozinho a cada save.",
      "quandoUsar": "sempre. Um comando curto (`npm start`) no lugar de decorar a linha inteira, e o nodemon durante todo o desenvolvimento.",
      "quandoNaoUsar": "nodemon em produção — lá o processo sobe uma vez e fica de pé (`node server.js`, ou um gerenciador como o pm2).",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Um script é um apelido para uma linha de terminal",
        "secao": "ESSENCIAL",
        "codigo": "const scripts = {\n  start: 'nodemon server.js',\n  build: 'webpack --mode production',\n  dev: 'webpack --mode development --watch',\n};\n\nfor (const [nome, comando] of Object.entries(scripts)) {\n  console.log(`npm run ${nome}`.padEnd(14), '→', comando);\n}\nconsole.log('\\n`start` e `test` dispensam o \"run\": `npm start` já funciona.');"
       },
       {
        "n": 2,
        "titulo": "O que o nodemon resolve",
        "secao": "ESSENCIAL",
        "codigo": "console.log('Sem nodemon: salvou o arquivo → Ctrl+C → node server.js → recarrega o navegador');\nconsole.log('Com nodemon: salvou o arquivo → o servidor já reiniciou sozinho');\n// Instalação: npm install --save-dev nodemon  (é ferramenta de desenvolvimento, vai em devDependencies)\n// E no package.json:  \"start\": \"nodemon server.js\""
       },
       {
        "n": 3,
        "titulo": "Scripts enxergam os binários de node_modules/.bin",
        "secao": "ESSENCIAL",
        "codigo": "console.log('No terminal:  nodemon server.js  → \"command not found\" (não está instalado global)');\nconsole.log('Em um script: nodemon server.js  → funciona, o npm põe node_modules/.bin no PATH');\nconsole.log('Fora do script, o equivalente é: npx nodemon server.js');\n// Por isso não é preciso instalar nada com -g: o pacote local basta."
       },
       {
        "n": 4,
        "titulo": "Simulando o ciclo do nodemon com fs.watch",
        "secao": "NA PRÁTICA",
        "codigo": "const { writeFileSync, mkdtempSync, watch } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst pasta = mkdtempSync(join(tmpdir(), 'nodemon-'));\nconst arquivo = join(pasta, 'server.js');\nwriteFileSync(arquivo, 'console.log(\"v1\");');\n\nconst vigia = watch(arquivo, () => {\n  console.log('[nodemon] restarting due to changes...');   // é literalmente esta a mensagem dele\n  vigia.close();\n});\n\nsetTimeout(() => writeFileSync(arquivo, 'console.log(\"v2\");'), 30);   // simula o Ctrl+S\n// O nodemon faz isto para a pasta inteira, e em vez de logar, mata e sobe o processo de novo."
       },
       {
        "n": 5,
        "titulo": "Ignorar pastas que o próprio build gera",
        "secao": "NA PRÁTICA",
        "codigo": "const { watch: vigiar, writeFileSync: gravar, mkdirSync: criar, mkdtempSync: novaPasta } = require('node:fs');\nconst { join: unir, relative } = require('node:path');\nconst { tmpdir: temp } = require('node:os');\n\nconst projeto = novaPasta(unir(temp(), 'ignore-'));\ncriar(unir(projeto, 'public'), { recursive: true });\ngravar(unir(projeto, 'server.js'), 'console.log(\"v1\")');\ngravar(unir(projeto, 'public', 'bundle.js'), 'gerado pelo webpack');\n\nconst ignorar = ['public'];                    // \"start\": \"nodemon server.js --ignore public\"\nconst reagir = (arquivo) => {\n  const pasta = relative(projeto, arquivo).split('/')[0];\n  console.log(ignorar.includes(pasta) ? `${pasta}/ mudou → ignorado` : 'server.js mudou → restart');\n};\n\nreagir(unir(projeto, 'server.js'));\nreagir(unir(projeto, 'public', 'bundle.js'));\nconsole.log('Sem o --ignore, o build reescreve public/, o nodemon reinicia, e não para mais.');\n// É o loop infinito clássico de quem roda `npm run dev` e `npm start` ao mesmo tempo."
       },
       {
        "n": 6,
        "titulo": "Dois terminais durante o desenvolvimento",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('Terminal 1 → npm run dev   (webpack --watch: refaz o bundle a cada save no frontend)');\nconsole.log('Terminal 2 → npm start     (nodemon: reinicia o servidor a cada save no src)');\n// São dois vigias diferentes: um cuida do código do navegador, o outro do código do servidor."
       },
       {
        "n": 7,
        "titulo": "`npm run build` não é `npm build`",
        "secao": "PEGADINHAS",
        "codigo": "console.log('npm start / npm test       → atalhos oficiais, funcionam sem o \"run\"');\nconsole.log('npm run build / npm run dev → qualquer outro nome EXIGE o \"run\"');\nconsole.log('npm build                   → Unknown command: \"build\"');\n// O npm não tem comando `build`: sem o `run`, ele nem procura o seu script."
       }
      ],
      "resumo": [
       "`scripts` guarda os comandos do projeto; `npm run <nome>` executa.",
       "Só `start` e `test` dispensam o `run`.",
       "nodemon = reinício automático no desenvolvimento; instale com --save-dev.",
       "Script enxerga node_modules/.bin — não precisa instalar nada com -g.",
       "Use --ignore para pastas geradas (public/), senão o build entra em loop de restart.",
       "Em produção é `node server.js`, sem nodemon."
      ]
     },
     {
      "slug": "03-dependencias-e-versoes",
      "arquivo": "Node/src/02-npm/03-dependencias-e-versoes.js",
      "comando": "node src/02-npm/03-dependencias-e-versoes.js",
      "titulo": "dependencies, devDependencies e versão",
      "sessao": 1,
      "oQueE": "a separação entre o que o projeto precisa para RODAR e o que ele precisa só para CONSTRUIR, mais a notação `^5.2.1` que define a faixa de versão aceita.",
      "quandoUsar": "em toda instalação — decida na hora se é `npm i pacote` ou `npm i -D pacote`.",
      "quandoNaoUsar": "não jogue tudo em dependencies \"para não errar\": em produção isso baixa webpack, Babel e nodemon sem necessidade.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Os dois comandos e onde cada um grava",
        "secao": "ESSENCIAL",
        "codigo": "console.log('npm install express        → dependencies    (precisa para RODAR)');\nconsole.log('npm install --save-dev nodemon → devDependencies (precisa só para CONSTRUIR)');\nconsole.log('npm install -D nodemon     → -D é o atalho de --save-dev');\nconsole.log('\\nEm produção: npm install --omit=dev  → pula tudo de devDependencies.');"
       },
       {
        "n": 2,
        "titulo": "O teste que decide onde o pacote vai",
        "secao": "ESSENCIAL",
        "codigo": "const pacotes = [\n  { nome: 'express', usadoEmProducao: true },\n  { nome: 'ejs', usadoEmProducao: true },\n  { nome: 'mongoose', usadoEmProducao: true },\n  { nome: 'nodemon', usadoEmProducao: false },\n  { nome: 'webpack', usadoEmProducao: false },\n];\n\nfor (const p of pacotes) {\n  // A pergunta é sempre a mesma: o servidor em produção executa esse código?\n  console.log(p.nome.padEnd(10), '→', p.usadoEmProducao ? 'dependencies' : 'devDependencies');\n}"
       },
       {
        "n": 3,
        "titulo": "Lendo `^5.2.1`",
        "secao": "ESSENCIAL",
        "codigo": "const versao = '5.2.1';\nconst [maior, menor, correcao] = versao.split('.');\nconsole.log(`${maior} MAIOR    → mudou de forma incompatível; pode quebrar seu código`);\nconsole.log(`${menor} MENOR    → ganhou recurso novo, sem quebrar nada`);\nconsole.log(`${correcao} CORREÇÃO → só conserto de bug`);\nconsole.log('\\n^5.2.1 → aceita 5.2.2 e 5.9.0, recusa 6.0.0  (trava o número MAIOR)');\nconsole.log('~5.2.1 → aceita 5.2.9, recusa 5.3.0            (trava também o MENOR)');\nconsole.log(' 5.2.1 → só essa, exatamente');"
       },
       {
        "n": 4,
        "titulo": "O caso que não segue a regra: core-js",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('webpack        → devDependency: roda na SUA máquina, no build');\nconsole.log('babel-loader   → devDependency: idem');\nconsole.log('core-js        → dependency! o Babel injeta esse código DENTRO do bundle.js,');\nconsole.log('                 que é baixado pelo navegador do usuário final');\n// A pergunta certa não é \"é ferramenta?\", é \"esse código chega no produto final?\"."
       },
       {
        "n": 5,
        "titulo": "Para que serve o package-lock.json",
        "secao": "NA PRÁTICA",
        "codigo": "const { writeFileSync, mkdtempSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst pasta = mkdtempSync(join(tmpdir(), 'lock-'));\nwriteFileSync(join(pasta, 'package.json'), JSON.stringify({ dependencies: { express: '^5.2.1' } }));\nwriteFileSync(join(pasta, 'package-lock.json'), JSON.stringify({\n  packages: { 'node_modules/express': { version: '5.2.1', resolved: 'https://registry.npmjs.org/...' } },\n}));\n\nconst lock = require(join(pasta, 'package-lock.json'));\nconsole.log('package.json diz (faixa) :', require(join(pasta, 'package.json')).dependencies.express);\nconsole.log('package-lock diz (exata) :', lock.packages['node_modules/express'].version);\n// Sem o lock, cada colega instalaria uma versão diferente dentro da faixa ^5.2.1 e o bug\n// apareceria só na máquina de um. Por isso o lock VAI para o git."
       },
       {
        "n": 6,
        "titulo": "`npm ci` no lugar de `npm install`",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('npm install → respeita a FAIXA, pode atualizar e reescrever o lock');\nconsole.log('npm ci      → instala EXATAMENTE o lock, apaga node_modules antes. Use em CI/deploy.');"
       },
       {
        "n": 7,
        "titulo": "Instalar com -g não deixa registro no projeto",
        "secao": "PEGADINHAS",
        "codigo": "const { writeFileSync: guardar, mkdtempSync: criarProjeto } = require('node:fs');\nconst { join: caminho } = require('node:path');\nconst { tmpdir: pastaTemp } = require('node:os');\n\nconst clone = criarProjeto(caminho(pastaTemp(), 'global-'));\nguardar(caminho(clone, 'package.json'), JSON.stringify({\n  name: 'meu-site',\n  dependencies: { express: '^5.2.1' },\n  // `npm install -g nodemon` instalou na SUA máquina e não escreveu nada aqui:\n  devDependencies: {},\n}, null, 2));\n\nconst pacote = require(caminho(clone, 'package.json'));\nconsole.log('O colega clona o projeto e roda npm install. Ele recebe:');\nconsole.log('  dependencies   :', Object.keys(pacote.dependencies).join(', ') || '(nada)');\nconsole.log('  devDependencies:', Object.keys(pacote.devDependencies).join(', ') || '(nada)');\nconsole.log('E aí `npm start` quebra: \"nodemon: command not found\".');\n// Funciona no seu computador e em nenhum outro. Instale local e chame por npx."
       }
      ],
      "resumo": [
       "`npm i pacote` = dependencies (roda em produção); `npm i -D pacote` = devDependencies.",
       "O teste é \"esse código chega no produto final?\" — por isso core-js é dependency",
       "mesmo sendo coisa de build.",
       "`^` trava o número MAIOR, `~` trava também o MENOR, sem símbolo é versão exata.",
       "package-lock.json guarda a versão exata e vai para o git; `npm ci` obedece a ele.",
       "Evite -g: instalação local + npx mantém o projeto reproduzível."
      ]
     },
     {
      "slug": "04-variaveis-de-ambiente",
      "arquivo": "Node/src/02-npm/04-variaveis-de-ambiente.js",
      "comando": "node src/02-npm/04-variaveis-de-ambiente.js",
      "titulo": "Variáveis de ambiente e o .env",
      "sessao": 4,
      "oQueE": "`process.env` é o quadro de avisos do sistema operacional para o seu programa. O pacote `dotenv` copia o arquivo `.env` para dentro desse quadro.",
      "quandoUsar": "para tudo que muda entre a sua máquina e o servidor, e para tudo que é segredo: senha do banco, chave de API, segredo da sessão, porta.",
      "quandoNaoUsar": "para configuração que é igual em todo lugar (nome das pastas, rotas) — isso é código, não ambiente.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "process.env é um objeto comum",
        "secao": "ESSENCIAL",
        "codigo": "console.log('Usuário do sistema :', process.env.USER || process.env.USERNAME);\nconsole.log('MINHA_CHAVE existe?:', process.env.MINHA_CHAVE);      // undefined: ninguém definiu\n\nprocess.env.PORT = '3000';                                          // dá para escrever também\nconsole.log('PORT agora         :', process.env.PORT, '←', typeof process.env.PORT);\n// Repare: SEMPRE texto. Não existe número nem booleano em variável de ambiente."
       },
       {
        "n": 2,
        "titulo": "O padrão porta-com-padrão",
        "secao": "ESSENCIAL",
        "codigo": "const porta = process.env.PORT || 3000;   // o servidor de hospedagem define PORT; na sua máquina, 3000\nconsole.log('Servidor subiria em http://localhost:' + porta);\n// É a linha mais copiada de todo projeto Node, e por um bom motivo: o mesmo código roda\n// na sua máquina e no servidor sem editar nada."
       },
       {
        "n": 3,
        "titulo": "O que o dotenv faz, sem mistério",
        "secao": "ESSENCIAL",
        "codigo": "const { writeFileSync, mkdtempSync, readFileSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst pasta = mkdtempSync(join(tmpdir(), 'env-'));\nwriteFileSync(join(pasta, '.env'), [\n  'MONGODB_URI=mongodb+srv://user:senha@cluster.mongodb.net',\n  'SESSION_SECRET=algo-bem-aleatorio',\n].join('\\n'));\n\nfor (const linha of readFileSync(join(pasta, '.env'), 'utf8').split('\\n').filter(Boolean)) {\n  const [chave, ...resto] = linha.split('=');\n  process.env[chave] = resto.join('=');                 // é isto que o dotenv faz: lê e copia\n}\n\nconsole.log('Segredo da sessão  :', process.env.SESSION_SECRET);\nconsole.log('Banco             :', process.env.MONGODB_URI.slice(0, 20) + '...');\n// Na vida real: require('dotenv').config();"
       },
       {
        "n": 4,
        "titulo": "A chamada do dotenv é a PRIMEIRA linha do server.js",
        "secao": "NA PRÁTICA",
        "codigo": "const { writeFileSync: gravar, mkdtempSync: novaPasta } = require('node:fs');\nconst { join: unir } = require('node:path');\nconst { tmpdir: temp } = require('node:os');\n\nconst projeto = novaPasta(unir(temp(), 'ordem-'));\n// src/config/session.js lê process.env no TOPO, na hora em que é carregado:\nconst config = `\n  const segredo = process.env.SEGREDO_DA_SESSAO;   // lido AGORA, quando o arquivo é carregado\n  module.exports = { segredo, ok: Boolean(segredo) };\n`;\ngravar(unir(projeto, 'session.js'), config);\ngravar(unir(projeto, 'session-bis.js'), config);            // o mesmo arquivo, outro nome\n\nconsole.log('require antes do dotenv →', require(unir(projeto, 'session.js')));\n\nprocess.env.SEGREDO_DA_SESSAO = 'algo-bem-aleatorio';       // é o que require('dotenv').config() faz\nconsole.log('require depois do .env  →', require(unir(projeto, 'session-bis.js')));\n// Por isso `require('dotenv').config()` é a linha 1 do server.js: qualquer require acima\n// dele lê process.env vazio e derruba o servidor com \"SESSION_SECRET não encontrada\"."
       },
       {
        "n": 5,
        "titulo": "Falhar cedo quando a variável não existe",
        "secao": "NA PRÁTICA",
        "codigo": "function carregar(nome) {\n  const valor = process.env[nome];\n  if (!valor) throw new Error(`${nome} não encontrada. Confira o arquivo .env na raiz do projeto.`);\n  return valor;\n}\n\nprocess.env.MONGODB_DBNAME = 'cursojs01';\nconsole.log('Banco configurado  :', carregar('MONGODB_DBNAME'));\n\ntry {\n  carregar('MONGODB_URI_QUE_NAO_EXISTE');\n} catch (erro) {\n  console.log('Erro claro na subida:', erro.message);\n}\n// Melhor o servidor nem subir do que subir e falhar na primeira requisição do usuário."
       },
       {
        "n": 6,
        "titulo": "O .env nunca vai para o repositório",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('.gitignore:', ['node_modules/', '.env'].join('  '));\nconsole.log('Vai para o git um .env.example, com as chaves e SEM os valores:');\nconsole.log(['MONGODB_URI=', 'MONGODB_DBNAME=', 'SESSION_SECRET='].join('\\n'));\n// Assim quem clona sabe o que precisa preencher sem receber a sua senha junto."
       },
       {
        "n": 7,
        "titulo": "Tudo é texto",
        "secao": "PEGADINHAS",
        "codigo": "process.env.MODO_DEBUG = 'false';\nprocess.env.MAX_ITENS = '10';\n\nconsole.log('if (env.MODO_DEBUG)   →', Boolean(process.env.MODO_DEBUG), '← string cheia é sempre true');\nconsole.log('env.MODO_DEBUG === \"true\" →', process.env.MODO_DEBUG === 'true');\nconsole.log('Somando sem converter →', process.env.MAX_ITENS + 1);           // \"101\"\nconsole.log('Convertendo antes     →', Number(process.env.MAX_ITENS) + 1);   // 11"
       }
      ],
      "resumo": [
       "`process.env` é a configuração que vem de fora do código; dotenv copia o .env para lá.",
       "`require('dotenv').config()` na PRIMEIRA linha do server.js.",
       "Segredo (senha do banco, SESSION_SECRET) nunca no código: sempre no .env.",
       ".env no .gitignore; .env.example, sem valores, no repositório.",
       "Todo valor é string: compare com === 'true' e converta com Number() antes de somar.",
       "Valide na subida e derrube o processo se faltar algo — erro cedo é erro barato."
      ]
     }
    ]
   },
   {
    "slug": "03-arquivos-com-fs",
    "titulo": "Arquivos com fs",
    "icone": "🗀",
    "cor": "#5ec8d8",
    "resumo": "Ler, escrever e percorrer pastas no disco.",
    "topicos": [
     {
      "slug": "01-path-e-dirname",
      "arquivo": "Node/src/03-arquivos-com-fs/01-path-e-dirname.js",
      "comando": "node src/03-arquivos-com-fs/01-path-e-dirname.js",
      "titulo": "path e __dirname — montar caminhos que não quebram",
      "sessao": 3,
      "oQueE": "`path` é o módulo interno que monta e desmonta caminhos de arquivo; `__dirname` é a pasta onde o arquivo que está rodando mora.",
      "quandoUsar": "toda vez que apontar para uma pasta do projeto — views, public, uploads. É o que o Express pede em `app.set('views', ...)` e `express.static(...)`.",
      "quandoNaoUsar": "para URL do navegador. `/assets/js/bundle.js` na view é caminho de URL, não de disco — path não entra aí.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "join cola pedaços com a barra certa",
        "secao": "ESSENCIAL",
        "codigo": "const path = require('node:path');\n\nconsole.log(path.join('src', 'views', 'index.ejs'));     // src/views/index.ejs no Mac/Linux\nconsole.log(path.join('src', '..', 'public'));           // public — ele resolve o \"..\" sozinho\nconsole.log('Separador deste sistema:', JSON.stringify(path.sep));\n// No Windows sai src\\views\\index.ejs. É por isso que ninguém escreve 'src/views' na mão."
       },
       {
        "n": 2,
        "titulo": "__dirname: a pasta deste arquivo, não a de onde você rodou",
        "secao": "ESSENCIAL",
        "codigo": "console.log('__dirname :', __dirname);      // .../Node/src/03-arquivos-com-fs\nconsole.log('__filename:', __filename);     // .../01-path-e-dirname.js\nconsole.log('cwd       :', process.cwd());  // a pasta do terminal — pode ser QUALQUER uma\n// Rodar `node Node/src/03-arquivos-com-fs/01-path-e-dirname.js` de casa muda o cwd,\n// mas não muda o __dirname. Por isso caminho de projeto sempre parte de __dirname."
       },
       {
        "n": 3,
        "titulo": "resolve devolve caminho absoluto",
        "secao": "ESSENCIAL",
        "codigo": "const { resolve, join, isAbsolute } = require('node:path');\n\nconsole.log('join   :', join('src', 'views'));                  // relativo: src/views\nconsole.log('resolve:', resolve(__dirname, 'src', 'views'));    // absoluto: /Users/.../src/views\nconsole.log('É absoluto?', isAbsolute(resolve(__dirname, 'public')));\n// Regra prática: `join` para juntar pedaços, `resolve(__dirname, ...)` para entregar\n// caminho a uma biblioteca — ela não faz ideia de onde o seu terminal está."
       },
       {
        "n": 4,
        "titulo": "As duas linhas do server.js que usam path",
        "secao": "NA PRÁTICA",
        "codigo": "const { resolve: abs } = require('node:path');\nconst { mkdirSync, writeFileSync, existsSync, mkdtempSync } = require('node:fs');\nconst { tmpdir } = require('node:os');\n\nconst raizDoProjeto = mkdtempSync(abs(tmpdir(), 'projeto-'));   // faz o papel do __dirname\nmkdirSync(abs(raizDoProjeto, 'src', 'views'), { recursive: true });\nwriteFileSync(abs(raizDoProjeto, 'src', 'views', 'index.ejs'), '<h1>oi</h1>');\n\n// server.js:\nconst pastaDeViews = abs(raizDoProjeto, 'src', 'views');        // app.set('views', ...)\nconst pastaPublica = abs(raizDoProjeto, 'public');              // express.static(...)\n\nconsole.log('views  :', pastaDeViews.replace(raizDoProjeto, '<raiz>'));\nconsole.log('public :', pastaPublica.replace(raizDoProjeto, '<raiz>'));\nconsole.log('achou o index.ejs?', existsSync(abs(pastaDeViews, 'index.ejs')));\n// No projeto, `raizDoProjeto` é `__dirname`. Sem ele, o servidor só sobe se você estiver\n// na pasta certa do terminal — e quebra quando o serviço de hospedagem roda de outro lugar."
       },
       {
        "n": 5,
        "titulo": "Desmontando um caminho",
        "secao": "NA PRÁTICA",
        "codigo": "const { basename, extname, dirname } = require('node:path');\nconst arquivo = '/Users/igor/projeto/public/assets/js/bundle.js';\n\nconsole.log('dirname :', dirname(arquivo));    // .../assets/js\nconsole.log('basename:', basename(arquivo));   // bundle.js\nconsole.log('extname :', extname(arquivo));    // .js\nconsole.log('sem ext :', basename(arquivo, '.js'));\n// `basename(arquivo, '.js')` é como se descobre o nome de um tópico a partir do arquivo."
       },
       {
        "n": 6,
        "titulo": "Entrada e saída do webpack, no mesmo projeto",
        "secao": "NA PRÁTICA",
        "codigo": "const { resolve: absoluto } = require('node:path');\nconst raiz = '/Users/igor/projeto';\n\nconsole.log('entry (fonte)  :', './frontend/main.js');\nconsole.log('output (gerado):', absoluto(raiz, 'public', 'assets', 'js'));\nconsole.log('estático servido:', absoluto(raiz, 'public'));\n// A saída do webpack cai DENTRO da pasta que o Express serve. É assim que as duas\n// metades do projeto se encontram."
       },
       {
        "n": 7,
        "titulo": "Barra no começo faz o resolve descartar o resto",
        "secao": "PEGADINHAS",
        "codigo": "const { resolve: montar } = require('node:path');\n\nconsole.log(montar('/Users/igor/projeto', 'public'));    // /Users/igor/projeto/public\nconsole.log(montar('/Users/igor/projeto', '/public'));   // /public  ← perdeu tudo!\n// `resolve` lê da direita para a esquerda e para no primeiro caminho absoluto.\n// A barra no começo, que na URL do navegador significa \"raiz do site\", aqui significa\n// \"raiz do disco\". Nunca comece um pedaço de caminho com barra."
       }
      ],
      "resumo": [
       "`path.join` cola pedaços; `path.resolve` devolve absoluto e é o que se entrega a uma lib.",
       "`__dirname` é a pasta do arquivo; `process.cwd()` é a do terminal — quase nunca iguais.",
       "Todo caminho de projeto começa em `path.resolve(__dirname, ...)`.",
       "`basename`, `extname` e `dirname` desmontam um caminho pronto.",
       "Pedaço começando com \"/\" faz o resolve jogar fora o que veio antes.",
       "Em ESM não existe `__dirname`: use `path.dirname(url.fileURLToPath(import.meta.url))`."
      ]
     },
     {
      "slug": "02-ler-e-escrever",
      "arquivo": "Node/src/03-arquivos-com-fs/02-ler-e-escrever.js",
      "comando": "node src/03-arquivos-com-fs/02-ler-e-escrever.js",
      "titulo": "fs — ler e escrever arquivos",
      "sessao": 3,
      "oQueE": "o módulo interno que mexe no disco: ler arquivo, escrever, listar pasta, apagar.",
      "quandoUsar": "para ler configuração, gravar log, salvar upload, montar relatório em CSV.",
      "quandoNaoUsar": "como banco de dados. Arquivo não tem busca, nem índice, e dois pedidos ao mesmo tempo sobrescrevem um ao outro. Para dados do sistema, MongoDB.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Escrever e ler de volta",
        "secao": "ESSENCIAL",
        "codigo": "const { writeFileSync, readFileSync, mkdtempSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst pasta = mkdtempSync(join(tmpdir(), 'fs-'));\nwriteFileSync(join(pasta, 'clientes.txt'), 'Ana\\nBruno\\nCarla\\n');\n\nconst conteudo = readFileSync(join(pasta, 'clientes.txt'), 'utf8');   // sem 'utf8' vem um Buffer\nconsole.log('Arquivo tem', conteudo.trim().split('\\n').length, 'clientes');\nconsole.log('Primeiro:', conteudo.split('\\n')[0]);"
       },
       {
        "n": 2,
        "titulo": "A versão com Promise é a que você usa no servidor",
        "secao": "ESSENCIAL",
        "codigo": "const { writeFile, readFile } = require('node:fs/promises');\nconst { mkdtempSync: criar } = require('node:fs');\nconst { join: unir } = require('node:path');\nconst { tmpdir: temp } = require('node:os');\n\n(async () => {\n  const dir = criar(unir(temp(), 'fs-async-'));\n  await writeFile(unir(dir, 'pedido.txt'), 'Pedido 42 — R$ 250,00');\n  console.log('Lido com await:', await readFile(unir(dir, 'pedido.txt'), 'utf8'));\n})();\n// `readFileSync` TRAVA o processo inteiro enquanto lê. Em um servidor Express isso\n// significa nenhum outro visitante ser atendido. Sync só na subida do servidor."
       },
       {
        "n": 3,
        "titulo": "Guardar objeto: JSON de ida e de volta",
        "secao": "ESSENCIAL",
        "codigo": "const { writeFileSync: gravar, readFileSync: ler, mkdtempSync: novaPasta } = require('node:fs');\nconst { join: montar } = require('node:path');\nconst { tmpdir: tmp } = require('node:os');\n\nconst base = novaPasta(montar(tmp(), 'json-'));\nconst carrinho = { cliente: 'Ana', itens: [{ nome: 'Teclado', preco: 199.9 }], total: 199.9 };\n\ngravar(montar(base, 'carrinho.json'), JSON.stringify(carrinho, null, 2));   // objeto → texto\nconst devolta = JSON.parse(ler(montar(base, 'carrinho.json'), 'utf8'));     // texto → objeto\n\nconsole.log('Cliente:', devolta.cliente, '| total:', devolta.total.toFixed(2));\nconsole.log('Continua sendo objeto?', typeof devolta.itens[0].preco === 'number');"
       },
       {
        "n": 4,
        "titulo": "Acrescentar linha em um log",
        "secao": "NA PRÁTICA",
        "codigo": "const { appendFileSync, readFileSync: lerLog, mkdtempSync: pastaLog } = require('node:fs');\nconst { join: caminho } = require('node:path');\nconst { tmpdir: temporario } = require('node:os');\n\nconst dirLog = pastaLog(caminho(temporario(), 'log-'));\nconst log = caminho(dirLog, 'acessos.log');\n\nfor (const rota of ['/', '/contato', '/']) {\n  appendFileSync(log, `GET ${rota}\\n`);   // append ACRESCENTA; writeFile APAGA e escreve\n}\nconsole.log(lerLog(log, 'utf8').trim());\n// Trocar appendFileSync por writeFileSync aqui deixaria só a última linha no arquivo."
       },
       {
        "n": 5,
        "titulo": "Listar uma pasta e filtrar por extensão",
        "secao": "NA PRÁTICA",
        "codigo": "const { readdirSync, writeFileSync: salvar, mkdtempSync: abrir } = require('node:fs');\nconst { join: juntar, extname } = require('node:path');\nconst { tmpdir: pastaTemp } = require('node:os');\n\nconst views = abrir(juntar(pastaTemp(), 'views-'));\nfor (const nome of ['index.ejs', 'contato.ejs', 'style.css']) salvar(juntar(views, nome), '');\n\nconst templates = readdirSync(views).filter((f) => extname(f) === '.ejs');\nconsole.log('Templates encontrados:', templates.join(', '));\n// É assim que o gerador do site deste curso acha os arquivos de cada tema."
       },
       {
        "n": 6,
        "titulo": "Criar a pasta antes de escrever",
        "secao": "NA PRÁTICA",
        "codigo": "const { mkdirSync, writeFileSync: escrever, existsSync, mkdtempSync: raiz } = require('node:fs');\nconst { join: ligar } = require('node:path');\nconst { tmpdir: t } = require('node:os');\n\nconst projeto = raiz(ligar(t(), 'uploads-'));\nconst destino = ligar(projeto, 'public', 'uploads', '2026');\n\nmkdirSync(destino, { recursive: true });   // recursive cria a árvore inteira e não reclama se já existe\nescrever(ligar(destino, 'nota.txt'), 'ok');\nconsole.log('Pasta criada e arquivo gravado?', existsSync(ligar(destino, 'nota.txt')));\n// Sem o mkdir, writeFile estoura com ENOENT: ele cria arquivo, nunca pasta."
       },
       {
        "n": 7,
        "titulo": "Arquivo que não existe: try/catch obrigatório",
        "secao": "PEGADINHAS",
        "codigo": "const { readFileSync: tentarLer } = require('node:fs');\n\ntry {\n  tentarLer('/caminho/que/nao/existe.txt', 'utf8');\n} catch (erro) {\n  console.log('Código do erro:', erro.code);          // ENOENT = Error NO ENTry\n  console.log('Tratado, o servidor continua de pé.');\n}\n// Sem o try/catch, essa linha derruba o processo inteiro. Um arquivo sumido não pode\n// tirar o servidor do ar."
       }
      ],
      "resumo": [
       "`readFileSync(caminho, 'utf8')` para ler texto — sem o 'utf8' vem Buffer.",
       "No servidor use `node:fs/promises` com await; Sync só na subida.",
       "Objeto vira arquivo com `JSON.stringify` e volta com `JSON.parse`.",
       "`appendFileSync` acrescenta; `writeFileSync` apaga o que estava lá.",
       "`mkdirSync(caminho, { recursive: true })` antes de escrever em pasta nova.",
       "Ler arquivo que não existe lança ENOENT; e fs não é banco: sem busca, índice ou disputa."
      ]
     }
    ]
   },
   {
    "slug": "04-express",
    "titulo": "Express",
    "icone": "⇄",
    "cor": "#b48ef0",
    "resumo": "Servidor, rotas, views e middlewares.",
    "topicos": [
     {
      "slug": "01-servidor-e-rotas",
      "arquivo": "Node/src/04-express/01-servidor-e-rotas.js",
      "comando": "node src/04-express/01-servidor-e-rotas.js",
      "titulo": "Servidor e rotas com Express",
      "sessao": 1,
      "oQueE": "o Express é a biblioteca que transforma \"programa Node\" em \"servidor web\": uma rota é um par método + caminho ligado a uma função que responde.",
      "quandoUsar": "em qualquer site ou API em Node. Ele resolve rota, corpo, cabeçalho e erro, coisas que o módulo http cru deixa por sua conta.",
      "quandoNaoUsar": "em script que roda e acaba (relatório, migração). Servidor fica de pé esperando pedido; script termina e devolve o terminal.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O servidor mínimo",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');   // npm init -y && npm install express\n\nconst app = express();\napp.get('/', (req, res) => res.send('Hello World!'));\napp.get('/contato', (req, res) => res.send('Obrigado por entrar em contato conosco!'));\n\n// No projeto é `app.listen(3000)` e o servidor fica de pé. Aqui a porta 0 deixa o sistema\n// escolher uma livre, o próprio exemplo faz os pedidos e no fim fecha — senão não terminaria.\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}`;\n  console.log('GET /        →', await fetch(url).then((r) => r.text()));\n  console.log('GET /contato →', await fetch(url + '/contato').then((r) => r.text()));\n  console.log('GET /nada    →', await fetch(url + '/nada').then((r) => r.status), '← 404 automático');\n  servidor.close();\n});"
       },
       {
        "n": 2,
        "titulo": "req: tudo que o navegador mandou",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\n\nconst site = expresso();\nsite.get('/produtos/:id', (req, res) => {\n  console.log('método:', req.method, '| caminho:', req.path);\n  console.log('params:', { ...req.params }, '← pedaço da rota');\n  console.log('query :', { ...req.query }, '← depois do \"?\"');\n  res.send('ok');\n});\n\nconst s2 = site.listen(0, async () => {\n  await fetch(`http://localhost:${s2.address().port}/produtos/42?cor=preto&pagina=2`);\n  s2.close();\n});"
       },
       {
        "n": 3,
        "titulo": "res: as formas de responder",
        "secao": "ESSENCIAL",
        "codigo": "const expr = require('express');\n\nconst api = expr();\napi.get('/texto', (req, res) => res.send('<h1>Uma página</h1>'));\napi.get('/dados', (req, res) => res.json({ produto: 'Teclado', preco: 199.9 }));\napi.get('/sumiu', (req, res) => res.status(404).send('Produto não encontrado'));\napi.get('/antigo', (req, res) => res.redirect('/dados'));\n\nconst s3 = api.listen(0, async () => {\n  const url = `http://localhost:${s3.address().port}`;\n  const texto = await fetch(url + '/texto');\n  const dados = await fetch(url + '/dados');\n  const sumiu = await fetch(url + '/sumiu');\n  const antigo = await fetch(url + '/antigo', { redirect: 'manual' });\n\n  console.log('send   →', texto.status, texto.headers.get('content-type'), await texto.text());\n  console.log('json   →', dados.status, dados.headers.get('content-type'), await dados.text());\n  console.log('status →', sumiu.status, await sumiu.text());\n  console.log('redirect →', antigo.status, 'para', antigo.headers.get('location'));\n  s3.close();\n});"
       },
       {
        "n": 4,
        "titulo": "O mesmo servidor sem Express, para ver o que ele economiza",
        "secao": "NA PRÁTICA",
        "codigo": "const http = require('node:http');\n\nconst servidorCru = http.createServer((req, res) => {\n  if (req.method === 'GET' && req.url === '/') return res.end('Hello World!');\n  if (req.method === 'GET' && req.url === '/contato') return res.end('Obrigado por entrar em contato!');\n  res.statusCode = 404;                       // no Express isso já vem pronto\n  res.end('Cannot GET ' + req.url);\n});\n\nservidorCru.listen(0, async () => {\n  const url = `http://localhost:${servidorCru.address().port}`;\n  console.log('GET /     →', await fetch(url).then((r) => r.text()));\n  console.log('GET /nada →', await fetch(url + '/nada').then((r) => r.status));\n  servidorCru.close();\n});\n// Cada `if` aqui vira um `app.get` lá. Com dez rotas, parâmetro na URL e corpo de\n// formulário para ler, essa conta não fecha mais."
       },
       {
        "n": 5,
        "titulo": "O mesmo caminho, métodos diferentes",
        "secao": "NA PRÁTICA",
        "codigo": "const framework = require('express');\n\nconst loja = framework();\nloja.use(framework.urlencoded({ extended: true }));            // preenche req.body\nloja.get('/contato', (req, res) => res.send('formulário de contato'));\nloja.post('/contato', (req, res) => res.send(`recebido de ${req.body.nome}`));\n\nconst s5 = loja.listen(0, async () => {\n  const url = `http://localhost:${s5.address().port}/contato`;\n  console.log('GET  /contato →', await fetch(url).then((r) => r.text()));\n  console.log('POST /contato →', await fetch(url, {\n    method: 'POST',\n    headers: { 'content-type': 'application/x-www-form-urlencoded' },\n    body: 'nome=Igor',\n  }).then((r) => r.text()));\n  s5.close();\n});\n// Formulário HTML só faz GET e POST. PUT e DELETE aparecem em API chamada por fetch."
       },
       {
        "n": 6,
        "titulo": "A porta vem do ambiente",
        "secao": "NA PRÁTICA",
        "codigo": "const servidorWeb = require('express')();\n\nconst porta = process.env.PORT || 3000;   // a hospedagem define PORT; na sua máquina, 3000\nservidorWeb.get('/', (req, res) => res.send('no ar'));\n\nconsole.log('Vai subir em http://localhost:' + porta);\nconsole.log('process.env.PORT está definido?', Boolean(process.env.PORT));\n// O mesmo código sobe na sua máquina e no servidor sem editar nada — por isso essa linha\n// aparece em todo projeto Node."
       },
       {
        "n": 7,
        "titulo": "Rota específica precisa vir antes da rota com parâmetro",
        "secao": "PEGADINHAS",
        "codigo": "const aplicacao = require('express');\n\nconst errado = aplicacao();\nerrado.get('/produtos/:id', (req, res) => res.send('detalhe do produto ' + req.params.id));\nerrado.get('/produtos/novo', (req, res) => res.send('formulário de cadastro'));   // tarde demais\n\nconst certo = aplicacao();\ncerto.get('/produtos/novo', (req, res) => res.send('formulário de cadastro'));\ncerto.get('/produtos/:id', (req, res) => res.send('detalhe do produto ' + req.params.id));\n\nconst s7a = errado.listen(0, async () => {\n  const s7b = certo.listen(0, async () => {\n    const pedir = (s) => fetch(`http://localhost:${s.address().port}/produtos/novo`).then((r) => r.text());\n    console.log('registro errado →', await pedir(s7a));\n    console.log('registro certo  →', await pedir(s7b));\n    s7a.close(); s7b.close();\n  });\n});\n// O Express testa as rotas na ordem em que foram escritas e para na primeira que casa:\n// `/produtos/:id` casa com \"novo\" e trata o formulário como se fosse um id."
       },
       {
        "n": 8,
        "titulo": "Responder duas vezes",
        "secao": "PEGADINHAS",
        "codigo": "const servidorFalho = require('express')();\n\nservidorFalho.get('/', (req, res) => {\n  res.send('primeira resposta');\n  console.log('Já respondeu? res.headersSent =', res.headersSent);\n  try {\n    res.send('segunda resposta');\n  } catch (erro) {\n    console.log('Erro ao responder de novo:', erro.code);\n  }\n});\n\nconst s8 = servidorFalho.listen(0, async () => {\n  const url = `http://localhost:${s8.address().port}`;\n  console.log('O navegador recebeu:', await fetch(url).then((r) => r.text()));\n  s8.close();\n});\n// É uma resposta por requisição. O erro clássico é chamar `res.send` dentro de um `if` e\n// de novo no fim da função, esquecendo o `return`."
       }
      ],
      "resumo": [
       "`express()` cria o servidor; `app.listen(porta)` abre a porta e segura o programa de pé.",
       "Rota = método + caminho + função `(req, res)`.",
       "`req` traz method, path, params, query e body; `res` responde e encerra.",
       "`res.send` texto, `res.json` API, `res.status(n)` código, `res.redirect` outra rota.",
       "Caminho desconhecido cai no 404 automático do Express — sem `if` seu.",
       "Rota específica antes da rota com `:parametro`, e uma resposta só por requisição."
      ]
     },
     {
      "slug": "02-params-query-body",
      "arquivo": "Node/src/04-express/02-params-query-body.js",
      "comando": "node src/04-express/02-params-query-body.js",
      "titulo": "req.params, req.query e req.body",
      "sessao": 2,
      "oQueE": "os três lugares por onde o dado do usuário entra no servidor — pedaço da URL, o que vem depois do \"?\", e o corpo enviado por um formulário ou fetch.",
      "quandoUsar": "params para identificar um recurso (/produtos/42), query para filtro e paginação (?pagina=2), body para cadastrar e editar.",
      "quandoNaoUsar": "nunca mande senha por params ou query — a URL fica no histórico do navegador e nos logs do servidor. Senha vai no body, com HTTPS.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Os três, na mesma requisição",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\n\nconst app = express();\napp.use(express.urlencoded({ extended: true }));\napp.post('/testes/:idUsuarios/:parametro', (req, res) => {\n  console.log('req.params →', { ...req.params }, '← pedaços da rota');\n  console.log('req.query  →', { ...req.query }, '← depois do \"?\"');\n  console.log('req.body   →', req.body, '← o corpo enviado');\n  res.send('ok');\n});\n\nconst servidor = app.listen(0, async () => {\n  await fetch(`http://localhost:${servidor.address().port}/testes/123/abc?nome=Igor&idade=21`, {\n    method: 'POST',\n    headers: { 'content-type': 'application/x-www-form-urlencoded' },\n    body: 'cidade=Recife',\n  });\n  console.log('Tudo chega como TEXTO: \"21\" e \"123\" são strings.');\n  servidor.close();\n});"
       },
       {
        "n": 2,
        "titulo": "params: a rota declara o nome",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\n\nconst loja = expresso();\nloja.get('/produtos/:id/avaliacoes/:nota', (req, res) => res.json(req.params));\nloja.get('/testes{/:id}{/:parametro}', (req, res) => res.json(req.params));   // Express 5: {} é opcional\n\nconst s2 = loja.listen(0, async () => {\n  const url = `http://localhost:${s2.address().port}`;\n  const pedir = (caminho) => fetch(url + caminho).then((r) => r.text());\n  console.log('/produtos/42/avaliacoes/5 →', await pedir('/produtos/42/avaliacoes/5'));\n  console.log('/testes                   →', await pedir('/testes'));\n  console.log('/testes/123               →', await pedir('/testes/123'));\n  console.log('/testes/123/abc           →', await pedir('/testes/123/abc'));\n  s2.close();\n});\n// No Express 4 o parâmetro opcional era '/testes/:id?'. No 5 vai entre chaves."
       },
       {
        "n": 3,
        "titulo": "query: filtro e paginação",
        "secao": "ESSENCIAL",
        "codigo": "const framework = require('express');\n\nconst busca = framework();\nbusca.get('/produtos', (req, res) => {\n  const pagina = Number(req.query.pagina) || 1;             // sem Number, \"2\" + 1 vira \"21\"\n  const emEstoque = req.query.emEstoque === 'true';         // sem ===, a string \"false\" é verdadeira\n  res.send(`busca=\"${req.query.busca ?? ''}\" pagina=${pagina} proxima=${pagina + 1} emEstoque=${emEstoque}`);\n});\n\nconst s3 = busca.listen(0, async () => {\n  const url = `http://localhost:${s3.address().port}/produtos`;\n  console.log(await fetch(url + '?busca=teclado&pagina=2&emEstoque=true').then((r) => r.text()));\n  console.log(await fetch(url + '?emEstoque=false').then((r) => r.text()), '← sem query, os padrões');\n  s3.close();\n});"
       },
       {
        "n": 4,
        "titulo": "req.body só existe com o parser ligado",
        "secao": "NA PRÁTICA",
        "codigo": "const expr = require('express');\n\nconst semParser = expr();\nsemParser.post('/', (req, res) => res.send('req.body é ' + req.body));\n\nconst comParser = expr();\ncomParser.use(expr.urlencoded({ extended: true }));          // formulário HTML\ncomParser.post('/', (req, res) => res.send('req.body.nome é ' + req.body.nome));\n\nconst enviar = (s) => fetch(`http://localhost:${s.address().port}/`, {\n  method: 'POST',\n  headers: { 'content-type': 'application/x-www-form-urlencoded' },\n  body: 'nome=Igor',\n}).then((r) => r.text());\n\nconst s4a = semParser.listen(0, () => {\n  const s4b = comParser.listen(0, async () => {\n    console.log('sem express.urlencoded →', await enviar(s4a));\n    console.log('com express.urlencoded →', await enviar(s4b));\n    s4a.close(); s4b.close();\n  });\n});\n// `extended: true` aceita objeto e array aninhados (endereco[rua]=...), não só pares simples.\n// Para fetch/axios mandando JSON, o parser é outro: app.use(express.json())."
       },
       {
        "n": 5,
        "titulo": "O formulário e o POST que o recebe",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\n\nconst site = web();\nsite.use(web.urlencoded({ extended: true }));\nsite.get('/', (req, res) => res.send(`\n  <form action=\"/\" method=\"POST\">\n    <input type=\"text\" name=\"nome\" required>\n    <button type=\"submit\">Enviar</button>\n  </form>\n`));\nsite.post('/', (req, res) => res.send(`Formulário recebido! Nome: ${req.body.nome}`));\n\nconst s5 = site.listen(0, async () => {\n  const url = `http://localhost:${s5.address().port}/`;\n  console.log('O que o navegador mostra:', (await fetch(url).then((r) => r.text())).match(/name=\"(\\w+)\"/)[0]);\n  console.log('Ao enviar:', await fetch(url, {\n    method: 'POST',\n    headers: { 'content-type': 'application/x-www-form-urlencoded' },\n    body: 'nome=Igor',\n  }).then((r) => r.text()));\n  s5.close();\n});\n// O atributo `name` do input é a CHAVE em req.body. Sem name, o campo nem é enviado."
       },
       {
        "n": 6,
        "titulo": "Validar o que chega, sempre",
        "secao": "NA PRÁTICA",
        "codigo": "const aplicacao = require('express');\n\nconst cadastro = aplicacao();\ncadastro.use(aplicacao.urlencoded({ extended: true }));\ncadastro.post('/clientes', (req, res) => {\n  const nome = (req.body.nome || '').trim();               // undefined quebraria no .trim()\n  const idade = Number(req.body.idade);\n\n  if (!nome) return res.status(400).send('O nome não pode ficar vazio.');\n  if (!Number.isInteger(idade) || idade < 0) return res.status(400).send('Idade inválida.');\n  res.status(201).send(`Cadastrado: ${nome}, ${idade} anos.`);\n});\n\nconst s6 = cadastro.listen(0, async () => {\n  const enviarForm = (corpo) => fetch(`http://localhost:${s6.address().port}/clientes`, {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: corpo,\n  }).then(async (r) => `${r.status} ${await r.text()}`);\n\n  console.log(await enviarForm('nome=Ana&idade=31'));\n  console.log(await enviarForm('nome=%20%20&idade=31'));\n  console.log(await enviarForm('nome=Bruno&idade=trinta'));\n  s6.close();\n});\n// `required` no HTML é conveniência para o usuário; qualquer um manda um POST sem passar\n// pelo formulário. Validação de verdade é a do servidor."
       },
       {
        "n": 7,
        "titulo": "Registrar a rota antes do parser zera o req.body",
        "secao": "PEGADINHAS",
        "codigo": "const servidorWeb = require('express');\n\nconst ordemErrada = servidorWeb();\nordemErrada.post('/', (req, res) => res.send('body: ' + JSON.stringify(req.body)));\nordemErrada.use(servidorWeb.urlencoded({ extended: true }));   // tarde demais\n\nconst s7 = ordemErrada.listen(0, async () => {\n  console.log('rota registrada antes do parser →', await fetch(`http://localhost:${s7.address().port}/`, {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',\n  }).then((r) => r.text()));\n  console.log('Nenhum erro no terminal: o formulário só para de funcionar.');\n  s7.close();\n});\n// O Express roda os middlewares na ordem de registro. Parser SEMPRE antes das rotas."
       },
       {
        "n": 8,
        "titulo": "params e query são sempre string",
        "secao": "PEGADINHAS",
        "codigo": "const recebido = { id: '10', pagina: '2', ativo: 'false' };   // é assim que chega do Express\n\nconsole.log('id === 10        ?', recebido.id === 10, '← string comparada com número');\nconsole.log('Number(id) === 10 ?', Number(recebido.id) === 10);\nconsole.log('if (ativo)       ?', Boolean(recebido.ativo), '← a string \"false\" é verdadeira');\nconsole.log('ativo === \"true\" ?', recebido.ativo === 'true');"
       }
      ],
      "resumo": [
       "params = pedaço da rota (/produtos/:id); query = depois do \"?\"; body = corpo do POST.",
       "`req.body` exige `express.urlencoded()` ou `express.json()` registrado ANTES das rotas.",
       "O `name` do input é a chave de `req.body`.",
       "Tudo chega como string: converta com Number() e compare com === 'true'.",
       "Valide no servidor; `required` no HTML não protege nada.",
       "Senha e token nunca na URL — só no body."
      ]
     },
     {
      "slug": "03-router-e-controllers",
      "arquivo": "Node/src/04-express/03-router-e-controllers.js",
      "comando": "node src/04-express/03-router-e-controllers.js",
      "titulo": "Router e Controllers — separar rota de lógica",
      "sessao": 2,
      "oQueE": "`express.Router()` é um mini-app só com rotas; o controller é o arquivo onde moram as funções que respondem. O router diz QUEM responde, o controller diz COMO.",
      "quandoUsar": "assim que o server.js passar de umas poucas rotas — a partir daí ele vira uma parede de funções e ninguém acha nada.",
      "quandoNaoUsar": "em um exemplo de três rotas para aprender. Separar antes da hora só espalha código por arquivos vazios.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O Router é um mini-app de rotas",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\n\nconst route = express.Router();                   // vive em routes.js\nroute.get('/', (req, res) => res.send('página inicial'));\nroute.get('/contato', (req, res) => res.send('fale conosco'));\n\nconst app = express();\napp.use(route);                                   // server.js: app.use(routes)\n\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}`;\n  console.log('GET /        →', await fetch(url).then((r) => r.text()));\n  console.log('GET /contato →', await fetch(url + '/contato').then((r) => r.text()));\n  servidor.close();\n});\n// No projeto, routes.js termina com `module.exports = route;` e o server.js dá require nele."
       },
       {
        "n": 2,
        "titulo": "A função é PASSADA, não chamada",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\n\nconst HomeController = {                          // vive em controllers/homeController.js\n  paginaInicial: (req, res) => res.send('formulário'),\n  trataPost: (req, res) => res.send(`Recebido! Nome: ${req.body.nome}`),\n};\n\nconst rotas = expresso.Router();\nrotas.get('/', HomeController.paginaInicial);     // sem parênteses: o Express chama na hora certa\nrotas.post('/', HomeController.trataPost);\n\nconst site = expresso();\nsite.use(expresso.urlencoded({ extended: true }));\nsite.use(rotas);\n\nconst s2 = site.listen(0, async () => {\n  const url = `http://localhost:${s2.address().port}/`;\n  console.log('GET  / →', await fetch(url).then((r) => r.text()));\n  console.log('POST / →', await fetch(url, {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',\n  }).then((r) => r.text()));\n  s2.close();\n});\n// `HomeController.paginaInicial()` com parênteses chamaria a função AGORA e registraria o\n// retorno dela (undefined) como se fosse a rota."
       },
       {
        "n": 3,
        "titulo": "Os três arquivos, e o que cada um exporta",
        "secao": "ESSENCIAL",
        "codigo": "console.log('controllers/homeController.js  →  exports.paginaInicial = (req, res) => ...');\nconsole.log('routes.js                      →  module.exports = route');\nconsole.log('server.js                      →  const routes = require(\"./routes.js\")');\nconsole.log('                                  app.use(routes)');\n// É a divisão de qualquer projeto Express que você vai abrir por aí: server.js sobe o\n// servidor, routes.js mapeia caminho → função, o controller responde."
       },
       {
        "n": 4,
        "titulo": "Um router por assunto, com prefixo",
        "secao": "NA PRÁTICA",
        "codigo": "const framework = require('express');\n\nconst produtos = framework.Router();\nprodutos.get('/', (req, res) => res.send('lista de produtos'));          // atende /produtos\nprodutos.get('/:id', (req, res) => res.send('produto ' + req.params.id)); // atende /produtos/42\n\nconst clientes = framework.Router();\nclientes.get('/', (req, res) => res.send('lista de clientes'));\n\nconst loja = framework();\nloja.use('/produtos', produtos);                  // o prefixo fica AQUI...\nloja.use('/clientes', clientes);                  // ...e some de dentro do router\n\nconst s4 = loja.listen(0, async () => {\n  const url = `http://localhost:${s4.address().port}`;\n  const pedir = (c) => fetch(url + c).then((r) => r.text());\n  console.log('/produtos     →', await pedir('/produtos'));\n  console.log('/produtos/42  →', await pedir('/produtos/42'));\n  console.log('/clientes     →', await pedir('/clientes'));\n  s4.close();\n});"
       },
       {
        "n": 5,
        "titulo": "O controller responde, não retorna",
        "secao": "NA PRÁTICA",
        "codigo": "const expr = require('express');\n\nconst ClienteController = {\n  index: (req, res) => res.json([{ nome: 'Ana' }, { nome: 'Bruno' }]),\n  show: (req, res) => {\n    const encontrado = req.params.id === '1';\n    if (!encontrado) return res.status(404).send('Cliente não encontrado');   // return encerra\n    res.json({ id: 1, nome: 'Ana' });\n  },\n};\n\nconst api = expr();\napi.get('/clientes', ClienteController.index);\napi.get('/clientes/:id', ClienteController.show);\n\nconst s5 = api.listen(0, async () => {\n  const url = `http://localhost:${s5.address().port}/clientes`;\n  console.log('index →', await fetch(url).then((r) => r.text()));\n  console.log('show 1 →', await fetch(url + '/1').then((r) => r.text()));\n  console.log('show 9 →', await fetch(url + '/9').then(async (r) => `${r.status} ${await r.text()}`));\n  s5.close();\n});\n// Quem chama o controller é o Express, e ele ignora qualquer valor devolvido. O `return`\n// serve só para parar a função ali — sem ele, o código continua e tenta responder de novo."
       },
       {
        "n": 6,
        "titulo": "Nomes de ação que se explicam",
        "secao": "NA PRÁTICA",
        "codigo": "const acoes = [\n  ['index', 'GET    /produtos       lista tudo'],\n  ['show', 'GET    /produtos/:id   mostra um'],\n  ['create', 'GET    /produtos/novo  formulário de cadastro'],\n  ['store', 'POST   /produtos       salva o que o formulário mandou'],\n  ['update', 'PUT    /produtos/:id   atualiza'],\n  ['destroy', 'DELETE /produtos/:id   apaga'],\n];\n\nfor (const [nome, rota] of acoes) console.log(nome.padEnd(9), rota);\n// Não é regra do Express, é convenção — mas é a que a maioria dos projetos segue."
       },
       {
        "n": 7,
        "titulo": "Esquecer o module.exports do routes.js",
        "secao": "PEGADINHAS",
        "codigo": "const { writeFileSync, mkdtempSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst pasta = mkdtempSync(join(tmpdir(), 'rotas-'));\nwriteFileSync(join(pasta, 'routes.js'), `\n  const rotas = [];               // definiu as rotas...\n  rotas.push({ caminho: '/' });   // ...e esqueceu o module.exports no fim\n`);\n\nconst routes = require(join(pasta, 'routes.js'));\nconsole.log('O que o require devolveu:', routes);\nconsole.log('app.use(', routes, ') → TypeError: Router.use() requires a middleware function');\n// Erro clássico de quem cria o routes.js na mão: tudo certo, menos a última linha."
       }
      ],
      "resumo": [
       "`express.Router()` cria um mini-app de rotas; `module.exports = route` no fim do arquivo.",
       "O router só mapeia caminho → função; a lógica fica no controller.",
       "Passe a função sem parênteses: `HomeController.paginaInicial`.",
       "No controller, `exports.nomeDaAcao = (req, res) => ...`.",
       "Um router por assunto, com o prefixo no `app.use` e caminho curto lá dentro.",
       "O controller responde (`res.send`); o `return` só serve para parar a função."
      ]
     },
     {
      "slug": "04-views-com-ejs",
      "arquivo": "Node/src/04-express/04-views-com-ejs.js",
      "comando": "node src/04-express/04-views-com-ejs.js",
      "titulo": "Views com EJS",
      "sessao": 3,
      "oQueE": "uma view é um arquivo HTML com buracos. O EJS é a engine que preenche esses buracos com os dados que o controller entrega em `res.render('index', { ... })`.",
      "quandoUsar": "quando o servidor devolve PÁGINA pronta — site institucional, painel, formulário. Tira o HTML de dentro das aspas do controller.",
      "quandoNaoUsar": "em API consumida por React/Vue/app. Aí o servidor devolve `res.json` e quem monta a tela é o frontend.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "As três marcas do EJS",
        "secao": "ESSENCIAL",
        "codigo": "const ejs = require('ejs');   // npm install ejs\n\nconst template = `\n  <h1><%= titulo %></h1>\n  <%- destaque %>\n  <% if (itens > 0) { %><p>Você tem <%= itens %> itens.</p><% } %>\n`;\n\nconst dados = { titulo: 'Carrinho <b>novo</b>', destaque: '<b>Promoção!</b>', itens: 3 };\nconsole.log(ejs.render(template, dados).trim());\n// <%= imprime ESCAPANDO html (o <b> do título virou texto) · <%- imprime cru · <% só executa."
       },
       {
        "n": 2,
        "titulo": "O servidor renderizando uma view",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\nconst { writeFileSync, mkdtempSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst views = mkdtempSync(join(tmpdir(), 'views-'));                      // no projeto: src/views/\nwriteFileSync(join(views, 'index.ejs'), '<h1>Testes</h1><p>Olá, <%= nome %>!</p>');\n\nconst app = express();\napp.set('views', views);              // onde procurar os arquivos .ejs\napp.set('view engine', 'ejs');        // quem sabe preencher — não precisa dar require no ejs\n\napp.get('/', (req, res) => res.render('index', { nome: 'Igor' }));\n\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}/`;\n  console.log(await fetch(url).then((r) => r.text()));\n  servidor.close();\n});\n// No projeto: app.set('views', path.resolve(__dirname, 'src', 'views'))."
       },
       {
        "n": 3,
        "titulo": "Listar dados com forEach",
        "secao": "ESSENCIAL",
        "codigo": "const motor = require('ejs');\n\nconst lista = `<ul>\n<% produtos.forEach((p) => { %>  <li><%= p.nome %> — R$ <%= p.preco.toFixed(2) %></li>\n<% }) %></ul>`;\n\nconsole.log(motor.render(lista, {\n  produtos: [{ nome: 'Teclado', preco: 199.9 }, { nome: 'Mouse', preco: 89.5 }],\n}));\n// É JavaScript de verdade dentro das tags: forEach, map, if, template string, tudo vale."
       },
       {
        "n": 4,
        "titulo": "Controller e view, o par completo",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\nconst { writeFileSync: gravar, mkdtempSync: criarPasta } = require('node:fs');\nconst { join: unir } = require('node:path');\nconst { tmpdir: temp } = require('node:os');\n\nconst pasta = criarPasta(unir(temp(), 'form-'));\ngravar(unir(pasta, 'index.ejs'), `<h1>Contato</h1>\n<% if (typeof nome !== 'undefined') { %><p>Recebido, <%= nome %>!</p><% } %>`);\n\nconst HomeController = {                                     // src/controllers/homeController.js\n  paginaInicial: (req, res) => res.render('index'),          // GET não manda nada\n  trataPost: (req, res) => res.render('index', { nome: req.body.nome }),\n};\n\nconst site = web();\nsite.use(web.urlencoded({ extended: true }));\nsite.set('views', pasta);\nsite.set('view engine', 'ejs');\nsite.get('/', HomeController.paginaInicial);\nsite.post('/', HomeController.trataPost);\n\nconst s4 = site.listen(0, async () => {\n  const url = `http://localhost:${s4.address().port}/`;\n  console.log('GET  →', await fetch(url).then((r) => r.text()));\n  console.log('POST →', await fetch(url, {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',\n  }).then((r) => r.text()));\n  s4.close();\n});\n// O `typeof nome !== 'undefined'` protege o GET, que renderiza a mesma view sem passar nada."
       },
       {
        "n": 5,
        "titulo": "res.locals: dado que aparece em TODA view",
        "secao": "NA PRÁTICA",
        "codigo": "const servidorWeb = require('express');\nconst { writeFileSync: escrever, mkdtempSync: novaPasta } = require('node:fs');\nconst { join: montar } = require('node:path');\nconst { tmpdir: tmp } = require('node:os');\n\nconst dir = novaPasta(montar(tmp(), 'locals-'));\nescrever(montar(dir, 'topo.ejs'), '<header><%= usuario %> · <%= visitas %> visitas</header><%= pagina %>');\n\nconst painel = servidorWeb();\npainel.set('views', dir);\npainel.set('view engine', 'ejs');\npainel.use((req, res, next) => {                  // um middleware escreve...\n  res.locals.usuario = 'Igor';\n  res.locals.visitas = 7;\n  next();\n});\npainel.get('/', (req, res) => res.render('topo', { pagina: 'início' }));   // ...e o render só completa\n\nconst s5 = painel.listen(0, async () => {\n  const url = `http://localhost:${s5.address().port}/`;\n  console.log(await fetch(url).then((r) => r.text()));\n  s5.close();\n});\n// É assim que usuário logado, contador de visitas e mensagem flash chegam em todas as\n// páginas sem o controller repetir isso em cada `res.render`."
       },
       {
        "n": 6,
        "titulo": "include: cabeçalho e rodapé em um lugar só",
        "secao": "NA PRÁTICA",
        "codigo": "const template2 = require('ejs');\nconst { writeFileSync: salvar, readFileSync: ler, mkdtempSync: abrirPasta } = require('node:fs');\nconst { join: caminho } = require('node:path');\nconst { tmpdir: pastaTemp } = require('node:os');\n\nconst base = abrirPasta(caminho(pastaTemp(), 'partials-'));                  // no projeto: src/views/\nsalvar(caminho(base, 'cabecalho.ejs'), '<header><h1><%= titulo %></h1></header>');\nsalvar(caminho(base, 'pagina.ejs'), `<%- include('cabecalho', { titulo: 'Produtos' }) %>\n<main>lista aqui</main>`);\n\nconst pagina = caminho(base, 'pagina.ejs');\n// filename diz ao EJS onde procurar o arquivo do include:\nconsole.log(template2.render(ler(pagina, 'utf8'), {}, { filename: pagina }));\n// include usa <%- (sem escape): o pedaço incluído JÁ é HTML. Com <%= as tags apareceriam\n// como texto na tela."
       },
       {
        "n": 7,
        "titulo": "Variável que a view espera e o controller não mandou",
        "secao": "PEGADINHAS",
        "codigo": "const engine = require('ejs');\n\ntry {\n  console.log(engine.render('<p>Olá, <%= nome %>!</p>', { titulo: 'Contato' }));   // esqueceu \"nome\"\n} catch (erro) {\n  console.log('Na tela do usuário aparece:', erro.message.split('\\n').pop());\n}\nconst protegida = \"<% if (typeof nome !== 'undefined') { %><p>Olá!</p><% } %>\";\nconsole.log('Defesa:', engine.render(protegida, {}) || '(nada, e sem quebrar)');\n// \"nome is not defined\" é o erro mais comum de EJS: a view não adivinha o que o controller\n// esqueceu. Ou proteja com `typeof`, ou mande sempre um valor padrão."
       }
      ],
      "resumo": [
       "`app.set('views', ...)` + `app.set('view engine', 'ejs')` fazem o render achar o .ejs.",
       "`<%= %>` imprime escapado, `<%- %>` imprime HTML cru, `<% %>` só executa.",
       "O objeto do `res.render('index', { nome })` vira variável dentro da view.",
       "`res.locals` vale para todas as views — bom para usuário logado e flash.",
       "`include` corta cabeçalho e rodapé repetidos, e vai com `<%- %>`.",
       "Variável não enviada estoura \"not defined\": proteja com `typeof` ou mande padrão."
      ]
     },
     {
      "slug": "05-arquivos-estaticos",
      "arquivo": "Node/src/04-express/05-arquivos-estaticos.js",
      "comando": "node src/04-express/05-arquivos-estaticos.js",
      "titulo": "Arquivos estáticos com express.static",
      "sessao": 3,
      "oQueE": "uma pasta que o Express entrega crua para o navegador — css, imagem, o bundle.js do frontend. Sem rota, sem controller, sem view.",
      "quandoUsar": "para tudo que é arquivo pronto e público: `public/`.",
      "quandoNaoUsar": "para arquivo que depende de quem está logado (nota fiscal, comprovante). Dentro de public, qualquer um com o link baixa.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Uma linha publica a pasta inteira",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\nconst { writeFileSync, mkdirSync, mkdtempSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst publico = mkdtempSync(join(tmpdir(), 'public-'));                  // no projeto: public/\nmkdirSync(join(publico, 'assets', 'css'), { recursive: true });\nwriteFileSync(join(publico, 'assets', 'css', 'style.css'), 'body { color: teal; }');\n\nconst app = express();\napp.use(express.static(publico));      // no projeto: express.static(path.resolve(__dirname, 'public'))\n\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}`;\n  const css = await fetch(url + '/assets/css/style.css');\n  console.log('GET /assets/css/style.css →', css.status, await css.text());\n  console.log('O nome \"public\" NÃO aparece na URL: ele é a raiz do que é servido.');\n  servidor.close();\n});"
       },
       {
        "n": 2,
        "titulo": "O tipo do arquivo vem junto",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\nconst { writeFileSync: gravar, mkdtempSync: criarPasta } = require('node:fs');\nconst { join: unir } = require('node:path');\nconst { tmpdir: temp } = require('node:os');\n\nconst pasta = criarPasta(unir(temp(), 'tipos-'));\ngravar(unir(pasta, 'style.css'), 'h1 { color: teal; }');\ngravar(unir(pasta, 'bundle.js'), 'console.log(\"oi\")');\n\nconst site = expresso();\nsite.use(expresso.static(pasta));\n\nconst s2 = site.listen(0, async () => {\n  const url = `http://localhost:${s2.address().port}`;\n  for (const arquivo of ['/style.css', '/bundle.js', '/naoexiste.png']) {\n    const r = await fetch(url + arquivo);\n    console.log(arquivo.padEnd(15), r.status, r.headers.get('content-type'));\n  }\n  s2.close();\n});\n// É o Content-Type que faz o navegador aplicar o css em vez de mostrá-lo como texto.\n// Arquivo que não existe cai no 404 — o static apenas passa adiante."
       },
       {
        "n": 3,
        "titulo": "Na view, o caminho começa com barra",
        "secao": "ESSENCIAL",
        "codigo": "console.log('<link rel=\"stylesheet\" href=\"/assets/css/style.css\">');\nconsole.log('<script src=\"/assets/js/bundle.js\"></script>');\nconsole.log('\\nO <script> vai no fim do <body> (ou com defer): assim o HTML já existe');\nconsole.log('quando o JavaScript procura os elementos da página.');"
       },
       {
        "n": 4,
        "titulo": "A ordem: estáticos antes das rotas",
        "secao": "NA PRÁTICA",
        "codigo": "const framework = require('express');\nconst { writeFileSync: escrever, mkdtempSync: novaPasta } = require('node:fs');\nconst { join: montar } = require('node:path');\nconst { tmpdir: tmp } = require('node:os');\n\nconst dir = novaPasta(montar(tmp(), 'ordem-'));\nescrever(montar(dir, 'logo.png'), 'imagem-de-mentira');\n\nconst loja = framework();\nloja.use(framework.static(dir));                                  // 1º: arquivo pronto\nloja.get('/{*qualquer}', (req, res) => res.send('página do site'));  // 2º: rota que pega o resto\n\nconst s4 = loja.listen(0, async () => {\n  const url = `http://localhost:${s4.address().port}`;\n  console.log('/logo.png →', await fetch(url + '/logo.png').then((r) => r.text()));\n  console.log('/contato  →', await fetch(url + '/contato').then((r) => r.text()));\n  s4.close();\n});\n// Invertido, a rota curinga responderia \"página do site\" também para /logo.png.\n// Estáticos e parsers vêm sempre antes de `app.use(routes)`."
       },
       {
        "n": 5,
        "titulo": "Um prefixo na URL",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\nconst { writeFileSync: salvar, mkdtempSync: abrir } = require('node:fs');\nconst { join: caminho } = require('node:path');\nconst { tmpdir: pastaTemp } = require('node:os');\n\nconst arquivos = abrir(caminho(pastaTemp(), 'prefixo-'));\nsalvar(caminho(arquivos, 'logo.png'), 'imagem-de-mentira');\n\nconst portal = web();\nportal.use('/static', web.static(arquivos));      // a pasta continua a mesma; muda só a URL\n\nconst s5 = portal.listen(0, async () => {\n  const url = `http://localhost:${s5.address().port}`;\n  const status = (caminho) => fetch(url + caminho).then((r) => r.status);\n  console.log('/static/logo.png →', await status('/static/logo.png'));\n  console.log('/logo.png        →', await status('/logo.png'), '← sem o prefixo, 404');\n  s5.close();\n});\n// Útil quando o site já tem uma rota /assets, ou para colocar um CDN na frente depois."
       },
       {
        "n": 6,
        "titulo": "public/ é a SAÍDA do build",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('frontend/   → o que VOCÊ escreve (entra no webpack)');\nconsole.log('public/     → o que o webpack GERA e o Express serve');\nconsole.log('O Express nunca olha para frontend/. O navegador nunca vê frontend/.');\n// Por isso `public/assets/js/bundle.js` não se edita na mão: o próximo build apaga."
       },
       {
        "n": 7,
        "titulo": "Caminho relativo quebra em rota aninhada",
        "secao": "PEGADINHAS",
        "codigo": "const servidorWeb = require('express');\nconst { writeFileSync: por, mkdirSync: criarArvore, mkdtempSync: raiz } = require('node:fs');\nconst { join: ligar } = require('node:path');\nconst { tmpdir: t } = require('node:os');\n\nconst estaticos = raiz(ligar(t(), 'relativo-'));\ncriarArvore(ligar(estaticos, 'assets'), { recursive: true });\npor(ligar(estaticos, 'assets', 'app.js'), 'console.log(\"carregou\")');\n\nconst app7 = servidorWeb();\napp7.use(servidorWeb.static(estaticos));\napp7.get('/produtos/:id', (req, res) => res.send('produto ' + req.params.id));\n\nconst s7 = app7.listen(0, async () => {\n  const url = `http://localhost:${s7.address().port}`;\n  // Em /produtos/1, \"./assets/app.js\" faz o navegador pedir /produtos/assets/app.js:\n  const status = (caminho) => fetch(url + caminho).then((r) => r.status);\n  console.log('relativo  → /produtos/assets/app.js →', await status('/produtos/assets/app.js'));\n  console.log('com barra → /assets/app.js          →', await status('/assets/app.js'));\n  s7.close();\n});\n// A página abre sem estilo e sem script, e nada no terminal avisa. Sempre \"/assets/...\"."
       }
      ],
      "resumo": [
       "`app.use(express.static(path.resolve(__dirname, 'public')))` publica a pasta inteira.",
       "O nome da pasta some da URL: public/logo.png vira /logo.png.",
       "Registre os estáticos antes das rotas; arquivo inexistente segue para o roteador.",
       "Nos links da view, sempre `/assets/...` com barra na frente.",
       "public/ é saída de build — não edite arquivo gerado lá dentro.",
       "Tudo em public é público: arquivo privado nunca mora ali."
      ]
     },
     {
      "slug": "06-middlewares",
      "arquivo": "Node/src/04-express/06-middlewares.js",
      "comando": "node src/04-express/06-middlewares.js",
      "titulo": "Middlewares — a fila por onde toda requisição passa",
      "sessao": 4,
      "oQueE": "uma função `(req, res, next)` que roda ANTES da rota. Ela pode olhar o pedido, acrescentar informação e chamar `next()` para passar adiante — ou responder e encerrar ali mesmo.",
      "quandoUsar": "para o que vale em várias rotas: log, autenticação, parser, mensagem flash, contador de visitas.",
      "quandoNaoUsar": "para regra que só existe em uma rota — isso é código do controller.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "A fila roda na ordem de registro",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\n\nconst app = express();\napp.use((req, res, next) => { console.log('1º middleware: passei por aqui'); next(); });\napp.use((req, res, next) => { console.log('2º middleware: passei por aqui'); next(); });\napp.get('/', (req, res) => { console.log('3º: a rota responde'); res.send('pronto'); });\n\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}/`;\n  console.log('Navegador recebeu:', await fetch(url).then((r) => r.text()));\n  servidor.close();\n});\n// `next()` é literalmente \"chame o próximo da fila\". O Express é essa lista, mais o roteador."
       },
       {
        "n": 2,
        "titulo": "Middleware que ENRIQUECE o pedido",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\n\nconst site = expresso();\nsite.use((req, res, next) => {\n  req.recebidoEm = new Date('2026-08-20T10:30:00');   // qualquer rota abaixo enxerga\n  next();\n});\nsite.get('/pedidos', (req, res) =>\n  res.send('pedido recebido às ' + req.recebidoEm.toLocaleTimeString('pt-BR')));\n\nconst s2 = site.listen(0, async () => {\n  console.log(await fetch(`http://localhost:${s2.address().port}/pedidos`).then((r) => r.text()));\n  s2.close();\n});\n// É assim que `express.urlencoded` entrega `req.body` e o `express-session` entrega\n// `req.session`: eles penduram coisa no req e chamam next()."
       },
       {
        "n": 3,
        "titulo": "Esquecer o next() trava a requisição",
        "secao": "ESSENCIAL",
        "codigo": "const framework = require('express');\n\nconst travado = framework();\ntravado.use((req, res, next) => { console.log('middleware rodou... e não chamou next()'); });\ntravado.get('/', (req, res) => res.send('esta linha nunca roda'));\n\nconst s3 = travado.listen(0, async () => {\n  const controle = new AbortController();\n  setTimeout(() => controle.abort(), 200);          // o navegador ficaria girando; aqui desistimos\n  try {\n    await fetch(`http://localhost:${s3.address().port}/`, { signal: controle.signal });\n    console.log('respondeu');\n  } catch {\n    console.log('Nenhuma resposta: sem next(), o pedido morre na fila e o navegador espera.');\n  }\n  s3.close();\n  s3.closeAllConnections();\n});\n// Ou você responde, ou você chama next(). Fazer os dois dá \"headers already sent\"."
       },
       {
        "n": 4,
        "titulo": "Middleware que BARRA em vez de passar",
        "secao": "NA PRÁTICA",
        "codigo": "const expr = require('express');\n\nconst exigirLogin = (req, res, next) => {\n  if (req.query.token !== 'secreto') return res.status(401).send('faça login');   // encerra\n  next();                                                                        // libera\n};\n\nconst painel = expr();\npainel.get('/painel', exigirLogin, (req, res) => res.send('bem-vindo ao painel'));\npainel.get('/', (req, res) => res.send('página pública'));      // não passa pelo exigirLogin\n\nconst s4 = painel.listen(0, async () => {\n  const url = `http://localhost:${s4.address().port}`;\n  const ver = (c) => fetch(url + c).then(async (r) => `${r.status} ${await r.text()}`);\n  console.log('/                    →', await ver('/'));\n  console.log('/painel              →', await ver('/painel'));\n  console.log('/painel?token=secreto →', await ver('/painel?token=secreto'));\n  s4.close();\n});\n// Passado no `route.get(caminho, middleware, controller)`, ele vale só naquela rota."
       },
       {
        "n": 5,
        "titulo": "Os três alcances: global, por prefixo e por rota",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\n\nconst marcar = (nome) => (req, res, next) => { req.passou = (req.passou || []).concat(nome); next(); };\n\nconst loja = web();\nloja.use(marcar('global'));                       // toda requisição\nloja.use('/admin', marcar('prefixo /admin'));     // só o que começa com /admin\nloja.get('/admin/usuarios', marcar('só esta rota'), (req, res) => res.send(req.passou.join(' → ')));\nloja.get('/', (req, res) => res.send(req.passou.join(' → ')));\n\nconst s5 = loja.listen(0, async () => {\n  const url = `http://localhost:${s5.address().port}`;\n  console.log('/               →', await fetch(url + '/').then((r) => r.text()));\n  console.log('/admin/usuarios →', await fetch(url + '/admin/usuarios').then((r) => r.text()));\n  s5.close();\n});"
       },
       {
        "n": 6,
        "titulo": "res.locals: do middleware direto para a view",
        "secao": "NA PRÁTICA",
        "codigo": "const servidorWeb = require('express');\n\nconst contaVisitas = (req, res, next) => {        // src/middlewares/middleware.js\n  res.locals.visitas = 7;                         // no projeto vem de req.session.visitas\n  next();\n};\n\nconst portal = servidorWeb();\nportal.use(contaVisitas);\nportal.get('/', (req, res) => res.send(`<footer>${res.locals.visitas} visitas</footer>`));\n\nconst s6 = portal.listen(0, async () => {\n  console.log(await fetch(`http://localhost:${s6.address().port}/`).then((r) => r.text()));\n  s6.close();\n});\n// `res.locals` é enxergado pela view sem passar pelo `res.render`. É por aí que o contador\n// de visitas e as mensagens flash chegam no rodapé de todas as páginas."
       },
       {
        "n": 7,
        "titulo": "O middleware de erro tem QUATRO parâmetros",
        "secao": "NA PRÁTICA",
        "codigo": "const aplicacao = require('express');\n\nconst api = aplicacao();\napi.get('/relatorio', (req, res) => { throw new Error('MongoDB fora do ar'); });\napi.use((erro, req, res, next) => {               // 4 parâmetros = tratador de erro\n  console.log('Erro capturado:', erro.message);\n  res.status(500).send('Algo deu errado. Tente de novo.');\n});\n\nconst s7 = api.listen(0, async () => {\n  const r = await fetch(`http://localhost:${s7.address().port}/relatorio`);\n  console.log('O navegador recebeu:', r.status, await r.text());\n  s7.close();\n});\n// Registre por último, depois do `app.use(routes)` — é a rede de segurança. Com três\n// parâmetros o Express acha que é middleware comum e nunca chama."
       },
       {
        "n": 8,
        "titulo": "Registrar as rotas antes dos middlewares",
        "secao": "PEGADINHAS",
        "codigo": "const servidorFalho = require('express');\n\nconst errado = servidorFalho();\nerrado.get('/', (req, res) => res.send('body: ' + JSON.stringify(req.body)));\nerrado.use(servidorFalho.urlencoded({ extended: true }));   // nunca chega a rodar\n\nconst s8 = errado.listen(0, async () => {\n  const url = `http://localhost:${s8.address().port}/`;\n  console.log('rota registrada primeiro →', await fetch(url).then((r) => r.text()));\n  console.log('A ordem certa no server.js:');\n  console.log(['express.urlencoded → preenche req.body',\n    'session            → cria req.session',\n    'flash()            → cria req.flash (guarda na sessão)',\n    'expoeFlash         → lê req.flash e joga em res.locals',\n    'routes             → os controllers, que usam tudo acima'].join('\\n'));\n  s8.close();\n});\n// A ordem não é estilo, é dependência: cada peça precisa da anterior. `flash()` antes de\n// `session` derruba o servidor; `expoeFlash` antes de `flash()` dá \"req.flash is not a function\"."
       }
      ],
      "resumo": [
       "Middleware é `(req, res, next)`; sem `next()` a requisição trava.",
       "Roda na ordem de registro: parsers e estáticos antes das rotas, sempre.",
       "Serve para enriquecer o pedido (`req.body`, `req.session`) ou barrar (`res.status(401)`).",
       "`res.locals` é a ponte do middleware para todas as views.",
       "`app.use(fn)` é global, `app.use('/admin', fn)` é por prefixo, no `route.get` é por rota.",
       "Handler de erro tem 4 parâmetros e vai por último."
      ]
     }
    ]
   },
   {
    "slug": "05-mongodb",
    "titulo": "MongoDB",
    "icone": "◍",
    "cor": "#79c0ff",
    "resumo": "Conectar no banco e salvar dados com Model.",
    "topicos": [
     {
      "slug": "01-conexao-com-mongoose",
      "arquivo": "Node/src/05-mongodb/01-conexao-com-mongoose.js",
      "comando": "node src/05-mongodb/01-conexao-com-mongoose.js",
      "titulo": "Conectando no MongoDB com Mongoose",
      "sessao": 4,
      "oQueE": "MongoDB é o banco que guarda documentos (objetos JSON) em vez de linhas e colunas. Mongoose é a biblioteca que fala com ele e ainda impõe um formato.",
      "quandoUsar": "quando o dado do sistema precisa sobreviver ao restart do servidor — cadastro, pedido, contato. É o passo depois de guardar em arquivo.",
      "quandoNaoUsar": "para configuração (isso é .env) e para dado descartável de um script que roda uma vez e acaba.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Conectar, e falhar direito quando o banco está fora",
        "secao": "ESSENCIAL",
        "codigo": "const mongoose = require('mongoose');   // npm install mongoose\n\n// A URI de verdade vem do .env: mongodb+srv://usuario:senha@cluster.mongodb.net\n// Aqui apontamos para um MongoDB que não existe, só para ver o erro que aparece.\nmongoose\n  .connect('mongodb://127.0.0.1:27017', { dbName: 'cursojs01', serverSelectionTimeoutMS: 700 })\n  .then(() => console.log('Servidor pode subir: banco no ar.'))\n  .catch((erro) => {\n    console.log('Falha ao conectar no MongoDB:', erro.message);\n    console.log('Aqui o server.js faria process.exit(1) — melhor nem subir.');\n  });\n// Um servidor de pé sem banco só serve para dar erro 500 na cara de cada visitante."
       },
       {
        "n": 2,
        "titulo": "O dbName não está na URI",
        "secao": "ESSENCIAL",
        "codigo": "const enderecos = [\n  'mongodb+srv://igor:senha@cluster0.mongodb.net/?retryWrites=true',   // o que o Atlas te dá\n  'mongodb://127.0.0.1:27017/loja',                                    // com banco no fim\n];\n\nfor (const uri of enderecos) {\n  const caminho = new URL(uri).pathname.replace('/', '');\n  console.log(caminho || '(nenhum)', '←', uri.slice(0, 42) + '...');\n}\nconsole.log('\\nSem `{ dbName }`, o Mongoose grava num banco chamado \"test\" — e você jura que sumiu.');\nconsole.log('Por isso: mongoose.connect(uri, { dbName: process.env.MONGODB_DBNAME })');"
       },
       {
        "n": 3,
        "titulo": "Em que estado a conexão está",
        "secao": "ESSENCIAL",
        "codigo": "const odm = require('mongoose');\n\nconst estados = { 0: 'desconectado', 1: 'conectado', 2: 'conectando', 3: 'desconectando' };\nconst conexao = odm.createConnection();          // uma conexão nova, que ainda não conectou\nconsole.log('readyState:', conexao.readyState, '→', estados[conexao.readyState]);\nconsole.log('Todos os estados:', Object.entries(estados).map(([n, nome]) => `${n}=${nome}`).join(' · '));\n// Serve para uma rota /health responder se o servidor consegue mesmo falar com o banco."
       },
       {
        "n": 4,
        "titulo": "src/config/database.js: conectar e desconectar em um lugar só",
        "secao": "NA PRÁTICA",
        "codigo": "const banco = require('mongoose');\n\nconst uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';\nconst dbName = process.env.MONGODB_DBNAME || 'cursojs01';\n\nasync function conectar() {\n  await banco.connect(uri, { dbName, serverSelectionTimeoutMS: 700 });\n  console.log(`MongoDB: conectado ao banco \"${banco.connection.name}\".`);\n  return banco.connection;\n}\nasync function desconectar() {\n  await banco.disconnect();\n  console.log('MongoDB: conexão fechada.');\n}\n\nconectar().catch((erro) => console.log('conectar() falhou:', erro.name));\nconsole.log('module.exports = { mongoose, conectar, desconectar }');\n// `conectar()` uma vez, quando o servidor sobe. `desconectar()` uma vez, no Ctrl+C:\n//   process.on('SIGINT', async () => { server.close(); await desconectar(); process.exit(0); });"
       },
       {
        "n": 5,
        "titulo": "A conexão fica ABERTA",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('Script que roda e acaba → conecta, usa, fecha no finally. Correto.');\nconsole.log('Servidor               → conecta na subida e NÃO fecha. Também correto.');\nconsole.log('mongoose.connect() já abre um POOL e reaproveita em toda requisição.');\n// O exemplo que o Atlas mostra no site é o primeiro caso. Copiar aquele\n// `finally { client.close() }` para dentro de um servidor derruba tudo depois do 1º pedido.\n// E chamar `connect` dentro de um controller abre conexão a cada clique do usuário."
       },
       {
        "n": 6,
        "titulo": "A ordem no server.js",
        "secao": "NA PRÁTICA",
        "codigo": "console.log(`\nconectar()\n  .then(() => {\n    const server = app.listen(port, () => console.log('http://localhost:' + port));\n    process.on('SIGINT', async () => { server.close(); await desconectar(); process.exit(0); });\n  })\n  .catch((erro) => {\n    console.error('Falha ao conectar no MongoDB:', erro.message);\n    process.exit(1);\n  });`.trim());\n// Primeiro o banco responde, depois a porta abre. Nessa ordem."
       },
       {
        "n": 7,
        "titulo": "Senha com caractere especial precisa ser escapada",
        "secao": "PEGADINHAS",
        "codigo": "const senha = 'p@ss:word/2026';\n\nconsole.log('crua     → mongodb+srv://igor:' + senha + '@cluster... (URI inválida)');\nconsole.log('escapada → mongodb+srv://igor:' + encodeURIComponent(senha) + '@cluster...');\n\ntry {\n  new URL('mongodb+srv://igor:' + senha + '@cluster0.mongodb.net');\n} catch (erro) {\n  console.log('O que o Node diz:', erro.message);\n}\n// @ : / e ? têm significado dentro da URI. Senha com esses caracteres vira \"Invalid\n// connection string\" ou, pior, \"bad auth\" — e você jura que a senha está certa."
       }
      ],
      "resumo": [
       "URI e dbName vêm do .env; senha nunca no código.",
       "Informe `{ dbName }`: a URI do Atlas não traz nome de banco, e o padrão é \"test\".",
       "Conecte uma vez na subida e só desconecte no shutdown — `connect` já é um pool.",
       "Falhou a conexão? `process.exit(1)`: não suba um servidor que não atende.",
       "`readyState` diz em que pé está a conexão (0 desconectado, 1 conectado).",
       "Senha com @ : / ? precisa de `encodeURIComponent`."
      ]
     },
     {
      "slug": "02-schema-e-model",
      "arquivo": "Node/src/05-mongodb/02-schema-e-model.js",
      "comando": "node src/05-mongodb/02-schema-e-model.js",
      "titulo": "Schema e Model do Mongoose",
      "sessao": 4,
      "oQueE": "o schema é o contrato do documento (campos, tipos, obrigatoriedade); o model é o objeto que usa esse contrato para criar, buscar, atualizar e apagar no banco.",
      "quandoUsar": "um model por tipo de coisa que o sistema guarda — Contato, Produto, Usuario.",
      "quandoNaoUsar": "para dado que muda de formato a cada registro e não tem regra nenhuma — aí o schema atrapalha em vez de ajudar.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "src/models/Contato.js",
        "secao": "ESSENCIAL",
        "codigo": "const mongoose = require('mongoose');\n\nconst ContatoSchema = new mongoose.Schema({\n  nome: { type: String, required: true, trim: true },\n  criadoEm: { type: Date, default: Date.now },\n});\n\nconst Contato = mongoose.model('Contato', ContatoSchema);   // module.exports = ...\n\nconsole.log('Model    :', Contato.modelName, '(singular, com inicial maiúscula)');\nconsole.log('Collection:', Contato.collection.name, '← o Mongoose deixa minúsculo e pluraliza');"
       },
       {
        "n": 2,
        "titulo": "O schema arruma o dado antes de salvar",
        "secao": "ESSENCIAL",
        "codigo": "const odm = require('mongoose');\n\nconst ProdutoSchema = new odm.Schema({\n  nome: { type: String, required: true, trim: true },        // tira espaço das pontas\n  email: { type: String, lowercase: true },                  // deixa minúsculo\n  estoque: { type: Number, default: 0 },                     // valor padrão\n});\nconst Produto = odm.model('Produto', ProdutoSchema);\n\nconst item = new Produto({ nome: '  Teclado  ', email: 'VENDAS@Loja.COM' });\nconsole.log('nome   :', JSON.stringify(item.nome), '← trim');\nconsole.log('email  :', item.email, '← lowercase');\nconsole.log('estoque:', item.estoque, '← default');\nconsole.log('_id    :', item._id.toString().length, 'caracteres — gerado antes de ir ao banco');"
       },
       {
        "n": 3,
        "titulo": "O que não bate com o contrato é recusado",
        "secao": "ESSENCIAL",
        "codigo": "const mongo = require('mongoose');\n\nconst ClienteSchema = new mongo.Schema({\n  nome: { type: String, required: true, trim: true },\n  idade: { type: Number, min: 0 },\n});\nconst Cliente = mongo.model('Cliente', ClienteSchema);\n\n(async () => {\n  try {\n    await new Cliente({ nome: '   ' }).validate();       // trim deixa vazio → falha o required\n  } catch (erro) {\n    console.log(erro.name + ':', erro.errors.nome.message);\n  }\n  try {\n    await new Cliente({ nome: 'Ana', idade: -5 }).validate();\n  } catch (erro) {\n    console.log(erro.name + ':', erro.errors.idade.message);\n  }\n  const valido = await new Cliente({ nome: 'Ana', idade: 31 }).validate();\n  console.log('Documento válido passa?', valido === undefined);\n})();\n// Sem schema (driver puro), qualquer formato entra no banco e o problema só aparece depois."
       },
       {
        "n": 4,
        "titulo": "As operações do model",
        "secao": "NA PRÁTICA",
        "codigo": "const operacoes = [\n  ['await Contato.create({ nome })', 'cria um documento'],\n  ['await Contato.find({})', 'lista (array vazio se não achar)'],\n  ['await Contato.findById(id)', 'um só pelo _id (null se não achar)'],\n  ['await Contato.findByIdAndUpdate(id, dados, { new: true })', 'atualiza e devolve o NOVO'],\n  ['await Contato.findByIdAndDelete(id)', 'apaga'],\n];\n\nfor (const [chamada, oQueFaz] of operacoes) console.log(chamada.padEnd(58), oQueFaz);\nconsole.log('\\nTodas devolvem Promise: sempre com await, dentro de um controller async.');\nconsole.log('Sem `{ new: true }` o update devolve o documento COMO ERA antes — e você');\nconsole.log('mostra o valor antigo na tela achando que não salvou.');"
       },
       {
        "n": 5,
        "titulo": "A validação acontece ANTES de falar com o banco",
        "secao": "NA PRÁTICA",
        "codigo": "const banco = require('mongoose');\n\nconst PedidoSchema = new banco.Schema({ cliente: { type: String, required: true } });\nconst Pedido = banco.model('Pedido', PedidoSchema);\n\n(async () => {\n  const inicio = Date.now();\n  try {\n    await Pedido.create({});                    // sem banco nenhum conectado\n  } catch (erro) {\n    console.log(erro.name + ':', erro.message);\n    console.log('Demorou menos de 100ms?', Date.now() - inicio < 100, '← nem chegou a viajar');\n  }\n})();\n// Por isso o controller usa try/catch: erro de validação é exceção, não valor de retorno.\n//   try { await Contato.create({ nome }); req.flash('sucesso', 'Salvo.'); }\n//   catch (erro) { req.flash('erro', erro.message); }\n//   return res.redirect('/');"
       },
       {
        "n": 6,
        "titulo": "O _id não é uma string qualquer",
        "secao": "NA PRÁTICA",
        "codigo": "const orm = require('mongoose');\n\nconsole.log('formato válido  :', orm.Types.ObjectId.isValid('65f1c2a4e8b9d1234567890a'));\nconsole.log('id inventado    :', orm.Types.ObjectId.isValid('abc'));\n\nconst ContaSchema = new orm.Schema({ titular: String });\nconst Conta = orm.model('Conta', ContaSchema);\n\n(async () => {\n  try {\n    await Conta.findById('abc');               // veio de /contas/abc digitado na URL\n  } catch (erro) {\n    console.log(erro.name + ':', erro.message.split(' for model')[0]);\n  }\n})();\n// Repare: LANÇA, não devolve null. Sem try/catch, uma URL digitada errado vira erro 500.\n// O certo é checar com isValid e responder 404."
       },
       {
        "n": 7,
        "titulo": "Model é singular; a collection é que vira plural",
        "secao": "PEGADINHAS",
        "codigo": "const mangusto = require('mongoose');\n\nfor (const nome of ['Categoria', 'Pessoa', 'Endereco', 'Fornecedor']) {\n  const Modelo = mangusto.model(nome, new mangusto.Schema({ campo: String }));\n  console.log(`mongoose.model('${nome}')`.padEnd(30), '→ collection', Modelo.collection.name);\n}\nconsole.log('\\nO pluralizador é INGLÊS: \"Fornecedor\" vira \"fornecedors\", não \"fornecedores\".');\nconsole.log('E model no plural piora: \"Contatos\" viraria a collection \"contatoss\".');\nconsole.log('Se o nome incomodar, passe o seu: mongoose.model(nome, schema, \"fornecedores\").');"
       }
      ],
      "resumo": [
       "Schema = contrato do documento; model = as operações. Um arquivo por model, no singular.",
       "`mongoose.model('Contato', ...)` grava na collection \"contatos\".",
       "`required`, `trim`, `lowercase`, `default` e `min` arrumam e validam antes do banco.",
       "create / find / findById / findByIdAndUpdate / findByIdAndDelete — todas com await.",
       "Validação lança exceção: sempre try/catch. `{ new: true }` para receber o atualizado.",
       "Id malformado lança CastError — cheque com `ObjectId.isValid` e responda 404."
      ]
     }
    ]
   },
   {
    "slug": "06-sessao-e-seguranca",
    "titulo": "Sessão e Segurança",
    "icone": "⚿",
    "cor": "#f78fb3",
    "resumo": "Session, flash, CSRF e Helmet.",
    "topicos": [
     {
      "slug": "01-sessao-e-cookies",
      "arquivo": "Node/src/06-sessao-e-seguranca/01-sessao-e-cookies.js",
      "comando": "node src/06-sessao-e-seguranca/01-sessao-e-cookies.js",
      "titulo": "Sessão e cookies",
      "sessao": 4,
      "oQueE": "HTTP não tem memória — cada requisição chega como se fosse a primeira. A sessão é o crachá: o servidor guarda os dados e manda ao navegador um cookie só com o id.",
      "quandoUsar": "para lembrar quem está logado, o que tem no carrinho, a preferência de tema.",
      "quandoNaoUsar": "para guardar muita coisa. A sessão é lida em TODA requisição; jogue lá o id do usuário, não o perfil inteiro.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Sem sessão, o servidor não lembra de nada",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\n\nconst app = express();\nlet contador = 0;\napp.get('/', (req, res) => res.send('visitas no servidor inteiro: ' + ++contador));\n\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}/`;\n  console.log(await fetch(url).then((r) => r.text()));\n  console.log(await fetch(url).then((r) => r.text()), '← e se fosse OUTRA pessoa? Mesmo número.');\n  console.log('Um contador solto conta TODO MUNDO junto. É por isso que a sessão existe.');\n  servidor.close();\n});"
       },
       {
        "n": 2,
        "titulo": "Com sessão, cada visitante tem o seu",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\nconst session = require('express-session');       // npm install express-session\n\nconst site = expresso();\nsite.use(session({\n  secret: 'algo-bem-aleatorio',                   // no projeto isto vem do .env\n  resave: false,                                  // não regrava a sessão se nada mudou\n  saveUninitialized: false,                       // não cria sessão para quem só passou pelo site\n}));\nsite.get('/', (req, res) => {\n  req.session.visitas = (req.session.visitas || 0) + 1;   // escrever é só isto\n  res.send('suas visitas: ' + req.session.visitas);\n});\n\nconst s2 = site.listen(0, async () => {\n  const url = `http://localhost:${s2.address().port}/`;\n  const primeira = await fetch(url);\n  const cookie = primeira.headers.get('set-cookie').split(';')[0];   // o navegador guarda sozinho\n\n  console.log('1ª visita  →', await primeira.text());\n  console.log('2ª visita  →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));\n  console.log('3ª visita  →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));\n  console.log('sem cookie →', await fetch(url).then((r) => r.text()), '← janela anônima');\n  s2.close();\n});"
       },
       {
        "n": 3,
        "titulo": "O que viaja no cookie é só o id",
        "secao": "ESSENCIAL",
        "codigo": "const framework = require('express');\nconst sessao = require('express-session');\n\nconst loja = framework();\nloja.use(sessao({ secret: 'algo-bem-aleatorio', resave: false, saveUninitialized: false }));\nloja.get('/', (req, res) => {\n  req.session.usuario = 'Igor';\n  req.session.carrinho = ['Teclado', 'Mouse'];\n  res.send('guardado');\n});\n\nconst s3 = loja.listen(0, async () => {\n  const resposta = await fetch(`http://localhost:${s3.address().port}/`);\n  const cookie = resposta.headers.get('set-cookie');\n  console.log('Nome do cookie   :', cookie.split('=')[0]);\n  console.log('Tem \"Igor\" nele? :', cookie.includes('Igor'), '← os dados ficam no SERVIDOR');\n  console.log('Tem HttpOnly?    :', cookie.includes('HttpOnly'), '← o JS da página não lê o cookie');\n  s3.close();\n});\n// Por isso o `secret` importa tanto: ele assina o id. Quem tem o segredo forja um cookie\n// e vira qualquer usuário — e é por isso que ele mora no .env, nunca no código."
       },
       {
        "n": 4,
        "titulo": "Login: o padrão de todo sistema com usuário",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\nconst guardaSessao = require('express-session');\n\nconst painel = web();\npainel.use(web.urlencoded({ extended: true }));\npainel.use(guardaSessao({ secret: 'algo-bem-aleatorio', resave: false, saveUninitialized: false }));\n\npainel.post('/login', (req, res) => {\n  if (req.body.senha !== '1234') return res.status(401).send('senha errada');\n  req.session.usuario = req.body.email;           // o \"crachá\" é isto: um dado na sessão\n  res.send('bem-vindo, ' + req.session.usuario);\n});\npainel.get('/painel', (req, res) => {\n  if (!req.session.usuario) return res.status(401).send('faça login primeiro');\n  res.send('painel de ' + req.session.usuario);\n});\npainel.post('/sair', (req, res) => req.session.destroy(() => res.send('até logo')));\n\nconst s4 = painel.listen(0, async () => {\n  const url = `http://localhost:${s4.address().port}`;\n  console.log('painel sem login →', await fetch(url + '/painel').then((r) => r.text()));\n\n  const entrada = await fetch(url + '/login', {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },\n    body: 'email=igor@email.com&senha=1234',\n  });\n  const cookie = entrada.headers.get('set-cookie').split(';')[0];\n  const verPainel = () => fetch(url + '/painel', { headers: { cookie } }).then((r) => r.text());\n\n  console.log('login            →', await entrada.text());\n  console.log('painel com login →', await verPainel());\n\n  await fetch(url + '/sair', { method: 'POST', headers: { cookie } });\n  console.log('depois do logout →', await verPainel());\n  s4.close();\n});"
       },
       {
        "n": 5,
        "titulo": "Onde as sessões ficam guardadas",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('Sem store (o padrão) → memória do processo:');\nconsole.log('  · some tudo a cada restart (e o nodemon reinicia o dia inteiro)');\nconsole.log('  · a memória cresce sem parar conforme os acessos aumentam');\nconsole.log('Com connect-mongo    → grava no MongoDB, reaproveitando a conexão do Mongoose:');\nconsole.log(`\n  store: MongoStore.create({\n    clientPromise: mongoose.connection.asPromise().then((conn) => conn.getClient()),\n    dbName: process.env.MONGODB_DBNAME,   // sem isto as sessões vão para o banco \"test\"\n  }),`.trim());\n// Reaproveitar a conexão importa: abrir uma segunda só para as sessões é conexão jogada fora."
       },
       {
        "n": 6,
        "titulo": "As opções do cookie que são segurança",
        "secao": "NA PRÁTICA",
        "codigo": "const opcoes = [\n  ['httpOnly: true', 'o JavaScript da página não lê o cookie — barra roubo por XSS'],\n  ['sameSite: \"lax\"', 'o cookie não viaja em pedido vindo de outro site — defesa contra CSRF'],\n  ['secure: true', 'só trafega em HTTPS. Em produção, ligue; no localhost, false'],\n  ['maxAge: 604800000', 'validade em MILISSEGUNDOS — aqui, uma semana'],\n];\n\nfor (const [opcao, porque] of opcoes) console.log(opcao.padEnd(20), porque);\nconsole.log('\\nUma semana em ms:', 1000 * 60 * 60 * 24 * 7);"
       },
       {
        "n": 7,
        "titulo": "Sessão registrada depois da rota não existe",
        "secao": "PEGADINHAS",
        "codigo": "const servidorWeb = require('express');\nconst memoria = require('express-session');\n\nconst errado = servidorWeb();\nerrado.get('/', (req, res) => res.send('req.session é ' + req.session));\nerrado.use(memoria({ secret: 'x', resave: false, saveUninitialized: false }));   // tarde demais\n\nconst s7 = errado.listen(0, async () => {\n  const url = `http://localhost:${s7.address().port}/`;\n  console.log('rota antes da sessão →', await fetch(url).then((r) => r.text()));\n  console.log('A ordem no server.js: parser → session → flash → middlewares → routes.');\n  s7.close();\n});\n// `flash()` antes de `session` derruba o servidor, porque o connect-flash guarda dentro\n// de `req.session`. A ordem aqui é dependência, não estilo."
       }
      ],
      "resumo": [
       "HTTP não lembra nada; a sessão é o crachá — cookie com o id, dados no servidor.",
       "Usar é só escrever e ler `req.session.algo`.",
       "`secret` assina o cookie e mora no .env; `req.session.destroy()` faz o logout.",
       "Sempre com store (connect-mongo): memória perde tudo no restart e vaza RAM.",
       "`httpOnly`, `sameSite: 'lax'` e, em produção, `secure: true`.",
       "Ordem no server.js: parser → session → flash → middlewares → routes."
      ]
     },
     {
      "slug": "02-mensagens-flash",
      "arquivo": "Node/src/06-sessao-e-seguranca/02-mensagens-flash.js",
      "comando": "node src/06-sessao-e-seguranca/02-mensagens-flash.js",
      "titulo": "Mensagens flash e Post/Redirect/Get",
      "sessao": 4,
      "oQueE": "um recado guardado na sessão que é lido UMA vez e apagado sozinho. Serve para avisar \"cadastrado com sucesso\" numa requisição que veio depois de um redirect.",
      "quandoUsar": "sempre que um POST terminar em `res.redirect` — cadastro, edição, exclusão, login e logout.",
      "quandoNaoUsar": "para dado que a próxima tela precisa de verdade. Flash é recado, não transporte de dados: o que a página precisa, ela busca de novo.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O problema: responder o POST com HTML",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\n\nconst app = express();\napp.use(express.urlencoded({ extended: true }));\nlet cadastrados = [];\napp.post('/', (req, res) => {\n  cadastrados.push(req.body.nome);\n  res.send(`<h1>Cadastrado!</h1> total: ${cadastrados.length}`);   // ← o problema está aqui\n});\n\nconst servidor = app.listen(0, async () => {\n  const url = `http://localhost:${servidor.address().port}/`;\n  const enviar = () => fetch(url, {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'nome=Igor',\n  }).then((r) => r.text());\n\n  console.log('envio    →', await enviar());\n  console.log('F5       →', await enviar(), '← o navegador reenviou o formulário');\n  console.log('Cadastrados:', cadastrados, '← duas vezes a mesma pessoa');\n  servidor.close();\n});"
       },
       {
        "n": 2,
        "titulo": "A solução: Post/Redirect/Get",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\n\nconst site = expresso();\nsite.use(expresso.urlencoded({ extended: true }));\nconst lista = [];\nsite.get('/', (req, res) => res.send('total: ' + lista.length));\nsite.post('/', (req, res) => {\n  lista.push(req.body.nome);\n  return res.redirect('/');                    // responde com um DESVIO, não com HTML\n});\n\nconst s2 = site.listen(0, async () => {\n  const url = `http://localhost:${s2.address().port}/`;\n  const post = await fetch(url, {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },\n    body: 'nome=Igor', redirect: 'manual',\n  });\n  console.log('POST responde →', post.status, 'para', post.headers.get('location'));\n  console.log('GET depois    →', await fetch(url).then((r) => r.text()));\n  console.log('F5 agora repete só o GET, que é inofensivo. Ninguém cadastra de novo.');\n  s2.close();\n});"
       },
       {
        "n": 3,
        "titulo": "O problema seguinte: o redirect apaga tudo",
        "secao": "ESSENCIAL",
        "codigo": "const framework = require('express');\nconst session = require('express-session');\nconst flash = require('connect-flash');          // npm install connect-flash\n\nconst loja = framework();\nloja.use(framework.urlencoded({ extended: true }));\nloja.use(session({ secret: 'algo-aleatorio', resave: false, saveUninitialized: false }));\nloja.use(flash());                               // DEPOIS da sessão: o flash guarda dentro dela\n\nloja.post('/', (req, res) => {\n  req.flash('sucesso', `Formulário recebido. Olá, ${req.body.nome}!`);   // escreve...\n  return res.redirect('/');\n});\nloja.get('/', (req, res) => res.send('recados: ' + JSON.stringify(req.flash('sucesso'))));  // ...e lê\n\nconst s3 = loja.listen(0, async () => {\n  const url = `http://localhost:${s3.address().port}/`;\n  const post = await fetch(url, {\n    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },\n    body: 'nome=Igor', redirect: 'manual',\n  });\n  const cookie = post.headers.get('set-cookie').split(';')[0];\n\n  console.log('GET depois do POST →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));\n  console.log('F5 na mesma página →', await fetch(url, { headers: { cookie } }).then((r) => r.text()));\n  s3.close();\n});\n// Ler ESVAZIA a fila: é essa a diferença entre flash e sessão comum. O contador de visitas\n// fica; a mensagem passa uma vez e some."
       },
       {
        "n": 4,
        "titulo": "O controller completo, com erro e sucesso",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\nconst guardaSessao = require('express-session');\nconst recado = require('connect-flash');\n\nconst cadastro = web();\ncadastro.use(web.urlencoded({ extended: true }));\ncadastro.use(guardaSessao({ secret: 'algo-aleatorio', resave: false, saveUninitialized: false }));\ncadastro.use(recado());\n\ncadastro.post('/', (req, res) => {                 // src/controllers/homeController.js\n  const nome = (req.body.nome || '').trim();\n  if (!nome) req.flash('erro', 'O nome não pode ficar vazio.');\n  else req.flash('sucesso', `Formulário recebido. Olá, ${nome}!`);\n  return res.redirect('/');                        // redirect com erro TAMBÉM\n});\ncadastro.get('/', (req, res) => res.json({ sucessos: req.flash('sucesso'), erros: req.flash('erro') }));\n\nconst s4 = cadastro.listen(0, async () => {\n  const url = `http://localhost:${s4.address().port}/`;\n  const enviar = async (corpo) => {\n    const post = await fetch(url, {\n      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },\n      body: corpo, redirect: 'manual',\n    });\n    const cookie = post.headers.get('set-cookie').split(';')[0];\n    return fetch(url, { headers: { cookie } }).then((r) => r.text());\n  };\n  console.log('com nome →', await enviar('nome=Igor'));\n  console.log('vazio    →', await enviar('nome=%20%20'));\n  s4.close();\n});"
       },
       {
        "n": 5,
        "titulo": "O middleware que entrega o flash para as views",
        "secao": "NA PRÁTICA",
        "codigo": "const servidorWeb = require('express');\nconst sessaoDeUsuario = require('express-session');\nconst mensagens = require('connect-flash');\n\nconst expoeFlash = (req, res, next) => {         // src/middlewares/middleware.js\n  res.locals.sucessos = req.flash('sucesso');    // lê UMA vez, aqui...\n  res.locals.erros = req.flash('erro');\n  next();\n};\n\nconst portal = servidorWeb();\nportal.use(sessaoDeUsuario({ secret: 'x', resave: false, saveUninitialized: false }));\nportal.use(mensagens());\nportal.use(expoeFlash);                          // depois do flash(), senão req.flash não existe\nportal.get('/avisar', (req, res) => { req.flash('sucesso', 'Contato salvo.'); res.redirect('/'); });\nportal.get('/', (req, res) =>\n  res.send(res.locals.sucessos.map((m) => `<div class=\"ok\">${m}</div>`).join('') || '(sem recado)'));\n\nconst s5 = portal.listen(0, async () => {\n  const url = `http://localhost:${s5.address().port}`;\n  const ida = await fetch(url + '/avisar', { redirect: 'manual' });\n  const cookie = ida.headers.get('set-cookie').split(';')[0];\n  const abrir = () => fetch(url + '/', { headers: { cookie } }).then((r) => r.text());\n  console.log('página depois do aviso →', await abrir());\n  console.log('recarregando           →', await abrir());\n  s5.close();\n});\n// Nenhum controller repete isso: todos os `res.render` já enxergam `sucessos` e `erros`.\n// Na view: <% sucessos.forEach((msg) => { %><div class=\"ok\"><%= msg %></div><% }) %>"
       },
       {
        "n": 6,
        "titulo": "Ler o flash duas vezes perde a mensagem",
        "secao": "PEGADINHAS",
        "codigo": "const aplicacao = require('express');\nconst guarda = require('express-session');\nconst aviso = require('connect-flash');\n\nconst app6 = aplicacao();\napp6.use(guarda({ secret: 'x', resave: false, saveUninitialized: false }));\napp6.use(aviso());\napp6.get('/', (req, res) => {\n  req.flash('sucesso', 'Contato salvo.');\n  console.log('1ª leitura (o \"confere\" do controller):', req.flash('sucesso'));\n  console.log('2ª leitura (o middleware da view)     :', req.flash('sucesso'), '← já era');\n  res.send('fim');\n});\n\nconst s6 = app6.listen(0, async () => {\n  await fetch(`http://localhost:${s6.address().port}/`);\n  console.log('Leia em um lugar só: no middleware que expõe para as views.');\n  s6.close();\n});"
       },
       {
        "n": 7,
        "titulo": "O valor lido é sempre um array",
        "secao": "PEGADINHAS",
        "codigo": "const framework7 = require('express');\nconst sessao7 = require('express-session');\nconst flash7 = require('connect-flash');\n\nconst app7 = framework7();\napp7.use(sessao7({ secret: 'x', resave: false, saveUninitialized: false }));\napp7.use(flash7());\napp7.get('/', (req, res) => {\n  req.flash('erro', 'E-mail inválido.');\n  req.flash('erro', 'Senha muito curta.');       // duas mensagens do mesmo tipo\n  const erros = req.flash('erro');\n  res.json({ tipo: Array.isArray(erros) ? 'array' : typeof erros, erros });\n});\n\nconst s7 = app7.listen(0, async () => {\n  console.log(await fetch(`http://localhost:${s7.address().port}/`).then((r) => r.text()));\n  console.log('Por isso na view é forEach, não if: pode haver 0, 1 ou várias.');\n  s7.close();\n});"
       }
      ],
      "resumo": [
       "Responder um POST com HTML faz o F5 reenviar o formulário: use Post/Redirect/Get.",
       "O redirect cria uma requisição nova e limpa — o flash é o recado que atravessa.",
       "`req.flash('sucesso', 'msg')` escreve; `req.flash('sucesso')` lê E APAGA.",
       "Registre `flash()` depois de `session`, e o middleware que expõe depois de `flash()`.",
       "Exponha uma vez em `res.locals` e leia na view; ler duas vezes perde a mensagem.",
       "O valor lido é sempre array — na view, forEach."
      ]
     }
    ]
   },
   {
    "slug": "07-extras",
    "titulo": "Extras",
    "icone": "◇",
    "cor": "#8b95a8",
    "resumo": "Bom conhecer: fora da trilha do curso.",
    "topicos": [
     {
      "slug": "01-webpack-e-babel",
      "arquivo": "Node/src/07-extras/01-webpack-e-babel.js",
      "comando": "node src/07-extras/01-webpack-e-babel.js",
      "titulo": "webpack e Babel — empacotando o frontend",
      "sessao": 4,
      "oQueE": "o webpack junta todos os arquivos do NAVEGADOR em um bundle.js só; o Babel traduz o JavaScript moderno para o que navegador antigo entende.",
      "quandoUsar": "quando o front tem vários arquivos, importa css e precisa rodar em navegador velho. Em projeto novo hoje, o Vite faz o mesmo com menos configuração.",
      "quandoNaoUsar": "para uma página com 20 linhas de JS. Um `<script>` resolve, e configurar build aí é trabalho sem retorno.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Entrada e saída",
        "secao": "ESSENCIAL",
        "codigo": "console.log('frontend/main.js   → o que VOCÊ escreve      (entry)');\nconsole.log('   ↓ webpack + babel-loader + css-loader');\nconsole.log('public/assets/js/bundle.js → o que o NAVEGADOR baixa (output)');\nconsole.log('\\nO Express serve public/. Ele nunca olha para frontend/.');"
       },
       {
        "n": 2,
        "titulo": "webpack.config.js é um objeto JavaScript comum",
        "secao": "ESSENCIAL",
        "codigo": "const path = require('node:path');   // CommonJS: quem roda este arquivo é o Node, não o navegador\n\nconst config = {\n  mode: 'production',                          // `npm run dev` sobrescreve com --mode development\n  entry: './frontend/main.js',                 // por onde o webpack começa a montar o bundle\n  output: {\n    path: path.resolve('/projeto', 'public', 'assets', 'js'),\n    filename: 'bundle.js',\n  },\n  module: {\n    rules: [\n      { test: /\\.js$/, exclude: /node_modules/, use: 'babel-loader' },\n      { test: /\\.css$/, use: ['style-loader', 'css-loader'] },\n    ],\n  },\n  devtool: 'source-map',                       // gera o bundle.js.map, que liga o bundle ao fonte\n};\n\nconsole.log('entry :', config.entry);\nconsole.log('saída :', path.join(config.output.path, config.output.filename));\nfor (const regra of config.module.rules)\n  console.log('regra :', String(regra.test), '→', [regra.use].flat().join(' + '));\n// `module.exports = config` no fim do arquivo, e o webpack lê isso ao rodar `npm run build`."
       },
       {
        "n": 3,
        "titulo": "Um loader por tipo de arquivo",
        "secao": "ESSENCIAL",
        "codigo": "const rules = [\n  { test: '/\\\\.js$/', use: 'babel-loader', oQueFaz: 'traduz JS moderno' },\n  { test: '/\\\\.css$/', use: 'css-loader → style-loader', oQueFaz: 'faz o import de css funcionar' },\n];\n\nfor (const r of rules) console.log(r.test.padEnd(12), r.use.padEnd(26), r.oQueFaz);\nconsole.log('\\nA lista do `use` roda de TRÁS PARA A FRENTE: css-loader primeiro, style-loader depois.');\n// css-loader transforma o css em módulo JS; style-loader injeta esse módulo na página."
       },
       {
        "n": 4,
        "titulo": "O que entra no bundle: tudo que o entry importa",
        "secao": "NA PRÁTICA",
        "codigo": "const { writeFileSync, mkdirSync, mkdtempSync, readFileSync } = require('node:fs');\nconst { join, dirname } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst front = mkdtempSync(join(tmpdir(), 'frontend-'));\nmkdirSync(join(front, 'assets'), { recursive: true });\nwriteFileSync(join(front, 'main.js'), `\n  import './assets/style.css';\n  import { saudacao } from './saudacao.js';\n  document.addEventListener('DOMContentLoaded', () => console.log(saudacao('Igor')));\n`);\nwriteFileSync(join(front, 'saudacao.js'),\n  \"export const saudacao = (nome = 'visitante') => `Olá, ${nome}!`;\");\nwriteFileSync(join(front, 'assets', 'style.css'), 'body { font-family: sans-serif; }');\n\n// É isto que o webpack faz primeiro: seguir os imports a partir do entry.\nconst visitados = [];\nconst seguir = (arquivo) => {\n  visitados.push(arquivo.replace(front + '/', ''));\n  if (!arquivo.endsWith('.js')) return;\n  for (const [, alvo] of readFileSync(arquivo, 'utf8').matchAll(/import\\s+(?:.*?from\\s+)?'(\\.[^']+)'/g)) {\n    seguir(join(dirname(arquivo), alvo));\n  }\n};\nseguir(join(front, 'main.js'));\n\nconsole.log('entry:', visitados[0]);\nconsole.log('entra no bundle.js:', visitados.join(' + '));\nconsole.log('O css também: o css-loader transforma em módulo e o style-loader injeta na página.');\n// No frontend é `import`, código do navegador. No server.js é `require`, código do Node.\n// Dois mundos no mesmo projeto — e o webpack é a ponte."
       },
       {
        "n": 5,
        "titulo": "O que o Babel faz com esse código",
        "secao": "NA PRÁTICA",
        "codigo": "const moderno = \"const saudacao = (nome = 'visitante') => `Olá, ${nome}!`;\";\nconst traduzido = 'var saudacao = function (nome) {\\n' +\n  \"  if (nome === undefined) nome = 'visitante';\\n\" +\n  \"  return 'Olá, ' + nome + '!';\\n};\";\n\nconsole.log('Você escreve:\\n' + moderno);\nconsole.log('O navegador antigo recebe:\\n' + traduzido);\n// O ALVO da tradução não está no webpack.config.js: vem do campo `browserslist` do\n// package.json (\"> 0.5%\", \"last 2 versions\", \"not dead\")."
       },
       {
        "n": 6,
        "titulo": "Os scripts do dia a dia",
        "secao": "NA PRÁTICA",
        "codigo": "console.log('npm run build → webpack --mode production            (gera o bundle minificado)');\nconsole.log('npm run dev   → webpack --mode development --watch   (refaz a cada save)');\nconsole.log('npm start     → nodemon server.js --ignore public --ignore frontend');\n// O --ignore evita o loop: o build reescreve public/, o nodemon veria a mudança e\n// reiniciaria o servidor sem parar."
       },
       {
        "n": 7,
        "titulo": "Onde cada pacote entra: dependency ou devDependency",
        "secao": "PEGADINHAS",
        "codigo": "const pacotes = [\n  ['webpack, webpack-cli', 'dev', 'roda na SUA máquina, no build'],\n  ['babel-loader, @babel/preset-env', 'dev', 'idem'],\n  ['css-loader, style-loader', 'dev', 'idem'],\n  ['core-js', 'PROD', 'o Babel injeta esse código DENTRO do bundle → vai para o usuário'],\n];\n\nfor (const [nome, onde, porque] of pacotes) console.log(onde.padEnd(5), nome.padEnd(34), porque);\nconsole.log('\\nA pergunta não é \"é ferramenta?\" — é \"esse código chega no produto final?\".');"
       },
       {
        "n": 8,
        "titulo": "Editar o bundle.js gerado",
        "secao": "PEGADINHAS",
        "codigo": "console.log('public/assets/js/bundle.js é SAÍDA: o próximo `npm run build` apaga tudo.');\nconsole.log('Mexa em frontend/main.js e rode o build de novo.');\n// O bundle.js.map existe justamente para isso: no DevTools você vê o seu código-fonte,\n// não o bundle minificado, mesmo depurando o arquivo empacotado."
       }
      ],
      "resumo": [
       "`entry` (frontend/) → webpack → `output` (public/), que é o que o Express serve.",
       "Um loader por tipo de arquivo; a lista de `use` roda de trás para a frente.",
       "O Babel traduz o JS moderno; o alvo vem do `browserslist` do package.json.",
       "`import` no frontend, `require` no servidor — dois mundos no mesmo projeto.",
       "core-js é dependency porque vai dentro do bundle; o resto do build é devDependency.",
       "Nunca edite o bundle gerado; o build sobrescreve."
      ]
     }
    ]
   }
  ]
 }
];
