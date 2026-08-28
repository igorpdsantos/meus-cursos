/**
 * Por que TypeScript
 * Sessão 1 · Rodar: node src/01-primeiros-passos/01-por-que-typescript.ts
 *
 * O QUE É: JavaScript com uma camada de tipos por cima. Você escreve o contrato ("isto aqui
 *          é um número"), o compilador confere, e na hora de rodar a camada some.
 * QUANDO USAR: em qualquer código que outra pessoa vá mexer, ou que você vá mexer daqui a
 *              três meses — que é a mesma coisa.
 * QUANDO NÃO USAR: num script de dez linhas que roda uma vez. O tipo cobra um preço em
 *                  escrita, e nesse tamanho ele não devolve.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O erro que o JavaScript só conta depois ───
// Em JavaScript isto não estoura: soma texto com número e devolve texto.
const somaSolta = (a: any, b: any) => a + b;
console.log('preço + frete:', somaSolta('10', 5), '← "105", não 15');

// Com o tipo escrito, o erro para de ser uma surpresa do carrinho e vira um aviso do editor.
const somar = (a: number, b: number) => a + b;
console.log('preço + frete:', somar(10, 5));

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
console.log('com texto   :', somar('10', 5), '← o tsc recusa; o node, que só apaga tipos, deixa passar');

// ─── 2) Você já escreve tipos, mesmo sem anotar nada ───
const precoUnitario = 19.9;                      // TypeScript infere: number
const nomeProduto = 'Caneca';                    // infere: string
const itensDoCarrinho = ['Caneca', 'Caderno'];   // infere: string[]

console.log(`${nomeProduto}: R$ ${precoUnitario.toFixed(2)}`);
console.log('itens:', itensDoCarrinho.join(', '));

try {
  // @ts-expect-error — Property 'toFixed' does not exist on type 'string'.
  console.log(nomeProduto.toFixed(2));
} catch (erro) {
  console.log('nomeProduto.toFixed:', (erro as Error).message);
}

console.log('\nRepare no atraso: o tsc acusa essa linha antes de você salvar; o JavaScript');
console.log('só descobre quando o programa chega nela — em produção, na terça-feira.');
console.log('\nAnotar é para quando a inferência não alcança: parâmetro de função, dado que');
console.log('chega de fora, variável que nasce vazia. No resto, deixe o TypeScript deduzir.');

// ─── 3) O tipo some na hora de rodar ───
interface Entrega {
  cidade: string;
  prazoEmDias: number;
}

const entrega: Entrega = { cidade: 'Belo Horizonte', prazoEmDias: 3 };
console.log(`${entrega.cidade}: ${entrega.prazoEmDias} dias`);

// `interface` não existe depois de compilado — não dá para perguntar por ela em tempo de execução.
console.log('typeof entrega  :', typeof entrega, '← "object", como qualquer objeto JavaScript');
console.log('sobrou algo?    :', Object.keys(entrega).join(', '), '← só os dados');

console.log('\nO JavaScript gerado deste bloco é o mesmo que você escreveria sem TypeScript.');
console.log('Tipo é conversa entre você e o compilador; o navegador nunca fica sabendo.');

// ═══ NA PRÁTICA ═══

// ─── 4) Duas ferramentas, dois trabalhos ───
const ferramentas = [
  ['node arquivo.ts', 'APAGA os tipos e roda', 'não confere nada'],
  ['npx tsc --noEmit', 'CONFERE os tipos', 'não roda nada'],
  ['editor (VS Code)', 'confere enquanto você digita', 'é o mesmo tsc, ao vivo'],
];

const largura = [20, 32, 26];
const linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');
console.log(linha(['COMANDO', 'O QUE FAZ', 'O QUE NÃO FAZ']));
console.log(linha(['─'.repeat(18), '─'.repeat(30), '─'.repeat(24)]));
for (const f of ferramentas) console.log(linha(f));

console.log('\nÉ por isso que este arquivo roda com um erro de tipo dentro dele e não reclama:');
console.log('quem reclama é o `npm run check`, e é ele que você roda antes de subir código.');

// ─── 5) O contrato aparece na chamada, não na leitura ───
type ItemDoPedido = { descricao: string; quantidade: number; precoUnitario: number };

function totalDoPedido(itens: ItemDoPedido[]): number {
  return itens.reduce((soma, item) => soma + item.quantidade * item.precoUnitario, 0);
}

console.log('total:', totalDoPedido([
  { descricao: 'Caneca', quantidade: 2, precoUnitario: 19.9 },
  { descricao: 'Caderno', quantidade: 1, precoUnitario: 32.5 },
]).toFixed(2));

// @ts-expect-error — Property 'quantidade' is missing in type '{ descricao: string; precoUnitario: number; }'.
totalDoPedido([{ descricao: 'Caneca', precoUnitario: 19.9 }]);

console.log('\nEm JavaScript, esse item faltando vira NaN e alguém descobre no relatório do mês.');
console.log('O tipo não deixa a chamada errada nem ser escrita.');

// ═══ PEGADINHAS ═══

// ─── 6) Tipo não confere nada em tempo de execução ───
type Usuario = { nome: string; idade: number };

// Isto é o que chega de uma API: JSON, texto puro. O tipo é uma promessa, não uma checagem.
const respostaDaApi = JSON.parse('{"nome":"Ana","idade":"trinta"}') as Usuario;

console.log('o tipo diz  : idade é number');
console.log('a realidade :', typeof respostaDaApi.idade, JSON.stringify(respostaDaApi.idade));
console.log('idade + 1   :', respostaDaApi.idade + 1, '← "trinta1"');

console.log('\n`as` é você jurando para o compilador. Ele acredita e para de perguntar.');
console.log('Dado que vem de fora (fetch, JSON.parse, formulário) precisa ser CONFERIDO');
console.log('rodando — com `typeof`, com um type guard ou com uma biblioteca como o zod.');

// ─── Resumo ───
// 1. TypeScript é JavaScript mais um contrato: o compilador confere, o runtime nem vê.
// 2. `node arquivo.ts` apaga os tipos e roda; quem acusa erro é `tsc` (e o editor).
// 3. Boa parte dos tipos já vem da inferência — anote onde ela não alcança.
// 4. O ganho aparece na CHAMADA: o argumento errado não chega a ser escrito.
// 5. Nada disso vale para dado que vem de fora: ali o tipo é promessa, e promessa se confere.
