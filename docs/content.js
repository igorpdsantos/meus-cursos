/* GERADO por docs/build.mjs — não edite à mão. Edite os .js em <CURSO>/src/ e rode o build. */
window.CONTEUDO = [
 {
  "slug": "javascript",
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
      "arquivo": "javascript/src/01-fundamentos/01-let-const-var.js",
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
      "arquivo": "javascript/src/01-fundamentos/02-strings.js",
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
      "arquivo": "javascript/src/01-fundamentos/03-numeros.js",
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
      "arquivo": "javascript/src/01-fundamentos/04-split-e-join.js",
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
      "arquivo": "javascript/src/02-arrays-e-objetos/01-arrays.js",
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
      "arquivo": "javascript/src/02-arrays-e-objetos/02-copiar-e-cortar.js",
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
      "arquivo": "javascript/src/02-arrays-e-objetos/03-desestruturacao.js",
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
      "arquivo": "javascript/src/02-arrays-e-objetos/04-object-freeze.js",
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
      "arquivo": "javascript/src/02-arrays-e-objetos/05-object-keys-values-entries.js",
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
      "arquivo": "javascript/src/02-arrays-e-objetos/06-object-assign.js",
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
      "arquivo": "javascript/src/03-controle-de-fluxo/01-for.js",
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
      "arquivo": "javascript/src/03-controle-de-fluxo/02-while.js",
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
      "arquivo": "javascript/src/03-controle-de-fluxo/03-try-catch.js",
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
      "arquivo": "javascript/src/04-funcoes/01-funcoes-e-parametros.js",
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
      "arquivo": "javascript/src/04-funcoes/02-escopo.js",
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
      "arquivo": "javascript/src/04-funcoes/03-closures.js",
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
      "arquivo": "javascript/src/04-funcoes/04-callbacks.js",
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
      "arquivo": "javascript/src/04-funcoes/05-factory-functions.js",
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
      "arquivo": "javascript/src/04-funcoes/06-recursao.js",
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
      "arquivo": "javascript/src/05-transformar-listas/01-foreach.js",
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
      "arquivo": "javascript/src/05-transformar-listas/02-filter.js",
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
      "arquivo": "javascript/src/05-transformar-listas/03-map.js",
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
      "arquivo": "javascript/src/05-transformar-listas/04-reduce.js",
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
      "arquivo": "javascript/src/05-transformar-listas/05-encadeando.js",
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
      "arquivo": "javascript/src/06-assincrono/01-settimeout-setinterval.js",
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
      "arquivo": "javascript/src/06-assincrono/02-promises.js",
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
      "arquivo": "javascript/src/06-assincrono/03-async-await.js",
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
      "arquivo": "javascript/src/06-assincrono/04-promise-combinadores.js",
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
      "arquivo": "javascript/src/07-extras/01-iife.js",
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
      "arquivo": "javascript/src/07-extras/02-constructor-functions.js",
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
      "arquivo": "javascript/src/07-extras/03-geradoras.js",
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
      "arquivo": "javascript/src/07-extras/04-geradoras-quando-usar.js",
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
      "arquivo": "javascript/src/07-extras/05-define-property.js",
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
      "arquivo": "javascript/src/07-extras/06-getters-e-setters.js",
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
      "arquivo": "javascript/src/07-extras/07-descritores.js",
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
      "arquivo": "javascript/src/07-extras/08-prototype.js",
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
      "arquivo": "javascript/src/07-extras/09-heranca-e-delegacao.js",
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
      "arquivo": "javascript/src/07-extras/10-composicao-e-mixins.js",
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
      "arquivo": "javascript/src/07-extras/11-tres-formas-de-criar-objetos.js",
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
      "arquivo": "javascript/src/08-classes/01-class-basico.js",
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
      "arquivo": "javascript/src/08-classes/02-heranca-com-extends.js",
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
      "arquivo": "javascript/src/08-classes/03-sobrescrever-metodos.js",
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
      "arquivo": "javascript/src/08-classes/04-metodos-estaticos.js",
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
  "slug": "node",
  "titulo": "Node",
  "selo": "N",
  "subtitulo": "JavaScript no servidor",
  "ordem": 2,
  "cor": "#6ee7a8",
  "resumo": "A mesma linguagem, fora do navegador: módulos, npm, arquivos, Express, MongoDB e sessão. Aqui o JavaScript ganha porta, rota e banco de dados.",
  "depoisDe": "javascript",
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
      "arquivo": "node/src/01-modulos/01-commonjs-vs-esm.js",
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
      "arquivo": "node/src/02-npm/01-package-json.js",
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
      "arquivo": "node/src/02-npm/02-scripts-e-nodemon.js",
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
      "arquivo": "node/src/02-npm/03-dependencias-e-versoes.js",
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
      "arquivo": "node/src/02-npm/04-variaveis-de-ambiente.js",
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
        "codigo": "const { writeFileSync, mkdtempSync, readFileSync } = require('node:fs');\nconst { join } = require('node:path');\nconst { tmpdir } = require('node:os');\n\nconst pasta = mkdtempSync(join(tmpdir(), 'env-'));\nwriteFileSync(join(pasta, '.env'), [\n  'MONGODB_URI=mongodb+srv://user:senha@cluster0.exemplo.net',\n  'SESSION_SECRET=algo-bem-aleatorio',\n].join('\\n'));\n\nfor (const linha of readFileSync(join(pasta, '.env'), 'utf8').split('\\n').filter(Boolean)) {\n  const [chave, ...resto] = linha.split('=');\n  process.env[chave] = resto.join('=');                 // é isto que o dotenv faz: lê e copia\n}\n\nconsole.log('Segredo da sessão  :', process.env.SESSION_SECRET);\nconsole.log('Banco             :', process.env.MONGODB_URI.slice(0, 20) + '...');\n// Na vida real: require('dotenv').config();"
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
      "arquivo": "node/src/03-arquivos-com-fs/01-path-e-dirname.js",
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
        "codigo": "console.log('__dirname :', __dirname);      // .../Node/src/03-arquivos-com-fs\nconsole.log('__filename:', __filename);     // .../01-path-e-dirname.js\nconsole.log('cwd       :', process.cwd());  // a pasta do terminal — pode ser QUALQUER uma\n// Rodar `node node/src/03-arquivos-com-fs/01-path-e-dirname.js` de casa muda o cwd,\n// mas não muda o __dirname. Por isso caminho de projeto sempre parte de __dirname."
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
      "arquivo": "node/src/03-arquivos-com-fs/02-ler-e-escrever.js",
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
      "arquivo": "node/src/04-express/01-servidor-e-rotas.js",
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
      "arquivo": "node/src/04-express/02-params-query-body.js",
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
      "arquivo": "node/src/04-express/03-router-e-controllers.js",
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
      "arquivo": "node/src/04-express/04-views-com-ejs.js",
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
      "arquivo": "node/src/04-express/05-arquivos-estaticos.js",
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
      "arquivo": "node/src/04-express/06-middlewares.js",
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
      "arquivo": "node/src/05-mongodb/01-conexao-com-mongoose.js",
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
        "codigo": "const mongoose = require('mongoose');   // npm install mongoose\n\n// A URI de verdade vem do .env: mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net\n// Aqui apontamos para um MongoDB que não existe, só para ver o erro que aparece.\nmongoose\n  .connect('mongodb://127.0.0.1:27017', { dbName: 'cursojs01', serverSelectionTimeoutMS: 700 })\n  .then(() => console.log('Servidor pode subir: banco no ar.'))\n  .catch((erro) => {\n    console.log('Falha ao conectar no MongoDB:', erro.message);\n    console.log('Aqui o server.js faria process.exit(1) — melhor nem subir.');\n  });\n// Um servidor de pé sem banco só serve para dar erro 500 na cara de cada visitante."
       },
       {
        "n": 2,
        "titulo": "O dbName não está na URI",
        "secao": "ESSENCIAL",
        "codigo": "const enderecos = [\n  'mongodb+srv://igor:senha@cluster0.exemplo.net/?retryWrites=true',   // no Atlas o host acaba em .mongodb.net\n  'mongodb://127.0.0.1:27017/loja',                                    // com banco no fim\n];\n\nfor (const uri of enderecos) {\n  const caminho = new URL(uri).pathname.replace('/', '');\n  console.log(caminho || '(nenhum)', '←', uri.slice(0, 42) + '...');\n}\nconsole.log('\\nSem `{ dbName }`, o Mongoose grava num banco chamado \"test\" — e você jura que sumiu.');\nconsole.log('Por isso: mongoose.connect(uri, { dbName: process.env.MONGODB_DBNAME })');"
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
        "codigo": "const senha = 'p@ss:word/2026';\n\nconsole.log('crua     → mongodb+srv://igor:' + senha + '@cluster... (URI inválida)');\nconsole.log('escapada → mongodb+srv://igor:' + encodeURIComponent(senha) + '@cluster...');\n\ntry {\n  new URL('mongodb+srv://igor:' + senha + '@cluster0.exemplo.net');\n} catch (erro) {\n  console.log('O que o Node diz:', erro.message);\n}\n// @ : / e ? têm significado dentro da URI. Senha com esses caracteres vira \"Invalid\n// connection string\" ou, pior, \"bad auth\" — e você jura que a senha está certa."
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
      "arquivo": "node/src/05-mongodb/02-schema-e-model.js",
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
      "arquivo": "node/src/06-sessao-e-seguranca/01-sessao-e-cookies.js",
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
      "arquivo": "node/src/06-sessao-e-seguranca/02-mensagens-flash.js",
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
      "arquivo": "node/src/07-extras/01-webpack-e-babel.js",
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
   },
   {
    "slug": "08-sequelize",
    "titulo": "Sequelize",
    "icone": "▦",
    "cor": "#7fd1c1",
    "resumo": "Banco SQL sem escrever SQL: model, migration e associação.",
    "topicos": [
     {
      "slug": "01-conexao-e-model",
      "arquivo": "node/src/08-sequelize/01-conexao-e-model.js",
      "comando": "node src/08-sequelize/01-conexao-e-model.js",
      "titulo": "Conexão e Model com Sequelize",
      "sessao": 5,
      "oQueE": "o tradutor entre objeto JavaScript e tabela SQL — você descreve a tabela uma vez e chama métodos em vez de escrever SQL na mão.",
      "quandoUsar": "quando o dado tem formato fixo e se relaciona com outro — aluno, matrícula, nota.",
      "quandoNaoUsar": "em relatório com muita junção e soma, onde o SQL escrito à mão é mais claro e mais rápido. Aí a saída é `sequelize.query('SELECT ...')`.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "src/configs/database.js",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize } = require('sequelize');\n(async () => {\n  // O objeto é o mesmo para qualquer banco: só mudam dialect, host e credenciais.\n  // Em produção: { dialect: 'mariadb', host: process.env.DATABASE_HOST, ... }\n  const conexao = new Sequelize({\n    dialect: 'sqlite',\n    storage: ':memory:',      // banco que vive na memória: some quando o processo fecha\n    logging: false,           // true mostra no console todo SQL que o Sequelize gera\n  });\n\n  await conexao.authenticate();     // só aqui o Sequelize realmente fala com o banco\n  console.log('Conectado?', true, '— dialeto:', conexao.getDialect());\n\n  // Banco fora do ar, senha errada, host errado: tudo estoura aqui, no authenticate.\n  const inacessivel = new Sequelize({\n    dialect: 'sqlite', storage: '/pasta/que/nao/existe/escola.sqlite',\n    logging: false, retry: { max: 0 },\n  });\n  try {\n    await inacessivel.authenticate();\n  } catch (erro) {\n    console.log('Banco inacessível :', erro.message);\n  }\n  console.log('Por isso o server.js só sobe o Express DEPOIS que o authenticate passa.');\n  await conexao.close();\n})();"
       },
       {
        "n": 2,
        "titulo": "src/models/Aluno.js",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize: SequelizeORM, DataTypes: Tipos } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeORM({ dialect: 'sqlite', storage: ':memory:', logging: false });\n\n  const Aluno = conexao.define('Aluno', {\n    nome: { type: Tipos.STRING, allowNull: false },\n    email: { type: Tipos.STRING, allowNull: false, unique: true },\n    idade: { type: Tipos.INTEGER },\n  }, {\n    tableName: 'alunos',        // sem isto o Sequelize pluraliza em inglês: \"Alunos\"\n    timestamps: true,           // ganha created_at e updated_at de graça\n    underscored: true,          // nome_completo no banco, nomeCompleto no JavaScript\n  });\n\n  console.log('Model   :', Aluno.name, '— singular, inicial maiúscula');\n  console.log('Tabela  :', Aluno.getTableName());\n  console.log('Colunas :', Object.keys(Aluno.getAttributes()).join(', '));\n  await conexao.close();\n})();\n// O model não cria a tabela: ele descreve a que deve existir. Quem cria é a migration."
       },
       {
        "n": 3,
        "titulo": "Criar a tabela e gravar a primeira linha",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize: SequelizeSQL, DataTypes: Coluna } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeSQL({ dialect: 'sqlite', storage: ':memory:', logging: false });\n\n  const Produto = conexao.define('Produto', {\n    nome: { type: Coluna.STRING, allowNull: false },\n    preco: { type: Coluna.DECIMAL(10, 2), allowNull: false },\n  }, { tableName: 'produtos', timestamps: false });\n\n  await conexao.sync();                       // CREATE TABLE IF NOT EXISTS produtos (...)\n\n  const teclado = await Produto.create({ nome: 'Teclado', preco: 199.9 });\n  console.log('id gerado pelo banco:', teclado.id);\n  console.log('nome                :', teclado.nome);\n\n  const todos = await Produto.findAll();\n  console.log('linhas na tabela    :', todos.length);\n  await conexao.close();\n})();"
       },
       {
        "n": 4,
        "titulo": "As duas validações: a do banco e a do JavaScript",
        "secao": "NA PRÁTICA",
        "codigo": "const { Sequelize: SequelizeBD, DataTypes: Campo } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeBD({ dialect: 'sqlite', storage: ':memory:', logging: false });\n\n  const Cliente = conexao.define('Cliente', {\n    nome: {\n      type: Campo.STRING,\n      allowNull: false,                       // vira NOT NULL na tabela\n      validate: {                             // roda no Node, ANTES de mandar o INSERT\n        len: { args: [3, 60], msg: 'Nome deve ter entre 3 e 60 caracteres.' },\n      },\n    },\n    email: {\n      type: Campo.STRING,\n      validate: { isEmail: { msg: 'E-mail inválido.' } },\n    },\n  }, { tableName: 'clientes', timestamps: false });\n\n  await conexao.sync();\n\n  try {\n    await Cliente.create({ nome: 'Jo', email: 'nao-e-email' });\n  } catch (erro) {\n    console.log(erro.name);\n    for (const e of erro.errors) console.log(' -', e.path + ':', e.message);\n  }\n  await conexao.close();\n})();\n// `validate` junta TODOS os erros num array e nem chega a viajar até o banco. É dele que\n// sai a lista de mensagens que a API devolve em `{ errors: [...] }`."
       },
       {
        "n": 5,
        "titulo": "Os tipos que se usa de verdade",
        "secao": "NA PRÁTICA",
        "codigo": "const { DataTypes: tipos } = require('sequelize');\n\nconst usados = [\n  ['STRING', 'VARCHAR(255)', 'nome, e-mail, título'],\n  ['TEXT', 'TEXT', 'descrição longa, comentário'],\n  ['INTEGER', 'INTEGER', 'idade, quantidade'],\n  ['DECIMAL(10,2)', 'DECIMAL', 'dinheiro — nunca FLOAT'],\n  ['BOOLEAN', 'TINYINT(1)', 'ativo, pago'],\n  ['DATE', 'DATETIME', 'data com hora'],\n  ['DATEONLY', 'DATE', 'aniversário, vencimento'],\n  ['VIRTUAL', '— não existe no banco', 'senha em texto, url montada'],\n];\n\nfor (const [tipo, coluna, quando] of usados)\n  console.log(`DataTypes.${tipo}`.padEnd(24), coluna.padEnd(22), quando);\n\nconsole.log('\\nExistem mesmo?', usados.every(([t]) => tipos[t.split('(')[0]] !== undefined));\nconsole.log('FLOAT para dinheiro erra no centavo: 0.1 + 0.2 =', 0.1 + 0.2);"
       },
       {
        "n": 6,
        "titulo": "O que o Sequelize inventa quando você não diz nada",
        "secao": "NA PRÁTICA",
        "codigo": "const { Sequelize: SequelizeBase, DataTypes: Tipo } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeBase({ dialect: 'sqlite', storage: ':memory:', logging: false });\n\n  const Padrao = conexao.define('Fornecedor', { nomeFantasia: Tipo.STRING });\n  const Meu = conexao.define('FornecedorMeu', { nomeFantasia: Tipo.STRING }, {\n    tableName: 'fornecedores', timestamps: false, underscored: true,\n  });\n\n  console.log('sem opções :', Padrao.getTableName().padEnd(13), Object.keys(Padrao.getAttributes()).join(', '));\n  console.log('com opções :', Meu.getTableName().padEnd(13), Object.keys(Meu.getAttributes()).join(', '));\n  console.log('\\nO pluralizador é inglês: \"Fornecedor\" virou \"Fornecedors\".');\n  console.log('`id` aparece nos dois: a chave primária o Sequelize põe sozinho.');\n  console.log('E `underscored` muda só a COLUNA — no JavaScript o nome continua o mesmo:');\n  console.log('  nomeFantasia →', Meu.getAttributes().nomeFantasia.field);\n  await conexao.close();\n})();"
       },
       {
        "n": 7,
        "titulo": "sync({ force: true }) apaga a tabela inteira",
        "secao": "PEGADINHAS",
        "codigo": "const { Sequelize: SequelizeDados, DataTypes: Formato } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeDados({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const Nota = conexao.define('Nota', { valor: Formato.INTEGER }, { tableName: 'notas', timestamps: false });\n\n  await conexao.sync();\n  await Nota.create({ valor: 10 });\n  console.log('antes do force :', await Nota.count(), 'linha(s)');\n\n  await conexao.sync({ force: true });        // DROP TABLE notas; CREATE TABLE notas (...)\n  console.log('depois do force:', await Nota.count(), 'linha(s) ← os dados foram embora');\n\n  console.log('\\nÉ o ddl-auto: create-drop do Spring. Ótimo para estudar, porque cada boot');\n  console.log('devolve o mesmo estado. Em banco que você não pode perder, é destruição total.');\n  console.log('Fora do estudo: sync() sem force, ou nem isso — só as migrations.');\n  await conexao.close();\n})();"
       }
      ],
      "resumo": [
       "Uma conexão só, num arquivo só (`src/configs/database.js`), lida do `.env`.",
       "`define` descreve a tabela; ele não cria nada — quem cria é a migration.",
       "`tableName`, `timestamps` e `underscored` explícitos: o padrão pluraliza em inglês.",
       "`allowNull` é regra do banco; `validate` é regra do Node e junta os erros num array.",
       "Dinheiro é DECIMAL, nunca FLOAT. `VIRTUAL` é campo que existe só em memória.",
       "`sync({ force: true })` derruba e recria: só em banco de estudo."
      ]
     },
     {
      "slug": "02-migrations",
      "arquivo": "node/src/08-sequelize/02-migrations.js",
      "comando": "node src/08-sequelize/02-migrations.js",
      "titulo": "Migrations",
      "sessao": 5,
      "oQueE": "um arquivo com data no nome que descreve UMA mudança no banco — criar tabela, acrescentar coluna — e sabe desfazê-la.",
      "quandoUsar": "sempre que a estrutura do banco mudar. É o histórico versionado do banco, que sobe junto com o código e roda igual na sua máquina e no servidor.",
      "quandoNaoUsar": "para dado, não. Linha de exemplo é seed; migration mexe em estrutura.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "src/database/migrations/20260826203722-alunos.js",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize, DataTypes } = require('sequelize');\n(async () => {\n  const conexao = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });\n\n  // Uma migration é só um objeto com `up` e `down`. O sequelize-cli entrega o queryInterface.\n  const migration = {\n    async up(queryInterface) {\n      await queryInterface.createTable('alunos', {\n        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },\n        nome: { type: DataTypes.STRING, allowNull: false },\n        email: { type: DataTypes.STRING, allowNull: false, unique: true },\n        created_at: { type: DataTypes.DATE, allowNull: false },\n        updated_at: { type: DataTypes.DATE, allowNull: false },\n      });\n    },\n    async down(queryInterface) {\n      await queryInterface.dropTable('alunos');\n    },\n  };\n\n  await migration.up(conexao.getQueryInterface());\n  const colunas = await conexao.getQueryInterface().describeTable('alunos');\n  for (const [nome, def] of Object.entries(colunas))\n    console.log(nome.padEnd(12), def.type.padEnd(14), def.primaryKey ? 'chave primária' : def.allowNull ? 'aceita nulo' : 'NOT NULL');\n  await conexao.close();\n})();\n// O nome começa com a data (20260826203722) porque é ela que define a ORDEM de execução."
       },
       {
        "n": 2,
        "titulo": "O `down` existe para desfazer",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize: SequelizeORM, DataTypes: Tipos } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeORM({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const qi = conexao.getQueryInterface();\n\n  const criarCursos = {\n    up: (q) => q.createTable('cursos', {\n      id: { type: Tipos.INTEGER, autoIncrement: true, primaryKey: true },\n      nome: { type: Tipos.STRING, allowNull: false },\n    }),\n    down: (q) => q.dropTable('cursos'),\n  };\n\n  await criarCursos.up(qi);\n  console.log('depois do up  :', (await qi.showAllTables()).join(', ') || '(nenhuma tabela)');\n\n  await criarCursos.down(qi);                 // é isto que `db:migrate:undo` chama\n  console.log('depois do down:', (await qi.showAllTables()).join(', ') || '(nenhuma tabela)');\n\n  console.log('\\nMigration sem `down` é migration que não dá para voltar atrás.');\n  await conexao.close();\n})();"
       },
       {
        "n": 3,
        "titulo": "Mudou de ideia? Migration NOVA, nunca editar a antiga",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize: SequelizeSQL, DataTypes: Coluna } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeSQL({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const qi = conexao.getQueryInterface();\n\n  await qi.createTable('alunos', {\n    id: { type: Coluna.INTEGER, autoIncrement: true, primaryKey: true },\n    nome: { type: Coluna.STRING, allowNull: false },\n  });\n  console.log('v1:', Object.keys(await qi.describeTable('alunos')).join(', '));\n\n  // 20260827100000-adiciona-idade-em-alunos.js — o arquivo seguinte, não o de cima editado\n  const adicionaIdade = {\n    up: (q) => q.addColumn('alunos', 'idade', { type: Coluna.INTEGER, allowNull: true }),\n    down: (q) => q.removeColumn('alunos', 'idade'),\n  };\n\n  await adicionaIdade.up(qi);\n  console.log('v2:', Object.keys(await qi.describeTable('alunos')).join(', '));\n\n  console.log('\\nO servidor já rodou a v1. Editar a v1 não muda nada lá — o banco dele já');\n  console.log('a marcou como executada. Só uma migration nova chega ao banco de produção.');\n  await conexao.close();\n})();"
       },
       {
        "n": 4,
        "titulo": "Os comandos do sequelize-cli",
        "secao": "NA PRÁTICA",
        "codigo": "const comandos = [\n  ['npx sequelize migration:create --name alunos', 'cria o arquivo com a data no nome'],\n  ['npx sequelize db:migrate', 'roda as pendentes, na ordem da data'],\n  ['npx sequelize db:migrate:undo', 'desfaz a última'],\n  ['npx sequelize db:migrate:undo:all', 'desfaz todas'],\n  ['npx sequelize seed:generate --name alunos', 'cria um arquivo de seed'],\n  ['npx sequelize db:seed:all', 'roda as seeds'],\n];\n\nfor (const [comando, oQueFaz] of comandos) console.log(comando.padEnd(46), oQueFaz);\n\n// O .sequelizerc é o que diz ao cli onde estão as coisas — sem ele, ele procura em `config/`\n// e não acha nada:\n//   const { resolve } = require('path');\n//   module.exports = {\n//     config: resolve(__dirname, 'src', 'configs', 'database.js'),\n//     'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),\n//     'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),\n//   };\nconsole.log('\\nO cli lê o .sequelizerc na raiz do projeto para achar config, migrations e seeds.');"
       },
       {
        "n": 5,
        "titulo": "Chave estrangeira: a migration que amarra duas tabelas",
        "secao": "NA PRÁTICA",
        "codigo": "const { Sequelize: SequelizeBD, DataTypes: Campo } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeBD({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const qi = conexao.getQueryInterface();\n\n  await qi.createTable('alunos', {\n    id: { type: Campo.INTEGER, autoIncrement: true, primaryKey: true },\n    nome: { type: Campo.STRING, allowNull: false },\n  });\n  await qi.createTable('fotos', {\n    id: { type: Campo.INTEGER, autoIncrement: true, primaryKey: true },\n    arquivo: { type: Campo.STRING, allowNull: false },\n    aluno_id: {\n      type: Campo.INTEGER,\n      references: { model: 'alunos', key: 'id' },   // nome da TABELA, não do model\n      onDelete: 'CASCADE',                          // apagou o aluno, some a foto junto\n      onUpdate: 'CASCADE',\n    },\n  });\n\n  const fotos = await qi.describeTable('fotos');\n  console.log('colunas de fotos:', Object.keys(fotos).join(', '));\n  console.log('aluno_id aponta para alunos.id, com ON DELETE CASCADE');\n  console.log('\\nSem a FK o banco aceita foto de aluno que não existe — e um dia');\n  console.log('a tela quebra tentando mostrar o nome de ninguém.');\n  await conexao.close();\n})();"
       },
       {
        "n": 6,
        "titulo": "Migration ou sync?",
        "secao": "NA PRÁTICA",
        "codigo": "const situacoes = [\n  ['Estudo, banco descartável', 'sync({ force: true })', 'boot devolve estado conhecido'],\n  ['Time, com outra pessoa', 'migrations', 'ela roda db:migrate e chega no mesmo banco'],\n  ['Produção', 'migrations', 'histórico, revisão e volta atrás'],\n  ['Teste automatizado', 'sync({ force: true })', 'banco zerado a cada rodada'],\n];\n\nfor (const [quando, o_que, porque] of situacoes)\n  console.log(quando.padEnd(26), o_que.padEnd(22), porque);\n\nconsole.log('\\nsync olha o MODEL e tenta deixar o banco parecido. Migration é um roteiro');\nconsole.log('explícito e versionado. Só o roteiro dá para revisar num pull request.');"
       },
       {
        "n": 7,
        "titulo": "A tabela SequelizeMeta guarda o que já rodou",
        "secao": "PEGADINHAS",
        "codigo": "const { Sequelize: SequelizeBase, DataTypes: Tipo } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeBase({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const qi = conexao.getQueryInterface();\n\n  // É esta tabela que o cli cria sozinho e consulta antes de rodar qualquer coisa.\n  await qi.createTable('SequelizeMeta', { name: { type: Tipo.STRING, primaryKey: true } });\n  await qi.bulkInsert('SequelizeMeta', [\n    { name: '20260826203722-alunos.js' },\n    { name: '20260826210500-users.js' },\n  ]);\n\n  const jaRodaram = (await conexao.query('SELECT name FROM SequelizeMeta', { type: 'SELECT' }))\n    .map((l) => l.name);\n  console.log('já rodaram:', jaRodaram.join('\\n            '));\n\n  const naPasta = ['20260826203722-alunos.js', '20260826210500-users.js', '20260828120000-fotos.js'];\n  console.log('\\npendentes :', naPasta.filter((m) => !jaRodaram.includes(m)).join(', '));\n  console.log('\\nÉ só isso: `db:migrate` roda o que está na pasta e não está nesta tabela.');\n  console.log('Por isso editar arquivo antigo não tem efeito — o nome dele já está aqui.');\n  await conexao.close();\n})();"
       }
      ],
      "resumo": [
       "Migration é uma mudança de ESTRUTURA, versionada: `up` faz, `down` desfaz.",
       "A data no nome do arquivo é a ordem de execução — não mexa nela.",
       "Mudou de ideia depois de rodar? Migration nova. Editar a antiga não chega em produção.",
       "`references` + `onDelete: 'CASCADE'` amarra as tabelas e limpa o que ficou órfão.",
       "`db:migrate` compara a pasta com a tabela SequelizeMeta e roda só o que falta.",
       "sync({ force }) é para banco descartável; migration é para banco que tem dono."
      ]
     },
     {
      "slug": "03-crud-e-associacoes",
      "arquivo": "node/src/08-sequelize/03-crud-e-associacoes.js",
      "comando": "node src/08-sequelize/03-crud-e-associacoes.js",
      "titulo": "CRUD e Associações",
      "sessao": 5,
      "oQueE": "os métodos do model que gravam, buscam, atualizam e apagam, e o jeito de dizer que uma tabela pertence a outra.",
      "quandoUsar": "em todo controller. É o que substitui o INSERT, o SELECT e o UPDATE na mão.",
      "quandoNaoUsar": "quando a consulta vira três junções e um GROUP BY. Aí o SQL direto, em `sequelize.query`, é mais curto e mais honesto.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Criar e buscar",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize, DataTypes } = require('sequelize');\n(async () => {\n  const conexao = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const Aluno = conexao.define('Aluno', {\n    nome: DataTypes.STRING, email: DataTypes.STRING, idade: DataTypes.INTEGER,\n  }, { tableName: 'alunos', timestamps: false });\n  await conexao.sync();\n\n  await Aluno.create({ nome: 'Ana Paula', email: 'ana@escola.dev', idade: 22 });\n  await Aluno.bulkCreate([                       // vários de uma vez, num INSERT só\n    { nome: 'Bruno Dias', email: 'bruno@escola.dev', idade: 31 },\n    { nome: 'Carla Reis', email: 'carla@escola.dev', idade: 27 },\n  ]);\n\n  const todos = await Aluno.findAll();\n  console.log('findAll   :', todos.map((a) => a.nome).join(', '));\n  console.log('findByPk 2:', (await Aluno.findByPk(2)).nome);\n  console.log('findOne   :', (await Aluno.findOne({ where: { email: 'carla@escola.dev' } })).nome);\n  console.log('não achou :', await Aluno.findByPk(999), '← null, não é erro');\n  await conexao.close();\n})();"
       },
       {
        "n": 2,
        "titulo": "Atualizar e apagar",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize: SequelizeORM, DataTypes: Tipos } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeORM({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const Produto = conexao.define('Produto', {\n    nome: Tipos.STRING, estoque: Tipos.INTEGER,\n  }, { tableName: 'produtos', timestamps: false });\n  await conexao.sync();\n  await Produto.bulkCreate([\n    { nome: 'Teclado', estoque: 4 }, { nome: 'Monitor', estoque: 0 },\n  ]);\n\n  // O caminho do controller: busca, confere se existe, atualiza a instância.\n  const teclado = await Produto.findByPk(1);\n  await teclado.update({ estoque: 10 });\n  console.log('depois do update:', teclado.nome, '→', teclado.estoque, 'em estoque');\n\n  const monitor = await Produto.findByPk(2);\n  await monitor.destroy();\n  console.log('sobraram        :', (await Produto.findAll()).map((p) => p.nome).join(', '));\n  console.log('o apagado ainda existe em memória:', monitor.nome, '← dá para devolver na resposta');\n  await conexao.close();\n})();"
       },
       {
        "n": 3,
        "titulo": "Filtrar, ordenar e escolher as colunas",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize: SequelizeSQL, DataTypes: Coluna } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeSQL({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const Venda = conexao.define('Venda', {\n    vendedor: Coluna.STRING, valor: Coluna.INTEGER, regiao: Coluna.STRING,\n  }, { tableName: 'vendas', timestamps: false });\n  await conexao.sync();\n  await Venda.bulkCreate([\n    { vendedor: 'Ana', valor: 800, regiao: 'sul' },\n    { vendedor: 'Bruno', valor: 1500, regiao: 'sul' },\n    { vendedor: 'Carla', valor: 1200, regiao: 'norte' },\n    { vendedor: 'Diego', valor: 300, regiao: 'sul' },\n  ]);\n\n  const top = await Venda.findAll({\n    where: { regiao: 'sul' },                    // WHERE regiao = 'sul'\n    order: [['valor', 'DESC']],                  // ORDER BY valor DESC\n    limit: 2,                                    // LIMIT 2\n    attributes: ['vendedor', 'valor'],           // SELECT vendedor, valor\n  });\n\n  for (const v of top) console.log(v.vendedor.padEnd(8), 'R$', v.valor);\n  console.log('veio a coluna regiao?', top[0].regiao, '← attributes cortou fora');\n  console.log('total do sul:', await Venda.count({ where: { regiao: 'sul' } }), 'vendas');\n  await conexao.close();\n})();"
       },
       {
        "n": 4,
        "titulo": "Uma tabela que pertence a outra",
        "secao": "NA PRÁTICA",
        "codigo": "const { Sequelize: SequelizeBD, DataTypes: Campo } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeBD({ dialect: 'sqlite', storage: ':memory:', logging: false });\n\n  const Aluno = conexao.define('Aluno', { nome: Campo.STRING },\n    { tableName: 'alunos', timestamps: false });\n  const Foto = conexao.define('Foto', { arquivo: Campo.STRING, aluno_id: Campo.INTEGER },\n    { tableName: 'fotos', timestamps: false });\n\n  // Os dois lados: quem guarda a chave é quem \"pertence\".\n  Foto.belongsTo(Aluno, { foreignKey: 'aluno_id', as: 'aluno' });\n  Aluno.hasMany(Foto, { foreignKey: 'aluno_id', as: 'fotos' });\n\n  await conexao.sync();\n  const ana = await Aluno.create({ nome: 'Ana Paula' });\n  await Foto.bulkCreate([\n    { arquivo: 'ana-1.png', aluno_id: ana.id }, { arquivo: 'ana-2.png', aluno_id: ana.id },\n  ]);\n\n  // include = JOIN: traz o aluno e as fotos dele num pedido só ao banco.\n  const comFotos = await Aluno.findByPk(ana.id, { include: { association: 'fotos' } });\n  console.log(comFotos.nome, 'tem', comFotos.fotos.length, 'fotos:',\n    comFotos.fotos.map((f) => f.arquivo).join(', '));\n\n  const daFoto = await Foto.findByPk(1, { include: { association: 'aluno' } });\n  console.log('a foto', daFoto.arquivo, 'é de', daFoto.aluno.nome);\n  await conexao.close();\n})();"
       },
       {
        "n": 5,
        "titulo": "Buscar por parecido, por faixa e por lista",
        "secao": "NA PRÁTICA",
        "codigo": "const { Sequelize: SequelizeBase, DataTypes: Tipo, Op: OpFiltro } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeBase({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const Aluno = conexao.define('Aluno', { nome: Tipo.STRING, idade: Tipo.INTEGER },\n    { tableName: 'alunos', timestamps: false });\n  await conexao.sync();\n  await Aluno.bulkCreate([\n    { nome: 'Ana Paula', idade: 22 }, { nome: 'Ana Clara', idade: 35 },\n    { nome: 'Bruno Dias', idade: 31 }, { nome: 'Carla Reis', idade: 17 },\n  ]);\n\n  const busca = (r) => r.map((a) => a.nome).join(', ');\n  console.log('nome com \"Ana\"   :', busca(await Aluno.findAll({ where: { nome: { [OpFiltro.like]: 'Ana%' } } })));\n  console.log('maior de idade   :', busca(await Aluno.findAll({ where: { idade: { [OpFiltro.gte]: 18 } } })));\n  console.log('entre 20 e 32    :', busca(await Aluno.findAll({ where: { idade: { [OpFiltro.between]: [20, 32] } } })));\n  console.log('Bruno ou Carla   :', busca(await Aluno.findAll({ where: { nome: { [OpFiltro.in]: ['Bruno Dias', 'Carla Reis'] } } })));\n  console.log('\\nSem OpFiltro, `where: { idade: 22 }` só sabe comparar por igual.');\n  await conexao.close();\n})();"
       },
       {
        "n": 6,
        "titulo": "Página de resultados",
        "secao": "NA PRÁTICA",
        "codigo": "const { Sequelize: SequelizeDados, DataTypes: Formato } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeDados({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const Pedido = conexao.define('Pedido', { cliente: Formato.STRING },\n    { tableName: 'pedidos', timestamps: false });\n  await conexao.sync();\n  await Pedido.bulkCreate(Array.from({ length: 23 }, (_, i) => ({ cliente: `Cliente ${i + 1}` })));\n\n  const porPagina = 10;\n  const pagina = 3;                                        // veio de /pedidos?pagina=3\n\n  const { count, rows } = await Pedido.findAndCountAll({   // conta o total E traz a fatia\n    order: [['id', 'ASC']],\n    limit: porPagina,\n    offset: (pagina - 1) * porPagina,\n  });\n\n  console.log('total no banco :', count);\n  console.log('páginas        :', Math.ceil(count / porPagina));\n  console.log(`página ${pagina}       :`, rows.map((p) => p.cliente).join(', '));\n  console.log('\\nfindAll traria as 23 linhas para a memória só para mostrar 10.');\n  await conexao.close();\n})();"
       },
       {
        "n": 7,
        "titulo": "Model.update não devolve a linha atualizada",
        "secao": "PEGADINHAS",
        "codigo": "const { Sequelize: SequelizeMotor, DataTypes: Valor } = require('sequelize');\n(async () => {\n  const conexao = new SequelizeMotor({ dialect: 'sqlite', storage: ':memory:', logging: false });\n  const Aluno = conexao.define('Aluno', { nome: Valor.STRING, ativo: Valor.BOOLEAN },\n    { tableName: 'alunos', timestamps: false });\n  await conexao.sync();\n  await Aluno.bulkCreate([{ nome: 'Ana', ativo: true }, { nome: 'Bruno', ativo: true }]);\n\n  const resposta = await Aluno.update({ ativo: false }, { where: { nome: 'Ana' } });\n  console.log('Aluno.update devolveu:', JSON.stringify(resposta), '← quantas linhas mudaram');\n  console.log('res.json(resposta) mandaria isto para o cliente. Não é o aluno.');\n\n  const aluno = await Aluno.findByPk(1);          // busca, confere, atualiza a instância\n  await aluno.update({ ativo: true });\n  console.log('\\ninstancia.update devolve:', aluno.nome, '— o objeto, pronto para a resposta');\n  await conexao.close();\n})();"
       },
       {
        "n": 8,
        "titulo": "Uma consulta vira N+1 sem você ver",
        "secao": "PEGADINHAS",
        "codigo": "const { Sequelize: SequelizeLoja, DataTypes: Dado } = require('sequelize');\n(async () => {\n  let consultas = 0;\n  const conexao = new SequelizeLoja({\n    dialect: 'sqlite', storage: ':memory:', logging: () => { consultas++; },\n  });\n  const Aluno = conexao.define('Aluno', { nome: Dado.STRING }, { tableName: 'alunos', timestamps: false });\n  const Foto = conexao.define('Foto', { arquivo: Dado.STRING, aluno_id: Dado.INTEGER },\n    { tableName: 'fotos', timestamps: false });\n  Aluno.hasMany(Foto, { foreignKey: 'aluno_id', as: 'fotos' });\n  await conexao.sync();\n  await Aluno.bulkCreate([{ nome: 'Ana' }, { nome: 'Bruno' }, { nome: 'Carla' }]);\n  await Foto.bulkCreate([1, 2, 3].map((id) => ({ arquivo: `${id}.png`, aluno_id: id })));\n\n  consultas = 0;\n  for (const aluno of await Aluno.findAll()) await aluno.getFotos();   // 1 + 3\n  console.log('um por um :', consultas, 'consultas ao banco');\n\n  consultas = 0;\n  await Aluno.findAll({ include: { association: 'fotos' } });\n  console.log('com include:', consultas, 'consulta');\n\n  console.log('\\nCom 3 alunos ninguém percebe. Com 3 mil, a tela leva 20 segundos.');\n  await conexao.close();\n})();"
       }
      ],
      "resumo": [
       "create, findAll, findByPk, findOne — e `null` quando não acha, não exceção.",
       "Busque, confira se existe, e chame `.update()`/`.destroy()` NA INSTÂNCIA.",
       "`Model.update` em massa devolve contagem, não a linha: nunca mande na resposta.",
       "where + order + limit + attributes é o SELECT inteiro, em objeto.",
       "belongsTo/hasMany nos dois lados, e `include` para trazer tudo num pedido só.",
       "Comparação que não é \"igual\" precisa de `Op`: like, gte, between, in."
      ]
     }
    ]
   },
   {
    "slug": "09-api-e-autenticacao",
    "titulo": "API e Autenticação",
    "icone": "⚷",
    "cor": "#ffb86c",
    "resumo": "Responder JSON, guardar senha com bcrypt, entrar com token e receber arquivo.",
    "topicos": [
     {
      "slug": "01-api-rest-em-json",
      "arquivo": "node/src/09-api-e-autenticacao/01-api-rest-em-json.js",
      "comando": "node src/09-api-e-autenticacao/01-api-rest-em-json.js",
      "titulo": "API REST em JSON",
      "sessao": 5,
      "oQueE": "um servidor que responde dado em JSON em vez de página pronta — quem monta a tela é o cliente (React, aplicativo, outro serviço).",
      "quandoUsar": "quando a mesma informação atende mais de uma tela, ou quando o front é um projeto separado.",
      "quandoNaoUsar": "em site simples que só mostra páginas. Aí `res.render` entrega tudo de uma vez, sem um front inteiro no meio.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "A rota que devolve JSON",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\n(async () => {\n  const app = express();\n  app.use(express.json());              // sem esta linha, req.body chega undefined\n\n  const alunos = [{ id: 1, nome: 'Ana Paula' }];\n\n  app.get('/alunos', (req, res) => res.json(alunos));\n  app.post('/alunos', (req, res) => {\n    const novo = { id: alunos.length + 1, nome: req.body.nome };\n    alunos.push(novo);\n    res.status(201).json(novo);         // 201 = criado, e devolve o que criou\n  });\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}/alunos`;\n    const criado = await fetch(url, {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ nome: 'Bruno Dias' }),\n    });\n    console.log('POST →', criado.status, JSON.stringify(await criado.json()));\n    console.log('GET  →', JSON.stringify(await fetch(url).then((r) => r.json())));\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 2,
        "titulo": "O status code faz parte da resposta",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\n(async () => {\n  const app = expresso();\n  app.use(expresso.json());\n\n  app.get('/alunos/:id', (req, res) => {\n    if (Number.isNaN(Number(req.params.id))) return res.status(400).json({ errors: ['Id inválido.'] });\n    if (req.params.id !== '1') return res.status(404).json({ errors: ['Aluno não existe.'] });\n    return res.json({ id: 1, nome: 'Ana Paula' });\n  });\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}/alunos/`;\n    for (const [caminho, oQueE] of [['1', 'achou'], ['99', 'não existe'], ['abc', 'id sem sentido']]) {\n      const r = await fetch(url + caminho);\n      console.log(`GET /alunos/${caminho}`.padEnd(16), r.status, String(oQueE).padEnd(15), await r.text());\n    }\n    console.log('\\n200 achei · 201 criei · 400 seu pedido está errado · 404 não existe');\n    console.log('Devolver 200 com { erro: \"não achei\" } obriga o cliente a ler o corpo para');\n    console.log('saber se deu certo. O número já diz.');\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 3,
        "titulo": "O CRUD inteiro em quatro rotas",
        "secao": "ESSENCIAL",
        "codigo": "const expr = require('express');\n(async () => {\n  const app = expr();\n  app.use(expr.json());\n\n  const banco = new Map([[1, { id: 1, nome: 'Teclado', preco: 199.9 }]]);\n  let proximoId = 2;\n\n  app.get('/produtos', (req, res) => res.json([...banco.values()]));\n  app.post('/produtos', (req, res) => {\n    const novo = { id: proximoId++, nome: req.body.nome, preco: req.body.preco };\n    banco.set(novo.id, novo);\n    res.status(201).json(novo);\n  });\n  app.put('/produtos/:id', (req, res) => {\n    const item = banco.get(Number(req.params.id));\n    if (!item) return res.status(404).json({ errors: ['Produto não existe.'] });\n    Object.assign(item, { nome: req.body.nome, preco: req.body.preco });\n    return res.json(item);\n  });\n  app.delete('/produtos/:id', (req, res) => {\n    const item = banco.get(Number(req.params.id));\n    if (!item) return res.status(404).json({ errors: ['Produto não existe.'] });\n    banco.delete(item.id);\n    return res.json(item);              // devolve o que apagou, para o cliente poder desfazer\n  });\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}/produtos`;\n    const json = (m, c, b) => fetch(url + c, {\n      method: m, headers: { 'Content-Type': 'application/json' },\n      body: b && JSON.stringify(b),\n    }).then(async (r) => `${r.status} ${JSON.stringify(await r.json())}`);\n\n    console.log('POST   /produtos   →', await json('POST', '', { nome: 'Monitor', preco: 899 }));\n    console.log('PUT    /produtos/2 →', await json('PUT', '/2', { nome: 'Monitor 27\"', preco: 999 }));\n    console.log('DELETE /produtos/1 →', await json('DELETE', '/1'));\n    console.log('GET    /produtos   →', await json('GET', ''));\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 4,
        "titulo": "PUT manda tudo; PATCH manda só o que mudou",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\n(async () => {\n  const app = web();\n  app.use(web.json());\n\n  const aluno = { id: 1, nome: 'Ana Paula', email: 'ana@escola.dev', idade: 22 };\n  const CAMPOS = ['nome', 'email', 'idade'];\n\n  app.put('/alunos/1', (req, res) => {\n    const faltando = CAMPOS.filter((c) => req.body[c] === undefined);\n    if (faltando.length) return res.status(400).json({ errors: [`Faltam: ${faltando.join(', ')}`] });\n    for (const c of CAMPOS) aluno[c] = req.body[c];\n    return res.json(aluno);\n  });\n\n  app.patch('/alunos/1', (req, res) => {\n    for (const c of CAMPOS) if (req.body[c] !== undefined) aluno[c] = req.body[c];\n    return res.json(aluno);\n  });\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}/alunos/1`;\n    const enviar = (m, b) => fetch(url, {\n      method: m, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b),\n    }).then(async (r) => `${r.status} ${JSON.stringify(await r.json())}`);\n\n    console.log('PATCH { idade: 23 }        →', await enviar('PATCH', { idade: 23 }));\n    console.log('PUT   { idade: 24 }        →', await enviar('PUT', { idade: 24 }));\n    console.log('PUT   { tudo }             →', await enviar('PUT', { nome: 'Ana P. Souza', email: 'ana@escola.dev', idade: 24 }));\n    console.log('\\nPUT substitui o recurso inteiro: campo que faltou é 400, não \"deixa como está\".');\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 5,
        "titulo": "Todo erro sai no mesmo formato",
        "secao": "NA PRÁTICA",
        "codigo": "const framework = require('express');\n(async () => {\n  const app = framework();\n  app.use(framework.json());\n\n  // Um formato só — { errors: [...] } — para o cliente ter um jeito só de mostrar erro.\n  app.post('/alunos', (req, res) => {\n    const errors = [];\n    if (!req.body.nome) errors.push('Nome é obrigatório.');\n    if (!/^[^@]+@[^@]+$/.test(req.body.email || '')) errors.push('E-mail inválido.');\n    if (errors.length) return res.status(400).json({ errors });\n    return res.status(201).json({ id: 1, nome: req.body.nome });\n  });\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}/alunos`;\n    const r = await fetch(url, {\n      method: 'POST', headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ email: 'nao-e-email' }),\n    });\n    console.log(r.status, JSON.stringify(await r.json()));\n    console.log('\\nDevolva TODOS os erros de uma vez: um por vez faz o usuário mandar');\n    console.log('o formulário quatro vezes para descobrir os quatro problemas.');\n    console.log('O array do Sequelize encaixa direto: erro.errors.map((e) => e.message).');\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 6,
        "titulo": "A resposta é uma lista fixa de campos",
        "secao": "NA PRÁTICA",
        "codigo": "const servidorWeb = require('express');\n(async () => {\n  const app = servidorWeb();\n\n  // O que veio do banco: tem coisa que nunca pode sair daqui.\n  const doBanco = {\n    id: 1, nome: 'Ana Paula', email: 'ana@escola.dev',\n    password_hash: '$2b$08$K3jd...', token_reset: 'a1b2c3', created_at: '2026-08-26',\n  };\n\n  const PUBLICOS = ['id', 'nome', 'email'];\n  const publico = (linha) => Object.fromEntries(PUBLICOS.map((c) => [c, linha[c]]));\n\n  app.get('/errado', (req, res) => res.json(doBanco));       // devolve o registro inteiro\n  app.get('/certo', (req, res) => res.json(publico(doBanco)));\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}`;\n    for (const rota of ['/errado', '/certo']) {\n      const corpo = await fetch(url + rota).then((r) => r.json());\n      console.log(rota.padEnd(9), Object.keys(corpo).join(', '));\n    }\n    console.log('\\nLista fixa de saída: a coluna que alguém acrescentar no model amanhã');\n    console.log('não vaza sozinha para a internet.');\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 7,
        "titulo": "Sem express.json(), req.body chega undefined",
        "secao": "PEGADINHAS",
        "codigo": "const aplicacao = require('express');\n(async () => {\n  const app = aplicacao();\n  // Faltou o app.use(express.json()) aqui de propósito.\n\n  app.post('/alunos', (req, res) => res.json({ recebido: req.body ?? null }));\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}/alunos`;\n    const r = await fetch(url, {\n      method: 'POST', headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ nome: 'Ana Paula' }),\n    });\n    console.log('o cliente mandou : {\"nome\":\"Ana Paula\"}');\n    console.log('o servidor viu   :', JSON.stringify(await r.json()));\n    console.log('\\nO corpo chega como fluxo de bytes; alguém precisa juntar e converter.');\n    console.log('É o que express.json() faz — e ele tem que vir ANTES das rotas.');\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 8,
        "titulo": "Aceitar o corpo inteiro deixa o cliente virar administrador",
        "secao": "PEGADINHAS",
        "codigo": "const apiWeb = require('express');\n(async () => {\n  const app = apiWeb();\n  app.use(apiWeb.json());\n\n  const conta = { id: 7, nome: 'Ana', email: 'ana@escola.dev', admin: false };\n\n  app.patch('/errado', (req, res) => {\n    Object.assign(conta, req.body);                 // confia em tudo que chegou\n    res.json(conta);\n  });\n\n  const PERMITIDOS = ['nome', 'email'];             // id e admin ficam de fora de propósito\n  app.patch('/certo', (req, res) => {\n    for (const c of PERMITIDOS) if (req.body[c] !== undefined) conta[c] = req.body[c];\n    res.json(conta);\n  });\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}`;\n    const atacar = (rota) => fetch(url + rota, {\n      method: 'PATCH', headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ nome: 'Ana', admin: true, id: 999 }),\n    }).then((r) => r.json());\n\n    console.log('/errado →', JSON.stringify(await atacar('/errado')));\n    Object.assign(conta, { id: 7, admin: false });\n    console.log('/certo  →', JSON.stringify(await atacar('/certo')));\n    console.log('\\nO formulário só tem dois campos, mas o pedido é escrito à mão em');\n    console.log('qualquer terminal. Lista de entrada fixa, sempre.');\n    servidor.close();\n  });\n})();"
       }
      ],
      "resumo": [
       "`express.json()` antes das rotas; sem ele não existe `req.body`.",
       "O status conta a história: 200, 201 criado, 400 pedido errado, 404 não existe.",
       "CRUD é GET/POST/PUT/DELETE no mesmo caminho — o método já diz o que fazer.",
       "PUT exige o recurso inteiro; PATCH aplica só o que veio.",
       "Um formato só de erro (`{ errors: [...] }`) e todos os erros de uma vez.",
       "Lista fixa na saída e na entrada: nada vaza e nada entra sem você ter escrito."
      ]
     },
     {
      "slug": "02-senha-com-bcrypt",
      "arquivo": "node/src/09-api-e-autenticacao/02-senha-com-bcrypt.js",
      "comando": "node src/09-api-e-autenticacao/02-senha-com-bcrypt.js",
      "titulo": "Senha com bcrypt",
      "sessao": 5,
      "oQueE": "uma função que transforma a senha num hash de mão única — dá para conferir se a senha bate, mas não dá para voltar do hash para a senha.",
      "quandoUsar": "em toda senha, sem exceção. Vazou o banco, vazaram os hashes, não as senhas.",
      "quandoNaoUsar": "em dado que você precisa ler de volta (CPF, e-mail, cartão). Aí é criptografia com chave, que desfaz — não hash.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Guardar o hash, conferir depois",
        "secao": "ESSENCIAL",
        "codigo": "const bcryptjs = require('bcryptjs');\n(async () => {\n  const digitadaNoCadastro = '123456';\n  const hash = await bcryptjs.hash(digitadaNoCadastro, 8);   // é ISTO que vai para o banco\n\n  console.log('formato do hash :', hash.slice(0, 7) + '...', '(' + hash.length + ' caracteres)');\n  console.log('senha certa     :', await bcryptjs.compare('123456', hash));\n  console.log('senha errada    :', await bcryptjs.compare('12345', hash));\n  console.log('\\nO banco nunca vê \"123456\". E ninguém desfaz o hash para descobrir.');\n})();"
       },
       {
        "n": 2,
        "titulo": "O mesmo \"123456\" gera hashes diferentes",
        "secao": "ESSENCIAL",
        "codigo": "const bcrypt = require('bcryptjs');\n(async () => {\n  const um = await bcrypt.hash('123456', 8);\n  const dois = await bcrypt.hash('123456', 8);\n\n  console.log('hashes iguais?      ', um === dois, '← cada um leva um sal sorteado na hora');\n  console.log('os dois conferem?   ', await bcrypt.compare('123456', um),\n    await bcrypt.compare('123456', dois));\n  console.log('o sal fica no hash  :', um.slice(0, 29).length, 'caracteres — versão, custo e sal');\n\n  console.log('\\nÉ por isso que a comparação é `compare`, nunca `===`: duas contas com a');\n  console.log('mesma senha têm hashes diferentes, e olhar o banco não denuncia isso.');\n})();"
       },
       {
        "n": 3,
        "titulo": "src/models/User.js: o campo VIRTUAL e o hook",
        "secao": "ESSENCIAL",
        "codigo": "const { Sequelize, DataTypes } = require('sequelize');\nconst cripto = require('bcryptjs');\n(async () => {\n  const conexao = new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false });\n\n  const User = conexao.define('User', {\n    email: { type: DataTypes.STRING, allowNull: false },\n    password_hash: { type: DataTypes.STRING },      // a coluna que existe no banco\n    password: {\n      type: DataTypes.VIRTUAL,                      // só em memória: não vira coluna\n      validate: { len: { args: [6, 50], msg: 'Senha deve ter entre 6 e 50 caracteres.' } },\n    },\n  }, { tableName: 'users', timestamps: false });\n\n  // Roda no create E no update: a senha nunca chega ao banco em texto.\n  User.beforeSave(async (user) => {\n    if (user.password) user.password_hash = await cripto.hash(user.password, 8);\n  });\n\n  await conexao.sync();\n  const ana = await User.create({ email: 'ana@escola.dev', password: '123456' });\n\n  const [linha] = await conexao.query('SELECT * FROM users', { type: 'SELECT' });\n  console.log('colunas no banco   :', Object.keys(linha).join(', '), '← password não está aqui');\n  console.log('o que ficou gravado:', linha.password_hash.slice(0, 7) + '...');\n  console.log('em memória         :', ana.password, '← existe só durante o pedido');\n\n  try {\n    await User.create({ email: 'bruno@escola.dev', password: '123' });\n  } catch (erro) {\n    console.log('senha curta        :', erro.errors[0].message);\n  }\n  await conexao.close();\n})();"
       },
       {
        "n": 4,
        "titulo": "O custo: por que 8 e não 4",
        "secao": "NA PRÁTICA",
        "codigo": "const bc = require('bcryptjs');\n(async () => {\n  for (const custo of [4, 8, 10]) {\n    const hash = await bc.hash('123456', custo);\n    console.log(`custo ${custo}`.padEnd(9), hash.slice(0, 7), '← o custo fica escrito no hash');\n  }\n\n  console.log('\\nCada ponto DOBRA o trabalho: 10 é 64 vezes mais caro que 4.');\n  console.log('Isso é de propósito. Lento para você é aceitável (uma vez por login);');\n  console.log('lento para quem roubou o banco é a diferença entre horas e séculos.');\n  console.log('8 a 12 é a faixa de uso. Menos que isso não protege nada.');\n})();"
       },
       {
        "n": 5,
        "titulo": "O login que não conta quem existe",
        "secao": "NA PRÁTICA",
        "codigo": "const hasher = require('bcryptjs');\n(async () => {\n  const banco = [{ id: 1, email: 'ana@escola.dev', password_hash: await hasher.hash('123456', 8) }];\n\n  async function entrar(email, senha) {\n    const user = banco.find((u) => u.email === email);\n    // Mesma resposta para \"não existe\" e para \"senha errada\", de propósito.\n    if (!user || !(await hasher.compare(senha, user.password_hash)))\n      return { status: 401, corpo: { errors: ['Usuário ou senha inválidos.'] } };\n    return { status: 200, corpo: { id: user.id, email: user.email } };\n  }\n\n  for (const [email, senha, caso] of [\n    ['ana@escola.dev', '123456', 'tudo certo'],\n    ['ana@escola.dev', 'errada', 'senha errada'],\n    ['ninguem@escola.dev', '123456', 'não existe'],\n  ]) {\n    const r = await entrar(email, senha);\n    console.log(caso.padEnd(14), r.status, JSON.stringify(r.corpo));\n  }\n\n  console.log('\\n\"E-mail não cadastrado\" parece prestativo e é uma lista de clientes de graça:');\n  console.log('dá para descobrir quem tem conta testando e-mails, um por um.');\n})();"
       },
       {
        "n": 6,
        "titulo": "Não gravou hash nenhum? A comparação não te avisa",
        "secao": "PEGADINHAS",
        "codigo": "const senhaLib = require('bcryptjs');\n(async () => {\n  // Conta antiga, importada de outro sistema, que ficou sem password_hash.\n  const semHash = { email: 'antigo@escola.dev', password_hash: null };\n\n  console.log('compare com null :', await senhaLib.compare('qualquer-coisa', semHash.password_hash || ''));\n  console.log('compare com \"\"   :', await senhaLib.compare('', ''));\n\n  const hash = await senhaLib.hash('123456', 8);\n  console.log('comparando com ===:', hash === '123456', '← nunca funciona, e parece um bug');\n\n  console.log('\\nDuas travas que valem a pena:');\n  console.log('1. `password` obrigatório no cadastro — conta sem hash não deveria nascer.');\n  console.log('2. Se o password_hash estiver vazio, recuse o login em vez de comparar.');\n})();"
       }
      ],
      "resumo": [
       "Grave o hash, nunca a senha. `bcryptjs.hash(senha, 8)` no cadastro.",
       "Confira com `bcryptjs.compare(digitada, hash)` — `===` nunca vai bater.",
       "O sal sorteado faz o mesmo \"123456\" virar hashes diferentes a cada conta.",
       "No model: `password` VIRTUAL, `password_hash` coluna, e o hook `beforeSave` no meio.",
       "O custo (8 a 12) é lentidão de propósito, e ela protege quem roubou o banco de você.",
       "Login errado responde 401 com mensagem única: não diga quem tem conta."
      ]
     },
     {
      "slug": "03-token-jwt",
      "arquivo": "node/src/09-api-e-autenticacao/03-token-jwt.js",
      "comando": "node src/09-api-e-autenticacao/03-token-jwt.js",
      "titulo": "Autenticação com JWT",
      "sessao": 5,
      "oQueE": "um crachá assinado pelo servidor. O cliente guarda e manda em todo pedido; o servidor confere a assinatura e sabe quem é, sem guardar nada.",
      "quandoUsar": "em API consumida por aplicativo, front separado ou outro serviço — coisas que não têm cookie de navegador para chamar de suas.",
      "quandoNaoUsar": "em site com páginas renderizadas no servidor. Sessão com cookie é mais simples e dá para derrubar na hora, coisa que o token não permite.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "src/controllers/TokenController.js",
        "secao": "ESSENCIAL",
        "codigo": "const jwt = require('jsonwebtoken');\nconst bcryptjs = require('bcryptjs');\n(async () => {\n  const SEGREDO = process.env.TOKEN_SECRET || 'segredo-longo-e-aleatorio-do-.env';\n  const banco = [{ id: 1, email: 'ana@escola.dev', password_hash: await bcryptjs.hash('123456', 8) }];\n\n  async function store(email, senha) {\n    const user = banco.find((u) => u.email === email);\n    if (!user || !(await bcryptjs.compare(senha, user.password_hash)))\n      return { status: 401, corpo: { errors: ['Usuário ou senha inválidos.'] } };\n\n    // Só id e e-mail: o token viaja em todo pedido e é lido por qualquer um.\n    const token = jwt.sign({ id: user.id, email: user.email }, SEGREDO, { expiresIn: '7d' });\n    return { status: 200, corpo: { token } };\n  }\n\n  const ok = await store('ana@escola.dev', '123456');\n  console.log('login certo :', ok.status, '· token com', ok.corpo.token.split('.').length, 'partes');\n  const nao = await store('ana@escola.dev', 'errada');\n  console.log('login errado:', nao.status, JSON.stringify(nao.corpo));\n})();"
       },
       {
        "n": 2,
        "titulo": "O token não é segredo: é assinado, não escondido",
        "secao": "ESSENCIAL",
        "codigo": "const jsonwebtoken = require('jsonwebtoken');\n(() => {\n  const token = jsonwebtoken.sign({ id: 1, email: 'ana@escola.dev' }, 'segredo', { expiresIn: '7d' });\n  const [cabecalho, dados, assinatura] = token.split('.');\n  const ler = (parte) => JSON.parse(Buffer.from(parte, 'base64url').toString());\n\n  console.log('1. cabeçalho :', JSON.stringify(ler(cabecalho)));\n  console.log('2. dados     :', JSON.stringify({ ...ler(dados), iat: '...', exp: '...' }));\n  console.log('3. assinatura:', assinatura.length, 'caracteres — só quem tem o segredo produz');\n\n  console.log('\\nQualquer pessoa lê os dados: é base64, não criptografia. Nunca ponha');\n  console.log('senha, CPF ou cartão aí dentro. O que a assinatura garante é outra coisa:');\n  console.log('que ninguém trocou o id por outro sem o servidor perceber.');\n})();"
       },
       {
        "n": 3,
        "titulo": "verify: o que pode dar errado",
        "secao": "ESSENCIAL",
        "codigo": "const jwtLib = require('jsonwebtoken');\n(() => {\n  const token = jwtLib.sign({ id: 1 }, 'segredo-certo', { expiresIn: '7d' });\n  const expirado = jwtLib.sign({ id: 1 }, 'segredo-certo', { expiresIn: '-1s' });\n\n  const conferir = (t, segredo, caso) => {\n    try {\n      const dados = jwtLib.verify(t, segredo);\n      console.log(caso.padEnd(22), '✓ id =', dados.id);\n    } catch (erro) {\n      console.log(caso.padEnd(22), '✕', erro.name + ':', erro.message);\n    }\n  };\n\n  conferir(token, 'segredo-certo', 'token bom');\n  conferir(token, 'outro-segredo', 'segredo trocado');\n  conferir(token.slice(0, -3) + 'aaa', 'segredo-certo', 'assinatura adulterada');\n  conferir(expirado, 'segredo-certo', 'passou da validade');\n  conferir('isso-nao-e-token', 'segredo-certo', 'lixo no lugar do token');\n\n  console.log('\\nverify LANÇA em vez de devolver false: o middleware sempre usa try/catch.');\n})();"
       },
       {
        "n": 4,
        "titulo": "src/middlewares/loginRequired.js",
        "secao": "NA PRÁTICA",
        "codigo": "const express = require('express');\nconst cracha = require('jsonwebtoken');\n(async () => {\n  const SEGREDO = 'segredo-do-.env';\n\n  const loginRequired = (req, res, next) => {\n    const { authorization } = req.headers;\n    if (!authorization) return res.status(401).json({ errors: ['Login obrigatório.'] });\n\n    const [, token] = authorization.split(' ');          // \"Bearer eyJhbGci...\"\n    try {\n      req.userId = cracha.verify(token, SEGREDO).id;        // o resto da rota lê daqui\n      return next();\n    } catch {\n      return res.status(401).json({ errors: ['Token expirado ou inválido.'] });\n    }\n  };\n\n  const app = express();\n  app.get('/alunos', loginRequired, (req, res) => res.json({ alunos: ['Ana', 'Bruno'], visto_por: req.userId }));\n  app.get('/', (req, res) => res.json({ ok: 'rota aberta' }));\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}`;\n    const pedir = (cabecalhos) => fetch(url + '/alunos', { headers: cabecalhos })\n      .then(async (r) => `${r.status} ${JSON.stringify(await r.json())}`);\n\n    console.log('sem cabeçalho :', await pedir({}));\n    console.log('token inventado:', await pedir({ Authorization: 'Bearer nao-e-token' }));\n    const token = cracha.sign({ id: 7 }, SEGREDO, { expiresIn: '7d' });\n    console.log('token bom      :', await pedir({ Authorization: `Bearer ${token}` }));\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 5,
        "titulo": "O id sai do token, não da URL",
        "secao": "NA PRÁTICA",
        "codigo": "const expresso = require('express');\nconst assinador = require('jsonwebtoken');\n(async () => {\n  const SEGREDO = 'segredo-do-.env';\n\n  const contas = { 1: { id: 1, nome: 'Ana' }, 2: { id: 2, nome: 'Bruno' } };\n  const app = expresso();\n\n  app.use((req, res, next) => {                    // loginRequired encurtado\n    const [, token] = (req.headers.authorization || '').split(' ');\n    try { req.userId = assinador.verify(token, SEGREDO).id; next(); }\n    catch { res.status(401).json({ errors: ['Login obrigatório.'] }); }\n  });\n\n  app.delete('/errado/:id', (req, res) => res.json({ apagou: contas[req.params.id] }));\n  app.delete('/certo', (req, res) => res.json({ apagou: contas[req.userId] }));\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}`;\n    const token = assinador.sign({ id: 1 }, SEGREDO);    // token da Ana\n    const chamar = (rota) => fetch(url + rota, {\n      method: 'DELETE', headers: { Authorization: `Bearer ${token}` },\n    }).then((r) => r.json());\n\n    console.log('DELETE /errado/2 →', JSON.stringify(await chamar('/errado/2')), '← a Ana apagou o Bruno');\n    console.log('DELETE /certo    →', JSON.stringify(await chamar('/certo')), '← só a própria conta');\n    console.log('\\nPor isso PUT, PATCH e DELETE de /users não recebem :id na 07-api-rest.');\n    console.log('Trocar um número na URL é a coisa mais fácil do mundo.');\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 6,
        "titulo": "Sessão ou token?",
        "secao": "NA PRÁTICA",
        "codigo": "const comparacao = [\n  ['Onde fica o estado', 'no servidor', 'no próprio token'],\n  ['O cliente guarda', 'um cookie com o id', 'o token inteiro'],\n  ['Servir aplicativo', 'desajeitado', 'natural'],\n  ['Vários servidores', 'precisa de Redis compartilhado', 'qualquer um confere sozinho'],\n  ['Derrubar o acesso', 'apaga a sessão, cai na hora', 'só quando o token expira'],\n];\n\nconst largura = [22, 30, 30];\nconst linha = (cs) => cs.map((c, i) => c.padEnd(largura[i])).join(' ');\nconsole.log(linha(['', 'SESSÃO (06-sessao)', 'TOKEN (aqui)']));\nconsole.log(linha(['─'.repeat(20), '─'.repeat(28), '─'.repeat(28)]));\nfor (const l of comparacao) console.log(linha(l));\n\nconsole.log('\\nA última linha é a que dói: token roubado vale até expirar. Por isso a');\nconsole.log('validade é curta e o middleware ainda confere o usuário no banco.');"
       },
       {
        "n": 7,
        "titulo": "O token vale mesmo depois de apagar o usuário",
        "secao": "PEGADINHAS",
        "codigo": "const jwtToken = require('jsonwebtoken');\n(async () => {\n  const SEGREDO = 'segredo-do-.env';\n\n  let banco = [{ id: 1, email: 'ana@escola.dev' }];\n  const token = jwtToken.sign({ id: 1, email: 'ana@escola.dev' }, SEGREDO, { expiresIn: '7d' });\n\n  banco = banco.filter((u) => u.id !== 1);           // a conta foi apagada agora\n\n  const soAssinatura = jwtToken.verify(token, SEGREDO);\n  console.log('verify ainda passa   : id', soAssinatura.id, '← a assinatura continua boa');\n\n  const noBanco = banco.find((u) => u.id === soAssinatura.id);\n  console.log('existe no banco?     :', Boolean(noBanco), '← aqui a fraude aparece');\n\n  console.log('\\nO token é uma FOTO de quando foi emitido. Se a conta foi apagada, ou se a');\n  console.log('pessoa deixou de ser administradora, ele não sabe: continua dizendo o antigo.');\n  console.log('Por isso o loginRequired busca o usuário e confere id e e-mail antes do next().');\n})();"
       }
      ],
      "resumo": [
       "`jwt.sign({ id, email }, segredo, { expiresIn })` no login; o cliente guarda o token.",
       "O token é legível por qualquer um: assinado, não escondido. Nada de sigiloso dentro.",
       "`jwt.verify` lança — o middleware é try/catch e responde 401.",
       "`Authorization: Bearer <token>` no cabeçalho de todo pedido protegido.",
       "O id do dono sai do token (`req.userId`), nunca da URL.",
       "Token é foto do passado: confira o usuário no banco e use validade curta."
      ]
     },
     {
      "slug": "04-upload-com-multer",
      "arquivo": "node/src/09-api-e-autenticacao/04-upload-com-multer.js",
      "comando": "node src/09-api-e-autenticacao/04-upload-com-multer.js",
      "titulo": "Upload de arquivo com Multer",
      "sessao": 6,
      "oQueE": "o middleware que entende `multipart/form-data` — o formato que o navegador usa para mandar arquivo — e grava o que chegou no disco.",
      "quandoUsar": "foto de perfil, anexo, planilha importada. Qualquer coisa que vem como arquivo.",
      "quandoNaoUsar": "para o arquivo em si em produção séria — disco de servidor não sobrevive a um deploy. O Multer grava; depois se manda para S3 ou parecido.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "src/configs/multerConfig.js",
        "secao": "ESSENCIAL",
        "codigo": "const multer = require('multer');\nconst path = require('node:path');\nconst os = require('node:os');\n(() => {\n  const config = {\n    fileFilter: (req, file, cb) => {\n      if (!['image/png', 'image/jpeg'].includes(file.mimetype))\n        return cb(new multer.MulterError('TIPO_ERRADO'));   // vira erro no req.file\n      return cb(null, true);\n    },\n    limits: { fileSize: 2 * 1024 * 1024 },                  // 2 MB, em bytes\n    storage: multer.diskStorage({\n      destination: (req, file, cb) => cb(null, path.resolve(os.tmpdir(), 'uploads')),\n      // Nome gerado: dois arquivos \"foto.png\" de pessoas diferentes não podem se atropelar.\n      filename: (req, file, cb) => cb(null, `${Date.now()}_${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`),\n    }),\n  };\n\n  console.log('tipos aceitos :', 'image/png, image/jpeg');\n  console.log('tamanho máximo:', config.limits.fileSize / 1024 / 1024, 'MB');\n  console.log('nome gerado   : 1787942081234_k3jd9f.png ← data + sorteio + extensão original');\n  console.log('\\nO nome que o usuário mandou nunca vira nome de arquivo no seu disco:');\n  console.log('\"../../.env\" seria um nome perfeitamente válido para ele escolher.');\n})();"
       },
       {
        "n": 2,
        "titulo": "A rota de upload e o req.file",
        "secao": "ESSENCIAL",
        "codigo": "const express = require('express');\nconst multerLib = require('multer');\nconst fs = require('node:fs');\nconst caminho = require('node:path');\nconst sistema = require('node:os');\n(async () => {\n  const pasta = caminho.resolve(sistema.tmpdir(), 'uploads-exemplo-2');\n  fs.mkdirSync(pasta, { recursive: true });\n\n  const upload = multerLib({ dest: pasta });\n  const app = express();\n\n  // 'foto' é o nome do campo no formulário — tem que bater com o que o cliente manda.\n  app.post('/fotos', upload.single('foto'), (req, res) => {\n    const { originalname, filename, size, mimetype } = req.file;\n    res.status(201).json({ originalname, filename, size, mimetype });\n  });\n\n  const servidor = app.listen(0, async () => {\n    const formulario = new FormData();\n    formulario.append('foto', new Blob([Buffer.alloc(1234)], { type: 'image/png' }), 'ana-perfil.png');\n\n    const r = await fetch(`http://localhost:${servidor.address().port}/fotos`, {\n      method: 'POST', body: formulario,\n    });\n    const corpo = await r.json();\n    console.log('status          :', r.status);\n    console.log('originalname    :', corpo.originalname, '← o nome do computador dele');\n    console.log('mimetype        :', corpo.mimetype);\n    console.log('size            :', corpo.size, 'bytes');\n    console.log('gravado no disco:', fs.existsSync(caminho.resolve(pasta, corpo.filename)));\n\n    fs.rmSync(pasta, { recursive: true, force: true });\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 3,
        "titulo": "Recusar o que não deve entrar",
        "secao": "ESSENCIAL",
        "codigo": "const expresso = require('express');\nconst uploadLib = require('multer');\nconst so = require('node:os');\nconst montar = require('node:path');\nconst disco = require('node:fs');\n(async () => {\n  const pasta = montar.resolve(so.tmpdir(), 'uploads-exemplo-3');\n  disco.mkdirSync(pasta, { recursive: true });\n\n  const upload = uploadLib({\n    dest: pasta,\n    limits: { fileSize: 1024 },                            // 1 KB, para caber no exemplo\n    fileFilter: (req, file, cb) =>\n      cb(null, ['image/png', 'image/jpeg'].includes(file.mimetype)),   // false = recusa calado\n  });\n\n  const app = expresso();\n  app.post('/fotos', upload.single('foto'), (req, res) => {\n    if (!req.file) return res.status(400).json({ errors: ['Envie uma imagem PNG ou JPG.'] });\n    return res.status(201).json({ aceito: req.file.mimetype });\n  });\n  // O erro do Multer (tamanho, por exemplo) chega aqui, no middleware de erro de 4 argumentos.\n  app.use((erro, req, res, proximo) => res.status(400).json({ errors: [erro.code || erro.message] }));\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}/fotos`;\n    const enviar = async (bytes, tipo, nome) => {\n      const f = new FormData();\n      f.append('foto', new Blob([Buffer.alloc(bytes)], { type: tipo }), nome);\n      const r = await fetch(url, { method: 'POST', body: f });\n      return `${r.status} ${JSON.stringify(await r.json()).slice(0, 60)}`;\n    };\n\n    console.log('png de 500 bytes:', await enviar(500, 'image/png', 'ok.png'));\n    console.log('pdf de 500 bytes:', await enviar(500, 'application/pdf', 'contrato.pdf'));\n    console.log('png de 5 KB     :', await enviar(5000, 'image/png', 'grande.png'));\n\n    disco.rmSync(pasta, { recursive: true, force: true });\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 4,
        "titulo": "Gravar no disco é metade: falta a URL",
        "secao": "NA PRÁTICA",
        "codigo": "const expr = require('express');\nconst arquivos = require('node:fs');\nconst pth = require('node:path');\nconst osLib = require('node:os');\n(async () => {\n  const pasta = pth.resolve(osLib.tmpdir(), 'uploads-exemplo-4');\n  arquivos.mkdirSync(pasta, { recursive: true });\n  arquivos.writeFileSync(pth.resolve(pasta, '1787942081_k3jd.png'), 'bytes de uma imagem');\n\n  const app = expr();\n  app.use('/uploads', expr.static(pasta));      // a pasta vira endereço público\n\n  // O banco guarda só o nome do arquivo; a URL é montada na hora de responder.\n  const linha = { id: 1, filename: '1787942081_k3jd.png', aluno_id: 3 };\n  app.get('/fotos/1', (req, res) => res.json({\n    id: linha.id,\n    url: `${process.env.APP_URL || 'http://localhost:3001'}/uploads/${linha.filename}`,\n  }));\n\n  const servidor = app.listen(0, async () => {\n    const url = `http://localhost:${servidor.address().port}`;\n    console.log('GET /fotos/1 →', JSON.stringify(await fetch(url + '/fotos/1').then((r) => r.json())));\n    const arquivo = await fetch(`${url}/uploads/${linha.filename}`);\n    console.log('a imagem abre?', arquivo.status, await arquivo.text());\n    console.log('\\nGuardar a URL inteira no banco quebra no dia em que o domínio mudar.');\n    console.log('Guarde o nome; monte a URL com APP_URL na resposta.');\n\n    arquivos.rmSync(pasta, { recursive: true, force: true });\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 5,
        "titulo": "Apagou o registro, apague o arquivo",
        "secao": "NA PRÁTICA",
        "codigo": "const fsPromessas = require('node:fs/promises');\nconst caminhos = require('node:path');\nconst os5 = require('node:os');\n(async () => {\n  const pasta = caminhos.resolve(os5.tmpdir(), 'uploads-exemplo-5');\n  await fsPromessas.mkdir(pasta, { recursive: true });\n  await fsPromessas.writeFile(caminhos.resolve(pasta, 'foto-antiga.png'), 'bytes');\n\n  let banco = [{ id: 1, filename: 'foto-antiga.png' }];\n\n  async function destroy(id) {\n    const foto = banco.find((f) => f.id === id);\n    if (!foto) return { status: 404, corpo: { errors: ['Foto não existe.'] } };\n\n    banco = banco.filter((f) => f.id !== id);\n    // O arquivo pode já ter sumido (deploy, limpeza manual): isso não é motivo de erro 500.\n    await fsPromessas.unlink(caminhos.resolve(pasta, foto.filename)).catch(() => {});\n    return { status: 200, corpo: foto };\n  }\n\n  console.log('antes  :', await fsPromessas.readdir(pasta));\n  console.log('DELETE :', JSON.stringify(await destroy(1)));\n  console.log('depois :', await fsPromessas.readdir(pasta), '← sem arquivo órfão ocupando disco');\n  console.log('de novo:', JSON.stringify(await destroy(1)));\n\n  await fsPromessas.rm(pasta, { recursive: true, force: true });\n})();"
       },
       {
        "n": 6,
        "titulo": "A validação falhou DEPOIS de o arquivo já estar no disco",
        "secao": "NA PRÁTICA",
        "codigo": "const web = require('express');\nconst envio = require('multer');\nconst fsSync = require('node:fs');\nconst path6 = require('node:path');\nconst os6 = require('node:os');\n(async () => {\n  const pasta = path6.resolve(os6.tmpdir(), 'uploads-exemplo-6');\n  fsSync.mkdirSync(pasta, { recursive: true });\n  const app = web();\n  const upload = envio({ dest: pasta });\n\n  app.post('/fotos', upload.single('foto'), (req, res) => {\n    if (!req.body.aluno_id) {\n      // O Multer gravou antes de a rota rodar. Sem esta linha, sobra lixo no disco.\n      fsSync.unlinkSync(req.file.path);\n      return res.status(400).json({ errors: ['Informe o aluno_id.'] });\n    }\n    return res.status(201).json({ filename: req.file.filename });\n  });\n\n  const servidor = app.listen(0, async () => {\n    const f = new FormData();\n    f.append('foto', new Blob([Buffer.alloc(100)], { type: 'image/png' }), 'sem-dono.png');\n\n    const r = await fetch(`http://localhost:${servidor.address().port}/fotos`, { method: 'POST', body: f });\n    console.log('resposta        :', r.status, JSON.stringify(await r.json()));\n    console.log('sobrou no disco :', fsSync.readdirSync(pasta).length, 'arquivo(s)');\n    console.log('\\nO Multer roda ANTES da sua rota: quando a validação falha, o arquivo já');\n    console.log('existe. Todo caminho de erro depois do upload tem que apagar o arquivo.');\n\n    fsSync.rmSync(pasta, { recursive: true, force: true });\n    servidor.close();\n  });\n})();"
       },
       {
        "n": 7,
        "titulo": "Em multipart, req.body só existe depois do Multer",
        "secao": "PEGADINHAS",
        "codigo": "const framework = require('express');\nconst arquivosLib = require('multer');\nconst os7 = require('node:os');\nconst path7 = require('node:path');\nconst sistemaDeArquivos = require('node:fs');\n(async () => {\n  const pasta = path7.resolve(os7.tmpdir(), 'uploads-exemplo-7');\n  sistemaDeArquivos.mkdirSync(pasta, { recursive: true });\n  const app = framework();\n  app.use(framework.json());                        // não entende multipart, e tudo bem\n  const upload = arquivosLib({ dest: pasta });\n\n  app.post('/antes', (req, res, proximo) => {\n    console.log('antes do multer :', JSON.stringify(req.body), '← o corpo ainda nem foi lido');\n    proximo();\n  }, upload.single('foto'), (req, res) => {\n    console.log('depois do multer:', JSON.stringify(req.body), '← os campos de texto chegaram');\n    res.json({ ok: true });\n  });\n\n  const servidor = app.listen(0, async () => {\n    const f = new FormData();\n    f.append('aluno_id', '3');\n    f.append('foto', new Blob([Buffer.alloc(50)], { type: 'image/png' }), 'ana.png');\n    await fetch(`http://localhost:${servidor.address().port}/antes`, { method: 'POST', body: f });\n\n    console.log('\\nQuem quiser ler `aluno_id` tem que vir DEPOIS do upload.single().');\n    console.log('E `express.json()` não ajuda em nada aqui: o formato é outro.');\n    sistemaDeArquivos.rmSync(pasta, { recursive: true, force: true });\n    servidor.close();\n  });\n})();"
       }
      ],
      "resumo": [
       "`upload.single('foto')` põe o arquivo em `req.file` e os campos de texto em `req.body`.",
       "Nome de arquivo é sempre gerado por você — o do usuário é texto de entrada, não caminho.",
       "`fileFilter` e `limits` recusam tipo e tamanho antes de o disco encher.",
       "Guarde o nome no banco e monte a URL com APP_URL; sirva a pasta com `express.static`.",
       "Apagou o registro, apague o arquivo — e ignore o arquivo que já não estava lá.",
       "Falhou depois do upload? Apague o que o Multer gravou, senão sobra órfão para sempre."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "typescript",
  "titulo": "TypeScript",
  "selo": "TS",
  "subtitulo": "JavaScript com tipos",
  "ordem": 3,
  "cor": "#79c0ff",
  "resumo": "O mesmo JavaScript, com um contrato escrito: o editor avisa o erro antes de rodar. Tipos, interface, classe tipada e generics.",
  "depoisDe": "node",
  "exigencia": "TypeScript não é outra linguagem: é JavaScript mais uma camada de tipos que some na hora de rodar. Sem saber função, objeto, array e classe, não há o que tipar.",
  "temas": [
   {
    "slug": "01-primeiros-passos",
    "titulo": "Primeiros Passos",
    "icone": "◆",
    "cor": "#79c0ff",
    "resumo": "O que o TypeScript acrescenta, como ele roda e o que o strict cobra.",
    "topicos": [
     {
      "slug": "01-por-que-typescript",
      "arquivo": "typescript/src/01-primeiros-passos/01-por-que-typescript.ts",
      "comando": "node src/01-primeiros-passos/01-por-que-typescript.ts",
      "titulo": "Por que TypeScript",
      "sessao": 1,
      "oQueE": "JavaScript com uma camada de tipos por cima. Você escreve o contrato (\"isto aqui é um número\"), o compilador confere, e na hora de rodar a camada some.",
      "quandoUsar": "em qualquer código que outra pessoa vá mexer, ou que você vá mexer daqui a três meses — que é a mesma coisa.",
      "quandoNaoUsar": "num script de dez linhas que roda uma vez. O tipo cobra um preço em escrita, e nesse tamanho ele não devolve.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O erro que o JavaScript só conta depois",
        "secao": "ESSENCIAL",
        "codigo": "// Em JavaScript isto não estoura: soma texto com número e devolve texto.\nconst somaSolta = (a: any, b: any) => a + b;\nconsole.log('preço + frete:', somaSolta('10', 5), '← \"105\", não 15');\n\n// Com o tipo escrito, o erro para de ser uma surpresa do carrinho e vira um aviso do editor.\nconst somar = (a: number, b: number) => a + b;\nconsole.log('preço + frete:', somar(10, 5));\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\nconsole.log('com texto   :', somar('10', 5), '← o tsc recusa; o node, que só apaga tipos, deixa passar');",
        "codigoJs": "const somaSolta = (a, b)=>a + b;\nconsole.log('preço + frete:', somaSolta('10', 5), '← \"105\", não 15');\nconst somar = (a, b)=>a + b;\nconsole.log('preço + frete:', somar(10, 5));\nconsole.log('com texto   :', somar('10', 5), '← o tsc recusa; o node, que só apaga tipos, deixa passar');\n"
       },
       {
        "n": 2,
        "titulo": "Você já escreve tipos, mesmo sem anotar nada",
        "secao": "ESSENCIAL",
        "codigo": "const precoUnitario = 19.9;                      // TypeScript infere: number\nconst nomeProduto = 'Caneca';                    // infere: string\nconst itensDoCarrinho = ['Caneca', 'Caderno'];   // infere: string[]\n\nconsole.log(`${nomeProduto}: R$ ${precoUnitario.toFixed(2)}`);\nconsole.log('itens:', itensDoCarrinho.join(', '));\n\ntry {\n  // @ts-expect-error — Property 'toFixed' does not exist on type 'string'.\n  console.log(nomeProduto.toFixed(2));\n} catch (erro) {\n  console.log('nomeProduto.toFixed:', (erro as Error).message);\n}\n\nconsole.log('\\nRepare no atraso: o tsc acusa essa linha antes de você salvar; o JavaScript');\nconsole.log('só descobre quando o programa chega nela — em produção, na terça-feira.');\nconsole.log('\\nAnotar é para quando a inferência não alcança: parâmetro de função, dado que');\nconsole.log('chega de fora, variável que nasce vazia. No resto, deixe o TypeScript deduzir.');",
        "codigoJs": "const precoUnitario = 19.9;\nconst nomeProduto = 'Caneca';\nconst itensDoCarrinho = [\n    'Caneca',\n    'Caderno'\n];\nconsole.log(`${nomeProduto}: R$ ${precoUnitario.toFixed(2)}`);\nconsole.log('itens:', itensDoCarrinho.join(', '));\ntry {\n    console.log(nomeProduto.toFixed(2));\n} catch (erro) {\n    console.log('nomeProduto.toFixed:', erro.message);\n}\nconsole.log('\\nRepare no atraso: o tsc acusa essa linha antes de você salvar; o JavaScript');\nconsole.log('só descobre quando o programa chega nela — em produção, na terça-feira.');\nconsole.log('\\nAnotar é para quando a inferência não alcança: parâmetro de função, dado que');\nconsole.log('chega de fora, variável que nasce vazia. No resto, deixe o TypeScript deduzir.');\n"
       },
       {
        "n": 3,
        "titulo": "O tipo some na hora de rodar",
        "secao": "ESSENCIAL",
        "codigo": "interface Entrega {\n  cidade: string;\n  prazoEmDias: number;\n}\n\nconst entrega: Entrega = { cidade: 'Belo Horizonte', prazoEmDias: 3 };\nconsole.log(`${entrega.cidade}: ${entrega.prazoEmDias} dias`);\n\n// `interface` não existe depois de compilado — não dá para perguntar por ela em tempo de execução.\nconsole.log('typeof entrega  :', typeof entrega, '← \"object\", como qualquer objeto JavaScript');\nconsole.log('sobrou algo?    :', Object.keys(entrega).join(', '), '← só os dados');\n\nconsole.log('\\nO JavaScript gerado deste bloco é o mesmo que você escreveria sem TypeScript.');\nconsole.log('Tipo é conversa entre você e o compilador; o navegador nunca fica sabendo.');",
        "codigoJs": "const entrega = {\n    cidade: 'Belo Horizonte',\n    prazoEmDias: 3\n};\nconsole.log(`${entrega.cidade}: ${entrega.prazoEmDias} dias`);\nconsole.log('typeof entrega  :', typeof entrega, '← \"object\", como qualquer objeto JavaScript');\nconsole.log('sobrou algo?    :', Object.keys(entrega).join(', '), '← só os dados');\nconsole.log('\\nO JavaScript gerado deste bloco é o mesmo que você escreveria sem TypeScript.');\nconsole.log('Tipo é conversa entre você e o compilador; o navegador nunca fica sabendo.');\n"
       },
       {
        "n": 4,
        "titulo": "Duas ferramentas, dois trabalhos",
        "secao": "NA PRÁTICA",
        "codigo": "const ferramentas = [\n  ['node arquivo.ts', 'APAGA os tipos e roda', 'não confere nada'],\n  ['npx tsc --noEmit', 'CONFERE os tipos', 'não roda nada'],\n  ['editor (VS Code)', 'confere enquanto você digita', 'é o mesmo tsc, ao vivo'],\n];\n\nconst largura = [20, 32, 26];\nconst linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');\nconsole.log(linha(['COMANDO', 'O QUE FAZ', 'O QUE NÃO FAZ']));\nconsole.log(linha(['─'.repeat(18), '─'.repeat(30), '─'.repeat(24)]));\nfor (const f of ferramentas) console.log(linha(f));\n\nconsole.log('\\nÉ por isso que este arquivo roda com um erro de tipo dentro dele e não reclama:');\nconsole.log('quem reclama é o `npm run check`, e é ele que você roda antes de subir código.');",
        "codigoJs": "const ferramentas = [\n    [\n        'node arquivo.ts',\n        'APAGA os tipos e roda',\n        'não confere nada'\n    ],\n    [\n        'npx tsc --noEmit',\n        'CONFERE os tipos',\n        'não roda nada'\n    ],\n    [\n        'editor (VS Code)',\n        'confere enquanto você digita',\n        'é o mesmo tsc, ao vivo'\n    ]\n];\nconst largura = [\n    20,\n    32,\n    26\n];\nconst linha = (colunas)=>colunas.map((c, i)=>c.padEnd(largura[i])).join('');\nconsole.log(linha([\n    'COMANDO',\n    'O QUE FAZ',\n    'O QUE NÃO FAZ'\n]));\nconsole.log(linha([\n    '─'.repeat(18),\n    '─'.repeat(30),\n    '─'.repeat(24)\n]));\nfor (const f of ferramentas)console.log(linha(f));\nconsole.log('\\nÉ por isso que este arquivo roda com um erro de tipo dentro dele e não reclama:');\nconsole.log('quem reclama é o `npm run check`, e é ele que você roda antes de subir código.');\n"
       },
       {
        "n": 5,
        "titulo": "O contrato aparece na chamada, não na leitura",
        "secao": "NA PRÁTICA",
        "codigo": "type ItemDoPedido = { descricao: string; quantidade: number; precoUnitario: number };\n\nfunction totalDoPedido(itens: ItemDoPedido[]): number {\n  return itens.reduce((soma, item) => soma + item.quantidade * item.precoUnitario, 0);\n}\n\nconsole.log('total:', totalDoPedido([\n  { descricao: 'Caneca', quantidade: 2, precoUnitario: 19.9 },\n  { descricao: 'Caderno', quantidade: 1, precoUnitario: 32.5 },\n]).toFixed(2));\n\n// @ts-expect-error — Property 'quantidade' is missing in type '{ descricao: string; precoUnitario: number; }'.\ntotalDoPedido([{ descricao: 'Caneca', precoUnitario: 19.9 }]);\n\nconsole.log('\\nEm JavaScript, esse item faltando vira NaN e alguém descobre no relatório do mês.');\nconsole.log('O tipo não deixa a chamada errada nem ser escrita.');",
        "codigoJs": "function totalDoPedido(itens) {\n    return itens.reduce((soma, item)=>soma + item.quantidade * item.precoUnitario, 0);\n}\nconsole.log('total:', totalDoPedido([\n    {\n        descricao: 'Caneca',\n        quantidade: 2,\n        precoUnitario: 19.9\n    },\n    {\n        descricao: 'Caderno',\n        quantidade: 1,\n        precoUnitario: 32.5\n    }\n]).toFixed(2));\ntotalDoPedido([\n    {\n        descricao: 'Caneca',\n        precoUnitario: 19.9\n    }\n]);\nconsole.log('\\nEm JavaScript, esse item faltando vira NaN e alguém descobre no relatório do mês.');\nconsole.log('O tipo não deixa a chamada errada nem ser escrita.');\n"
       },
       {
        "n": 6,
        "titulo": "Tipo não confere nada em tempo de execução",
        "secao": "PEGADINHAS",
        "codigo": "type Usuario = { nome: string; idade: number };\n\n// Isto é o que chega de uma API: JSON, texto puro. O tipo é uma promessa, não uma checagem.\nconst respostaDaApi = JSON.parse('{\"nome\":\"Ana\",\"idade\":\"trinta\"}') as Usuario;\n\nconsole.log('o tipo diz  : idade é number');\nconsole.log('a realidade :', typeof respostaDaApi.idade, JSON.stringify(respostaDaApi.idade));\nconsole.log('idade + 1   :', respostaDaApi.idade + 1, '← \"trinta1\"');\n\nconsole.log('\\n`as` é você jurando para o compilador. Ele acredita e para de perguntar.');\nconsole.log('Dado que vem de fora (fetch, JSON.parse, formulário) precisa ser CONFERIDO');\nconsole.log('rodando — com `typeof`, com um type guard ou com uma biblioteca como o zod.');",
        "codigoJs": "const respostaDaApi = JSON.parse('{\"nome\":\"Ana\",\"idade\":\"trinta\"}');\nconsole.log('o tipo diz  : idade é number');\nconsole.log('a realidade :', typeof respostaDaApi.idade, JSON.stringify(respostaDaApi.idade));\nconsole.log('idade + 1   :', respostaDaApi.idade + 1, '← \"trinta1\"');\nconsole.log('\\n`as` é você jurando para o compilador. Ele acredita e para de perguntar.');\nconsole.log('Dado que vem de fora (fetch, JSON.parse, formulário) precisa ser CONFERIDO');\nconsole.log('rodando — com `typeof`, com um type guard ou com uma biblioteca como o zod.');\n"
       }
      ],
      "resumo": [
       "TypeScript é JavaScript mais um contrato: o compilador confere, o runtime nem vê.",
       "`node arquivo.ts` apaga os tipos e roda; quem acusa erro é `tsc` (e o editor).",
       "Boa parte dos tipos já vem da inferência — anote onde ela não alcança.",
       "O ganho aparece na CHAMADA: o argumento errado não chega a ser escrito.",
       "Nada disso vale para dado que vem de fora: ali o tipo é promessa, e promessa se confere."
      ]
     },
     {
      "slug": "02-anotacao-e-inferencia",
      "arquivo": "typescript/src/01-primeiros-passos/02-anotacao-e-inferencia.ts",
      "comando": "node src/01-primeiros-passos/02-anotacao-e-inferencia.ts",
      "titulo": "Anotação e inferência",
      "sessao": 1,
      "oQueE": "as duas formas de um valor ganhar tipo — você escreve (`: number`) ou o TypeScript deduz sozinho pelo que foi atribuído.",
      "quandoUsar": "anote parâmetro de função, retorno de API pública e variável que nasce vazia. É onde a dedução não tem de onde tirar a resposta.",
      "quandoNaoUsar": "em cima de um valor literal. `const preco: number = 19.9` é ruído: o TypeScript já sabia, e agora existem dois lugares para manter.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O que a inferência já resolve sozinha",
        "secao": "ESSENCIAL",
        "codigo": "const quantidade = 3;                            // number\nconst descricao = 'Caderno A5';                  // string\nconst emPromocao = false;                        // boolean\nconst tags = ['papelaria', 'escritório'];        // string[]\nconst medidas = { altura: 21, largura: 15 };     // { altura: number; largura: number }\n\nconsole.log(`${quantidade}x ${descricao} — ${medidas.altura}x${medidas.largura}cm`);\nconsole.log('tags:', tags.map((t) => t.toUpperCase()).join(' · '));\nconsole.log('promoção:', emPromocao ? 'sim' : 'não');\n\n// Nenhuma linha acima tem anotação, e todas estão tipadas. Esta não passa:\n// @ts-expect-error — Type 'string' is not assignable to type 'number'.\nconsole.log(medidas.altura + ' cm', (medidas.largura = 'quinze'));",
        "codigoJs": "const quantidade = 3;\nconst descricao = 'Caderno A5';\nconst emPromocao = false;\nconst tags = [\n    'papelaria',\n    'escritório'\n];\nconst medidas = {\n    altura: 21,\n    largura: 15\n};\nconsole.log(`${quantidade}x ${descricao} — ${medidas.altura}x${medidas.largura}cm`);\nconsole.log('tags:', tags.map((t)=>t.toUpperCase()).join(' · '));\nconsole.log('promoção:', emPromocao ? 'sim' : 'não');\nconsole.log(medidas.altura + ' cm', medidas.largura = 'quinze');\n"
       },
       {
        "n": 2,
        "titulo": "Onde a inferência não alcança: parâmetro",
        "secao": "ESSENCIAL",
        "codigo": "// Um parâmetro não tem valor até alguém chamar. Sem anotação, ele viraria `any` — e `any`\n// desliga a conferência exatamente no lugar por onde o dado errado entra.\nfunction calcularFrete(pesoEmKg: number, distanciaEmKm: number): number {\n  return 8 + pesoEmKg * 0.9 + distanciaEmKm * 0.15;\n}\n\nconsole.log('frete 2kg / 40km:', calcularFrete(2, 40).toFixed(2));\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\nconsole.log('frete \"2kg\"    :', calcularFrete('2', 40).toFixed(2), '← passou: o node só apaga o tipo');\n\nconsole.log('\\nO retorno, esse sim, o TypeScript deduz: `8 + number + number` só pode dar');\nconsole.log('number. Anotar o retorno é opcional — mas ele documenta e trava a intenção.');",
        "codigoJs": "function calcularFrete(pesoEmKg, distanciaEmKm) {\n    return 8 + pesoEmKg * 0.9 + distanciaEmKm * 0.15;\n}\nconsole.log('frete 2kg / 40km:', calcularFrete(2, 40).toFixed(2));\nconsole.log('frete \"2kg\"    :', calcularFrete('2', 40).toFixed(2), '← passou: o node só apaga o tipo');\nconsole.log('\\nO retorno, esse sim, o TypeScript deduz: `8 + number + number` só pode dar');\nconsole.log('number. Anotar o retorno é opcional — mas ele documenta e trava a intenção.');\n"
       },
       {
        "n": 3,
        "titulo": "`let` alarga, `const` estreita",
        "secao": "ESSENCIAL",
        "codigo": "const formaDePagamento = 'pix';                  // tipo: 'pix' — o literal, não string\nlet formaEscolhida = 'pix';                      // tipo: string — porque let pode mudar\n\nconsole.log('const:', formaDePagamento, '· let:', formaEscolhida);\n\nformaEscolhida = 'boleto';                       // permitido: qualquer string serve\nconsole.log('depois de mudar:', formaEscolhida);\n\nconst taxas = { pix: 0, boleto: 2.5, cartao: 4.9 };\nconsole.log('taxa do pix   :', taxas[formaDePagamento].toFixed(2), '← o const sabe QUAL chave é');\n\n// @ts-expect-error — Type 'string' can't be used to index type '{ pix: number; ... }'.\nconsole.log('taxa do let   :', taxas[formaEscolhida]);\n\nconsole.log('\\nÉ a diferença mais útil e menos óbvia do TypeScript: `const` guarda o valor');\nconsole.log('exato no tipo, e é isso que faz união de literais funcionar no tema 03.');",
        "codigoJs": "const formaDePagamento = 'pix';\nlet formaEscolhida = 'pix';\nconsole.log('const:', formaDePagamento, '· let:', formaEscolhida);\nformaEscolhida = 'boleto';\nconsole.log('depois de mudar:', formaEscolhida);\nconst taxas = {\n    pix: 0,\n    boleto: 2.5,\n    cartao: 4.9\n};\nconsole.log('taxa do pix   :', taxas[formaDePagamento].toFixed(2), '← o const sabe QUAL chave é');\nconsole.log('taxa do let   :', taxas[formaEscolhida]);\nconsole.log('\\nÉ a diferença mais útil e menos óbvia do TypeScript: `const` guarda o valor');\nconsole.log('exato no tipo, e é isso que faz união de literais funcionar no tema 03.');\n"
       },
       {
        "n": 4,
        "titulo": "A variável que nasce vazia",
        "secao": "NA PRÁTICA",
        "codigo": "// Aqui a inferência não tem de onde tirar nada: `[]` é `never[]` e `null` é `null`.\nconst historicoDeVendas: number[] = [];\nlet clienteAtual: string | null = null;\n\nhistoricoDeVendas.push(120.5, 89.9, 240);\nclienteAtual = 'Ana Souza';\n\nconst totalVendido = historicoDeVendas.reduce((soma, v) => soma + v, 0);\nconsole.log(`${clienteAtual}: ${historicoDeVendas.length} vendas, R$ ${totalVendido.toFixed(2)}`);\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\nhistoricoDeVendas.push('120,50');\n\nconsole.log('\\nRegra prática: se o valor inicial não conta a história toda, anote. Foi para');\nconsole.log('isso que a anotação existe — não para repetir o que já está escrito ao lado.');",
        "codigoJs": "const historicoDeVendas = [];\nlet clienteAtual = null;\nhistoricoDeVendas.push(120.5, 89.9, 240);\nclienteAtual = 'Ana Souza';\nconst totalVendido = historicoDeVendas.reduce((soma, v)=>soma + v, 0);\nconsole.log(`${clienteAtual}: ${historicoDeVendas.length} vendas, R$ ${totalVendido.toFixed(2)}`);\nhistoricoDeVendas.push('120,50');\nconsole.log('\\nRegra prática: se o valor inicial não conta a história toda, anote. Foi para');\nconsole.log('isso que a anotação existe — não para repetir o que já está escrito ao lado.');\n"
       },
       {
        "n": 5,
        "titulo": "Anotar demais atrapalha",
        "secao": "NA PRÁTICA",
        "codigo": "type Cliente = { nome: string; cidade: string };\n\n// Ruim: o tipo está escrito duas vezes e as duas precisam ser mantidas.\nconst clienteVerboso: { nome: string; cidade: string } = { nome: 'Bruno', cidade: 'Recife' };\n\n// Bom: o tipo tem nome, e o objeto é conferido contra ele.\nconst clienteBom: Cliente = { nome: 'Bruno', cidade: 'Recife' };\n\n// Melhor ainda quando não há contrato a cumprir: deixa deduzir.\nconst clienteSolto = { nome: 'Bruno', cidade: 'Recife' };\n\nconsole.log(clienteVerboso.cidade, clienteBom.cidade, clienteSolto.cidade);\n\n// A anotação não é decoração: é ela que faz o excesso ser recusado.\n// @ts-expect-error — Object literal may only specify known properties.\nconst clienteErrado: Cliente = { nome: 'Bruno', cidade: 'Recife', telefone: '81 9999' };\nconsole.log('mesmo recusado, o objeto existe rodando:', Object.keys(clienteErrado).length, 'chaves');",
        "codigoJs": "const clienteVerboso = {\n    nome: 'Bruno',\n    cidade: 'Recife'\n};\nconst clienteBom = {\n    nome: 'Bruno',\n    cidade: 'Recife'\n};\nconst clienteSolto = {\n    nome: 'Bruno',\n    cidade: 'Recife'\n};\nconsole.log(clienteVerboso.cidade, clienteBom.cidade, clienteSolto.cidade);\nconst clienteErrado = {\n    nome: 'Bruno',\n    cidade: 'Recife',\n    telefone: '81 9999'\n};\nconsole.log('mesmo recusado, o objeto existe rodando:', Object.keys(clienteErrado).length, 'chaves');\n"
       },
       {
        "n": 6,
        "titulo": "`any` não é \"não sei\": é \"não confira\"",
        "secao": "PEGADINHAS",
        "codigo": "const respostaSolta: any = { nome: 'Ana', pedidos: 3 };\n\nconsole.log(respostaSolta.nome);\nconsole.log(respostaSolta.pedidoss);        // erro de digitação: o tsc não pia\nconsole.log('somando texto:', respostaSolta.nome * 2);\n\nconsole.log('\\nNenhuma das três linhas acima é acusada. `any` desliga o TypeScript naquele');\nconsole.log('valor E em tudo que sai dele — o erro volta a ser descoberto rodando.');\nconsole.log('Quando o tipo é mesmo desconhecido, o certo é `unknown` (tema 02).');",
        "codigoJs": "const respostaSolta = {\n    nome: 'Ana',\n    pedidos: 3\n};\nconsole.log(respostaSolta.nome);\nconsole.log(respostaSolta.pedidoss);\nconsole.log('somando texto:', respostaSolta.nome * 2);\nconsole.log('\\nNenhuma das três linhas acima é acusada. `any` desliga o TypeScript naquele');\nconsole.log('valor E em tudo que sai dele — o erro volta a ser descoberto rodando.');\nconsole.log('Quando o tipo é mesmo desconhecido, o certo é `unknown` (tema 02).');\n"
       }
      ],
      "resumo": [
       "A maior parte do tipo vem de graça: escreveu o valor, o TypeScript deduziu.",
       "Anote onde não há valor de onde deduzir: parâmetro, lista vazia, variável que nasce nula.",
       "Anotar o retorno é opcional, mas trava a intenção da função.",
       "`const x = 'pix'` guarda o literal; `let` alarga para `string`.",
       "Anotação em cima de literal é repetição — mas é ela que recusa a chave a mais.",
       "`any` não descreve: desliga. Prefira `unknown` e confira antes de usar."
      ]
     },
     {
      "slug": "03-tsconfig-e-strict",
      "arquivo": "typescript/src/01-primeiros-passos/03-tsconfig-e-strict.ts",
      "comando": "node src/01-primeiros-passos/03-tsconfig-e-strict.ts",
      "titulo": "tsconfig e o modo strict",
      "sessao": 1,
      "oQueE": "o arquivo que diz ao compilador quais regras valer e para qual JavaScript gerar. `strict: true` é a linha que liga as conferências que importam.",
      "quandoUsar": "sempre, e com `strict` ligado desde o primeiro dia do projeto.",
      "quandoNaoUsar": "nunca desligue `strict` inteiro para calar um erro. Se precisar de folga em código antigo, desligue UMA regra e deixe anotado por quê.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O tsconfig deste curso, comentado",
        "secao": "ESSENCIAL",
        "codigo": "const configuracao = [\n  ['noEmit', 'true', 'só confere; quem roda é o `node arquivo.ts`'],\n  ['target', 'ES2022', 'até onde pode ir a sintaxe moderna gerada'],\n  ['lib', 'ES2022, DOM', 'o que já existe pronto (Array, Promise, console)'],\n  ['strict', 'true', 'liga as conferências de verdade — veja o bloco 2'],\n  ['moduleDetection', 'force', 'cada arquivo com escopo próprio, sem nomes brigando'],\n  ['skipLibCheck', 'true', 'não conferir os .d.ts de dentro do node_modules'],\n];\n\nconst largura = [18, 14, 50];\nconst linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');\nconsole.log(linha(['OPÇÃO', 'VALOR', 'PARA QUÊ']));\nconsole.log(linha(['─'.repeat(16), '─'.repeat(12), '─'.repeat(48)]));\nfor (const c of configuracao) console.log(linha(c));\n\nconsole.log('\\nO arquivo fica na raiz do curso: typescript/tsconfig.json.');\nconsole.log('Para criar um do zero num projeto novo: npx tsc --init');",
        "codigoJs": "const configuracao = [\n    [\n        'noEmit',\n        'true',\n        'só confere; quem roda é o `node arquivo.ts`'\n    ],\n    [\n        'target',\n        'ES2022',\n        'até onde pode ir a sintaxe moderna gerada'\n    ],\n    [\n        'lib',\n        'ES2022, DOM',\n        'o que já existe pronto (Array, Promise, console)'\n    ],\n    [\n        'strict',\n        'true',\n        'liga as conferências de verdade — veja o bloco 2'\n    ],\n    [\n        'moduleDetection',\n        'force',\n        'cada arquivo com escopo próprio, sem nomes brigando'\n    ],\n    [\n        'skipLibCheck',\n        'true',\n        'não conferir os .d.ts de dentro do node_modules'\n    ]\n];\nconst largura = [\n    18,\n    14,\n    50\n];\nconst linha = (colunas)=>colunas.map((c, i)=>c.padEnd(largura[i])).join('');\nconsole.log(linha([\n    'OPÇÃO',\n    'VALOR',\n    'PARA QUÊ'\n]));\nconsole.log(linha([\n    '─'.repeat(16),\n    '─'.repeat(12),\n    '─'.repeat(48)\n]));\nfor (const c of configuracao)console.log(linha(c));\nconsole.log('\\nO arquivo fica na raiz do curso: typescript/tsconfig.json.');\nconsole.log('Para criar um do zero num projeto novo: npx tsc --init');\n"
       },
       {
        "n": 2,
        "titulo": "O que `strict: true` liga",
        "secao": "ESSENCIAL",
        "codigo": "// Ele não é uma regra: é o interruptor de um grupo. Estas são as três que você sente.\nconst regras = [\n  ['strictNullChecks', 'null e undefined param de valer para tudo'],\n  ['noImplicitAny', 'parâmetro sem tipo vira erro, não `any` calado'],\n  ['strictPropertyInitialization', 'campo de classe tem que nascer com valor'],\n];\n\nfor (const [nome, efeito] of regras) console.log(`${nome.padEnd(30)} ${efeito}`);\n\nconsole.log('\\nSem strict, o TypeScript vira um corretor ortográfico: ele confere se o nome');\nconsole.log('da propriedade existe, e mais nada. É a diferença entre achar bug e não achar.');",
        "codigoJs": "const regras = [\n    [\n        'strictNullChecks',\n        'null e undefined param de valer para tudo'\n    ],\n    [\n        'noImplicitAny',\n        'parâmetro sem tipo vira erro, não `any` calado'\n    ],\n    [\n        'strictPropertyInitialization',\n        'campo de classe tem que nascer com valor'\n    ]\n];\nfor (const [nome, efeito] of regras)console.log(`${nome.padEnd(30)} ${efeito}`);\nconsole.log('\\nSem strict, o TypeScript vira um corretor ortográfico: ele confere se o nome');\nconsole.log('da propriedade existe, e mais nada. É a diferença entre achar bug e não achar.');\n"
       },
       {
        "n": 3,
        "titulo": "strictNullChecks na prática",
        "secao": "ESSENCIAL",
        "codigo": "// Um `find` pode não achar nada. Com strict, o TypeScript obriga a pensar nesse caso.\nconst catalogo = [{ sku: 'CAN-01', nome: 'Caneca' }, { sku: 'CAD-02', nome: 'Caderno' }];\nconst achado = catalogo.find((p) => p.sku === 'INEXISTENTE');\n\ntry {\n  // @ts-expect-error — 'achado' is possibly 'undefined'.\n  console.log('direto   :', achado.nome);\n} catch (erro) {\n  console.log('direto   :', (erro as Error).message, '← exatamente o que o strict evita');\n}\n\n// As duas saídas honestas: conferir antes, ou dar um padrão.\nif (achado) console.log('conferido:', achado.nome);\nelse console.log('conferido: produto não encontrado');\n\nconsole.log('com padrão:', achado?.nome ?? 'produto não encontrado');\n\nconsole.log('\\nSem strictNullChecks, `achado.nome` seria aceito e estouraria rodando.');\nconsole.log('É por essa regra sozinha que vale a pena ligar o strict.');",
        "codigoJs": "const catalogo = [\n    {\n        sku: 'CAN-01',\n        nome: 'Caneca'\n    },\n    {\n        sku: 'CAD-02',\n        nome: 'Caderno'\n    }\n];\nconst achado = catalogo.find((p)=>p.sku === 'INEXISTENTE');\ntry {\n    console.log('direto   :', achado.nome);\n} catch (erro) {\n    console.log('direto   :', erro.message, '← exatamente o que o strict evita');\n}\nif (achado) console.log('conferido:', achado.nome);\nelse console.log('conferido: produto não encontrado');\nconsole.log('com padrão:', achado?.nome ?? 'produto não encontrado');\nconsole.log('\\nSem strictNullChecks, `achado.nome` seria aceito e estouraria rodando.');\nconsole.log('É por essa regra sozinha que vale a pena ligar o strict.');\n"
       },
       {
        "n": 4,
        "titulo": "noImplicitAny: o parâmetro que ninguém tipou",
        "secao": "NA PRÁTICA",
        "codigo": "// Sem anotação e sem strict, `desconto` seria `any` — e `any` não é conferido.\nfunction aplicarDesconto(preco: number, percentual: number): number {\n  return preco - preco * (percentual / 100);\n}\n\nconsole.log('R$ 200 com 15%:', aplicarDesconto(200, 15).toFixed(2));\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\nconsole.log('R$ 200 com \"15\":', aplicarDesconto(200, '15').toFixed(2));\n\nconsole.log('\\nA função de callback herda o tipo do contexto e não precisa de anotação:');\nconst precos = [200, 350, 90];\nconsole.log('todos com 15%:', precos.map((p) => aplicarDesconto(p, 15).toFixed(2)).join(' · '));",
        "codigoJs": "function aplicarDesconto(preco, percentual) {\n    return preco - preco * (percentual / 100);\n}\nconsole.log('R$ 200 com 15%:', aplicarDesconto(200, 15).toFixed(2));\nconsole.log('R$ 200 com \"15\":', aplicarDesconto(200, '15').toFixed(2));\nconsole.log('\\nA função de callback herda o tipo do contexto e não precisa de anotação:');\nconst precos = [\n    200,\n    350,\n    90\n];\nconsole.log('todos com 15%:', precos.map((p)=>aplicarDesconto(p, 15).toFixed(2)).join(' · '));\n"
       },
       {
        "n": 5,
        "titulo": "Ligar o strict num projeto que já existe",
        "secao": "NA PRÁTICA",
        "codigo": "const passos = [\n  '1. Ligue `strict: true` e veja quantos erros aparecem (podem ser centenas).',\n  '2. Se for demais de uma vez, ligue uma regra por vez: strictNullChecks primeiro.',\n  '3. Conserte por arquivo, não por regra: um arquivo limpo é um arquivo confiável.',\n  '4. Nunca use `any` para calar o erro — use `unknown` e confira, ou tipe direito.',\n  '5. `// @ts-expect-error` com o motivo escrito ao lado é dívida assumida, e some sozinho',\n  '   quando o erro deixa de existir: o tsc avisa que a marcação virou mentira.',\n];\nfor (const p of passos) console.log(p);\n\n// A prova do item 5: esta linha não tem erro nenhum, e por isso a marcação seria acusada.\n// (Se você acrescentar um @ts-expect-error acima dela, o `npm run check` reclama.)\nconsole.log('\\n2 + 2 =', 2 + 2);",
        "codigoJs": "const passos = [\n    '1. Ligue `strict: true` e veja quantos erros aparecem (podem ser centenas).',\n    '2. Se for demais de uma vez, ligue uma regra por vez: strictNullChecks primeiro.',\n    '3. Conserte por arquivo, não por regra: um arquivo limpo é um arquivo confiável.',\n    '4. Nunca use `any` para calar o erro — use `unknown` e confira, ou tipe direito.',\n    '5. `// @ts-expect-error` com o motivo escrito ao lado é dívida assumida, e some sozinho',\n    '   quando o erro deixa de existir: o tsc avisa que a marcação virou mentira.'\n];\nfor (const p of passos)console.log(p);\nconsole.log('\\n2 + 2 =', 2 + 2);\n"
       },
       {
        "n": 6,
        "titulo": "`strict` não alcança o que vem de fora",
        "secao": "PEGADINHAS",
        "codigo": "const jsonDoServidor = '{\"nome\":\"Ana\",\"idade\":null}';\nconst usuario = JSON.parse(jsonDoServidor) as { nome: string; idade: number };\n\nconsole.log('o tipo promete: idade é number, nunca null');\nconsole.log('o servidor deu:', usuario.idade);\nconsole.log('idade * 2     :', usuario.idade * 2, '← 0, porque null * 2 é 0');\n\nconsole.log('\\n`JSON.parse` devolve `any`: o `as` é você assumindo a responsabilidade.');\nconsole.log('`strict` confere o código que você escreveu, não o dado que chega nele.');",
        "codigoJs": "const jsonDoServidor = '{\"nome\":\"Ana\",\"idade\":null}';\nconst usuario = JSON.parse(jsonDoServidor);\nconsole.log('o tipo promete: idade é number, nunca null');\nconsole.log('o servidor deu:', usuario.idade);\nconsole.log('idade * 2     :', usuario.idade * 2, '← 0, porque null * 2 é 0');\nconsole.log('\\n`JSON.parse` devolve `any`: o `as` é você assumindo a responsabilidade.');\nconsole.log('`strict` confere o código que você escreveu, não o dado que chega nele.');\n"
       }
      ],
      "resumo": [
       "`tsconfig.json` na raiz do projeto; `npx tsc --init` cria um comentado.",
       "`strict: true` desde o primeiro dia — é onde mora o valor do TypeScript.",
       "`strictNullChecks` é a regra que mais acha bug: obriga a tratar o \"não achou\".",
       "`noImplicitAny` fecha a porta por onde o dado errado entrava sem ninguém ver.",
       "Em projeto antigo, ligue regra por regra e conserte arquivo por arquivo.",
       "Nada disso confere dado de fora: JSON, formulário e fetch continuam por sua conta."
      ]
     }
    ]
   },
   {
    "slug": "02-tipos-basicos",
    "titulo": "Tipos Básicos",
    "icone": "▤",
    "cor": "#5ec8d8",
    "resumo": "Primitivo, array, tupla, objeto e os tipos especiais.",
    "topicos": [
     {
      "slug": "01-primitivos-e-array",
      "arquivo": "typescript/src/02-tipos-basicos/01-primitivos-e-array.ts",
      "comando": "node src/02-tipos-basicos/01-primitivos-e-array.ts",
      "titulo": "Primitivos e array",
      "sessao": 2,
      "oQueE": "os tipos que já existiam no JavaScript, agora com nome que o compilador entende: `string`, `number`, `boolean`, e a lista de qualquer um deles.",
      "quandoUsar": "em todo lugar. São o vocabulário básico de qualquer anotação.",
      "quandoNaoUsar": "com inicial maiúscula. `String`, `Number` e `Boolean` são os objetos embrulhados do JavaScript, quase nunca o que você quer.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Os três primitivos do dia a dia",
        "secao": "ESSENCIAL",
        "codigo": "const nomeDoCliente: string = 'Ana Souza';\nconst totalDaCompra: number = 249.9;\nconst pagamentoConfirmado: boolean = true;\n\nconsole.log(`${nomeDoCliente}: R$ ${totalDaCompra.toFixed(2)}`);\nconsole.log('pago:', pagamentoConfirmado ? 'sim' : 'não');\n\n// `number` cobre inteiro, decimal, negativo e até NaN — no JavaScript é tudo o mesmo tipo.\nconst parcelas: number = 3;\nconst valorDaParcela: number = totalDaCompra / parcelas;\nconsole.log(`${parcelas}x de R$ ${valorDaParcela.toFixed(2)}`);\n\n// @ts-expect-error — Type 'number' is not assignable to type 'string'.\nconst cepErrado: string = 30110012;\nconsole.log('cep, apesar do tsc:', cepErrado, typeof cepErrado);",
        "codigoJs": "const nomeDoCliente = 'Ana Souza';\nconst totalDaCompra = 249.9;\nconst pagamentoConfirmado = true;\nconsole.log(`${nomeDoCliente}: R$ ${totalDaCompra.toFixed(2)}`);\nconsole.log('pago:', pagamentoConfirmado ? 'sim' : 'não');\nconst parcelas = 3;\nconst valorDaParcela = totalDaCompra / parcelas;\nconsole.log(`${parcelas}x de R$ ${valorDaParcela.toFixed(2)}`);\nconst cepErrado = 30110012;\nconsole.log('cep, apesar do tsc:', cepErrado, typeof cepErrado);\n"
       },
       {
        "n": 2,
        "titulo": "Array: duas formas de escrever a mesma coisa",
        "secao": "ESSENCIAL",
        "codigo": "const produtos: string[] = ['Caneca', 'Caderno', 'Caneta'];\nconst precos: Array<number> = [19.9, 32.5, 4.2];\n\nconsole.log('produtos:', produtos.join(', '));\nconsole.log('mais caro:', Math.max(...precos).toFixed(2));\n\n// A vantagem aparece nos métodos: o TypeScript sabe o que sai de cada um.\nconst emCaixaAlta = produtos.map((p) => p.toUpperCase());     // string[]\nconst somaDosPrecos = precos.reduce((a, b) => a + b, 0);      // number\nconsole.log(emCaixaAlta.join(' · '), '|', somaDosPrecos.toFixed(2));\n\n// @ts-expect-error — Argument of type 'number' is not assignable to parameter of type 'string'.\nprodutos.push(42);\nconsole.log('mas o 42 entrou:', produtos.length, 'itens ← o tipo não vigia a execução');",
        "codigoJs": "const produtos = [\n    'Caneca',\n    'Caderno',\n    'Caneta'\n];\nconst precos = [\n    19.9,\n    32.5,\n    4.2\n];\nconsole.log('produtos:', produtos.join(', '));\nconsole.log('mais caro:', Math.max(...precos).toFixed(2));\nconst emCaixaAlta = produtos.map((p)=>p.toUpperCase());\nconst somaDosPrecos = precos.reduce((a, b)=>a + b, 0);\nconsole.log(emCaixaAlta.join(' · '), '|', somaDosPrecos.toFixed(2));\nprodutos.push(42);\nconsole.log('mas o 42 entrou:', produtos.length, 'itens ← o tipo não vigia a execução');\n"
       },
       {
        "n": 3,
        "titulo": "O tipo acompanha o que sai da lista",
        "secao": "ESSENCIAL",
        "codigo": "const notas: number[] = [8.5, 7, 9.2, 6.4];\n\nconst media = notas.reduce((soma, n) => soma + n, 0) / notas.length;\nconst aprovadas = notas.filter((n) => n >= 7);\nconst formatadas = notas.map((n) => n.toFixed(1));            // string[], não number[]\n\nconsole.log('média    :', media.toFixed(2));\nconsole.log('aprovadas:', aprovadas.length, 'de', notas.length);\nconsole.log('formatadas:', formatadas.join(' | '));\n\ntry {\n  // @ts-expect-error — Property 'toFixed' does not exist on type 'string'.\n  console.log(formatadas[0].toFixed(2));\n} catch (erro) {\n  console.log('toFixed  :', (erro as Error).message, '← já é string, não number');\n}\n\nconsole.log('\\n`map` trocou o tipo da lista, e o TypeScript acompanhou sem ninguém anotar.');\nconsole.log('É a inferência trabalhando dentro da cadeia de métodos.');",
        "codigoJs": "const notas = [\n    8.5,\n    7,\n    9.2,\n    6.4\n];\nconst media = notas.reduce((soma, n)=>soma + n, 0) / notas.length;\nconst aprovadas = notas.filter((n)=>n >= 7);\nconst formatadas = notas.map((n)=>n.toFixed(1));\nconsole.log('média    :', media.toFixed(2));\nconsole.log('aprovadas:', aprovadas.length, 'de', notas.length);\nconsole.log('formatadas:', formatadas.join(' | '));\ntry {\n    console.log(formatadas[0].toFixed(2));\n} catch (erro) {\n    console.log('toFixed  :', erro.message, '← já é string, não number');\n}\nconsole.log('\\n`map` trocou o tipo da lista, e o TypeScript acompanhou sem ninguém anotar.');\nconsole.log('É a inferência trabalhando dentro da cadeia de métodos.');\n"
       },
       {
        "n": 4,
        "titulo": "Lista de objetos, que é o caso real",
        "secao": "NA PRÁTICA",
        "codigo": "const vendas: { vendedor: string; valor: number }[] = [\n  { vendedor: 'Ana', valor: 1200 },\n  { vendedor: 'Bruno', valor: 890 },\n  { vendedor: 'Ana', valor: 430 },\n];\n\nconst porVendedor = new Map<string, number>();\nfor (const venda of vendas) porVendedor.set(venda.vendedor, (porVendedor.get(venda.vendedor) ?? 0) + venda.valor);\n\nfor (const [vendedor, total] of porVendedor) console.log(`${vendedor.padEnd(6)} R$ ${total.toFixed(2)}`);\n\n// @ts-expect-error — Property 'valorr' does not exist. Did you mean 'valor'?\nconsole.log(vendas[0].valorr);\n\nconsole.log('\\nO erro de digitação em `valorr` é o que o TypeScript mais pega no dia a dia.');\nconsole.log('Em JavaScript ele seria `undefined`, e o relatório sairia com NaN no total.');",
        "codigoJs": "const vendas = [\n    {\n        vendedor: 'Ana',\n        valor: 1200\n    },\n    {\n        vendedor: 'Bruno',\n        valor: 890\n    },\n    {\n        vendedor: 'Ana',\n        valor: 430\n    }\n];\nconst porVendedor = new Map();\nfor (const venda of vendas)porVendedor.set(venda.vendedor, (porVendedor.get(venda.vendedor) ?? 0) + venda.valor);\nfor (const [vendedor, total] of porVendedor)console.log(`${vendedor.padEnd(6)} R$ ${total.toFixed(2)}`);\nconsole.log(vendas[0].valorr);\nconsole.log('\\nO erro de digitação em `valorr` é o que o TypeScript mais pega no dia a dia.');\nconsole.log('Em JavaScript ele seria `undefined`, e o relatório sairia com NaN no total.');\n"
       },
       {
        "n": 5,
        "titulo": "`readonly`: lista que ninguém mexe",
        "secao": "NA PRÁTICA",
        "codigo": "const diasUteis: readonly string[] = ['seg', 'ter', 'qua', 'qui', 'sex'];\n\nconsole.log('dias:', diasUteis.join(' '));\nconsole.log('quantos:', diasUteis.length);\n\n// @ts-expect-error — Property 'push' does not exist on type 'readonly string[]'.\ndiasUteis.push('sáb');\n\n// Ler, contar e transformar continua tudo liberado — o que some é o que ALTERA a lista.\nconsole.log('em maiúsculas:', diasUteis.map((d) => d.toUpperCase()).join(' '));\nconsole.log('uma cópia mutável:', [...diasUteis, 'sáb'].join(' '));\n\nconsole.log('\\n`readonly` só existe para o compilador: rodando, é um array normal. Ele serve');\nconsole.log('para dizer \"esta lista é a fonte, não o rascunho\" — e o editor cobra.');",
        "codigoJs": "const diasUteis = [\n    'seg',\n    'ter',\n    'qua',\n    'qui',\n    'sex'\n];\nconsole.log('dias:', diasUteis.join(' '));\nconsole.log('quantos:', diasUteis.length);\ndiasUteis.push('sáb');\nconsole.log('em maiúsculas:', diasUteis.map((d)=>d.toUpperCase()).join(' '));\nconsole.log('uma cópia mutável:', [\n    ...diasUteis,\n    'sáb'\n].join(' '));\nconsole.log('\\n`readonly` só existe para o compilador: rodando, é um array normal. Ele serve');\nconsole.log('para dizer \"esta lista é a fonte, não o rascunho\" — e o editor cobra.');\n"
       },
       {
        "n": 6,
        "titulo": "`string` e `String` não são a mesma coisa",
        "secao": "PEGADINHAS",
        "codigo": "const texto: string = 'pix';\nconst objetoTexto: String = new String('pix');       // com maiúscula: o objeto embrulhado\n\nconsole.log('typeof texto      :', typeof texto);\nconsole.log('typeof objetoTexto:', typeof objetoTexto, '← \"object\", não \"string\"');\nconsole.log('são iguais com == :', texto == objetoTexto);\nconsole.log('são iguais com ===:', texto === objetoTexto, '← aqui a diferença aparece');\n\n// @ts-expect-error — Type 'String' is not assignable to type 'string'.\nconst aceita: string = objetoTexto;\nconsole.log('e mesmo assim roda:', aceita.toUpperCase());\n\nconsole.log('\\nSempre minúsculo: string, number, boolean. As versões maiúsculas existem por');\nconsole.log('herança do JavaScript e só causam confusão — não há motivo para escrevê-las.');",
        "codigoJs": "const texto = 'pix';\nconst objetoTexto = new String('pix');\nconsole.log('typeof texto      :', typeof texto);\nconsole.log('typeof objetoTexto:', typeof objetoTexto, '← \"object\", não \"string\"');\nconsole.log('são iguais com == :', texto == objetoTexto);\nconsole.log('são iguais com ===:', texto === objetoTexto, '← aqui a diferença aparece');\nconst aceita = objetoTexto;\nconsole.log('e mesmo assim roda:', aceita.toUpperCase());\nconsole.log('\\nSempre minúsculo: string, number, boolean. As versões maiúsculas existem por');\nconsole.log('herança do JavaScript e só causam confusão — não há motivo para escrevê-las.');\n"
       }
      ],
      "resumo": [
       "`string`, `number` e `boolean` em minúsculas; as maiúsculas são outra coisa.",
       "`number` é um tipo só: inteiro, decimal e negativo entram todos nele.",
       "`string[]` e `Array<string>` são idênticos — escolha um estilo e mantenha.",
       "Em cadeia de métodos o tipo acompanha sozinho: `map` de number pode devolver string[].",
       "A pegada mais frequente do TypeScript é o nome de propriedade digitado errado.",
       "`readonly string[]` some rodando: é um contrato de leitura, não uma trava de verdade."
      ]
     },
     {
      "slug": "02-tupla-e-objeto",
      "arquivo": "typescript/src/02-tipos-basicos/02-tupla-e-objeto.ts",
      "comando": "node src/02-tipos-basicos/02-tupla-e-objeto.ts",
      "titulo": "Tupla e tipo de objeto",
      "sessao": 2,
      "oQueE": "tupla é um array de tamanho fixo em que cada posição tem o seu próprio tipo; tipo de objeto é a descrição das chaves que um objeto precisa ter.",
      "quandoUsar": "tupla quando a posição significa alguma coisa (coordenada, par chave/valor, retorno de `useState`). Objeto para o resto.",
      "quandoNaoUsar": "tupla com mais de três posições. Ninguém lembra o que é o índice 4 — ali um objeto com nomes vale muito mais.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Tupla: a posição tem significado",
        "secao": "ESSENCIAL",
        "codigo": "const coordenada: [number, number] = [-19.92, -43.94];\nconst parChaveValor: [string, number] = ['estoque', 12];\n\nconsole.log(`lat ${coordenada[0]}, lon ${coordenada[1]}`);\nconsole.log(`${parChaveValor[0]} = ${parChaveValor[1]}`);\n\n// Cada posição carrega o seu tipo — e o TypeScript sabe qual é qual.\nconsole.log('arredondada:', coordenada[0].toFixed(1));\nconsole.log('em maiúscula:', parChaveValor[0].toUpperCase());\n\n// @ts-expect-error — Type 'string' is not assignable to type 'number'.\nconst trocada: [string, number] = ['estoque', 'doze'];\nconsole.log('rodando, a tupla é só um array:', Array.isArray(trocada), trocada.length);",
        "codigoJs": "const coordenada = [\n    -19.92,\n    -43.94\n];\nconst parChaveValor = [\n    'estoque',\n    12\n];\nconsole.log(`lat ${coordenada[0]}, lon ${coordenada[1]}`);\nconsole.log(`${parChaveValor[0]} = ${parChaveValor[1]}`);\nconsole.log('arredondada:', coordenada[0].toFixed(1));\nconsole.log('em maiúscula:', parChaveValor[0].toUpperCase());\nconst trocada = [\n    'estoque',\n    'doze'\n];\nconsole.log('rodando, a tupla é só um array:', Array.isArray(trocada), trocada.length);\n"
       },
       {
        "n": 2,
        "titulo": "Tipo de objeto: as chaves e o que cabe em cada uma",
        "secao": "ESSENCIAL",
        "codigo": "const cliente: { nome: string; email: string; ativo: boolean } = {\n  nome: 'Ana Souza',\n  email: 'ana@loja.dev',\n  ativo: true,\n};\n\nconsole.log(`${cliente.nome} <${cliente.email}> — ${cliente.ativo ? 'ativo' : 'inativo'}`);\n\n// Faltar chave é erro, e sobrar chave também.\n// @ts-expect-error — Property 'email' is missing.\nconst incompleto: { nome: string; email: string } = { nome: 'Bruno' };\nconsole.log('mesmo assim roda:', JSON.stringify(incompleto));\n\n// @ts-expect-error — Object literal may only specify known properties.\nconst comExtra: { nome: string } = { nome: 'Bruno', telefone: '81 99999-0000' };\nconsole.log('e este também   :', JSON.stringify(comExtra));",
        "codigoJs": "const cliente = {\n    nome: 'Ana Souza',\n    email: 'ana@loja.dev',\n    ativo: true\n};\nconsole.log(`${cliente.nome} <${cliente.email}> — ${cliente.ativo ? 'ativo' : 'inativo'}`);\nconst incompleto = {\n    nome: 'Bruno'\n};\nconsole.log('mesmo assim roda:', JSON.stringify(incompleto));\nconst comExtra = {\n    nome: 'Bruno',\n    telefone: '81 99999-0000'\n};\nconsole.log('e este também   :', JSON.stringify(comExtra));\n"
       },
       {
        "n": 3,
        "titulo": "Chave opcional e chave só de leitura",
        "secao": "ESSENCIAL",
        "codigo": "const pedido: { id: number; readonly criadoEm: string; observacao?: string } = {\n  id: 1042,\n  criadoEm: '2026-08-28',\n};\n\nconsole.log(`pedido ${pedido.id} de ${pedido.criadoEm}`);\nconsole.log('observação:', pedido.observacao ?? '(nenhuma)');\n\npedido.observacao = 'entregar na portaria';          // opcional pode ser preenchido depois\nconsole.log('observação:', pedido.observacao);\n\n// @ts-expect-error — Cannot assign to 'criadoEm' because it is a read-only property.\npedido.criadoEm = '2020-01-01';\nconsole.log('mas mudou rodando:', pedido.criadoEm, '← readonly é só para o compilador');\n\nconsole.log('\\n`?` faz a chave poder faltar, e o tipo dela vira `string | undefined`.');\nconsole.log('Por isso o `??` acima não é frescura: sem ele, o texto sairia \"undefined\".');",
        "codigoJs": "const pedido = {\n    id: 1042,\n    criadoEm: '2026-08-28'\n};\nconsole.log(`pedido ${pedido.id} de ${pedido.criadoEm}`);\nconsole.log('observação:', pedido.observacao ?? '(nenhuma)');\npedido.observacao = 'entregar na portaria';\nconsole.log('observação:', pedido.observacao);\npedido.criadoEm = '2020-01-01';\nconsole.log('mas mudou rodando:', pedido.criadoEm, '← readonly é só para o compilador');\nconsole.log('\\n`?` faz a chave poder faltar, e o tipo dela vira `string | undefined`.');\nconsole.log('Por isso o `??` acima não é frescura: sem ele, o texto sairia \"undefined\".');\n"
       },
       {
        "n": 4,
        "titulo": "Tupla no retorno: dois valores de uma vez",
        "secao": "NA PRÁTICA",
        "codigo": "// O padrão do `useState` do React e do `[erro, dado]` de várias bibliotecas.\nfunction dividir(a: number, b: number): [number | null, string | null] {\n  if (b === 0) return [null, 'divisão por zero'];\n  return [a / b, null];\n}\n\nconst [resultado, erro] = dividir(10, 4);\nconsole.log('10 / 4 =', resultado, '| erro:', erro);\n\nconst [semResultado, comErro] = dividir(10, 0);\nconsole.log('10 / 0 =', semResultado, '| erro:', comErro);\n\n// A desestruturação é que dá nome às posições — sem ela a tupla fica ilegível.\nconsole.log('\\nRepare que o nome é escolhido por QUEM CHAMA. É a diferença para o objeto,');\nconsole.log('onde o nome vem de quem escreveu a função. Tupla é útil justamente por isso.');",
        "codigoJs": "function dividir(a, b) {\n    if (b === 0) return [\n        null,\n        'divisão por zero'\n    ];\n    return [\n        a / b,\n        null\n    ];\n}\nconst [resultado, erro] = dividir(10, 4);\nconsole.log('10 / 4 =', resultado, '| erro:', erro);\nconst [semResultado, comErro] = dividir(10, 0);\nconsole.log('10 / 0 =', semResultado, '| erro:', comErro);\nconsole.log('\\nRepare que o nome é escolhido por QUEM CHAMA. É a diferença para o objeto,');\nconsole.log('onde o nome vem de quem escreveu a função. Tupla é útil justamente por isso.');\n"
       },
       {
        "n": 5,
        "titulo": "Objeto aninhado, que é como o dado chega",
        "secao": "NA PRÁTICA",
        "codigo": "type Endereco = { cidade: string; uf: string };\ntype Funcionario = {\n  nome: string;\n  salario: number;\n  endereco: Endereco;\n  telefones: string[];\n};\n\nconst funcionario: Funcionario = {\n  nome: 'Carla Dias',\n  salario: 5400,\n  endereco: { cidade: 'Recife', uf: 'PE' },\n  telefones: ['81 3333-1111', '81 99999-2222'],\n};\n\nconsole.log(`${funcionario.nome} — ${funcionario.endereco.cidade}/${funcionario.endereco.uf}`);\nconsole.log('salário anual:', (funcionario.salario * 13).toFixed(2));\nconsole.log('contatos     :', funcionario.telefones.length);\n\n// O TypeScript acompanha a descida inteira: erra no fim da linha e ele acusa.\n// @ts-expect-error — Property 'estado' does not exist on type 'Endereco'.\nconsole.log(funcionario.endereco.estado);",
        "codigoJs": "const funcionario = {\n    nome: 'Carla Dias',\n    salario: 5400,\n    endereco: {\n        cidade: 'Recife',\n        uf: 'PE'\n    },\n    telefones: [\n        '81 3333-1111',\n        '81 99999-2222'\n    ]\n};\nconsole.log(`${funcionario.nome} — ${funcionario.endereco.cidade}/${funcionario.endereco.uf}`);\nconsole.log('salário anual:', (funcionario.salario * 13).toFixed(2));\nconsole.log('contatos     :', funcionario.telefones.length);\nconsole.log(funcionario.endereco.estado);\n"
       },
       {
        "n": 6,
        "titulo": "Tupla com resto: o primeiro é especial",
        "secao": "NA PRÁTICA",
        "codigo": "type LinhaDoCsv = [string, ...number[]];             // o rótulo, e depois quantos números vierem\n\nconst janeiro: LinhaDoCsv = ['Janeiro', 1200, 890, 430];\nconst fevereiro: LinhaDoCsv = ['Fevereiro', 980];\n\nconst somar = ([rotulo, ...valores]: LinhaDoCsv) =>\n  `${rotulo.padEnd(10)} ${valores.length} vendas · R$ ${valores.reduce((a, b) => a + b, 0).toFixed(2)}`;\n\nconsole.log(somar(janeiro));\nconsole.log(somar(fevereiro));\n\n// @ts-expect-error — Type 'string' is not assignable to type 'number'.\nconst quebrada: LinhaDoCsv = ['Março', '1200'];\nconsole.log('quebrada:', quebrada.join(','));",
        "codigoJs": "const janeiro = [\n    'Janeiro',\n    1200,\n    890,\n    430\n];\nconst fevereiro = [\n    'Fevereiro',\n    980\n];\nconst somar = ([rotulo, ...valores])=>`${rotulo.padEnd(10)} ${valores.length} vendas · R$ ${valores.reduce((a, b)=>a + b, 0).toFixed(2)}`;\nconsole.log(somar(janeiro));\nconsole.log(somar(fevereiro));\nconst quebrada = [\n    'Março',\n    '1200'\n];\nconsole.log('quebrada:', quebrada.join(','));\n"
       },
       {
        "n": 7,
        "titulo": "A tupla não se defende do `push`",
        "secao": "PEGADINHAS",
        "codigo": "const par: [string, number] = ['estoque', 12];\n\npar.push('sobrando');                                 // o tsc deixa passar: push aceita a união\nconsole.log('tamanho depois do push:', par.length, JSON.stringify(par));\n\n// @ts-expect-error — Tuple type '[string, number]' of length '2' has no element at index '2'.\nconsole.log('lendo o índice 2:', par[2]);\n\nconsole.log('\\nA proteção da tupla vale na hora de criar e na hora de ler por índice.');\nconsole.log('`push`, `pop` e `splice` escapam — se a lista precisa mesmo ser fixa, use');\nconsole.log('`readonly [string, number]`, que tira esses métodos do tipo.');",
        "codigoJs": "const par = [\n    'estoque',\n    12\n];\npar.push('sobrando');\nconsole.log('tamanho depois do push:', par.length, JSON.stringify(par));\nconsole.log('lendo o índice 2:', par[2]);\nconsole.log('\\nA proteção da tupla vale na hora de criar e na hora de ler por índice.');\nconsole.log('`push`, `pop` e `splice` escapam — se a lista precisa mesmo ser fixa, use');\nconsole.log('`readonly [string, number]`, que tira esses métodos do tipo.');\n"
       }
      ],
      "resumo": [
       "Tupla é array de tamanho fixo com um tipo por posição: `[number, number]`.",
       "Use tupla quando a posição significa algo, e no máximo até três posições.",
       "Tipo de objeto cobra as chaves que faltam e recusa as que sobram.",
       "`?` deixa a chave faltar (e acrescenta `undefined` ao tipo); `readonly` proíbe atribuir.",
       "`readonly` e o tamanho da tupla somem na execução: são contratos, não travas.",
       "`push` fura a tupla — `readonly [A, B]` fecha esse buraco."
      ]
     },
     {
      "slug": "03-any-unknown-void-never",
      "arquivo": "typescript/src/02-tipos-basicos/03-any-unknown-void-never.ts",
      "comando": "node src/02-tipos-basicos/03-any-unknown-void-never.ts",
      "titulo": "any, unknown, void e never",
      "sessao": 2,
      "oQueE": "os quatro tipos que não descrevem um valor comum. `any` desliga a conferência, `unknown` a adia, `void` diz \"não devolve nada\" e `never` diz \"não volta\".",
      "quandoUsar": "`unknown` para tudo que chega de fora; `void` no retorno de função que só faz efeito; `never` para provar que um caso foi esquecido.",
      "quandoNaoUsar": "`any`. Ele é a saída de emergência, e quase sempre existe alternativa.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`any` desliga tudo; `unknown` obriga a conferir",
        "secao": "ESSENCIAL",
        "codigo": "const dadoComAny: any = 'R$ 250,00';\nconst dadoComUnknown: unknown = 'R$ 250,00';\n\nconsole.log('com any     :', dadoComAny.toUpperCase());        // passa, e podia ser qualquer coisa\nconsole.log('com any     :', dadoComAny.metodoQueNaoExiste);   // o tsc também não pia aqui\n\n// @ts-expect-error — 'dadoComUnknown' is of type 'unknown'.\nconsole.log(dadoComUnknown.toUpperCase());\n\n// Com `unknown`, o caminho é conferir primeiro. Aí o tipo estreita e o método libera.\nif (typeof dadoComUnknown === 'string') console.log('com unknown :', dadoComUnknown.toUpperCase());\n\nconsole.log('\\nOs dois aceitam qualquer valor na entrada. A diferença é na SAÍDA: `any` sai');\nconsole.log('de graça e contamina tudo à frente; `unknown` só sai depois de provar o que é.');",
        "codigoJs": "const dadoComAny = 'R$ 250,00';\nconst dadoComUnknown = 'R$ 250,00';\nconsole.log('com any     :', dadoComAny.toUpperCase());\nconsole.log('com any     :', dadoComAny.metodoQueNaoExiste);\nconsole.log(dadoComUnknown.toUpperCase());\nif (typeof dadoComUnknown === 'string') console.log('com unknown :', dadoComUnknown.toUpperCase());\nconsole.log('\\nOs dois aceitam qualquer valor na entrada. A diferença é na SAÍDA: `any` sai');\nconsole.log('de graça e contamina tudo à frente; `unknown` só sai depois de provar o que é.');\n"
       },
       {
        "n": 2,
        "titulo": "`void`: a função existe pelo efeito, não pelo resultado",
        "secao": "ESSENCIAL",
        "codigo": "function registrarLog(mensagem: string): void {\n  console.log(`[log] ${new Date('2026-08-28T10:00:00Z').toISOString().slice(0, 10)} ${mensagem}`);\n}\n\nregistrarLog('pedido 1042 confirmado');\nregistrarLog('estoque atualizado');\n\n// O que ela devolve é `undefined`, e o tipo `void` diz \"não conte com isso\".\nconst retorno = registrarLog('nada aqui');\nconsole.log('typeof do retorno:', typeof retorno);\n\ntry {\n  // @ts-expect-error — Property 'length' does not exist on type 'void'.\n  console.log(retorno.length);\n} catch (erro) {\n  console.log('retorno.length   :', (erro as Error).message);\n}\n\nconsole.log('\\n`void` não é `undefined`: é \"não olhe para o retorno\". A diferença aparece');\nconsole.log('no bloco 4, onde um callback `void` pode devolver valor sem ninguém reclamar.');",
        "codigoJs": "function registrarLog(mensagem) {\n    console.log(`[log] ${new Date('2026-08-28T10:00:00Z').toISOString().slice(0, 10)} ${mensagem}`);\n}\nregistrarLog('pedido 1042 confirmado');\nregistrarLog('estoque atualizado');\nconst retorno = registrarLog('nada aqui');\nconsole.log('typeof do retorno:', typeof retorno);\ntry {\n    console.log(retorno.length);\n} catch (erro) {\n    console.log('retorno.length   :', erro.message);\n}\nconsole.log('\\n`void` não é `undefined`: é \"não olhe para o retorno\". A diferença aparece');\nconsole.log('no bloco 4, onde um callback `void` pode devolver valor sem ninguém reclamar.');\n"
       },
       {
        "n": 3,
        "titulo": "`never`: a função não chega a voltar",
        "secao": "ESSENCIAL",
        "codigo": "function falhar(motivo: string): never {\n  throw new Error(motivo);\n}\n\nfunction buscarPreco(tabela: Record<string, number>, sku: string): number {\n  const preco = tabela[sku];\n  if (preco === undefined) falhar(`sku ${sku} não está na tabela`);\n  return preco;\n}\n\nconst tabela = { 'CAN-01': 19.9, 'CAD-02': 32.5 };\nconsole.log('CAN-01:', buscarPreco(tabela, 'CAN-01').toFixed(2));\n\ntry {\n  buscarPreco(tabela, 'XXX-99');\n} catch (erro) {\n  console.log('XXX-99:', (erro as Error).message);\n}\n\nconsole.log('\\nRepare no `return preco` da última linha: o TypeScript sabe que, se passou do');\nconsole.log('`falhar()`, o preço não era undefined. `never` é o que dá essa certeza a ele.');",
        "codigoJs": "function falhar(motivo) {\n    throw new Error(motivo);\n}\nfunction buscarPreco(tabela, sku) {\n    const preco = tabela[sku];\n    if (preco === undefined) falhar(`sku ${sku} não está na tabela`);\n    return preco;\n}\nconst tabela = {\n    'CAN-01': 19.9,\n    'CAD-02': 32.5\n};\nconsole.log('CAN-01:', buscarPreco(tabela, 'CAN-01').toFixed(2));\ntry {\n    buscarPreco(tabela, 'XXX-99');\n} catch (erro) {\n    console.log('XXX-99:', erro.message);\n}\nconsole.log('\\nRepare no `return preco` da última linha: o TypeScript sabe que, se passou do');\nconsole.log('`falhar()`, o preço não era undefined. `never` é o que dá essa certeza a ele.');\n"
       },
       {
        "n": 4,
        "titulo": "`unknown` na porta de entrada",
        "secao": "NA PRÁTICA",
        "codigo": "// Todo dado que vem de fora nasce como `unknown` — e é isso que força a validação.\nfunction lerTotalDoPedido(corpo: unknown): number {\n  if (typeof corpo !== 'object' || corpo === null) throw new Error('corpo não é um objeto');\n  if (!('total' in corpo)) throw new Error('falta o campo total');\n\n  const total = (corpo as { total: unknown }).total;\n  if (typeof total !== 'number' || Number.isNaN(total)) throw new Error('total não é um número');\n  return total;\n}\n\nconst casos: unknown[] = [{ total: 249.9 }, { total: '249,90' }, { valor: 10 }, null];\nfor (const caso of casos) {\n  try {\n    console.log(JSON.stringify(caso).padEnd(22), '→ R$', lerTotalDoPedido(caso).toFixed(2));\n  } catch (erro) {\n    console.log(JSON.stringify(caso).padEnd(22), '→ ✕', (erro as Error).message);\n  }\n}\n\nconsole.log('\\nSe o parâmetro fosse `any`, as quatro linhas passariam e três quebrariam mais');\nconsole.log('adiante, longe daqui. `unknown` traz o erro para a porta de entrada.');",
        "codigoJs": "function lerTotalDoPedido(corpo) {\n    if (typeof corpo !== 'object' || corpo === null) throw new Error('corpo não é um objeto');\n    if (!('total' in corpo)) throw new Error('falta o campo total');\n    const total = corpo.total;\n    if (typeof total !== 'number' || Number.isNaN(total)) throw new Error('total não é um número');\n    return total;\n}\nconst casos = [\n    {\n        total: 249.9\n    },\n    {\n        total: '249,90'\n    },\n    {\n        valor: 10\n    },\n    null\n];\nfor (const caso of casos){\n    try {\n        console.log(JSON.stringify(caso).padEnd(22), '→ R$', lerTotalDoPedido(caso).toFixed(2));\n    } catch (erro) {\n        console.log(JSON.stringify(caso).padEnd(22), '→ ✕', erro.message);\n    }\n}\nconsole.log('\\nSe o parâmetro fosse `any`, as quatro linhas passariam e três quebrariam mais');\nconsole.log('adiante, longe daqui. `unknown` traz o erro para a porta de entrada.');\n"
       },
       {
        "n": 5,
        "titulo": "`never` para não esquecer um caso",
        "secao": "NA PRÁTICA",
        "codigo": "type FormaDePagamento = 'pix' | 'boleto' | 'cartao';\n\nfunction prazoDeCompensacao(forma: FormaDePagamento): string {\n  switch (forma) {\n    case 'pix': return 'na hora';\n    case 'boleto': return 'até 3 dias úteis';\n    case 'cartao': return 'até 30 dias';\n    default: {\n      // Se um dia entrar 'pix-parcelado' na união e ninguém tratar aqui, esta linha para\n      // de compilar: o caso que sobrou não é `never`, é o valor esquecido.\n      const naoTratado: never = forma;\n      throw new Error(`forma não tratada: ${naoTratado}`);\n    }\n  }\n}\n\nfor (const forma of ['pix', 'boleto', 'cartao'] as FormaDePagamento[])\n  console.log(forma.padEnd(8), prazoDeCompensacao(forma));\n\nconsole.log('\\nÉ o truque mais útil do `never`: transformar \"esqueci um caso\" em erro de');\nconsole.log('compilação, em vez de um `undefined` silencioso em produção.');",
        "codigoJs": "function prazoDeCompensacao(forma) {\n    switch(forma){\n        case 'pix':\n            return 'na hora';\n        case 'boleto':\n            return 'até 3 dias úteis';\n        case 'cartao':\n            return 'até 30 dias';\n        default:\n            {\n                const naoTratado = forma;\n                throw new Error(`forma não tratada: ${naoTratado}`);\n            }\n    }\n}\nfor (const forma of [\n    'pix',\n    'boleto',\n    'cartao'\n])console.log(forma.padEnd(8), prazoDeCompensacao(forma));\nconsole.log('\\nÉ o truque mais útil do `never`: transformar \"esqueci um caso\" em erro de');\nconsole.log('compilação, em vez de um `undefined` silencioso em produção.');\n"
       },
       {
        "n": 6,
        "titulo": "`any` vaza para tudo que encosta nele",
        "secao": "PEGADINHAS",
        "codigo": "const configuracao: any = { tentativas: '3' };\n\nconst tentativas = configuracao.tentativas;          // any, não string\nconst dobro = tentativas * 2;                        // any, e ninguém conferiu\nconst lista = Array(dobro).fill('x');                // any de novo\n\nconsole.log('tentativas:', tentativas, typeof tentativas);\nconsole.log('dobro     :', dobro, '← \"3\" * 2 deu 6 por acaso; com \"3a\" daria NaN');\nconsole.log('lista     :', lista.length, 'itens');\n\nconsole.log('\\nUm `any` no começo apaga a conferência de toda a cadeia à frente. Por isso a');\nconsole.log('regra é: `unknown` na entrada, `any` só quando não houver mesmo outro jeito.');",
        "codigoJs": "const configuracao = {\n    tentativas: '3'\n};\nconst tentativas = configuracao.tentativas;\nconst dobro = tentativas * 2;\nconst lista = Array(dobro).fill('x');\nconsole.log('tentativas:', tentativas, typeof tentativas);\nconsole.log('dobro     :', dobro, '← \"3\" * 2 deu 6 por acaso; com \"3a\" daria NaN');\nconsole.log('lista     :', lista.length, 'itens');\nconsole.log('\\nUm `any` no começo apaga a conferência de toda a cadeia à frente. Por isso a');\nconsole.log('regra é: `unknown` na entrada, `any` só quando não houver mesmo outro jeito.');\n"
       }
      ],
      "resumo": [
       "`any` desliga a conferência e contamina tudo que sai dele — evite.",
       "`unknown` aceita qualquer valor na entrada e não deixa usar sem conferir na saída.",
       "`void` é o retorno de quem existe pelo efeito: log, envio, gravação.",
       "`never` é a função que não volta (lança ou trava) — e o tsc usa isso para raciocinar.",
       "`const x: never = valor` no `default` de um switch avisa quando um caso foi esquecido.",
       "Dado de fora entra como `unknown` e sai validado. É a porta, e ela vale a cerca inteira."
      ]
     },
     {
      "slug": "04-null-e-opcional",
      "arquivo": "typescript/src/02-tipos-basicos/04-null-e-opcional.ts",
      "comando": "node src/02-tipos-basicos/04-null-e-opcional.ts",
      "titulo": "null, undefined e opcional",
      "sessao": 2,
      "oQueE": "os dois jeitos de dizer \"não tem valor\" e o que o `strictNullChecks` cobra de você antes de deixar usar qualquer coisa que possa ser um deles.",
      "quandoUsar": "`undefined` para \"ainda não foi preenchido\"; `null` para \"foi preenchido com nada de propósito\" — é o que costuma vir do banco.",
      "quandoNaoUsar": "os dois no mesmo campo. Escolha um por projeto e seja consistente.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Com strict, `null` deixa de valer para tudo",
        "secao": "ESSENCIAL",
        "codigo": "// Vindo de uma função, o tipo é mesmo `string | null` — o valor só se descobre chamando.\nconst buscarApelido = (nome: string): string | null => (nome === 'Ana' ? 'Aninha' : null);\n\nconst apelido = buscarApelido('Bruno');\nconst telefone: string | undefined = undefined;\n\ntry {\n  // @ts-expect-error — 'apelido' is possibly 'null'.\n  console.log(apelido.toUpperCase());\n} catch (erro) {\n  console.log('sem conferir:', (erro as Error).message);\n}\n\n// Conferir é o que abre a porta: dentro do `if`, o tipo já é só `string`.\nif (apelido !== null) console.log('apelido:', apelido.toUpperCase());\nelse console.log('apelido: não informado');\n\nconsole.log('da Ana  :', buscarApelido('Ana')?.toUpperCase() ?? 'não informado');\nconsole.log('telefone:', telefone ?? 'não informado');\n\nconsole.log('\\nSem `strictNullChecks`, `null` e `undefined` caberiam em `string` e a primeira');\nconsole.log('linha passaria — para estourar rodando. É a regra que mais acha bug de verdade.');",
        "codigoJs": "const buscarApelido = (nome)=>nome === 'Ana' ? 'Aninha' : null;\nconst apelido = buscarApelido('Bruno');\nconst telefone = undefined;\ntry {\n    console.log(apelido.toUpperCase());\n} catch (erro) {\n    console.log('sem conferir:', erro.message);\n}\nif (apelido !== null) console.log('apelido:', apelido.toUpperCase());\nelse console.log('apelido: não informado');\nconsole.log('da Ana  :', buscarApelido('Ana')?.toUpperCase() ?? 'não informado');\nconsole.log('telefone:', telefone ?? 'não informado');\nconsole.log('\\nSem `strictNullChecks`, `null` e `undefined` caberiam em `string` e a primeira');\nconsole.log('linha passaria — para estourar rodando. É a regra que mais acha bug de verdade.');\n"
       },
       {
        "n": 2,
        "titulo": "`?.` e `??`: o caminho curto",
        "secao": "ESSENCIAL",
        "codigo": "type Assinante = { nome: string; plano?: { titulo: string; precoMensal: number } };\n\nconst comPlano: Assinante = { nome: 'Ana', plano: { titulo: 'Pro', precoMensal: 49.9 } };\nconst semPlano: Assinante = { nome: 'Bruno' };\n\n// `?.` para de descer assim que encontra null/undefined, e devolve undefined.\nconsole.log('Ana  :', comPlano.plano?.titulo ?? 'sem plano');\nconsole.log('Bruno:', semPlano.plano?.titulo ?? 'sem plano');\n\n// `??` só cai no padrão para null/undefined — diferente do `||`, que cai para 0 e ''.\nconst desconto = 0;\nconsole.log('com ?? :', desconto ?? 10, '← respeita o zero');\nconsole.log('com || :', desconto || 10, '← trocou o zero por 10, e o cliente perdeu o desconto');\n\nconsole.log('\\nA regra: `??` para valor ausente, `||` para valor \"falsy\". Em preço, quantidade');\nconsole.log('e texto de formulário, `||` costuma ser o bug.');",
        "codigoJs": "const comPlano = {\n    nome: 'Ana',\n    plano: {\n        titulo: 'Pro',\n        precoMensal: 49.9\n    }\n};\nconst semPlano = {\n    nome: 'Bruno'\n};\nconsole.log('Ana  :', comPlano.plano?.titulo ?? 'sem plano');\nconsole.log('Bruno:', semPlano.plano?.titulo ?? 'sem plano');\nconst desconto = 0;\nconsole.log('com ?? :', desconto ?? 10, '← respeita o zero');\nconsole.log('com || :', desconto || 10, '← trocou o zero por 10, e o cliente perdeu o desconto');\nconsole.log('\\nA regra: `??` para valor ausente, `||` para valor \"falsy\". Em preço, quantidade');\nconsole.log('e texto de formulário, `||` costuma ser o bug.');\n"
       },
       {
        "n": 3,
        "titulo": "`?` na propriedade e `?` no parâmetro",
        "secao": "ESSENCIAL",
        "codigo": "type Contato = { nome: string; email?: string };\n\nfunction formatarContato(contato: Contato, prefixo?: string): string {\n  const marca = prefixo ?? '·';\n  return `${marca} ${contato.nome}${contato.email ? ` <${contato.email}>` : ''}`;\n}\n\nconsole.log(formatarContato({ nome: 'Ana', email: 'ana@loja.dev' }));\nconsole.log(formatarContato({ nome: 'Bruno' }, '→'));\n\n// `email?: string` é o mesmo que `email: string | undefined`... quase. A diferença é que\n// o opcional deixa a chave FALTAR; a união obriga a escrevê-la, mesmo que como undefined.\ntype ContatoUniao = { nome: string; email: string | undefined };\n\n// @ts-expect-error — Property 'email' is missing in type '{ nome: string; }'.\nconst semEmail: ContatoUniao = { nome: 'Carla' };\nconsole.log('roda igual:', JSON.stringify(semEmail));\n\nconst comUndefined: ContatoUniao = { nome: 'Carla', email: undefined };\nconsole.log('a forma aceita:', JSON.stringify(comUndefined), '← email some do JSON');",
        "codigoJs": "function formatarContato(contato, prefixo) {\n    const marca = prefixo ?? '·';\n    return `${marca} ${contato.nome}${contato.email ? ` <${contato.email}>` : ''}`;\n}\nconsole.log(formatarContato({\n    nome: 'Ana',\n    email: 'ana@loja.dev'\n}));\nconsole.log(formatarContato({\n    nome: 'Bruno'\n}, '→'));\nconst semEmail = {\n    nome: 'Carla'\n};\nconsole.log('roda igual:', JSON.stringify(semEmail));\nconst comUndefined = {\n    nome: 'Carla',\n    email: undefined\n};\nconsole.log('a forma aceita:', JSON.stringify(comUndefined), '← email some do JSON');\n"
       },
       {
        "n": 4,
        "titulo": "O `find` que pode não achar",
        "secao": "NA PRÁTICA",
        "codigo": "const catalogo = [\n  { sku: 'CAN-01', nome: 'Caneca', preco: 19.9 },\n  { sku: 'CAD-02', nome: 'Caderno', preco: 32.5 },\n];\n\nfunction precoDoSku(sku: string): string {\n  const produto = catalogo.find((p) => p.sku === sku);\n  if (!produto) return `${sku}: não encontrado`;      // sem esta linha, o tsc não deixa seguir\n  return `${sku}: R$ ${produto.preco.toFixed(2)}`;\n}\n\nconsole.log(precoDoSku('CAN-01'));\nconsole.log(precoDoSku('XXX-99'));\n\n// O tipo de `find` é `T | undefined`, e é isso que força o tratamento.\nconst achado = catalogo.find((p) => p.preco > 100);\nconsole.log('acima de 100:', achado?.nome ?? 'nenhum');\n\nconsole.log('\\nO mesmo vale para `array[i]`, `Map.get`, `document.querySelector` e qualquer');\nconsole.log('busca. O \"não achou\" existe — o TypeScript só não deixa mais você fingir que não.');",
        "codigoJs": "const catalogo = [\n    {\n        sku: 'CAN-01',\n        nome: 'Caneca',\n        preco: 19.9\n    },\n    {\n        sku: 'CAD-02',\n        nome: 'Caderno',\n        preco: 32.5\n    }\n];\nfunction precoDoSku(sku) {\n    const produto = catalogo.find((p)=>p.sku === sku);\n    if (!produto) return `${sku}: não encontrado`;\n    return `${sku}: R$ ${produto.preco.toFixed(2)}`;\n}\nconsole.log(precoDoSku('CAN-01'));\nconsole.log(precoDoSku('XXX-99'));\nconst achado = catalogo.find((p)=>p.preco > 100);\nconsole.log('acima de 100:', achado?.nome ?? 'nenhum');\nconsole.log('\\nO mesmo vale para `array[i]`, `Map.get`, `document.querySelector` e qualquer');\nconsole.log('busca. O \"não achou\" existe — o TypeScript só não deixa mais você fingir que não.');\n"
       },
       {
        "n": 5,
        "titulo": "Do banco vem null; do formulário vem undefined",
        "secao": "NA PRÁTICA",
        "codigo": "type LinhaDoBanco = { id: number; nome: string; apelido: string | null };\ntype FormularioAberto = { nome: string; apelido?: string };\n\nconst doBanco: LinhaDoBanco = { id: 7, nome: 'Ana Souza', apelido: null };\nconst doFormulario: FormularioAberto = { nome: 'Bruno Lima' };\n\n// Um jeito só de tratar os dois: o `??` cobre null E undefined.\nconst comoChamar = (apelido: string | null | undefined, nome: string) => apelido ?? nome.split(' ')[0];\n\nconsole.log('banco     :', comoChamar(doBanco.apelido, doBanco.nome));\nconsole.log('formulário:', comoChamar(doFormulario.apelido, doFormulario.nome));\nconsole.log('com apelido:', comoChamar('Aninha', 'Ana Souza'));\n\nconsole.log('\\nMisturar os dois no mesmo campo é o que dá `if (x !== null && x !== undefined)`');\nconsole.log('espalhado pelo código. Escolha um na borda do sistema e converta ali mesmo.');",
        "codigoJs": "const doBanco = {\n    id: 7,\n    nome: 'Ana Souza',\n    apelido: null\n};\nconst doFormulario = {\n    nome: 'Bruno Lima'\n};\nconst comoChamar = (apelido, nome)=>apelido ?? nome.split(' ')[0];\nconsole.log('banco     :', comoChamar(doBanco.apelido, doBanco.nome));\nconsole.log('formulário:', comoChamar(doFormulario.apelido, doFormulario.nome));\nconsole.log('com apelido:', comoChamar('Aninha', 'Ana Souza'));\nconsole.log('\\nMisturar os dois no mesmo campo é o que dá `if (x !== null && x !== undefined)`');\nconsole.log('espalhado pelo código. Escolha um na borda do sistema e converta ali mesmo.');\n"
       },
       {
        "n": 6,
        "titulo": "`!` cala o compilador sem resolver nada",
        "secao": "PEGADINHAS",
        "codigo": "const usuarios = [{ nome: 'Ana' }, { nome: 'Bruno' }];\n\n// `!` é você afirmando \"eu sei que não é undefined\". O tsc acredita e para de conferir.\nconst primeiro = usuarios.find((u) => u.nome === 'Ana')!;\nconsole.log('achou      :', primeiro.nome);\n\nconst inexistente = usuarios.find((u) => u.nome === 'Carla')!;\ntry {\n  console.log('não achou  :', inexistente.nome);\n} catch (erro) {\n  console.log('não achou  :', (erro as Error).message, '← o `!` mentiu, e rodando não tem perdão');\n}\n\nconsole.log('\\n`!` não confere nada: apaga o aviso. Use quando você tem uma garantia que o');\nconsole.log('compilador não enxerga — e, mesmo aí, um `if` explícito envelhece melhor.');",
        "codigoJs": "const usuarios = [\n    {\n        nome: 'Ana'\n    },\n    {\n        nome: 'Bruno'\n    }\n];\nconst primeiro = usuarios.find((u)=>u.nome === 'Ana');\nconsole.log('achou      :', primeiro.nome);\nconst inexistente = usuarios.find((u)=>u.nome === 'Carla');\ntry {\n    console.log('não achou  :', inexistente.nome);\n} catch (erro) {\n    console.log('não achou  :', erro.message, '← o `!` mentiu, e rodando não tem perdão');\n}\nconsole.log('\\n`!` não confere nada: apaga o aviso. Use quando você tem uma garantia que o');\nconsole.log('compilador não enxerga — e, mesmo aí, um `if` explícito envelhece melhor.');\n"
       }
      ],
      "resumo": [
       "Com `strictNullChecks`, nada que possa ser null/undefined é usado sem conferir antes.",
       "`?.` para de descer no primeiro vazio; `??` dá o padrão só para null e undefined.",
       "`||` também cai para 0 e '' — em preço e quantidade, é onde nasce o bug.",
       "`email?: string` deixa a chave faltar; `email: string | undefined` obriga a escrevê-la.",
       "`find`, `Map.get` e `array[i]` podem não achar: o tipo diz isso, e agora você trata.",
       "`!` silencia o compilador sem mudar a realidade — prefira o `if`."
      ]
     }
    ]
   },
   {
    "slug": "03-montar-tipos",
    "titulo": "Montar Tipos",
    "icone": "⧉",
    "cor": "#f2c14e",
    "resumo": "Combinar tipos: união, literal, alias, interface e enum.",
    "topicos": [
     {
      "slug": "01-union-e-literais",
      "arquivo": "typescript/src/03-montar-tipos/01-union-e-literais.ts",
      "comando": "node src/03-montar-tipos/01-union-e-literais.ts",
      "titulo": "União e tipos literais",
      "sessao": 3,
      "oQueE": "união (`A | B`) é \"um ou outro\"; tipo literal é um valor específico virando tipo — `'pix'` não é `string`, é exatamente `'pix'`.",
      "quandoUsar": "sempre que um campo só aceita alguns valores fixos: status, forma de pagamento, tamanho, papel do usuário.",
      "quandoNaoUsar": "quando a lista de valores muda em tempo de execução (vem do banco). Aí o tipo não tem como saber, e o certo é validar rodando.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "União: um valor, mais de um tipo possível",
        "secao": "ESSENCIAL",
        "codigo": "function formatarIdentificador(id: number | string): string {\n  // Dentro do `if`, o TypeScript já sabe que é number; no `else`, que é string.\n  if (typeof id === 'number') return `#${id.toFixed(0).padStart(6, '0')}`;\n  return id.trim().toUpperCase();\n}\n\nconsole.log(formatarIdentificador(1042));\nconsole.log(formatarIdentificador('  ped-2026-a  '));\n\n// Fora do `if`, só vale o que EXISTE NOS DOIS lados da união.\nfunction tamanhoDoIdentificador(id: number | string): number {\n  return String(id).length;\n}\nconsole.log('tamanhos:', tamanhoDoIdentificador(1042), tamanhoDoIdentificador('ped-a'));\n\n// @ts-expect-error — Property 'toFixed' does not exist on type 'string | number'.\nconsole.log((1042 as number | string).toFixed(2));",
        "codigoJs": "function formatarIdentificador(id) {\n    if (typeof id === 'number') return `#${id.toFixed(0).padStart(6, '0')}`;\n    return id.trim().toUpperCase();\n}\nconsole.log(formatarIdentificador(1042));\nconsole.log(formatarIdentificador('  ped-2026-a  '));\nfunction tamanhoDoIdentificador(id) {\n    return String(id).length;\n}\nconsole.log('tamanhos:', tamanhoDoIdentificador(1042), tamanhoDoIdentificador('ped-a'));\nconsole.log(1042..toFixed(2));\n"
       },
       {
        "n": 2,
        "titulo": "Literal: o valor vira o tipo",
        "secao": "ESSENCIAL",
        "codigo": "type FormaDePagamento = 'pix' | 'boleto' | 'cartao';\n\nconst taxas: Record<FormaDePagamento, number> = { pix: 0, boleto: 2.5, cartao: 4.9 };\n\nfunction cobrar(valor: number, forma: FormaDePagamento): string {\n  return `${forma.padEnd(7)} R$ ${(valor + valor * (taxas[forma] / 100)).toFixed(2)}`;\n}\n\nconsole.log(cobrar(200, 'pix'));\nconsole.log(cobrar(200, 'cartao'));\n\n// @ts-expect-error — Argument of type '\"dinheiro\"' is not assignable to parameter of type 'FormaDePagamento'.\nconsole.log(cobrar(200, 'dinheiro'));\n\nconsole.log('\\nO editor completa as três opções sozinho, e o erro de digitação em \"cartão\"');\nconsole.log('com til nunca chega a rodar. É o uso mais rentável de tipo que existe.');",
        "codigoJs": "const taxas = {\n    pix: 0,\n    boleto: 2.5,\n    cartao: 4.9\n};\nfunction cobrar(valor, forma) {\n    return `${forma.padEnd(7)} R$ ${(valor + valor * (taxas[forma] / 100)).toFixed(2)}`;\n}\nconsole.log(cobrar(200, 'pix'));\nconsole.log(cobrar(200, 'cartao'));\nconsole.log(cobrar(200, 'dinheiro'));\nconsole.log('\\nO editor completa as três opções sozinho, e o erro de digitação em \"cartão\"');\nconsole.log('com til nunca chega a rodar. É o uso mais rentável de tipo que existe.');\n"
       },
       {
        "n": 3,
        "titulo": "`as const` congela o objeto em literais",
        "secao": "ESSENCIAL",
        "codigo": "const configuracaoSolta = { ambiente: 'producao', tentativas: 3 };\nconst configuracaoFixa = { ambiente: 'producao', tentativas: 3 } as const;\n\nconsole.log('solta:', configuracaoSolta.ambiente, '| fixa:', configuracaoFixa.ambiente);\n\nconfiguracaoSolta.ambiente = 'homologacao';        // string aceita qualquer string\nconsole.log('mudou :', configuracaoSolta.ambiente);\n\n// @ts-expect-error — Cannot assign to 'ambiente' because it is a read-only property.\nconfiguracaoFixa.ambiente = 'homologacao';\n\n// A utilidade real: virar uma união sem escrever a lista duas vezes.\nconst AMBIENTES = ['local', 'homologacao', 'producao'] as const;\ntype Ambiente = (typeof AMBIENTES)[number];        // 'local' | 'homologacao' | 'producao'\n\nconst atual: Ambiente = 'homologacao';\nconsole.log('ambientes:', AMBIENTES.join(' · '), '| atual:', atual);\n\n// @ts-expect-error — Type '\"testes\"' is not assignable to type 'Ambiente'.\nconst invalido: Ambiente = 'testes';\nconsole.log('e rodando entra qualquer um:', invalido);",
        "codigoJs": "const configuracaoSolta = {\n    ambiente: 'producao',\n    tentativas: 3\n};\nconst configuracaoFixa = {\n    ambiente: 'producao',\n    tentativas: 3\n};\nconsole.log('solta:', configuracaoSolta.ambiente, '| fixa:', configuracaoFixa.ambiente);\nconfiguracaoSolta.ambiente = 'homologacao';\nconsole.log('mudou :', configuracaoSolta.ambiente);\nconfiguracaoFixa.ambiente = 'homologacao';\nconst AMBIENTES = [\n    'local',\n    'homologacao',\n    'producao'\n];\nconst atual = 'homologacao';\nconsole.log('ambientes:', AMBIENTES.join(' · '), '| atual:', atual);\nconst invalido = 'testes';\nconsole.log('e rodando entra qualquer um:', invalido);\n"
       },
       {
        "n": 4,
        "titulo": "União discriminada: o campo que diz qual é qual",
        "secao": "NA PRÁTICA",
        "codigo": "// Cada forma carrega os seus próprios campos, e um campo em comum diz qual delas é.\ntype Entrega =\n  | { tipo: 'retirada'; loja: string }\n  | { tipo: 'correios'; cep: string; prazoEmDias: number }\n  | { tipo: 'motoboy'; bairro: string; taxa: number };\n\nfunction descrever(entrega: Entrega): string {\n  switch (entrega.tipo) {\n    case 'retirada': return `retirar na loja ${entrega.loja}`;\n    case 'correios': return `correios para ${entrega.cep} em ${entrega.prazoEmDias} dias`;\n    case 'motoboy': return `motoboy no ${entrega.bairro} por R$ ${entrega.taxa.toFixed(2)}`;\n  }\n}\n\nconsole.log(descrever({ tipo: 'retirada', loja: 'Centro' }));\nconsole.log(descrever({ tipo: 'correios', cep: '30110-012', prazoEmDias: 5 }));\nconsole.log(descrever({ tipo: 'motoboy', bairro: 'Savassi', taxa: 12 }));\n\n// Dentro do `case 'retirada'`, só existe `loja` — os outros campos nem aparecem.\n// @ts-expect-error — Property 'cep' does not exist on type '{ tipo: \"retirada\"; loja: string; }'.\nconst semCep = ({ tipo: 'retirada', loja: 'Centro' } as Entrega & { tipo: 'retirada' }).cep;\nconsole.log('cep na retirada:', semCep);\n\nconsole.log('\\nÉ o padrão mais poderoso do TypeScript: em vez de um objeto com tudo opcional,');\nconsole.log('três formas fechadas e um campo que separa. O switch fica exaustivo de graça.');",
        "codigoJs": "function descrever(entrega) {\n    switch(entrega.tipo){\n        case 'retirada':\n            return `retirar na loja ${entrega.loja}`;\n        case 'correios':\n            return `correios para ${entrega.cep} em ${entrega.prazoEmDias} dias`;\n        case 'motoboy':\n            return `motoboy no ${entrega.bairro} por R$ ${entrega.taxa.toFixed(2)}`;\n    }\n}\nconsole.log(descrever({\n    tipo: 'retirada',\n    loja: 'Centro'\n}));\nconsole.log(descrever({\n    tipo: 'correios',\n    cep: '30110-012',\n    prazoEmDias: 5\n}));\nconsole.log(descrever({\n    tipo: 'motoboy',\n    bairro: 'Savassi',\n    taxa: 12\n}));\nconst semCep = {\n    tipo: 'retirada',\n    loja: 'Centro'\n}.cep;\nconsole.log('cep na retirada:', semCep);\nconsole.log('\\nÉ o padrão mais poderoso do TypeScript: em vez de um objeto com tudo opcional,');\nconsole.log('três formas fechadas e um campo que separa. O switch fica exaustivo de graça.');\n"
       },
       {
        "n": 5,
        "titulo": "União de retorno: sucesso ou falha",
        "secao": "NA PRÁTICA",
        "codigo": "type Resultado = { ok: true; total: number } | { ok: false; erro: string };\n\nfunction calcularTotal(itens: { preco: number; quantidade: number }[]): Resultado {\n  if (itens.length === 0) return { ok: false, erro: 'carrinho vazio' };\n  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);\n  if (total <= 0) return { ok: false, erro: 'total inválido' };\n  return { ok: true, total };\n}\n\nfor (const carrinho of [[{ preco: 19.9, quantidade: 2 }], [], [{ preco: 0, quantidade: 1 }]]) {\n  const r = calcularTotal(carrinho);\n  // Só depois de conferir `r.ok` é que `r.total` (ou `r.erro`) existe.\n  console.log(r.ok ? `✓ R$ ${r.total.toFixed(2)}` : `✕ ${r.erro}`);\n}\n\nconsole.log('\\nSem união, isso viraria `{ total?: number; erro?: string }` — e aí os dois');\nconsole.log('podem faltar ao mesmo tempo, ou vir juntos. A união fecha essas duas portas.');",
        "codigoJs": "function calcularTotal(itens) {\n    if (itens.length === 0) return {\n        ok: false,\n        erro: 'carrinho vazio'\n    };\n    const total = itens.reduce((soma, i)=>soma + i.preco * i.quantidade, 0);\n    if (total <= 0) return {\n        ok: false,\n        erro: 'total inválido'\n    };\n    return {\n        ok: true,\n        total\n    };\n}\nfor (const carrinho of [\n    [\n        {\n            preco: 19.9,\n            quantidade: 2\n        }\n    ],\n    [],\n    [\n        {\n            preco: 0,\n            quantidade: 1\n        }\n    ]\n]){\n    const r = calcularTotal(carrinho);\n    console.log(r.ok ? `✓ R$ ${r.total.toFixed(2)}` : `✕ ${r.erro}`);\n}\nconsole.log('\\nSem união, isso viraria `{ total?: number; erro?: string }` — e aí os dois');\nconsole.log('podem faltar ao mesmo tempo, ou vir juntos. A união fecha essas duas portas.');\n"
       },
       {
        "n": 6,
        "titulo": "Sem `as const`, o literal vira string na hora",
        "secao": "PEGADINHAS",
        "codigo": "type Nivel = 'baixo' | 'medio' | 'alto';\n\nfunction alertar(nivel: Nivel): string { return `alerta ${nivel}`; }\n\nconst escolhido = 'alto';                  // const: o tipo é 'alto' — funciona\nconsole.log(alertar(escolhido));\n\nlet escolhidoSolto = 'alto';               // let: o tipo alarga para string\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'Nivel'.\nconsole.log(alertar(escolhidoSolto));\n\nconst dentroDeObjeto = { nivel: 'alto' };  // a propriedade também alarga para string\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'Nivel'.\nconsole.log(alertar(dentroDeObjeto.nivel));\n\nconst congelado = { nivel: 'alto' } as const;\nconsole.log(alertar(congelado.nivel), '← com `as const` volta a ser o literal');\n\nconsole.log('\\nA regra é essa: `let` e propriedade de objeto alargam o literal para `string`.');\nconsole.log('Conserto: `as const`, ou anotar o tipo (`const n: Nivel = \"alto\"`).');",
        "codigoJs": "function alertar(nivel) {\n    return `alerta ${nivel}`;\n}\nconst escolhido = 'alto';\nconsole.log(alertar(escolhido));\nlet escolhidoSolto = 'alto';\nconsole.log(alertar(escolhidoSolto));\nconst dentroDeObjeto = {\n    nivel: 'alto'\n};\nconsole.log(alertar(dentroDeObjeto.nivel));\nconst congelado = {\n    nivel: 'alto'\n};\nconsole.log(alertar(congelado.nivel), '← com `as const` volta a ser o literal');\nconsole.log('\\nA regra é essa: `let` e propriedade de objeto alargam o literal para `string`.');\nconsole.log('Conserto: `as const`, ou anotar o tipo (`const n: Nivel = \"alto\"`).');\n"
       }
      ],
      "resumo": [
       "`A | B` é \"um ou outro\"; fora de um `if`, só se pode usar o que existe nos dois.",
       "Tipo literal transforma o valor em tipo: `'pix'` é mais preciso que `string`.",
       "União de literais é o jeito de escrever status, papel, tamanho e forma de pagamento.",
       "União discriminada (um campo `tipo` em comum) faz o `switch` estreitar sozinho.",
       "Retorno `{ ok: true, ... } | { ok: false, erro }` acaba com o objeto meio preenchido.",
       "`let` e propriedade de objeto alargam o literal — `as const` segura."
      ]
     },
     {
      "slug": "02-alias-e-interface",
      "arquivo": "typescript/src/03-montar-tipos/02-alias-e-interface.ts",
      "comando": "node src/03-montar-tipos/02-alias-e-interface.ts",
      "titulo": "type alias e interface",
      "sessao": 3,
      "oQueE": "as duas formas de dar nome a um tipo. `type` apelida qualquer tipo; `interface` descreve o formato de um objeto e pode ser estendida.",
      "quandoUsar": "`interface` para o formato de objeto e de classe; `type` para união, tupla, função e qualquer coisa que não seja um objeto.",
      "quandoNaoUsar": "não misture os dois para a mesma ideia no mesmo projeto. A escolha importa menos do que a consistência.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Dar nome ao tipo, em vez de repeti-lo",
        "secao": "ESSENCIAL",
        "codigo": "// Sem nome, o mesmo formato é escrito em três lugares e muda em três lugares.\ninterface Produto {\n  sku: string;\n  nome: string;\n  preco: number;\n}\n\nconst cadastrar = (produto: Produto): string => `cadastrado: ${produto.nome}`;\nconst etiqueta = (produto: Produto): string => `${produto.sku} — R$ ${produto.preco.toFixed(2)}`;\n\nconst caneca: Produto = { sku: 'CAN-01', nome: 'Caneca', preco: 19.9 };\nconsole.log(cadastrar(caneca));\nconsole.log(etiqueta(caneca));\n\ntry {\n  // @ts-expect-error — Property 'preco' is missing in type '{ sku: string; nome: string; }'.\n  console.log(etiqueta({ sku: 'CAD-02', nome: 'Caderno' }));\n} catch (erro) {\n  console.log('sem preço:', (erro as Error).message);\n}",
        "codigoJs": "const cadastrar = (produto)=>`cadastrado: ${produto.nome}`;\nconst etiqueta = (produto)=>`${produto.sku} — R$ ${produto.preco.toFixed(2)}`;\nconst caneca = {\n    sku: 'CAN-01',\n    nome: 'Caneca',\n    preco: 19.9\n};\nconsole.log(cadastrar(caneca));\nconsole.log(etiqueta(caneca));\ntry {\n    console.log(etiqueta({\n        sku: 'CAD-02',\n        nome: 'Caderno'\n    }));\n} catch (erro) {\n    console.log('sem preço:', erro.message);\n}\n"
       },
       {
        "n": 2,
        "titulo": "`type` apelida qualquer coisa, não só objeto",
        "secao": "ESSENCIAL",
        "codigo": "type Reais = number;                                  // um apelido, para o código se ler melhor\ntype Sku = `${string}-${number}`;                     // template literal: formato de texto\ntype Ordenacao = 'asc' | 'desc';                      // união\ntype Comparador = (a: number, b: number) => number;   // função\ntype Coordenada = [number, number];                   // tupla\n\nconst preco: Reais = 19.9;\nconst codigo: Sku = 'CAN-01';\nconst ordem: Ordenacao = 'desc';\nconst porValor: Comparador = (a, b) => b - a;\nconst loja: Coordenada = [-19.92, -43.94];\n\nconsole.log(`${codigo}: R$ ${preco.toFixed(2)} (${ordem})`);\nconsole.log('ordenado:', [3, 1, 2].sort(porValor).join(' > '));\nconsole.log('loja em :', loja.join(', '));\n\n// @ts-expect-error — Type '\"CANECA\"' is not assignable to type '`${string}-${number}`'.\nconst skuTorto: Sku = 'CANECA';\nconsole.log('rodando, é texto como qualquer outro:', skuTorto.length, 'letras');",
        "codigoJs": "const preco = 19.9;\nconst codigo = 'CAN-01';\nconst ordem = 'desc';\nconst porValor = (a, b)=>b - a;\nconst loja = [\n    -19.92,\n    -43.94\n];\nconsole.log(`${codigo}: R$ ${preco.toFixed(2)} (${ordem})`);\nconsole.log('ordenado:', [\n    3,\n    1,\n    2\n].sort(porValor).join(' > '));\nconsole.log('loja em :', loja.join(', '));\nconst skuTorto = 'CANECA';\nconsole.log('rodando, é texto como qualquer outro:', skuTorto.length, 'letras');\n"
       },
       {
        "n": 3,
        "titulo": "Estender: `extends` na interface, `&` no type",
        "secao": "ESSENCIAL",
        "codigo": "interface Pessoa {\n  nome: string;\n  nascimento: string;\n}\ninterface Aluno extends Pessoa {\n  matricula: string;\n}\n\ntype PessoaTipo = { nome: string; nascimento: string };\ntype ProfessorTipo = PessoaTipo & { disciplinas: string[] };\n\nconst aluno: Aluno = { nome: 'Ana', nascimento: '2004-03-11', matricula: 'A-1042' };\nconst professor: ProfessorTipo = { nome: 'Carla', nascimento: '1985-07-02', disciplinas: ['Física'] };\n\nconsole.log(`${aluno.nome} (${aluno.matricula})`);\nconsole.log(`${professor.nome} — ${professor.disciplinas.join(', ')}`);\n\n// @ts-expect-error — Property 'matricula' is missing.\nconst semMatricula: Aluno = { nome: 'Bruno', nascimento: '2003-01-20' };\nconsole.log('roda mesmo assim:', Object.keys(semMatricula).length, 'chaves');\n\nconsole.log('\\nOs dois chegam ao mesmo resultado. `extends` diz \"é um tipo de\"; `&` diz');\nconsole.log('\"tem as duas coisas\". Na leitura, `extends` costuma contar melhor a história.');",
        "codigoJs": "const aluno = {\n    nome: 'Ana',\n    nascimento: '2004-03-11',\n    matricula: 'A-1042'\n};\nconst professor = {\n    nome: 'Carla',\n    nascimento: '1985-07-02',\n    disciplinas: [\n        'Física'\n    ]\n};\nconsole.log(`${aluno.nome} (${aluno.matricula})`);\nconsole.log(`${professor.nome} — ${professor.disciplinas.join(', ')}`);\nconst semMatricula = {\n    nome: 'Bruno',\n    nascimento: '2003-01-20'\n};\nconsole.log('roda mesmo assim:', Object.keys(semMatricula).length, 'chaves');\nconsole.log('\\nOs dois chegam ao mesmo resultado. `extends` diz \"é um tipo de\"; `&` diz');\nconsole.log('\"tem as duas coisas\". Na leitura, `extends` costuma contar melhor a história.');\n"
       },
       {
        "n": 4,
        "titulo": "Qual escolher, na prática",
        "secao": "NA PRÁTICA",
        "codigo": "const escolha = [\n  ['formato de objeto', 'interface', 'é o caso mais comum, e o erro sai mais legível'],\n  ['contrato de classe', 'interface', 'só interface entra em `implements`'],\n  ['união de literais', 'type', 'interface não sabe fazer união'],\n  ['tupla', 'type', 'idem'],\n  ['tipo de função', 'os dois', 'na prática, `type` é o que se lê melhor'],\n  ['tipo derivado de outro', 'type', 'Pick, Omit e keyof só cabem em `type`'],\n];\n\nconst largura = [24, 12, 46];\nconst linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');\nconsole.log(linha(['PARA QUÊ', 'USE', 'POR QUÊ']));\nconsole.log(linha(['─'.repeat(22), '─'.repeat(10), '─'.repeat(44)]));\nfor (const l of escolha) console.log(linha(l));\n\n// O que só a interface faz: entrar em `implements`, e se reabrir para ganhar campo depois.\ninterface Cliente { nome: string }\ninterface Cliente { desde: number }              // a mesma interface, aberta de novo\nclass ClientePessoaFisica implements Cliente {   // `implements` só aceita interface\n  nome: string;\n  desde: number;\n  constructor(nome: string, desde: number) { this.nome = nome; this.desde = desde; }\n}\nconsole.log('\\nsó interface:', JSON.stringify(new ClientePessoaFisica('Ana', 2021)));\n\n// O que só o `type` faz: apelidar o que NÃO é objeto, e derivar de outro tipo.\ntype FormaDePagamento = 'pix' | 'cartao' | 'boleto';        // união\ntype PontoNoMapa = [number, number];                         // tupla\ntype ApenasNome = Pick<Cliente, 'nome'>;                     // derivado\n\nconst pagamento: FormaDePagamento = 'pix';\nconst local: PontoNoMapa = [-19.92, -43.94];\nconst resumo: ApenasNome = { nome: 'Ana' };\nconsole.log('só type    :', pagamento, local.join(', '), JSON.stringify(resumo));\n\nconsole.log('\\nO jeito de decidir em uma frase: `interface` descreve o FORMATO de um objeto e');\nconsole.log('fica ABERTA — quem usa pode estender e até reabrir. `type` é apelido para');\nconsole.log('QUALQUER tipo e fica FECHADO — em troca, é o único que compõe (união, tupla,');\nconsole.log('Pick, Omit, keyof).');\nconsole.log('\\nNa prática: comece com `interface` para objeto e para o que uma classe vai');\nconsole.log('implementar; use `type` no instante em que aparecer união, tupla ou derivação.');\nconsole.log('Os dois convivem: `interface Pedido { forma: FormaDePagamento }` é o normal.');\nconsole.log('O que não se faz é escolher no chute e misturar os dois para a mesma ideia no');\nconsole.log('mesmo projeto — quem lê depois não sabe se a diferença quis dizer alguma coisa.');",
        "codigoJs": "const escolha = [\n    [\n        'formato de objeto',\n        'interface',\n        'é o caso mais comum, e o erro sai mais legível'\n    ],\n    [\n        'contrato de classe',\n        'interface',\n        'só interface entra em `implements`'\n    ],\n    [\n        'união de literais',\n        'type',\n        'interface não sabe fazer união'\n    ],\n    [\n        'tupla',\n        'type',\n        'idem'\n    ],\n    [\n        'tipo de função',\n        'os dois',\n        'na prática, `type` é o que se lê melhor'\n    ],\n    [\n        'tipo derivado de outro',\n        'type',\n        'Pick, Omit e keyof só cabem em `type`'\n    ]\n];\nconst largura = [\n    24,\n    12,\n    46\n];\nconst linha = (colunas)=>colunas.map((c, i)=>c.padEnd(largura[i])).join('');\nconsole.log(linha([\n    'PARA QUÊ',\n    'USE',\n    'POR QUÊ'\n]));\nconsole.log(linha([\n    '─'.repeat(22),\n    '─'.repeat(10),\n    '─'.repeat(44)\n]));\nfor (const l of escolha)console.log(linha(l));\nclass ClientePessoaFisica {\n    nome;\n    desde;\n    constructor(nome, desde){\n        this.nome = nome;\n        this.desde = desde;\n    }\n}\nconsole.log('\\nsó interface:', JSON.stringify(new ClientePessoaFisica('Ana', 2021)));\nconst pagamento = 'pix';\nconst local = [\n    -19.92,\n    -43.94\n];\nconst resumo = {\n    nome: 'Ana'\n};\nconsole.log('só type    :', pagamento, local.join(', '), JSON.stringify(resumo));\nconsole.log('\\nO jeito de decidir em uma frase: `interface` descreve o FORMATO de um objeto e');\nconsole.log('fica ABERTA — quem usa pode estender e até reabrir. `type` é apelido para');\nconsole.log('QUALQUER tipo e fica FECHADO — em troca, é o único que compõe (união, tupla,');\nconsole.log('Pick, Omit, keyof).');\nconsole.log('\\nNa prática: comece com `interface` para objeto e para o que uma classe vai');\nconsole.log('implementar; use `type` no instante em que aparecer união, tupla ou derivação.');\nconsole.log('Os dois convivem: `interface Pedido { forma: FormaDePagamento }` é o normal.');\nconsole.log('O que não se faz é escolher no chute e misturar os dois para a mesma ideia no');\nconsole.log('mesmo projeto — quem lê depois não sabe se a diferença quis dizer alguma coisa.');\n"
       },
       {
        "n": 5,
        "titulo": "Interface que descreve função e índice",
        "secao": "NA PRÁTICA",
        "codigo": "interface Formatador {\n  (valor: number): string;                    // a interface descreve a chamada\n  moeda: string;                              // e ainda tem propriedade própria\n}\n\nconst emReais = ((valor: number) => `R$ ${valor.toFixed(2)}`) as Formatador;\nemReais.moeda = 'BRL';\n\nconsole.log(emReais(1250.5), `(${emReais.moeda})`);\n\ninterface EstoquePorSku {\n  [sku: string]: number;                      // qualquer chave string, valor number\n}\n\nconst estoque: EstoquePorSku = { 'CAN-01': 12, 'CAD-02': 0 };\nestoque['CAN-02'] = 40;\n\nfor (const [sku, quantidade] of Object.entries(estoque))\n  console.log(`${sku.padEnd(8)} ${quantidade === 0 ? 'esgotado' : `${quantidade} un`}`);\n\n// @ts-expect-error — Type 'string' is not assignable to type 'number'.\nestoque['CAD-03'] = 'muitos';\nconsole.log('e o texto entrou:', estoque['CAD-03']);",
        "codigoJs": "const emReais = (valor)=>`R$ ${valor.toFixed(2)}`;\nemReais.moeda = 'BRL';\nconsole.log(emReais(1250.5), `(${emReais.moeda})`);\nconst estoque = {\n    'CAN-01': 12,\n    'CAD-02': 0\n};\nestoque['CAN-02'] = 40;\nfor (const [sku, quantidade] of Object.entries(estoque))console.log(`${sku.padEnd(8)} ${quantidade === 0 ? 'esgotado' : `${quantidade} un`}`);\nestoque['CAD-03'] = 'muitos';\nconsole.log('e o texto entrou:', estoque['CAD-03']);\n"
       },
       {
        "n": 6,
        "titulo": "Interface se reabre; type, não",
        "secao": "PEGADINHAS",
        "codigo": "interface Configuracao {\n  ambiente: string;\n}\n// A MESMA interface, declarada de novo: o TypeScript junta as duas em silêncio.\ninterface Configuracao {\n  tentativas: number;\n}\n\nconst config: Configuracao = { ambiente: 'producao', tentativas: 3 };\nconsole.log('junção automática:', JSON.stringify(config));\n\n// @ts-expect-error — Property 'tentativas' is missing.\nconst soAmbiente: Configuracao = { ambiente: 'producao' };\nconsole.log('faltando um campo:', JSON.stringify(soAmbiente));\n\nconsole.log('\\nIsso se chama declaration merging. É ótimo para acrescentar campo a um tipo de');\nconsole.log('biblioteca (o `Request` do Express, por exemplo) e péssimo quando acontece sem');\nconsole.log('você querer: dois arquivos com a mesma interface viram uma só, sem aviso.');\nconsole.log('Com `type`, o mesmo nome duas vezes é erro na hora — e às vezes é o que se quer.');",
        "codigoJs": "const config = {\n    ambiente: 'producao',\n    tentativas: 3\n};\nconsole.log('junção automática:', JSON.stringify(config));\nconst soAmbiente = {\n    ambiente: 'producao'\n};\nconsole.log('faltando um campo:', JSON.stringify(soAmbiente));\nconsole.log('\\nIsso se chama declaration merging. É ótimo para acrescentar campo a um tipo de');\nconsole.log('biblioteca (o `Request` do Express, por exemplo) e péssimo quando acontece sem');\nconsole.log('você querer: dois arquivos com a mesma interface viram uma só, sem aviso.');\nconsole.log('Com `type`, o mesmo nome duas vezes é erro na hora — e às vezes é o que se quer.');\n"
       }
      ],
      "resumo": [
       "`interface` para formato de objeto e contrato de classe; `type` para o resto.",
       "`type` apelida qualquer tipo: união, tupla, função, template literal.",
       "Herança: `extends` na interface, `&` no type — o resultado é o mesmo.",
       "Só `interface` entra em `implements` (tema 06) e só `type` deriva com Pick/Omit (tema 07).",
       "Interface descreve chamada de função e assinatura de índice.",
       "Interface declarada duas vezes se funde em silêncio; `type` acusa nome repetido."
      ]
     },
     {
      "slug": "03-intersection-e-enum",
      "arquivo": "typescript/src/03-montar-tipos/03-intersection-e-enum.ts",
      "comando": "node --experimental-transform-types src/03-montar-tipos/03-intersection-e-enum.ts",
      "titulo": "Intersection e enum",
      "sessao": 3,
      "oQueE": "intersection (`A & B`) junta dois tipos num só, que precisa cumprir os dois. `enum` é a única construção do TypeScript que SOBRA depois de compilar: ela vira um objeto de verdade no JavaScript gerado.",
      "quandoUsar": "`&` para compor formatos sem herança. `enum` quando você precisa do valor existindo em tempo de execução (percorrer as opções, mapear de volta).",
      "quandoNaoUsar": "`enum` no caso comum. Uma união de literais com `as const` faz o mesmo sem gerar código — e é o que a maior parte dos projetos usa hoje.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`&`: o tipo que cumpre os dois contratos",
        "secao": "ESSENCIAL",
        "codigo": "type Identificavel = { id: number };\ntype ComDatas = { criadoEm: string; atualizadoEm: string };\ntype Comentario = Identificavel & ComDatas & { texto: string; autor: string };\n\nconst comentario: Comentario = {\n  id: 7,\n  criadoEm: '2026-08-20',\n  atualizadoEm: '2026-08-21',\n  texto: 'Chegou antes do prazo.',\n  autor: 'Ana',\n};\n\nconsole.log(`#${comentario.id} por ${comentario.autor}: \"${comentario.texto}\"`);\nconsole.log(`criado em ${comentario.criadoEm}, editado em ${comentario.atualizadoEm}`);\n\n// @ts-expect-error — Property 'atualizadoEm' is missing.\nconst semData: Comentario = { id: 8, criadoEm: '2026-08-22', texto: 'ok', autor: 'Bruno' };\nconsole.log('faltando um campo:', Object.keys(semData).length, 'chaves');\n\nconsole.log('\\n`&` é junção, não escolha: o objeto precisa de TODOS os campos dos dois lados.');\nconsole.log('É o contrário de `|`, onde basta ser um deles.');",
        "codigoJs": "const comentario = {\n    id: 7,\n    criadoEm: '2026-08-20',\n    atualizadoEm: '2026-08-21',\n    texto: 'Chegou antes do prazo.',\n    autor: 'Ana'\n};\nconsole.log(`#${comentario.id} por ${comentario.autor}: \"${comentario.texto}\"`);\nconsole.log(`criado em ${comentario.criadoEm}, editado em ${comentario.atualizadoEm}`);\nconst semData = {\n    id: 8,\n    criadoEm: '2026-08-22',\n    texto: 'ok',\n    autor: 'Bruno'\n};\nconsole.log('faltando um campo:', Object.keys(semData).length, 'chaves');\nconsole.log('\\n`&` é junção, não escolha: o objeto precisa de TODOS os campos dos dois lados.');\nconsole.log('É o contrário de `|`, onde basta ser um deles.');\n"
       },
       {
        "n": 2,
        "titulo": "`enum`: a exceção que vira código",
        "secao": "ESSENCIAL",
        "codigo": "enum StatusDoPedido {\n  Pendente,        // 0\n  Pago,            // 1\n  Enviado,         // 2\n  Entregue,        // 3\n}\n\nconst status = StatusDoPedido.Enviado;\nconsole.log('valor    :', status);\nconsole.log('nome     :', StatusDoPedido[status], '← o mapa de volta, que só o enum dá');\nconsole.log('todos    :', Object.values(StatusDoPedido).filter((v) => typeof v === 'string').join(' → '));\n\n// É por isso que o cabeçalho deste arquivo pede `--experimental-transform-types`: sem a\n// flag, o `node` recusa o arquivo inteiro, porque `enum` não é um tipo — é código para gerar.\nconsole.log('\\nSão só duas as construções do TypeScript que geram código: `enum` e a');\nconsole.log('propriedade de parâmetro do construtor (tema 06). O resto o `node` apaga e pronto.');",
        "codigoJs": "var StatusDoPedido = /*#__PURE__*/ function(StatusDoPedido) {\n    StatusDoPedido[StatusDoPedido[\"Pendente\"] = 0] = \"Pendente\";\n    StatusDoPedido[StatusDoPedido[\"Pago\"] = 1] = \"Pago\";\n    StatusDoPedido[StatusDoPedido[\"Enviado\"] = 2] = \"Enviado\";\n    StatusDoPedido[StatusDoPedido[\"Entregue\"] = 3] = \"Entregue\";\n    return StatusDoPedido;\n}(StatusDoPedido || {});\nconst status = 2;\nconsole.log('valor    :', status);\nconsole.log('nome     :', StatusDoPedido[status], '← o mapa de volta, que só o enum dá');\nconsole.log('todos    :', Object.values(StatusDoPedido).filter((v)=>typeof v === 'string').join(' → '));\nconsole.log('\\nSão só duas as construções do TypeScript que geram código: `enum` e a');\nconsole.log('propriedade de parâmetro do construtor (tema 06). O resto o `node` apaga e pronto.');\n"
       },
       {
        "n": 3,
        "titulo": "enum de texto, que é o que se usa de verdade",
        "secao": "ESSENCIAL",
        "codigo": "enum FormaDePagamento {\n  Pix = 'pix',\n  Boleto = 'boleto',\n  Cartao = 'cartao',\n}\n\nfunction prazo(forma: FormaDePagamento): string {\n  if (forma === FormaDePagamento.Pix) return 'na hora';\n  if (forma === FormaDePagamento.Boleto) return 'até 3 dias úteis';\n  return 'até 30 dias';\n}\n\nfor (const forma of Object.values(FormaDePagamento))\n  console.log(`${forma.padEnd(8)} ${prazo(forma)}`);\n\n// @ts-expect-error — Type '\"pix\"' is not assignable to type 'FormaDePagamento'.\nconsole.log(prazo('pix'));\n\nconsole.log('\\nRepare: o texto \"pix\" cru NÃO serve, mesmo tendo o mesmo valor. Enum de texto');\nconsole.log('é nominal — só o membro do enum entra. Enum de número, esse aceita qualquer number.');",
        "codigoJs": "var FormaDePagamento = /*#__PURE__*/ function(FormaDePagamento) {\n    FormaDePagamento[\"Pix\"] = \"pix\";\n    FormaDePagamento[\"Boleto\"] = \"boleto\";\n    FormaDePagamento[\"Cartao\"] = \"cartao\";\n    return FormaDePagamento;\n}(FormaDePagamento || {});\nfunction prazo(forma) {\n    if (forma === \"pix\") return 'na hora';\n    if (forma === \"boleto\") return 'até 3 dias úteis';\n    return 'até 30 dias';\n}\nfor (const forma of Object.values(FormaDePagamento))console.log(`${forma.padEnd(8)} ${prazo(forma)}`);\nconsole.log(prazo('pix'));\nconsole.log('\\nRepare: o texto \"pix\" cru NÃO serve, mesmo tendo o mesmo valor. Enum de texto');\nconsole.log('é nominal — só o membro do enum entra. Enum de número, esse aceita qualquer number.');\n"
       },
       {
        "n": 4,
        "titulo": "`&` para acrescentar campo a um tipo que veio de fora",
        "secao": "NA PRÁTICA",
        "codigo": "// O caso clássico: o `Request` do Express ganha `usuarioId` depois que o login passa.\ntype Pedido = { rota: string; cabecalhos: Record<string, string> };\ntype PedidoAutenticado = Pedido & { usuarioId: number };\n\nconst loginRequired = (pedido: Pedido): PedidoAutenticado | null => {\n  const token = pedido.cabecalhos['authorization'];\n  if (!token) return null;\n  return { ...pedido, usuarioId: Number(token.replace('Bearer ', '')) };\n};\n\nconst semToken = loginRequired({ rota: '/alunos', cabecalhos: {} });\nconst comToken = loginRequired({ rota: '/alunos', cabecalhos: { authorization: 'Bearer 7' } });\n\nconsole.log('sem token:', semToken === null ? '401' : 'passou');\nconsole.log('com token:', comToken ? `usuário ${comToken.usuarioId} em ${comToken.rota}` : '401');\n\nconsole.log('\\nO `&` deixa claro o que foi ACRESCENTADO por quem, sem mexer no tipo original.');",
        "codigoJs": "const loginRequired = (pedido)=>{\n    const token = pedido.cabecalhos['authorization'];\n    if (!token) return null;\n    return {\n        ...pedido,\n        usuarioId: Number(token.replace('Bearer ', ''))\n    };\n};\nconst semToken = loginRequired({\n    rota: '/alunos',\n    cabecalhos: {}\n});\nconst comToken = loginRequired({\n    rota: '/alunos',\n    cabecalhos: {\n        authorization: 'Bearer 7'\n    }\n});\nconsole.log('sem token:', semToken === null ? '401' : 'passou');\nconsole.log('com token:', comToken ? `usuário ${comToken.usuarioId} em ${comToken.rota}` : '401');\nconsole.log('\\nO `&` deixa claro o que foi ACRESCENTADO por quem, sem mexer no tipo original.');\n"
       },
       {
        "n": 5,
        "titulo": "Enum ou união de literais?",
        "secao": "NA PRÁTICA",
        "codigo": "const comparacao = [\n  ['Existe rodando', 'sim, vira objeto', 'não, some'],\n  ['Peso no bundle', 'algumas linhas por enum', 'zero'],\n  ['Listar as opções', 'Object.values(E)', 'precisa de um array `as const`'],\n  ['Valor → nome', 'E[0] === \"Pendente\"', 'não tem'],\n  ['Aceita o texto cru', 'não (enum de texto)', 'sim, é o próprio texto'],\n  ['O que se usa hoje', 'quando precisa do objeto', 'no resto — é o padrão'],\n];\n\nconst largura = [22, 30, 30];\nconst linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');\nconsole.log(linha(['', 'ENUM', 'UNIÃO DE LITERAIS']));\nconsole.log(linha(['─'.repeat(20), '─'.repeat(28), '─'.repeat(28)]));\nfor (const l of comparacao) console.log(linha(l));\n\n// A alternativa sem enum, com tudo que o enum dava:\nconst STATUS = ['pendente', 'pago', 'enviado', 'entregue'] as const;\ntype StatusLiteral = (typeof STATUS)[number];\n\nconst atual: StatusLiteral = 'enviado';\nconsole.log('\\nsem enum → opções:', STATUS.join(' → '), '| atual:', atual, '| índice:', STATUS.indexOf(atual));",
        "codigoJs": "const comparacao = [\n    [\n        'Existe rodando',\n        'sim, vira objeto',\n        'não, some'\n    ],\n    [\n        'Peso no bundle',\n        'algumas linhas por enum',\n        'zero'\n    ],\n    [\n        'Listar as opções',\n        'Object.values(E)',\n        'precisa de um array `as const`'\n    ],\n    [\n        'Valor → nome',\n        'E[0] === \"Pendente\"',\n        'não tem'\n    ],\n    [\n        'Aceita o texto cru',\n        'não (enum de texto)',\n        'sim, é o próprio texto'\n    ],\n    [\n        'O que se usa hoje',\n        'quando precisa do objeto',\n        'no resto — é o padrão'\n    ]\n];\nconst largura = [\n    22,\n    30,\n    30\n];\nconst linha = (colunas)=>colunas.map((c, i)=>c.padEnd(largura[i])).join('');\nconsole.log(linha([\n    '',\n    'ENUM',\n    'UNIÃO DE LITERAIS'\n]));\nconsole.log(linha([\n    '─'.repeat(20),\n    '─'.repeat(28),\n    '─'.repeat(28)\n]));\nfor (const l of comparacao)console.log(linha(l));\nconst STATUS = [\n    'pendente',\n    'pago',\n    'enviado',\n    'entregue'\n];\nconst atual = 'enviado';\nconsole.log('\\nsem enum → opções:', STATUS.join(' → '), '| atual:', atual, '| índice:', STATUS.indexOf(atual));\n"
       },
       {
        "n": 6,
        "titulo": "`&` de tipos incompatíveis dá `never`, não erro",
        "secao": "PEGADINHAS",
        "codigo": "type ComoTexto = { codigo: string };\ntype ComoNumero = { codigo: number };\ntype Impossivel = ComoTexto & ComoNumero;          // codigo: string & number → never\n\n// A declaração do TIPO passa. O erro só aparece quando alguém tenta criar o valor.\n// @ts-expect-error — Type 'string' is not assignable to type 'never'.\nconst nunca: Impossivel = { codigo: 'CAN-01' };\nconsole.log('rodando, é um objeto comum:', JSON.stringify(nunca));\n\nconsole.log('\\nO TypeScript não avisa na hora de declarar: ele espera você tentar usar.');\nconsole.log('Quando um `&` começa a dar \"not assignable to never\", quase sempre é isto:');\nconsole.log('dois campos com o mesmo nome e tipos que não se encontram.');",
        "codigoJs": "const nunca = {\n    codigo: 'CAN-01'\n};\nconsole.log('rodando, é um objeto comum:', JSON.stringify(nunca));\nconsole.log('\\nO TypeScript não avisa na hora de declarar: ele espera você tentar usar.');\nconsole.log('Quando um `&` começa a dar \"not assignable to never\", quase sempre é isto:');\nconsole.log('dois campos com o mesmo nome e tipos que não se encontram.');\n"
       },
       {
        "n": 7,
        "titulo": "Enum de número aceita número que não é dele",
        "secao": "PEGADINHAS",
        "codigo": "enum Prioridade { Baixa = 1, Media = 2, Alta = 3 }\n\nfunction rotular(p: Prioridade): string { return Prioridade[p] ?? 'desconhecida'; }\n\nconst vindoDaApi: number = 99;                     // qualquer number, e o tsc aceita\n\nconsole.log('Alta   :', rotular(Prioridade.Alta));\nconsole.log('o 99   :', rotular(vindoDaApi), '← não é membro nenhum, e passou pelo tsc');\n\nconsole.log('\\nEnum numérico é estrutural: qualquer `number` cabe nele. Enum de texto não tem');\nconsole.log('esse buraco — mais um motivo para nunca usar a versão numérica em dado de fora.');",
        "codigoJs": "var Prioridade = /*#__PURE__*/ function(Prioridade) {\n    Prioridade[Prioridade[\"Baixa\"] = 1] = \"Baixa\";\n    Prioridade[Prioridade[\"Media\"] = 2] = \"Media\";\n    Prioridade[Prioridade[\"Alta\"] = 3] = \"Alta\";\n    return Prioridade;\n}(Prioridade || {});\nfunction rotular(p) {\n    return Prioridade[p] ?? 'desconhecida';\n}\nconst vindoDaApi = 99;\nconsole.log('Alta   :', rotular(3));\nconsole.log('o 99   :', rotular(vindoDaApi), '← não é membro nenhum, e passou pelo tsc');\nconsole.log('\\nEnum numérico é estrutural: qualquer `number` cabe nele. Enum de texto não tem');\nconsole.log('esse buraco — mais um motivo para nunca usar a versão numérica em dado de fora.');\n"
       }
      ],
      "resumo": [
       "`A & B` exige os campos dos dois; `A | B` aceita ser um dos dois.",
       "`&` é o jeito de acrescentar campo a um tipo de terceiro sem herança.",
       "`enum` é a única coisa do TypeScript que sobra no JavaScript gerado.",
       "Prefira enum de texto; o numérico aceita qualquer `number` e não protege nada.",
       "Para o caso comum, união de literais + `as const` faz o mesmo e não gera código.",
       "`&` de campos incompatíveis vira `never` calado — o erro só aparece ao criar o valor."
      ]
     }
    ]
   },
   {
    "slug": "04-funcoes",
    "titulo": "Funções Tipadas",
    "icone": "ƒ",
    "cor": "#6ee7a8",
    "resumo": "Parâmetro, retorno, sobrecarga e o this tipado.",
    "topicos": [
     {
      "slug": "01-parametros-e-retorno",
      "arquivo": "typescript/src/04-funcoes/01-parametros-e-retorno.ts",
      "comando": "node src/04-funcoes/01-parametros-e-retorno.ts",
      "titulo": "Parâmetros e retorno",
      "sessao": 4,
      "oQueE": "o contrato de uma função escrito por inteiro — o que entra, o que é opcional, o que tem padrão e o que sai.",
      "quandoUsar": "sempre nos parâmetros; no retorno, quando ele for parte do contrato público ou quando a inferência sair mais larga do que você quer.",
      "quandoNaoUsar": "não anote o retorno de callback curto (`(n) => n * 2`). Ali a inferência acerta e a anotação só ocupa espaço.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Obrigatório, opcional e com padrão",
        "secao": "ESSENCIAL",
        "codigo": "function montarEtiqueta(\n  produto: string,                       // obrigatório\n  preco: number,                         // obrigatório\n  moeda: string = 'R$',                  // tem padrão: quem chama pode omitir\n  observacao?: string,                   // opcional: pode faltar, e aí é undefined\n): string {\n  const base = `${produto.padEnd(12)} ${moeda} ${preco.toFixed(2)}`;\n  return observacao ? `${base} (${observacao})` : base;\n}\n\nconsole.log(montarEtiqueta('Caneca', 19.9));\nconsole.log(montarEtiqueta('Caderno', 32.5, 'US$'));\nconsole.log(montarEtiqueta('Caneta', 4.2, 'R$', 'última unidade'));\n\ntry {\n  // @ts-expect-error — Expected 2-4 arguments, but got 1.\n  console.log(montarEtiqueta('Caneca'));\n} catch (erro) {\n  console.log('sem o preço:', (erro as Error).message);\n}\n\nconsole.log('\\nOpcional e com padrão vêm depois dos obrigatórios — senão não haveria como');\nconsole.log('omitir. E `observacao` dentro da função é `string | undefined`, não `string`.');",
        "codigoJs": "function montarEtiqueta(produto, preco, moeda = 'R$', observacao) {\n    const base = `${produto.padEnd(12)} ${moeda} ${preco.toFixed(2)}`;\n    return observacao ? `${base} (${observacao})` : base;\n}\nconsole.log(montarEtiqueta('Caneca', 19.9));\nconsole.log(montarEtiqueta('Caderno', 32.5, 'US$'));\nconsole.log(montarEtiqueta('Caneta', 4.2, 'R$', 'última unidade'));\ntry {\n    console.log(montarEtiqueta('Caneca'));\n} catch (erro) {\n    console.log('sem o preço:', erro.message);\n}\nconsole.log('\\nOpcional e com padrão vêm depois dos obrigatórios — senão não haveria como');\nconsole.log('omitir. E `observacao` dentro da função é `string | undefined`, não `string`.');\n"
       },
       {
        "n": 2,
        "titulo": "O retorno: deduzido ou declarado",
        "secao": "ESSENCIAL",
        "codigo": "// Sem anotar, o TypeScript deduz. Aqui ele deduz `number`.\nfunction calcularSubtotal(preco: number, quantidade: number) {\n  return preco * quantidade;\n}\n\n// Anotando, você trava a intenção — e o erro aparece DENTRO da função, não em quem chama.\nfunction calcularTotal(subtotal: number, frete: number): number {\n  return subtotal + frete;\n}\n\nconsole.log('subtotal:', calcularSubtotal(19.9, 3).toFixed(2));\nconsole.log('total   :', calcularTotal(calcularSubtotal(19.9, 3), 12).toFixed(2));\n\n// @ts-expect-error — Type 'string' is not assignable to type 'number'.\nfunction calcularErrado(a: number, b: number): number { return `${a + b}`; }\nconsole.log('devolveu texto:', typeof calcularErrado(1, 2));\n\nconsole.log('\\nEssa é a vantagem de anotar o retorno: o erro é acusado na linha do `return`.');\nconsole.log('Sem a anotação, a função \"funcionaria\" e o problema apareceria três chamadas adiante.');",
        "codigoJs": "function calcularSubtotal(preco, quantidade) {\n    return preco * quantidade;\n}\nfunction calcularTotal(subtotal, frete) {\n    return subtotal + frete;\n}\nconsole.log('subtotal:', calcularSubtotal(19.9, 3).toFixed(2));\nconsole.log('total   :', calcularTotal(calcularSubtotal(19.9, 3), 12).toFixed(2));\nfunction calcularErrado(a, b) {\n    return `${a + b}`;\n}\nconsole.log('devolveu texto:', typeof calcularErrado(1, 2));\nconsole.log('\\nEssa é a vantagem de anotar o retorno: o erro é acusado na linha do `return`.');\nconsole.log('Sem a anotação, a função \"funcionaria\" e o problema apareceria três chamadas adiante.');\n"
       },
       {
        "n": 3,
        "titulo": "Resto de parâmetros: quantos vierem",
        "secao": "ESSENCIAL",
        "codigo": "function somarLancamentos(descricao: string, ...valores: number[]): string {\n  const total = valores.reduce((soma, v) => soma + v, 0);\n  return `${descricao.padEnd(12)} ${valores.length} lançamentos · R$ ${total.toFixed(2)}`;\n}\n\nconsole.log(somarLancamentos('Janeiro', 1200, 890, 430));\nconsole.log(somarLancamentos('Fevereiro', 980));\nconsole.log(somarLancamentos('Março'));\n\ntry {\n  // @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\n  console.log(somarLancamentos('Abril', 100, '200'));\n} catch (erro) {\n  console.log('com texto no meio:', (erro as Error).message, '← 100 + \"200\" virou \"100200\"');\n}\n\n// Espalhar uma lista existente funciona igual — e o tipo acompanha.\nconst doBanco: number[] = [310, 275, 96];\nconsole.log(somarLancamentos('Maio', ...doBanco));",
        "codigoJs": "function somarLancamentos(descricao, ...valores) {\n    const total = valores.reduce((soma, v)=>soma + v, 0);\n    return `${descricao.padEnd(12)} ${valores.length} lançamentos · R$ ${total.toFixed(2)}`;\n}\nconsole.log(somarLancamentos('Janeiro', 1200, 890, 430));\nconsole.log(somarLancamentos('Fevereiro', 980));\nconsole.log(somarLancamentos('Março'));\ntry {\n    console.log(somarLancamentos('Abril', 100, '200'));\n} catch (erro) {\n    console.log('com texto no meio:', erro.message, '← 100 + \"200\" virou \"100200\"');\n}\nconst doBanco = [\n    310,\n    275,\n    96\n];\nconsole.log(somarLancamentos('Maio', ...doBanco));\n"
       },
       {
        "n": 4,
        "titulo": "Objeto de opções, quando os parâmetros passam de três",
        "secao": "NA PRÁTICA",
        "codigo": "// Quatro parâmetros soltos viram `buscar('ana', true, false, 20)` — ilegível na chamada.\ntype OpcoesDeBusca = {\n  termo: string;\n  somenteAtivos?: boolean;\n  incluirArquivados?: boolean;\n  limite?: number;\n};\n\nfunction buscarClientes({ termo, somenteAtivos = true, incluirArquivados = false, limite = 10 }: OpcoesDeBusca): string {\n  return `\"${termo}\" · ativos=${somenteAtivos} · arquivados=${incluirArquivados} · limite=${limite}`;\n}\n\nconsole.log(buscarClientes({ termo: 'ana' }));\nconsole.log(buscarClientes({ termo: 'bruno', limite: 50, incluirArquivados: true }));\n\n// @ts-expect-error — Object literal may only specify known properties. Did you mean 'limite'?\nconsole.log(buscarClientes({ termo: 'carla', limit: 5 }));\n\nconsole.log('\\nO padrão fica no desmembramento, o tipo fica no `type`. Quem chama enxerga o');\nconsole.log('nome de cada opção, e acrescentar a quinta não quebra ninguém.');",
        "codigoJs": "function buscarClientes({ termo, somenteAtivos = true, incluirArquivados = false, limite = 10 }) {\n    return `\"${termo}\" · ativos=${somenteAtivos} · arquivados=${incluirArquivados} · limite=${limite}`;\n}\nconsole.log(buscarClientes({\n    termo: 'ana'\n}));\nconsole.log(buscarClientes({\n    termo: 'bruno',\n    limite: 50,\n    incluirArquivados: true\n}));\nconsole.log(buscarClientes({\n    termo: 'carla',\n    limit: 5\n}));\nconsole.log('\\nO padrão fica no desmembramento, o tipo fica no `type`. Quem chama enxerga o');\nconsole.log('nome de cada opção, e acrescentar a quinta não quebra ninguém.');\n"
       },
       {
        "n": 5,
        "titulo": "Função como parâmetro",
        "secao": "NA PRÁTICA",
        "codigo": "type Transformacao = (valor: number) => number;\n\nfunction aplicarNaFolha(salarios: number[], transformar: Transformacao): number[] {\n  return salarios.map(transformar);\n}\n\nconst salarios = [3200, 5400, 2100];\nconst reajuste = (valor: number) => Math.round(valor * 1.08);\nconst bonus: Transformacao = (valor) => valor + 500;   // parâmetro não precisa de anotação aqui\n\nconsole.log('original :', salarios.join(' · '));\nconsole.log('reajuste :', aplicarNaFolha(salarios, reajuste).join(' · '));\nconsole.log('bônus    :', aplicarNaFolha(salarios, bonus).join(' · '));\n\n// @ts-expect-error — Type 'string' is not assignable to type 'number'.\nconsole.log(aplicarNaFolha(salarios, (valor) => `R$ ${valor}`));\n\nconsole.log('\\nRepare no `bonus`: o tipo está na variável, então o `valor` já vem tipado.');\nconsole.log('Isso se chama tipagem contextual, e é por isso que callback quase nunca precisa');\nconsole.log('de anotação.');",
        "codigoJs": "function aplicarNaFolha(salarios, transformar) {\n    return salarios.map(transformar);\n}\nconst salarios = [\n    3200,\n    5400,\n    2100\n];\nconst reajuste = (valor)=>Math.round(valor * 1.08);\nconst bonus = (valor)=>valor + 500;\nconsole.log('original :', salarios.join(' · '));\nconsole.log('reajuste :', aplicarNaFolha(salarios, reajuste).join(' · '));\nconsole.log('bônus    :', aplicarNaFolha(salarios, bonus).join(' · '));\nconsole.log(aplicarNaFolha(salarios, (valor)=>`R$ ${valor}`));\nconsole.log('\\nRepare no `bonus`: o tipo está na variável, então o `valor` já vem tipado.');\nconsole.log('Isso se chama tipagem contextual, e é por isso que callback quase nunca precisa');\nconsole.log('de anotação.');\n"
       },
       {
        "n": 6,
        "titulo": "Parâmetro opcional não é o mesmo que aceitar `undefined`",
        "secao": "PEGADINHAS",
        "codigo": "function comOpcional(nome: string, apelido?: string): string { return apelido ?? nome; }\nfunction comUniao(nome: string, apelido: string | undefined): string { return apelido ?? nome; }\n\nconsole.log('opcional, omitindo :', comOpcional('Ana Souza'));\nconsole.log('união, com undefined:', comUniao('Ana Souza', undefined));\n\n// @ts-expect-error — Expected 2 arguments, but got 1.\nconsole.log(comUniao('Bruno Lima'));\n\nconsole.log('\\n`apelido?` deixa OMITIR o argumento; `string | undefined` obriga a passá-lo,');\nconsole.log('mesmo que seja `undefined`. A segunda forma é chata — e é justamente por isso');\nconsole.log('que ela serve: obriga quem chama a decidir, em vez de esquecer.');",
        "codigoJs": "function comOpcional(nome, apelido) {\n    return apelido ?? nome;\n}\nfunction comUniao(nome, apelido) {\n    return apelido ?? nome;\n}\nconsole.log('opcional, omitindo :', comOpcional('Ana Souza'));\nconsole.log('união, com undefined:', comUniao('Ana Souza', undefined));\nconsole.log(comUniao('Bruno Lima'));\nconsole.log('\\n`apelido?` deixa OMITIR o argumento; `string | undefined` obriga a passá-lo,');\nconsole.log('mesmo que seja `undefined`. A segunda forma é chata — e é justamente por isso');\nconsole.log('que ela serve: obriga quem chama a decidir, em vez de esquecer.');\n"
       }
      ],
      "resumo": [
       "Parâmetro obrigatório primeiro; opcional (`?`) e com padrão (`= x`) depois.",
       "Dentro da função, `x?: T` vale `T | undefined` — trate antes de usar.",
       "Anotar o retorno faz o erro aparecer no `return`, e não lá na frente.",
       "`...resto: T[]` aceita quantos vierem, e `...array` na chamada casa com ele.",
       "Passou de três parâmetros, troque por um objeto de opções com padrões no desmembramento.",
       "Callback quase nunca precisa de anotação: o tipo vem do contexto."
      ]
     },
     {
      "slug": "02-overload-e-this",
      "arquivo": "typescript/src/04-funcoes/02-overload-e-this.ts",
      "comando": "node src/04-funcoes/02-overload-e-this.ts",
      "titulo": "Sobrecarga e o this tipado",
      "sessao": 4,
      "oQueE": "sobrecarga é declarar várias assinaturas para a mesma função, para o retorno depender do que entrou. `this: T` é um parâmetro falso que diz de quem a função é — some na chamada e só serve para o compilador conferir.",
      "quandoUsar": "sobrecarga quando o tipo do retorno MUDA conforme o argumento. `this: T` em função que vai virar método ou callback de evento.",
      "quandoNaoUsar": "sobrecarga quando uma união resolve. Duas assinaturas que devolvem o mesmo tipo não precisam de sobrecarga nenhuma.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O problema que a sobrecarga resolve",
        "secao": "ESSENCIAL",
        "codigo": "// Sem sobrecarga, o retorno é a união — e quem chama tem que conferir mesmo sabendo.\nfunction buscarSemSobrecarga(chave: string | number): string | number {\n  return typeof chave === 'string' ? chave.length : chave * 2;\n}\n\nconst semSobrecarga = buscarSemSobrecarga('caneca');\n// @ts-expect-error — Property 'toFixed' does not exist on type 'string | number'.\nconsole.log(semSobrecarga.toFixed(0));\nconsole.log('sem sobrecarga:', semSobrecarga, '← o tipo é string | number, e quem chama sofre');",
        "codigoJs": "function buscarSemSobrecarga(chave) {\n    return typeof chave === 'string' ? chave.length : chave * 2;\n}\nconst semSobrecarga = buscarSemSobrecarga('caneca');\nconsole.log(semSobrecarga.toFixed(0));\nconsole.log('sem sobrecarga:', semSobrecarga, '← o tipo é string | number, e quem chama sofre');\n"
       },
       {
        "n": 2,
        "titulo": "Com sobrecarga: o retorno segue a entrada",
        "secao": "ESSENCIAL",
        "codigo": "// As duas primeiras linhas são só assinaturas: somem no JavaScript gerado.\nfunction medir(valor: string): string;\nfunction medir(valor: number): number;\nfunction medir(valor: string | number): string | number {\n  return typeof valor === 'string' ? `${valor.length} letras` : Math.round(valor * 100) / 100;\n}\n\nconst comoTexto = medir('caneca');          // string\nconst comoNumero = medir(19.987);           // number\n\nconsole.log('texto :', comoTexto.toUpperCase());\nconsole.log('número:', comoNumero.toFixed(1));\n\n// @ts-expect-error — No overload matches this call.\nconsole.log(medir(true));\n\nconsole.log('\\nA implementação (a terceira linha) NÃO é uma assinatura pública: ninguém pode');\nconsole.log('chamar `medir(x: string | number)`. Só as duas declaradas acima valem.');",
        "codigoJs": "function medir(valor) {\n    return typeof valor === 'string' ? `${valor.length} letras` : Math.round(valor * 100) / 100;\n}\nconst comoTexto = medir('caneca');\nconst comoNumero = medir(19.987);\nconsole.log('texto :', comoTexto.toUpperCase());\nconsole.log('número:', comoNumero.toFixed(1));\nconsole.log(medir(true));\nconsole.log('\\nA implementação (a terceira linha) NÃO é uma assinatura pública: ninguém pode');\nconsole.log('chamar `medir(x: string | number)`. Só as duas declaradas acima valem.');\n"
       },
       {
        "n": 3,
        "titulo": "`this` tipado: a função sabe de quem ela é",
        "secao": "ESSENCIAL",
        "codigo": "type Carrinho = {\n  itens: { nome: string; preco: number }[];\n  total(): number;\n};\n\n// `this: Carrinho` é o primeiro parâmetro na declaração e não existe na chamada.\nfunction totalDoCarrinho(this: Carrinho): number {\n  return this.itens.reduce((soma, i) => soma + i.preco, 0);\n}\n\nconst carrinho: Carrinho = {\n  itens: [{ nome: 'Caneca', preco: 19.9 }, { nome: 'Caderno', preco: 32.5 }],\n  total: totalDoCarrinho,\n};\n\nconsole.log('total:', carrinho.total().toFixed(2));\n\n// Chamada solta, sem dono, a função não tem `this` — e o TypeScript avisa antes de rodar.\ntry {\n  // @ts-expect-error — The 'this' context of type 'void' is not assignable to method's 'this' of type 'Carrinho'.\n  console.log(totalDoCarrinho());\n} catch (erro) {\n  console.log('sem dono   :', (erro as Error).message);\n}\n\nconsole.log('\\nEsse é o bug clássico de `this` no JavaScript, transformado em erro de compilação.');",
        "codigoJs": "function totalDoCarrinho() {\n    return this.itens.reduce((soma, i)=>soma + i.preco, 0);\n}\nconst carrinho = {\n    itens: [\n        {\n            nome: 'Caneca',\n            preco: 19.9\n        },\n        {\n            nome: 'Caderno',\n            preco: 32.5\n        }\n    ],\n    total: totalDoCarrinho\n};\nconsole.log('total:', carrinho.total().toFixed(2));\ntry {\n    console.log(totalDoCarrinho());\n} catch (erro) {\n    console.log('sem dono   :', erro.message);\n}\nconsole.log('\\nEsse é o bug clássico de `this` no JavaScript, transformado em erro de compilação.');\n"
       },
       {
        "n": 4,
        "titulo": "Sobrecarga onde ela vale mesmo a pena",
        "secao": "NA PRÁTICA",
        "codigo": "type Aluno = { id: number; nome: string; nota: number };\n\nconst turma: Aluno[] = [\n  { id: 1, nome: 'Ana', nota: 9.2 },\n  { id: 2, nome: 'Bruno', nota: 6.4 },\n  { id: 3, nome: 'Carla', nota: 8.1 },\n];\n\n// Por id vem um aluno (ou undefined); por nota mínima vem uma lista. Tipos diferentes.\nfunction buscarAluno(id: number): Aluno | undefined;\nfunction buscarAluno(criterio: { notaMinima: number }): Aluno[];\nfunction buscarAluno(alvo: number | { notaMinima: number }): Aluno | undefined | Aluno[] {\n  if (typeof alvo === 'number') return turma.find((a) => a.id === alvo);\n  return turma.filter((a) => a.nota >= alvo.notaMinima);\n}\n\nconst porId = buscarAluno(2);\nconst aprovados = buscarAluno({ notaMinima: 7 });\n\nconsole.log('por id  :', porId?.nome ?? 'não achou');\nconsole.log('nota ≥ 7:', aprovados.map((a) => a.nome).join(', '), `(${aprovados.length})`);\n\n// Sem sobrecarga, `aprovados.map` não compilaria: o tipo seria a união dos três casos.\nconsole.log('\\nUse sobrecarga quando o RETORNO muda de forma. Quando só os parâmetros mudam');\nconsole.log('e a saída é a mesma, parâmetro opcional ou união resolvem com menos código.');",
        "codigoJs": "const turma = [\n    {\n        id: 1,\n        nome: 'Ana',\n        nota: 9.2\n    },\n    {\n        id: 2,\n        nome: 'Bruno',\n        nota: 6.4\n    },\n    {\n        id: 3,\n        nome: 'Carla',\n        nota: 8.1\n    }\n];\nfunction buscarAluno(alvo) {\n    if (typeof alvo === 'number') return turma.find((a)=>a.id === alvo);\n    return turma.filter((a)=>a.nota >= alvo.notaMinima);\n}\nconst porId = buscarAluno(2);\nconst aprovados = buscarAluno({\n    notaMinima: 7\n});\nconsole.log('por id  :', porId?.nome ?? 'não achou');\nconsole.log('nota ≥ 7:', aprovados.map((a)=>a.nome).join(', '), `(${aprovados.length})`);\nconsole.log('\\nUse sobrecarga quando o RETORNO muda de forma. Quando só os parâmetros mudam');\nconsole.log('e a saída é a mesma, parâmetro opcional ou união resolvem com menos código.');\n"
       },
       {
        "n": 5,
        "titulo": "`this` em callback de evento",
        "secao": "NA PRÁTICA",
        "codigo": "// É o caso do `addEventListener`: dentro do handler, `this` é o elemento que disparou.\ntype Botao = { rotulo: string; aoClicar(este: (this: Botao) => void): void };\n\nfunction criarBotao(rotulo: string): Botao {\n  const botao: Botao = {\n    rotulo,\n    aoClicar(handler) { handler.call(botao); },     // `call` amarra o this\n  };\n  return botao;\n}\n\nconst salvar = criarBotao('Salvar');\nsalvar.aoClicar(function (this: Botao) {\n  console.log(`clicou em \"${this.rotulo}\"`);\n});\n\n// Arrow function NÃO tem `this` próprio — por isso ela não serve neste lugar.\nsalvar.aoClicar(() => console.log('arrow: aqui `this` não é o botão, é o de fora'));\n\nconsole.log('\\nRegra: `function` quando você precisa do `this` de quem chamou; arrow quando');\nconsole.log('você quer justamente o `this` de fora (dentro de um método de classe, por exemplo).');",
        "codigoJs": "function criarBotao(rotulo) {\n    const botao = {\n        rotulo,\n        aoClicar (handler) {\n            handler.call(botao);\n        }\n    };\n    return botao;\n}\nconst salvar = criarBotao('Salvar');\nsalvar.aoClicar(function() {\n    console.log(`clicou em \"${this.rotulo}\"`);\n});\nsalvar.aoClicar(()=>console.log('arrow: aqui `this` não é o botão, é o de fora'));\nconsole.log('\\nRegra: `function` quando você precisa do `this` de quem chamou; arrow quando');\nconsole.log('você quer justamente o `this` de fora (dentro de um método de classe, por exemplo).');\n"
       },
       {
        "n": 6,
        "titulo": "`this` como tipo de retorno: a cadeia que sobrevive à herança",
        "secao": "NA PRÁTICA",
        "codigo": "// Devolver `this` (e não o nome da classe) faz o método continuar servindo na filha.\nclass Consulta {\n  protected partes: string[] = [];\n\n  onde(condicao: string): this { this.partes.push(`WHERE ${condicao}`); return this; }\n  ordenarPor(campo: string): this { this.partes.push(`ORDER BY ${campo}`); return this; }\n  montar(): string { return ['SELECT *', ...this.partes].join(' '); }\n}\n\nclass ConsultaPaginada extends Consulta {\n  limite(quantos: number): this { this.partes.push(`LIMIT ${quantos}`); return this; }\n}\n\n// Porque `onde` devolve `this`, e não `Consulta`, o `limite` continua acessível na cadeia.\nconst sql = new ConsultaPaginada().onde('ativo = 1').ordenarPor('nome').limite(10).montar();\nconsole.log(sql);\n\nconsole.log('\\nSe `onde` devolvesse `Consulta`, a cadeia perderia a filha no primeiro método —');\nconsole.log('e `.limite(10)` viraria erro de compilação. `this` como tipo é \"a classe de quem');\nconsole.log('chamou\", seja ela qual for.');",
        "codigoJs": "class Consulta {\n    partes = [];\n    onde(condicao) {\n        this.partes.push(`WHERE ${condicao}`);\n        return this;\n    }\n    ordenarPor(campo) {\n        this.partes.push(`ORDER BY ${campo}`);\n        return this;\n    }\n    montar() {\n        return [\n            'SELECT *',\n            ...this.partes\n        ].join(' ');\n    }\n}\nclass ConsultaPaginada extends Consulta {\n    limite(quantos) {\n        this.partes.push(`LIMIT ${quantos}`);\n        return this;\n    }\n}\nconst sql = new ConsultaPaginada().onde('ativo = 1').ordenarPor('nome').limite(10).montar();\nconsole.log(sql);\nconsole.log('\\nSe `onde` devolvesse `Consulta`, a cadeia perderia a filha no primeiro método —');\nconsole.log('e `.limite(10)` viraria erro de compilação. `this` como tipo é \"a classe de quem');\nconsole.log('chamou\", seja ela qual for.');\n"
       },
       {
        "n": 7,
        "titulo": "A implementação não confere as assinaturas",
        "secao": "PEGADINHAS",
        "codigo": "function formatar(valor: string): string;\nfunction formatar(valor: number): string;\n// A implementação promete `string` para os dois casos — mas quem garante é você.\nfunction formatar(valor: string | number): string {\n  if (typeof valor === 'number') return valor.toFixed(2);\n  return valor.trim();\n}\n\nconsole.log('número:', formatar(19.9));\nconsole.log('texto :', formatar('  caneca  ') + '|');\n\n// O buraco: a assinatura pode prometer algo que a implementação não cumpre, e o tsc aceita.\nfunction tamanho(valor: string): number;\nfunction tamanho(valor: unknown[]): number;\nfunction tamanho(valor: any): number {\n  return valor.length;             // `any` na implementação: ninguém confere mais nada\n}\n\nconsole.log('tamanho de texto:', tamanho('caneca'));\nconsole.log('tamanho de lista:', tamanho([1, 2, 3]));\n\nconsole.log('\\nÉ o preço da sobrecarga: a assinatura de implementação costuma virar `any` ou');\nconsole.log('uma união larga, e ali dentro a conferência afrouxa. Escreva pouco código nela.');",
        "codigoJs": "function formatar(valor) {\n    if (typeof valor === 'number') return valor.toFixed(2);\n    return valor.trim();\n}\nconsole.log('número:', formatar(19.9));\nconsole.log('texto :', formatar('  caneca  ') + '|');\nfunction tamanho(valor) {\n    return valor.length;\n}\nconsole.log('tamanho de texto:', tamanho('caneca'));\nconsole.log('tamanho de lista:', tamanho([\n    1,\n    2,\n    3\n]));\nconsole.log('\\nÉ o preço da sobrecarga: a assinatura de implementação costuma virar `any` ou');\nconsole.log('uma união larga, e ali dentro a conferência afrouxa. Escreva pouco código nela.');\n"
       }
      ],
      "resumo": [
       "Sobrecarga = várias assinaturas + uma implementação; só as assinaturas são chamáveis.",
       "Ela vale quando o TIPO DO RETORNO muda conforme o argumento — senão, use união.",
       "As assinaturas somem no JavaScript gerado: são declaração pura.",
       "`this: T` tipa o dono da função sem entrar na chamada; `: this` no retorno encadeia.",
       "Arrow function não tem `this` próprio; `function` tem. É o que decide qual usar.",
       "Dentro da implementação a conferência afrouxa — mantenha esse corpo curto."
      ]
     }
    ]
   },
   {
    "slug": "05-estreitar-tipos",
    "titulo": "Estreitar Tipos",
    "icone": "⇲",
    "cor": "#b48ef0",
    "resumo": "De um tipo largo para o certo: type guard e assertion.",
    "topicos": [
     {
      "slug": "01-type-guards",
      "arquivo": "typescript/src/05-estreitar-tipos/01-type-guards.ts",
      "comando": "node src/05-estreitar-tipos/01-type-guards.ts",
      "titulo": "Type guards",
      "sessao": 5,
      "oQueE": "uma conferência feita rodando que o TypeScript entende e usa para estreitar o tipo — depois do `if`, o valor deixa de ser \"um dos três\" e passa a ser um só.",
      "quandoUsar": "sempre que um valor for união, `unknown`, ou puder ser null/undefined. É o caminho normal de sair de um tipo largo para o certo.",
      "quandoNaoUsar": "no lugar de `as`. `as` finge; o type guard confere. Quando o dado vem de fora, só o type guard vale alguma coisa.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`typeof`: o guard dos primitivos",
        "secao": "ESSENCIAL",
        "codigo": "function formatarValor(valor: string | number | boolean): string {\n  if (typeof valor === 'number') return `R$ ${valor.toFixed(2)}`;   // aqui é number\n  if (typeof valor === 'boolean') return valor ? 'sim' : 'não';     // aqui é boolean\n  return valor.trim().toUpperCase();                                // sobrou string\n}\n\nconsole.log(formatarValor(19.9));\nconsole.log(formatarValor(true));\nconsole.log(formatarValor('  pix  '));\n\n// O TypeScript acompanha a eliminação: na última linha, `boolean` e `number` já saíram.\n// @ts-expect-error — Property 'toFixed' does not exist on type 'string | number | boolean'.\nconsole.log((19.9 as string | number | boolean).toFixed(2));",
        "codigoJs": "function formatarValor(valor) {\n    if (typeof valor === 'number') return `R$ ${valor.toFixed(2)}`;\n    if (typeof valor === 'boolean') return valor ? 'sim' : 'não';\n    return valor.trim().toUpperCase();\n}\nconsole.log(formatarValor(19.9));\nconsole.log(formatarValor(true));\nconsole.log(formatarValor('  pix  '));\nconsole.log(19.9.toFixed(2));\n"
       },
       {
        "n": 2,
        "titulo": "`in`: existe esta chave no objeto?",
        "secao": "ESSENCIAL",
        "codigo": "type PagamentoPix = { valor: number; chavePix: string };\ntype PagamentoCartao = { valor: number; bandeira: string; parcelas: number };\n\nfunction descreverPagamento(pagamento: PagamentoPix | PagamentoCartao): string {\n  if ('chavePix' in pagamento) return `pix para ${pagamento.chavePix}`;\n  return `${pagamento.bandeira} em ${pagamento.parcelas}x`;\n}\n\nconsole.log(descreverPagamento({ valor: 200, chavePix: 'ana@loja.dev' }));\nconsole.log(descreverPagamento({ valor: 200, bandeira: 'Visa', parcelas: 3 }));\n\n// @ts-expect-error — Property 'bandeira' does not exist on type 'PagamentoPix | PagamentoCartao'.\nconsole.log(({ valor: 200, chavePix: 'x' } as PagamentoPix | PagamentoCartao).bandeira);\n\nconsole.log('\\n`in` serve para união de objetos sem campo em comum que os separe. Quando dá');\nconsole.log('para acrescentar um campo `tipo`, a união discriminada lê melhor (tema 03).');",
        "codigoJs": "function descreverPagamento(pagamento) {\n    if ('chavePix' in pagamento) return `pix para ${pagamento.chavePix}`;\n    return `${pagamento.bandeira} em ${pagamento.parcelas}x`;\n}\nconsole.log(descreverPagamento({\n    valor: 200,\n    chavePix: 'ana@loja.dev'\n}));\nconsole.log(descreverPagamento({\n    valor: 200,\n    bandeira: 'Visa',\n    parcelas: 3\n}));\nconsole.log({\n    valor: 200,\n    chavePix: 'x'\n}.bandeira);\nconsole.log('\\n`in` serve para união de objetos sem campo em comum que os separe. Quando dá');\nconsole.log('para acrescentar um campo `tipo`, a união discriminada lê melhor (tema 03).');\n"
       },
       {
        "n": 3,
        "titulo": "`instanceof` e a conferência de null",
        "secao": "ESSENCIAL",
        "codigo": "function quandoAconteceu(quando: Date | string | null): string {\n  if (quando === null) return 'nunca';                    // tira o null\n  if (quando instanceof Date) return quando.toISOString().slice(0, 10);\n  return quando.padStart(10, '0');                        // sobrou string\n}\n\nconsole.log(quandoAconteceu(new Date('2026-08-28T12:00:00Z')));\nconsole.log(quandoAconteceu('28/08'));\nconsole.log(quandoAconteceu(null));\n\n// A conferência de \"existe\" também é guard — e cobre null E undefined de uma vez.\nfunction primeiroNome(nomeCompleto: string | null | undefined): string {\n  if (!nomeCompleto) return 'sem nome';\n  return nomeCompleto.split(' ')[0];\n}\n\nconsole.log(primeiroNome('Ana Souza'), '·', primeiroNome(null), '·', primeiroNome(undefined));\n\nconsole.log('\\nCuidado com `if (!valor)`: ele também derruba `0` e `\"\"`. Para número e texto,');\nconsole.log('escreva `valor !== undefined` ou `valor != null`, que pega os dois vazios.');",
        "codigoJs": "function quandoAconteceu(quando) {\n    if (quando === null) return 'nunca';\n    if (quando instanceof Date) return quando.toISOString().slice(0, 10);\n    return quando.padStart(10, '0');\n}\nconsole.log(quandoAconteceu(new Date('2026-08-28T12:00:00Z')));\nconsole.log(quandoAconteceu('28/08'));\nconsole.log(quandoAconteceu(null));\nfunction primeiroNome(nomeCompleto) {\n    if (!nomeCompleto) return 'sem nome';\n    return nomeCompleto.split(' ')[0];\n}\nconsole.log(primeiroNome('Ana Souza'), '·', primeiroNome(null), '·', primeiroNome(undefined));\nconsole.log('\\nCuidado com `if (!valor)`: ele também derruba `0` e `\"\"`. Para número e texto,');\nconsole.log('escreva `valor !== undefined` ou `valor != null`, que pega os dois vazios.');\n"
       },
       {
        "n": 4,
        "titulo": "Guard escrito por você: `valor is Tipo`",
        "secao": "NA PRÁTICA",
        "codigo": "type Aluno = { nome: string; matricula: string };\n\n// A assinatura `x is Aluno` é o que faz o TypeScript acreditar no resultado do `if`.\nfunction ehAluno(valor: unknown): valor is Aluno {\n  return (\n    typeof valor === 'object' && valor !== null &&\n    typeof (valor as Aluno).nome === 'string' &&\n    typeof (valor as Aluno).matricula === 'string'\n  );\n}\n\nconst vindosDaApi: unknown[] = [\n  { nome: 'Ana', matricula: 'A-1042' },\n  { nome: 'Bruno' },\n  'texto solto',\n  null,\n];\n\nfor (const item of vindosDaApi) {\n  // Sem o guard, `item.nome` nem compilaria: `item` é unknown.\n  if (ehAluno(item)) console.log('✓', item.matricula, item.nome);\n  else console.log('✕ ignorado:', JSON.stringify(item));\n}\n\nconsole.log('\\nEste é o padrão para tudo que chega de fetch, JSON.parse ou formulário: uma');\nconsole.log('função que CONFERE rodando e devolve `x is T`. É o `as` feito direito.');",
        "codigoJs": "function ehAluno(valor) {\n    return typeof valor === 'object' && valor !== null && typeof valor.nome === 'string' && typeof valor.matricula === 'string';\n}\nconst vindosDaApi = [\n    {\n        nome: 'Ana',\n        matricula: 'A-1042'\n    },\n    {\n        nome: 'Bruno'\n    },\n    'texto solto',\n    null\n];\nfor (const item of vindosDaApi){\n    if (ehAluno(item)) console.log('✓', item.matricula, item.nome);\n    else console.log('✕ ignorado:', JSON.stringify(item));\n}\nconsole.log('\\nEste é o padrão para tudo que chega de fetch, JSON.parse ou formulário: uma');\nconsole.log('função que CONFERE rodando e devolve `x is T`. É o `as` feito direito.');\n"
       },
       {
        "n": 5,
        "titulo": "Guard num filter, que é onde ele mais rende",
        "secao": "NA PRÁTICA",
        "codigo": "type Contato = { nome: string; email: string | null };\n\nconst contatos: Contato[] = [\n  { nome: 'Ana', email: 'ana@loja.dev' },\n  { nome: 'Bruno', email: null },\n  { nome: 'Carla', email: 'carla@loja.dev' },\n];\n\nconst emails = contatos.map((c) => c.email);                       // (string | null)[]\n// @ts-expect-error — 'emails[0]' is possibly 'null'.\nconsole.log(emails[0].toUpperCase());\n\n// Um filter comum não estreita o tipo: o TypeScript não sabe o que o callback conferiu.\nconst filtradoComum = emails.filter((e) => e !== null);            // string[] desde o TS 5.5\nconsole.log('filtrado:', filtradoComum.join(', '));\n\n// Em versão antiga (ou em caso mais complicado), o guard resolve explicitamente:\nconst naoEhNulo = (valor: string | null): valor is string => valor !== null;\nconsole.log('com guard:', emails.filter(naoEhNulo).map((e) => e.toUpperCase()).join(', '));\n\nconsole.log('\\nDesde o TypeScript 5.5 o `filter` simples já estreita sozinho em muitos casos.');\nconsole.log('O guard nomeado continua valendo para o que ele não alcança — e para reaproveitar.');",
        "codigoJs": "const contatos = [\n    {\n        nome: 'Ana',\n        email: 'ana@loja.dev'\n    },\n    {\n        nome: 'Bruno',\n        email: null\n    },\n    {\n        nome: 'Carla',\n        email: 'carla@loja.dev'\n    }\n];\nconst emails = contatos.map((c)=>c.email);\nconsole.log(emails[0].toUpperCase());\nconst filtradoComum = emails.filter((e)=>e !== null);\nconsole.log('filtrado:', filtradoComum.join(', '));\nconst naoEhNulo = (valor)=>valor !== null;\nconsole.log('com guard:', emails.filter(naoEhNulo).map((e)=>e.toUpperCase()).join(', '));\nconsole.log('\\nDesde o TypeScript 5.5 o `filter` simples já estreita sozinho em muitos casos.');\nconsole.log('O guard nomeado continua valendo para o que ele não alcança — e para reaproveitar.');\n"
       },
       {
        "n": 6,
        "titulo": "O guard mente, e o TypeScript acredita",
        "secao": "PEGADINHAS",
        "codigo": "type Produto = { sku: string; preco: number };\n\n// Este guard só confere `sku`. Ele PROMETE Produto e entrega qualquer coisa com sku.\nfunction ehProdutoMalFeito(valor: unknown): valor is Produto {\n  return typeof valor === 'object' && valor !== null && 'sku' in valor;\n}\n\nconst suspeito: unknown = { sku: 'CAN-01' };            // sem preço\n\nif (ehProdutoMalFeito(suspeito)) {\n  console.log('o tsc garante: preco é number');\n  console.log('a realidade  :', suspeito.preco);\n  try {\n    console.log(suspeito.preco.toFixed(2));\n  } catch (erro) {\n    console.log('e estourou   :', (erro as Error).message);\n  }\n}\n\nconsole.log('\\n`x is T` não é conferido pelo compilador: é uma promessa sua, igual ao `as`.');\nconsole.log('A diferença é que o guard tem um lugar óbvio para conferir de verdade — use-o.');",
        "codigoJs": "function ehProdutoMalFeito(valor) {\n    return typeof valor === 'object' && valor !== null && 'sku' in valor;\n}\nconst suspeito = {\n    sku: 'CAN-01'\n};\nif (ehProdutoMalFeito(suspeito)) {\n    console.log('o tsc garante: preco é number');\n    console.log('a realidade  :', suspeito.preco);\n    try {\n        console.log(suspeito.preco.toFixed(2));\n    } catch (erro) {\n        console.log('e estourou   :', erro.message);\n    }\n}\nconsole.log('\\n`x is T` não é conferido pelo compilador: é uma promessa sua, igual ao `as`.');\nconsole.log('A diferença é que o guard tem um lugar óbvio para conferir de verdade — use-o.');\n"
       },
       {
        "n": 7,
        "titulo": "`typeof null` é \"object\"",
        "secao": "PEGADINHAS",
        "codigo": "function contarChaves(valor: object | null): number {\n  // Sem a conferência de null, esta linha estouraria: `typeof null === \"object\"`.\n  if (valor === null) return 0;\n  return Object.keys(valor).length;\n}\n\nconsole.log('objeto:', contarChaves({ a: 1, b: 2 }));\nconsole.log('null  :', contarChaves(null));\nconsole.log('typeof null é:', typeof null, '← o bug mais antigo do JavaScript, ainda aqui');\n\nconsole.log('\\nPor isso todo guard de objeto tem duas partes: `typeof x === \"object\"` E');\nconsole.log('`x !== null`. Esquecer a segunda é o erro mais comum ao escrever guard na mão.');",
        "codigoJs": "function contarChaves(valor) {\n    if (valor === null) return 0;\n    return Object.keys(valor).length;\n}\nconsole.log('objeto:', contarChaves({\n    a: 1,\n    b: 2\n}));\nconsole.log('null  :', contarChaves(null));\nconsole.log('typeof null é:', typeof null, '← o bug mais antigo do JavaScript, ainda aqui');\nconsole.log('\\nPor isso todo guard de objeto tem duas partes: `typeof x === \"object\"` E');\nconsole.log('`x !== null`. Esquecer a segunda é o erro mais comum ao escrever guard na mão.');\n"
       }
      ],
      "resumo": [
       "`typeof` para primitivo, `instanceof` para classe, `in` para chave de objeto.",
       "Depois do `if`, o tipo estreita — e o `else` fica com o que sobrou.",
       "`if (!valor)` também derruba 0 e ''; prefira `valor != null` quando for isso que você quer.",
       "`função(x): x is T` é o guard escrito por você — o jeito certo de validar dado de fora.",
       "Guard nomeado é o que faz `filter` devolver a lista já estreitada.",
       "`x is T` é promessa, não prova: se o guard mentir, o erro volta a ser de execução."
      ]
     },
     {
      "slug": "02-assertions-e-structural",
      "arquivo": "typescript/src/05-estreitar-tipos/02-assertions-e-structural.ts",
      "comando": "node src/05-estreitar-tipos/02-assertions-e-structural.ts",
      "titulo": "Type assertions e tipagem estrutural",
      "sessao": 5,
      "oQueE": "`as` é você afirmando um tipo que o compilador não conseguiu deduzir. Tipagem estrutural é a regra que decide o que encaixa em quê: não é o NOME do tipo que importa, é o formato.",
      "quandoUsar": "`as` quando você sabe mais do que o compilador e não há como provar (o retorno de `querySelector`, uma constante congelada).",
      "quandoNaoUsar": "`as` para calar um erro. Se o tipo não bate, ou o tipo está errado ou o código está — e `as` não conserta nenhum dos dois.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`as`: quando você sabe mais que o compilador",
        "secao": "ESSENCIAL",
        "codigo": "const configuracaoBruta = JSON.parse('{\"porta\":3000,\"host\":\"localhost\"}');\nconsole.log('sem as, o tipo é any:', typeof configuracaoBruta.porta, configuracaoBruta.porta);\n\ntype Configuracao = { porta: number; host: string };\nconst configuracao = JSON.parse('{\"porta\":3000,\"host\":\"localhost\"}') as Configuracao;\n\nconsole.log(`servidor em ${configuracao.host}:${configuracao.porta}`);\nconsole.log('agora o editor completa:', configuracao.host.toUpperCase());\n\n// @ts-expect-error — Property 'protocolo' does not exist on type 'Configuracao'.\nconsole.log(configuracao.protocolo);\n\nconsole.log('\\n`as` não converte nada e não confere nada: ele só troca o que o compilador');\nconsole.log('acha que aquilo é. O valor rodando continua exatamente o mesmo.');",
        "codigoJs": "const configuracaoBruta = JSON.parse('{\"porta\":3000,\"host\":\"localhost\"}');\nconsole.log('sem as, o tipo é any:', typeof configuracaoBruta.porta, configuracaoBruta.porta);\nconst configuracao = JSON.parse('{\"porta\":3000,\"host\":\"localhost\"}');\nconsole.log(`servidor em ${configuracao.host}:${configuracao.porta}`);\nconsole.log('agora o editor completa:', configuracao.host.toUpperCase());\nconsole.log(configuracao.protocolo);\nconsole.log('\\n`as` não converte nada e não confere nada: ele só troca o que o compilador');\nconsole.log('acha que aquilo é. O valor rodando continua exatamente o mesmo.');\n"
       },
       {
        "n": 2,
        "titulo": "`as` não é conversão",
        "secao": "ESSENCIAL",
        "codigo": "const textoNumerico = '42';\n\nconst fingindo = textoNumerico as unknown as number;   // o tsc aceita, o valor não muda\nconsole.log('typeof fingindo:', typeof fingindo, '← ainda é string');\nconsole.log('fingindo + 1   :', fingindo + 1, '← \"421\", porque é concatenação');\n\nconst convertendo = Number(textoNumerico);             // isto sim converte, rodando\nconsole.log('typeof convertendo:', typeof convertendo);\nconsole.log('convertendo + 1   :', convertendo + 1);\n\n// O TypeScript nem deixa fazer o `as` direto entre tipos que não se encontram.\n// @ts-expect-error — Conversion of type 'string' to type 'number' may be a mistake.\nconst direto = textoNumerico as number;\nconsole.log('e mesmo assim, rodando:', typeof direto);\n\nconsole.log('\\nQuando você precisa do `as unknown as X` para o compilador aceitar, é sinal de');\nconsole.log('que você está mentindo duas vezes. Quase sempre falta uma conversão de verdade.');",
        "codigoJs": "const textoNumerico = '42';\nconst fingindo = textoNumerico;\nconsole.log('typeof fingindo:', typeof fingindo, '← ainda é string');\nconsole.log('fingindo + 1   :', fingindo + 1, '← \"421\", porque é concatenação');\nconst convertendo = Number(textoNumerico);\nconsole.log('typeof convertendo:', typeof convertendo);\nconsole.log('convertendo + 1   :', convertendo + 1);\nconst direto = textoNumerico;\nconsole.log('e mesmo assim, rodando:', typeof direto);\nconsole.log('\\nQuando você precisa do `as unknown as X` para o compilador aceitar, é sinal de');\nconsole.log('que você está mentindo duas vezes. Quase sempre falta uma conversão de verdade.');\n"
       },
       {
        "n": 3,
        "titulo": "Tipagem estrutural: o formato manda, não o nome",
        "secao": "ESSENCIAL",
        "codigo": "type Ponto = { x: number; y: number };\ntype Coordenada = { x: number; y: number };            // outro nome, mesmo formato\n\nconst ponto: Ponto = { x: 3, y: 4 };\nconst coordenada: Coordenada = ponto;                  // encaixa: o formato é o mesmo\n\nconsole.log('distância:', Math.hypot(coordenada.x, coordenada.y));\n\n// Um objeto com campos A MAIS também encaixa — desde que não seja literal na hora.\nconst pontoTridimensional = { x: 1, y: 2, z: 3 };\nconst comoPonto: Ponto = pontoTridimensional;\nconsole.log('aceitou o z sobrando:', JSON.stringify(comoPonto));\n\n// Mas literal escrito na hora é conferido de perto: é a \"excess property check\".\n// @ts-expect-error — Object literal may only specify known properties.\nconst literal: Ponto = { x: 1, y: 2, z: 3 };\nconsole.log('literal, rodando:', Object.keys(literal).join(','));\n\nconsole.log('\\nEm Java ou C#, `Ponto` e `Coordenada` seriam tipos diferentes. No TypeScript,');\nconsole.log('se o formato serve, encaixa — inclusive vindo de uma classe que você nem conhece.');",
        "codigoJs": "const ponto = {\n    x: 3,\n    y: 4\n};\nconst coordenada = ponto;\nconsole.log('distância:', Math.hypot(coordenada.x, coordenada.y));\nconst pontoTridimensional = {\n    x: 1,\n    y: 2,\n    z: 3\n};\nconst comoPonto = pontoTridimensional;\nconsole.log('aceitou o z sobrando:', JSON.stringify(comoPonto));\nconst literal = {\n    x: 1,\n    y: 2,\n    z: 3\n};\nconsole.log('literal, rodando:', Object.keys(literal).join(','));\nconsole.log('\\nEm Java ou C#, `Ponto` e `Coordenada` seriam tipos diferentes. No TypeScript,');\nconsole.log('se o formato serve, encaixa — inclusive vindo de uma classe que você nem conhece.');\n"
       },
       {
        "n": 4,
        "titulo": "`as const`: a constante que vira contrato",
        "secao": "NA PRÁTICA",
        "codigo": "const ROTAS = {\n  home: '/',\n  alunos: '/alunos',\n  pedidos: '/pedidos',\n} as const;\n\ntype Rota = (typeof ROTAS)[keyof typeof ROTAS];        // '/' | '/alunos' | '/pedidos'\n\nfunction navegar(rota: Rota): string { return `GET ${rota}`; }\n\nconsole.log(navegar(ROTAS.alunos));\nconsole.log(navegar('/pedidos'));\n\n// @ts-expect-error — Argument of type '\"/relatorios\"' is not assignable to parameter of type 'Rota'.\nconsole.log(navegar('/relatorios'));\n\nconsole.log('\\nA lista de rotas está escrita UMA vez. O tipo sai dela, e uma rota nova entra');\nconsole.log('no tipo sozinha. É o uso mais rentável de `as const` que existe.');",
        "codigoJs": "const ROTAS = {\n    home: '/',\n    alunos: '/alunos',\n    pedidos: '/pedidos'\n};\nfunction navegar(rota) {\n    return `GET ${rota}`;\n}\nconsole.log(navegar(ROTAS.alunos));\nconsole.log(navegar('/pedidos'));\nconsole.log(navegar('/relatorios'));\nconsole.log('\\nA lista de rotas está escrita UMA vez. O tipo sai dela, e uma rota nova entra');\nconsole.log('no tipo sozinha. É o uso mais rentável de `as const` que existe.');\n"
       },
       {
        "n": 5,
        "titulo": "`satisfies`: confere o formato sem trocar o tipo",
        "secao": "NA PRÁTICA",
        "codigo": "type Ambiente = { url: string; timeout: number };\n\n// Com `:`, o valor entra no molde e sai com o tipo do MOLDE. As chaves que você escreveu somem.\nconst AMBIENTES_ANOTADOS: Record<string, Ambiente> = {\n  producao: { url: 'https://api.loja.dev', timeout: 5000 },\n  local: { url: 'http://localhost:3000', timeout: 1000 },\n};\n\n// Para o tipo, toda chave existe. O erro de digitação passa e só estoura rodando.\ntry {\n  console.log(AMBIENTES_ANOTADOS.homologacao.url);\n} catch (erro) {\n  console.log('com anotação:', (erro as Error).message, '← e o tsc não viu nada');\n}\n\n// Com `satisfies`, o TypeScript confere e vai embora: o tipo continua sendo o do objeto.\nconst AMBIENTES = {\n  producao: { url: 'https://api.loja.dev', timeout: 5000 },\n  local: { url: 'http://localhost:3000', timeout: 1000 },\n} satisfies Record<string, Ambiente>;\n\ntry {\n  // @ts-expect-error — Property 'homologacao' does not exist on type '{ producao: ...; local: ...; }'.\n  console.log(AMBIENTES.homologacao.url);\n} catch (erro) {\n  console.log('com satisfies:', (erro as Error).message, '← mas o tsc já tinha apontado');\n}\n\ntype NomeDeAmbiente = keyof typeof AMBIENTES;          // 'producao' | 'local'\nconst ambienteAtual: NomeDeAmbiente = 'local';\nconsole.log('chaves de verdade:', ambienteAtual, '→', AMBIENTES[ambienteAtual].url);\n\n// E ele continua conferindo o formato — errar o tipo do campo é erro na hora, como no `:`.\n// @ts-expect-error — Type 'string' is not assignable to type 'number'.\nconst AMBIENTE_RUIM = { local: { url: 'http://localhost:3000', timeout: '1s' } } satisfies Record<string, Ambiente>;\nconsole.log('rodando mesmo assim:', JSON.stringify(AMBIENTE_RUIM));\n\nconsole.log('\\n`:` confere e TROCA o tipo. `as` troca SEM conferir. `satisfies` confere e NÃO troca —');\nconsole.log('é o único dos três que deixa `keyof typeof` enxergar as chaves que você escreveu.');",
        "codigoJs": "const AMBIENTES_ANOTADOS = {\n    producao: {\n        url: 'https://api.loja.dev',\n        timeout: 5000\n    },\n    local: {\n        url: 'http://localhost:3000',\n        timeout: 1000\n    }\n};\ntry {\n    console.log(AMBIENTES_ANOTADOS.homologacao.url);\n} catch (erro) {\n    console.log('com anotação:', erro.message, '← e o tsc não viu nada');\n}\nconst AMBIENTES = {\n    producao: {\n        url: 'https://api.loja.dev',\n        timeout: 5000\n    },\n    local: {\n        url: 'http://localhost:3000',\n        timeout: 1000\n    }\n};\ntry {\n    console.log(AMBIENTES.homologacao.url);\n} catch (erro) {\n    console.log('com satisfies:', erro.message, '← mas o tsc já tinha apontado');\n}\nconst ambienteAtual = 'local';\nconsole.log('chaves de verdade:', ambienteAtual, '→', AMBIENTES[ambienteAtual].url);\nconst AMBIENTE_RUIM = {\n    local: {\n        url: 'http://localhost:3000',\n        timeout: '1s'\n    }\n};\nconsole.log('rodando mesmo assim:', JSON.stringify(AMBIENTE_RUIM));\nconsole.log('\\n`:` confere e TROCA o tipo. `as` troca SEM conferir. `satisfies` confere e NÃO troca —');\nconsole.log('é o único dos três que deixa `keyof typeof` enxergar as chaves que você escreveu.');\n"
       },
       {
        "n": 6,
        "titulo": "Estrutural é o que faz \"dependência\" ficar barata",
        "secao": "NA PRÁTICA",
        "codigo": "// A função só pede o formato de que precisa. Qualquer objeto que o cumpra serve.\ntype RegistradorDeLog = { info(mensagem: string): void };\n\nfunction processarPedido(id: number, log: RegistradorDeLog): void {\n  log.info(`processando pedido ${id}`);\n  log.info(`pedido ${id} concluído`);\n}\n\n// O de produção...\nconst logDoConsole: RegistradorDeLog = { info: (m) => console.log(`[info] ${m}`) };\n// ...e o de teste, que não precisa herdar nem implementar nada.\nconst linhasCapturadas: string[] = [];\nconst logDeTeste = { info: (m: string) => { linhasCapturadas.push(m); } };\n\nprocessarPedido(1042, logDoConsole);\nprocessarPedido(1043, logDeTeste);\n\nconsole.log('capturado no teste:', linhasCapturadas.length, 'linhas ·', linhasCapturadas[0]);\n\nconsole.log('\\nNenhum `implements`, nenhuma classe. O objeto de teste encaixa porque tem o');\nconsole.log('método certo — e é por isso que testar TypeScript costuma dar pouco trabalho.');",
        "codigoJs": "function processarPedido(id, log) {\n    log.info(`processando pedido ${id}`);\n    log.info(`pedido ${id} concluído`);\n}\nconst logDoConsole = {\n    info: (m)=>console.log(`[info] ${m}`)\n};\nconst linhasCapturadas = [];\nconst logDeTeste = {\n    info: (m)=>{\n        linhasCapturadas.push(m);\n    }\n};\nprocessarPedido(1042, logDoConsole);\nprocessarPedido(1043, logDeTeste);\nconsole.log('capturado no teste:', linhasCapturadas.length, 'linhas ·', linhasCapturadas[0]);\nconsole.log('\\nNenhum `implements`, nenhuma classe. O objeto de teste encaixa porque tem o');\nconsole.log('método certo — e é por isso que testar TypeScript costuma dar pouco trabalho.');\n"
       },
       {
        "n": 7,
        "titulo": "`as` esconde o erro até a hora errada",
        "secao": "PEGADINHAS",
        "codigo": "type UsuarioCompleto = { id: number; nome: string; email: string };\n\n// O servidor devolveu menos campos do que o tipo promete. O `as` engole isso calado.\nconst parcial = JSON.parse('{\"id\":7,\"nome\":\"Ana\"}') as UsuarioCompleto;\n\nconsole.log('id e nome  :', parcial.id, parcial.nome);\nconsole.log('email      :', parcial.email, '← undefined, e o tipo jurava que era string');\ntry {\n  console.log(parcial.email.toLowerCase());\n} catch (erro) {\n  console.log('e estourou :', (erro as Error).message);\n}\n\nconsole.log('\\nO erro não some com `as` — ele muda de lugar, e de hora. Sai da linha do');\nconsole.log('`JSON.parse`, onde seria fácil tratar, e vai para onde alguém usou o campo.');\nconsole.log('Dado de fora pede type guard (tópico anterior), não asserção.');",
        "codigoJs": "const parcial = JSON.parse('{\"id\":7,\"nome\":\"Ana\"}');\nconsole.log('id e nome  :', parcial.id, parcial.nome);\nconsole.log('email      :', parcial.email, '← undefined, e o tipo jurava que era string');\ntry {\n    console.log(parcial.email.toLowerCase());\n} catch (erro) {\n    console.log('e estourou :', erro.message);\n}\nconsole.log('\\nO erro não some com `as` — ele muda de lugar, e de hora. Sai da linha do');\nconsole.log('`JSON.parse`, onde seria fácil tratar, e vai para onde alguém usou o campo.');\nconsole.log('Dado de fora pede type guard (tópico anterior), não asserção.');\n"
       },
       {
        "n": 8,
        "titulo": "Objeto vazio encaixa em quase tudo",
        "secao": "PEGADINHAS",
        "codigo": "type Filtros = { termo?: string; ativo?: boolean; limite?: number };\n\nconst nenhumFiltro: Filtros = {};                      // todos opcionais: `{}` serve\nconsole.log('sem filtro:', JSON.stringify(nenhumFiltro));\n\n// E o contrário também: um objeto com tudo cabe num tipo que não pede nada.\nconst qualquerCoisa: object = { a: 1, b: 2 };\nconsole.log('em object :', JSON.stringify(qualquerCoisa));\n\n// Por isso um tipo só de campos opcionais protege menos do que parece.\nfunction buscar(filtros: Filtros): string {\n  return `termo=${filtros.termo ?? '*'} ativo=${filtros.ativo ?? '*'} limite=${filtros.limite ?? 10}`;\n}\nconsole.log(buscar({}));\n\n// @ts-expect-error — Object literal may only specify known properties. Did you mean 'termo'?\nconsole.log(buscar({ term: 'ana' }));\n\nconsole.log('\\nA única defesa de um tipo todo opcional é a conferência de propriedade a mais.');\nconsole.log('Ela vale para literal escrito na chamada — e some se o objeto vier de uma variável.');",
        "codigoJs": "const nenhumFiltro = {};\nconsole.log('sem filtro:', JSON.stringify(nenhumFiltro));\nconst qualquerCoisa = {\n    a: 1,\n    b: 2\n};\nconsole.log('em object :', JSON.stringify(qualquerCoisa));\nfunction buscar(filtros) {\n    return `termo=${filtros.termo ?? '*'} ativo=${filtros.ativo ?? '*'} limite=${filtros.limite ?? 10}`;\n}\nconsole.log(buscar({}));\nconsole.log(buscar({\n    term: 'ana'\n}));\nconsole.log('\\nA única defesa de um tipo todo opcional é a conferência de propriedade a mais.');\nconsole.log('Ela vale para literal escrito na chamada — e some se o objeto vier de uma variável.');\n"
       }
      ],
      "resumo": [
       "`as` troca o que o compilador acha; não converte, não confere e não protege.",
       "`as unknown as X` é sinal de que falta uma conversão de verdade.",
       "O TypeScript é estrutural: encaixa quem tem o formato, não quem tem o nome.",
       "Literal escrito na hora é conferido de perto e recusa chave a mais; variável, não.",
       "`as const` gera a união sem repetir a lista; `satisfies` confere sem alargar o tipo.",
       "Para dado que vem de fora, `as` adia o erro — type guard resolve."
      ]
     }
    ]
   },
   {
    "slug": "06-classes",
    "titulo": "Classes Tipadas",
    "icone": "⬢",
    "cor": "#f78fb3",
    "resumo": "private, herança, abstract, implements e as relações entre classes.",
    "topicos": [
     {
      "slug": "01-modificadores-de-acesso",
      "arquivo": "typescript/src/06-classes/01-modificadores-de-acesso.ts",
      "comando": "node --experimental-transform-types src/06-classes/01-modificadores-de-acesso.ts",
      "titulo": "Modificadores de acesso",
      "sessao": 6,
      "oQueE": "`public`, `private`, `protected` e `readonly` — quem pode ler e escrever cada campo de uma classe. E a propriedade de parâmetro, que declara o campo no próprio construtor.",
      "quandoUsar": "`private` por padrão em tudo que é detalhe interno; abra em `public` só o que a classe promete a quem usa; `protected` em classe feita para ser estendida, no que a filha precisa e o mundo não.",
      "quandoNaoUsar": "não confunda com segurança. `private` é conferência de compilação; o `#campo` do JavaScript é o que existe de verdade rodando.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "public, private e readonly",
        "secao": "ESSENCIAL",
        "codigo": "class ContaCorrente {\n  public readonly titular: string;      // qualquer um lê, ninguém troca\n  private saldo: number;                // só a própria classe enxerga\n\n  constructor(titular: string, saldoInicial: number) {\n    this.titular = titular;\n    this.saldo = saldoInicial;\n  }\n\n  depositar(valor: number): void { this.saldo += valor; }\n  extrato(): string { return `${this.titular}: R$ ${this.saldo.toFixed(2)}`; }\n}\n\nconst conta = new ContaCorrente('Ana Souza', 250);\nconta.depositar(100);\nconsole.log(conta.extrato());\nconsole.log('titular:', conta.titular);\n\n// @ts-expect-error — Property 'saldo' is private and only accessible within class 'ContaCorrente'.\nconsole.log(conta.saldo);\n\n// @ts-expect-error — Cannot assign to 'titular' because it is a read-only property.\nconta.titular = 'Outra pessoa';\n\nconsole.log('rodando, os dois estão lá:', JSON.stringify(conta));",
        "codigoJs": "class ContaCorrente {\n    titular;\n    saldo;\n    constructor(titular, saldoInicial){\n        this.titular = titular;\n        this.saldo = saldoInicial;\n    }\n    depositar(valor) {\n        this.saldo += valor;\n    }\n    extrato() {\n        return `${this.titular}: R$ ${this.saldo.toFixed(2)}`;\n    }\n}\nconst conta = new ContaCorrente('Ana Souza', 250);\nconta.depositar(100);\nconsole.log(conta.extrato());\nconsole.log('titular:', conta.titular);\nconsole.log(conta.saldo);\nconta.titular = 'Outra pessoa';\nconsole.log('rodando, os dois estão lá:', JSON.stringify(conta));\n"
       },
       {
        "n": 2,
        "titulo": "Propriedade de parâmetro: o atalho do construtor",
        "secao": "ESSENCIAL",
        "codigo": "// Escrever o campo, o parâmetro e a atribuição é a mesma coisa três vezes. O modificador\n// no parâmetro faz as três de uma vez.\nclass Produto {\n  constructor(\n    public readonly sku: string,\n    public nome: string,\n    private precoDeCusto: number,\n  ) {}\n\n  precoDeVenda(margem: number): number { return this.precoDeCusto * (1 + margem); }\n}\n\nconst caneca = new Produto('CAN-01', 'Caneca', 8);\nconsole.log(`${caneca.sku} ${caneca.nome}: R$ ${caneca.precoDeVenda(1.5).toFixed(2)}`);\n\n// @ts-expect-error — Property 'precoDeCusto' is private.\nconsole.log(caneca.precoDeCusto);\n\nconsole.log('campos criados:', Object.keys(caneca).join(', '));\nconsole.log('\\nSem modificador nenhum, o parâmetro seria só um parâmetro: nada de campo.');\nconsole.log('É por isso que os quatro arquivos deste tema pedem a flag no `node`: o atalho');\nconsole.log('não é tipo que se apague, é código que precisa ser gerado.');",
        "codigoJs": "class Produto {\n    sku;\n    nome;\n    precoDeCusto;\n    constructor(sku, nome, precoDeCusto){\n        this.sku = sku;\n        this.nome = nome;\n        this.precoDeCusto = precoDeCusto;\n    }\n    precoDeVenda(margem) {\n        return this.precoDeCusto * (1 + margem);\n    }\n}\nconst caneca = new Produto('CAN-01', 'Caneca', 8);\nconsole.log(`${caneca.sku} ${caneca.nome}: R$ ${caneca.precoDeVenda(1.5).toFixed(2)}`);\nconsole.log(caneca.precoDeCusto);\nconsole.log('campos criados:', Object.keys(caneca).join(', '));\nconsole.log('\\nSem modificador nenhum, o parâmetro seria só um parâmetro: nada de campo.');\nconsole.log('É por isso que os quatro arquivos deste tema pedem a flag no `node`: o atalho');\nconsole.log('não é tipo que se apague, é código que precisa ser gerado.');\n"
       },
       {
        "n": 3,
        "titulo": "`protected`: a filha vê, o mundo não",
        "secao": "ESSENCIAL",
        "codigo": "class Funcionario {\n  constructor(protected nome: string, protected salarioBase: number) {}\n  descrever(): string { return `${this.nome}: R$ ${this.salarioTotal().toFixed(2)}`; }\n  protected salarioTotal(): number { return this.salarioBase; }\n}\n\nclass Vendedor extends Funcionario {\n  constructor(nome: string, salarioBase: number, private comissao: number) {\n    super(nome, salarioBase);\n  }\n  // A filha lê `salarioBase` e reescreve `salarioTotal` — os dois são protected.\n  protected override salarioTotal(): number { return this.salarioBase + this.comissao; }\n}\n\nconsole.log(new Funcionario('Ana', 3200).descrever());\nconsole.log(new Vendedor('Bruno', 3200, 850).descrever());\n\nconst bruno = new Vendedor('Bruno', 3200, 850);\n// @ts-expect-error — Property 'salarioBase' is protected and only accessible within class 'Funcionario' and its subclasses.\nconsole.log(bruno.salarioBase);\n\nconsole.log('\\n`private` a filha também não vê. `protected` é o meio-termo: fechado para');\nconsole.log('fora, aberto para a herança. Use quando a subclasse PRECISA daquilo.');\n\nconsole.log('\\nPor isso `protected` só aparece onde há herança: em superclasse, em classe');\nconsole.log('abstrata, em base de framework — código escrito para ser ESTENDIDO. Numa classe');\nconsole.log('que ninguém estende, `protected` é `private` com uma promessa a mais: você');\nconsole.log('está dizendo \"quem herdar daqui pode contar com isto\", e aí não dá para mudar');\nconsole.log('sem quebrar as filhas. Sem filhas à vista, escreva `private`.');",
        "codigoJs": "class Funcionario {\n    nome;\n    salarioBase;\n    constructor(nome, salarioBase){\n        this.nome = nome;\n        this.salarioBase = salarioBase;\n    }\n    descrever() {\n        return `${this.nome}: R$ ${this.salarioTotal().toFixed(2)}`;\n    }\n    salarioTotal() {\n        return this.salarioBase;\n    }\n}\nclass Vendedor extends Funcionario {\n    comissao;\n    constructor(nome, salarioBase, comissao){\n        super(nome, salarioBase), this.comissao = comissao;\n    }\n    salarioTotal() {\n        return this.salarioBase + this.comissao;\n    }\n}\nconsole.log(new Funcionario('Ana', 3200).descrever());\nconsole.log(new Vendedor('Bruno', 3200, 850).descrever());\nconst bruno = new Vendedor('Bruno', 3200, 850);\nconsole.log(bruno.salarioBase);\nconsole.log('\\n`private` a filha também não vê. `protected` é o meio-termo: fechado para');\nconsole.log('fora, aberto para a herança. Use quando a subclasse PRECISA daquilo.');\nconsole.log('\\nPor isso `protected` só aparece onde há herança: em superclasse, em classe');\nconsole.log('abstrata, em base de framework — código escrito para ser ESTENDIDO. Numa classe');\nconsole.log('que ninguém estende, `protected` é `private` com uma promessa a mais: você');\nconsole.log('está dizendo \"quem herdar daqui pode contar com isto\", e aí não dá para mudar');\nconsole.log('sem quebrar as filhas. Sem filhas à vista, escreva `private`.');\n"
       },
       {
        "n": 4,
        "titulo": "`private` na prática: guardar o invariante",
        "secao": "NA PRÁTICA",
        "codigo": "// O saldo nunca pode ficar negativo. Com o campo aberto, ninguém garante isso.\nclass Estoque {\n  private quantidade = 0;\n  private readonly movimentos: string[] = [];\n\n  constructor(public readonly sku: string) {}\n\n  entrada(n: number): void {\n    if (n <= 0) throw new Error('entrada precisa ser positiva');\n    this.quantidade += n;\n    this.movimentos.push(`+${n}`);\n  }\n\n  saida(n: number): boolean {\n    if (n > this.quantidade) return false;           // a regra mora aqui dentro\n    this.quantidade -= n;\n    this.movimentos.push(`-${n}`);\n    return true;\n  }\n\n  get disponivel(): number { return this.quantidade; }\n  get historico(): string { return this.movimentos.join(' '); }\n}\n\nconst estoque = new Estoque('CAN-01');\nestoque.entrada(10);\nconsole.log('tirar 3 :', estoque.saida(3), '· restam', estoque.disponivel);\nconsole.log('tirar 20:', estoque.saida(20), '· restam', estoque.disponivel);\nconsole.log('histórico:', estoque.historico);\n\nconsole.log('\\nCom `quantidade` pública, qualquer linha do sistema poderia fazer');\nconsole.log('`estoque.quantidade = -5`. É disso que `private` protege: não do invasor, do colega.');",
        "codigoJs": "class Estoque {\n    sku;\n    quantidade = 0;\n    movimentos = [];\n    constructor(sku){\n        this.sku = sku;\n    }\n    entrada(n) {\n        if (n <= 0) throw new Error('entrada precisa ser positiva');\n        this.quantidade += n;\n        this.movimentos.push(`+${n}`);\n    }\n    saida(n) {\n        if (n > this.quantidade) return false;\n        this.quantidade -= n;\n        this.movimentos.push(`-${n}`);\n        return true;\n    }\n    get disponivel() {\n        return this.quantidade;\n    }\n    get historico() {\n        return this.movimentos.join(' ');\n    }\n}\nconst estoque = new Estoque('CAN-01');\nestoque.entrada(10);\nconsole.log('tirar 3 :', estoque.saida(3), '· restam', estoque.disponivel);\nconsole.log('tirar 20:', estoque.saida(20), '· restam', estoque.disponivel);\nconsole.log('histórico:', estoque.historico);\nconsole.log('\\nCom `quantidade` pública, qualquer linha do sistema poderia fazer');\nconsole.log('`estoque.quantidade = -5`. É disso que `private` protege: não do invasor, do colega.');\n"
       },
       {
        "n": 5,
        "titulo": "`#campo`: o privado que existe rodando",
        "secao": "NA PRÁTICA",
        "codigo": "class SenhaComPrivateTs {\n  constructor(private valor: string) {}\n  conferir(tentativa: string): boolean { return this.valor === tentativa; }\n}\n\nclass SenhaComHash {\n  #valor: string;                                    // `#` é sintaxe do JavaScript, não do TS\n  constructor(valor: string) { this.#valor = valor; }\n  conferir(tentativa: string): boolean { return this.#valor === tentativa; }\n}\n\nconst comTs = new SenhaComPrivateTs('123456');\nconst comHash = new SenhaComHash('123456');\n\nconsole.log('confere:', comTs.conferir('123456'), comHash.conferir('123456'));\nconsole.log('private do TS no JSON:', JSON.stringify(comTs), '← a senha vazou');\nconsole.log('# do JavaScript      :', JSON.stringify(comHash), '← nada aqui');\n\nconsole.log('\\nDois níveis diferentes: `private` some ao compilar e o campo continua um campo');\nconsole.log('comum; `#` é privado de verdade, e nem `Object.keys` alcança. Para segredo, `#`.');",
        "codigoJs": "class SenhaComPrivateTs {\n    valor;\n    constructor(valor){\n        this.valor = valor;\n    }\n    conferir(tentativa) {\n        return this.valor === tentativa;\n    }\n}\nclass SenhaComHash {\n    #valor;\n    constructor(valor){\n        this.#valor = valor;\n    }\n    conferir(tentativa) {\n        return this.#valor === tentativa;\n    }\n}\nconst comTs = new SenhaComPrivateTs('123456');\nconst comHash = new SenhaComHash('123456');\nconsole.log('confere:', comTs.conferir('123456'), comHash.conferir('123456'));\nconsole.log('private do TS no JSON:', JSON.stringify(comTs), '← a senha vazou');\nconsole.log('# do JavaScript      :', JSON.stringify(comHash), '← nada aqui');\nconsole.log('\\nDois níveis diferentes: `private` some ao compilar e o campo continua um campo');\nconsole.log('comum; `#` é privado de verdade, e nem `Object.keys` alcança. Para segredo, `#`.');\n"
       },
       {
        "n": 6,
        "titulo": "`private` não impede nada rodando",
        "secao": "PEGADINHAS",
        "codigo": "class Cofre {\n  constructor(private segredo: string) {}\n  abrir(chave: string): string { return chave === 'sesamo' ? this.segredo : 'trancado'; }\n}\n\nconst cofre = new Cofre('o mapa do tesouro');\nconsole.log('pela porta:', cofre.abrir('sesamo'));\n\n// Duas linhas que o compilador aceita e que ignoram o `private` por completo.\nconsole.log('pelo índice:', (cofre as unknown as Record<string, string>)['segredo']);\nconsole.log('pelo JSON  :', JSON.stringify(cofre));\n\nconsole.log('\\n`private` é combinado entre você e o compilador. Ele organiza o código e');\nconsole.log('documenta a intenção — não esconde dado de ninguém em tempo de execução.');",
        "codigoJs": "class Cofre {\n    segredo;\n    constructor(segredo){\n        this.segredo = segredo;\n    }\n    abrir(chave) {\n        return chave === 'sesamo' ? this.segredo : 'trancado';\n    }\n}\nconst cofre = new Cofre('o mapa do tesouro');\nconsole.log('pela porta:', cofre.abrir('sesamo'));\nconsole.log('pelo índice:', cofre['segredo']);\nconsole.log('pelo JSON  :', JSON.stringify(cofre));\nconsole.log('\\n`private` é combinado entre você e o compilador. Ele organiza o código e');\nconsole.log('documenta a intenção — não esconde dado de ninguém em tempo de execução.');\n"
       }
      ],
      "resumo": [
       "`public` (padrão) abre, `private` fecha, `protected` abre só para as filhas —",
       "ou seja: `protected` é para superclasse, para classe pensada para ser estendida.",
       "`readonly` deixa ler e proíbe atribuir depois do construtor.",
       "Modificador no parâmetro do construtor cria o campo e atribui — sem repetir três vezes.",
       "Comece tudo `private` e abra só o que a classe promete.",
       "`private` some ao compilar; `#campo` é privado de verdade, inclusive no JSON.",
       "Nada disso é segurança: é organização. Segredo de verdade não mora no cliente."
      ]
     },
     {
      "slug": "02-heranca-e-abstract",
      "arquivo": "typescript/src/06-classes/02-heranca-e-abstract.ts",
      "comando": "node --experimental-transform-types src/06-classes/02-heranca-e-abstract.ts",
      "titulo": "Herança e classe abstrata",
      "sessao": 6,
      "oQueE": "`extends` faz uma classe herdar campos e métodos de outra. `abstract` marca a classe que só serve para ser estendida — nunca instanciada — e o método ou campo que ela deixa como contrato para a filha cumprir.",
      "quandoUsar": "quando as classes são mesmo variações de uma coisa só (formas de pagamento, tipos de funcionário) e compartilham comportamento de verdade.",
      "quandoNaoUsar": "para reaproveitar código. Herança amarra os dois para sempre — quando o que você quer é só reusar, componha: guarde o outro objeto dentro.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`extends` e `super`",
        "secao": "ESSENCIAL",
        "codigo": "class Veiculo {\n  constructor(protected placa: string, protected ano: number) {}\n\n  descrever(): string { return `${this.placa} (${this.ano})`; }\n  idade(anoAtual: number): number { return anoAtual - this.ano; }\n}\n\nclass Caminhao extends Veiculo {\n  constructor(placa: string, ano: number, private cargaEmToneladas: number) {\n    super(placa, ano);                     // obrigatório antes de qualquer `this`\n  }\n\n  // `override` deixa claro que está reescrevendo — e o tsc confere se o método existe mesmo.\n  override descrever(): string {\n    return `${super.descrever()} — ${this.cargaEmToneladas}t`;\n  }\n}\n\nconsole.log(new Veiculo('ABC-1234', 2018).descrever());\nconsole.log(new Caminhao('XYZ-9876', 2020, 12).descrever());\nconsole.log('idade herdada:', new Caminhao('XYZ-9876', 2020, 12).idade(2026), 'anos');\n\nclass ComErroDeDigitacao extends Veiculo {\n  // @ts-expect-error — This member cannot have an 'override' modifier because it is not declared in the base class.\n  override descreverr(): string { return 'nunca chamado'; }\n}\nconsole.log('a classe existe assim mesmo:', new ComErroDeDigitacao('A', 2020).descrever());",
        "codigoJs": "class Veiculo {\n    placa;\n    ano;\n    constructor(placa, ano){\n        this.placa = placa;\n        this.ano = ano;\n    }\n    descrever() {\n        return `${this.placa} (${this.ano})`;\n    }\n    idade(anoAtual) {\n        return anoAtual - this.ano;\n    }\n}\nclass Caminhao extends Veiculo {\n    cargaEmToneladas;\n    constructor(placa, ano, cargaEmToneladas){\n        super(placa, ano), this.cargaEmToneladas = cargaEmToneladas;\n    }\n    descrever() {\n        return `${super.descrever()} — ${this.cargaEmToneladas}t`;\n    }\n}\nconsole.log(new Veiculo('ABC-1234', 2018).descrever());\nconsole.log(new Caminhao('XYZ-9876', 2020, 12).descrever());\nconsole.log('idade herdada:', new Caminhao('XYZ-9876', 2020, 12).idade(2026), 'anos');\nclass ComErroDeDigitacao extends Veiculo {\n    descreverr() {\n        return 'nunca chamado';\n    }\n}\nconsole.log('a classe existe assim mesmo:', new ComErroDeDigitacao('A', 2020).descrever());\n"
       },
       {
        "n": 2,
        "titulo": "`abstract`: o molde que não vira objeto",
        "secao": "ESSENCIAL",
        "codigo": "abstract class MeioDePagamento {\n  constructor(protected valor: number) {}\n\n  // Sem corpo: cada filha escreve o seu. Quem não escrever não compila.\n  abstract taxa(): number;\n  abstract nome(): string;\n\n  // Com corpo: escrito uma vez, vale para todas.\n  totalCobrado(): string {\n    return `${this.nome().padEnd(8)} R$ ${(this.valor + this.taxa()).toFixed(2)}`;\n  }\n}\n\nclass Pix extends MeioDePagamento {\n  nome(): string { return 'pix'; }\n  taxa(): number { return 0; }\n}\n\nclass Cartao extends MeioDePagamento {\n  constructor(valor: number, private parcelas: number) { super(valor); }\n  nome(): string { return `cartão${this.parcelas}x`; }\n  taxa(): number { return this.valor * 0.049 * this.parcelas; }\n}\n\nfor (const pagamento of [new Pix(200), new Cartao(200, 1), new Cartao(200, 3)])\n  console.log(pagamento.totalCobrado());\n\n// @ts-expect-error — Cannot create an instance of an abstract class.\nconsole.log(new MeioDePagamento(200));\n\nconsole.log('\\nClasse abstrata é a classe que você NUNCA chama direto: `new MeioDePagamento`');\nconsole.log('é erro. Ela existe só para ser estendida — é meia classe, e a outra metade cada');\nconsole.log('filha completa. \"Meio de pagamento\" sozinho não é nada: o que existe no mundo é');\nconsole.log('pix, cartão, boleto.');\nconsole.log('\\nE o método abstrato é só um CONTRATO: na mãe existe a assinatura (o nome, o que');\nconsole.log('entra, o que sai) e mais nada. Cada filha é obrigada a escrever o corpo, e escreve');\nconsole.log('do jeito dela — o Pix devolve taxa zero, o Cartão calcula por parcela. O contrato');\nconsole.log('não manda no COMO; manda em existir e em bater a assinatura.');",
        "codigoJs": "class MeioDePagamento {\n    valor;\n    constructor(valor){\n        this.valor = valor;\n    }\n    totalCobrado() {\n        return `${this.nome().padEnd(8)} R$ ${(this.valor + this.taxa()).toFixed(2)}`;\n    }\n}\nclass Pix extends MeioDePagamento {\n    nome() {\n        return 'pix';\n    }\n    taxa() {\n        return 0;\n    }\n}\nclass Cartao extends MeioDePagamento {\n    parcelas;\n    constructor(valor, parcelas){\n        super(valor), this.parcelas = parcelas;\n    }\n    nome() {\n        return `cartão${this.parcelas}x`;\n    }\n    taxa() {\n        return this.valor * 0.049 * this.parcelas;\n    }\n}\nfor (const pagamento of [\n    new Pix(200),\n    new Cartao(200, 1),\n    new Cartao(200, 3)\n])console.log(pagamento.totalCobrado());\nconsole.log(new MeioDePagamento(200));\nconsole.log('\\nClasse abstrata é a classe que você NUNCA chama direto: `new MeioDePagamento`');\nconsole.log('é erro. Ela existe só para ser estendida — é meia classe, e a outra metade cada');\nconsole.log('filha completa. \"Meio de pagamento\" sozinho não é nada: o que existe no mundo é');\nconsole.log('pix, cartão, boleto.');\nconsole.log('\\nE o método abstrato é só um CONTRATO: na mãe existe a assinatura (o nome, o que');\nconsole.log('entra, o que sai) e mais nada. Cada filha é obrigada a escrever o corpo, e escreve');\nconsole.log('do jeito dela — o Pix devolve taxa zero, o Cartão calcula por parcela. O contrato');\nconsole.log('não manda no COMO; manda em existir e em bater a assinatura.');\n"
       },
       {
        "n": 3,
        "titulo": "A filha é obrigada a cumprir o contrato",
        "secao": "ESSENCIAL",
        "codigo": "abstract class Relatorio {\n  abstract linhas(): string[];\n  imprimir(): void {\n    console.log(`— ${this.constructor.name} —`);\n    for (const linha of this.linhas()) console.log('  ' + linha);\n  }\n}\n\nclass RelatorioDeVendas extends Relatorio {\n  linhas(): string[] { return ['Ana: R$ 1.630,00', 'Bruno: R$ 890,00']; }\n}\n\nnew RelatorioDeVendas().imprimir();\n\n// @ts-expect-error — Non-abstract class 'RelatorioVazio' does not implement inherited abstract member 'linhas'.\nclass RelatorioVazio extends Relatorio {}\nconsole.log('rodando, a classe existe:', typeof RelatorioVazio);\n\nconsole.log('\\nO erro aparece na DECLARAÇÃO da classe, não quando alguém tenta usar. É a');\nconsole.log('diferença entre `abstract` e um método que só lança \"não implementado\".');",
        "codigoJs": "class Relatorio {\n    imprimir() {\n        console.log(`— ${this.constructor.name} —`);\n        for (const linha of this.linhas())console.log('  ' + linha);\n    }\n}\nclass RelatorioDeVendas extends Relatorio {\n    linhas() {\n        return [\n            'Ana: R$ 1.630,00',\n            'Bruno: R$ 890,00'\n        ];\n    }\n}\nnew RelatorioDeVendas().imprimir();\nclass RelatorioVazio extends Relatorio {\n}\nconsole.log('rodando, a classe existe:', typeof RelatorioVazio);\nconsole.log('\\nO erro aparece na DECLARAÇÃO da classe, não quando alguém tenta usar. É a');\nconsole.log('diferença entre `abstract` e um método que só lança \"não implementado\".');\n"
       },
       {
        "n": 4,
        "titulo": "Polimorfismo: uma lista, vários comportamentos",
        "secao": "NA PRÁTICA",
        "codigo": "abstract class Notificacao {\n  constructor(protected destinatario: string) {}\n  abstract enviar(mensagem: string): string;\n}\n\nclass PorEmail extends Notificacao {\n  enviar(mensagem: string): string { return `✉ ${this.destinatario}: ${mensagem}`; }\n}\nclass PorSms extends Notificacao {\n  enviar(mensagem: string): string { return `📱 ${this.destinatario}: ${mensagem.slice(0, 20)}…`; }\n}\nclass PorPush extends Notificacao {\n  constructor(destinatario: string, private aplicativo: string) { super(destinatario); }\n  enviar(mensagem: string): string { return `🔔 ${this.aplicativo}/${this.destinatario}: ${mensagem}`; }\n}\n\n// O tipo da lista é o da mãe. Quem decide o que acontece é o objeto, não o `if`.\nconst canais: Notificacao[] = [\n  new PorEmail('ana@loja.dev'),\n  new PorSms('81 99999-0000'),\n  new PorPush('ana', 'Loja'),\n];\n\nfor (const canal of canais) console.log(canal.enviar('Seu pedido saiu para entrega'));\n\nconsole.log('\\nAcrescentar um canal novo é criar uma classe. Nenhum `switch` existente muda —');\nconsole.log('é a diferença prática entre herança e uma união de literais com switch.');",
        "codigoJs": "class Notificacao {\n    destinatario;\n    constructor(destinatario){\n        this.destinatario = destinatario;\n    }\n}\nclass PorEmail extends Notificacao {\n    enviar(mensagem) {\n        return `✉ ${this.destinatario}: ${mensagem}`;\n    }\n}\nclass PorSms extends Notificacao {\n    enviar(mensagem) {\n        return `📱 ${this.destinatario}: ${mensagem.slice(0, 20)}…`;\n    }\n}\nclass PorPush extends Notificacao {\n    aplicativo;\n    constructor(destinatario, aplicativo){\n        super(destinatario), this.aplicativo = aplicativo;\n    }\n    enviar(mensagem) {\n        return `🔔 ${this.aplicativo}/${this.destinatario}: ${mensagem}`;\n    }\n}\nconst canais = [\n    new PorEmail('ana@loja.dev'),\n    new PorSms('81 99999-0000'),\n    new PorPush('ana', 'Loja')\n];\nfor (const canal of canais)console.log(canal.enviar('Seu pedido saiu para entrega'));\nconsole.log('\\nAcrescentar um canal novo é criar uma classe. Nenhum `switch` existente muda —');\nconsole.log('é a diferença prática entre herança e uma união de literais com switch.');\n"
       },
       {
        "n": 5,
        "titulo": "Quando NÃO herdar: componha",
        "secao": "NA PRÁTICA",
        "codigo": "// Herança errada: \"carrinho é uma lista\" não é verdade — carrinho TEM uma lista.\nclass CarrinhoHerdado extends Array<{ nome: string; preco: number }> {\n  total(): number { return this.reduce((s, i) => s + i.preco, 0); }\n}\nconst herdado = new CarrinhoHerdado();\nherdado.push({ nome: 'Caneca', preco: 19.9 });\nherdado.length = 0;                                  // a API do Array vazou junto\nconsole.log('herdando :', herdado.total().toFixed(2), '← alguém zerou o carrinho pelo length');\n\n// Composição: o carrinho guarda a lista e mostra só o que ele promete.\nclass Carrinho {\n  private itens: { nome: string; preco: number }[] = [];\n  adicionar(nome: string, preco: number): void { this.itens.push({ nome, preco }); }\n  total(): number { return this.itens.reduce((s, i) => s + i.preco, 0); }\n  get quantidade(): number { return this.itens.length; }\n}\nconst carrinho = new Carrinho();\ncarrinho.adicionar('Caneca', 19.9);\ncarrinho.adicionar('Caderno', 32.5);\nconsole.log('compondo :', carrinho.total().toFixed(2), `(${carrinho.quantidade} itens)`);\n\n// @ts-expect-error — Property 'length' does not exist on type 'Carrinho'.\ncarrinho.length = 0;\n\nconsole.log('\\nA pergunta é \"É UM?\", não \"preciso dos métodos dele?\". Carrinho não é lista.');",
        "codigoJs": "class CarrinhoHerdado extends Array {\n    total() {\n        return this.reduce((s, i)=>s + i.preco, 0);\n    }\n}\nconst herdado = new CarrinhoHerdado();\nherdado.push({\n    nome: 'Caneca',\n    preco: 19.9\n});\nherdado.length = 0;\nconsole.log('herdando :', herdado.total().toFixed(2), '← alguém zerou o carrinho pelo length');\nclass Carrinho {\n    itens = [];\n    adicionar(nome, preco) {\n        this.itens.push({\n            nome,\n            preco\n        });\n    }\n    total() {\n        return this.itens.reduce((s, i)=>s + i.preco, 0);\n    }\n    get quantidade() {\n        return this.itens.length;\n    }\n}\nconst carrinho = new Carrinho();\ncarrinho.adicionar('Caneca', 19.9);\ncarrinho.adicionar('Caderno', 32.5);\nconsole.log('compondo :', carrinho.total().toFixed(2), `(${carrinho.quantidade} itens)`);\ncarrinho.length = 0;\nconsole.log('\\nA pergunta é \"É UM?\", não \"preciso dos métodos dele?\". Carrinho não é lista.');\n"
       },
       {
        "n": 6,
        "titulo": "Atributo abstrato: o contrato também vale para dado",
        "secao": "NA PRÁTICA",
        "codigo": "// Não é só método. A mãe pode exigir um CAMPO e usá-lo, sem saber o valor de ninguém.\nabstract class Documento {\n  abstract readonly extensao: string;              // contrato: a filha declara o valor\n  abstract readonly tamanhoMaximoMb: number;\n\n  aceitar(nomeDoArquivo: string, mb: number): string {\n    if (!nomeDoArquivo.endsWith(this.extensao)) return `recusado: ${nomeDoArquivo} não é ${this.extensao}`;\n    if (mb > this.tamanhoMaximoMb) return `recusado: ${mb}MB passa de ${this.tamanhoMaximoMb}MB`;\n    return `aceito: ${nomeDoArquivo}`;\n  }\n}\n\nclass Foto extends Documento {\n  readonly extensao = '.jpg';                      // cada filha preenche do seu jeito\n  readonly tamanhoMaximoMb = 5;\n}\n\nclass Contrato extends Documento {\n  readonly extensao = '.pdf';\n  readonly tamanhoMaximoMb = 20;\n}\n\nconsole.log(new Foto().aceitar('perfil.jpg', 2));\nconsole.log(new Foto().aceitar('perfil.jpg', 9));\nconsole.log(new Contrato().aceitar('acordo.pdf', 12));\nconsole.log(new Contrato().aceitar('acordo.jpg', 1));\n\n// @ts-expect-error — Non-abstract class 'Anexo' incorrectly implements inherited abstract member.\nclass Anexo extends Documento { readonly extensao = '.zip'; }\nconsole.log('faltou `tamanhoMaximoMb`, e o erro é na classe:', typeof Anexo);\n\nconsole.log('\\nO `aceitar` na mãe usa `this.extensao` sem saber qual é — ele confia no');\nconsole.log('contrato. Método abstrato, atributo abstrato: a mesma ideia. A mãe diz O QUE');\nconsole.log('tem que existir; a filha diz QUAL é.');",
        "codigoJs": "class Documento {\n    aceitar(nomeDoArquivo, mb) {\n        if (!nomeDoArquivo.endsWith(this.extensao)) return `recusado: ${nomeDoArquivo} não é ${this.extensao}`;\n        if (mb > this.tamanhoMaximoMb) return `recusado: ${mb}MB passa de ${this.tamanhoMaximoMb}MB`;\n        return `aceito: ${nomeDoArquivo}`;\n    }\n}\nclass Foto extends Documento {\n    extensao = '.jpg';\n    tamanhoMaximoMb = 5;\n}\nclass Contrato extends Documento {\n    extensao = '.pdf';\n    tamanhoMaximoMb = 20;\n}\nconsole.log(new Foto().aceitar('perfil.jpg', 2));\nconsole.log(new Foto().aceitar('perfil.jpg', 9));\nconsole.log(new Contrato().aceitar('acordo.pdf', 12));\nconsole.log(new Contrato().aceitar('acordo.jpg', 1));\nclass Anexo extends Documento {\n    extensao = '.zip';\n}\nconsole.log('faltou `tamanhoMaximoMb`, e o erro é na classe:', typeof Anexo);\nconsole.log('\\nO `aceitar` na mãe usa `this.extensao` sem saber qual é — ele confia no');\nconsole.log('contrato. Método abstrato, atributo abstrato: a mesma ideia. A mãe diz O QUE');\nconsole.log('tem que existir; a filha diz QUAL é.');\n"
       },
       {
        "n": 7,
        "titulo": "`super()` antes de qualquer `this`",
        "secao": "PEGADINHAS",
        "codigo": "class Base {\n  constructor(protected nome: string) {}\n}\n\nclass FilhaCorreta extends Base {\n  private etiqueta: string;\n  constructor(nome: string) {\n    super(nome);                                     // primeiro\n    this.etiqueta = `[${this.nome}]`;                // depois\n  }\n  mostrar(): string { return this.etiqueta; }\n}\n\nconsole.log(new FilhaCorreta('Ana').mostrar());\n\nclass FilhaErrada extends Base {\n  private etiqueta: string;\n  constructor(nome: string) {\n    // @ts-expect-error — 'super' must be called before accessing 'this' in the constructor of a derived class.\n    this.etiqueta = `[${nome}]`;\n    super(nome);\n  }\n  mostrar(): string { return this.etiqueta; }\n}\n\ntry {\n  console.log(new FilhaErrada('Bruno').mostrar());\n} catch (erro) {\n  console.log('rodando  :', (erro as Error).message);\n}\n\nconsole.log('\\nAqui o JavaScript é tão rígido quanto o TypeScript: antes do `super()`, o');\nconsole.log('objeto ainda não existe. O tsc só avisa mais cedo.');",
        "codigoJs": "class Base {\n    nome;\n    constructor(nome){\n        this.nome = nome;\n    }\n}\nclass FilhaCorreta extends Base {\n    etiqueta;\n    constructor(nome){\n        super(nome);\n        this.etiqueta = `[${this.nome}]`;\n    }\n    mostrar() {\n        return this.etiqueta;\n    }\n}\nconsole.log(new FilhaCorreta('Ana').mostrar());\nclass FilhaErrada extends Base {\n    etiqueta;\n    constructor(nome){\n        this.etiqueta = `[${nome}]`;\n        super(nome);\n    }\n    mostrar() {\n        return this.etiqueta;\n    }\n}\ntry {\n    console.log(new FilhaErrada('Bruno').mostrar());\n} catch (erro) {\n    console.log('rodando  :', erro.message);\n}\nconsole.log('\\nAqui o JavaScript é tão rígido quanto o TypeScript: antes do `super()`, o');\nconsole.log('objeto ainda não existe. O tsc só avisa mais cedo.');\n"
       }
      ],
      "resumo": [
       "`extends` herda campos e métodos; `super()` chama o construtor da mãe.",
       "`override` documenta a reescrita e faz o tsc conferir que o método existe na mãe.",
       "`abstract class` não vira objeto; `abstract método()` obriga a filha a escrever.",
       "O erro de \"faltou implementar\" aparece na declaração da classe, não no uso.",
       "Polimorfismo: lista tipada pela mãe, comportamento decidido pelo objeto.",
       "Herança só quando \"é um\" for verdade. Para reusar código, componha."
      ]
     },
     {
      "slug": "03-implements-e-interface",
      "arquivo": "typescript/src/06-classes/03-implements-e-interface.ts",
      "comando": "node --experimental-transform-types src/06-classes/03-implements-e-interface.ts",
      "titulo": "implements e interface na classe",
      "sessao": 6,
      "oQueE": "`implements` diz que a classe cumpre um contrato descrito por uma interface. Diferente de `extends`, não vem nada pronto: a classe escreve tudo.",
      "quandoUsar": "quando várias classes sem nada em comum precisam ser usadas do mesmo jeito — três repositórios, três formas de exportar, três gateways de pagamento.",
      "quandoNaoUsar": "quando não há duas implementações. Interface para uma classe só é cerimônia — o próprio formato da classe já é o contrato.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`implements`: o contrato conferido",
        "secao": "ESSENCIAL",
        "codigo": "interface Exportador {\n  extensao: string;\n  exportar(linhas: string[][]): string;\n}\n\nclass ExportadorCsv implements Exportador {\n  extensao = 'csv';\n  exportar(linhas: string[][]): string { return linhas.map((l) => l.join(';')).join('\\n'); }\n}\n\nclass ExportadorJson implements Exportador {\n  extensao = 'json';\n  exportar(linhas: string[][]): string { return JSON.stringify(linhas); }\n}\n\nconst dados = [['sku', 'preco'], ['CAN-01', '19.90'], ['CAD-02', '32.50']];\nfor (const exportador of [new ExportadorCsv(), new ExportadorJson()] as Exportador[])\n  console.log(`.${exportador.extensao}:`, exportador.exportar(dados).split('\\n')[0], '…');\n\n// @ts-expect-error — Class 'ExportadorTorto' incorrectly implements interface 'Exportador'.\nclass ExportadorTorto implements Exportador {\n  extensao = 'txt';\n  // falta o método `exportar`\n}\nconsole.log('a classe existe assim mesmo:', new ExportadorTorto().extensao);",
        "codigoJs": "class ExportadorCsv {\n    extensao = 'csv';\n    exportar(linhas) {\n        return linhas.map((l)=>l.join(';')).join('\\n');\n    }\n}\nclass ExportadorJson {\n    extensao = 'json';\n    exportar(linhas) {\n        return JSON.stringify(linhas);\n    }\n}\nconst dados = [\n    [\n        'sku',\n        'preco'\n    ],\n    [\n        'CAN-01',\n        '19.90'\n    ],\n    [\n        'CAD-02',\n        '32.50'\n    ]\n];\nfor (const exportador of [\n    new ExportadorCsv(),\n    new ExportadorJson()\n])console.log(`.${exportador.extensao}:`, exportador.exportar(dados).split('\\n')[0], '…');\nclass ExportadorTorto {\n    extensao = 'txt';\n}\nconsole.log('a classe existe assim mesmo:', new ExportadorTorto().extensao);\n"
       },
       {
        "n": 2,
        "titulo": "`implements` não dá nada de graça",
        "secao": "ESSENCIAL",
        "codigo": "interface Somavel {\n  somar(valor: number): void;\n  total(): number;\n}\n\nclass Caixa implements Somavel {\n  private acumulado = 0;                      // tudo escrito aqui: nada vem da interface\n  somar(valor: number): void { this.acumulado += valor; }\n  total(): number { return this.acumulado; }\n}\n\nconst caixa = new Caixa();\ncaixa.somar(19.9);\ncaixa.somar(32.5);\nconsole.log('caixa:', caixa.total().toFixed(2));\n\nconsole.log('\\n`extends` HERDA implementação; `implements` só CONFERE que ela existe. Uma classe');\nconsole.log('estende no máximo uma classe, mas implementa quantas interfaces quiser.');",
        "codigoJs": "class Caixa {\n    acumulado = 0;\n    somar(valor) {\n        this.acumulado += valor;\n    }\n    total() {\n        return this.acumulado;\n    }\n}\nconst caixa = new Caixa();\ncaixa.somar(19.9);\ncaixa.somar(32.5);\nconsole.log('caixa:', caixa.total().toFixed(2));\nconsole.log('\\n`extends` HERDA implementação; `implements` só CONFERE que ela existe. Uma classe');\nconsole.log('estende no máximo uma classe, mas implementa quantas interfaces quiser.');\n"
       },
       {
        "n": 3,
        "titulo": "Várias interfaces na mesma classe",
        "secao": "ESSENCIAL",
        "codigo": "interface Identificavel { readonly id: number; }\ninterface Serializavel { paraJson(): string; }\ninterface Comparavel<T> { comparar(outro: T): number; }\n\nclass Pedido implements Identificavel, Serializavel, Comparavel<Pedido> {\n  constructor(readonly id: number, private total: number) {}\n\n  paraJson(): string { return JSON.stringify({ id: this.id, total: this.total }); }\n  comparar(outro: Pedido): number { return this.total - outro.total; }\n}\n\nconst pedidos = [new Pedido(3, 89.9), new Pedido(1, 240), new Pedido(2, 19.9)];\npedidos.sort((a, b) => a.comparar(b));\n\nfor (const pedido of pedidos) console.log(pedido.paraJson());\n\n// @ts-expect-error — Cannot assign to 'id' because it is a read-only property.\npedidos[0].id = 99;\n\nconsole.log('\\nCada interface descreve UMA capacidade. É o contrário de uma classe-mãe gorda');\nconsole.log('que tenta prever tudo — e encaixa muito melhor em código que vai crescer.');",
        "codigoJs": "class Pedido {\n    id;\n    total;\n    constructor(id, total){\n        this.id = id;\n        this.total = total;\n    }\n    paraJson() {\n        return JSON.stringify({\n            id: this.id,\n            total: this.total\n        });\n    }\n    comparar(outro) {\n        return this.total - outro.total;\n    }\n}\nconst pedidos = [\n    new Pedido(3, 89.9),\n    new Pedido(1, 240),\n    new Pedido(2, 19.9)\n];\npedidos.sort((a, b)=>a.comparar(b));\nfor (const pedido of pedidos)console.log(pedido.paraJson());\npedidos[0].id = 99;\nconsole.log('\\nCada interface descreve UMA capacidade. É o contrário de uma classe-mãe gorda');\nconsole.log('que tenta prever tudo — e encaixa muito melhor em código que vai crescer.');\n"
       },
       {
        "n": 4,
        "titulo": "Trocar a implementação sem tocar em quem usa",
        "secao": "NA PRÁTICA",
        "codigo": "interface RepositorioDeAlunos {\n  salvar(nome: string): number;\n  listar(): string[];\n}\n\nclass RepositorioEmMemoria implements RepositorioDeAlunos {\n  private alunos: string[] = [];\n  salvar(nome: string): number { return this.alunos.push(nome); }\n  listar(): string[] { return [...this.alunos]; }\n}\n\nclass RepositorioComLog implements RepositorioDeAlunos {\n  constructor(private interno: RepositorioDeAlunos) {}       // embrulha outro repositório\n  salvar(nome: string): number {\n    console.log(`  [log] salvando ${nome}`);\n    return this.interno.salvar(nome);\n  }\n  listar(): string[] { return this.interno.listar(); }\n}\n\n// A função só conhece a interface: não sabe nem se importa qual das duas chegou.\nfunction cadastrarTurma(repositorio: RepositorioDeAlunos, nomes: string[]): void {\n  for (const nome of nomes) repositorio.salvar(nome);\n  console.log('  turma:', repositorio.listar().join(', '));\n}\n\nconsole.log('sem log:');\ncadastrarTurma(new RepositorioEmMemoria(), ['Ana', 'Bruno']);\nconsole.log('com log:');\ncadastrarTurma(new RepositorioComLog(new RepositorioEmMemoria()), ['Carla', 'Diego']);\n\nconsole.log('\\nÉ o mesmo desenho do banco em `node/08-sequelize`: trocar MySQL por memória');\nconsole.log('nos testes não muda uma linha de quem chama.');",
        "codigoJs": "class RepositorioEmMemoria {\n    alunos = [];\n    salvar(nome) {\n        return this.alunos.push(nome);\n    }\n    listar() {\n        return [\n            ...this.alunos\n        ];\n    }\n}\nclass RepositorioComLog {\n    interno;\n    constructor(interno){\n        this.interno = interno;\n    }\n    salvar(nome) {\n        console.log(`  [log] salvando ${nome}`);\n        return this.interno.salvar(nome);\n    }\n    listar() {\n        return this.interno.listar();\n    }\n}\nfunction cadastrarTurma(repositorio, nomes) {\n    for (const nome of nomes)repositorio.salvar(nome);\n    console.log('  turma:', repositorio.listar().join(', '));\n}\nconsole.log('sem log:');\ncadastrarTurma(new RepositorioEmMemoria(), [\n    'Ana',\n    'Bruno'\n]);\nconsole.log('com log:');\ncadastrarTurma(new RepositorioComLog(new RepositorioEmMemoria()), [\n    'Carla',\n    'Diego'\n]);\nconsole.log('\\nÉ o mesmo desenho do banco em `node/08-sequelize`: trocar MySQL por memória');\nconsole.log('nos testes não muda uma linha de quem chama.');\n"
       },
       {
        "n": 5,
        "titulo": "A interface como tipo do construtor",
        "secao": "NA PRÁTICA",
        "codigo": "interface Forma { area(): number; }\n\nclass Quadrado implements Forma {\n  constructor(private lado: number) {}\n  area(): number { return this.lado ** 2; }\n}\nclass Circulo implements Forma {\n  constructor(private raio: number) {}\n  area(): number { return Math.PI * this.raio ** 2; }\n}\n\n// `new (...) => Forma` é o tipo de uma CLASSE que produz Forma, não de uma forma pronta.\ntype ConstrutorDeForma = new (medida: number) => Forma;\n\nconst fabricas: Record<string, ConstrutorDeForma> = { quadrado: Quadrado, circulo: Circulo };\n\nfunction criar(tipo: string, medida: number): string {\n  const Classe = fabricas[tipo];\n  if (!Classe) return `${tipo}: desconhecido`;\n  return `${tipo.padEnd(9)} área ${new Classe(medida).area().toFixed(2)}`;\n}\n\nconsole.log(criar('quadrado', 4));\nconsole.log(criar('circulo', 4));\nconsole.log(criar('triangulo', 4));",
        "codigoJs": "class Quadrado {\n    lado;\n    constructor(lado){\n        this.lado = lado;\n    }\n    area() {\n        return this.lado ** 2;\n    }\n}\nclass Circulo {\n    raio;\n    constructor(raio){\n        this.raio = raio;\n    }\n    area() {\n        return Math.PI * this.raio ** 2;\n    }\n}\nconst fabricas = {\n    quadrado: Quadrado,\n    circulo: Circulo\n};\nfunction criar(tipo, medida) {\n    const Classe = fabricas[tipo];\n    if (!Classe) return `${tipo}: desconhecido`;\n    return `${tipo.padEnd(9)} área ${new Classe(medida).area().toFixed(2)}`;\n}\nconsole.log(criar('quadrado', 4));\nconsole.log(criar('circulo', 4));\nconsole.log(criar('triangulo', 4));\n"
       },
       {
        "n": 6,
        "titulo": "`implements` não muda o tipo do que a classe entrega",
        "secao": "PEGADINHAS",
        "codigo": "interface ComNome { nome: string; }\n\nclass Cliente implements ComNome {\n  nome = 'Ana';\n  telefone = '81 99999-0000';        // campo a mais: a interface não proíbe\n}\n\nconst cliente = new Cliente();\nconsole.log('pelo tipo da classe:', cliente.nome, cliente.telefone);\n\nconst comoInterface: ComNome = cliente;\nconsole.log('pelo tipo da interface:', comoInterface.nome);\n\n// @ts-expect-error — Property 'telefone' does not exist on type 'ComNome'.\nconsole.log(comoInterface.telefone);\n\nconsole.log('\\n`implements` é um piso, não um teto: a classe pode ter mais. O que limita é o');\nconsole.log('TIPO DA VARIÁVEL — e é justamente essa limitação que faz a troca ser segura.');",
        "codigoJs": "class Cliente {\n    nome = 'Ana';\n    telefone = '81 99999-0000';\n}\nconst cliente = new Cliente();\nconsole.log('pelo tipo da classe:', cliente.nome, cliente.telefone);\nconst comoInterface = cliente;\nconsole.log('pelo tipo da interface:', comoInterface.nome);\nconsole.log(comoInterface.telefone);\nconsole.log('\\n`implements` é um piso, não um teto: a classe pode ter mais. O que limita é o');\nconsole.log('TIPO DA VARIÁVEL — e é justamente essa limitação que faz a troca ser segura.');\n"
       },
       {
        "n": 7,
        "titulo": "Interface não descreve o construtor",
        "secao": "PEGADINHAS",
        "codigo": "interface ComIdentificador { id: number; }\n\n// Isto descreve a INSTÂNCIA. Não há como exigir \"toda classe que implementa tem\n// que receber um id no construtor\": a interface não enxerga o construtor.\nclass PorParametro implements ComIdentificador {\n  constructor(public id: number) {}\n}\nclass PorSorteio implements ComIdentificador {\n  id = 42;                                    // não recebe nada, e cumpre igual\n}\n\nconsole.log('por parâmetro:', new PorParametro(7).id);\nconsole.log('por sorteio  :', new PorSorteio().id);\n\nconsole.log('\\nPara exigir a forma do construtor, o tipo é outro: `new (id: number) => T`,');\nconsole.log('como o `ConstrutorDeForma` do bloco 5. Interface só fala da instância.');",
        "codigoJs": "class PorParametro {\n    id;\n    constructor(id){\n        this.id = id;\n    }\n}\nclass PorSorteio {\n    id = 42;\n}\nconsole.log('por parâmetro:', new PorParametro(7).id);\nconsole.log('por sorteio  :', new PorSorteio().id);\nconsole.log('\\nPara exigir a forma do construtor, o tipo é outro: `new (id: number) => T`,');\nconsole.log('como o `ConstrutorDeForma` do bloco 5. Interface só fala da instância.');\n"
       }
      ],
      "resumo": [
       "`implements` confere o contrato; ao contrário de `extends`, não traz implementação.",
       "Uma classe estende no máximo uma classe, e implementa quantas interfaces quiser.",
       "Interfaces pequenas (uma capacidade cada) envelhecem melhor que uma classe-mãe grande.",
       "Programar contra a interface é o que deixa trocar a implementação nos testes.",
       "`new (x: T) => U` é o tipo de uma classe; interface descreve só a instância.",
       "A classe pode ter mais do que a interface pede — quem limita é o tipo da variável."
      ]
     },
     {
      "slug": "04-static-e-getters",
      "arquivo": "typescript/src/06-classes/04-static-e-getters.ts",
      "comando": "node --experimental-transform-types src/06-classes/04-static-e-getters.ts",
      "titulo": "static, getters e construtor privado",
      "sessao": 6,
      "oQueE": "`static` pertence à classe, não ao objeto. `get`/`set` são métodos que se leem como propriedade. Construtor `private` tira de todo mundo o direito de dar `new`.",
      "quandoUsar": "`static` para fábrica e constante da classe; `get` para valor derivado; construtor privado quando a criação precisa passar por uma validação.",
      "quandoNaoUsar": "`set` que faz mais do que guardar. Quem lê `objeto.x = 1` não espera uma chamada de rede ali — nesse caso, escreva um método com nome.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`static`: pertence à classe",
        "secao": "ESSENCIAL",
        "codigo": "class Pedido {\n  static readonly TAXA_DE_SERVICO = 0.05;      // constante da classe\n  static quantidadeCriada = 0;                 // contador compartilhado por todos\n\n  constructor(public readonly id: number, private valor: number) {\n    Pedido.quantidadeCriada++;                 // pela CLASSE, não por `this`\n  }\n\n  static total(pedidos: Pedido[]): number {    // método que não precisa de um pedido\n    return pedidos.reduce((s, p) => s + p.comTaxa(), 0);\n  }\n\n  comTaxa(): number { return this.valor * (1 + Pedido.TAXA_DE_SERVICO); }\n}\n\nconst pedidos = [new Pedido(1, 100), new Pedido(2, 250)];\nconsole.log('taxa      :', Pedido.TAXA_DE_SERVICO);\nconsole.log('criados   :', Pedido.quantidadeCriada);\nconsole.log('total     :', Pedido.total(pedidos).toFixed(2));\n\n// @ts-expect-error — Property 'TAXA_DE_SERVICO' is a static member of type 'Pedido'.\nconsole.log(pedidos[0].TAXA_DE_SERVICO);",
        "codigoJs": "class Pedido {\n    id;\n    valor;\n    static TAXA_DE_SERVICO = 0.05;\n    static quantidadeCriada = 0;\n    constructor(id, valor){\n        this.id = id;\n        this.valor = valor;\n        Pedido.quantidadeCriada++;\n    }\n    static total(pedidos) {\n        return pedidos.reduce((s, p)=>s + p.comTaxa(), 0);\n    }\n    comTaxa() {\n        return this.valor * (1 + Pedido.TAXA_DE_SERVICO);\n    }\n}\nconst pedidos = [\n    new Pedido(1, 100),\n    new Pedido(2, 250)\n];\nconsole.log('taxa      :', Pedido.TAXA_DE_SERVICO);\nconsole.log('criados   :', Pedido.quantidadeCriada);\nconsole.log('total     :', Pedido.total(pedidos).toFixed(2));\nconsole.log(pedidos[0].TAXA_DE_SERVICO);\n"
       },
       {
        "n": 2,
        "titulo": "`get` e `set`: método com cara de propriedade",
        "secao": "ESSENCIAL",
        "codigo": "class Temperatura {\n  private celsius = 0;\n\n  get fahrenheit(): number { return this.celsius * 1.8 + 32; }\n  set fahrenheit(valor: number) { this.celsius = (valor - 32) / 1.8; }\n\n  get emCelsius(): number { return this.celsius; }\n}\n\nconst temperatura = new Temperatura();\ntemperatura.fahrenheit = 212;                  // parece atribuição, é chamada de método\nconsole.log('212 °F =', temperatura.emCelsius.toFixed(1), '°C');\n\ntemperatura.fahrenheit = 32;\nconsole.log('32 °F  =', temperatura.emCelsius.toFixed(1), '°C');\nconsole.log('de volta a °F:', temperatura.fahrenheit.toFixed(0));\n\n// Sem `set`, o get vira só de leitura — e o tsc cobra.\n// @ts-expect-error — Cannot assign to 'emCelsius' because it is a read-only property.\ntemperatura.emCelsius = 100;\n\n// O formato mais comum é este: o campo guardado com `_` na frente e o par `get`/`set` com\n// o nome limpo. O `_` não é regra da linguagem — é convenção para não colidir com o acessor.\nclass Produto {\n  private _preco = 0;                            // o atributo de verdade, fechado\n  private _nome = '';\n\n  get preco(): number { return this._preco; }\n  set preco(valor: number) {                     // é aqui que a regra entra\n    if (valor < 0) throw new RangeError('preço não pode ser negativo');\n    this._preco = Math.round(valor * 100) / 100;\n  }\n\n  get nome(): string { return this._nome; }\n  set nome(valor: string) { this._nome = valor.trim(); }\n}\n\nconst produto = new Produto();\nproduto.nome = '  Caneca esmaltada ';            // quem usa escreve como se fosse campo\nproduto.preco = 19.999;\n\nconsole.log(`\"${produto.nome}\" · R$ ${produto.preco.toFixed(2)}`);\n\ntry {\n  produto.preco = -5;                            // e a regra roda em toda atribuição\n} catch (erro) {\n  console.log('recusado:', (erro as Error).message);\n}\n\nconsole.log('preço continua:', produto.preco, '· o campo guardado é `_preco`:',\n  Object.keys(produto).join(', '));\n\nconsole.log('\\nSem o `_` isso não fecharia: `set preco(v) { this.preco = v }` chamaria o');\nconsole.log('próprio set para sempre. O par público é `preco`; o dado mora em `_preco`.');\nconsole.log('É o encapsulamento em uma linha — trocar um campo `public` por get/set depois');\nconsole.log('não quebra ninguém, porque de fora a escrita continua sendo `produto.preco = 10`.');",
        "codigoJs": "class Temperatura {\n    celsius = 0;\n    get fahrenheit() {\n        return this.celsius * 1.8 + 32;\n    }\n    set fahrenheit(valor) {\n        this.celsius = (valor - 32) / 1.8;\n    }\n    get emCelsius() {\n        return this.celsius;\n    }\n}\nconst temperatura = new Temperatura();\ntemperatura.fahrenheit = 212;\nconsole.log('212 °F =', temperatura.emCelsius.toFixed(1), '°C');\ntemperatura.fahrenheit = 32;\nconsole.log('32 °F  =', temperatura.emCelsius.toFixed(1), '°C');\nconsole.log('de volta a °F:', temperatura.fahrenheit.toFixed(0));\ntemperatura.emCelsius = 100;\nclass Produto {\n    _preco = 0;\n    _nome = '';\n    get preco() {\n        return this._preco;\n    }\n    set preco(valor) {\n        if (valor < 0) throw new RangeError('preço não pode ser negativo');\n        this._preco = Math.round(valor * 100) / 100;\n    }\n    get nome() {\n        return this._nome;\n    }\n    set nome(valor) {\n        this._nome = valor.trim();\n    }\n}\nconst produto = new Produto();\nproduto.nome = '  Caneca esmaltada ';\nproduto.preco = 19.999;\nconsole.log(`\"${produto.nome}\" · R$ ${produto.preco.toFixed(2)}`);\ntry {\n    produto.preco = -5;\n} catch (erro) {\n    console.log('recusado:', erro.message);\n}\nconsole.log('preço continua:', produto.preco, '· o campo guardado é `_preco`:', Object.keys(produto).join(', '));\nconsole.log('\\nSem o `_` isso não fecharia: `set preco(v) { this.preco = v }` chamaria o');\nconsole.log('próprio set para sempre. O par público é `preco`; o dado mora em `_preco`.');\nconsole.log('É o encapsulamento em uma linha — trocar um campo `public` por get/set depois');\nconsole.log('não quebra ninguém, porque de fora a escrita continua sendo `produto.preco = 10`.');\n"
       },
       {
        "n": 3,
        "titulo": "Construtor privado e fábrica estática",
        "secao": "ESSENCIAL",
        "codigo": "// Só a própria classe pode dar `new`. Quem está de fora passa pela fábrica, que valida.\nclass Cpf {\n  private constructor(public readonly numero: string) {}\n\n  static criar(bruto: string): Cpf | null {\n    const digitos = bruto.replace(/\\D/g, '');\n    if (digitos.length !== 11) return null;\n    return new Cpf(digitos);\n  }\n\n  formatado(): string {\n    return this.numero.replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, '$1.$2.$3-$4');\n  }\n}\n\nconst valido = Cpf.criar('529.982.247-25');\nconst invalido = Cpf.criar('123');\n\nconsole.log('válido  :', valido?.formatado() ?? 'recusado');\nconsole.log('inválido:', invalido?.formatado() ?? 'recusado');\n\n// @ts-expect-error — Constructor of class 'Cpf' is private and only accessible within the class declaration.\nconsole.log(new Cpf('qualquer coisa').numero);\n\nconsole.log('\\nA partir daqui, um valor do tipo `Cpf` no sistema inteiro é um CPF que já');\nconsole.log('passou pela validação. O tipo deixa de ser rótulo e passa a ser garantia.');",
        "codigoJs": "class Cpf {\n    numero;\n    constructor(numero){\n        this.numero = numero;\n    }\n    static criar(bruto) {\n        const digitos = bruto.replace(/\\D/g, '');\n        if (digitos.length !== 11) return null;\n        return new Cpf(digitos);\n    }\n    formatado() {\n        return this.numero.replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, '$1.$2.$3-$4');\n    }\n}\nconst valido = Cpf.criar('529.982.247-25');\nconst invalido = Cpf.criar('123');\nconsole.log('válido  :', valido?.formatado() ?? 'recusado');\nconsole.log('inválido:', invalido?.formatado() ?? 'recusado');\nconsole.log(new Cpf('qualquer coisa').numero);\nconsole.log('\\nA partir daqui, um valor do tipo `Cpf` no sistema inteiro é um CPF que já');\nconsole.log('passou pela validação. O tipo deixa de ser rótulo e passa a ser garantia.');\n"
       },
       {
        "n": 4,
        "titulo": "`get` para valor derivado",
        "secao": "NA PRÁTICA",
        "codigo": "class NotaFiscal {\n  private itens: { descricao: string; preco: number; quantidade: number }[] = [];\n\n  adicionar(descricao: string, preco: number, quantidade: number): void {\n    this.itens.push({ descricao, preco, quantidade });\n  }\n\n  // Derivado: calculado toda vez, nunca guardado — não tem como ficar desatualizado.\n  get subtotal(): number { return this.itens.reduce((s, i) => s + i.preco * i.quantidade, 0); }\n  get imposto(): number { return this.subtotal * 0.12; }\n  get total(): number { return this.subtotal + this.imposto; }\n  get vazia(): boolean { return this.itens.length === 0; }\n}\n\nconst nota = new NotaFiscal();\nconsole.log('vazia?', nota.vazia);\n\nnota.adicionar('Caneca', 19.9, 2);\nnota.adicionar('Caderno', 32.5, 1);\n\nconsole.log(`subtotal R$ ${nota.subtotal.toFixed(2)}`);\nconsole.log(`imposto  R$ ${nota.imposto.toFixed(2)}`);\nconsole.log(`total    R$ ${nota.total.toFixed(2)}`);\n\nconsole.log('\\nSe `total` fosse um campo comum, alguém teria que lembrar de recalculá-lo a');\nconsole.log('cada `adicionar`. Com `get`, esquecer não é uma opção.');",
        "codigoJs": "class NotaFiscal {\n    itens = [];\n    adicionar(descricao, preco, quantidade) {\n        this.itens.push({\n            descricao,\n            preco,\n            quantidade\n        });\n    }\n    get subtotal() {\n        return this.itens.reduce((s, i)=>s + i.preco * i.quantidade, 0);\n    }\n    get imposto() {\n        return this.subtotal * 0.12;\n    }\n    get total() {\n        return this.subtotal + this.imposto;\n    }\n    get vazia() {\n        return this.itens.length === 0;\n    }\n}\nconst nota = new NotaFiscal();\nconsole.log('vazia?', nota.vazia);\nnota.adicionar('Caneca', 19.9, 2);\nnota.adicionar('Caderno', 32.5, 1);\nconsole.log(`subtotal R$ ${nota.subtotal.toFixed(2)}`);\nconsole.log(`imposto  R$ ${nota.imposto.toFixed(2)}`);\nconsole.log(`total    R$ ${nota.total.toFixed(2)}`);\nconsole.log('\\nSe `total` fosse um campo comum, alguém teria que lembrar de recalculá-lo a');\nconsole.log('cada `adicionar`. Com `get`, esquecer não é uma opção.');\n"
       },
       {
        "n": 5,
        "titulo": "Fábricas nomeadas, em vez de um construtor com tudo",
        "secao": "NA PRÁTICA",
        "codigo": "class Periodo {\n  private constructor(readonly inicio: string, readonly fim: string) {}\n\n  static de(inicio: string, fim: string): Periodo { return new Periodo(inicio, fim); }\n  static mesInteiro(ano: number, mes: number): Periodo {\n    const ultimo = new Date(Date.UTC(ano, mes, 0)).getUTCDate();\n    const dois = (n: number) => String(n).padStart(2, '0');\n    return new Periodo(`${ano}-${dois(mes)}-01`, `${ano}-${dois(mes)}-${dois(ultimo)}`);\n  }\n  static hoje(dia: string): Periodo { return new Periodo(dia, dia); }\n\n  descrever(): string { return this.inicio === this.fim ? this.inicio : `${this.inicio} a ${this.fim}`; }\n}\n\nconsole.log('mês inteiro:', Periodo.mesInteiro(2026, 2).descrever());\nconsole.log('intervalo  :', Periodo.de('2026-08-01', '2026-08-15').descrever());\nconsole.log('um dia     :', Periodo.hoje('2026-08-28').descrever());\n\nconsole.log('\\nTrês construtores com nome, em vez de um `new Periodo(a, b, tipo, flag)` que');\nconsole.log('ninguém entende na hora de chamar. `static` é o que torna isso possível.');",
        "codigoJs": "class Periodo {\n    inicio;\n    fim;\n    constructor(inicio, fim){\n        this.inicio = inicio;\n        this.fim = fim;\n    }\n    static de(inicio, fim) {\n        return new Periodo(inicio, fim);\n    }\n    static mesInteiro(ano, mes) {\n        const ultimo = new Date(Date.UTC(ano, mes, 0)).getUTCDate();\n        const dois = (n)=>String(n).padStart(2, '0');\n        return new Periodo(`${ano}-${dois(mes)}-01`, `${ano}-${dois(mes)}-${dois(ultimo)}`);\n    }\n    static hoje(dia) {\n        return new Periodo(dia, dia);\n    }\n    descrever() {\n        return this.inicio === this.fim ? this.inicio : `${this.inicio} a ${this.fim}`;\n    }\n}\nconsole.log('mês inteiro:', Periodo.mesInteiro(2026, 2).descrever());\nconsole.log('intervalo  :', Periodo.de('2026-08-01', '2026-08-15').descrever());\nconsole.log('um dia     :', Periodo.hoje('2026-08-28').descrever());\nconsole.log('\\nTrês construtores com nome, em vez de um `new Periodo(a, b, tipo, flag)` que');\nconsole.log('ninguém entende na hora de chamar. `static` é o que torna isso possível.');\n"
       },
       {
        "n": 6,
        "titulo": "`static` não enxerga `this` da instância",
        "secao": "PEGADINHAS",
        "codigo": "class Contador {\n  private valor = 0;\n\n  incrementar(): void { this.valor++; }\n\n  static reiniciarTodos(contadores: Contador[]): void {\n    // @ts-expect-error — Property 'valor' does not exist on type 'typeof Contador'.\n    console.log(this.valor);\n    for (const c of contadores) c.zerar();\n  }\n\n  zerar(): void { this.valor = 0; }\n  get atual(): number { return this.valor; }\n}\n\nconst a = new Contador();\nconst b = new Contador();\na.incrementar(); a.incrementar(); b.incrementar();\nconsole.log('antes :', a.atual, b.atual);\n\nContador.reiniciarTodos([a, b]);\nconsole.log('depois:', a.atual, b.atual);\n\nconsole.log('\\nDentro de um método `static`, `this` é a própria CLASSE. Não existe objeto');\nconsole.log('nenhum ali — por isso o método recebe a lista por parâmetro.');",
        "codigoJs": "class Contador {\n    valor = 0;\n    incrementar() {\n        this.valor++;\n    }\n    static reiniciarTodos(contadores) {\n        console.log(this.valor);\n        for (const c of contadores)c.zerar();\n    }\n    zerar() {\n        this.valor = 0;\n    }\n    get atual() {\n        return this.valor;\n    }\n}\nconst a = new Contador();\nconst b = new Contador();\na.incrementar();\na.incrementar();\nb.incrementar();\nconsole.log('antes :', a.atual, b.atual);\nContador.reiniciarTodos([\n    a,\n    b\n]);\nconsole.log('depois:', a.atual, b.atual);\nconsole.log('\\nDentro de um método `static`, `this` é a própria CLASSE. Não existe objeto');\nconsole.log('nenhum ali — por isso o método recebe a lista por parâmetro.');\n"
       },
       {
        "n": 7,
        "titulo": "`get` que faz trabalho pesado engana quem lê",
        "secao": "PEGADINHAS",
        "codigo": "class RelatorioPesado {\n  private vezesCalculado = 0;\n\n  get resumo(): string {\n    this.vezesCalculado++;                     // efeito colateral escondido numa leitura\n    let soma = 0;\n    for (let i = 0; i < 200000; i++) soma += i;\n    return `soma ${soma}`;\n  }\n\n  get quantasVezes(): number { return this.vezesCalculado; }\n}\n\nconst relatorio = new RelatorioPesado();\nconsole.log(relatorio.resumo);\nconsole.log(relatorio.resumo);\nconsole.log('calculado', relatorio.quantasVezes, 'vezes ← duas leituras, dois cálculos inteiros');\n\nconsole.log('\\nQuem escreve `if (r.resumo)` num laço não imagina que está recalculando tudo.');\nconsole.log('Se custa caro ou tem efeito, use um método com nome de verbo: `calcularResumo()`.');",
        "codigoJs": "class RelatorioPesado {\n    vezesCalculado = 0;\n    get resumo() {\n        this.vezesCalculado++;\n        let soma = 0;\n        for(let i = 0; i < 200000; i++)soma += i;\n        return `soma ${soma}`;\n    }\n    get quantasVezes() {\n        return this.vezesCalculado;\n    }\n}\nconst relatorio = new RelatorioPesado();\nconsole.log(relatorio.resumo);\nconsole.log(relatorio.resumo);\nconsole.log('calculado', relatorio.quantasVezes, 'vezes ← duas leituras, dois cálculos inteiros');\nconsole.log('\\nQuem escreve `if (r.resumo)` num laço não imagina que está recalculando tudo.');\nconsole.log('Se custa caro ou tem efeito, use um método com nome de verbo: `calcularResumo()`.');\n"
       }
      ],
      "resumo": [
       "`static` pertence à classe: constante, contador e fábrica. Ali `this` é a classe.",
       "`get`/`set` são métodos com cara de propriedade — bons para valor derivado.",
       "A convenção: campo `private _nome`, acessores `get nome`/`set nome` mexendo nele.",
       "`get` sem `set` é propriedade só de leitura, e o tsc cobra.",
       "Construtor `private` + fábrica estática obriga a criação a passar pela validação.",
       "Fábricas com nome substituem o construtor de seis parâmetros que ninguém decora.",
       "`get` caro ou com efeito colateral engana quem lê: aí escreva um método."
      ]
     },
     {
      "slug": "05-relacoes-entre-classes",
      "arquivo": "typescript/src/06-classes/05-relacoes-entre-classes.ts",
      "comando": "node --experimental-transform-types src/06-classes/05-relacoes-entre-classes.ts",
      "titulo": "Relações entre classes",
      "sessao": 6,
      "oQueE": "como duas classes se ligam quando nenhuma herda da outra — uma guarda a outra (associação), guarda algo que vive sem ela (agregação) ou algo que morre com ela (composição). E o pilar que decide tudo isso: depender do contrato, não da classe.",
      "quandoUsar": "sempre. Na prática, quase toda ligação entre classes é uma dessas três — herança é a exceção rara.",
      "quandoNaoUsar": "não force o nome. Chamar de \"agregação\" ou \"composição\" não muda o código; o que muda é quem cria o objeto e quem manda nele.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Os quatro pilares, em vinte linhas",
        "secao": "ESSENCIAL",
        "codigo": "abstract class Funcionario {                        // ABSTRAÇÃO: o essencial, sem detalhe\n  constructor(public readonly nome: string, private salarioBase: number) {}\n\n  // ENCAPSULAMENTO: o salário só sai por aqui, já com a regra aplicada\n  get salario(): number { return this.salarioBase + this.bonus(); }\n\n  protected abstract bonus(): number;               // POLIMORFISMO: cada filha responde diferente\n}\n\nclass Vendedor extends Funcionario {                // HERANÇA: é um Funcionario\n  constructor(nome: string, salario: number, private vendas: number) { super(nome, salario); }\n  protected bonus(): number { return this.vendas * 0.05; }\n}\n\nclass Gerente extends Funcionario {\n  protected bonus(): number { return 1500; }\n}\n\nconst folha: Funcionario[] = [new Vendedor('Ana', 3000, 20000), new Gerente('Bruno', 8000)];\nfor (const pessoa of folha) console.log(pessoa.nome, '→ R$', pessoa.salario.toFixed(2));\n\n// @ts-expect-error — Property 'salarioBase' is private and only accessible within class 'Funcionario'.\nconsole.log(folha[0].salarioBase);",
        "codigoJs": "class Funcionario {\n    nome;\n    salarioBase;\n    constructor(nome, salarioBase){\n        this.nome = nome;\n        this.salarioBase = salarioBase;\n    }\n    get salario() {\n        return this.salarioBase + this.bonus();\n    }\n}\nclass Vendedor extends Funcionario {\n    vendas;\n    constructor(nome, salario, vendas){\n        super(nome, salario), this.vendas = vendas;\n    }\n    bonus() {\n        return this.vendas * 0.05;\n    }\n}\nclass Gerente extends Funcionario {\n    bonus() {\n        return 1500;\n    }\n}\nconst folha = [\n    new Vendedor('Ana', 3000, 20000),\n    new Gerente('Bruno', 8000)\n];\nfor (const pessoa of folha)console.log(pessoa.nome, '→ R$', pessoa.salario.toFixed(2));\nconsole.log(folha[0].salarioBase);\n"
       },
       {
        "n": 2,
        "titulo": "Associação: uma classe conhece a outra",
        "secao": "ESSENCIAL",
        "codigo": "class Cliente {\n  constructor(public readonly nome: string, public readonly cpf: string) {}\n}\n\nclass Pedido {\n  // O pedido GUARDA um cliente. Os dois existem sozinhos; só há uma referência entre eles.\n  constructor(public readonly numero: number, public readonly cliente: Cliente) {}\n\n  resumo(): string { return `Pedido ${this.numero} · ${this.cliente.nome}`; }\n}\n\nconst ana = new Cliente('Ana', '111.222.333-44');\nconst pedido = new Pedido(1001, ana);\n\nconsole.log(pedido.resumo());\nconsole.log('o cliente continua existindo fora do pedido:', ana.cpf);",
        "codigoJs": "class Cliente {\n    nome;\n    cpf;\n    constructor(nome, cpf){\n        this.nome = nome;\n        this.cpf = cpf;\n    }\n}\nclass Pedido {\n    numero;\n    cliente;\n    constructor(numero, cliente){\n        this.numero = numero;\n        this.cliente = cliente;\n    }\n    resumo() {\n        return `Pedido ${this.numero} · ${this.cliente.nome}`;\n    }\n}\nconst ana = new Cliente('Ana', '111.222.333-44');\nconst pedido = new Pedido(1001, ana);\nconsole.log(pedido.resumo());\nconsole.log('o cliente continua existindo fora do pedido:', ana.cpf);\n"
       },
       {
        "n": 3,
        "titulo": "Agregação × composição: quem morre junto?",
        "secao": "ESSENCIAL",
        "codigo": "class Aluno {\n  constructor(public readonly nome: string) {}\n}\n\n// AGREGAÇÃO: a turma recebe alunos que já existiam. Fechou a turma, os alunos continuam lá.\nclass Turma {\n  private alunos: Aluno[] = [];\n  matricular(aluno: Aluno): void { this.alunos.push(aluno); }\n  get lista(): string[] { return this.alunos.map((a) => a.nome); }\n}\n\n// COMPOSIÇÃO: o item nasce dentro do pedido e não faz sentido fora dele.\nclass ItemDoPedido {\n  constructor(public readonly produto: string, public readonly quantidade: number) {}\n}\n\nclass Carrinho {\n  private itens: ItemDoPedido[] = [];\n  adicionar(produto: string, quantidade: number): void {\n    this.itens.push(new ItemDoPedido(produto, quantidade));   // quem cria é o dono\n  }\n  get total(): number { return this.itens.reduce((soma, i) => soma + i.quantidade, 0); }\n}\n\nconst turma = new Turma();\nconst bruno = new Aluno('Bruno');\nturma.matricular(bruno);\nconsole.log('turma:', turma.lista, '· o aluno existe fora dela:', bruno.nome);\n\nconst carrinho = new Carrinho();\ncarrinho.adicionar('Caneca', 2);\ncarrinho.adicionar('Camiseta', 1);\nconsole.log('itens no carrinho:', carrinho.total, '· nenhum ItemDoPedido existe fora dele');",
        "codigoJs": "class Aluno {\n    nome;\n    constructor(nome){\n        this.nome = nome;\n    }\n}\nclass Turma {\n    alunos = [];\n    matricular(aluno) {\n        this.alunos.push(aluno);\n    }\n    get lista() {\n        return this.alunos.map((a)=>a.nome);\n    }\n}\nclass ItemDoPedido {\n    produto;\n    quantidade;\n    constructor(produto, quantidade){\n        this.produto = produto;\n        this.quantidade = quantidade;\n    }\n}\nclass Carrinho {\n    itens = [];\n    adicionar(produto, quantidade) {\n        this.itens.push(new ItemDoPedido(produto, quantidade));\n    }\n    get total() {\n        return this.itens.reduce((soma, i)=>soma + i.quantidade, 0);\n    }\n}\nconst turma = new Turma();\nconst bruno = new Aluno('Bruno');\nturma.matricular(bruno);\nconsole.log('turma:', turma.lista, '· o aluno existe fora dela:', bruno.nome);\nconst carrinho = new Carrinho();\ncarrinho.adicionar('Caneca', 2);\ncarrinho.adicionar('Camiseta', 1);\nconsole.log('itens no carrinho:', carrinho.total, '· nenhum ItemDoPedido existe fora dele');\n"
       },
       {
        "n": 4,
        "titulo": "Inversão de dependência: dependa da interface",
        "secao": "NA PRÁTICA",
        "codigo": "interface Notificador {\n  enviar(para: string, texto: string): void;\n}\n\nclass NotificadorEmail implements Notificador {\n  enviar(para: string, texto: string): void { console.log(`[e-mail] ${para}: ${texto}`); }\n}\n\nclass NotificadorSms implements Notificador {\n  enviar(para: string, texto: string): void { console.log(`[sms] ${para}: ${texto}`); }\n}\n\n// O serviço não sabe QUAL notificador é: ele recebe um pelo construtor (injeção).\nclass ServicoDeCobranca {\n  constructor(private notificador: Notificador) {}\n\n  cobrar(cliente: string, valor: number): void {\n    this.notificador.enviar(cliente, `Sua fatura de R$ ${valor.toFixed(2)} venceu hoje.`);\n  }\n}\n\nnew ServicoDeCobranca(new NotificadorEmail()).cobrar('ana@exemplo.com', 199.9);\nnew ServicoDeCobranca(new NotificadorSms()).cobrar('(31) 9999-0000', 199.9);\n\n// No teste, entra um dublê — e o serviço nem percebe.\nconst enviados: string[] = [];\nconst espiao: Notificador = { enviar: (para, texto) => { enviados.push(`${para}|${texto}`); } };\nnew ServicoDeCobranca(espiao).cobrar('teste', 10);\nconsole.log('o teste conferiu sem enviar nada:', enviados.length, 'mensagem');",
        "codigoJs": "class NotificadorEmail {\n    enviar(para, texto) {\n        console.log(`[e-mail] ${para}: ${texto}`);\n    }\n}\nclass NotificadorSms {\n    enviar(para, texto) {\n        console.log(`[sms] ${para}: ${texto}`);\n    }\n}\nclass ServicoDeCobranca {\n    notificador;\n    constructor(notificador){\n        this.notificador = notificador;\n    }\n    cobrar(cliente, valor) {\n        this.notificador.enviar(cliente, `Sua fatura de R$ ${valor.toFixed(2)} venceu hoje.`);\n    }\n}\nnew ServicoDeCobranca(new NotificadorEmail()).cobrar('ana@exemplo.com', 199.9);\nnew ServicoDeCobranca(new NotificadorSms()).cobrar('(31) 9999-0000', 199.9);\nconst enviados = [];\nconst espiao = {\n    enviar: (para, texto)=>{\n        enviados.push(`${para}|${texto}`);\n    }\n};\nnew ServicoDeCobranca(espiao).cobrar('teste', 10);\nconsole.log('o teste conferiu sem enviar nada:', enviados.length, 'mensagem');\n"
       },
       {
        "n": 5,
        "titulo": "A mesma classe, dependendo do concreto: o que dói",
        "secao": "NA PRÁTICA",
        "codigo": "class EmailDireto {\n  enviar(para: string, texto: string): void { console.log(`[e-mail] ${para}: ${texto}`); }\n}\n\nclass ServicoAmarrado {\n  private notificador = new EmailDireto();          // criou aqui dentro: ninguém troca\n\n  cobrar(cliente: string, valor: number): void {\n    this.notificador.enviar(cliente, `Fatura de R$ ${valor.toFixed(2)}`);\n  }\n}\n\nnew ServicoAmarrado().cobrar('ana@exemplo.com', 50);\nconsole.log('para testar isto sem mandar e-mail, só mexendo na classe — é o acoplamento.');\n\nconsole.log('\\nA diferença é uma linha: quem CRIA a dependência. Criou lá dentro, amarrou;');\nconsole.log('recebeu pelo construtor, dá para trocar — em produção, em teste, em outro projeto.');",
        "codigoJs": "class EmailDireto {\n    enviar(para, texto) {\n        console.log(`[e-mail] ${para}: ${texto}`);\n    }\n}\nclass ServicoAmarrado {\n    notificador = new EmailDireto();\n    cobrar(cliente, valor) {\n        this.notificador.enviar(cliente, `Fatura de R$ ${valor.toFixed(2)}`);\n    }\n}\nnew ServicoAmarrado().cobrar('ana@exemplo.com', 50);\nconsole.log('para testar isto sem mandar e-mail, só mexendo na classe — é o acoplamento.');\nconsole.log('\\nA diferença é uma linha: quem CRIA a dependência. Criou lá dentro, amarrou;');\nconsole.log('recebeu pelo construtor, dá para trocar — em produção, em teste, em outro projeto.');\n"
       },
       {
        "n": 6,
        "titulo": "Agregação vaza a referência",
        "secao": "PEGADINHAS",
        "codigo": "class Playlist {\n  constructor(private musicas: string[]) {}         // guardou o array de FORA\n  get quantas(): number { return this.musicas.length; }\n}\n\nconst minhasMusicas = ['Aquarela', 'Construção'];\nconst playlist = new Playlist(minhasMusicas);\nminhasMusicas.push('Wave');                         // mexeu no array de fora...\nconsole.log('a playlist mudou sozinha:', playlist.quantas, '← eram 2');\n\n// A cópia no construtor corta o vínculo: agora a lista é dela.\nclass PlaylistSegura {\n  private musicas: string[];\n  constructor(musicas: string[]) { this.musicas = [...musicas]; }\n  get quantas(): number { return this.musicas.length; }\n}\n\nconst outras = ['Aquarela', 'Construção'];\nconst segura = new PlaylistSegura(outras);\noutras.push('Wave');\nconsole.log('a segura não mudou :', segura.quantas);",
        "codigoJs": "class Playlist {\n    musicas;\n    constructor(musicas){\n        this.musicas = musicas;\n    }\n    get quantas() {\n        return this.musicas.length;\n    }\n}\nconst minhasMusicas = [\n    'Aquarela',\n    'Construção'\n];\nconst playlist = new Playlist(minhasMusicas);\nminhasMusicas.push('Wave');\nconsole.log('a playlist mudou sozinha:', playlist.quantas, '← eram 2');\nclass PlaylistSegura {\n    musicas;\n    constructor(musicas){\n        this.musicas = [\n            ...musicas\n        ];\n    }\n    get quantas() {\n        return this.musicas.length;\n    }\n}\nconst outras = [\n    'Aquarela',\n    'Construção'\n];\nconst segura = new PlaylistSegura(outras);\noutras.push('Wave');\nconsole.log('a segura não mudou :', segura.quantas);\n"
       }
      ],
      "resumo": [
       "Abstração, encapsulamento, herança e polimorfismo: os quatro pilares cabem numa classe só.",
       "Associação é a ligação simples — uma classe guarda a referência da outra.",
       "Agregação: o objeto vem de fora e sobrevive ao dono. Composição: nasce dentro e morre junto.",
       "Inversão de dependência = receber a interface pelo construtor, em vez de dar `new` dentro.",
       "Quem recebe a dependência é testável sem gambiarra: basta passar um dublê.",
       "Guardar um array recebido de fora é guardar a referência — copie se a lista tem que ser sua."
      ]
     }
    ]
   },
   {
    "slug": "07-generics",
    "titulo": "Generics",
    "icone": "⌇",
    "cor": "#ffb86c",
    "resumo": "Tipo que vira parâmetro: reaproveitar sem perder o tipo.",
    "topicos": [
     {
      "slug": "01-o-basico",
      "arquivo": "typescript/src/07-generics/01-o-basico.ts",
      "comando": "node src/07-generics/01-o-basico.ts",
      "titulo": "Generics: o básico",
      "sessao": 7,
      "oQueE": "um tipo que vira parâmetro. Em vez de escrever a função para `string` e de novo para `number`, você escreve uma vez com um `<T>` que se ajusta a quem chamou.",
      "quandoUsar": "quando a função ou a classe funciona igual para qualquer tipo e o tipo que entra decide o que sai — `primeiro`, `Caixa`, `Repositorio`.",
      "quandoNaoUsar": "com um `<T>` que aparece uma vez só. Se o tipo não conecta entrada e saída, ele não está fazendo nada — ali cabia `unknown`.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O problema: `any` perde o tipo pelo caminho",
        "secao": "ESSENCIAL",
        "codigo": "function primeiroComAny(lista: any[]): any { return lista[0]; }\n\nconst nomeSolto = primeiroComAny(['Ana', 'Bruno']);\nconsole.log('com any:', nomeSolto.toUpperCase());   // passa, e está certo\ntry {\n  console.log(nomeSolto.toFixed(2));                // o tsc também deixa passar\n} catch (erro) {\n  console.log('com any:', (erro as Error).message, '← só rodando o erro aparece');\n}\n\n// Com generic, o tipo entra e sai: `T` é `string` porque a lista era de string.\nfunction primeiro<T>(lista: T[]): T | undefined { return lista[0]; }\n\nconst nome = primeiro(['Ana', 'Bruno']);            // string | undefined\nconst nota = primeiro([9.2, 6.4]);                  // number | undefined\n\nconsole.log('com generic:', nome?.toUpperCase(), '·', nota?.toFixed(1));\n\ntry {\n  // @ts-expect-error — Property 'toFixed' does not exist on type 'string'.\n  console.log(nome?.toFixed(2));\n} catch (erro) {\n  console.log('com generic:', (erro as Error).message, '← agora o tsc avisa antes');\n}",
        "codigoJs": "function primeiroComAny(lista) {\n    return lista[0];\n}\nconst nomeSolto = primeiroComAny([\n    'Ana',\n    'Bruno'\n]);\nconsole.log('com any:', nomeSolto.toUpperCase());\ntry {\n    console.log(nomeSolto.toFixed(2));\n} catch (erro) {\n    console.log('com any:', erro.message, '← só rodando o erro aparece');\n}\nfunction primeiro(lista) {\n    return lista[0];\n}\nconst nome = primeiro([\n    'Ana',\n    'Bruno'\n]);\nconst nota = primeiro([\n    9.2,\n    6.4\n]);\nconsole.log('com generic:', nome?.toUpperCase(), '·', nota?.toFixed(1));\ntry {\n    console.log(nome?.toFixed(2));\n} catch (erro) {\n    console.log('com generic:', erro.message, '← agora o tsc avisa antes');\n}\n"
       },
       {
        "n": 2,
        "titulo": "Quem preenche o `T` é a chamada",
        "secao": "ESSENCIAL",
        "codigo": "function embrulhar<T>(valor: T): { conteudo: T; embrulhadoEm: string } {\n  return { conteudo: valor, embrulhadoEm: '2026-08-28' };\n}\n\nconst comTexto = embrulhar('Caneca');               // T = string\nconst comObjeto = embrulhar({ sku: 'CAN-01', preco: 19.9 });  // T = { sku: string; preco: number }\n\nconsole.log(comTexto.conteudo.toUpperCase());\nconsole.log(comObjeto.conteudo.sku, '→', comObjeto.conteudo.preco.toFixed(2));\n\n// Dá para dizer o tipo na mão, quando a dedução não é a que você quer.\nconst explicito = embrulhar<string | null>(null);\nconsole.log('explícito:', explicito.conteudo ?? '(vazio)');\n\n// @ts-expect-error — Property 'sku' does not exist on type 'string'.\nconsole.log(comTexto.conteudo.sku);\n\nconsole.log('\\nNa maior parte das vezes você NÃO escreve o `<string>`: o TypeScript deduz');\nconsole.log('pelo argumento. Escrever só quando ele deduz mais largo ou mais estreito do que');\nconsole.log('você queria.');",
        "codigoJs": "function embrulhar(valor) {\n    return {\n        conteudo: valor,\n        embrulhadoEm: '2026-08-28'\n    };\n}\nconst comTexto = embrulhar('Caneca');\nconst comObjeto = embrulhar({\n    sku: 'CAN-01',\n    preco: 19.9\n});\nconsole.log(comTexto.conteudo.toUpperCase());\nconsole.log(comObjeto.conteudo.sku, '→', comObjeto.conteudo.preco.toFixed(2));\nconst explicito = embrulhar(null);\nconsole.log('explícito:', explicito.conteudo ?? '(vazio)');\nconsole.log(comTexto.conteudo.sku);\nconsole.log('\\nNa maior parte das vezes você NÃO escreve o `<string>`: o TypeScript deduz');\nconsole.log('pelo argumento. Escrever só quando ele deduz mais largo ou mais estreito do que');\nconsole.log('você queria.');\n"
       },
       {
        "n": 3,
        "titulo": "Mais de um parâmetro de tipo",
        "secao": "ESSENCIAL",
        "codigo": "function parear<A, B>(primeiro: A, segundo: B): [A, B] { return [primeiro, segundo]; }\n\nconst parNomeIdade = parear('Ana', 30);\nconst parSkuPreco = parear('CAN-01', 19.9);\n\nconsole.log(`${parNomeIdade[0]} tem ${parNomeIdade[1]} anos`);\nconsole.log(`${parSkuPreco[0]} custa R$ ${parSkuPreco[1].toFixed(2)}`);\n\n// A troca clássica, que só é possível porque os dois tipos têm nome.\nfunction inverter<A, B>(par: [A, B]): [B, A] { return [par[1], par[0]]; }\n\nconst invertido = inverter(parNomeIdade);           // [number, string]\nconsole.log('invertido:', invertido[0] + 1, invertido[1].toLowerCase());\n\ntry {\n  // @ts-expect-error — Property 'toLowerCase' does not exist on type 'number'.\n  console.log(invertido[0].toLowerCase());\n} catch (erro) {\n  console.log('trocado   :', (erro as Error).message, '← a posição 0 agora é number');\n}",
        "codigoJs": "function parear(primeiro, segundo) {\n    return [\n        primeiro,\n        segundo\n    ];\n}\nconst parNomeIdade = parear('Ana', 30);\nconst parSkuPreco = parear('CAN-01', 19.9);\nconsole.log(`${parNomeIdade[0]} tem ${parNomeIdade[1]} anos`);\nconsole.log(`${parSkuPreco[0]} custa R$ ${parSkuPreco[1].toFixed(2)}`);\nfunction inverter(par) {\n    return [\n        par[1],\n        par[0]\n    ];\n}\nconst invertido = inverter(parNomeIdade);\nconsole.log('invertido:', invertido[0] + 1, invertido[1].toLowerCase());\ntry {\n    console.log(invertido[0].toLowerCase());\n} catch (erro) {\n    console.log('trocado   :', erro.message, '← a posição 0 agora é number');\n}\n"
       },
       {
        "n": 4,
        "titulo": "Classe genérica: a mesma estrutura para qualquer conteúdo",
        "secao": "NA PRÁTICA",
        "codigo": "class Fila<T> {\n  private itens: T[] = [];\n\n  entrar(item: T): void { this.itens.push(item); }\n  sair(): T | undefined { return this.itens.shift(); }\n  get tamanho(): number { return this.itens.length; }\n  espiar(): T | undefined { return this.itens[0]; }\n}\n\nconst senhas = new Fila<number>();\nsenhas.entrar(101);\nsenhas.entrar(102);\nconsole.log('próxima senha:', senhas.espiar(), '· na fila:', senhas.tamanho);\nconsole.log('chamou       :', senhas.sair(), '· restam:', senhas.tamanho);\n\ntype Tarefa = { titulo: string; prioridade: number };\nconst tarefas = new Fila<Tarefa>();\ntarefas.entrar({ titulo: 'Conferir estoque', prioridade: 1 });\ntarefas.entrar({ titulo: 'Fechar caixa', prioridade: 2 });\nconsole.log('próxima tarefa:', tarefas.espiar()?.titulo);\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\nsenhas.entrar('103');\n\nconsole.log('\\nUma classe, dois usos, zero duplicação — e cada fila continua sabendo o que');\nconsole.log('guarda. É por isso que `Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos.');",
        "codigoJs": "class Fila {\n    itens = [];\n    entrar(item) {\n        this.itens.push(item);\n    }\n    sair() {\n        return this.itens.shift();\n    }\n    get tamanho() {\n        return this.itens.length;\n    }\n    espiar() {\n        return this.itens[0];\n    }\n}\nconst senhas = new Fila();\nsenhas.entrar(101);\nsenhas.entrar(102);\nconsole.log('próxima senha:', senhas.espiar(), '· na fila:', senhas.tamanho);\nconsole.log('chamou       :', senhas.sair(), '· restam:', senhas.tamanho);\nconst tarefas = new Fila();\ntarefas.entrar({\n    titulo: 'Conferir estoque',\n    prioridade: 1\n});\ntarefas.entrar({\n    titulo: 'Fechar caixa',\n    prioridade: 2\n});\nconsole.log('próxima tarefa:', tarefas.espiar()?.titulo);\nsenhas.entrar('103');\nconsole.log('\\nUma classe, dois usos, zero duplicação — e cada fila continua sabendo o que');\nconsole.log('guarda. É por isso que `Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos.');\n"
       },
       {
        "n": 5,
        "titulo": "O generic que atravessa a assíncrona",
        "secao": "NA PRÁTICA",
        "codigo": "// `Promise<T>` é genérica: o que a promessa entrega segue o tipo lá de dentro.\nasync function buscarPorId<T>(tabela: Record<number, T>, id: number): Promise<T | null> {\n  await new Promise((resolver) => setTimeout(resolver, 1));\n  return tabela[id] ?? null;\n}\n\nconst alunos = { 1: { nome: 'Ana', nota: 9.2 }, 2: { nome: 'Bruno', nota: 6.4 } };\nconst cidades = { 1: 'Belo Horizonte', 2: 'Recife' };\n\n(async () => {\n  const aluno = await buscarPorId(alunos, 1);\n  const cidade = await buscarPorId(cidades, 2);\n  const nenhum = await buscarPorId(alunos, 99);\n\n  console.log('aluno :', aluno?.nome, aluno?.nota.toFixed(1));\n  console.log('cidade:', cidade?.toUpperCase());\n  console.log('id 99 :', nenhum ?? 'não encontrado');\n})();",
        "codigoJs": "async function buscarPorId(tabela, id) {\n    await new Promise((resolver)=>setTimeout(resolver, 1));\n    return tabela[id] ?? null;\n}\nconst alunos = {\n    1: {\n        nome: 'Ana',\n        nota: 9.2\n    },\n    2: {\n        nome: 'Bruno',\n        nota: 6.4\n    }\n};\nconst cidades = {\n    1: 'Belo Horizonte',\n    2: 'Recife'\n};\n(async ()=>{\n    const aluno = await buscarPorId(alunos, 1);\n    const cidade = await buscarPorId(cidades, 2);\n    const nenhum = await buscarPorId(alunos, 99);\n    console.log('aluno :', aluno?.nome, aluno?.nota.toFixed(1));\n    console.log('cidade:', cidade?.toUpperCase());\n    console.log('id 99 :', nenhum ?? 'não encontrado');\n})();\n"
       },
       {
        "n": 6,
        "titulo": "`<T>` que aparece uma vez só não serve para nada",
        "secao": "PEGADINHAS",
        "codigo": "// Aqui `T` não conecta nada: entra e some. A função aceita qualquer coisa e devolve string.\nfunction descreverInutil<T>(valor: T): string { return `recebi ${typeof valor}`; }\n\nconsole.log(descreverInutil('texto'), '·', descreverInutil(42));\n\n// A versão honesta diz a mesma coisa e é mais fácil de ler.\nfunction descreverHonesto(valor: unknown): string { return `recebi ${typeof valor}`; }\nconsole.log(descreverHonesto('texto'), '·', descreverHonesto(42));\n\n// Pior ainda: o generic que só existe para o chamador escolher o retorno.\nfunction comoSeFosse<T>(valor: unknown): T { return valor as T; }\nconst mentira = comoSeFosse<number>('42');\nconsole.log('typeof mentira:', typeof mentira, '← o tipo diz number, e é string');\n\nconsole.log('\\nA regra: `T` precisa aparecer pelo menos DUAS vezes — uma na entrada e outra');\nconsole.log('na saída. Se aparece uma vez, ele não está ligando nada, e `unknown` é mais honesto.');",
        "codigoJs": "function descreverInutil(valor) {\n    return `recebi ${typeof valor}`;\n}\nconsole.log(descreverInutil('texto'), '·', descreverInutil(42));\nfunction descreverHonesto(valor) {\n    return `recebi ${typeof valor}`;\n}\nconsole.log(descreverHonesto('texto'), '·', descreverHonesto(42));\nfunction comoSeFosse(valor) {\n    return valor;\n}\nconst mentira = comoSeFosse('42');\nconsole.log('typeof mentira:', typeof mentira, '← o tipo diz number, e é string');\nconsole.log('\\nA regra: `T` precisa aparecer pelo menos DUAS vezes — uma na entrada e outra');\nconsole.log('na saída. Se aparece uma vez, ele não está ligando nada, e `unknown` é mais honesto.');\n"
       }
      ],
      "resumo": [
       "Generic é tipo virando parâmetro: escreve uma vez, serve para qualquer tipo.",
       "Ao contrário de `any`, o tipo que entra é o que sai — nada se perde no caminho.",
       "Quase sempre o TypeScript deduz o `T` pela chamada; escreva `<string>` só quando precisar.",
       "`<A, B>` para mais de um tipo — é o que permite `[A, B]` virar `[B, A]`.",
       "Classe genérica: `Fila<T>`, como `Array<T>`, `Map<K, V>` e `Promise<T>`.",
       "`T` que aparece uma vez só não conecta nada — ali o certo era `unknown`."
      ]
     },
     {
      "slug": "02-restricoes-com-extends",
      "arquivo": "typescript/src/07-generics/02-restricoes-com-extends.ts",
      "comando": "node src/07-generics/02-restricoes-com-extends.ts",
      "titulo": "Restrições com extends",
      "sessao": 7,
      "oQueE": "`<T extends X>` limita o que pode entrar no lugar de `T`. Sem a restrição, `T` é qualquer coisa e nada pode ser feito com ele lá dentro.",
      "quandoUsar": "quando a função precisa de alguma garantia sobre o `T` — que ele tenha `length`, que tenha `id`, que seja uma chave do objeto.",
      "quandoNaoUsar": "para restringir a um tipo só. `<T extends Produto>(p: T)` com um único uso é só `(p: Produto)` escrito de forma complicada.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Sem restrição, `T` não sabe fazer nada",
        "secao": "ESSENCIAL",
        "codigo": "function medirSemRestricao<T>(valor: T): number {\n  // @ts-expect-error — Property 'length' does not exist on type 'T'.\n  return valor.length;\n}\nconsole.log('sem restrição, rodando:', medirSemRestricao('caneca'), medirSemRestricao(42));\n\n// Com `extends`, o compilador passa a saber que existe `length` — e a chamada é conferida.\nfunction medir<T extends { length: number }>(valor: T): number { return valor.length; }\n\nconsole.log('texto:', medir('caneca'));\nconsole.log('lista:', medir([1, 2, 3]));\nconsole.log('objeto com length:', medir({ length: 7, nome: 'qualquer coisa' }));\n\n// @ts-expect-error — Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.\nconsole.log(medir(42));",
        "codigoJs": "function medirSemRestricao(valor) {\n    return valor.length;\n}\nconsole.log('sem restrição, rodando:', medirSemRestricao('caneca'), medirSemRestricao(42));\nfunction medir(valor) {\n    return valor.length;\n}\nconsole.log('texto:', medir('caneca'));\nconsole.log('lista:', medir([\n    1,\n    2,\n    3\n]));\nconsole.log('objeto com length:', medir({\n    length: 7,\n    nome: 'qualquer coisa'\n}));\nconsole.log(medir(42));\n"
       },
       {
        "n": 2,
        "titulo": "Restringir para poder usar o campo",
        "secao": "ESSENCIAL",
        "codigo": "type ComId = { id: number };\n\nfunction indexarPorId<T extends ComId>(itens: T[]): Map<number, T> {\n  const mapa = new Map<number, T>();\n  for (const item of itens) mapa.set(item.id, item);   // só compila por causa do `extends`\n  return mapa;\n}\n\nconst alunos = [\n  { id: 1, nome: 'Ana', nota: 9.2 },\n  { id: 2, nome: 'Bruno', nota: 6.4 },\n];\nconst porId = indexarPorId(alunos);\n\n// O `T` guardou o tipo COMPLETO: `nome` e `nota` continuam ali, não só o `id`.\nconsole.log('aluno 2:', porId.get(2)?.nome, porId.get(2)?.nota.toFixed(1));\n\n// @ts-expect-error — Property 'id' is missing in type '{ nome: string; }'.\nindexarPorId([{ nome: 'Carla' }]);\n\nconsole.log('\\nSe a assinatura fosse `(itens: ComId[]): Map<number, ComId>`, o retorno perderia');\nconsole.log('`nome` e `nota`. É isso que o generic com restrição preserva.');",
        "codigoJs": "function indexarPorId(itens) {\n    const mapa = new Map();\n    for (const item of itens)mapa.set(item.id, item);\n    return mapa;\n}\nconst alunos = [\n    {\n        id: 1,\n        nome: 'Ana',\n        nota: 9.2\n    },\n    {\n        id: 2,\n        nome: 'Bruno',\n        nota: 6.4\n    }\n];\nconst porId = indexarPorId(alunos);\nconsole.log('aluno 2:', porId.get(2)?.nome, porId.get(2)?.nota.toFixed(1));\nindexarPorId([\n    {\n        nome: 'Carla'\n    }\n]);\nconsole.log('\\nSe a assinatura fosse `(itens: ComId[]): Map<number, ComId>`, o retorno perderia');\nconsole.log('`nome` e `nota`. É isso que o generic com restrição preserva.');\n"
       },
       {
        "n": 3,
        "titulo": "`keyof`: restringir à chave de um objeto",
        "secao": "ESSENCIAL",
        "codigo": "function pegar<T extends object, K extends keyof T>(objeto: T, chave: K): T[K] {\n  return objeto[chave];\n}\n\nconst produto = { sku: 'CAN-01', preco: 19.9, ativo: true };\n\nconst sku = pegar(produto, 'sku');        // string\nconst preco = pegar(produto, 'preco');    // number\nconst ativo = pegar(produto, 'ativo');    // boolean\n\nconsole.log(sku.toUpperCase(), preco.toFixed(2), ativo ? 'ativo' : 'inativo');\n\n// @ts-expect-error — Argument of type '\"estoque\"' is not assignable to parameter of type '\"sku\" | \"preco\" | \"ativo\"'.\nconsole.log(pegar(produto, 'estoque'));\n\nconsole.log('\\nRepare que cada chamada devolveu um tipo diferente, e nenhuma precisou de `as`.');\nconsole.log('`T[K]` é o tipo do valor daquela chave — o próximo tópico é só sobre isso.');",
        "codigoJs": "function pegar(objeto, chave) {\n    return objeto[chave];\n}\nconst produto = {\n    sku: 'CAN-01',\n    preco: 19.9,\n    ativo: true\n};\nconst sku = pegar(produto, 'sku');\nconst preco = pegar(produto, 'preco');\nconst ativo = pegar(produto, 'ativo');\nconsole.log(sku.toUpperCase(), preco.toFixed(2), ativo ? 'ativo' : 'inativo');\nconsole.log(pegar(produto, 'estoque'));\nconsole.log('\\nRepare que cada chamada devolveu um tipo diferente, e nenhuma precisou de `as`.');\nconsole.log('`T[K]` é o tipo do valor daquela chave — o próximo tópico é só sobre isso.');\n"
       },
       {
        "n": 4,
        "titulo": "Ordenar por qualquer campo, sem perder o tipo",
        "secao": "NA PRÁTICA",
        "codigo": "function ordenarPor<T, K extends keyof T>(itens: T[], campo: K, direcao: 'asc' | 'desc' = 'asc'): T[] {\n  const sinal = direcao === 'asc' ? 1 : -1;\n  return [...itens].sort((a, b) => (a[campo] < b[campo] ? -sinal : a[campo] > b[campo] ? sinal : 0));\n}\n\nconst vendas = [\n  { vendedor: 'Carla', total: 430, mes: 'jan' },\n  { vendedor: 'Ana', total: 1200, mes: 'fev' },\n  { vendedor: 'Bruno', total: 890, mes: 'jan' },\n];\n\nconsole.log('por total (desc):', ordenarPor(vendas, 'total', 'desc').map((v) => v.vendedor).join(' > '));\nconsole.log('por vendedor    :', ordenarPor(vendas, 'vendedor').map((v) => v.vendedor).join(' < '));\n\n// @ts-expect-error — Argument of type '\"comissao\"' is not assignable to parameter of type 'keyof ...'.\nordenarPor(vendas, 'comissao');\n\nconsole.log('\\nUma função para qualquer lista de qualquer formato, com o nome do campo');\nconsole.log('conferido pelo compilador. Sem generic, isso seria `(itens: any[], campo: string)`.');",
        "codigoJs": "function ordenarPor(itens, campo, direcao = 'asc') {\n    const sinal = direcao === 'asc' ? 1 : -1;\n    return [\n        ...itens\n    ].sort((a, b)=>a[campo] < b[campo] ? -sinal : a[campo] > b[campo] ? sinal : 0);\n}\nconst vendas = [\n    {\n        vendedor: 'Carla',\n        total: 430,\n        mes: 'jan'\n    },\n    {\n        vendedor: 'Ana',\n        total: 1200,\n        mes: 'fev'\n    },\n    {\n        vendedor: 'Bruno',\n        total: 890,\n        mes: 'jan'\n    }\n];\nconsole.log('por total (desc):', ordenarPor(vendas, 'total', 'desc').map((v)=>v.vendedor).join(' > '));\nconsole.log('por vendedor    :', ordenarPor(vendas, 'vendedor').map((v)=>v.vendedor).join(' < '));\nordenarPor(vendas, 'comissao');\nconsole.log('\\nUma função para qualquer lista de qualquer formato, com o nome do campo');\nconsole.log('conferido pelo compilador. Sem generic, isso seria `(itens: any[], campo: string)`.');\n"
       },
       {
        "n": 5,
        "titulo": "Valor padrão para o parâmetro de tipo",
        "secao": "NA PRÁTICA",
        "codigo": "type Resposta<T = string> = { status: number; corpo: T };\n\nconst respostaDeTexto: Resposta = { status: 200, corpo: 'tudo certo' };\nconst respostaDeLista: Resposta<{ id: number }[]> = { status: 200, corpo: [{ id: 1 }, { id: 2 }] };\n\nconsole.log(`${respostaDeTexto.status}: ${respostaDeTexto.corpo.toUpperCase()}`);\nconsole.log(`${respostaDeLista.status}: ${respostaDeLista.corpo.length} itens`);\n\n// O padrão também funciona em função e em classe.\nclass Cache<T = unknown> {\n  private dados = new Map<string, T>();\n  guardar(chave: string, valor: T): void { this.dados.set(chave, valor); }\n  buscar(chave: string): T | undefined { return this.dados.get(chave); }\n}\n\nconst cachePrecos = new Cache<number>();\ncachePrecos.guardar('CAN-01', 19.9);\nconsole.log('cache:', cachePrecos.buscar('CAN-01')?.toFixed(2), '·', cachePrecos.buscar('XXX') ?? 'vazio');\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\ncachePrecos.guardar('CAD-02', '32.50');",
        "codigoJs": "const respostaDeTexto = {\n    status: 200,\n    corpo: 'tudo certo'\n};\nconst respostaDeLista = {\n    status: 200,\n    corpo: [\n        {\n            id: 1\n        },\n        {\n            id: 2\n        }\n    ]\n};\nconsole.log(`${respostaDeTexto.status}: ${respostaDeTexto.corpo.toUpperCase()}`);\nconsole.log(`${respostaDeLista.status}: ${respostaDeLista.corpo.length} itens`);\nclass Cache {\n    dados = new Map();\n    guardar(chave, valor) {\n        this.dados.set(chave, valor);\n    }\n    buscar(chave) {\n        return this.dados.get(chave);\n    }\n}\nconst cachePrecos = new Cache();\ncachePrecos.guardar('CAN-01', 19.9);\nconsole.log('cache:', cachePrecos.buscar('CAN-01')?.toFixed(2), '·', cachePrecos.buscar('XXX') ?? 'vazio');\ncachePrecos.guardar('CAD-02', '32.50');\n"
       },
       {
        "n": 6,
        "titulo": "`extends` com um tipo só é generic desnecessário",
        "secao": "PEGADINHAS",
        "codigo": "type Produto = { sku: string; preco: number };\n\n// Aqui `T` não faz nada: entra Produto, sai string. É `(p: Produto): string` com rodeio.\nfunction etiquetaComplicada<T extends Produto>(produto: T): string {\n  return `${produto.sku}: R$ ${produto.preco.toFixed(2)}`;\n}\n\n// A versão simples faz o mesmo, e qualquer objeto compatível continua servindo.\nfunction etiqueta(produto: Produto): string {\n  return `${produto.sku}: R$ ${produto.preco.toFixed(2)}`;\n}\n\nconst comExtras = { sku: 'CAN-01', preco: 19.9, estoque: 12 };\nconsole.log('complicada:', etiquetaComplicada(comExtras));\nconsole.log('simples   :', etiqueta(comExtras), '← aceita igual, por tipagem estrutural');\n\nconsole.log('\\nO generic só se paga quando o `T` REAPARECE no retorno. Se a função devolve');\nconsole.log('sempre o mesmo tipo, a restrição sozinha não justifica o `<T>`.');",
        "codigoJs": "function etiquetaComplicada(produto) {\n    return `${produto.sku}: R$ ${produto.preco.toFixed(2)}`;\n}\nfunction etiqueta(produto) {\n    return `${produto.sku}: R$ ${produto.preco.toFixed(2)}`;\n}\nconst comExtras = {\n    sku: 'CAN-01',\n    preco: 19.9,\n    estoque: 12\n};\nconsole.log('complicada:', etiquetaComplicada(comExtras));\nconsole.log('simples   :', etiqueta(comExtras), '← aceita igual, por tipagem estrutural');\nconsole.log('\\nO generic só se paga quando o `T` REAPARECE no retorno. Se a função devolve');\nconsole.log('sempre o mesmo tipo, a restrição sozinha não justifica o `<T>`.');\n"
       },
       {
        "n": 7,
        "titulo": "`object` não é o mesmo que \"qualquer objeto útil\"",
        "secao": "PEGADINHAS",
        "codigo": "function contarChaves<T extends object>(valor: T): number { return Object.keys(valor).length; }\n\nconsole.log('objeto:', contarChaves({ a: 1, b: 2 }));\nconsole.log('lista :', contarChaves([1, 2, 3]), '← array também é object');\nconsole.log('função:', contarChaves(() => {}), '← função também');\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'object'.\ncontarChaves('texto');\n\nconsole.log('\\n`extends object` deixa entrar array, função, Date e Map. Quando você quer');\nconsole.log('mesmo \"um objeto de dados\", `extends Record<string, unknown>` é mais preciso.');",
        "codigoJs": "function contarChaves(valor) {\n    return Object.keys(valor).length;\n}\nconsole.log('objeto:', contarChaves({\n    a: 1,\n    b: 2\n}));\nconsole.log('lista :', contarChaves([\n    1,\n    2,\n    3\n]), '← array também é object');\nconsole.log('função:', contarChaves(()=>{}), '← função também');\ncontarChaves('texto');\nconsole.log('\\n`extends object` deixa entrar array, função, Date e Map. Quando você quer');\nconsole.log('mesmo \"um objeto de dados\", `extends Record<string, unknown>` é mais preciso.');\n"
       }
      ],
      "resumo": [
       "`<T extends X>` é o que dá ao compilador alguma certeza sobre o `T`.",
       "Sem restrição, nada pode ser feito com `T` lá dentro — nem ler `.length`.",
       "`K extends keyof T` restringe a chave, e `T[K]` devolve o tipo daquele campo.",
       "`<T = string>` dá um padrão para quem não quiser escolher.",
       "Restrição a um tipo só, sem `T` no retorno, é generic sem função — simplifique.",
       "`extends object` aceita array, função e Date; `Record<string, unknown>` é mais estreito."
      ]
     },
     {
      "slug": "03-keyof-e-typeof",
      "arquivo": "typescript/src/07-generics/03-keyof-e-typeof.ts",
      "comando": "node src/07-generics/03-keyof-e-typeof.ts",
      "titulo": "keyof, typeof e tipos indexados",
      "sessao": 7,
      "oQueE": "três operadores que trabalham em cima de tipos. `keyof T` é a união das chaves de `T`; `typeof valor` pega o tipo de um valor que já existe; `T['campo']` pega o tipo de um campo.",
      "quandoUsar": "quando o tipo pode ser DERIVADO de algo que já está escrito — um objeto de configuração, uma constante, outro tipo.",
      "quandoNaoUsar": "quando derivar deixa o tipo ilegível. Um alias com nome próprio vale mais do que uma expressão de tipo de três linhas.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`keyof`: as chaves viram uma união",
        "secao": "ESSENCIAL",
        "codigo": "type Produto = { sku: string; nome: string; preco: number };\ntype CampoDeProduto = keyof Produto;              // 'sku' | 'nome' | 'preco'\n\nconst camposParaMostrar: CampoDeProduto[] = ['sku', 'preco'];\n\nconst caneca: Produto = { sku: 'CAN-01', nome: 'Caneca', preco: 19.9 };\nfor (const campo of camposParaMostrar) console.log(`${campo.padEnd(6)} ${caneca[campo]}`);\n\n// @ts-expect-error — Type '\"estoque\"' is not assignable to type 'keyof Produto'.\nconst invalido: CampoDeProduto = 'estoque';\nconsole.log('rodando, é só um texto:', invalido);\n\nconsole.log('\\nA lista de campos está escrita UMA vez, no tipo. Acrescentar `estoque` ao');\nconsole.log('`Produto` acrescenta ao `CampoDeProduto` sozinho — não há segunda lista para esquecer.');",
        "codigoJs": "const camposParaMostrar = [\n    'sku',\n    'preco'\n];\nconst caneca = {\n    sku: 'CAN-01',\n    nome: 'Caneca',\n    preco: 19.9\n};\nfor (const campo of camposParaMostrar)console.log(`${campo.padEnd(6)} ${caneca[campo]}`);\nconst invalido = 'estoque';\nconsole.log('rodando, é só um texto:', invalido);\nconsole.log('\\nA lista de campos está escrita UMA vez, no tipo. Acrescentar `estoque` ao');\nconsole.log('`Produto` acrescenta ao `CampoDeProduto` sozinho — não há segunda lista para esquecer.');\n"
       },
       {
        "n": 2,
        "titulo": "`typeof`: do valor para o tipo",
        "secao": "ESSENCIAL",
        "codigo": "// Aqui a fonte da verdade é o objeto, não o tipo. O tipo sai dele.\nconst configuracaoPadrao = {\n  ambiente: 'producao',\n  porta: 3000,\n  tentativas: 3,\n  debug: false,\n};\n\ntype Configuracao = typeof configuracaoPadrao;    // { ambiente: string; porta: number; ... }\n\nfunction subir(config: Configuracao): string {\n  return `${config.ambiente}:${config.porta} (debug=${config.debug})`;\n}\n\nconsole.log(subir(configuracaoPadrao));\nconsole.log(subir({ ...configuracaoPadrao, ambiente: 'local', debug: true }));\n\n// @ts-expect-error — Property 'debug' is missing in type '{ ambiente: string; porta: number; tentativas: number; }'.\nsubir({ ambiente: 'local', porta: 8080, tentativas: 1 });\n\nconsole.log('\\nCuidado com o nome: `typeof` AQUI é operador de tipo, não o `typeof` que roda.');\nconsole.log('São dois operadores diferentes com o mesmo nome — o de tipo só existe em anotação.');",
        "codigoJs": "const configuracaoPadrao = {\n    ambiente: 'producao',\n    porta: 3000,\n    tentativas: 3,\n    debug: false\n};\nfunction subir(config) {\n    return `${config.ambiente}:${config.porta} (debug=${config.debug})`;\n}\nconsole.log(subir(configuracaoPadrao));\nconsole.log(subir({\n    ...configuracaoPadrao,\n    ambiente: 'local',\n    debug: true\n}));\nsubir({\n    ambiente: 'local',\n    porta: 8080,\n    tentativas: 1\n});\nconsole.log('\\nCuidado com o nome: `typeof` AQUI é operador de tipo, não o `typeof` que roda.');\nconsole.log('São dois operadores diferentes com o mesmo nome — o de tipo só existe em anotação.');\n"
       },
       {
        "n": 3,
        "titulo": "`T['campo']`: o tipo de um campo",
        "secao": "ESSENCIAL",
        "codigo": "type Pedido = {\n  id: number;\n  status: 'pendente' | 'pago' | 'enviado';\n  itens: { sku: string; quantidade: number }[];\n};\n\ntype Status = Pedido['status'];                   // 'pendente' | 'pago' | 'enviado'\ntype Item = Pedido['itens'][number];              // { sku: string; quantidade: number }\n\nfunction proximoStatus(atual: Status): Status {\n  return atual === 'pendente' ? 'pago' : atual === 'pago' ? 'enviado' : 'enviado';\n}\n\nconst item: Item = { sku: 'CAN-01', quantidade: 2 };\nconsole.log('item :', item.sku, `x${item.quantidade}`);\nconsole.log('fluxo:', ['pendente', 'pago', 'enviado'].map((s) => proximoStatus(s as Status)).join(' → '));\n\n// @ts-expect-error — Type '\"cancelado\"' is not assignable to type 'Status'.\nconsole.log(proximoStatus('cancelado'));\n\nconsole.log('\\n`Pedido[\"itens\"][number]` é o truque para pegar o tipo de UM item de uma lista.');\nconsole.log('Sem ele, seria preciso extrair o tipo do item para um alias só para poder citá-lo.');",
        "codigoJs": "function proximoStatus(atual) {\n    return atual === 'pendente' ? 'pago' : atual === 'pago' ? 'enviado' : 'enviado';\n}\nconst item = {\n    sku: 'CAN-01',\n    quantidade: 2\n};\nconsole.log('item :', item.sku, `x${item.quantidade}`);\nconsole.log('fluxo:', [\n    'pendente',\n    'pago',\n    'enviado'\n].map((s)=>proximoStatus(s)).join(' → '));\nconsole.log(proximoStatus('cancelado'));\nconsole.log('\\n`Pedido[\"itens\"][number]` é o truque para pegar o tipo de UM item de uma lista.');\nconsole.log('Sem ele, seria preciso extrair o tipo do item para um alias só para poder citá-lo.');\n"
       },
       {
        "n": 4,
        "titulo": "Os três juntos: um formulário tipado pela constante",
        "secao": "NA PRÁTICA",
        "codigo": "const CAMPOS_DO_FORMULARIO = {\n  nome: { rotulo: 'Nome completo', obrigatorio: true },\n  email: { rotulo: 'E-mail', obrigatorio: true },\n  telefone: { rotulo: 'Telefone', obrigatorio: false },\n} as const;\n\ntype NomeDoCampo = keyof typeof CAMPOS_DO_FORMULARIO;      // 'nome' | 'email' | 'telefone'\ntype Preenchimento = Record<NomeDoCampo, string>;\n\nfunction validar(valores: Preenchimento): string[] {\n  const erros: string[] = [];\n  for (const campo of Object.keys(CAMPOS_DO_FORMULARIO) as NomeDoCampo[]) {\n    const definicao = CAMPOS_DO_FORMULARIO[campo];\n    if (definicao.obrigatorio && !valores[campo].trim()) erros.push(`${definicao.rotulo} é obrigatório`);\n  }\n  return erros;\n}\n\nconsole.log('completo :', validar({ nome: 'Ana', email: 'ana@loja.dev', telefone: '' }));\nconsole.log('faltando :', validar({ nome: '', email: '', telefone: '81 99999-0000' }));\n\n// @ts-expect-error — Property 'telefone' is missing in type '{ nome: string; email: string; }'.\nvalidar({ nome: 'Ana', email: 'ana@loja.dev' });\n\nconsole.log('\\nUm campo novo na constante entra no tipo, na validação e na conferência de');\nconsole.log('quem chama, tudo de uma vez. Nada foi escrito duas vezes.');",
        "codigoJs": "const CAMPOS_DO_FORMULARIO = {\n    nome: {\n        rotulo: 'Nome completo',\n        obrigatorio: true\n    },\n    email: {\n        rotulo: 'E-mail',\n        obrigatorio: true\n    },\n    telefone: {\n        rotulo: 'Telefone',\n        obrigatorio: false\n    }\n};\nfunction validar(valores) {\n    const erros = [];\n    for (const campo of Object.keys(CAMPOS_DO_FORMULARIO)){\n        const definicao = CAMPOS_DO_FORMULARIO[campo];\n        if (definicao.obrigatorio && !valores[campo].trim()) erros.push(`${definicao.rotulo} é obrigatório`);\n    }\n    return erros;\n}\nconsole.log('completo :', validar({\n    nome: 'Ana',\n    email: 'ana@loja.dev',\n    telefone: ''\n}));\nconsole.log('faltando :', validar({\n    nome: '',\n    email: '',\n    telefone: '81 99999-0000'\n}));\nvalidar({\n    nome: 'Ana',\n    email: 'ana@loja.dev'\n});\nconsole.log('\\nUm campo novo na constante entra no tipo, na validação e na conferência de');\nconsole.log('quem chama, tudo de uma vez. Nada foi escrito duas vezes.');\n"
       },
       {
        "n": 5,
        "titulo": "`keyof` para um tradutor de nomes de coluna",
        "secao": "NA PRÁTICA",
        "codigo": "type LinhaDoBanco = { user_name: string; created_at: string; total_amount: number };\ntype LinhaDoApp = { nome: string; criadoEm: string; total: number };\n\n// O mapa é conferido dos dois lados: chave de um, valor do outro.\nconst DE_PARA: Record<keyof LinhaDoBanco, keyof LinhaDoApp> = {\n  user_name: 'nome',\n  created_at: 'criadoEm',\n  total_amount: 'total',\n};\n\nfunction traduzir(linha: LinhaDoBanco): LinhaDoApp {\n  return { nome: linha.user_name, criadoEm: linha.created_at, total: linha.total_amount };\n}\n\nconst doBanco: LinhaDoBanco = { user_name: 'Ana', created_at: '2026-08-28', total_amount: 249.9 };\nconsole.log('de → para:', Object.entries(DE_PARA).map(([de, para]) => `${de}→${para}`).join(' · '));\nconsole.log('traduzido:', JSON.stringify(traduzir(doBanco)));\n\n// @ts-expect-error — Type '\"nomeDoUsuario\"' is not assignable to type 'keyof LinhaDoApp'.\nconst mapaTorto: Record<keyof LinhaDoBanco, keyof LinhaDoApp> = { ...DE_PARA, user_name: 'nomeDoUsuario' };\nconsole.log('rodando, o mapa torto existe:', mapaTorto.user_name);",
        "codigoJs": "const DE_PARA = {\n    user_name: 'nome',\n    created_at: 'criadoEm',\n    total_amount: 'total'\n};\nfunction traduzir(linha) {\n    return {\n        nome: linha.user_name,\n        criadoEm: linha.created_at,\n        total: linha.total_amount\n    };\n}\nconst doBanco = {\n    user_name: 'Ana',\n    created_at: '2026-08-28',\n    total_amount: 249.9\n};\nconsole.log('de → para:', Object.entries(DE_PARA).map(([de, para])=>`${de}→${para}`).join(' · '));\nconsole.log('traduzido:', JSON.stringify(traduzir(doBanco)));\nconst mapaTorto = {\n    ...DE_PARA,\n    user_name: 'nomeDoUsuario'\n};\nconsole.log('rodando, o mapa torto existe:', mapaTorto.user_name);\n"
       },
       {
        "n": 6,
        "titulo": "`Object.keys` devolve `string[]`, não `keyof T`",
        "secao": "PEGADINHAS",
        "codigo": "const precos = { 'CAN-01': 19.9, 'CAD-02': 32.5 };\n\nconst chaves = Object.keys(precos);               // string[] — não 'CAN-01' | 'CAD-02'\n// @ts-expect-error — Type 'string' can't be used to index type '{ \"CAN-01\": number; ... }'.\nconsole.log(chaves.map((c) => precos[c]));\n\n// Os dois jeitos honestos: afirmar o tipo, ou usar `Object.entries`, que já vem em par.\nconst chavesTipadas = Object.keys(precos) as (keyof typeof precos)[];\nconsole.log('com as     :', chavesTipadas.map((c) => precos[c].toFixed(2)).join(' · '));\nconsole.log('com entries:', Object.entries(precos).map(([sku, p]) => `${sku}=${p.toFixed(2)}`).join(' · '));\n\nconsole.log('\\nO TypeScript não promete que as chaves são só essas: por tipagem estrutural,');\nconsole.log('o objeto pode ter mais campos do que o tipo declara. Por isso `Object.keys` é largo.');",
        "codigoJs": "const precos = {\n    'CAN-01': 19.9,\n    'CAD-02': 32.5\n};\nconst chaves = Object.keys(precos);\nconsole.log(chaves.map((c)=>precos[c]));\nconst chavesTipadas = Object.keys(precos);\nconsole.log('com as     :', chavesTipadas.map((c)=>precos[c].toFixed(2)).join(' · '));\nconsole.log('com entries:', Object.entries(precos).map(([sku, p])=>`${sku}=${p.toFixed(2)}`).join(' · '));\nconsole.log('\\nO TypeScript não promete que as chaves são só essas: por tipagem estrutural,');\nconsole.log('o objeto pode ter mais campos do que o tipo declara. Por isso `Object.keys` é largo.');\n"
       }
      ],
      "resumo": [
       "`keyof T` é a união das chaves de `T` — a lista de campos sem escrever a lista.",
       "`typeof valor` (em anotação) pega o tipo de algo que já existe: constante, objeto, função.",
       "`T['campo']` pega o tipo de um campo; `T['lista'][number]` pega o do item.",
       "`keyof typeof CONSTANTE` é a dupla mais usada: a constante vira a fonte do tipo.",
       "Derivar evita a segunda lista que sempre esquece de ser atualizada.",
       "`Object.keys` devolve `string[]` de propósito — o objeto pode ter mais do que o tipo diz."
      ]
     },
     {
      "slug": "04-utility-types",
      "arquivo": "typescript/src/07-generics/04-utility-types.ts",
      "comando": "node src/07-generics/04-utility-types.ts",
      "titulo": "Utility types",
      "sessao": 7,
      "oQueE": "tipos genéricos que já vêm com o TypeScript e produzem um tipo novo a partir de outro: `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`.",
      "quandoUsar": "quando o tipo novo é o antigo com uma diferença — o corpo de um PATCH, a versão pública de um usuário, o mapa de um valor por chave.",
      "quandoNaoUsar": "empilhados. `Partial<Omit<Pick<T, A>, B>>` ninguém lê — nesse ponto, escreva o tipo com as mãos e dê um nome a ele.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`Partial` e `Required`",
        "secao": "ESSENCIAL",
        "codigo": "type Aluno = { id: number; nome: string; email: string; nota: number };\n\n// PATCH manda só o que mudou: todo campo vira opcional.\ntype AlunoParaAtualizar = Partial<Aluno>;\n\nfunction atualizar(atual: Aluno, mudancas: AlunoParaAtualizar): Aluno {\n  return { ...atual, ...mudancas };\n}\n\nconst ana: Aluno = { id: 1, nome: 'Ana Souza', email: 'ana@escola.dev', nota: 8.4 };\nconsole.log('nota nova:', JSON.stringify(atualizar(ana, { nota: 9.2 })));\nconsole.log('sem nada :', JSON.stringify(atualizar(ana, {})));\n\n// @ts-expect-error — Object literal may only specify known properties. Did you mean 'nota'?\natualizar(ana, { notaa: 10 });\n\n// `Required` faz o contrário: opcional vira obrigatório.\ntype ConfiguracaoParcial = { host?: string; porta?: number };\ntype ConfiguracaoCompleta = Required<ConfiguracaoParcial>;\n\nconst completa: ConfiguracaoCompleta = { host: 'localhost', porta: 3000 };\nconsole.log('completa :', `${completa.host}:${completa.porta}`);\n\n// @ts-expect-error — Property 'porta' is missing.\nconst faltando: ConfiguracaoCompleta = { host: 'localhost' };\nconsole.log('rodando  :', JSON.stringify(faltando));",
        "codigoJs": "function atualizar(atual, mudancas) {\n    return {\n        ...atual,\n        ...mudancas\n    };\n}\nconst ana = {\n    id: 1,\n    nome: 'Ana Souza',\n    email: 'ana@escola.dev',\n    nota: 8.4\n};\nconsole.log('nota nova:', JSON.stringify(atualizar(ana, {\n    nota: 9.2\n})));\nconsole.log('sem nada :', JSON.stringify(atualizar(ana, {})));\natualizar(ana, {\n    notaa: 10\n});\nconst completa = {\n    host: 'localhost',\n    porta: 3000\n};\nconsole.log('completa :', `${completa.host}:${completa.porta}`);\nconst faltando = {\n    host: 'localhost'\n};\nconsole.log('rodando  :', JSON.stringify(faltando));\n"
       },
       {
        "n": 2,
        "titulo": "`Pick` e `Omit`: escolher ou tirar campos",
        "secao": "ESSENCIAL",
        "codigo": "type Usuario = { id: number; nome: string; email: string; senhaHash: string; criadoEm: string };\n\ntype UsuarioPublico = Omit<Usuario, 'senhaHash'>;             // tudo, menos a senha\ntype ResumoDeUsuario = Pick<Usuario, 'id' | 'nome'>;          // só estes dois\n\nconst doBanco: Usuario = {\n  id: 7, nome: 'Ana', email: 'ana@loja.dev',\n  senhaHash: '$2a$08$abc...', criadoEm: '2026-08-01',\n};\n\nconst paraApi: UsuarioPublico = (({ senhaHash, ...resto }) => resto)(doBanco);\nconst paraLista: ResumoDeUsuario = { id: doBanco.id, nome: doBanco.nome };\n\nconsole.log('público:', JSON.stringify(paraApi));\nconsole.log('resumo :', JSON.stringify(paraLista));\n\n// @ts-expect-error — Property 'senhaHash' does not exist on type 'UsuarioPublico'.\nconsole.log(paraApi.senhaHash);\n\nconsole.log('\\n`Omit` é a defesa mais barata contra vazar campo: o tipo do que sai da API é');\nconsole.log('derivado do tipo do banco, e o campo novo e sensível não entra sozinho na resposta.');",
        "codigoJs": "const doBanco = {\n    id: 7,\n    nome: 'Ana',\n    email: 'ana@loja.dev',\n    senhaHash: '$2a$08$abc...',\n    criadoEm: '2026-08-01'\n};\nconst paraApi = (({ senhaHash, ...resto })=>resto)(doBanco);\nconst paraLista = {\n    id: doBanco.id,\n    nome: doBanco.nome\n};\nconsole.log('público:', JSON.stringify(paraApi));\nconsole.log('resumo :', JSON.stringify(paraLista));\nconsole.log(paraApi.senhaHash);\nconsole.log('\\n`Omit` é a defesa mais barata contra vazar campo: o tipo do que sai da API é');\nconsole.log('derivado do tipo do banco, e o campo novo e sensível não entra sozinho na resposta.');\n"
       },
       {
        "n": 3,
        "titulo": "`Record`: um valor por chave",
        "secao": "ESSENCIAL",
        "codigo": "type Nivel = 'baixo' | 'medio' | 'alto';\n\n// `Record<K, V>` cobra TODAS as chaves de K — esquecer uma é erro.\nconst CORES: Record<Nivel, string> = { baixo: 'verde', medio: 'amarelo', alto: 'vermelho' };\n\nfor (const nivel of Object.keys(CORES) as Nivel[]) console.log(`${nivel.padEnd(6)} ${CORES[nivel]}`);\n\n// @ts-expect-error — Property 'alto' is missing in type '{ baixo: string; medio: string; }'.\nconst incompleto: Record<Nivel, string> = { baixo: 'verde', medio: 'amarelo' };\nconsole.log('incompleto, rodando:', Object.keys(incompleto).length, 'chaves');\n\n// Com chave `string`, `Record` vira o dicionário aberto de sempre.\nconst estoque: Record<string, number> = { 'CAN-01': 12, 'CAD-02': 0 };\nestoque['CAN-02'] = 40;\nconsole.log('estoque:', Object.entries(estoque).map(([k, v]) => `${k}=${v}`).join(' · '));\n\nconsole.log('\\nCom união de literais, `Record` obriga a tratar todos os casos. É a versão em');\nconsole.log('objeto do switch exaustivo do tema 02.');",
        "codigoJs": "const CORES = {\n    baixo: 'verde',\n    medio: 'amarelo',\n    alto: 'vermelho'\n};\nfor (const nivel of Object.keys(CORES))console.log(`${nivel.padEnd(6)} ${CORES[nivel]}`);\nconst incompleto = {\n    baixo: 'verde',\n    medio: 'amarelo'\n};\nconsole.log('incompleto, rodando:', Object.keys(incompleto).length, 'chaves');\nconst estoque = {\n    'CAN-01': 12,\n    'CAD-02': 0\n};\nestoque['CAN-02'] = 40;\nconsole.log('estoque:', Object.entries(estoque).map(([k, v])=>`${k}=${v}`).join(' · '));\nconsole.log('\\nCom união de literais, `Record` obriga a tratar todos os casos. É a versão em');\nconsole.log('objeto do switch exaustivo do tema 02.');\n"
       },
       {
        "n": 4,
        "titulo": "O ciclo de vida de um registro, em três tipos",
        "secao": "NA PRÁTICA",
        "codigo": "type Contato = {\n  id: number;\n  nome: string;\n  email: string;\n  criadoEm: string;\n};\n\ntype ContatoNovo = Omit<Contato, 'id' | 'criadoEm'>;          // o que o formulário manda\ntype ContatoEditado = Partial<ContatoNovo>;                   // o que o PATCH manda\ntype ContatoNaLista = Pick<Contato, 'id' | 'nome'>;           // o que a listagem devolve\n\nconst banco: Contato[] = [];\n\nfunction criar(novo: ContatoNovo): Contato {\n  const contato: Contato = { id: banco.length + 1, criadoEm: '2026-08-28', ...novo };\n  banco.push(contato);\n  return contato;\n}\nfunction editar(id: number, mudancas: ContatoEditado): Contato | null {\n  const atual = banco.find((c) => c.id === id);\n  if (!atual) return null;\n  Object.assign(atual, mudancas);\n  return atual;\n}\nconst listar = (): ContatoNaLista[] => banco.map(({ id, nome }) => ({ id, nome }));\n\nconsole.log('criado :', JSON.stringify(criar({ nome: 'Ana', email: 'ana@loja.dev' })));\ncriar({ nome: 'Bruno', email: 'bruno@loja.dev' });\nconsole.log('editado:', JSON.stringify(editar(1, { email: 'ana.souza@loja.dev' })));\nconsole.log('lista  :', JSON.stringify(listar()));\n\n// @ts-expect-error — Object literal may only specify known properties. 'id' does not exist in type 'ContatoNovo'.\ncriar({ id: 99, nome: 'Carla', email: 'carla@loja.dev' });\n\nconsole.log('\\nQuatro tipos, uma fonte. Acrescentar `telefone` ao `Contato` acrescenta nos');\nconsole.log('três derivados — e o compilador aponta onde falta preencher.');",
        "codigoJs": "const banco = [];\nfunction criar(novo) {\n    const contato = {\n        id: banco.length + 1,\n        criadoEm: '2026-08-28',\n        ...novo\n    };\n    banco.push(contato);\n    return contato;\n}\nfunction editar(id, mudancas) {\n    const atual = banco.find((c)=>c.id === id);\n    if (!atual) return null;\n    Object.assign(atual, mudancas);\n    return atual;\n}\nconst listar = ()=>banco.map(({ id, nome })=>({\n            id,\n            nome\n        }));\nconsole.log('criado :', JSON.stringify(criar({\n    nome: 'Ana',\n    email: 'ana@loja.dev'\n})));\ncriar({\n    nome: 'Bruno',\n    email: 'bruno@loja.dev'\n});\nconsole.log('editado:', JSON.stringify(editar(1, {\n    email: 'ana.souza@loja.dev'\n})));\nconsole.log('lista  :', JSON.stringify(listar()));\ncriar({\n    id: 99,\n    nome: 'Carla',\n    email: 'carla@loja.dev'\n});\nconsole.log('\\nQuatro tipos, uma fonte. Acrescentar `telefone` ao `Contato` acrescenta nos');\nconsole.log('três derivados — e o compilador aponta onde falta preencher.');\n"
       },
       {
        "n": 5,
        "titulo": "`ReturnType` e `Parameters`: o tipo que sai da função",
        "secao": "NA PRÁTICA",
        "codigo": "function montarResposta(status: number, corpo: unknown, cabecalhos: Record<string, string> = {}) {\n  return { status, corpo, cabecalhos, enviadoEm: '2026-08-28T10:00:00Z' };\n}\n\ntype Resposta = ReturnType<typeof montarResposta>;\ntype ArgumentosDaResposta = Parameters<typeof montarResposta>;\n\nfunction registrar(resposta: Resposta): string {\n  return `${resposta.status} em ${resposta.enviadoEm.slice(11, 19)}`;\n}\n\nconst argumentos: ArgumentosDaResposta = [200, { ok: true }, { 'content-type': 'application/json' }];\nconsole.log(registrar(montarResposta(...argumentos)));\nconsole.log(registrar(montarResposta(404, { erro: 'não encontrado' })));\n\ntry {\n  // @ts-expect-error — Property 'enviadoEm' is missing in type '{ status: number; corpo: unknown; cabecalhos: {}; }'.\n  console.log(registrar({ status: 200, corpo: null, cabecalhos: {} }));\n} catch (erro) {\n  console.log('faltando um campo:', (erro as Error).message);\n}\n\nconsole.log('\\nÚtil quando a função é a fonte da verdade e você não quer escrever o tipo do');\nconsole.log('retorno duas vezes. Também aparece muito com bibliotecas que não exportam o tipo.');",
        "codigoJs": "function montarResposta(status, corpo, cabecalhos = {}) {\n    return {\n        status,\n        corpo,\n        cabecalhos,\n        enviadoEm: '2026-08-28T10:00:00Z'\n    };\n}\nfunction registrar(resposta) {\n    return `${resposta.status} em ${resposta.enviadoEm.slice(11, 19)}`;\n}\nconst argumentos = [\n    200,\n    {\n        ok: true\n    },\n    {\n        'content-type': 'application/json'\n    }\n];\nconsole.log(registrar(montarResposta(...argumentos)));\nconsole.log(registrar(montarResposta(404, {\n    erro: 'não encontrado'\n})));\ntry {\n    console.log(registrar({\n        status: 200,\n        corpo: null,\n        cabecalhos: {}\n    }));\n} catch (erro) {\n    console.log('faltando um campo:', erro.message);\n}\nconsole.log('\\nÚtil quando a função é a fonte da verdade e você não quer escrever o tipo do');\nconsole.log('retorno duas vezes. Também aparece muito com bibliotecas que não exportam o tipo.');\n"
       },
       {
        "n": 6,
        "titulo": "`Extract` e `Exclude`: filtrar a união, não os campos",
        "secao": "NA PRÁTICA",
        "codigo": "type EventoDaLoja =\n  | { tipo: 'pedido.criado'; pedidoId: number; total: number }\n  | { tipo: 'pagamento.aprovado'; pedidoId: number; bandeira: string }\n  | { tipo: 'pedido.cancelado'; pedidoId: number; motivo: string };\n\n// `Extract<U, F>` fica com os MEMBROS de U que encaixam em F.\ntype PagamentoAprovado = Extract<EventoDaLoja, { tipo: 'pagamento.aprovado' }>;\n\n// Só um membro entrou, então `bandeira` existe sem precisar de nenhum `if`.\nfunction registrarPagamento(evento: PagamentoAprovado): string {\n  return `pedido ${evento.pedidoId} pago com ${evento.bandeira}`;\n}\nconsole.log(registrarPagamento({ tipo: 'pagamento.aprovado', pedidoId: 7, bandeira: 'visa' }));\n\n// @ts-expect-error — Type '\"pedido.criado\"' is not assignable to type '\"pagamento.aprovado\"'.\nconsole.log(registrarPagamento({ tipo: 'pedido.criado', pedidoId: 8, total: 90 }));\n\n// `Exclude<U, F>` faz o contrário: tira os que encaixam.\ntype TipoDeEvento = EventoDaLoja['tipo'];\ntype EventoDePedido = Exclude<TipoDeEvento, 'pagamento.aprovado'>;\n\nconst filaDePedidos: EventoDePedido[] = ['pedido.criado', 'pedido.cancelado'];\nconsole.log('a fila escuta:', filaDePedidos.join(' · '));\n\n// @ts-expect-error — Argument of type '\"pagamento.aprovado\"' is not assignable to parameter of type 'EventoDePedido'.\nfilaDePedidos.push('pagamento.aprovado');\nconsole.log('rodando, entrou assim mesmo:', filaDePedidos.length, 'tipos');\n\n// `NonNullable<T>` é `Exclude<T, null | undefined>` com um nome melhor.\ntype TalvezDesconto = number | null | undefined;\nconst descontoDoBanco: TalvezDesconto = 15;\nconst desconto: NonNullable<TalvezDesconto> = descontoDoBanco ?? 0;\nconsole.log('desconto aplicado:', `${desconto}%`);\n\nconsole.log('\\n`Pick` e `Omit` trabalham nos CAMPOS de um objeto; `Extract` e `Exclude`, nos');\nconsole.log('MEMBROS de uma união. Trocar um pelo outro é o engano mais comum dos quatro.');",
        "codigoJs": "function registrarPagamento(evento) {\n    return `pedido ${evento.pedidoId} pago com ${evento.bandeira}`;\n}\nconsole.log(registrarPagamento({\n    tipo: 'pagamento.aprovado',\n    pedidoId: 7,\n    bandeira: 'visa'\n}));\nconsole.log(registrarPagamento({\n    tipo: 'pedido.criado',\n    pedidoId: 8,\n    total: 90\n}));\nconst filaDePedidos = [\n    'pedido.criado',\n    'pedido.cancelado'\n];\nconsole.log('a fila escuta:', filaDePedidos.join(' · '));\nfilaDePedidos.push('pagamento.aprovado');\nconsole.log('rodando, entrou assim mesmo:', filaDePedidos.length, 'tipos');\nconst descontoDoBanco = 15;\nconst desconto = descontoDoBanco ?? 0;\nconsole.log('desconto aplicado:', `${desconto}%`);\nconsole.log('\\n`Pick` e `Omit` trabalham nos CAMPOS de um objeto; `Extract` e `Exclude`, nos');\nconsole.log('MEMBROS de uma união. Trocar um pelo outro é o engano mais comum dos quatro.');\n"
       },
       {
        "n": 7,
        "titulo": "`Partial` some com a garantia, e o resto do código não sabe",
        "secao": "PEGADINHAS",
        "codigo": "type Endereco = { rua: string; numero: number; cidade: string };\n\n// Parece inofensivo: \"vou aceitar o endereço incompleto e completo depois\".\nfunction salvarEndereco(endereco: Partial<Endereco>): string {\n  // Todos os campos agora podem ser undefined, e o código tem que tratar todos.\n  return `${endereco.rua ?? '?'}, ${endereco.numero ?? '?'} — ${endereco.cidade ?? '?'}`;\n}\n\nconsole.log('completo :', salvarEndereco({ rua: 'Rua A', numero: 100, cidade: 'Recife' }));\nconsole.log('vazio    :', salvarEndereco({}), '← o tipo aceitou, e não sobrou nada');\n\n// Quando só alguns campos são opcionais, diga QUAIS — em vez de afrouxar tudo.\ntype EnderecoParaSalvar = Omit<Endereco, 'numero'> & { numero?: number };\nconst semNumero: EnderecoParaSalvar = { rua: 'Rua A', cidade: 'Recife' };\nconsole.log('preciso  :', `${semNumero.rua}, ${semNumero.numero ?? 's/n'} — ${semNumero.cidade}`);\n\n// @ts-expect-error — Property 'rua' is missing in type '{ cidade: string; }'.\nconst semRua: EnderecoParaSalvar = { cidade: 'Recife' };\nconsole.log('rodando  :', JSON.stringify(semRua));\n\nconsole.log('\\n`Partial` é ótimo para PATCH e péssimo como remendo. Ele não afrouxa um campo:');\nconsole.log('afrouxa todos, e a partir dali ninguém mais sabe o que pode contar que existe.');",
        "codigoJs": "function salvarEndereco(endereco) {\n    return `${endereco.rua ?? '?'}, ${endereco.numero ?? '?'} — ${endereco.cidade ?? '?'}`;\n}\nconsole.log('completo :', salvarEndereco({\n    rua: 'Rua A',\n    numero: 100,\n    cidade: 'Recife'\n}));\nconsole.log('vazio    :', salvarEndereco({}), '← o tipo aceitou, e não sobrou nada');\nconst semNumero = {\n    rua: 'Rua A',\n    cidade: 'Recife'\n};\nconsole.log('preciso  :', `${semNumero.rua}, ${semNumero.numero ?? 's/n'} — ${semNumero.cidade}`);\nconst semRua = {\n    cidade: 'Recife'\n};\nconsole.log('rodando  :', JSON.stringify(semRua));\nconsole.log('\\n`Partial` é ótimo para PATCH e péssimo como remendo. Ele não afrouxa um campo:');\nconsole.log('afrouxa todos, e a partir dali ninguém mais sabe o que pode contar que existe.');\n"
       }
      ],
      "resumo": [
       "`Partial<T>` deixa tudo opcional (o corpo de um PATCH); `Required<T>` faz o contrário.",
       "`Pick<T, K>` escolhe campos; `Omit<T, K>` tira — é a defesa contra vazar `senhaHash`.",
       "`Record<K, V>` cobra todas as chaves quando `K` é união de literais.",
       "`Extract<U, F>` e `Exclude<U, F>` filtram MEMBROS de união — não campos de objeto.",
       "Derive tudo de uma fonte só, inclusive da função: `ReturnType`/`Parameters<typeof f>`.",
       "`Partial` como remendo afrouxa TUDO — diga quais campos são opcionais."
      ]
     },
     {
      "slug": "05-generics-em-interfaces-e-tipos",
      "arquivo": "typescript/src/07-generics/05-generics-em-interfaces-e-tipos.ts",
      "comando": "node src/07-generics/05-generics-em-interfaces-e-tipos.ts",
      "titulo": "Generics em interfaces e tipos",
      "sessao": 7,
      "oQueE": "o mesmo `<T>` das funções, agora em `interface`, `type` e nos tipos que você já usava sem reparar — `Array<T>`, `Promise<T>`, `Map<K, V>`.",
      "quandoUsar": "quando um FORMATO se repete e só o miolo muda: envelope de resposta de API, página de resultados, repositório, resultado de operação.",
      "quandoNaoUsar": "quando o miolo é sempre o mesmo. `Resposta<Produto>` só compensa se existir também `Resposta<Pedido>` — senão escreva o tipo direto.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O que você já usava era genérico",
        "secao": "ESSENCIAL",
        "codigo": "const precos: Array<number> = [19.9, 32.5];         // Array<T> — o mesmo que number[]\nconst estoque: Map<string, number> = new Map([['CAN-01', 4], ['CAM-02', 0]]);\nconst entrega: Promise<string> = Promise.resolve('a caminho');\n\nconsole.log('preço:', precos[0].toFixed(2));        // number, porque T = number\nconsole.log('estoque CAN-01:', estoque.get('CAN-01') ?? 0);\nentrega.then((situacao) => console.log('entrega:', situacao.toUpperCase()));\n\n// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.\nprecos.push('40');\n\n// O `T` de `Promise` é o que chega no `await`, e o do `Map` é o valor de `.get`.\nconsole.log('\\n`Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos da biblioteca padrão.');\nconsole.log('Você já preenchia o `<T>` deles todo dia sem chamar isso de generic.');",
        "codigoJs": "const precos = [\n    19.9,\n    32.5\n];\nconst estoque = new Map([\n    [\n        'CAN-01',\n        4\n    ],\n    [\n        'CAM-02',\n        0\n    ]\n]);\nconst entrega = Promise.resolve('a caminho');\nconsole.log('preço:', precos[0].toFixed(2));\nconsole.log('estoque CAN-01:', estoque.get('CAN-01') ?? 0);\nentrega.then((situacao)=>console.log('entrega:', situacao.toUpperCase()));\nprecos.push('40');\nconsole.log('\\n`Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos da biblioteca padrão.');\nconsole.log('Você já preenchia o `<T>` deles todo dia sem chamar isso de generic.');\n"
       },
       {
        "n": 2,
        "titulo": "Interface genérica: um envelope, vários conteúdos",
        "secao": "ESSENCIAL",
        "codigo": "interface RespostaApi<T> {\n  dados: T;\n  status: number;\n  buscadoEm: string;\n}\n\ntype Produto = { sku: string; preco: number };\ntype Usuario = { login: string; admin: boolean };\n\nconst respostaProduto: RespostaApi<Produto> = {\n  dados: { sku: 'CAN-01', preco: 19.9 },\n  status: 200,\n  buscadoEm: '2026-08-28',\n};\n\nconst respostaLista: RespostaApi<Usuario[]> = {\n  dados: [{ login: 'ana', admin: true }, { login: 'bruno', admin: false }],\n  status: 200,\n  buscadoEm: '2026-08-28',\n};\n\nconsole.log('sku:', respostaProduto.dados.sku, '· R$', respostaProduto.dados.preco.toFixed(2));\nconsole.log('admins:', respostaLista.dados.filter((u) => u.admin).map((u) => u.login));\n\n// @ts-expect-error — Property 'login' does not exist on type 'Produto'.\nconsole.log(respostaProduto.dados.login);",
        "codigoJs": "const respostaProduto = {\n    dados: {\n        sku: 'CAN-01',\n        preco: 19.9\n    },\n    status: 200,\n    buscadoEm: '2026-08-28'\n};\nconst respostaLista = {\n    dados: [\n        {\n            login: 'ana',\n            admin: true\n        },\n        {\n            login: 'bruno',\n            admin: false\n        }\n    ],\n    status: 200,\n    buscadoEm: '2026-08-28'\n};\nconsole.log('sku:', respostaProduto.dados.sku, '· R$', respostaProduto.dados.preco.toFixed(2));\nconsole.log('admins:', respostaLista.dados.filter((u)=>u.admin).map((u)=>u.login));\nconsole.log(respostaProduto.dados.login);\n"
       },
       {
        "n": 3,
        "titulo": "Type alias genérico, e o valor padrão do `<T>`",
        "secao": "ESSENCIAL",
        "codigo": "// `type` também recebe parâmetro — e aqui ele faz o que a interface não faz: união.\ntype Resultado<T, E = string> =\n  | { ok: true; valor: T }\n  | { ok: false; erro: E };\n\nfunction dividir(a: number, b: number): Resultado<number> {\n  if (b === 0) return { ok: false, erro: 'divisão por zero' };\n  return { ok: true, valor: a / b };\n}\n\nfor (const [a, b] of [[10, 4], [10, 0]]) {\n  const r = dividir(a, b);\n  // O campo `ok` estreita a união: no `if`, só existe `valor`; no `else`, só existe `erro`.\n  if (r.ok) console.log(`${a} / ${b} =`, r.valor.toFixed(2));\n  else console.log(`${a} / ${b} →`, r.erro);\n}\n\n// `E = string` é o padrão: quem quiser outro erro, escreve.\nconst falhaDetalhada: Resultado<Produto, { codigo: number }> = { ok: false, erro: { codigo: 404 } };\nconsole.log('erro com código:', falhaDetalhada.ok ? '' : falhaDetalhada.erro.codigo);",
        "codigoJs": "function dividir(a, b) {\n    if (b === 0) return {\n        ok: false,\n        erro: 'divisão por zero'\n    };\n    return {\n        ok: true,\n        valor: a / b\n    };\n}\nfor (const [a, b] of [\n    [\n        10,\n        4\n    ],\n    [\n        10,\n        0\n    ]\n]){\n    const r = dividir(a, b);\n    if (r.ok) console.log(`${a} / ${b} =`, r.valor.toFixed(2));\n    else console.log(`${a} / ${b} →`, r.erro);\n}\nconst falhaDetalhada = {\n    ok: false,\n    erro: {\n        codigo: 404\n    }\n};\nconsole.log('erro com código:', falhaDetalhada.ok ? '' : falhaDetalhada.erro.codigo);\n"
       },
       {
        "n": 4,
        "titulo": "Generic com intersection: o campo que o banco acrescenta",
        "secao": "NA PRÁTICA",
        "codigo": "// O que entra é o formato que você escreveu; o que sai é ele MAIS o que o banco põe.\ntype Salvo<T> = T & { id: number; criadoEm: string };\n\nlet proximoId = 1;\nfunction salvar<T extends object>(registro: T): Salvo<T> {\n  return { ...registro, id: proximoId++, criadoEm: '2026-08-28' };\n}\n\nconst produtoSalvo = salvar({ sku: 'CAN-01', preco: 19.9 });\nconst usuarioSalvo = salvar({ login: 'ana', admin: true });\n\nconsole.log('produto:', produtoSalvo.sku, '· id gerado pelo banco:', produtoSalvo.id);\nconsole.log('usuário:', usuarioSalvo.login, '· criado em', usuarioSalvo.criadoEm);\n\n// Os dois lados do `&` valem ao mesmo tempo: o campo original e o acrescentado.\nconsole.log('preço + id:', produtoSalvo.preco.toFixed(2), '·', usuarioSalvo.id);\n\n// @ts-expect-error — Property 'login' does not exist on type 'Salvo<{ sku: string; preco: number; }>'.\nconsole.log(produtoSalvo.login);",
        "codigoJs": "let proximoId = 1;\nfunction salvar(registro) {\n    return {\n        ...registro,\n        id: proximoId++,\n        criadoEm: '2026-08-28'\n    };\n}\nconst produtoSalvo = salvar({\n    sku: 'CAN-01',\n    preco: 19.9\n});\nconst usuarioSalvo = salvar({\n    login: 'ana',\n    admin: true\n});\nconsole.log('produto:', produtoSalvo.sku, '· id gerado pelo banco:', produtoSalvo.id);\nconsole.log('usuário:', usuarioSalvo.login, '· criado em', usuarioSalvo.criadoEm);\nconsole.log('preço + id:', produtoSalvo.preco.toFixed(2), '·', usuarioSalvo.id);\nconsole.log(produtoSalvo.login);\n"
       },
       {
        "n": 5,
        "titulo": "Contando votos: o generic escolhe as chaves do resultado",
        "secao": "NA PRÁTICA",
        "codigo": "// `T extends string` amarra as opções ao literal que veio — o Record sai com essas chaves.\nfunction apurar<T extends string>(opcoes: readonly T[], votos: readonly T[]): Record<T, number> {\n  const placar = Object.fromEntries(opcoes.map((o) => [o, 0])) as Record<T, number>;\n  for (const voto of votos) placar[voto] += 1;\n  return placar;\n}\n\nconst chapas = ['Chapa A', 'Chapa B', 'Branco'] as const;\nconst urna = ['Chapa A', 'Chapa B', 'Chapa A', 'Branco', 'Chapa A'] as const;\n\nconst placar = apurar(chapas, urna);\nconsole.log('placar:', placar);\nconsole.log('vencedora: Chapa A com', placar['Chapa A'], 'votos');\n\n// O resultado conhece as chaves reais — errar o nome é erro de compilação, não `undefined`.\n// @ts-expect-error — Property 'Chapa C' does not exist on type 'Record<\"Chapa A\" | \"Chapa B\" | \"Branco\", number>'.\nconsole.log(placar['Chapa C']);",
        "codigoJs": "function apurar(opcoes, votos) {\n    const placar = Object.fromEntries(opcoes.map((o)=>[\n            o,\n            0\n        ]));\n    for (const voto of votos)placar[voto] += 1;\n    return placar;\n}\nconst chapas = [\n    'Chapa A',\n    'Chapa B',\n    'Branco'\n];\nconst urna = [\n    'Chapa A',\n    'Chapa B',\n    'Chapa A',\n    'Branco',\n    'Chapa A'\n];\nconst placar = apurar(chapas, urna);\nconsole.log('placar:', placar);\nconsole.log('vencedora: Chapa A com', placar['Chapa A'], 'votos');\nconsole.log(placar['Chapa C']);\n"
       },
       {
        "n": 6,
        "titulo": "Interface genérica sem preencher o `<T>` não é tipo",
        "secao": "PEGADINHAS",
        "codigo": "interface Caixa<T> { conteudo: T; }\n\n// @ts-expect-error — Generic type 'Caixa<T>' requires 1 type argument(s).\nconst semTipo: Caixa = { conteudo: 'Caneca' };\nconsole.log('roda mesmo assim, porque o tipo some:', semTipo.conteudo);\n\n// As duas saídas honestas: preencher, ou dar um padrão na declaração.\nconst preenchida: Caixa<string> = { conteudo: 'Caneca' };\ninterface CaixaComPadrao<T = string> { conteudo: T; }\nconst comPadrao: CaixaComPadrao = { conteudo: 'Camiseta' };\n\nconsole.log('preenchida:', preenchida.conteudo, '· com padrão:', comPadrao.conteudo);\nconsole.log('\\n`Caixa` sozinho não é um tipo: é uma fábrica de tipos esperando o argumento.');",
        "codigoJs": "const semTipo = {\n    conteudo: 'Caneca'\n};\nconsole.log('roda mesmo assim, porque o tipo some:', semTipo.conteudo);\nconst preenchida = {\n    conteudo: 'Caneca'\n};\nconst comPadrao = {\n    conteudo: 'Camiseta'\n};\nconsole.log('preenchida:', preenchida.conteudo, '· com padrão:', comPadrao.conteudo);\nconsole.log('\\n`Caixa` sozinho não é um tipo: é uma fábrica de tipos esperando o argumento.');\n"
       }
      ],
      "resumo": [
       "`Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos — você já usava sem saber o nome.",
       "`interface Envelope<T>` descreve o formato que se repete e deixa o miolo em aberto.",
       "`type` genérico faz o que a interface não faz: união discriminada como `Resultado<T, E>`.",
       "`<T, E = string>` dá padrão ao parâmetro de tipo, igual a parâmetro de função.",
       "`T & { id: number }` devolve o que entrou MAIS o que a função acrescentou.",
       "Tipo genérico sem argumento é erro: `Caixa` precisa virar `Caixa<string>` ou ter padrão."
      ]
     }
    ]
   },
   {
    "slug": "08-extras",
    "titulo": "Extras",
    "icone": "◇",
    "cor": "#8b95a8",
    "resumo": "Decorator, bibliotecas de fora, módulos e o build.",
    "topicos": [
     {
      "slug": "01-decorators",
      "arquivo": "typescript/src/08-extras/01-decorators.ts",
      "comando": "node src/08-extras/01-decorators.ts",
      "titulo": "Decorators",
      "sessao": 8,
      "oQueE": "uma função que embrulha uma classe, um método ou uma propriedade para acrescentar comportamento sem mexer no código dela. O `@` é só o açúcar.",
      "quandoUsar": "quando um mesmo cuidado se repete em muitos métodos — log, medir tempo, exigir permissão. É o que NestJS, TypeORM e Angular fazem o tempo todo.",
      "quandoNaoUsar": "em código seu, na maior parte das vezes. Um decorator esconde o que acontece; uma função com nome, chamada na linha, é mais fácil de seguir.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "Um decorator é só uma função que embrulha",
        "secao": "ESSENCIAL",
        "codigo": "// Sem o `@` nenhum: é isso que a sintaxe faz por baixo.\nfunction comLog(original: (valor: number) => number, nome: string) {\n  return (valor: number): number => {\n    const resultado = original(valor);\n    console.log(`  [log] ${nome}(${valor}) → ${resultado}`);\n    return resultado;\n  };\n}\n\nconst dobrar = (n: number) => n * 2;\nconst dobrarComLog = comLog(dobrar, 'dobrar');\n\nconsole.log('sem decorar:', dobrar(21));\nconsole.log('decorado   :');\ndobrarComLog(21);\ndobrarComLog(5);\n\nconsole.log('\\nDecorator é exatamente isso: pega a função original, devolve outra que faz');\nconsole.log('algo a mais e chama a de dentro. O `@` só muda de lugar quem escreve a chamada.');",
        "codigoJs": "function comLog(original, nome) {\n    return (valor)=>{\n        const resultado = original(valor);\n        console.log(`  [log] ${nome}(${valor}) → ${resultado}`);\n        return resultado;\n    };\n}\nconst dobrar = (n)=>n * 2;\nconst dobrarComLog = comLog(dobrar, 'dobrar');\nconsole.log('sem decorar:', dobrar(21));\nconsole.log('decorado   :');\ndobrarComLog(21);\ndobrarComLog(5);\nconsole.log('\\nDecorator é exatamente isso: pega a função original, devolve outra que faz');\nconsole.log('algo a mais e chama a de dentro. O `@` só muda de lugar quem escreve a chamada.');\n"
       },
       {
        "n": 2,
        "titulo": "O mesmo, agora num método de classe",
        "secao": "ESSENCIAL",
        "codigo": "type Metodo = (...argumentos: never[]) => unknown;\n\nfunction medirTempo<T extends Metodo>(original: T, nome: string): T {\n  return function (this: unknown, ...argumentos: Parameters<T>) {\n    const inicio = Date.now();\n    const resultado = original.apply(this, argumentos);\n    console.log(`  [tempo] ${nome} levou ${Date.now() - inicio}ms`);\n    return resultado;\n  } as T;\n}\n\nclass Relatorio {\n  private vendas = [1200, 890, 430, 275];\n\n  total(): number { return this.vendas.reduce((a, b) => a + b, 0); }\n  media(): number { return this.total() / this.vendas.length; }\n}\n\n// Aplicando na mão, sem `@`: troca o método no protótipo.\nRelatorio.prototype.total = medirTempo(Relatorio.prototype.total, 'total');\n\nconst relatorio = new Relatorio();\nconsole.log('total:', relatorio.total());\nconsole.log('média:', relatorio.media().toFixed(2), '← chama `total` por dentro, e o log aparece');\n\nconsole.log('\\nÉ o que um `@medirTempo` em cima de `total()` faria — sem precisar de flag de');\nconsole.log('compilador nenhuma, e sem esconder de onde vem o comportamento.');",
        "codigoJs": "function medirTempo(original, nome) {\n    return function(...argumentos) {\n        const inicio = Date.now();\n        const resultado = original.apply(this, argumentos);\n        console.log(`  [tempo] ${nome} levou ${Date.now() - inicio}ms`);\n        return resultado;\n    };\n}\nclass Relatorio {\n    vendas = [\n        1200,\n        890,\n        430,\n        275\n    ];\n    total() {\n        return this.vendas.reduce((a, b)=>a + b, 0);\n    }\n    media() {\n        return this.total() / this.vendas.length;\n    }\n}\nRelatorio.prototype.total = medirTempo(Relatorio.prototype.total, 'total');\nconst relatorio = new Relatorio();\nconsole.log('total:', relatorio.total());\nconsole.log('média:', relatorio.media().toFixed(2), '← chama `total` por dentro, e o log aparece');\nconsole.log('\\nÉ o que um `@medirTempo` em cima de `total()` faria — sem precisar de flag de');\nconsole.log('compilador nenhuma, e sem esconder de onde vem o comportamento.');\n"
       },
       {
        "n": 3,
        "titulo": "A sintaxe `@`, e por que ela não roda aqui",
        "secao": "ESSENCIAL",
        "codigo": "const exemplo = [\n  '// tsconfig.json: \"experimentalDecorators\": true   (o formato legado, de TypeScript 4)',\n  '',\n  'function Congelado(alvo: Function) {',\n  '  Object.freeze(alvo);',\n  '  Object.freeze(alvo.prototype);',\n  '}',\n  '',\n  '@Congelado',\n  'class Configuracao {',\n  '  @naoNegativo tentativas = 3;',\n  '',\n  '  @medirTempo',\n  '  recarregar() { /* ... */ }',\n  '}',\n];\nfor (const linha of exemplo) console.log('  ' + linha);\n\nconsole.log('\\nEsta sintaxe NÃO roda com `node arquivo.ts`: o removedor de tipos do Node só');\nconsole.log('apaga tipo, e decorator vira código. Para usar `@` de verdade é preciso compilar');\nconsole.log('com o `tsc` (ou com ts-node / tsx), e é o que NestJS e TypeORM pedem no setup.');\nconsole.log('Por isso este tópico ensina o mecanismo — que é o que importa — sem o açúcar.');",
        "codigoJs": "const exemplo = [\n    '// tsconfig.json: \"experimentalDecorators\": true   (o formato legado, de TypeScript 4)',\n    '',\n    'function Congelado(alvo: Function) {',\n    '  Object.freeze(alvo);',\n    '  Object.freeze(alvo.prototype);',\n    '}',\n    '',\n    '@Congelado',\n    'class Configuracao {',\n    '  @naoNegativo tentativas = 3;',\n    '',\n    '  @medirTempo',\n    '  recarregar() { /* ... */ }',\n    '}'\n];\nfor (const linha of exemplo)console.log('  ' + linha);\nconsole.log('\\nEsta sintaxe NÃO roda com `node arquivo.ts`: o removedor de tipos do Node só');\nconsole.log('apaga tipo, e decorator vira código. Para usar `@` de verdade é preciso compilar');\nconsole.log('com o `tsc` (ou com ts-node / tsx), e é o que NestJS e TypeORM pedem no setup.');\nconsole.log('Por isso este tópico ensina o mecanismo — que é o que importa — sem o açúcar.');\n"
       },
       {
        "n": 4,
        "titulo": "O caso de verdade: exigir permissão",
        "secao": "NA PRÁTICA",
        "codigo": "type Usuario = { nome: string; papel: 'admin' | 'comum' };\n\nfunction exigirAdmin<T extends (...a: never[]) => string>(original: T, nome: string): T {\n  return function (this: { usuario: Usuario }, ...argumentos: Parameters<T>): string {\n    if (this.usuario.papel !== 'admin') return `403 — ${nome} exige admin`;\n    return original.apply(this, argumentos) as string;\n  } as T;\n}\n\nclass PainelAdministrativo {\n  usuario: Usuario;\n  constructor(usuario: Usuario) { this.usuario = usuario; }\n  apagarTudo(): string { return `tudo apagado por ${this.usuario.nome}`; }\n  verRelatorio(): string { return `relatório para ${this.usuario.nome}`; }\n}\n\nPainelAdministrativo.prototype.apagarTudo = exigirAdmin(PainelAdministrativo.prototype.apagarTudo, 'apagarTudo');\n\nconst admin = new PainelAdministrativo({ nome: 'Ana', papel: 'admin' });\nconst comum = new PainelAdministrativo({ nome: 'Bruno', papel: 'comum' });\n\nconsole.log('admin :', admin.apagarTudo());\nconsole.log('comum :', comum.apagarTudo());\nconsole.log('comum :', comum.verRelatorio(), '← este método não foi decorado');\n\nconsole.log('\\nCom `@exigirAdmin` em cima do método, a regra fica visível na linha de cima');\nconsole.log('dele. É a razão real de existir do decorator: a política ao lado do código.');",
        "codigoJs": "function exigirAdmin(original, nome) {\n    return function(...argumentos) {\n        if (this.usuario.papel !== 'admin') return `403 — ${nome} exige admin`;\n        return original.apply(this, argumentos);\n    };\n}\nclass PainelAdministrativo {\n    usuario;\n    constructor(usuario){\n        this.usuario = usuario;\n    }\n    apagarTudo() {\n        return `tudo apagado por ${this.usuario.nome}`;\n    }\n    verRelatorio() {\n        return `relatório para ${this.usuario.nome}`;\n    }\n}\nPainelAdministrativo.prototype.apagarTudo = exigirAdmin(PainelAdministrativo.prototype.apagarTudo, 'apagarTudo');\nconst admin = new PainelAdministrativo({\n    nome: 'Ana',\n    papel: 'admin'\n});\nconst comum = new PainelAdministrativo({\n    nome: 'Bruno',\n    papel: 'comum'\n});\nconsole.log('admin :', admin.apagarTudo());\nconsole.log('comum :', comum.apagarTudo());\nconsole.log('comum :', comum.verRelatorio(), '← este método não foi decorado');\nconsole.log('\\nCom `@exigirAdmin` em cima do método, a regra fica visível na linha de cima');\nconsole.log('dele. É a razão real de existir do decorator: a política ao lado do código.');\n"
       },
       {
        "n": 5,
        "titulo": "Decorator de classe: registrar num catálogo",
        "secao": "NA PRÁTICA",
        "codigo": "const CATALOGO = new Map<string, new () => { executar(): string }>();\n\nfunction registrar(nome: string) {\n  return function <T extends new () => { executar(): string }>(Classe: T): T {\n    CATALOGO.set(nome, Classe);\n    return Classe;\n  };\n}\n\nclass EnviarEmail { executar(): string { return 'e-mail enviado'; } }\nclass GerarNota { executar(): string { return 'nota gerada'; } }\n\nregistrar('email')(EnviarEmail);          // `@registrar('email')` faria isto\nregistrar('nota')(GerarNota);\n\nfor (const [nome, Classe] of CATALOGO) console.log(`${nome.padEnd(6)} → ${new Classe().executar()}`);\n\nconsole.log('\\nÉ o desenho do `@Controller` do NestJS e do `@Entity` do TypeORM: o decorator');\nconsole.log('não muda a classe, ele a ANOTA num registro que o framework lê depois.');",
        "codigoJs": "const CATALOGO = new Map();\nfunction registrar(nome) {\n    return function(Classe) {\n        CATALOGO.set(nome, Classe);\n        return Classe;\n    };\n}\nclass EnviarEmail {\n    executar() {\n        return 'e-mail enviado';\n    }\n}\nclass GerarNota {\n    executar() {\n        return 'nota gerada';\n    }\n}\nregistrar('email')(EnviarEmail);\nregistrar('nota')(GerarNota);\nfor (const [nome, Classe] of CATALOGO)console.log(`${nome.padEnd(6)} → ${new Classe().executar()}`);\nconsole.log('\\nÉ o desenho do `@Controller` do NestJS e do `@Entity` do TypeORM: o decorator');\nconsole.log('não muda a classe, ele a ANOTA num registro que o framework lê depois.');\n"
       },
       {
        "n": 6,
        "titulo": "Dois formatos incompatíveis com o mesmo `@`",
        "secao": "PEGADINHAS",
        "codigo": "const formatos = [\n  ['Legado (TS 4)', 'experimentalDecorators: true', '(alvo, chave, descritor)'],\n  ['Padrão (TS 5+)', 'nenhuma flag: já é padrão', '(valor, contexto)'],\n];\n\nconst largura = [18, 32, 26];\nconst linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');\nconsole.log(linha(['FORMATO', 'COMO LIGAR', 'O QUE A FUNÇÃO RECEBE']));\nconsole.log(linha(['─'.repeat(16), '─'.repeat(30), '─'.repeat(24)]));\nfor (const f of formatos) console.log(linha(f));\n\nconsole.log('\\nA mesma sintaxe `@`, duas assinaturas que não se encaixam. Decorator copiado de');\nconsole.log('um tutorial antigo quebra em projeto novo, e vice-versa. Antes de escrever um,');\nconsole.log('confira qual formato o seu tsconfig está usando — e o que a biblioteca espera.');\nconsole.log('Angular, NestJS e TypeORM ainda pedem o legado.');",
        "codigoJs": "const formatos = [\n    [\n        'Legado (TS 4)',\n        'experimentalDecorators: true',\n        '(alvo, chave, descritor)'\n    ],\n    [\n        'Padrão (TS 5+)',\n        'nenhuma flag: já é padrão',\n        '(valor, contexto)'\n    ]\n];\nconst largura = [\n    18,\n    32,\n    26\n];\nconst linha = (colunas)=>colunas.map((c, i)=>c.padEnd(largura[i])).join('');\nconsole.log(linha([\n    'FORMATO',\n    'COMO LIGAR',\n    'O QUE A FUNÇÃO RECEBE'\n]));\nconsole.log(linha([\n    '─'.repeat(16),\n    '─'.repeat(30),\n    '─'.repeat(24)\n]));\nfor (const f of formatos)console.log(linha(f));\nconsole.log('\\nA mesma sintaxe `@`, duas assinaturas que não se encaixam. Decorator copiado de');\nconsole.log('um tutorial antigo quebra em projeto novo, e vice-versa. Antes de escrever um,');\nconsole.log('confira qual formato o seu tsconfig está usando — e o que a biblioteca espera.');\nconsole.log('Angular, NestJS e TypeORM ainda pedem o legado.');\n"
       }
      ],
      "resumo": [
       "Decorator é uma função que embrulha classe, método ou propriedade — o `@` é açúcar.",
       "O mecanismo é o de sempre: recebe o original, devolve outro que chama o de dentro.",
       "`node arquivo.ts` não roda a sintaxe `@`: ela vira código, e exige `tsc`, ts-node ou tsx.",
       "Vale quando o mesmo cuidado se repete em muitos métodos: log, tempo, permissão.",
       "Decorator de classe costuma só REGISTRAR a classe — é o que os frameworks leem depois.",
       "Existem dois formatos incompatíveis (legado e padrão); confira o do seu projeto."
      ]
     },
     {
      "slug": "02-bibliotecas-e-types",
      "arquivo": "typescript/src/08-extras/02-bibliotecas-e-types.ts",
      "comando": "node src/08-extras/02-bibliotecas-e-types.ts",
      "titulo": "Bibliotecas de fora e declaration files",
      "sessao": 8,
      "oQueE": "como o TypeScript descobre o tipo de código que não é dele — o `.d.ts`, que é um arquivo só de declarações, sem nenhuma linha que rode.",
      "quandoUsar": "`@types/alguma-coisa` quando a biblioteca é JavaScript puro; um `.d.ts` seu quando não existe pacote de tipos e você não quer `any` espalhado.",
      "quandoNaoUsar": "não descreva a biblioteca inteira. Declare só o que você usa — o resto é trabalho jogado fora e mais uma coisa para desatualizar.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "De onde vem o tipo de cada coisa",
        "secao": "ESSENCIAL",
        "codigo": "const origens = [\n  ['embutido no TS', 'Array, Promise, Map, JSON', 'a opção `lib` do tsconfig'],\n  ['dentro do pacote', 'zod, prisma, express 5', 'o campo `types` do package.json'],\n  ['pacote separado', 'lodash, jsonwebtoken', 'npm i -D @types/lodash'],\n  ['escrito por você', 'lib antiga sem tipos', 'um arquivo .d.ts no projeto'],\n  ['nenhum', 'o resto', 'tudo vira `any`, e o tsc para de ajudar'],\n];\n\nconst largura = [20, 28, 36];\nconst linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');\nconsole.log(linha(['DE ONDE VEM', 'EXEMPLO', 'COMO CHEGA']));\nconsole.log(linha(['─'.repeat(18), '─'.repeat(26), '─'.repeat(34)]));\nfor (const o of origens) console.log(linha(o));\n\nconsole.log('\\nO teste rápido: se o editor não completa nada, o tipo não chegou. Antes de');\nconsole.log('escrever um `.d.ts`, procure `@types/<pacote>` — quase sempre já existe.');",
        "codigoJs": "const origens = [\n    [\n        'embutido no TS',\n        'Array, Promise, Map, JSON',\n        'a opção `lib` do tsconfig'\n    ],\n    [\n        'dentro do pacote',\n        'zod, prisma, express 5',\n        'o campo `types` do package.json'\n    ],\n    [\n        'pacote separado',\n        'lodash, jsonwebtoken',\n        'npm i -D @types/lodash'\n    ],\n    [\n        'escrito por você',\n        'lib antiga sem tipos',\n        'um arquivo .d.ts no projeto'\n    ],\n    [\n        'nenhum',\n        'o resto',\n        'tudo vira `any`, e o tsc para de ajudar'\n    ]\n];\nconst largura = [\n    20,\n    28,\n    36\n];\nconst linha = (colunas)=>colunas.map((c, i)=>c.padEnd(largura[i])).join('');\nconsole.log(linha([\n    'DE ONDE VEM',\n    'EXEMPLO',\n    'COMO CHEGA'\n]));\nconsole.log(linha([\n    '─'.repeat(18),\n    '─'.repeat(26),\n    '─'.repeat(34)\n]));\nfor (const o of origens)console.log(linha(o));\nconsole.log('\\nO teste rápido: se o editor não completa nada, o tipo não chegou. Antes de');\nconsole.log('escrever um `.d.ts`, procure `@types/<pacote>` — quase sempre já existe.');\n"
       },
       {
        "n": 2,
        "titulo": "`declare`: descrever sem implementar",
        "secao": "ESSENCIAL",
        "codigo": "// Isto é o conteúdo de um `.d.ts`: só assinatura, nenhum corpo. Some ao compilar.\ndeclare function formatarCpf(bruto: string): string;\ndeclare const VERSAO_DA_LIB: string;\n\n// A implementação de verdade viria da biblioteca. Aqui ela é montada na mão para o\n// exemplo rodar — é exatamente o papel que o JavaScript da lib cumpriria.\nconst global = globalThis as unknown as { formatarCpf: (b: string) => string; VERSAO_DA_LIB: string };\nglobal.formatarCpf = (bruto) => bruto.replace(/\\D/g, '').replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, '$1.$2.$3-$4');\nglobal.VERSAO_DA_LIB = '2.1.0';\n\nconsole.log('versão   :', VERSAO_DA_LIB);\nconsole.log('formatado:', formatarCpf('52998224725'));\n\ntry {\n  // @ts-expect-error — Argument of type 'number' is not assignable to parameter of type 'string'.\n  console.log(formatarCpf(52998224725));\n} catch (erro) {\n  console.log('com número:', (erro as Error).message, '← o tsc já tinha avisado');\n}\n\nconsole.log('\\n`declare` é uma promessa: \"isto existe rodando, confie em mim\". Se a promessa');\nconsole.log('for falsa, o erro só aparece na execução — como com `as`.');",
        "codigoJs": "const global = globalThis;\nglobal.formatarCpf = (bruto)=>bruto.replace(/\\D/g, '').replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, '$1.$2.$3-$4');\nglobal.VERSAO_DA_LIB = '2.1.0';\nconsole.log('versão   :', VERSAO_DA_LIB);\nconsole.log('formatado:', formatarCpf('52998224725'));\ntry {\n    console.log(formatarCpf(52998224725));\n} catch (erro) {\n    console.log('com número:', erro.message, '← o tsc já tinha avisado');\n}\nconsole.log('\\n`declare` é uma promessa: \"isto existe rodando, confie em mim\". Se a promessa');\nconsole.log('for falsa, o erro só aparece na execução — como com `as`.');\n"
       },
       {
        "n": 3,
        "titulo": "Tipar uma biblioteca sem tipos, só no que você usa",
        "secao": "ESSENCIAL",
        "codigo": "// Suponha um pacote antigo, JavaScript puro, sem @types. Ele existe rodando:\nconst bibliotecaCrua = {\n  slugify: (texto: unknown) => String(texto).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),\n  truncar: (texto: unknown, tamanho: unknown) => String(texto).slice(0, Number(tamanho)),\n  versao: '1.0.0',\n};\n\n// O `.d.ts` que você escreveria é este tipo: só o que o seu código chama.\ntype TextoUtils = {\n  slugify(texto: string): string;\n  truncar(texto: string, tamanho: number): string;\n};\n\nconst texto: TextoUtils = bibliotecaCrua as TextoUtils;\n\nconsole.log('slug    :', texto.slugify('Caneca Branca 300ml'));\nconsole.log('truncado:', texto.truncar('Caderno universitário 200 folhas', 20) + '…');\n\n// @ts-expect-error — Property 'versao' does not exist on type 'TextoUtils'.\nconsole.log(texto.versao);\n\nconsole.log('\\nA biblioteca tem `versao`, e o seu tipo não. Isso não é defeito: é o contrato');\nconsole.log('reduzido ao que você realmente usa — menos superfície para manter.');",
        "codigoJs": "const bibliotecaCrua = {\n    slugify: (texto)=>String(texto).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),\n    truncar: (texto, tamanho)=>String(texto).slice(0, Number(tamanho)),\n    versao: '1.0.0'\n};\nconst texto = bibliotecaCrua;\nconsole.log('slug    :', texto.slugify('Caneca Branca 300ml'));\nconsole.log('truncado:', texto.truncar('Caderno universitário 200 folhas', 20) + '…');\nconsole.log(texto.versao);\nconsole.log('\\nA biblioteca tem `versao`, e o seu tipo não. Isso não é defeito: é o contrato');\nconsole.log('reduzido ao que você realmente usa — menos superfície para manter.');\n"
       },
       {
        "n": 4,
        "titulo": "Acrescentar campo a um tipo de terceiro",
        "secao": "NA PRÁTICA",
        "codigo": "// O caso do Express: o `loginRequired` põe `usuarioId` no request, e o tipo original não sabe.\ntype RequestOriginal = { url: string; headers: Record<string, string> };\n\n// Em projeto de verdade isto vira `declare global { namespace Express { interface Request { ... } } }`\n// num arquivo `types/express.d.ts`. O efeito é este:\ntype Request = RequestOriginal & { usuarioId?: number };\n\nfunction loginRequired(pedido: Request): boolean {\n  const [, token] = (pedido.headers['authorization'] ?? '').split(' ');\n  if (!token) return false;\n  pedido.usuarioId = Number(token);           // só compila porque o tipo foi estendido\n  return true;\n}\n\nconst pedido: Request = { url: '/alunos', headers: { authorization: 'Bearer 7' } };\nconsole.log('autenticou:', loginRequired(pedido), '· usuário', pedido.usuarioId);\n\nconst semToken: Request = { url: '/alunos', headers: {} };\nconsole.log('autenticou:', loginRequired(semToken), '· usuário', semToken.usuarioId ?? '(nenhum)');\n\nconsole.log('\\nÉ o declaration merging do tema 03 usado de propósito: a interface `Request` do');\nconsole.log('Express é reaberta pelo seu arquivo e ganha o campo que o seu middleware põe.');",
        "codigoJs": "function loginRequired(pedido) {\n    const [, token] = (pedido.headers['authorization'] ?? '').split(' ');\n    if (!token) return false;\n    pedido.usuarioId = Number(token);\n    return true;\n}\nconst pedido = {\n    url: '/alunos',\n    headers: {\n        authorization: 'Bearer 7'\n    }\n};\nconsole.log('autenticou:', loginRequired(pedido), '· usuário', pedido.usuarioId);\nconst semToken = {\n    url: '/alunos',\n    headers: {}\n};\nconsole.log('autenticou:', loginRequired(semToken), '· usuário', semToken.usuarioId ?? '(nenhum)');\nconsole.log('\\nÉ o declaration merging do tema 03 usado de propósito: a interface `Request` do');\nconsole.log('Express é reaberta pelo seu arquivo e ganha o campo que o seu middleware põe.');\n"
       },
       {
        "n": 5,
        "titulo": "`unknown` na borda, tipo no miolo",
        "secao": "NA PRÁTICA",
        "codigo": "// O jeito honesto de consumir uma biblioteca sem tipos: valide na entrada, tipe daí para dentro.\ntype Cep = { cep: string; logradouro: string; localidade: string; uf: string };\n\nfunction lerCep(bruto: unknown): Cep | null {\n  if (typeof bruto !== 'object' || bruto === null) return null;\n  const dado = bruto as Record<string, unknown>;\n  const campos = ['cep', 'logradouro', 'localidade', 'uf'] as const;\n  if (campos.some((c) => typeof dado[c] !== 'string')) return null;\n  return { cep: String(dado['cep']), logradouro: String(dado['logradouro']),\n           localidade: String(dado['localidade']), uf: String(dado['uf']) };\n}\n\nconst respostas: unknown[] = [\n  { cep: '30110-012', logradouro: 'Av. Afonso Pena', localidade: 'Belo Horizonte', uf: 'MG' },\n  { cep: '00000-000', erro: true },\n  'não é json',\n];\n\nfor (const resposta of respostas) {\n  const cep = lerCep(resposta);\n  console.log(cep ? `✓ ${cep.logradouro}, ${cep.localidade}/${cep.uf}` : '✕ resposta inválida');\n}\n\nconsole.log('\\nUma função de validação na borda, e o resto do sistema trabalha com `Cep` de');\nconsole.log('verdade. É a mesma ideia do type guard (tema 05), aplicada ao mundo lá fora.');",
        "codigoJs": "function lerCep(bruto) {\n    if (typeof bruto !== 'object' || bruto === null) return null;\n    const dado = bruto;\n    const campos = [\n        'cep',\n        'logradouro',\n        'localidade',\n        'uf'\n    ];\n    if (campos.some((c)=>typeof dado[c] !== 'string')) return null;\n    return {\n        cep: String(dado['cep']),\n        logradouro: String(dado['logradouro']),\n        localidade: String(dado['localidade']),\n        uf: String(dado['uf'])\n    };\n}\nconst respostas = [\n    {\n        cep: '30110-012',\n        logradouro: 'Av. Afonso Pena',\n        localidade: 'Belo Horizonte',\n        uf: 'MG'\n    },\n    {\n        cep: '00000-000',\n        erro: true\n    },\n    'não é json'\n];\nfor (const resposta of respostas){\n    const cep = lerCep(resposta);\n    console.log(cep ? `✓ ${cep.logradouro}, ${cep.localidade}/${cep.uf}` : '✕ resposta inválida');\n}\nconsole.log('\\nUma função de validação na borda, e o resto do sistema trabalha com `Cep` de');\nconsole.log('verdade. É a mesma ideia do type guard (tema 05), aplicada ao mundo lá fora.');\n"
       },
       {
        "n": 6,
        "titulo": "`.d.ts` errado é pior do que `.d.ts` nenhum",
        "secao": "PEGADINHAS",
        "codigo": "// A declaração diz que devolve number. A biblioteca devolve string. Ninguém confere.\ndeclare function somarDaLib(a: number, b: number): number;\n\nconst globalDaLib = globalThis as unknown as { somarDaLib: (a: number, b: number) => unknown };\nglobalDaLib.somarDaLib = (a, b) => `${a + b}`;      // a realidade: devolve texto\n\nconst total = somarDaLib(2, 3);\nconsole.log('o tipo diz : number');\nconsole.log('a realidade:', typeof total, JSON.stringify(total));\ntry {\n  console.log(total.toFixed(2));\n} catch (erro) {\n  console.log('e estourou :', (erro as Error).message);\n}\n\nconsole.log('\\nSem tipo nenhum, `any` pelo menos avisa você que ali não há garantia. Um `.d.ts`');\nconsole.log('desatualizado dá a garantia errada — e é confiando nela que o código quebra.');\nconsole.log('Quando escrever um, escreva pouco, e confira contra a documentação da versão.');",
        "codigoJs": "const globalDaLib = globalThis;\nglobalDaLib.somarDaLib = (a, b)=>`${a + b}`;\nconst total = somarDaLib(2, 3);\nconsole.log('o tipo diz : number');\nconsole.log('a realidade:', typeof total, JSON.stringify(total));\ntry {\n    console.log(total.toFixed(2));\n} catch (erro) {\n    console.log('e estourou :', erro.message);\n}\nconsole.log('\\nSem tipo nenhum, `any` pelo menos avisa você que ali não há garantia. Um `.d.ts`');\nconsole.log('desatualizado dá a garantia errada — e é confiando nela que o código quebra.');\nconsole.log('Quando escrever um, escreva pouco, e confira contra a documentação da versão.');\n"
       }
      ],
      "resumo": [
       "Tipo de biblioteca vem embutido, de `@types/<pacote>`, ou de um `.d.ts` seu.",
       "`.d.ts` é declaração pura: sem corpo, sem nada que rode, some ao compilar.",
       "Declare só o que você usa — não a biblioteca inteira.",
       "Para acrescentar campo a um tipo de terceiro, reabra a interface num `.d.ts` do projeto.",
       "Dado que chega de fora: `unknown` na borda, valide, e tipe daí para dentro.",
       "`.d.ts` errado é pior que nenhum: ele promete uma garantia que não existe."
      ]
     },
     {
      "slug": "03-decorators-por-dentro",
      "arquivo": "typescript/src/08-extras/03-decorators-por-dentro.ts",
      "comando": "node src/08-extras/03-decorators-por-dentro.ts",
      "titulo": "Decorators por dentro",
      "sessao": 8,
      "oQueE": "a continuação do tópico anterior — quando o decorator roda, como parametrizá-lo, em que ordem eles se empilham e o que cada um dos cinco lugares recebe.",
      "quandoUsar": "quando você já entendeu \"é uma função que embrulha\" e precisa mexer em framework que usa `@` — ler o que ele faz, ou escrever o seu.",
      "quandoNaoUsar": "para resolver um caso só. Um decorator só se paga a partir do momento em que o mesmo cuidado se repete em muitas classes.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O decorator roda na definição da classe, não no `new`",
        "secao": "ESSENCIAL",
        "codigo": "function registrar(alvo: Function): void {\n  console.log(`  [decorator] rodei agora, definindo ${alvo.name}`);\n}\n\nconsole.log('antes de definir a classe');\n\nclass Cupom {\n  codigo: string;\n  constructor(codigo: string) {\n    this.codigo = codigo;\n    console.log(`  [construtor] rodei agora, criando ${this.codigo}`);\n  }\n}\nregistrar(Cupom);                                   // é o que `@registrar` faria aqui\n\nconsole.log('depois de definir a classe');\nnew Cupom('BEMVINDO10');\nnew Cupom('FRETEGRATIS');\n\nconsole.log('\\nO decorator rodou UMA vez, na definição. O construtor rodou a cada `new`.');\nconsole.log('É por isso que decorator serve para registrar, congelar e trocar método — coisas');\nconsole.log('de classe. Nada do que ele faz depende de qual instância vai existir depois.');",
        "codigoJs": "function registrar(alvo) {\n    console.log(`  [decorator] rodei agora, definindo ${alvo.name}`);\n}\nconsole.log('antes de definir a classe');\nclass Cupom {\n    codigo;\n    constructor(codigo){\n        this.codigo = codigo;\n        console.log(`  [construtor] rodei agora, criando ${this.codigo}`);\n    }\n}\nregistrar(Cupom);\nconsole.log('depois de definir a classe');\nnew Cupom('BEMVINDO10');\nnew Cupom('FRETEGRATIS');\nconsole.log('\\nO decorator rodou UMA vez, na definição. O construtor rodou a cada `new`.');\nconsole.log('É por isso que decorator serve para registrar, congelar e trocar método — coisas');\nconsole.log('de classe. Nada do que ele faz depende de qual instância vai existir depois.');\n"
       },
       {
        "n": 2,
        "titulo": "Fábrica de decoradores: quando ele precisa de argumento",
        "secao": "ESSENCIAL",
        "codigo": "// Um decorator não recebe argumento próprio. Quem recebe é a função que DEVOLVE o decorator.\nfunction comPrefixo(prefixo: string) {\n  return function (original: (texto: string) => string): (texto: string) => string {\n    return (texto: string) => original(`${prefixo} ${texto}`);\n  };\n}\n\nconst gritar = (texto: string) => texto.toUpperCase();\n\nconst gritarUrgente = comPrefixo('[URGENTE]')(gritar);      // `@comPrefixo('[URGENTE]')`\nconst gritarAviso = comPrefixo('[aviso]')(gritar);\n\nconsole.log(gritarUrgente('estoque acabou'));\nconsole.log(gritarAviso('estoque baixo'));\n\nconsole.log('\\nDuas chamadas em sequência: a de fora escolhe a configuração, a de dentro');\nconsole.log('recebe o alvo. `@Column({ nullable: true })` do TypeORM é exatamente isto.');",
        "codigoJs": "function comPrefixo(prefixo) {\n    return function(original) {\n        return (texto)=>original(`${prefixo} ${texto}`);\n    };\n}\nconst gritar = (texto)=>texto.toUpperCase();\nconst gritarUrgente = comPrefixo('[URGENTE]')(gritar);\nconst gritarAviso = comPrefixo('[aviso]')(gritar);\nconsole.log(gritarUrgente('estoque acabou'));\nconsole.log(gritarAviso('estoque baixo'));\nconsole.log('\\nDuas chamadas em sequência: a de fora escolhe a configuração, a de dentro');\nconsole.log('recebe o alvo. `@Column({ nullable: true })` do TypeORM é exatamente isto.');\n"
       },
       {
        "n": 3,
        "titulo": "Empilhar decoradores: a ordem que confunde todo mundo",
        "secao": "ESSENCIAL",
        "codigo": "function passo(nome: string) {\n  console.log(`  fábrica ${nome} avaliada`);        // acontece de cima para baixo\n  return function (original: () => string): () => string {\n    console.log(`  decorator ${nome} aplicado`);    // acontece de baixo para cima\n    return () => `${nome}(${original()})`;\n  };\n}\n\nconsole.log('montando:');\nconst base = () => 'valor';\n// `@passo('A')` em cima de `@passo('B')` vira passo('A')(passo('B')(base)).\nconst decorado = passo('A')(passo('B')(base));\n\nconsole.log('resultado:', decorado());\nconsole.log('\\nAvaliação de cima para baixo, aplicação de baixo para cima — como embrulhar');\nconsole.log('presente: o papel de dentro entra primeiro, mas quem você vê é o de fora.');",
        "codigoJs": "function passo(nome) {\n    console.log(`  fábrica ${nome} avaliada`);\n    return function(original) {\n        console.log(`  decorator ${nome} aplicado`);\n        return ()=>`${nome}(${original()})`;\n    };\n}\nconsole.log('montando:');\nconst base = ()=>'valor';\nconst decorado = passo('A')(passo('B')(base));\nconsole.log('resultado:', decorado());\nconsole.log('\\nAvaliação de cima para baixo, aplicação de baixo para cima — como embrulhar');\nconsole.log('presente: o papel de dentro entra primeiro, mas quem você vê é o de fora.');\n"
       },
       {
        "n": 4,
        "titulo": "Decorator de propriedade: normalizar o que entra",
        "secao": "NA PRÁTICA",
        "codigo": "// Ele não recebe o valor — recebe o nome do campo. Quem guarda o valor é o par get/set.\nfunction somenteMaiusculas<T extends object>(prototipo: T, campo: string): void {\n  const valores = new WeakMap<object, string>();\n  Object.defineProperty(prototipo, campo, {\n    get(this: object) { return valores.get(this) ?? ''; },\n    set(this: object, novo: string) { valores.set(this, novo.trim().toUpperCase()); },\n  });\n}\n\nclass Etiqueta {\n  // `declare` porque o campo tem que ficar SÓ no protótipo: um `sigla = ''` aqui criaria\n  // uma propriedade própria na instância e passaria por cima do get/set instalado.\n  declare sigla: string;\n  constructor(sigla: string) { this.sigla = sigla; }\n}\nsomenteMaiusculas(Etiqueta.prototype, 'sigla');     // é o que `@somenteMaiusculas` faria\n\nconst etiqueta = new Etiqueta('  frágil ');\nconsole.log('guardado:', `\"${etiqueta.sigla}\"`, '← entrou com espaço e minúscula');\netiqueta.sigla = 'urgente';\nconsole.log('trocado :', `\"${etiqueta.sigla}\"`);",
        "codigoJs": "function somenteMaiusculas(prototipo, campo) {\n    const valores = new WeakMap();\n    Object.defineProperty(prototipo, campo, {\n        get () {\n            return valores.get(this) ?? '';\n        },\n        set (novo) {\n            valores.set(this, novo.trim().toUpperCase());\n        }\n    });\n}\nclass Etiqueta {\n    constructor(sigla){\n        this.sigla = sigla;\n    }\n}\nsomenteMaiusculas(Etiqueta.prototype, 'sigla');\nconst etiqueta = new Etiqueta('  frágil ');\nconsole.log('guardado:', `\"${etiqueta.sigla}\"`, '← entrou com espaço e minúscula');\netiqueta.sigla = 'urgente';\nconsole.log('trocado :', `\"${etiqueta.sigla}\"`);\n"
       },
       {
        "n": 5,
        "titulo": "Decorator de parâmetro: ele só anota, quem age é outro",
        "secao": "NA PRÁTICA",
        "codigo": "// O de parâmetro recebe a POSIÇÃO. Sozinho ele não faz nada: guarda a marca para o método.\nconst obrigatorios = new Map<string, number[]>();\n\nfunction obrigatorio(metodo: string, indice: number): void {\n  obrigatorios.set(metodo, [...(obrigatorios.get(metodo) ?? []), indice]);\n}\n\nfunction conferirObrigatorios<T extends (...a: never[]) => unknown>(original: T, nome: string): T {\n  return function (this: unknown, ...argumentos: Parameters<T>) {\n    for (const indice of obrigatorios.get(nome) ?? []) {\n      const valor = argumentos[indice];\n      if (valor === undefined || valor === '') {\n        return `erro: o parâmetro ${indice} de ${nome} é obrigatório`;\n      }\n    }\n    return original.apply(this, argumentos);\n  } as T;\n}\n\nclass Cadastro {\n  criar(nome: string, apelido?: string): string {   // `@obrigatorio` iria antes de `nome`\n    return `criado: ${nome}${apelido ? ` (${apelido})` : ''}`;\n  }\n}\nobrigatorio('criar', 0);\nCadastro.prototype.criar = conferirObrigatorios(Cadastro.prototype.criar, 'criar');\n\nconst cadastro = new Cadastro();\nconsole.log(cadastro.criar('Ana', 'aninha'));\nconsole.log(cadastro.criar(''));\n\nconsole.log('\\nÉ assim que o `@Inject()` do NestJS funciona: o decorator de parâmetro anota,');\nconsole.log('e o decorator de classe (ou o framework) lê a anotação na hora de montar.');",
        "codigoJs": "const obrigatorios = new Map();\nfunction obrigatorio(metodo, indice) {\n    obrigatorios.set(metodo, [\n        ...obrigatorios.get(metodo) ?? [],\n        indice\n    ]);\n}\nfunction conferirObrigatorios(original, nome) {\n    return function(...argumentos) {\n        for (const indice of obrigatorios.get(nome) ?? []){\n            const valor = argumentos[indice];\n            if (valor === undefined || valor === '') {\n                return `erro: o parâmetro ${indice} de ${nome} é obrigatório`;\n            }\n        }\n        return original.apply(this, argumentos);\n    };\n}\nclass Cadastro {\n    criar(nome, apelido) {\n        return `criado: ${nome}${apelido ? ` (${apelido})` : ''}`;\n    }\n}\nobrigatorio('criar', 0);\nCadastro.prototype.criar = conferirObrigatorios(Cadastro.prototype.criar, 'criar');\nconst cadastro = new Cadastro();\nconsole.log(cadastro.criar('Ana', 'aninha'));\nconsole.log(cadastro.criar(''));\nconsole.log('\\nÉ assim que o `@Inject()` do NestJS funciona: o decorator de parâmetro anota,');\nconsole.log('e o decorator de classe (ou o framework) lê a anotação na hora de montar.');\n"
       },
       {
        "n": 6,
        "titulo": "Os cinco lugares, e o que cada um recebe",
        "secao": "NA PRÁTICA",
        "codigo": "const tabela = [\n  ['onde',        'recebe',                              'serve para'],\n  ['classe',      'o construtor',                        'registrar, congelar, trocar a classe'],\n  ['método',      'a função + o nome',                   'log, tempo, permissão, cache'],\n  ['propriedade', 'o protótipo + o nome do campo',       'validar e normalizar o valor'],\n  ['parâmetro',   'o protótipo, o método e a posição',   'anotar (injeção, validação)'],\n  ['acessador',   'o get/set + o nome',                  'o mesmo do método, no get/set'],\n];\nfor (const [onde, recebe, serve] of tabela) {\n  console.log(`  ${onde.padEnd(12)} ${recebe.padEnd(38)} ${serve}`);\n}\n\nconsole.log('\\nOs argumentos exatos mudam entre o formato legado (`experimentalDecorators`) e');\nconsole.log('o padrão do TypeScript 5. O que não muda: todo decorator é uma função que roda');\nconsole.log('na definição e devolve — ou não — algo no lugar do que recebeu.');",
        "codigoJs": "const tabela = [\n    [\n        'onde',\n        'recebe',\n        'serve para'\n    ],\n    [\n        'classe',\n        'o construtor',\n        'registrar, congelar, trocar a classe'\n    ],\n    [\n        'método',\n        'a função + o nome',\n        'log, tempo, permissão, cache'\n    ],\n    [\n        'propriedade',\n        'o protótipo + o nome do campo',\n        'validar e normalizar o valor'\n    ],\n    [\n        'parâmetro',\n        'o protótipo, o método e a posição',\n        'anotar (injeção, validação)'\n    ],\n    [\n        'acessador',\n        'o get/set + o nome',\n        'o mesmo do método, no get/set'\n    ]\n];\nfor (const [onde, recebe, serve] of tabela){\n    console.log(`  ${onde.padEnd(12)} ${recebe.padEnd(38)} ${serve}`);\n}\nconsole.log('\\nOs argumentos exatos mudam entre o formato legado (`experimentalDecorators`) e');\nconsole.log('o padrão do TypeScript 5. O que não muda: todo decorator é uma função que roda');\nconsole.log('na definição e devolve — ou não — algo no lugar do que recebeu.');\n"
       },
       {
        "n": 7,
        "titulo": "Decorator de propriedade não enxerga o valor",
        "secao": "PEGADINHAS",
        "codigo": "function tentarLerValor<T extends object>(prototipo: T, campo: string): void {\n  const descritor = Object.getOwnPropertyDescriptor(prototipo, campo);\n  console.log(`  no decorator, ${campo} vale:`, descritor?.value, '← nem existe ainda');\n}\n\nclass Assinatura {\n  plano = 'anual';                                  // só ganha valor no `new`\n}\ntentarLerValor(Assinatura.prototype, 'plano');\n\nconsole.log('  na instância, plano vale:', new Assinatura().plano);\n\nconsole.log('\\nA propriedade só passa a existir quando o construtor roda. O decorator roda');\nconsole.log('antes disso — por isso ele instala um get/set, em vez de mexer no valor.');",
        "codigoJs": "function tentarLerValor(prototipo, campo) {\n    const descritor = Object.getOwnPropertyDescriptor(prototipo, campo);\n    console.log(`  no decorator, ${campo} vale:`, descritor?.value, '← nem existe ainda');\n}\nclass Assinatura {\n    plano = 'anual';\n}\ntentarLerValor(Assinatura.prototype, 'plano');\nconsole.log('  na instância, plano vale:', new Assinatura().plano);\nconsole.log('\\nA propriedade só passa a existir quando o construtor roda. O decorator roda');\nconsole.log('antes disso — por isso ele instala um get/set, em vez de mexer no valor.');\n"
       }
      ],
      "resumo": [
       "Decorator roda uma vez, na definição da classe; construtor roda a cada `new`.",
       "Decorator com argumento é uma FÁBRICA: uma função que devolve o decorator.",
       "Empilhados, avaliam de cima para baixo e aplicam de baixo para cima.",
       "O de propriedade recebe o nome do campo, não o valor — instale um get/set.",
       "O de parâmetro só anota a posição; quem age é o método ou o framework que lê a anotação.",
       "Classe, método, propriedade, parâmetro e acessador: os cinco lugares, mesmo mecanismo."
      ]
     },
     {
      "slug": "04-modulos-e-namespaces",
      "arquivo": "typescript/src/08-extras/04-modulos-e-namespaces.ts",
      "comando": "node src/08-extras/04-modulos-e-namespaces.ts",
      "titulo": "Módulos e namespaces",
      "sessao": 8,
      "oQueE": "as duas formas de dividir código em TypeScript. `namespace` é a antiga, de quando o JavaScript não tinha módulo; `import`/`export` é a de hoje, e é a do JavaScript.",
      "quandoUsar": "módulo, sempre. `namespace` só onde ele ainda vive: dentro de arquivos `.d.ts`, para agrupar tipos de biblioteca e para estender tipos globais.",
      "quandoNaoUsar": "`namespace` em código novo. Ele resolve um problema que o `import` já resolveu melhor — e atrapalha o bundler, que não sabe o que descartar.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "`namespace`: um nome só para várias coisas",
        "secao": "ESSENCIAL",
        "codigo": "const fonte = [\n  'namespace Financeiro {',\n  '  export const TAXA_JUROS = 0.02;              // sem `export`, fica preso lá dentro',\n  '  const arredondar = (n: number) => Math.round(n * 100) / 100;   // privado do namespace',\n  '',\n  '  export function juros(valor: number, meses: number) {',\n  '    return arredondar(valor * TAXA_JUROS * meses);',\n  '  }',\n  '',\n  '  export type Parcela = { numero: number; valor: number };',\n  '}',\n];\nfor (const linha of fonte) console.log('  ' + linha);\n\n// E isto é o que o `tsc` gera no lugar — namespace não é tipo: vira objeto de verdade.\nconst Financeiro = (function () {\n  const TAXA_JUROS = 0.02;\n  const arredondar = (n: number) => Math.round(n * 100) / 100;\n  function juros(valor: number, meses: number) { return arredondar(valor * TAXA_JUROS * meses); }\n  return { TAXA_JUROS, juros };                    // só o que tinha `export` sai\n})();\n\nconsole.log('\\njuros de 1000 em 3x:', Financeiro.juros(1000, 3).toFixed(2));\nconsole.log('taxa exportada     :', Financeiro.TAXA_JUROS);\n\n// @ts-expect-error — Property 'arredondar' does not exist on type '{ TAXA_JUROS: number; juros: ...\nconsole.log('o que ficou privado:', Financeiro.arredondar);\n\nconsole.log('\\nUma função que roda na hora e devolve um objeto: é só isso. O `namespace` é');\nconsole.log('açúcar para esse fecho — e o tipo (`Financeiro.Parcela`) sai pelo mesmo nome.');",
        "codigoJs": "const fonte = [\n    'namespace Financeiro {',\n    '  export const TAXA_JUROS = 0.02;              // sem `export`, fica preso lá dentro',\n    '  const arredondar = (n: number) => Math.round(n * 100) / 100;   // privado do namespace',\n    '',\n    '  export function juros(valor: number, meses: number) {',\n    '    return arredondar(valor * TAXA_JUROS * meses);',\n    '  }',\n    '',\n    '  export type Parcela = { numero: number; valor: number };',\n    '}'\n];\nfor (const linha of fonte)console.log('  ' + linha);\nconst Financeiro = function() {\n    const TAXA_JUROS = 0.02;\n    const arredondar = (n)=>Math.round(n * 100) / 100;\n    function juros(valor, meses) {\n        return arredondar(valor * TAXA_JUROS * meses);\n    }\n    return {\n        TAXA_JUROS,\n        juros\n    };\n}();\nconsole.log('\\njuros de 1000 em 3x:', Financeiro.juros(1000, 3).toFixed(2));\nconsole.log('taxa exportada     :', Financeiro.TAXA_JUROS);\nconsole.log('o que ficou privado:', Financeiro.arredondar);\nconsole.log('\\nUma função que roda na hora e devolve um objeto: é só isso. O `namespace` é');\nconsole.log('açúcar para esse fecho — e o tipo (`Financeiro.Parcela`) sai pelo mesmo nome.');\n"
       },
       {
        "n": 2,
        "titulo": "O que o `import` faz melhor",
        "secao": "ESSENCIAL",
        "codigo": "// Namespace vira um objeto de verdade no JavaScript gerado — nada some, mesmo sem uso.\nconst arquivos = [\n  '// financeiro/juros.ts',\n  'export const TAXA_JUROS = 0.02;',\n  'export function juros(valor: number, meses: number) { /* ... */ }',\n  '',\n  '// pedidos/checkout.ts',\n  \"import { juros } from '../financeiro/juros.js';   // o caminho é o namespace\",\n  \"import type { Parcela } from '../financeiro/juros.js';\",\n];\nfor (const linha of arquivos) console.log('  ' + linha);\n\nconsole.log('\\nCada arquivo já é um escopo fechado: o que não tem `export` ninguém vê de fora.');\nconsole.log('O caminho do arquivo faz o papel do nome do namespace, e o bundler consegue');\nconsole.log('descartar o que ninguém importou — coisa que com namespace ele não consegue.');\n\n// Há ainda a forma dinâmica, que roda na hora e devolve uma Promise — é o que permite\n// carregar um pedaço do sistema só quando o usuário chega nele.\nconsole.log(\"\\n  const { juros } = await import('../financeiro/juros.js');   // import dinâmico\");",
        "codigoJs": "const arquivos = [\n    '// financeiro/juros.ts',\n    'export const TAXA_JUROS = 0.02;',\n    'export function juros(valor: number, meses: number) { /* ... */ }',\n    '',\n    '// pedidos/checkout.ts',\n    \"import { juros } from '../financeiro/juros.js';   // o caminho é o namespace\",\n    \"import type { Parcela } from '../financeiro/juros.js';\"\n];\nfor (const linha of arquivos)console.log('  ' + linha);\nconsole.log('\\nCada arquivo já é um escopo fechado: o que não tem `export` ninguém vê de fora.');\nconsole.log('O caminho do arquivo faz o papel do nome do namespace, e o bundler consegue');\nconsole.log('descartar o que ninguém importou — coisa que com namespace ele não consegue.');\nconsole.log(\"\\n  const { juros } = await import('../financeiro/juros.js');   // import dinâmico\");\n"
       },
       {
        "n": 3,
        "titulo": "`/// <reference>`: como era antes do módulo",
        "secao": "ESSENCIAL",
        "codigo": "const antes = [\n  '/// <reference path=\"./financeiro.ts\" />        // \"cole este arquivo antes deste aqui\"',\n  '/// <reference types=\"node\" />                  // \"puxe os tipos do pacote @types/node\"',\n  '',\n  '// tsconfig.json de 2016: um único arquivo de saída, na ordem das referências',\n  '{ \"compilerOptions\": { \"outFile\": \"bundle.js\" } }',\n];\nfor (const linha of antes) console.log('  ' + linha);\n\nconsole.log('\\nEra assim que dois arquivos se enxergavam sem `import`: o `tsc` concatenava tudo');\nconsole.log('num arquivo só, na ordem das referências. Hoje `/// <reference path>` não se usa');\nconsole.log('mais em código. Já `/// <reference types=\"...\">` continua vivo dentro de `.d.ts`,');\nconsole.log('que é onde não existe `import` de valor para puxar junto.');",
        "codigoJs": "const antes = [\n    '/// <reference path=\"./financeiro.ts\" />        // \"cole este arquivo antes deste aqui\"',\n    '/// <reference types=\"node\" />                  // \"puxe os tipos do pacote @types/node\"',\n    '',\n    '// tsconfig.json de 2016: um único arquivo de saída, na ordem das referências',\n    '{ \"compilerOptions\": { \"outFile\": \"bundle.js\" } }'\n];\nfor (const linha of antes)console.log('  ' + linha);\nconsole.log('\\nEra assim que dois arquivos se enxergavam sem `import`: o `tsc` concatenava tudo');\nconsole.log('num arquivo só, na ordem das referências. Hoje `/// <reference path>` não se usa');\nconsole.log('mais em código. Já `/// <reference types=\"...\">` continua vivo dentro de `.d.ts`,');\nconsole.log('que é onde não existe `import` de valor para puxar junto.');\n"
       },
       {
        "n": 4,
        "titulo": "Importar um JavaScript no meio do TypeScript",
        "secao": "NA PRÁTICA",
        "codigo": "// Com `allowJs` ligado, o `require` de um `.js` sem tipos entrega `any`: tudo passa.\nconst legado: any = {                               // é o que `require('./legado.js')` devolve\n  calcularFrete: (cep: string, peso: number) => (cep.startsWith('3') ? 12 : 25) + peso * 2,\n};\n\nconsole.log('frete:', legado.calcularFrete('30110-000', 3));\nconsole.log('e isto também \"compila\":', typeof legado.calcularFreteee);   // any não confere nada\n\n// A borda: descreva o que você usa e converse só com o tipo, nunca com o `any`.\ninterface Legado {\n  calcularFrete(cep: string, peso: number): number;\n}\nconst frete: Legado = legado;                       // uma linha, e o resto do arquivo fica seguro\n\nconsole.log('pelo tipo:', frete.calcularFrete('01310-000', 1).toFixed(2));\n\n// @ts-expect-error — Property 'calcularFreteee' does not exist on type 'Legado'.\nconsole.log(frete.calcularFreteee);\n\nconsole.log('\\nAs três saídas, em ordem de preferência: `@types/pacote`, um `.d.ts` seu com o');\nconsole.log('que você usa, ou `allowJs` + JSDoc no próprio `.js`. `any` solto não é saída.');",
        "codigoJs": "const legado = {\n    calcularFrete: (cep, peso)=>(cep.startsWith('3') ? 12 : 25) + peso * 2\n};\nconsole.log('frete:', legado.calcularFrete('30110-000', 3));\nconsole.log('e isto também \"compila\":', typeof legado.calcularFreteee);\nconst frete = legado;\nconsole.log('pelo tipo:', frete.calcularFrete('01310-000', 1).toFixed(2));\nconsole.log(frete.calcularFreteee);\nconsole.log('\\nAs três saídas, em ordem de preferência: `@types/pacote`, um `.d.ts` seu com o');\nconsole.log('que você usa, ou `allowJs` + JSDoc no próprio `.js`. `any` solto não é saída.');\n"
       },
       {
        "n": 5,
        "titulo": "Onde o namespace ainda aparece de verdade",
        "secao": "NA PRÁTICA",
        "codigo": "const ondeVive = [\n  '// arquivo .d.ts — agrupar tipos de uma biblioteca',\n  'declare namespace Chart {',\n  '  interface Opcoes { responsivo: boolean }',\n  '  function criar(opcoes: Opcoes): void;',\n  '}',\n  '',\n  '// estender um tipo global de terceiro (o `Request` do Express)',\n  'declare global {',\n  '  namespace Express {',\n  '    interface Request { usuario?: { id: number } }',\n  '  }',\n  '}',\n];\nfor (const linha of ondeVive) console.log('  ' + linha);\n\nconsole.log('\\nRepare que os dois casos são de TIPO, não de valor: `declare namespace` não gera');\nconsole.log('código nenhum. É esse namespace que sobreviveu — o outro, o que vira objeto,');\nconsole.log('foi aposentado pelo `import`.');",
        "codigoJs": "const ondeVive = [\n    '// arquivo .d.ts — agrupar tipos de uma biblioteca',\n    'declare namespace Chart {',\n    '  interface Opcoes { responsivo: boolean }',\n    '  function criar(opcoes: Opcoes): void;',\n    '}',\n    '',\n    '// estender um tipo global de terceiro (o `Request` do Express)',\n    'declare global {',\n    '  namespace Express {',\n    '    interface Request { usuario?: { id: number } }',\n    '  }',\n    '}'\n];\nfor (const linha of ondeVive)console.log('  ' + linha);\nconsole.log('\\nRepare que os dois casos são de TIPO, não de valor: `declare namespace` não gera');\nconsole.log('código nenhum. É esse namespace que sobreviveu — o outro, o que vira objeto,');\nconsole.log('foi aposentado pelo `import`.');\n"
       },
       {
        "n": 6,
        "titulo": "Um `export` no arquivo muda o significado de tudo",
        "secao": "PEGADINHAS",
        "codigo": "console.log('Arquivo SEM import/export: é script global — o `namespace` dele fica visível');\nconsole.log('para o projeto inteiro, e duas variáveis com o mesmo nome em arquivos diferentes');\nconsole.log('brigam entre si.');\nconsole.log('Arquivo COM um `export` qualquer: vira módulo — nada dele vaza, e o namespace de');\nconsole.log('dentro só existe para quem importar o arquivo.');\n\n// É a origem do `export {}` solitário que se vê no fim de arquivos de tipo:\nconst truque = 'export {};   // não exporta nada, serve só para o arquivo virar módulo';\nconsole.log('\\n  ' + truque);\n\n// E o custo do namespace que vira objeto: ele existe rodando, inteiro.\nconst Contabil = (function () {\n  return { somar: (a: number, b: number) => a + b, subtrair: (a: number, b: number) => a - b };\n})();\n\nconsole.log('\\no namespace existe em tempo de execução:', typeof Contabil, Object.keys(Contabil));\nconsole.log('mesmo usando só `somar`, o `subtrair` vai junto para o navegador — ninguém');\nconsole.log('consegue descartar a metade que você não usou. Com `import`, o bundler descarta.');",
        "codigoJs": "console.log('Arquivo SEM import/export: é script global — o `namespace` dele fica visível');\nconsole.log('para o projeto inteiro, e duas variáveis com o mesmo nome em arquivos diferentes');\nconsole.log('brigam entre si.');\nconsole.log('Arquivo COM um `export` qualquer: vira módulo — nada dele vaza, e o namespace de');\nconsole.log('dentro só existe para quem importar o arquivo.');\nconst truque = 'export {};   // não exporta nada, serve só para o arquivo virar módulo';\nconsole.log('\\n  ' + truque);\nconst Contabil = function() {\n    return {\n        somar: (a, b)=>a + b,\n        subtrair: (a, b)=>a - b\n    };\n}();\nconsole.log('\\no namespace existe em tempo de execução:', typeof Contabil, Object.keys(Contabil));\nconsole.log('mesmo usando só `somar`, o `subtrair` vai junto para o navegador — ninguém');\nconsole.log('consegue descartar a metade que você não usou. Com `import`, o bundler descarta.');\n"
       }
      ],
      "resumo": [
       "`namespace` agrupa sob um nome, só deixa sair o `export` e vira um objeto no JS.",
       "Módulo é o padrão de hoje: cada arquivo é um escopo, e o caminho faz o papel do nome.",
       "`/// <reference path>` é do tempo do `outFile`; só o `types=\"...\"` sobrevive em `.d.ts`.",
       "JavaScript importado sem tipos chega como `any` — amarre num tipo seu logo na borda.",
       "`declare namespace` (só tipo, sem código) é o namespace que continua útil.",
       "Um `export` qualquer transforma o arquivo em módulo; sem nenhum, ele é script global."
      ]
     },
     {
      "slug": "05-do-typescript-ao-navegador",
      "arquivo": "typescript/src/08-extras/05-do-typescript-ao-navegador.ts",
      "comando": "node src/08-extras/05-do-typescript-ao-navegador.ts",
      "titulo": "Do TypeScript ao navegador",
      "sessao": 8,
      "oQueE": "o caminho que o código faz até virar o `.js` que a página carrega — o `tsc`, o bundler (webpack, Vite, esbuild) e o tsconfig que o front pede.",
      "quandoUsar": "em qualquer projeto de navegador. Ali não dá para \"rodar o `.ts` direto\": o navegador não conhece tipo, nem `import` de `node_modules`.",
      "quandoNaoUsar": "no back-end de hoje. O Node roda `.ts` sozinho — montar webpack para um servidor é trabalho que não paga nada.",
      "preambulo": "",
      "blocos": [
       {
        "n": 1,
        "titulo": "O que o `tsc` faz: apaga o tipo e nivela a sintaxe",
        "secao": "ESSENCIAL",
        "codigo": "const antes = [\n  '// entrada: src/carrinho.ts',\n  'export function total(itens: { preco: number; qtd: number }[]): number {',\n  '  return itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);',\n  '}',\n];\nconst depois = [\n  '// saída: dist/carrinho.js  (target: ES2020, module: esnext)',\n  'export function total(itens) {',\n  '  return itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);',\n  '}',\n];\nfor (const linha of antes) console.log('  ' + linha);\nconsole.log('');\nfor (const linha of depois) console.log('  ' + linha);\n\nconsole.log('\\nSão duas coisas num comando só: TIRAR os tipos (que não existem no JavaScript)');\nconsole.log('e TRADUZIR a sintaxe nova para a versão que o `target` pede. Se o target fosse');\nconsole.log('ES5, a arrow function acima viraria `function (soma, i) { ... }`.');",
        "codigoJs": "const antes = [\n    '// entrada: src/carrinho.ts',\n    'export function total(itens: { preco: number; qtd: number }[]): number {',\n    '  return itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);',\n    '}'\n];\nconst depois = [\n    '// saída: dist/carrinho.js  (target: ES2020, module: esnext)',\n    'export function total(itens) {',\n    '  return itens.reduce((soma, i) => soma + i.preco * i.qtd, 0);',\n    '}'\n];\nfor (const linha of antes)console.log('  ' + linha);\nconsole.log('');\nfor (const linha of depois)console.log('  ' + linha);\nconsole.log('\\nSão duas coisas num comando só: TIRAR os tipos (que não existem no JavaScript)');\nconsole.log('e TRADUZIR a sintaxe nova para a versão que o `target` pede. Se o target fosse');\nconsole.log('ES5, a arrow function acima viraria `function (soma, i) { ... }`.');\n"
       },
       {
        "n": 2,
        "titulo": "As opções de build que decidem tudo",
        "secao": "ESSENCIAL",
        "codigo": "const opcoes = [\n  ['opção',       'para que serve'],\n  ['outDir',      'onde o .js gerado cai — nunca junto do .ts'],\n  ['rootDir',     'a raiz do que entra, para o dist espelhar a estrutura'],\n  ['target',      'até que versão do JavaScript traduzir (ES2020 é o padrão sensato)'],\n  ['module',      'o formato do import gerado: esnext no front, commonjs no Node antigo'],\n  ['lib',         'que APIs existem: [\"DOM\", \"ES2020\"] no navegador, sem DOM no servidor'],\n  ['sourceMap',   'o mapa que faz o erro apontar a linha do .ts, não a do .js'],\n  ['declaration', 'gera o .d.ts junto — só quando você PUBLICA uma biblioteca'],\n];\nfor (const [opcao, serve] of opcoes) console.log(`  ${opcao.padEnd(13)} ${serve}`);\n\nconsole.log('\\nO ciclo do dia a dia é `tsc --watch`: ele fica de olho em `src/` e regenera o');\nconsole.log('`dist/` a cada salvar. O `npm run check` deste curso é o mesmo `tsc` com');\nconsole.log('`--noEmit`: confere e não gera nada, porque aqui quem roda o `.ts` é o Node.');",
        "codigoJs": "const opcoes = [\n    [\n        'opção',\n        'para que serve'\n    ],\n    [\n        'outDir',\n        'onde o .js gerado cai — nunca junto do .ts'\n    ],\n    [\n        'rootDir',\n        'a raiz do que entra, para o dist espelhar a estrutura'\n    ],\n    [\n        'target',\n        'até que versão do JavaScript traduzir (ES2020 é o padrão sensato)'\n    ],\n    [\n        'module',\n        'o formato do import gerado: esnext no front, commonjs no Node antigo'\n    ],\n    [\n        'lib',\n        'que APIs existem: [\"DOM\", \"ES2020\"] no navegador, sem DOM no servidor'\n    ],\n    [\n        'sourceMap',\n        'o mapa que faz o erro apontar a linha do .ts, não a do .js'\n    ],\n    [\n        'declaration',\n        'gera o .d.ts junto — só quando você PUBLICA uma biblioteca'\n    ]\n];\nfor (const [opcao, serve] of opcoes)console.log(`  ${opcao.padEnd(13)} ${serve}`);\nconsole.log('\\nO ciclo do dia a dia é `tsc --watch`: ele fica de olho em `src/` e regenera o');\nconsole.log('`dist/` a cada salvar. O `npm run check` deste curso é o mesmo `tsc` com');\nconsole.log('`--noEmit`: confere e não gera nada, porque aqui quem roda o `.ts` é o Node.');\n"
       },
       {
        "n": 3,
        "titulo": "Por que o navegador ainda precisa de um bundler",
        "secao": "ESSENCIAL",
        "codigo": "const config = [\n  '// webpack.config.js — o que o curso original monta na aula de configuração',\n  \"const path = require('path');\",\n  'module.exports = {',\n  \"  entry: './src/index.ts',\",\n  \"  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },\",\n  \"  resolve: { extensions: ['.ts', '.js'] },\",\n  \"  module: { rules: [{ test: /\\\\.ts$/, use: 'ts-loader', exclude: /node_modules/ }] },\",\n  \"  devtool: 'source-map',\",\n  '};',\n  '',\n  '<!-- index.html: uma tag só, para o arquivo que saiu do build -->',\n  '<script src=\"dist/bundle.js\"></script>',\n];\nfor (const linha of config) console.log('  ' + linha);\n\nconsole.log('\\nO `tsc` sozinho resolve o TIPO. O bundler resolve o resto: junta os arquivos num');\nconsole.log('só, sabe achar `node_modules`, cuida de CSS e imagem e recarrega a página ao');\nconsole.log('salvar. Hoje o mesmo papel é feito por Vite ou esbuild, com menos configuração —');\nconsole.log('a ideia é a mesma, e o `ts-loader` vira `esbuild` por baixo.');",
        "codigoJs": "const config = [\n    '// webpack.config.js — o que o curso original monta na aula de configuração',\n    \"const path = require('path');\",\n    'module.exports = {',\n    \"  entry: './src/index.ts',\",\n    \"  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },\",\n    \"  resolve: { extensions: ['.ts', '.js'] },\",\n    \"  module: { rules: [{ test: /\\\\.ts$/, use: 'ts-loader', exclude: /node_modules/ }] },\",\n    \"  devtool: 'source-map',\",\n    '};',\n    '',\n    '<!-- index.html: uma tag só, para o arquivo que saiu do build -->',\n    '<script src=\"dist/bundle.js\"></script>'\n];\nfor (const linha of config)console.log('  ' + linha);\nconsole.log('\\nO `tsc` sozinho resolve o TIPO. O bundler resolve o resto: junta os arquivos num');\nconsole.log('só, sabe achar `node_modules`, cuida de CSS e imagem e recarrega a página ao');\nconsole.log('salvar. Hoje o mesmo papel é feito por Vite ou esbuild, com menos configuração —');\nconsole.log('a ideia é a mesma, e o `ts-loader` vira `esbuild` por baixo.');\n"
       },
       {
        "n": 4,
        "titulo": "O exercício clássico: validar um formulário com tipos",
        "secao": "NA PRÁTICA",
        "codigo": "// No navegador viria de `document.querySelector`; aqui a entrada é uma variável.\ntype CampoFormulario = { nome: string; email: string; senha: string; idade: string };\ntype Erro = { campo: keyof CampoFormulario; mensagem: string };\n\nfunction validar(dados: CampoFormulario): Erro[] {\n  const erros: Erro[] = [];\n  if (dados.nome.trim().length < 3) erros.push({ campo: 'nome', mensagem: 'nome curto demais' });\n  if (!dados.email.includes('@')) erros.push({ campo: 'email', mensagem: 'e-mail inválido' });\n  if (dados.senha.length < 8) erros.push({ campo: 'senha', mensagem: 'senha com menos de 8' });\n  const idade = Number(dados.idade);\n  if (!Number.isInteger(idade) || idade < 18) {\n    erros.push({ campo: 'idade', mensagem: 'precisa ser maior de idade' });\n  }\n  return erros;\n}\n\nconst enviado: CampoFormulario = { nome: 'Al', email: 'ana.exemplo.com', senha: '123', idade: '17' };\nconst errosEncontrados = validar(enviado);\n\nconsole.log(`${errosEncontrados.length} erro(s):`);\nfor (const erro of errosEncontrados) console.log(`  ${erro.campo}: ${erro.mensagem}`);\n\nconst corrigido: CampoFormulario = { nome: 'Ana Lima', email: 'ana@exemplo.com', senha: 'senha1234', idade: '32' };\nconsole.log('depois de corrigir:', validar(corrigido).length, 'erro(s)');\n\n// `keyof` no campo é o que impede o erro bobo de escrever um nome de campo que não existe.\n// @ts-expect-error — Type '\"telefone\"' is not assignable to type 'keyof CampoFormulario'.\nconst erroInventado: Erro = { campo: 'telefone', mensagem: 'não existe' };\nconsole.log('mesmo assim rodaria:', erroInventado.campo, '← o tipo some no navegador');",
        "codigoJs": "function validar(dados) {\n    const erros = [];\n    if (dados.nome.trim().length < 3) erros.push({\n        campo: 'nome',\n        mensagem: 'nome curto demais'\n    });\n    if (!dados.email.includes('@')) erros.push({\n        campo: 'email',\n        mensagem: 'e-mail inválido'\n    });\n    if (dados.senha.length < 8) erros.push({\n        campo: 'senha',\n        mensagem: 'senha com menos de 8'\n    });\n    const idade = Number(dados.idade);\n    if (!Number.isInteger(idade) || idade < 18) {\n        erros.push({\n            campo: 'idade',\n            mensagem: 'precisa ser maior de idade'\n        });\n    }\n    return erros;\n}\nconst enviado = {\n    nome: 'Al',\n    email: 'ana.exemplo.com',\n    senha: '123',\n    idade: '17'\n};\nconst errosEncontrados = validar(enviado);\nconsole.log(`${errosEncontrados.length} erro(s):`);\nfor (const erro of errosEncontrados)console.log(`  ${erro.campo}: ${erro.mensagem}`);\nconst corrigido = {\n    nome: 'Ana Lima',\n    email: 'ana@exemplo.com',\n    senha: 'senha1234',\n    idade: '32'\n};\nconsole.log('depois de corrigir:', validar(corrigido).length, 'erro(s)');\nconst erroInventado = {\n    campo: 'telefone',\n    mensagem: 'não existe'\n};\nconsole.log('mesmo assim rodaria:', erroInventado.campo, '← o tipo some no navegador');\n"
       },
       {
        "n": 5,
        "titulo": "O mesmo formulário, agora falando com o DOM",
        "secao": "NA PRÁTICA",
        "codigo": "const noNavegador = [\n  \"const formulario = document.querySelector('#cadastro') as HTMLFormElement;\",\n  \"const campoEmail = document.querySelector<HTMLInputElement>('#email');\",\n  '',\n  \"formulario.addEventListener('submit', (evento) => {\",\n  '  evento.preventDefault();',\n  '  const dados = {',\n  \"    nome: (document.querySelector('#nome') as HTMLInputElement).value,\",\n  \"    email: campoEmail?.value ?? '',\",\n  '    // ...',\n  '  };',\n  '  const erros = validar(dados);',\n  '});',\n];\nfor (const linha of noNavegador) console.log('  ' + linha);\n\nconsole.log('\\nDuas coisas aparecem aqui e em nenhum outro lugar do curso: o `lib: [\"DOM\"]`, que');\nconsole.log('é o que faz `document` existir para o compilador, e o `as HTMLInputElement` —');\nconsole.log('`querySelector` devolve `Element | null`, e só você sabe que aquele id é um input.');\nconsole.log('`querySelector<HTMLInputElement>(...)` diz o mesmo sem `as`, e é o preferível.');",
        "codigoJs": "const noNavegador = [\n    \"const formulario = document.querySelector('#cadastro') as HTMLFormElement;\",\n    \"const campoEmail = document.querySelector<HTMLInputElement>('#email');\",\n    '',\n    \"formulario.addEventListener('submit', (evento) => {\",\n    '  evento.preventDefault();',\n    '  const dados = {',\n    \"    nome: (document.querySelector('#nome') as HTMLInputElement).value,\",\n    \"    email: campoEmail?.value ?? '',\",\n    '    // ...',\n    '  };',\n    '  const erros = validar(dados);',\n    '});'\n];\nfor (const linha of noNavegador)console.log('  ' + linha);\nconsole.log('\\nDuas coisas aparecem aqui e em nenhum outro lugar do curso: o `lib: [\"DOM\"]`, que');\nconsole.log('é o que faz `document` existir para o compilador, e o `as HTMLInputElement` —');\nconsole.log('`querySelector` devolve `Element | null`, e só você sabe que aquele id é um input.');\nconsole.log('`querySelector<HTMLInputElement>(...)` diz o mesmo sem `as`, e é o preferível.');\n"
       },
       {
        "n": 6,
        "titulo": "O tipo não valida o formulário: ele some no build",
        "secao": "PEGADINHAS",
        "codigo": "type Cadastro = { nome: string; email: string; senha: string; idade: string };\n\nfunction conferir(dados: Cadastro): string[] {\n  const erros: string[] = [];\n  if (dados.senha.length < 8) erros.push('senha');\n  if (!Number.isInteger(Number(dados.idade))) erros.push('idade');\n  return erros;\n}\n\nconst doUsuario = JSON.parse('{\"nome\":\"Ana\",\"email\":\"ana@exemplo.com\",\"senha\":\"1234\",\"idade\":\"vinte\"}');\nconst comoSeFosse = doUsuario as Cadastro;          // o `as` promete; ninguém conferiu nada\n\nconsole.log('idade prometida como string:', typeof comoSeFosse.idade, '· valor:', comoSeFosse.idade);\nconsole.log('Number(\"vinte\") =', Number(comoSeFosse.idade), '← o tipo estava \"certo\" e o dado, errado');\nconsole.log('validando de verdade:', conferir(comoSeFosse));\n\nconsole.log('\\nO build joga os tipos fora: no navegador não sobra conferência nenhuma. Tipo é');\nconsole.log('para a hora de escrever; validação é para a hora de rodar — e ela precisa existir');\nconsole.log('também no servidor, porque o formulário do navegador qualquer um contorna.');",
        "codigoJs": "function conferir(dados) {\n    const erros = [];\n    if (dados.senha.length < 8) erros.push('senha');\n    if (!Number.isInteger(Number(dados.idade))) erros.push('idade');\n    return erros;\n}\nconst doUsuario = JSON.parse('{\"nome\":\"Ana\",\"email\":\"ana@exemplo.com\",\"senha\":\"1234\",\"idade\":\"vinte\"}');\nconst comoSeFosse = doUsuario;\nconsole.log('idade prometida como string:', typeof comoSeFosse.idade, '· valor:', comoSeFosse.idade);\nconsole.log('Number(\"vinte\") =', Number(comoSeFosse.idade), '← o tipo estava \"certo\" e o dado, errado');\nconsole.log('validando de verdade:', conferir(comoSeFosse));\nconsole.log('\\nO build joga os tipos fora: no navegador não sobra conferência nenhuma. Tipo é');\nconsole.log('para a hora de escrever; validação é para a hora de rodar — e ela precisa existir');\nconsole.log('também no servidor, porque o formulário do navegador qualquer um contorna.');\n"
       }
      ],
      "resumo": [
       "`tsc` faz duas coisas: apaga o tipo e traduz a sintaxe até o `target` pedido.",
       "`outDir`, `target`, `module`, `lib` e `sourceMap` são as opções que decidem o build.",
       "O bundler (webpack, Vite, esbuild) junta os arquivos e resolve `node_modules` para a página.",
       "`lib: [\"DOM\"]` é o que faz `document` existir; `querySelector<HTMLInputElement>` evita o `as`.",
       "Formulário tipado com `keyof` não deixa você inventar campo que não existe no formulário.",
       "Nada disso valida dado: o tipo some no build, e a validação de verdade roda no servidor."
      ]
     }
    ]
   }
  ]
 }
];
