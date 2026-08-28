/**
 * Type guards
 * Sessão 5 · Rodar: node src/05-estreitar-tipos/01-type-guards.ts
 *
 * O QUE É: uma conferência feita rodando que o TypeScript entende e usa para estreitar o
 *          tipo — depois do `if`, o valor deixa de ser "um dos três" e passa a ser um só.
 * QUANDO USAR: sempre que um valor for união, `unknown`, ou puder ser null/undefined.
 *              É o caminho normal de sair de um tipo largo para o certo.
 * QUANDO NÃO USAR: no lugar de `as`. `as` finge; o type guard confere. Quando o dado vem
 *                  de fora, só o type guard vale alguma coisa.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `typeof`: o guard dos primitivos ───
function formatarValor(valor: string | number | boolean): string {
  if (typeof valor === 'number') return `R$ ${valor.toFixed(2)}`;   // aqui é number
  if (typeof valor === 'boolean') return valor ? 'sim' : 'não';     // aqui é boolean
  return valor.trim().toUpperCase();                                // sobrou string
}

console.log(formatarValor(19.9));
console.log(formatarValor(true));
console.log(formatarValor('  pix  '));

// O TypeScript acompanha a eliminação: na última linha, `boolean` e `number` já saíram.
// @ts-expect-error — Property 'toFixed' does not exist on type 'string | number | boolean'.
console.log((19.9 as string | number | boolean).toFixed(2));

// ─── 2) `in`: existe esta chave no objeto? ───
type PagamentoPix = { valor: number; chavePix: string };
type PagamentoCartao = { valor: number; bandeira: string; parcelas: number };

function descreverPagamento(pagamento: PagamentoPix | PagamentoCartao): string {
  if ('chavePix' in pagamento) return `pix para ${pagamento.chavePix}`;
  return `${pagamento.bandeira} em ${pagamento.parcelas}x`;
}

console.log(descreverPagamento({ valor: 200, chavePix: 'ana@loja.dev' }));
console.log(descreverPagamento({ valor: 200, bandeira: 'Visa', parcelas: 3 }));

// @ts-expect-error — Property 'bandeira' does not exist on type 'PagamentoPix | PagamentoCartao'.
console.log(({ valor: 200, chavePix: 'x' } as PagamentoPix | PagamentoCartao).bandeira);

console.log('\n`in` serve para união de objetos sem campo em comum que os separe. Quando dá');
console.log('para acrescentar um campo `tipo`, a união discriminada lê melhor (tema 03).');

// ─── 3) `instanceof` e a conferência de null ───
function quandoAconteceu(quando: Date | string | null): string {
  if (quando === null) return 'nunca';                    // tira o null
  if (quando instanceof Date) return quando.toISOString().slice(0, 10);
  return quando.padStart(10, '0');                        // sobrou string
}

console.log(quandoAconteceu(new Date('2026-08-28T12:00:00Z')));
console.log(quandoAconteceu('28/08'));
console.log(quandoAconteceu(null));

// A conferência de "existe" também é guard — e cobre null E undefined de uma vez.
function primeiroNome(nomeCompleto: string | null | undefined): string {
  if (!nomeCompleto) return 'sem nome';
  return nomeCompleto.split(' ')[0];
}

console.log(primeiroNome('Ana Souza'), '·', primeiroNome(null), '·', primeiroNome(undefined));

console.log('\nCuidado com `if (!valor)`: ele também derruba `0` e `""`. Para número e texto,');
console.log('escreva `valor !== undefined` ou `valor != null`, que pega os dois vazios.');

// ═══ NA PRÁTICA ═══

// ─── 4) Guard escrito por você: `valor is Tipo` ───
type Aluno = { nome: string; matricula: string };

// A assinatura `x is Aluno` é o que faz o TypeScript acreditar no resultado do `if`.
function ehAluno(valor: unknown): valor is Aluno {
  return (
    typeof valor === 'object' && valor !== null &&
    typeof (valor as Aluno).nome === 'string' &&
    typeof (valor as Aluno).matricula === 'string'
  );
}

const vindosDaApi: unknown[] = [
  { nome: 'Ana', matricula: 'A-1042' },
  { nome: 'Bruno' },
  'texto solto',
  null,
];

for (const item of vindosDaApi) {
  // Sem o guard, `item.nome` nem compilaria: `item` é unknown.
  if (ehAluno(item)) console.log('✓', item.matricula, item.nome);
  else console.log('✕ ignorado:', JSON.stringify(item));
}

console.log('\nEste é o padrão para tudo que chega de fetch, JSON.parse ou formulário: uma');
console.log('função que CONFERE rodando e devolve `x is T`. É o `as` feito direito.');

// ─── 5) Guard num filter, que é onde ele mais rende ───
type Contato = { nome: string; email: string | null };

const contatos: Contato[] = [
  { nome: 'Ana', email: 'ana@loja.dev' },
  { nome: 'Bruno', email: null },
  { nome: 'Carla', email: 'carla@loja.dev' },
];

const emails = contatos.map((c) => c.email);                       // (string | null)[]
// @ts-expect-error — 'emails[0]' is possibly 'null'.
console.log(emails[0].toUpperCase());

// Um filter comum não estreita o tipo: o TypeScript não sabe o que o callback conferiu.
const filtradoComum = emails.filter((e) => e !== null);            // string[] desde o TS 5.5
console.log('filtrado:', filtradoComum.join(', '));

// Em versão antiga (ou em caso mais complicado), o guard resolve explicitamente:
const naoEhNulo = (valor: string | null): valor is string => valor !== null;
console.log('com guard:', emails.filter(naoEhNulo).map((e) => e.toUpperCase()).join(', '));

console.log('\nDesde o TypeScript 5.5 o `filter` simples já estreita sozinho em muitos casos.');
console.log('O guard nomeado continua valendo para o que ele não alcança — e para reaproveitar.');

// ═══ PEGADINHAS ═══

// ─── 6) O guard mente, e o TypeScript acredita ───
type Produto = { sku: string; preco: number };

// Este guard só confere `sku`. Ele PROMETE Produto e entrega qualquer coisa com sku.
function ehProdutoMalFeito(valor: unknown): valor is Produto {
  return typeof valor === 'object' && valor !== null && 'sku' in valor;
}

const suspeito: unknown = { sku: 'CAN-01' };            // sem preço

if (ehProdutoMalFeito(suspeito)) {
  console.log('o tsc garante: preco é number');
  console.log('a realidade  :', suspeito.preco);
  try {
    console.log(suspeito.preco.toFixed(2));
  } catch (erro) {
    console.log('e estourou   :', (erro as Error).message);
  }
}

console.log('\n`x is T` não é conferido pelo compilador: é uma promessa sua, igual ao `as`.');
console.log('A diferença é que o guard tem um lugar óbvio para conferir de verdade — use-o.');

// ─── 7) `typeof null` é "object" ───
function contarChaves(valor: object | null): number {
  // Sem a conferência de null, esta linha estouraria: `typeof null === "object"`.
  if (valor === null) return 0;
  return Object.keys(valor).length;
}

console.log('objeto:', contarChaves({ a: 1, b: 2 }));
console.log('null  :', contarChaves(null));
console.log('typeof null é:', typeof null, '← o bug mais antigo do JavaScript, ainda aqui');

console.log('\nPor isso todo guard de objeto tem duas partes: `typeof x === "object"` E');
console.log('`x !== null`. Esquecer a segunda é o erro mais comum ao escrever guard na mão.');

// ─── Resumo ───
// 1. `typeof` para primitivo, `instanceof` para classe, `in` para chave de objeto.
// 2. Depois do `if`, o tipo estreita — e o `else` fica com o que sobrou.
// 3. `if (!valor)` também derruba 0 e ''; prefira `valor != null` quando for isso que você quer.
// 4. `função(x): x is T` é o guard escrito por você — o jeito certo de validar dado de fora.
// 5. Guard nomeado é o que faz `filter` devolver a lista já estreitada.
// 6. `x is T` é promessa, não prova: se o guard mentir, o erro volta a ser de execução.
