/**
 * Primitivos e array
 * Sessão 2 · Rodar: node src/02-tipos-basicos/01-primitivos-e-array.ts
 *
 * O QUE É: os tipos que já existiam no JavaScript, agora com nome que o compilador
 *          entende: `string`, `number`, `boolean`, e a lista de qualquer um deles.
 * QUANDO USAR: em todo lugar. São o vocabulário básico de qualquer anotação.
 * QUANDO NÃO USAR: com inicial maiúscula. `String`, `Number` e `Boolean` são os objetos
 *                  embrulhados do JavaScript, quase nunca o que você quer.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Os três primitivos do dia a dia ───
const nomeDoCliente: string = 'Ana Souza';
const totalDaCompra: number = 249.9;
const pagamentoConfirmado: boolean = true;

console.log(`${nomeDoCliente}: R$ ${totalDaCompra.toFixed(2)}`);
console.log('pago:', pagamentoConfirmado ? 'sim' : 'não');

// `number` cobre inteiro, decimal, negativo e até NaN — no JavaScript é tudo o mesmo tipo.
const parcelas: number = 3;
const valorDaParcela: number = totalDaCompra / parcelas;
console.log(`${parcelas}x de R$ ${valorDaParcela.toFixed(2)}`);

// @ts-expect-error — Type 'number' is not assignable to type 'string'.
const cepErrado: string = 30110012;
console.log('cep, apesar do tsc:', cepErrado, typeof cepErrado);

// ─── 2) Array: duas formas de escrever a mesma coisa ───
const produtos: string[] = ['Caneca', 'Caderno', 'Caneta'];
const precos: Array<number> = [19.9, 32.5, 4.2];

console.log('produtos:', produtos.join(', '));
console.log('mais caro:', Math.max(...precos).toFixed(2));

// A vantagem aparece nos métodos: o TypeScript sabe o que sai de cada um.
const emCaixaAlta = produtos.map((p) => p.toUpperCase());     // string[]
const somaDosPrecos = precos.reduce((a, b) => a + b, 0);      // number
console.log(emCaixaAlta.join(' · '), '|', somaDosPrecos.toFixed(2));

// @ts-expect-error — Argument of type 'number' is not assignable to parameter of type 'string'.
produtos.push(42);
console.log('mas o 42 entrou:', produtos.length, 'itens ← o tipo não vigia a execução');

// ─── 3) O tipo acompanha o que sai da lista ───
const notas: number[] = [8.5, 7, 9.2, 6.4];

const media = notas.reduce((soma, n) => soma + n, 0) / notas.length;
const aprovadas = notas.filter((n) => n >= 7);
const formatadas = notas.map((n) => n.toFixed(1));            // string[], não number[]

console.log('média    :', media.toFixed(2));
console.log('aprovadas:', aprovadas.length, 'de', notas.length);
console.log('formatadas:', formatadas.join(' | '));

try {
  // @ts-expect-error — Property 'toFixed' does not exist on type 'string'.
  console.log(formatadas[0].toFixed(2));
} catch (erro) {
  console.log('toFixed  :', (erro as Error).message, '← já é string, não number');
}

console.log('\n`map` trocou o tipo da lista, e o TypeScript acompanhou sem ninguém anotar.');
console.log('É a inferência trabalhando dentro da cadeia de métodos.');

// ═══ NA PRÁTICA ═══

// ─── 4) Lista de objetos, que é o caso real ───
const vendas: { vendedor: string; valor: number }[] = [
  { vendedor: 'Ana', valor: 1200 },
  { vendedor: 'Bruno', valor: 890 },
  { vendedor: 'Ana', valor: 430 },
];

const porVendedor = new Map<string, number>();
for (const venda of vendas) porVendedor.set(venda.vendedor, (porVendedor.get(venda.vendedor) ?? 0) + venda.valor);

for (const [vendedor, total] of porVendedor) console.log(`${vendedor.padEnd(6)} R$ ${total.toFixed(2)}`);

// @ts-expect-error — Property 'valorr' does not exist. Did you mean 'valor'?
console.log(vendas[0].valorr);

console.log('\nO erro de digitação em `valorr` é o que o TypeScript mais pega no dia a dia.');
console.log('Em JavaScript ele seria `undefined`, e o relatório sairia com NaN no total.');

// ─── 5) `readonly`: lista que ninguém mexe ───
const diasUteis: readonly string[] = ['seg', 'ter', 'qua', 'qui', 'sex'];

console.log('dias:', diasUteis.join(' '));
console.log('quantos:', diasUteis.length);

// @ts-expect-error — Property 'push' does not exist on type 'readonly string[]'.
diasUteis.push('sáb');

// Ler, contar e transformar continua tudo liberado — o que some é o que ALTERA a lista.
console.log('em maiúsculas:', diasUteis.map((d) => d.toUpperCase()).join(' '));
console.log('uma cópia mutável:', [...diasUteis, 'sáb'].join(' '));

console.log('\n`readonly` só existe para o compilador: rodando, é um array normal. Ele serve');
console.log('para dizer "esta lista é a fonte, não o rascunho" — e o editor cobra.');

// ═══ PEGADINHAS ═══

// ─── 6) `string` e `String` não são a mesma coisa ───
const texto: string = 'pix';
const objetoTexto: String = new String('pix');       // com maiúscula: o objeto embrulhado

console.log('typeof texto      :', typeof texto);
console.log('typeof objetoTexto:', typeof objetoTexto, '← "object", não "string"');
console.log('são iguais com == :', texto == objetoTexto);
console.log('são iguais com ===:', texto === objetoTexto, '← aqui a diferença aparece');

// @ts-expect-error — Type 'String' is not assignable to type 'string'.
const aceita: string = objetoTexto;
console.log('e mesmo assim roda:', aceita.toUpperCase());

console.log('\nSempre minúsculo: string, number, boolean. As versões maiúsculas existem por');
console.log('herança do JavaScript e só causam confusão — não há motivo para escrevê-las.');

// ─── Resumo ───
// 1. `string`, `number` e `boolean` em minúsculas; as maiúsculas são outra coisa.
// 2. `number` é um tipo só: inteiro, decimal e negativo entram todos nele.
// 3. `string[]` e `Array<string>` são idênticos — escolha um estilo e mantenha.
// 4. Em cadeia de métodos o tipo acompanha sozinho: `map` de number pode devolver string[].
// 5. A pegada mais frequente do TypeScript é o nome de propriedade digitado errado.
// 6. `readonly string[]` some rodando: é um contrato de leitura, não uma trava de verdade.
