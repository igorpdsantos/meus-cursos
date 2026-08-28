/**
 * Intersection e enum
 * Sessão 3 · Rodar: node --experimental-transform-types src/03-montar-tipos/03-intersection-e-enum.ts
 *
 * O QUE É: intersection (`A & B`) junta dois tipos num só, que precisa cumprir os dois.
 *          `enum` é a única construção do TypeScript que SOBRA depois de compilar: ela
 *          vira um objeto de verdade no JavaScript gerado.
 * QUANDO USAR: `&` para compor formatos sem herança. `enum` quando você precisa do valor
 *              existindo em tempo de execução (percorrer as opções, mapear de volta).
 * QUANDO NÃO USAR: `enum` no caso comum. Uma união de literais com `as const` faz o mesmo
 *                  sem gerar código — e é o que a maior parte dos projetos usa hoje.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `&`: o tipo que cumpre os dois contratos ───
type Identificavel = { id: number };
type ComDatas = { criadoEm: string; atualizadoEm: string };
type Comentario = Identificavel & ComDatas & { texto: string; autor: string };

const comentario: Comentario = {
  id: 7,
  criadoEm: '2026-08-20',
  atualizadoEm: '2026-08-21',
  texto: 'Chegou antes do prazo.',
  autor: 'Ana',
};

console.log(`#${comentario.id} por ${comentario.autor}: "${comentario.texto}"`);
console.log(`criado em ${comentario.criadoEm}, editado em ${comentario.atualizadoEm}`);

// @ts-expect-error — Property 'atualizadoEm' is missing.
const semData: Comentario = { id: 8, criadoEm: '2026-08-22', texto: 'ok', autor: 'Bruno' };
console.log('faltando um campo:', Object.keys(semData).length, 'chaves');

console.log('\n`&` é junção, não escolha: o objeto precisa de TODOS os campos dos dois lados.');
console.log('É o contrário de `|`, onde basta ser um deles.');

// ─── 2) `enum`: a exceção que vira código ───
enum StatusDoPedido {
  Pendente,        // 0
  Pago,            // 1
  Enviado,         // 2
  Entregue,        // 3
}

const status = StatusDoPedido.Enviado;
console.log('valor    :', status);
console.log('nome     :', StatusDoPedido[status], '← o mapa de volta, que só o enum dá');
console.log('todos    :', Object.values(StatusDoPedido).filter((v) => typeof v === 'string').join(' → '));

// É por isso que o cabeçalho deste arquivo pede `--experimental-transform-types`: sem a
// flag, o `node` recusa o arquivo inteiro, porque `enum` não é um tipo — é código para gerar.
console.log('\nSão só duas as construções do TypeScript que geram código: `enum` e a');
console.log('propriedade de parâmetro do construtor (tema 06). O resto o `node` apaga e pronto.');

// ─── 3) enum de texto, que é o que se usa de verdade ───
enum FormaDePagamento {
  Pix = 'pix',
  Boleto = 'boleto',
  Cartao = 'cartao',
}

function prazo(forma: FormaDePagamento): string {
  if (forma === FormaDePagamento.Pix) return 'na hora';
  if (forma === FormaDePagamento.Boleto) return 'até 3 dias úteis';
  return 'até 30 dias';
}

for (const forma of Object.values(FormaDePagamento))
  console.log(`${forma.padEnd(8)} ${prazo(forma)}`);

// @ts-expect-error — Type '"pix"' is not assignable to type 'FormaDePagamento'.
console.log(prazo('pix'));

console.log('\nRepare: o texto "pix" cru NÃO serve, mesmo tendo o mesmo valor. Enum de texto');
console.log('é nominal — só o membro do enum entra. Enum de número, esse aceita qualquer number.');

// ═══ NA PRÁTICA ═══

// ─── 4) `&` para acrescentar campo a um tipo que veio de fora ───
// O caso clássico: o `Request` do Express ganha `usuarioId` depois que o login passa.
type Pedido = { rota: string; cabecalhos: Record<string, string> };
type PedidoAutenticado = Pedido & { usuarioId: number };

const loginRequired = (pedido: Pedido): PedidoAutenticado | null => {
  const token = pedido.cabecalhos['authorization'];
  if (!token) return null;
  return { ...pedido, usuarioId: Number(token.replace('Bearer ', '')) };
};

const semToken = loginRequired({ rota: '/alunos', cabecalhos: {} });
const comToken = loginRequired({ rota: '/alunos', cabecalhos: { authorization: 'Bearer 7' } });

console.log('sem token:', semToken === null ? '401' : 'passou');
console.log('com token:', comToken ? `usuário ${comToken.usuarioId} em ${comToken.rota}` : '401');

console.log('\nO `&` deixa claro o que foi ACRESCENTADO por quem, sem mexer no tipo original.');

// ─── 5) Enum ou união de literais? ───
const comparacao = [
  ['Existe rodando', 'sim, vira objeto', 'não, some'],
  ['Peso no bundle', 'algumas linhas por enum', 'zero'],
  ['Listar as opções', 'Object.values(E)', 'precisa de um array `as const`'],
  ['Valor → nome', 'E[0] === "Pendente"', 'não tem'],
  ['Aceita o texto cru', 'não (enum de texto)', 'sim, é o próprio texto'],
  ['O que se usa hoje', 'quando precisa do objeto', 'no resto — é o padrão'],
];

const largura = [22, 30, 30];
const linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');
console.log(linha(['', 'ENUM', 'UNIÃO DE LITERAIS']));
console.log(linha(['─'.repeat(20), '─'.repeat(28), '─'.repeat(28)]));
for (const l of comparacao) console.log(linha(l));

// A alternativa sem enum, com tudo que o enum dava:
const STATUS = ['pendente', 'pago', 'enviado', 'entregue'] as const;
type StatusLiteral = (typeof STATUS)[number];

const atual: StatusLiteral = 'enviado';
console.log('\nsem enum → opções:', STATUS.join(' → '), '| atual:', atual, '| índice:', STATUS.indexOf(atual));

// ═══ PEGADINHAS ═══

// ─── 6) `&` de tipos incompatíveis dá `never`, não erro ───
type ComoTexto = { codigo: string };
type ComoNumero = { codigo: number };
type Impossivel = ComoTexto & ComoNumero;          // codigo: string & number → never

// A declaração do TIPO passa. O erro só aparece quando alguém tenta criar o valor.
// @ts-expect-error — Type 'string' is not assignable to type 'never'.
const nunca: Impossivel = { codigo: 'CAN-01' };
console.log('rodando, é um objeto comum:', JSON.stringify(nunca));

console.log('\nO TypeScript não avisa na hora de declarar: ele espera você tentar usar.');
console.log('Quando um `&` começa a dar "not assignable to never", quase sempre é isto:');
console.log('dois campos com o mesmo nome e tipos que não se encontram.');

// ─── 7) Enum de número aceita número que não é dele ───
enum Prioridade { Baixa = 1, Media = 2, Alta = 3 }

function rotular(p: Prioridade): string { return Prioridade[p] ?? 'desconhecida'; }

const vindoDaApi: number = 99;                     // qualquer number, e o tsc aceita

console.log('Alta   :', rotular(Prioridade.Alta));
console.log('o 99   :', rotular(vindoDaApi), '← não é membro nenhum, e passou pelo tsc');

console.log('\nEnum numérico é estrutural: qualquer `number` cabe nele. Enum de texto não tem');
console.log('esse buraco — mais um motivo para nunca usar a versão numérica em dado de fora.');

// ─── Resumo ───
// 1. `A & B` exige os campos dos dois; `A | B` aceita ser um dos dois.
// 2. `&` é o jeito de acrescentar campo a um tipo de terceiro sem herança.
// 3. `enum` é a única coisa do TypeScript que sobra no JavaScript gerado.
// 4. Prefira enum de texto; o numérico aceita qualquer `number` e não protege nada.
// 5. Para o caso comum, união de literais + `as const` faz o mesmo e não gera código.
// 6. `&` de campos incompatíveis vira `never` calado — o erro só aparece ao criar o valor.
