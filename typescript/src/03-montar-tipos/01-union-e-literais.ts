/**
 * União e tipos literais
 * Sessão 3 · Rodar: node src/03-montar-tipos/01-union-e-literais.ts
 *
 * O QUE É: união (`A | B`) é "um ou outro"; tipo literal é um valor específico virando
 *          tipo — `'pix'` não é `string`, é exatamente `'pix'`.
 * QUANDO USAR: sempre que um campo só aceita alguns valores fixos: status, forma de
 *              pagamento, tamanho, papel do usuário.
 * QUANDO NÃO USAR: quando a lista de valores muda em tempo de execução (vem do banco).
 *                  Aí o tipo não tem como saber, e o certo é validar rodando.
 */

// ═══ ESSENCIAL ═══

// ─── 1) União: um valor, mais de um tipo possível ───
function formatarIdentificador(id: number | string): string {
  // Dentro do `if`, o TypeScript já sabe que é number; no `else`, que é string.
  if (typeof id === 'number') return `#${id.toFixed(0).padStart(6, '0')}`;
  return id.trim().toUpperCase();
}

console.log(formatarIdentificador(1042));
console.log(formatarIdentificador('  ped-2026-a  '));

// Fora do `if`, só vale o que EXISTE NOS DOIS lados da união.
function tamanhoDoIdentificador(id: number | string): number {
  return String(id).length;
}
console.log('tamanhos:', tamanhoDoIdentificador(1042), tamanhoDoIdentificador('ped-a'));

// @ts-expect-error — Property 'toFixed' does not exist on type 'string | number'.
console.log((1042 as number | string).toFixed(2));

// ─── 2) Literal: o valor vira o tipo ───
type FormaDePagamento = 'pix' | 'boleto' | 'cartao';

const taxas: Record<FormaDePagamento, number> = { pix: 0, boleto: 2.5, cartao: 4.9 };

function cobrar(valor: number, forma: FormaDePagamento): string {
  return `${forma.padEnd(7)} R$ ${(valor + valor * (taxas[forma] / 100)).toFixed(2)}`;
}

console.log(cobrar(200, 'pix'));
console.log(cobrar(200, 'cartao'));

// @ts-expect-error — Argument of type '"dinheiro"' is not assignable to parameter of type 'FormaDePagamento'.
console.log(cobrar(200, 'dinheiro'));

console.log('\nO editor completa as três opções sozinho, e o erro de digitação em "cartão"');
console.log('com til nunca chega a rodar. É o uso mais rentável de tipo que existe.');

// ─── 3) `as const` congela o objeto em literais ───
const configuracaoSolta = { ambiente: 'producao', tentativas: 3 };
const configuracaoFixa = { ambiente: 'producao', tentativas: 3 } as const;

console.log('solta:', configuracaoSolta.ambiente, '| fixa:', configuracaoFixa.ambiente);

configuracaoSolta.ambiente = 'homologacao';        // string aceita qualquer string
console.log('mudou :', configuracaoSolta.ambiente);

// @ts-expect-error — Cannot assign to 'ambiente' because it is a read-only property.
configuracaoFixa.ambiente = 'homologacao';

// A utilidade real: virar uma união sem escrever a lista duas vezes.
const AMBIENTES = ['local', 'homologacao', 'producao'] as const;
type Ambiente = (typeof AMBIENTES)[number];        // 'local' | 'homologacao' | 'producao'

const atual: Ambiente = 'homologacao';
console.log('ambientes:', AMBIENTES.join(' · '), '| atual:', atual);

// @ts-expect-error — Type '"testes"' is not assignable to type 'Ambiente'.
const invalido: Ambiente = 'testes';
console.log('e rodando entra qualquer um:', invalido);

// ═══ NA PRÁTICA ═══

// ─── 4) União discriminada: o campo que diz qual é qual ───
// Cada forma carrega os seus próprios campos, e um campo em comum diz qual delas é.
type Entrega =
  | { tipo: 'retirada'; loja: string }
  | { tipo: 'correios'; cep: string; prazoEmDias: number }
  | { tipo: 'motoboy'; bairro: string; taxa: number };

function descrever(entrega: Entrega): string {
  switch (entrega.tipo) {
    case 'retirada': return `retirar na loja ${entrega.loja}`;
    case 'correios': return `correios para ${entrega.cep} em ${entrega.prazoEmDias} dias`;
    case 'motoboy': return `motoboy no ${entrega.bairro} por R$ ${entrega.taxa.toFixed(2)}`;
  }
}

console.log(descrever({ tipo: 'retirada', loja: 'Centro' }));
console.log(descrever({ tipo: 'correios', cep: '30110-012', prazoEmDias: 5 }));
console.log(descrever({ tipo: 'motoboy', bairro: 'Savassi', taxa: 12 }));

// Dentro do `case 'retirada'`, só existe `loja` — os outros campos nem aparecem.
// @ts-expect-error — Property 'cep' does not exist on type '{ tipo: "retirada"; loja: string; }'.
const semCep = ({ tipo: 'retirada', loja: 'Centro' } as Entrega & { tipo: 'retirada' }).cep;
console.log('cep na retirada:', semCep);

console.log('\nÉ o padrão mais poderoso do TypeScript: em vez de um objeto com tudo opcional,');
console.log('três formas fechadas e um campo que separa. O switch fica exaustivo de graça.');

// ─── 5) União de retorno: sucesso ou falha ───
type Resultado = { ok: true; total: number } | { ok: false; erro: string };

function calcularTotal(itens: { preco: number; quantidade: number }[]): Resultado {
  if (itens.length === 0) return { ok: false, erro: 'carrinho vazio' };
  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
  if (total <= 0) return { ok: false, erro: 'total inválido' };
  return { ok: true, total };
}

for (const carrinho of [[{ preco: 19.9, quantidade: 2 }], [], [{ preco: 0, quantidade: 1 }]]) {
  const r = calcularTotal(carrinho);
  // Só depois de conferir `r.ok` é que `r.total` (ou `r.erro`) existe.
  console.log(r.ok ? `✓ R$ ${r.total.toFixed(2)}` : `✕ ${r.erro}`);
}

console.log('\nSem união, isso viraria `{ total?: number; erro?: string }` — e aí os dois');
console.log('podem faltar ao mesmo tempo, ou vir juntos. A união fecha essas duas portas.');

// ═══ PEGADINHAS ═══

// ─── 6) Sem `as const`, o literal vira string na hora ───
type Nivel = 'baixo' | 'medio' | 'alto';

function alertar(nivel: Nivel): string { return `alerta ${nivel}`; }

const escolhido = 'alto';                  // const: o tipo é 'alto' — funciona
console.log(alertar(escolhido));

let escolhidoSolto = 'alto';               // let: o tipo alarga para string
// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'Nivel'.
console.log(alertar(escolhidoSolto));

const dentroDeObjeto = { nivel: 'alto' };  // a propriedade também alarga para string
// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'Nivel'.
console.log(alertar(dentroDeObjeto.nivel));

const congelado = { nivel: 'alto' } as const;
console.log(alertar(congelado.nivel), '← com `as const` volta a ser o literal');

console.log('\nA regra é essa: `let` e propriedade de objeto alargam o literal para `string`.');
console.log('Conserto: `as const`, ou anotar o tipo (`const n: Nivel = "alto"`).');

// ─── Resumo ───
// 1. `A | B` é "um ou outro"; fora de um `if`, só se pode usar o que existe nos dois.
// 2. Tipo literal transforma o valor em tipo: `'pix'` é mais preciso que `string`.
// 3. União de literais é o jeito de escrever status, papel, tamanho e forma de pagamento.
// 4. União discriminada (um campo `tipo` em comum) faz o `switch` estreitar sozinho.
// 5. Retorno `{ ok: true, ... } | { ok: false, erro }` acaba com o objeto meio preenchido.
// 6. `let` e propriedade de objeto alargam o literal — `as const` segura.
