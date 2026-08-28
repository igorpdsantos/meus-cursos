/**
 * Type assertions e tipagem estrutural
 * Sessão 5 · Rodar: node src/05-estreitar-tipos/02-assertions-e-structural.ts
 *
 * O QUE É: `as` é você afirmando um tipo que o compilador não conseguiu deduzir.
 *          Tipagem estrutural é a regra que decide o que encaixa em quê: não é o NOME do
 *          tipo que importa, é o formato.
 * QUANDO USAR: `as` quando você sabe mais do que o compilador e não há como provar
 *              (o retorno de `querySelector`, uma constante congelada).
 * QUANDO NÃO USAR: `as` para calar um erro. Se o tipo não bate, ou o tipo está errado ou
 *                  o código está — e `as` não conserta nenhum dos dois.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `as`: quando você sabe mais que o compilador ───
const configuracaoBruta = JSON.parse('{"porta":3000,"host":"localhost"}');
console.log('sem as, o tipo é any:', typeof configuracaoBruta.porta, configuracaoBruta.porta);

type Configuracao = { porta: number; host: string };
const configuracao = JSON.parse('{"porta":3000,"host":"localhost"}') as Configuracao;

console.log(`servidor em ${configuracao.host}:${configuracao.porta}`);
console.log('agora o editor completa:', configuracao.host.toUpperCase());

// @ts-expect-error — Property 'protocolo' does not exist on type 'Configuracao'.
console.log(configuracao.protocolo);

console.log('\n`as` não converte nada e não confere nada: ele só troca o que o compilador');
console.log('acha que aquilo é. O valor rodando continua exatamente o mesmo.');

// ─── 2) `as` não é conversão ───
const textoNumerico = '42';

const fingindo = textoNumerico as unknown as number;   // o tsc aceita, o valor não muda
console.log('typeof fingindo:', typeof fingindo, '← ainda é string');
console.log('fingindo + 1   :', fingindo + 1, '← "421", porque é concatenação');

const convertendo = Number(textoNumerico);             // isto sim converte, rodando
console.log('typeof convertendo:', typeof convertendo);
console.log('convertendo + 1   :', convertendo + 1);

// O TypeScript nem deixa fazer o `as` direto entre tipos que não se encontram.
// @ts-expect-error — Conversion of type 'string' to type 'number' may be a mistake.
const direto = textoNumerico as number;
console.log('e mesmo assim, rodando:', typeof direto);

console.log('\nQuando você precisa do `as unknown as X` para o compilador aceitar, é sinal de');
console.log('que você está mentindo duas vezes. Quase sempre falta uma conversão de verdade.');

// ─── 3) Tipagem estrutural: o formato manda, não o nome ───
type Ponto = { x: number; y: number };
type Coordenada = { x: number; y: number };            // outro nome, mesmo formato

const ponto: Ponto = { x: 3, y: 4 };
const coordenada: Coordenada = ponto;                  // encaixa: o formato é o mesmo

console.log('distância:', Math.hypot(coordenada.x, coordenada.y));

// Um objeto com campos A MAIS também encaixa — desde que não seja literal na hora.
const pontoTridimensional = { x: 1, y: 2, z: 3 };
const comoPonto: Ponto = pontoTridimensional;
console.log('aceitou o z sobrando:', JSON.stringify(comoPonto));

// Mas literal escrito na hora é conferido de perto: é a "excess property check".
// @ts-expect-error — Object literal may only specify known properties.
const literal: Ponto = { x: 1, y: 2, z: 3 };
console.log('literal, rodando:', Object.keys(literal).join(','));

console.log('\nEm Java ou C#, `Ponto` e `Coordenada` seriam tipos diferentes. No TypeScript,');
console.log('se o formato serve, encaixa — inclusive vindo de uma classe que você nem conhece.');

// ═══ NA PRÁTICA ═══

// ─── 4) `as const`: a constante que vira contrato ───
const ROTAS = {
  home: '/',
  alunos: '/alunos',
  pedidos: '/pedidos',
} as const;

type Rota = (typeof ROTAS)[keyof typeof ROTAS];        // '/' | '/alunos' | '/pedidos'

function navegar(rota: Rota): string { return `GET ${rota}`; }

console.log(navegar(ROTAS.alunos));
console.log(navegar('/pedidos'));

// @ts-expect-error — Argument of type '"/relatorios"' is not assignable to parameter of type 'Rota'.
console.log(navegar('/relatorios'));

console.log('\nA lista de rotas está escrita UMA vez. O tipo sai dela, e uma rota nova entra');
console.log('no tipo sozinha. É o uso mais rentável de `as const` que existe.');

// ─── 5) Estrutural é o que faz "dependência" ficar barata ───
// A função só pede o formato de que precisa. Qualquer objeto que o cumpra serve.
type RegistradorDeLog = { info(mensagem: string): void };

function processarPedido(id: number, log: RegistradorDeLog): void {
  log.info(`processando pedido ${id}`);
  log.info(`pedido ${id} concluído`);
}

// O de produção...
const logDoConsole: RegistradorDeLog = { info: (m) => console.log(`[info] ${m}`) };
// ...e o de teste, que não precisa herdar nem implementar nada.
const linhasCapturadas: string[] = [];
const logDeTeste = { info: (m: string) => { linhasCapturadas.push(m); } };

processarPedido(1042, logDoConsole);
processarPedido(1043, logDeTeste);

console.log('capturado no teste:', linhasCapturadas.length, 'linhas ·', linhasCapturadas[0]);

console.log('\nNenhum `implements`, nenhuma classe. O objeto de teste encaixa porque tem o');
console.log('método certo — e é por isso que testar TypeScript costuma dar pouco trabalho.');

// ═══ PEGADINHAS ═══

// ─── 6) `as` esconde o erro até a hora errada ───
type UsuarioCompleto = { id: number; nome: string; email: string };

// O servidor devolveu menos campos do que o tipo promete. O `as` engole isso calado.
const parcial = JSON.parse('{"id":7,"nome":"Ana"}') as UsuarioCompleto;

console.log('id e nome  :', parcial.id, parcial.nome);
console.log('email      :', parcial.email, '← undefined, e o tipo jurava que era string');
try {
  console.log(parcial.email.toLowerCase());
} catch (erro) {
  console.log('e estourou :', (erro as Error).message);
}

console.log('\nO erro não some com `as` — ele muda de lugar, e de hora. Sai da linha do');
console.log('`JSON.parse`, onde seria fácil tratar, e vai para onde alguém usou o campo.');
console.log('Dado de fora pede type guard (tópico anterior), não asserção.');

// ─── 7) Objeto vazio encaixa em quase tudo ───
type Filtros = { termo?: string; ativo?: boolean; limite?: number };

const nenhumFiltro: Filtros = {};                      // todos opcionais: `{}` serve
console.log('sem filtro:', JSON.stringify(nenhumFiltro));

// E o contrário também: um objeto com tudo cabe num tipo que não pede nada.
const qualquerCoisa: object = { a: 1, b: 2 };
console.log('em object :', JSON.stringify(qualquerCoisa));

// Por isso um tipo só de campos opcionais protege menos do que parece.
function buscar(filtros: Filtros): string {
  return `termo=${filtros.termo ?? '*'} ativo=${filtros.ativo ?? '*'} limite=${filtros.limite ?? 10}`;
}
console.log(buscar({}));

// @ts-expect-error — Object literal may only specify known properties. Did you mean 'termo'?
console.log(buscar({ term: 'ana' }));

console.log('\nA única defesa de um tipo todo opcional é a conferência de propriedade a mais.');
console.log('Ela vale para literal escrito na chamada — e some se o objeto vier de uma variável.');

// ─── Resumo ───
// 1. `as` troca o que o compilador acha; não converte, não confere e não protege.
// 2. `as unknown as X` é sinal de que falta uma conversão de verdade.
// 3. O TypeScript é estrutural: encaixa quem tem o formato, não quem tem o nome.
// 4. Literal escrito na hora é conferido de perto e recusa chave a mais; variável, não.
// 5. `as const` num objeto de constantes gera a união de valores sem repetir a lista.
// 6. Para dado que vem de fora, `as` adia o erro — type guard resolve.
