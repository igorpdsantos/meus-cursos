/**
 * Parâmetros e retorno
 * Sessão 4 · Rodar: node src/04-funcoes/01-parametros-e-retorno.ts
 *
 * O QUE É: o contrato de uma função escrito por inteiro — o que entra, o que é opcional,
 *          o que tem padrão e o que sai.
 * QUANDO USAR: sempre nos parâmetros; no retorno, quando ele for parte do contrato
 *              público ou quando a inferência sair mais larga do que você quer.
 * QUANDO NÃO USAR: não anote o retorno de callback curto (`(n) => n * 2`). Ali a
 *                  inferência acerta e a anotação só ocupa espaço.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Obrigatório, opcional e com padrão ───
function montarEtiqueta(
  produto: string,                       // obrigatório
  preco: number,                         // obrigatório
  moeda: string = 'R$',                  // tem padrão: quem chama pode omitir
  observacao?: string,                   // opcional: pode faltar, e aí é undefined
): string {
  const base = `${produto.padEnd(12)} ${moeda} ${preco.toFixed(2)}`;
  return observacao ? `${base} (${observacao})` : base;
}

console.log(montarEtiqueta('Caneca', 19.9));
console.log(montarEtiqueta('Caderno', 32.5, 'US$'));
console.log(montarEtiqueta('Caneta', 4.2, 'R$', 'última unidade'));

try {
  // @ts-expect-error — Expected 2-4 arguments, but got 1.
  console.log(montarEtiqueta('Caneca'));
} catch (erro) {
  console.log('sem o preço:', (erro as Error).message);
}

console.log('\nOpcional e com padrão vêm depois dos obrigatórios — senão não haveria como');
console.log('omitir. E `observacao` dentro da função é `string | undefined`, não `string`.');

// ─── 2) O retorno: deduzido ou declarado ───
// Sem anotar, o TypeScript deduz. Aqui ele deduz `number`.
function calcularSubtotal(preco: number, quantidade: number) {
  return preco * quantidade;
}

// Anotando, você trava a intenção — e o erro aparece DENTRO da função, não em quem chama.
function calcularTotal(subtotal: number, frete: number): number {
  return subtotal + frete;
}

console.log('subtotal:', calcularSubtotal(19.9, 3).toFixed(2));
console.log('total   :', calcularTotal(calcularSubtotal(19.9, 3), 12).toFixed(2));

// @ts-expect-error — Type 'string' is not assignable to type 'number'.
function calcularErrado(a: number, b: number): number { return `${a + b}`; }
console.log('devolveu texto:', typeof calcularErrado(1, 2));

console.log('\nEssa é a vantagem de anotar o retorno: o erro é acusado na linha do `return`.');
console.log('Sem a anotação, a função "funcionaria" e o problema apareceria três chamadas adiante.');

// ─── 3) Resto de parâmetros: quantos vierem ───
function somarLancamentos(descricao: string, ...valores: number[]): string {
  const total = valores.reduce((soma, v) => soma + v, 0);
  return `${descricao.padEnd(12)} ${valores.length} lançamentos · R$ ${total.toFixed(2)}`;
}

console.log(somarLancamentos('Janeiro', 1200, 890, 430));
console.log(somarLancamentos('Fevereiro', 980));
console.log(somarLancamentos('Março'));

try {
  // @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
  console.log(somarLancamentos('Abril', 100, '200'));
} catch (erro) {
  console.log('com texto no meio:', (erro as Error).message, '← 100 + "200" virou "100200"');
}

// Espalhar uma lista existente funciona igual — e o tipo acompanha.
const doBanco: number[] = [310, 275, 96];
console.log(somarLancamentos('Maio', ...doBanco));

// ═══ NA PRÁTICA ═══

// ─── 4) Objeto de opções, quando os parâmetros passam de três ───
// Quatro parâmetros soltos viram `buscar('ana', true, false, 20)` — ilegível na chamada.
type OpcoesDeBusca = {
  termo: string;
  somenteAtivos?: boolean;
  incluirArquivados?: boolean;
  limite?: number;
};

function buscarClientes({ termo, somenteAtivos = true, incluirArquivados = false, limite = 10 }: OpcoesDeBusca): string {
  return `"${termo}" · ativos=${somenteAtivos} · arquivados=${incluirArquivados} · limite=${limite}`;
}

console.log(buscarClientes({ termo: 'ana' }));
console.log(buscarClientes({ termo: 'bruno', limite: 50, incluirArquivados: true }));

// @ts-expect-error — Object literal may only specify known properties. Did you mean 'limite'?
console.log(buscarClientes({ termo: 'carla', limit: 5 }));

console.log('\nO padrão fica no desmembramento, o tipo fica no `type`. Quem chama enxerga o');
console.log('nome de cada opção, e acrescentar a quinta não quebra ninguém.');

// ─── 5) Função como parâmetro ───
type Transformacao = (valor: number) => number;

function aplicarNaFolha(salarios: number[], transformar: Transformacao): number[] {
  return salarios.map(transformar);
}

const salarios = [3200, 5400, 2100];
const reajuste = (valor: number) => Math.round(valor * 1.08);
const bonus: Transformacao = (valor) => valor + 500;   // parâmetro não precisa de anotação aqui

console.log('original :', salarios.join(' · '));
console.log('reajuste :', aplicarNaFolha(salarios, reajuste).join(' · '));
console.log('bônus    :', aplicarNaFolha(salarios, bonus).join(' · '));

// @ts-expect-error — Type 'string' is not assignable to type 'number'.
console.log(aplicarNaFolha(salarios, (valor) => `R$ ${valor}`));

console.log('\nRepare no `bonus`: o tipo está na variável, então o `valor` já vem tipado.');
console.log('Isso se chama tipagem contextual, e é por isso que callback quase nunca precisa');
console.log('de anotação.');

// ═══ PEGADINHAS ═══

// ─── 6) Parâmetro opcional não é o mesmo que aceitar `undefined` ───
function comOpcional(nome: string, apelido?: string): string { return apelido ?? nome; }
function comUniao(nome: string, apelido: string | undefined): string { return apelido ?? nome; }

console.log('opcional, omitindo :', comOpcional('Ana Souza'));
console.log('união, com undefined:', comUniao('Ana Souza', undefined));

// @ts-expect-error — Expected 2 arguments, but got 1.
console.log(comUniao('Bruno Lima'));

console.log('\n`apelido?` deixa OMITIR o argumento; `string | undefined` obriga a passá-lo,');
console.log('mesmo que seja `undefined`. A segunda forma é chata — e é justamente por isso');
console.log('que ela serve: obriga quem chama a decidir, em vez de esquecer.');

// ─── Resumo ───
// 1. Parâmetro obrigatório primeiro; opcional (`?`) e com padrão (`= x`) depois.
// 2. Dentro da função, `x?: T` vale `T | undefined` — trate antes de usar.
// 3. Anotar o retorno faz o erro aparecer no `return`, e não lá na frente.
// 4. `...resto: T[]` aceita quantos vierem, e `...array` na chamada casa com ele.
// 5. Passou de três parâmetros, troque por um objeto de opções com padrões no desmembramento.
// 6. Callback quase nunca precisa de anotação: o tipo vem do contexto.
