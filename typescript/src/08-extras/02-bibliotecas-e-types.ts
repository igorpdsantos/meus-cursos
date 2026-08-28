/**
 * Bibliotecas de fora e declaration files
 * Sessão 8 · Rodar: node src/08-extras/02-bibliotecas-e-types.ts
 *
 * O QUE É: como o TypeScript descobre o tipo de código que não é dele — o `.d.ts`, que é
 *          um arquivo só de declarações, sem nenhuma linha que rode.
 * QUANDO USAR: `@types/alguma-coisa` quando a biblioteca é JavaScript puro; um `.d.ts`
 *              seu quando não existe pacote de tipos e você não quer `any` espalhado.
 * QUANDO NÃO USAR: não descreva a biblioteca inteira. Declare só o que você usa — o resto
 *                  é trabalho jogado fora e mais uma coisa para desatualizar.
 */

// ═══ ESSENCIAL ═══

// ─── 1) De onde vem o tipo de cada coisa ───
const origens = [
  ['embutido no TS', 'Array, Promise, Map, JSON', 'a opção `lib` do tsconfig'],
  ['dentro do pacote', 'zod, prisma, express 5', 'o campo `types` do package.json'],
  ['pacote separado', 'lodash, jsonwebtoken', 'npm i -D @types/lodash'],
  ['escrito por você', 'lib antiga sem tipos', 'um arquivo .d.ts no projeto'],
  ['nenhum', 'o resto', 'tudo vira `any`, e o tsc para de ajudar'],
];

const largura = [20, 28, 36];
const linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');
console.log(linha(['DE ONDE VEM', 'EXEMPLO', 'COMO CHEGA']));
console.log(linha(['─'.repeat(18), '─'.repeat(26), '─'.repeat(34)]));
for (const o of origens) console.log(linha(o));

console.log('\nO teste rápido: se o editor não completa nada, o tipo não chegou. Antes de');
console.log('escrever um `.d.ts`, procure `@types/<pacote>` — quase sempre já existe.');

// ─── 2) `declare`: descrever sem implementar ───
// Isto é o conteúdo de um `.d.ts`: só assinatura, nenhum corpo. Some ao compilar.
declare function formatarCpf(bruto: string): string;
declare const VERSAO_DA_LIB: string;

// A implementação de verdade viria da biblioteca. Aqui ela é montada na mão para o
// exemplo rodar — é exatamente o papel que o JavaScript da lib cumpriria.
const global = globalThis as unknown as { formatarCpf: (b: string) => string; VERSAO_DA_LIB: string };
global.formatarCpf = (bruto) => bruto.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
global.VERSAO_DA_LIB = '2.1.0';

console.log('versão   :', VERSAO_DA_LIB);
console.log('formatado:', formatarCpf('52998224725'));

try {
  // @ts-expect-error — Argument of type 'number' is not assignable to parameter of type 'string'.
  console.log(formatarCpf(52998224725));
} catch (erro) {
  console.log('com número:', (erro as Error).message, '← o tsc já tinha avisado');
}

console.log('\n`declare` é uma promessa: "isto existe rodando, confie em mim". Se a promessa');
console.log('for falsa, o erro só aparece na execução — como com `as`.');

// ─── 3) Tipar uma biblioteca sem tipos, só no que você usa ───
// Suponha um pacote antigo, JavaScript puro, sem @types. Ele existe rodando:
const bibliotecaCrua = {
  slugify: (texto: unknown) => String(texto).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  truncar: (texto: unknown, tamanho: unknown) => String(texto).slice(0, Number(tamanho)),
  versao: '1.0.0',
};

// O `.d.ts` que você escreveria é este tipo: só o que o seu código chama.
type TextoUtils = {
  slugify(texto: string): string;
  truncar(texto: string, tamanho: number): string;
};

const texto: TextoUtils = bibliotecaCrua as TextoUtils;

console.log('slug    :', texto.slugify('Caneca Branca 300ml'));
console.log('truncado:', texto.truncar('Caderno universitário 200 folhas', 20) + '…');

// @ts-expect-error — Property 'versao' does not exist on type 'TextoUtils'.
console.log(texto.versao);

console.log('\nA biblioteca tem `versao`, e o seu tipo não. Isso não é defeito: é o contrato');
console.log('reduzido ao que você realmente usa — menos superfície para manter.');

// ═══ NA PRÁTICA ═══

// ─── 4) Acrescentar campo a um tipo de terceiro ───
// O caso do Express: o `loginRequired` põe `usuarioId` no request, e o tipo original não sabe.
type RequestOriginal = { url: string; headers: Record<string, string> };

// Em projeto de verdade isto vira `declare global { namespace Express { interface Request { ... } } }`
// num arquivo `types/express.d.ts`. O efeito é este:
type Request = RequestOriginal & { usuarioId?: number };

function loginRequired(pedido: Request): boolean {
  const [, token] = (pedido.headers['authorization'] ?? '').split(' ');
  if (!token) return false;
  pedido.usuarioId = Number(token);           // só compila porque o tipo foi estendido
  return true;
}

const pedido: Request = { url: '/alunos', headers: { authorization: 'Bearer 7' } };
console.log('autenticou:', loginRequired(pedido), '· usuário', pedido.usuarioId);

const semToken: Request = { url: '/alunos', headers: {} };
console.log('autenticou:', loginRequired(semToken), '· usuário', semToken.usuarioId ?? '(nenhum)');

console.log('\nÉ o declaration merging do tema 03 usado de propósito: a interface `Request` do');
console.log('Express é reaberta pelo seu arquivo e ganha o campo que o seu middleware põe.');

// ─── 5) `unknown` na borda, tipo no miolo ───
// O jeito honesto de consumir uma biblioteca sem tipos: valide na entrada, tipe daí para dentro.
type Cep = { cep: string; logradouro: string; localidade: string; uf: string };

function lerCep(bruto: unknown): Cep | null {
  if (typeof bruto !== 'object' || bruto === null) return null;
  const dado = bruto as Record<string, unknown>;
  const campos = ['cep', 'logradouro', 'localidade', 'uf'] as const;
  if (campos.some((c) => typeof dado[c] !== 'string')) return null;
  return { cep: String(dado['cep']), logradouro: String(dado['logradouro']),
           localidade: String(dado['localidade']), uf: String(dado['uf']) };
}

const respostas: unknown[] = [
  { cep: '30110-012', logradouro: 'Av. Afonso Pena', localidade: 'Belo Horizonte', uf: 'MG' },
  { cep: '00000-000', erro: true },
  'não é json',
];

for (const resposta of respostas) {
  const cep = lerCep(resposta);
  console.log(cep ? `✓ ${cep.logradouro}, ${cep.localidade}/${cep.uf}` : '✕ resposta inválida');
}

console.log('\nUma função de validação na borda, e o resto do sistema trabalha com `Cep` de');
console.log('verdade. É a mesma ideia do type guard (tema 05), aplicada ao mundo lá fora.');

// ═══ PEGADINHAS ═══

// ─── 6) `.d.ts` errado é pior do que `.d.ts` nenhum ───
// A declaração diz que devolve number. A biblioteca devolve string. Ninguém confere.
declare function somarDaLib(a: number, b: number): number;

const globalDaLib = globalThis as unknown as { somarDaLib: (a: number, b: number) => unknown };
globalDaLib.somarDaLib = (a, b) => `${a + b}`;      // a realidade: devolve texto

const total = somarDaLib(2, 3);
console.log('o tipo diz : number');
console.log('a realidade:', typeof total, JSON.stringify(total));
try {
  console.log(total.toFixed(2));
} catch (erro) {
  console.log('e estourou :', (erro as Error).message);
}

console.log('\nSem tipo nenhum, `any` pelo menos avisa você que ali não há garantia. Um `.d.ts`');
console.log('desatualizado dá a garantia errada — e é confiando nela que o código quebra.');
console.log('Quando escrever um, escreva pouco, e confira contra a documentação da versão.');

// ─── Resumo ───
// 1. Tipo de biblioteca vem embutido, de `@types/<pacote>`, ou de um `.d.ts` seu.
// 2. `.d.ts` é declaração pura: sem corpo, sem nada que rode, some ao compilar.
// 3. Declare só o que você usa — não a biblioteca inteira.
// 4. Para acrescentar campo a um tipo de terceiro, reabra a interface num `.d.ts` do projeto.
// 5. Dado que chega de fora: `unknown` na borda, valide, e tipe daí para dentro.
// 6. `.d.ts` errado é pior que nenhum: ele promete uma garantia que não existe.
