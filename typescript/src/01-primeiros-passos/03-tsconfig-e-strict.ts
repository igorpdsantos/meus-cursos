/**
 * tsconfig e o modo strict
 * Sessão 1 · Rodar: node src/01-primeiros-passos/03-tsconfig-e-strict.ts
 *
 * O QUE É: o arquivo que diz ao compilador quais regras valer e para qual JavaScript
 *          gerar. `strict: true` é a linha que liga as conferências que importam.
 * QUANDO USAR: sempre, e com `strict` ligado desde o primeiro dia do projeto.
 * QUANDO NÃO USAR: nunca desligue `strict` inteiro para calar um erro. Se precisar de
 *                  folga em código antigo, desligue UMA regra e deixe anotado por quê.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O tsconfig deste curso, comentado ───
const configuracao = [
  ['noEmit', 'true', 'só confere; quem roda é o `node arquivo.ts`'],
  ['target', 'ES2022', 'até onde pode ir a sintaxe moderna gerada'],
  ['lib', 'ES2022, DOM', 'o que já existe pronto (Array, Promise, console)'],
  ['strict', 'true', 'liga as conferências de verdade — veja o bloco 2'],
  ['moduleDetection', 'force', 'cada arquivo com escopo próprio, sem nomes brigando'],
  ['skipLibCheck', 'true', 'não conferir os .d.ts de dentro do node_modules'],
];

const largura = [18, 14, 50];
const linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');
console.log(linha(['OPÇÃO', 'VALOR', 'PARA QUÊ']));
console.log(linha(['─'.repeat(16), '─'.repeat(12), '─'.repeat(48)]));
for (const c of configuracao) console.log(linha(c));

console.log('\nO arquivo fica na raiz do curso: typescript/tsconfig.json.');
console.log('Para criar um do zero num projeto novo: npx tsc --init');

// ─── 2) O que `strict: true` liga ───
// Ele não é uma regra: é o interruptor de um grupo. Estas são as três que você sente.
const regras = [
  ['strictNullChecks', 'null e undefined param de valer para tudo'],
  ['noImplicitAny', 'parâmetro sem tipo vira erro, não `any` calado'],
  ['strictPropertyInitialization', 'campo de classe tem que nascer com valor'],
];

for (const [nome, efeito] of regras) console.log(`${nome.padEnd(30)} ${efeito}`);

console.log('\nSem strict, o TypeScript vira um corretor ortográfico: ele confere se o nome');
console.log('da propriedade existe, e mais nada. É a diferença entre achar bug e não achar.');

// ─── 3) strictNullChecks na prática ───
// Um `find` pode não achar nada. Com strict, o TypeScript obriga a pensar nesse caso.
const catalogo = [{ sku: 'CAN-01', nome: 'Caneca' }, { sku: 'CAD-02', nome: 'Caderno' }];
const achado = catalogo.find((p) => p.sku === 'INEXISTENTE');

try {
  // @ts-expect-error — 'achado' is possibly 'undefined'.
  console.log('direto   :', achado.nome);
} catch (erro) {
  console.log('direto   :', (erro as Error).message, '← exatamente o que o strict evita');
}

// As duas saídas honestas: conferir antes, ou dar um padrão.
if (achado) console.log('conferido:', achado.nome);
else console.log('conferido: produto não encontrado');

console.log('com padrão:', achado?.nome ?? 'produto não encontrado');

console.log('\nSem strictNullChecks, `achado.nome` seria aceito e estouraria rodando.');
console.log('É por essa regra sozinha que vale a pena ligar o strict.');

// ═══ NA PRÁTICA ═══

// ─── 4) noImplicitAny: o parâmetro que ninguém tipou ───
// Sem anotação e sem strict, `desconto` seria `any` — e `any` não é conferido.
function aplicarDesconto(preco: number, percentual: number): number {
  return preco - preco * (percentual / 100);
}

console.log('R$ 200 com 15%:', aplicarDesconto(200, 15).toFixed(2));

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
console.log('R$ 200 com "15":', aplicarDesconto(200, '15').toFixed(2));

console.log('\nA função de callback herda o tipo do contexto e não precisa de anotação:');
const precos = [200, 350, 90];
console.log('todos com 15%:', precos.map((p) => aplicarDesconto(p, 15).toFixed(2)).join(' · '));

// ─── 5) Ligar o strict num projeto que já existe ───
const passos = [
  '1. Ligue `strict: true` e veja quantos erros aparecem (podem ser centenas).',
  '2. Se for demais de uma vez, ligue uma regra por vez: strictNullChecks primeiro.',
  '3. Conserte por arquivo, não por regra: um arquivo limpo é um arquivo confiável.',
  '4. Nunca use `any` para calar o erro — use `unknown` e confira, ou tipe direito.',
  '5. `// @ts-expect-error` com o motivo escrito ao lado é dívida assumida, e some sozinho',
  '   quando o erro deixa de existir: o tsc avisa que a marcação virou mentira.',
];
for (const p of passos) console.log(p);

// A prova do item 5: esta linha não tem erro nenhum, e por isso a marcação seria acusada.
// (Se você acrescentar um @ts-expect-error acima dela, o `npm run check` reclama.)
console.log('\n2 + 2 =', 2 + 2);

// ═══ PEGADINHAS ═══

// ─── 6) `strict` não alcança o que vem de fora ───
const jsonDoServidor = '{"nome":"Ana","idade":null}';
const usuario = JSON.parse(jsonDoServidor) as { nome: string; idade: number };

console.log('o tipo promete: idade é number, nunca null');
console.log('o servidor deu:', usuario.idade);
console.log('idade * 2     :', usuario.idade * 2, '← 0, porque null * 2 é 0');

console.log('\n`JSON.parse` devolve `any`: o `as` é você assumindo a responsabilidade.');
console.log('`strict` confere o código que você escreveu, não o dado que chega nele.');

// ─── Resumo ───
// 1. `tsconfig.json` na raiz do projeto; `npx tsc --init` cria um comentado.
// 2. `strict: true` desde o primeiro dia — é onde mora o valor do TypeScript.
// 3. `strictNullChecks` é a regra que mais acha bug: obriga a tratar o "não achou".
// 4. `noImplicitAny` fecha a porta por onde o dado errado entrava sem ninguém ver.
// 5. Em projeto antigo, ligue regra por regra e conserte arquivo por arquivo.
// 6. Nada disso confere dado de fora: JSON, formulário e fetch continuam por sua conta.
