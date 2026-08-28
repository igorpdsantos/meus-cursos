/**
 * Generics em interfaces e tipos
 * Sessão 7 · Rodar: node src/07-generics/05-generics-em-interfaces-e-tipos.ts
 *
 * O QUE É: o mesmo `<T>` das funções, agora em `interface`, `type` e nos tipos que você já
 *          usava sem reparar — `Array<T>`, `Promise<T>`, `Map<K, V>`.
 * QUANDO USAR: quando um FORMATO se repete e só o miolo muda: envelope de resposta de API,
 *              página de resultados, repositório, resultado de operação.
 * QUANDO NÃO USAR: quando o miolo é sempre o mesmo. `Resposta<Produto>` só compensa se
 *                  existir também `Resposta<Pedido>` — senão escreva o tipo direto.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O que você já usava era genérico ───
const precos: Array<number> = [19.9, 32.5];         // Array<T> — o mesmo que number[]
const estoque: Map<string, number> = new Map([['CAN-01', 4], ['CAM-02', 0]]);
const entrega: Promise<string> = Promise.resolve('a caminho');

console.log('preço:', precos[0].toFixed(2));        // number, porque T = number
console.log('estoque CAN-01:', estoque.get('CAN-01') ?? 0);
entrega.then((situacao) => console.log('entrega:', situacao.toUpperCase()));

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
precos.push('40');

// O `T` de `Promise` é o que chega no `await`, e o do `Map` é o valor de `.get`.
console.log('\n`Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos da biblioteca padrão.');
console.log('Você já preenchia o `<T>` deles todo dia sem chamar isso de generic.');

// ─── 2) Interface genérica: um envelope, vários conteúdos ───
interface RespostaApi<T> {
  dados: T;
  status: number;
  buscadoEm: string;
}

type Produto = { sku: string; preco: number };
type Usuario = { login: string; admin: boolean };

const respostaProduto: RespostaApi<Produto> = {
  dados: { sku: 'CAN-01', preco: 19.9 },
  status: 200,
  buscadoEm: '2026-08-28',
};

const respostaLista: RespostaApi<Usuario[]> = {
  dados: [{ login: 'ana', admin: true }, { login: 'bruno', admin: false }],
  status: 200,
  buscadoEm: '2026-08-28',
};

console.log('sku:', respostaProduto.dados.sku, '· R$', respostaProduto.dados.preco.toFixed(2));
console.log('admins:', respostaLista.dados.filter((u) => u.admin).map((u) => u.login));

// @ts-expect-error — Property 'login' does not exist on type 'Produto'.
console.log(respostaProduto.dados.login);

// ─── 3) Type alias genérico, e o valor padrão do `<T>` ───
// `type` também recebe parâmetro — e aqui ele faz o que a interface não faz: união.
type Resultado<T, E = string> =
  | { ok: true; valor: T }
  | { ok: false; erro: E };

function dividir(a: number, b: number): Resultado<number> {
  if (b === 0) return { ok: false, erro: 'divisão por zero' };
  return { ok: true, valor: a / b };
}

for (const [a, b] of [[10, 4], [10, 0]]) {
  const r = dividir(a, b);
  // O campo `ok` estreita a união: no `if`, só existe `valor`; no `else`, só existe `erro`.
  if (r.ok) console.log(`${a} / ${b} =`, r.valor.toFixed(2));
  else console.log(`${a} / ${b} →`, r.erro);
}

// `E = string` é o padrão: quem quiser outro erro, escreve.
const falhaDetalhada: Resultado<Produto, { codigo: number }> = { ok: false, erro: { codigo: 404 } };
console.log('erro com código:', falhaDetalhada.ok ? '' : falhaDetalhada.erro.codigo);

// ═══ NA PRÁTICA ═══

// ─── 4) Generic com intersection: o campo que o banco acrescenta ───
// O que entra é o formato que você escreveu; o que sai é ele MAIS o que o banco põe.
type Salvo<T> = T & { id: number; criadoEm: string };

let proximoId = 1;
function salvar<T extends object>(registro: T): Salvo<T> {
  return { ...registro, id: proximoId++, criadoEm: '2026-08-28' };
}

const produtoSalvo = salvar({ sku: 'CAN-01', preco: 19.9 });
const usuarioSalvo = salvar({ login: 'ana', admin: true });

console.log('produto:', produtoSalvo.sku, '· id gerado pelo banco:', produtoSalvo.id);
console.log('usuário:', usuarioSalvo.login, '· criado em', usuarioSalvo.criadoEm);

// Os dois lados do `&` valem ao mesmo tempo: o campo original e o acrescentado.
console.log('preço + id:', produtoSalvo.preco.toFixed(2), '·', usuarioSalvo.id);

// @ts-expect-error — Property 'login' does not exist on type 'Salvo<{ sku: string; preco: number; }>'.
console.log(produtoSalvo.login);

// ─── 5) Contando votos: o generic escolhe as chaves do resultado ───
// `T extends string` amarra as opções ao literal que veio — o Record sai com essas chaves.
function apurar<T extends string>(opcoes: readonly T[], votos: readonly T[]): Record<T, number> {
  const placar = Object.fromEntries(opcoes.map((o) => [o, 0])) as Record<T, number>;
  for (const voto of votos) placar[voto] += 1;
  return placar;
}

const chapas = ['Chapa A', 'Chapa B', 'Branco'] as const;
const urna = ['Chapa A', 'Chapa B', 'Chapa A', 'Branco', 'Chapa A'] as const;

const placar = apurar(chapas, urna);
console.log('placar:', placar);
console.log('vencedora: Chapa A com', placar['Chapa A'], 'votos');

// O resultado conhece as chaves reais — errar o nome é erro de compilação, não `undefined`.
// @ts-expect-error — Property 'Chapa C' does not exist on type 'Record<"Chapa A" | "Chapa B" | "Branco", number>'.
console.log(placar['Chapa C']);

// ═══ PEGADINHAS ═══

// ─── 6) Interface genérica sem preencher o `<T>` não é tipo ───
interface Caixa<T> { conteudo: T; }

// @ts-expect-error — Generic type 'Caixa<T>' requires 1 type argument(s).
const semTipo: Caixa = { conteudo: 'Caneca' };
console.log('roda mesmo assim, porque o tipo some:', semTipo.conteudo);

// As duas saídas honestas: preencher, ou dar um padrão na declaração.
const preenchida: Caixa<string> = { conteudo: 'Caneca' };
interface CaixaComPadrao<T = string> { conteudo: T; }
const comPadrao: CaixaComPadrao = { conteudo: 'Camiseta' };

console.log('preenchida:', preenchida.conteudo, '· com padrão:', comPadrao.conteudo);
console.log('\n`Caixa` sozinho não é um tipo: é uma fábrica de tipos esperando o argumento.');

// ─── Resumo ───
// 1. `Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos — você já usava sem saber o nome.
// 2. `interface Envelope<T>` descreve o formato que se repete e deixa o miolo em aberto.
// 3. `type` genérico faz o que a interface não faz: união discriminada como `Resultado<T, E>`.
// 4. `<T, E = string>` dá padrão ao parâmetro de tipo, igual a parâmetro de função.
// 5. `T & { id: number }` devolve o que entrou MAIS o que a função acrescentou.
// 6. Tipo genérico sem argumento é erro: `Caixa` precisa virar `Caixa<string>` ou ter padrão.
