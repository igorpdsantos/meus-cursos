/**
 * Restrições com extends
 * Sessão 7 · Rodar: node src/07-generics/02-restricoes-com-extends.ts
 *
 * O QUE É: `<T extends X>` limita o que pode entrar no lugar de `T`. Sem a restrição, `T`
 *          é qualquer coisa e nada pode ser feito com ele lá dentro.
 * QUANDO USAR: quando a função precisa de alguma garantia sobre o `T` — que ele tenha
 *              `length`, que tenha `id`, que seja uma chave do objeto.
 * QUANDO NÃO USAR: para restringir a um tipo só. `<T extends Produto>(p: T)` com um único
 *                  uso é só `(p: Produto)` escrito de forma complicada.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Sem restrição, `T` não sabe fazer nada ───
function medirSemRestricao<T>(valor: T): number {
  // @ts-expect-error — Property 'length' does not exist on type 'T'.
  return valor.length;
}
console.log('sem restrição, rodando:', medirSemRestricao('caneca'), medirSemRestricao(42));

// Com `extends`, o compilador passa a saber que existe `length` — e a chamada é conferida.
function medir<T extends { length: number }>(valor: T): number { return valor.length; }

console.log('texto:', medir('caneca'));
console.log('lista:', medir([1, 2, 3]));
console.log('objeto com length:', medir({ length: 7, nome: 'qualquer coisa' }));

// @ts-expect-error — Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
console.log(medir(42));

// ─── 2) Restringir para poder usar o campo ───
type ComId = { id: number };

function indexarPorId<T extends ComId>(itens: T[]): Map<number, T> {
  const mapa = new Map<number, T>();
  for (const item of itens) mapa.set(item.id, item);   // só compila por causa do `extends`
  return mapa;
}

const alunos = [
  { id: 1, nome: 'Ana', nota: 9.2 },
  { id: 2, nome: 'Bruno', nota: 6.4 },
];
const porId = indexarPorId(alunos);

// O `T` guardou o tipo COMPLETO: `nome` e `nota` continuam ali, não só o `id`.
console.log('aluno 2:', porId.get(2)?.nome, porId.get(2)?.nota.toFixed(1));

// @ts-expect-error — Property 'id' is missing in type '{ nome: string; }'.
indexarPorId([{ nome: 'Carla' }]);

console.log('\nSe a assinatura fosse `(itens: ComId[]): Map<number, ComId>`, o retorno perderia');
console.log('`nome` e `nota`. É isso que o generic com restrição preserva.');

// ─── 3) `keyof`: restringir à chave de um objeto ───
function pegar<T extends object, K extends keyof T>(objeto: T, chave: K): T[K] {
  return objeto[chave];
}

const produto = { sku: 'CAN-01', preco: 19.9, ativo: true };

const sku = pegar(produto, 'sku');        // string
const preco = pegar(produto, 'preco');    // number
const ativo = pegar(produto, 'ativo');    // boolean

console.log(sku.toUpperCase(), preco.toFixed(2), ativo ? 'ativo' : 'inativo');

// @ts-expect-error — Argument of type '"estoque"' is not assignable to parameter of type '"sku" | "preco" | "ativo"'.
console.log(pegar(produto, 'estoque'));

console.log('\nRepare que cada chamada devolveu um tipo diferente, e nenhuma precisou de `as`.');
console.log('`T[K]` é o tipo do valor daquela chave — o próximo tópico é só sobre isso.');

// ═══ NA PRÁTICA ═══

// ─── 4) Ordenar por qualquer campo, sem perder o tipo ───
function ordenarPor<T, K extends keyof T>(itens: T[], campo: K, direcao: 'asc' | 'desc' = 'asc'): T[] {
  const sinal = direcao === 'asc' ? 1 : -1;
  return [...itens].sort((a, b) => (a[campo] < b[campo] ? -sinal : a[campo] > b[campo] ? sinal : 0));
}

const vendas = [
  { vendedor: 'Carla', total: 430, mes: 'jan' },
  { vendedor: 'Ana', total: 1200, mes: 'fev' },
  { vendedor: 'Bruno', total: 890, mes: 'jan' },
];

console.log('por total (desc):', ordenarPor(vendas, 'total', 'desc').map((v) => v.vendedor).join(' > '));
console.log('por vendedor    :', ordenarPor(vendas, 'vendedor').map((v) => v.vendedor).join(' < '));

// @ts-expect-error — Argument of type '"comissao"' is not assignable to parameter of type 'keyof ...'.
ordenarPor(vendas, 'comissao');

console.log('\nUma função para qualquer lista de qualquer formato, com o nome do campo');
console.log('conferido pelo compilador. Sem generic, isso seria `(itens: any[], campo: string)`.');

// ─── 5) Valor padrão para o parâmetro de tipo ───
type Resposta<T = string> = { status: number; corpo: T };

const respostaDeTexto: Resposta = { status: 200, corpo: 'tudo certo' };
const respostaDeLista: Resposta<{ id: number }[]> = { status: 200, corpo: [{ id: 1 }, { id: 2 }] };

console.log(`${respostaDeTexto.status}: ${respostaDeTexto.corpo.toUpperCase()}`);
console.log(`${respostaDeLista.status}: ${respostaDeLista.corpo.length} itens`);

// O padrão também funciona em função e em classe.
class Cache<T = unknown> {
  private dados = new Map<string, T>();
  guardar(chave: string, valor: T): void { this.dados.set(chave, valor); }
  buscar(chave: string): T | undefined { return this.dados.get(chave); }
}

const cachePrecos = new Cache<number>();
cachePrecos.guardar('CAN-01', 19.9);
console.log('cache:', cachePrecos.buscar('CAN-01')?.toFixed(2), '·', cachePrecos.buscar('XXX') ?? 'vazio');

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
cachePrecos.guardar('CAD-02', '32.50');

// ═══ PEGADINHAS ═══

// ─── 6) `extends` com um tipo só é generic desnecessário ───
type Produto = { sku: string; preco: number };

// Aqui `T` não faz nada: entra Produto, sai string. É `(p: Produto): string` com rodeio.
function etiquetaComplicada<T extends Produto>(produto: T): string {
  return `${produto.sku}: R$ ${produto.preco.toFixed(2)}`;
}

// A versão simples faz o mesmo, e qualquer objeto compatível continua servindo.
function etiqueta(produto: Produto): string {
  return `${produto.sku}: R$ ${produto.preco.toFixed(2)}`;
}

const comExtras = { sku: 'CAN-01', preco: 19.9, estoque: 12 };
console.log('complicada:', etiquetaComplicada(comExtras));
console.log('simples   :', etiqueta(comExtras), '← aceita igual, por tipagem estrutural');

console.log('\nO generic só se paga quando o `T` REAPARECE no retorno. Se a função devolve');
console.log('sempre o mesmo tipo, a restrição sozinha não justifica o `<T>`.');

// ─── 7) `object` não é o mesmo que "qualquer objeto útil" ───
function contarChaves<T extends object>(valor: T): number { return Object.keys(valor).length; }

console.log('objeto:', contarChaves({ a: 1, b: 2 }));
console.log('lista :', contarChaves([1, 2, 3]), '← array também é object');
console.log('função:', contarChaves(() => {}), '← função também');

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'object'.
contarChaves('texto');

console.log('\n`extends object` deixa entrar array, função, Date e Map. Quando você quer');
console.log('mesmo "um objeto de dados", `extends Record<string, unknown>` é mais preciso.');

// ─── Resumo ───
// 1. `<T extends X>` é o que dá ao compilador alguma certeza sobre o `T`.
// 2. Sem restrição, nada pode ser feito com `T` lá dentro — nem ler `.length`.
// 3. `K extends keyof T` restringe a chave, e `T[K]` devolve o tipo daquele campo.
// 4. `<T = string>` dá um padrão para quem não quiser escolher.
// 5. Restrição a um tipo só, sem `T` no retorno, é generic sem função — simplifique.
// 6. `extends object` aceita array, função e Date; `Record<string, unknown>` é mais estreito.
