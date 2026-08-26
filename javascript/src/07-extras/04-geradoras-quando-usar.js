/**
 * Geradoras: quando usar (e quando não)
 * Sessão 6 · Rodar: node src/07-extras/04-geradoras-quando-usar.js
 *
 * O QUE É: o critério para escolher entre gerador, array pronto e callback. A pergunta que
 *          decide é uma só — quem dita o ritmo, quem produz ou quem consome? Se a resposta
 *          certa é quem consome, é gerador.
 * QUANDO USAR: "isso chega aos poucos" (página de API, linha de arquivo, lote). "isso não tem
 *              fim" (id sequencial, numeração de NF, retry). "talvez eu pare no meio" (achei o
 *              que procurava, deu erro, o usuário cancelou). "cada item é caro" (custa
 *              requisição, disco, dinheiro de API). "quem usa não precisa saber de onde vem"
 *              (esconder paginação, cache ou duas fontes atrás de um for..of comum).
 * QUANDO NÃO USAR: "já tenho o array inteiro na mão" — use map/filter. "é um item só, não uma
 *                  sequência" — buscar usuário por id não é gerador. "preciso passar duas
 *                  vezes" — gerador é de uso único. "preciso de length, sort ou o último" —
 *                  isso exige ter tudo junto, então é array.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Gerador é torneira: só sai o que você pede ───
function apiPedidos(pagina) {
  const paginas = {
    1: [{ id: 101, status: 'pago' }, { id: 102, status: 'pago' }],
    2: [{ id: 103, status: 'cancelado' }, { id: 104, status: 'pago' }],
    3: [{ id: 105, status: 'pago' }, { id: 106, status: 'pago' }],
  };
  console.log(`  (a API cobrou uma requisição: página ${pagina})`);
  return { itens: paginas[pagina] ?? [], temMais: pagina < 3 };
}

function* todosOsPedidos() {
  let pagina = 1;
  while (true) {
    const { itens, temMais } = apiPedidos(pagina);
    for (const pedido of itens) yield pedido;   // pausa aqui, entrega um pedido
    if (!temMais) return;
    pagina++;
  }
}

for (const pedido of todosOsPedidos()) {
  console.log('processando', pedido.id, pedido.status);
  if (pedido.status === 'cancelado') break;     // a página 3 nunca é buscada
}

// ─── 2) Array pronto é balde: enche tudo antes de você olhar o primeiro ───
function buscarPagina(pagina) {
  const paginas = {
    1: [{ id: 101, status: 'pago' }, { id: 102, status: 'pago' }],
    2: [{ id: 103, status: 'cancelado' }, { id: 104, status: 'pago' }],
    3: [{ id: 105, status: 'pago' }, { id: 106, status: 'pago' }],
  };
  console.log(`  (a API cobrou uma requisição: página ${pagina})`);
  return { itens: paginas[pagina] ?? [], temMais: pagina < 3 };
}

const todos = [];
let pag = 1;
let temMais = true;

while (temMais) {
  const resp = buscarPagina(pag++);
  todos.push(...resp.itens);
  temMais = resp.temMais;
}

console.log('cancelado:', todos.find((p) => p.status === 'cancelado').id);
console.log('mas paguei 3 requisições para achar algo que estava na 2ª.');
// Com 500 páginas isso vira espera longa + memória cheia, mesmo achando no começo.

// ─── 3) Callback: quem manda é a função, não você ───
function cadaPedido(callback) {
  const paginas = [
    [{ id: 201, status: 'pago' }, { id: 202, status: 'pago' }],
    [{ id: 203, status: 'cancelado' }, { id: 204, status: 'pago' }],
  ];
  for (const pagina of paginas) for (const pedido of pagina) callback(pedido);
}

let cancelado = null;

cadaPedido((pedido) => {
  if (cancelado) return;              // gambiarra: `break` não existe aqui dentro
  console.log('processando', pedido.id);
  if (pedido.status === 'cancelado') cancelado = pedido;
});

console.log('achei', cancelado.id, '— mas o laço rodou até o fim do mesmo jeito.');
// Isso é inversão de controle: sem `break`, sem `return` que interrompa, sem pausar.

// ═══ NA PRÁTICA ═══

// ─── 4) API de verdade: async function* e for await ───
async function buscarClientes(pagina) {
  const paginas = { 1: ['Ana', 'Bruno'], 2: ['Carla', 'Diego'] };
  await new Promise((r) => setTimeout(r, 50));       // a rede demora
  return { itens: paginas[pagina] ?? [], temMais: pagina < 2 };
}

async function* todosOsClientes() {
  let pagina = 1;
  while (true) {
    const { itens, temMais } = await buscarClientes(pagina);   // await dentro do gerador
    for (const nome of itens) yield nome;
    if (!temMais) return;
    pagina++;
  }
}

(async () => {
  for await (const nome of todosOsClientes()) console.log('cliente:', nome);
})();
// Quem consome escreve um `for await` comum e nem fica sabendo que existe paginação.

// ─── 5) Sem gerador, o estado fica por sua conta ───
class PaginadorNotas {
  constructor(paginas) { this.paginas = paginas; this.p = 0; this.i = 0; }
  proximo() {
    if (this.p >= this.paginas.length) return { done: true };
    const nota = this.paginas[this.p][this.i++];
    if (this.i >= this.paginas[this.p].length) { this.i = 0; this.p++; }
    return { value: nota, done: false };
  }
}

const it = new PaginadorNotas([['NF-1', 'NF-2'], ['NF-3']]);
let r;

while (!(r = it.proximo()).done) console.log('classe:', r.value);

function* paginadorNotas(paginas) {
  for (const pagina of paginas) for (const nota of pagina) yield nota;
}

for (const nota of paginadorNotas([['NF-1', 'NF-2'], ['NF-3']])) console.log('gerador:', nota);
// Mesmo resultado: a classe guarda `p` e `i` na mão, o gerador guarda sozinho —
// ele fica literalmente parado na linha do `yield` e retoma dali.

// ─── 6) Esconder de onde vêm os dados ───
function* estoqueTotal() {
  const loja = [{ nome: 'camiseta', qtd: 3 }, { nome: 'boné', qtd: 0 }];
  const deposito = [{ nome: 'tênis', qtd: 7 }];
  for (const item of loja) yield { ...item, origem: 'loja' };
  for (const item of deposito) yield { ...item, origem: 'depósito' };
}

for (const item of estoqueTotal()) console.log(item.origem, '→', item.nome, item.qtd);
// Duas fontes viram uma sequência só. Amanhã entra uma terceira e quem consome nem muda.

// ═══ PEGADINHAS ═══

// ─── 7) Se você precisa de length, sort ou segunda volta, é array ───
function* vendasDoDia() {
  yield { produto: 'camiseta', valor: 80 };
  yield { produto: 'tênis', valor: 250 };
  yield { produto: 'boné', valor: 40 };
}

console.log('length do gerador:', vendasDoDia().length);   // undefined: gerador não tem tamanho

const vendas = [...vendasDoDia()];                          // materializou: agora é array

console.log('quantidade:', vendas.length);
console.log('mais cara:', [...vendas].sort((a, b) => b.valor - a.valor)[0].produto);
// Ordenar e contar exigem ter tudo junto. Aí o gerador não ajuda — atrapalha.

// ─── 8) Chamar a função geradora não executa nada ───
function* cobrancaMensal() {
  console.log('  (só agora o corpo começou a rodar)');
  let mes = 1;
  while (true) yield `mensalidade ${mes++}/12`;
}

const cobranca = cobrancaMensal();

console.log('criei o gerador — repare que nada foi impresso acima');
console.log(cobranca.next().value);
console.log(cobranca.next().value);
// O corpo só roda no primeiro `next()`. É isso que deixa `while (true)` seguro.

// ─── Resumo ───
// 1. Gerador é torneira, array é balde: o balde enche tudo antes, a torneira dá um copo por vez.
// 2. A pergunta que decide: quem dita o ritmo, quem produz ou quem consome? Consumidor → gerador.
// 3. Sinais de gerador: chega aos poucos, não tem fim, cada item é caro, talvez eu pare no meio.
// 4. Vale só para esconder complexidade: paginação, cache, duas fontes — tudo vira um for..of.
// 5. Sinais de array: já tenho tudo na mão, é um item só, preciso de length/sort/segunda volta.
// 6. Callback percorre tudo e não deixa você parar; classe iteradora faz o mesmo com estado na mão.
