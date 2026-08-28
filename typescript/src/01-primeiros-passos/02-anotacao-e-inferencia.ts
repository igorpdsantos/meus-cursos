/**
 * Anotação e inferência
 * Sessão 1 · Rodar: node src/01-primeiros-passos/02-anotacao-e-inferencia.ts
 *
 * O QUE É: as duas formas de um valor ganhar tipo — você escreve (`: number`) ou o
 *          TypeScript deduz sozinho pelo que foi atribuído.
 * QUANDO USAR: anote parâmetro de função, retorno de API pública e variável que nasce
 *              vazia. É onde a dedução não tem de onde tirar a resposta.
 * QUANDO NÃO USAR: em cima de um valor literal. `const preco: number = 19.9` é ruído: o
 *                  TypeScript já sabia, e agora existem dois lugares para manter.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O que a inferência já resolve sozinha ───
const quantidade = 3;                            // number
const descricao = 'Caderno A5';                  // string
const emPromocao = false;                        // boolean
const tags = ['papelaria', 'escritório'];        // string[]
const medidas = { altura: 21, largura: 15 };     // { altura: number; largura: number }

console.log(`${quantidade}x ${descricao} — ${medidas.altura}x${medidas.largura}cm`);
console.log('tags:', tags.map((t) => t.toUpperCase()).join(' · '));
console.log('promoção:', emPromocao ? 'sim' : 'não');

// Nenhuma linha acima tem anotação, e todas estão tipadas. Esta não passa:
// @ts-expect-error — Type 'string' is not assignable to type 'number'.
console.log(medidas.altura + ' cm', (medidas.largura = 'quinze'));

// ─── 2) Onde a inferência não alcança: parâmetro ───
// Um parâmetro não tem valor até alguém chamar. Sem anotação, ele viraria `any` — e `any`
// desliga a conferência exatamente no lugar por onde o dado errado entra.
function calcularFrete(pesoEmKg: number, distanciaEmKm: number): number {
  return 8 + pesoEmKg * 0.9 + distanciaEmKm * 0.15;
}

console.log('frete 2kg / 40km:', calcularFrete(2, 40).toFixed(2));

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
console.log('frete "2kg"    :', calcularFrete('2', 40).toFixed(2), '← passou: o node só apaga o tipo');

console.log('\nO retorno, esse sim, o TypeScript deduz: `8 + number + number` só pode dar');
console.log('number. Anotar o retorno é opcional — mas ele documenta e trava a intenção.');

// ─── 3) `let` alarga, `const` estreita ───
const formaDePagamento = 'pix';                  // tipo: 'pix' — o literal, não string
let formaEscolhida = 'pix';                      // tipo: string — porque let pode mudar

console.log('const:', formaDePagamento, '· let:', formaEscolhida);

formaEscolhida = 'boleto';                       // permitido: qualquer string serve
console.log('depois de mudar:', formaEscolhida);

const taxas = { pix: 0, boleto: 2.5, cartao: 4.9 };
console.log('taxa do pix   :', taxas[formaDePagamento].toFixed(2), '← o const sabe QUAL chave é');

// @ts-expect-error — Type 'string' can't be used to index type '{ pix: number; ... }'.
console.log('taxa do let   :', taxas[formaEscolhida]);

console.log('\nÉ a diferença mais útil e menos óbvia do TypeScript: `const` guarda o valor');
console.log('exato no tipo, e é isso que faz união de literais funcionar no tema 03.');

// ═══ NA PRÁTICA ═══

// ─── 4) A variável que nasce vazia ───
// Aqui a inferência não tem de onde tirar nada: `[]` é `never[]` e `null` é `null`.
const historicoDeVendas: number[] = [];
let clienteAtual: string | null = null;

historicoDeVendas.push(120.5, 89.9, 240);
clienteAtual = 'Ana Souza';

const totalVendido = historicoDeVendas.reduce((soma, v) => soma + v, 0);
console.log(`${clienteAtual}: ${historicoDeVendas.length} vendas, R$ ${totalVendido.toFixed(2)}`);

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
historicoDeVendas.push('120,50');

console.log('\nRegra prática: se o valor inicial não conta a história toda, anote. Foi para');
console.log('isso que a anotação existe — não para repetir o que já está escrito ao lado.');

// ─── 5) Anotar demais atrapalha ───
type Cliente = { nome: string; cidade: string };

// Ruim: o tipo está escrito duas vezes e as duas precisam ser mantidas.
const clienteVerboso: { nome: string; cidade: string } = { nome: 'Bruno', cidade: 'Recife' };

// Bom: o tipo tem nome, e o objeto é conferido contra ele.
const clienteBom: Cliente = { nome: 'Bruno', cidade: 'Recife' };

// Melhor ainda quando não há contrato a cumprir: deixa deduzir.
const clienteSolto = { nome: 'Bruno', cidade: 'Recife' };

console.log(clienteVerboso.cidade, clienteBom.cidade, clienteSolto.cidade);

// A anotação não é decoração: é ela que faz o excesso ser recusado.
// @ts-expect-error — Object literal may only specify known properties.
const clienteErrado: Cliente = { nome: 'Bruno', cidade: 'Recife', telefone: '81 9999' };
console.log('mesmo recusado, o objeto existe rodando:', Object.keys(clienteErrado).length, 'chaves');

// ═══ PEGADINHAS ═══

// ─── 6) `any` não é "não sei": é "não confira" ───
const respostaSolta: any = { nome: 'Ana', pedidos: 3 };

console.log(respostaSolta.nome);
console.log(respostaSolta.pedidoss);        // erro de digitação: o tsc não pia
console.log('somando texto:', respostaSolta.nome * 2);

console.log('\nNenhuma das três linhas acima é acusada. `any` desliga o TypeScript naquele');
console.log('valor E em tudo que sai dele — o erro volta a ser descoberto rodando.');
console.log('Quando o tipo é mesmo desconhecido, o certo é `unknown` (tema 02).');

// ─── Resumo ───
// 1. A maior parte do tipo vem de graça: escreveu o valor, o TypeScript deduziu.
// 2. Anote onde não há valor de onde deduzir: parâmetro, lista vazia, variável que nasce nula.
// 3. Anotar o retorno é opcional, mas trava a intenção da função.
// 4. `const x = 'pix'` guarda o literal; `let` alarga para `string`.
// 5. Anotação em cima de literal é repetição — mas é ela que recusa a chave a mais.
// 6. `any` não descreve: desliga. Prefira `unknown` e confira antes de usar.
