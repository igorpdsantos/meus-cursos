/**
 * null, undefined e opcional
 * Sessão 2 · Rodar: node src/02-tipos-basicos/04-null-e-opcional.ts
 *
 * O QUE É: os dois jeitos de dizer "não tem valor" e o que o `strictNullChecks` cobra de
 *          você antes de deixar usar qualquer coisa que possa ser um deles.
 * QUANDO USAR: `undefined` para "ainda não foi preenchido"; `null` para "foi preenchido
 *              com nada de propósito" — é o que costuma vir do banco.
 * QUANDO NÃO USAR: os dois no mesmo campo. Escolha um por projeto e seja consistente.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Com strict, `null` deixa de valer para tudo ───
// Vindo de uma função, o tipo é mesmo `string | null` — o valor só se descobre chamando.
const buscarApelido = (nome: string): string | null => (nome === 'Ana' ? 'Aninha' : null);

const apelido = buscarApelido('Bruno');
const telefone: string | undefined = undefined;

try {
  // @ts-expect-error — 'apelido' is possibly 'null'.
  console.log(apelido.toUpperCase());
} catch (erro) {
  console.log('sem conferir:', (erro as Error).message);
}

// Conferir é o que abre a porta: dentro do `if`, o tipo já é só `string`.
if (apelido !== null) console.log('apelido:', apelido.toUpperCase());
else console.log('apelido: não informado');

console.log('da Ana  :', buscarApelido('Ana')?.toUpperCase() ?? 'não informado');
console.log('telefone:', telefone ?? 'não informado');

console.log('\nSem `strictNullChecks`, `null` e `undefined` caberiam em `string` e a primeira');
console.log('linha passaria — para estourar rodando. É a regra que mais acha bug de verdade.');

// ─── 2) `?.` e `??`: o caminho curto ───
type Assinante = { nome: string; plano?: { titulo: string; precoMensal: number } };

const comPlano: Assinante = { nome: 'Ana', plano: { titulo: 'Pro', precoMensal: 49.9 } };
const semPlano: Assinante = { nome: 'Bruno' };

// `?.` para de descer assim que encontra null/undefined, e devolve undefined.
console.log('Ana  :', comPlano.plano?.titulo ?? 'sem plano');
console.log('Bruno:', semPlano.plano?.titulo ?? 'sem plano');

// `??` só cai no padrão para null/undefined — diferente do `||`, que cai para 0 e ''.
const desconto = 0;
console.log('com ?? :', desconto ?? 10, '← respeita o zero');
console.log('com || :', desconto || 10, '← trocou o zero por 10, e o cliente perdeu o desconto');

console.log('\nA regra: `??` para valor ausente, `||` para valor "falsy". Em preço, quantidade');
console.log('e texto de formulário, `||` costuma ser o bug.');

// ─── 3) `?` na propriedade e `?` no parâmetro ───
type Contato = { nome: string; email?: string };

function formatarContato(contato: Contato, prefixo?: string): string {
  const marca = prefixo ?? '·';
  return `${marca} ${contato.nome}${contato.email ? ` <${contato.email}>` : ''}`;
}

console.log(formatarContato({ nome: 'Ana', email: 'ana@loja.dev' }));
console.log(formatarContato({ nome: 'Bruno' }, '→'));

// `email?: string` é o mesmo que `email: string | undefined`... quase. A diferença é que
// o opcional deixa a chave FALTAR; a união obriga a escrevê-la, mesmo que como undefined.
type ContatoUniao = { nome: string; email: string | undefined };

// @ts-expect-error — Property 'email' is missing in type '{ nome: string; }'.
const semEmail: ContatoUniao = { nome: 'Carla' };
console.log('roda igual:', JSON.stringify(semEmail));

const comUndefined: ContatoUniao = { nome: 'Carla', email: undefined };
console.log('a forma aceita:', JSON.stringify(comUndefined), '← email some do JSON');

// ═══ NA PRÁTICA ═══

// ─── 4) O `find` que pode não achar ───
const catalogo = [
  { sku: 'CAN-01', nome: 'Caneca', preco: 19.9 },
  { sku: 'CAD-02', nome: 'Caderno', preco: 32.5 },
];

function precoDoSku(sku: string): string {
  const produto = catalogo.find((p) => p.sku === sku);
  if (!produto) return `${sku}: não encontrado`;      // sem esta linha, o tsc não deixa seguir
  return `${sku}: R$ ${produto.preco.toFixed(2)}`;
}

console.log(precoDoSku('CAN-01'));
console.log(precoDoSku('XXX-99'));

// O tipo de `find` é `T | undefined`, e é isso que força o tratamento.
const achado = catalogo.find((p) => p.preco > 100);
console.log('acima de 100:', achado?.nome ?? 'nenhum');

console.log('\nO mesmo vale para `array[i]`, `Map.get`, `document.querySelector` e qualquer');
console.log('busca. O "não achou" existe — o TypeScript só não deixa mais você fingir que não.');

// ─── 5) Do banco vem null; do formulário vem undefined ───
type LinhaDoBanco = { id: number; nome: string; apelido: string | null };
type FormularioAberto = { nome: string; apelido?: string };

const doBanco: LinhaDoBanco = { id: 7, nome: 'Ana Souza', apelido: null };
const doFormulario: FormularioAberto = { nome: 'Bruno Lima' };

// Um jeito só de tratar os dois: o `??` cobre null E undefined.
const comoChamar = (apelido: string | null | undefined, nome: string) => apelido ?? nome.split(' ')[0];

console.log('banco     :', comoChamar(doBanco.apelido, doBanco.nome));
console.log('formulário:', comoChamar(doFormulario.apelido, doFormulario.nome));
console.log('com apelido:', comoChamar('Aninha', 'Ana Souza'));

console.log('\nMisturar os dois no mesmo campo é o que dá `if (x !== null && x !== undefined)`');
console.log('espalhado pelo código. Escolha um na borda do sistema e converta ali mesmo.');

// ═══ PEGADINHAS ═══

// ─── 6) `!` cala o compilador sem resolver nada ───
const usuarios = [{ nome: 'Ana' }, { nome: 'Bruno' }];

// `!` é você afirmando "eu sei que não é undefined". O tsc acredita e para de conferir.
const primeiro = usuarios.find((u) => u.nome === 'Ana')!;
console.log('achou      :', primeiro.nome);

const inexistente = usuarios.find((u) => u.nome === 'Carla')!;
try {
  console.log('não achou  :', inexistente.nome);
} catch (erro) {
  console.log('não achou  :', (erro as Error).message, '← o `!` mentiu, e rodando não tem perdão');
}

console.log('\n`!` não confere nada: apaga o aviso. Use quando você tem uma garantia que o');
console.log('compilador não enxerga — e, mesmo aí, um `if` explícito envelhece melhor.');

// ─── Resumo ───
// 1. Com `strictNullChecks`, nada que possa ser null/undefined é usado sem conferir antes.
// 2. `?.` para de descer no primeiro vazio; `??` dá o padrão só para null e undefined.
// 3. `||` também cai para 0 e '' — em preço e quantidade, é onde nasce o bug.
// 4. `email?: string` deixa a chave faltar; `email: string | undefined` obriga a escrevê-la.
// 5. `find`, `Map.get` e `array[i]` podem não achar: o tipo diz isso, e agora você trata.
// 6. `!` silencia o compilador sem mudar a realidade — prefira o `if`.
