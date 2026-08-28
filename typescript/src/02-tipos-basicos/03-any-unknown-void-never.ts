/**
 * any, unknown, void e never
 * Sessão 2 · Rodar: node src/02-tipos-basicos/03-any-unknown-void-never.ts
 *
 * O QUE É: os quatro tipos que não descrevem um valor comum. `any` desliga a conferência,
 *          `unknown` a adia, `void` diz "não devolve nada" e `never` diz "não volta".
 * QUANDO USAR: `unknown` para tudo que chega de fora; `void` no retorno de função que só
 *              faz efeito; `never` para provar que um caso foi esquecido.
 * QUANDO NÃO USAR: `any`. Ele é a saída de emergência, e quase sempre existe alternativa.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `any` desliga tudo; `unknown` obriga a conferir ───
const dadoComAny: any = 'R$ 250,00';
const dadoComUnknown: unknown = 'R$ 250,00';

console.log('com any     :', dadoComAny.toUpperCase());        // passa, e podia ser qualquer coisa
console.log('com any     :', dadoComAny.metodoQueNaoExiste);   // o tsc também não pia aqui

// @ts-expect-error — 'dadoComUnknown' is of type 'unknown'.
console.log(dadoComUnknown.toUpperCase());

// Com `unknown`, o caminho é conferir primeiro. Aí o tipo estreita e o método libera.
if (typeof dadoComUnknown === 'string') console.log('com unknown :', dadoComUnknown.toUpperCase());

console.log('\nOs dois aceitam qualquer valor na entrada. A diferença é na SAÍDA: `any` sai');
console.log('de graça e contamina tudo à frente; `unknown` só sai depois de provar o que é.');

// ─── 2) `void`: a função existe pelo efeito, não pelo resultado ───
function registrarLog(mensagem: string): void {
  console.log(`[log] ${new Date('2026-08-28T10:00:00Z').toISOString().slice(0, 10)} ${mensagem}`);
}

registrarLog('pedido 1042 confirmado');
registrarLog('estoque atualizado');

// O que ela devolve é `undefined`, e o tipo `void` diz "não conte com isso".
const retorno = registrarLog('nada aqui');
console.log('typeof do retorno:', typeof retorno);

try {
  // @ts-expect-error — Property 'length' does not exist on type 'void'.
  console.log(retorno.length);
} catch (erro) {
  console.log('retorno.length   :', (erro as Error).message);
}

console.log('\n`void` não é `undefined`: é "não olhe para o retorno". A diferença aparece');
console.log('no bloco 4, onde um callback `void` pode devolver valor sem ninguém reclamar.');

// ─── 3) `never`: a função não chega a voltar ───
function falhar(motivo: string): never {
  throw new Error(motivo);
}

function buscarPreco(tabela: Record<string, number>, sku: string): number {
  const preco = tabela[sku];
  if (preco === undefined) falhar(`sku ${sku} não está na tabela`);
  return preco;
}

const tabela = { 'CAN-01': 19.9, 'CAD-02': 32.5 };
console.log('CAN-01:', buscarPreco(tabela, 'CAN-01').toFixed(2));

try {
  buscarPreco(tabela, 'XXX-99');
} catch (erro) {
  console.log('XXX-99:', (erro as Error).message);
}

console.log('\nRepare no `return preco` da última linha: o TypeScript sabe que, se passou do');
console.log('`falhar()`, o preço não era undefined. `never` é o que dá essa certeza a ele.');

// ═══ NA PRÁTICA ═══

// ─── 4) `unknown` na porta de entrada ───
// Todo dado que vem de fora nasce como `unknown` — e é isso que força a validação.
function lerTotalDoPedido(corpo: unknown): number {
  if (typeof corpo !== 'object' || corpo === null) throw new Error('corpo não é um objeto');
  if (!('total' in corpo)) throw new Error('falta o campo total');

  const total = (corpo as { total: unknown }).total;
  if (typeof total !== 'number' || Number.isNaN(total)) throw new Error('total não é um número');
  return total;
}

const casos: unknown[] = [{ total: 249.9 }, { total: '249,90' }, { valor: 10 }, null];
for (const caso of casos) {
  try {
    console.log(JSON.stringify(caso).padEnd(22), '→ R$', lerTotalDoPedido(caso).toFixed(2));
  } catch (erro) {
    console.log(JSON.stringify(caso).padEnd(22), '→ ✕', (erro as Error).message);
  }
}

console.log('\nSe o parâmetro fosse `any`, as quatro linhas passariam e três quebrariam mais');
console.log('adiante, longe daqui. `unknown` traz o erro para a porta de entrada.');

// ─── 5) `never` para não esquecer um caso ───
type FormaDePagamento = 'pix' | 'boleto' | 'cartao';

function prazoDeCompensacao(forma: FormaDePagamento): string {
  switch (forma) {
    case 'pix': return 'na hora';
    case 'boleto': return 'até 3 dias úteis';
    case 'cartao': return 'até 30 dias';
    default: {
      // Se um dia entrar 'pix-parcelado' na união e ninguém tratar aqui, esta linha para
      // de compilar: o caso que sobrou não é `never`, é o valor esquecido.
      const naoTratado: never = forma;
      throw new Error(`forma não tratada: ${naoTratado}`);
    }
  }
}

for (const forma of ['pix', 'boleto', 'cartao'] as FormaDePagamento[])
  console.log(forma.padEnd(8), prazoDeCompensacao(forma));

console.log('\nÉ o truque mais útil do `never`: transformar "esqueci um caso" em erro de');
console.log('compilação, em vez de um `undefined` silencioso em produção.');

// ═══ PEGADINHAS ═══

// ─── 6) `any` vaza para tudo que encosta nele ───
const configuracao: any = { tentativas: '3' };

const tentativas = configuracao.tentativas;          // any, não string
const dobro = tentativas * 2;                        // any, e ninguém conferiu
const lista = Array(dobro).fill('x');                // any de novo

console.log('tentativas:', tentativas, typeof tentativas);
console.log('dobro     :', dobro, '← "3" * 2 deu 6 por acaso; com "3a" daria NaN');
console.log('lista     :', lista.length, 'itens');

console.log('\nUm `any` no começo apaga a conferência de toda a cadeia à frente. Por isso a');
console.log('regra é: `unknown` na entrada, `any` só quando não houver mesmo outro jeito.');

// ─── Resumo ───
// 1. `any` desliga a conferência e contamina tudo que sai dele — evite.
// 2. `unknown` aceita qualquer valor na entrada e não deixa usar sem conferir na saída.
// 3. `void` é o retorno de quem existe pelo efeito: log, envio, gravação.
// 4. `never` é a função que não volta (lança ou trava) — e o tsc usa isso para raciocinar.
// 5. `const x: never = valor` no `default` de um switch avisa quando um caso foi esquecido.
// 6. Dado de fora entra como `unknown` e sai validado. É a porta, e ela vale a cerca inteira.
