/**
 * type alias e interface
 * Sessão 3 · Rodar: node src/03-montar-tipos/02-alias-e-interface.ts
 *
 * O QUE É: as duas formas de dar nome a um tipo. `type` apelida qualquer tipo;
 *          `interface` descreve o formato de um objeto e pode ser estendida.
 * QUANDO USAR: `interface` para o formato de objeto e de classe; `type` para união,
 *              tupla, função e qualquer coisa que não seja um objeto.
 * QUANDO NÃO USAR: não misture os dois para a mesma ideia no mesmo projeto. A escolha
 *                  importa menos do que a consistência.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Dar nome ao tipo, em vez de repeti-lo ───
// Sem nome, o mesmo formato é escrito em três lugares e muda em três lugares.
interface Produto {
  sku: string;
  nome: string;
  preco: number;
}

const cadastrar = (produto: Produto): string => `cadastrado: ${produto.nome}`;
const etiqueta = (produto: Produto): string => `${produto.sku} — R$ ${produto.preco.toFixed(2)}`;

const caneca: Produto = { sku: 'CAN-01', nome: 'Caneca', preco: 19.9 };
console.log(cadastrar(caneca));
console.log(etiqueta(caneca));

try {
  // @ts-expect-error — Property 'preco' is missing in type '{ sku: string; nome: string; }'.
  console.log(etiqueta({ sku: 'CAD-02', nome: 'Caderno' }));
} catch (erro) {
  console.log('sem preço:', (erro as Error).message);
}

// ─── 2) `type` apelida qualquer coisa, não só objeto ───
type Reais = number;                                  // um apelido, para o código se ler melhor
type Sku = `${string}-${number}`;                     // template literal: formato de texto
type Ordenacao = 'asc' | 'desc';                      // união
type Comparador = (a: number, b: number) => number;   // função
type Coordenada = [number, number];                   // tupla

const preco: Reais = 19.9;
const codigo: Sku = 'CAN-01';
const ordem: Ordenacao = 'desc';
const porValor: Comparador = (a, b) => b - a;
const loja: Coordenada = [-19.92, -43.94];

console.log(`${codigo}: R$ ${preco.toFixed(2)} (${ordem})`);
console.log('ordenado:', [3, 1, 2].sort(porValor).join(' > '));
console.log('loja em :', loja.join(', '));

// @ts-expect-error — Type '"CANECA"' is not assignable to type '`${string}-${number}`'.
const skuTorto: Sku = 'CANECA';
console.log('rodando, é texto como qualquer outro:', skuTorto.length, 'letras');

// ─── 3) Estender: `extends` na interface, `&` no type ───
interface Pessoa {
  nome: string;
  nascimento: string;
}
interface Aluno extends Pessoa {
  matricula: string;
}

type PessoaTipo = { nome: string; nascimento: string };
type ProfessorTipo = PessoaTipo & { disciplinas: string[] };

const aluno: Aluno = { nome: 'Ana', nascimento: '2004-03-11', matricula: 'A-1042' };
const professor: ProfessorTipo = { nome: 'Carla', nascimento: '1985-07-02', disciplinas: ['Física'] };

console.log(`${aluno.nome} (${aluno.matricula})`);
console.log(`${professor.nome} — ${professor.disciplinas.join(', ')}`);

// @ts-expect-error — Property 'matricula' is missing.
const semMatricula: Aluno = { nome: 'Bruno', nascimento: '2003-01-20' };
console.log('roda mesmo assim:', Object.keys(semMatricula).length, 'chaves');

console.log('\nOs dois chegam ao mesmo resultado. `extends` diz "é um tipo de"; `&` diz');
console.log('"tem as duas coisas". Na leitura, `extends` costuma contar melhor a história.');

// ═══ NA PRÁTICA ═══

// ─── 4) Qual escolher, na prática ───
const escolha = [
  ['formato de objeto', 'interface', 'é o caso mais comum, e o erro sai mais legível'],
  ['contrato de classe', 'interface', 'só interface entra em `implements`'],
  ['união de literais', 'type', 'interface não sabe fazer união'],
  ['tupla', 'type', 'idem'],
  ['tipo de função', 'os dois', 'na prática, `type` é o que se lê melhor'],
  ['tipo derivado de outro', 'type', 'Pick, Omit e keyof só cabem em `type`'],
];

const largura = [24, 12, 46];
const linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');
console.log(linha(['PARA QUÊ', 'USE', 'POR QUÊ']));
console.log(linha(['─'.repeat(22), '─'.repeat(10), '─'.repeat(44)]));
for (const l of escolha) console.log(linha(l));

// O que só a interface faz: entrar em `implements`, e se reabrir para ganhar campo depois.
interface Cliente { nome: string }
interface Cliente { desde: number }              // a mesma interface, aberta de novo
class ClientePessoaFisica implements Cliente {   // `implements` só aceita interface
  nome: string;
  desde: number;
  constructor(nome: string, desde: number) { this.nome = nome; this.desde = desde; }
}
console.log('\nsó interface:', JSON.stringify(new ClientePessoaFisica('Ana', 2021)));

// O que só o `type` faz: apelidar o que NÃO é objeto, e derivar de outro tipo.
type FormaDePagamento = 'pix' | 'cartao' | 'boleto';        // união
type PontoNoMapa = [number, number];                         // tupla
type ApenasNome = Pick<Cliente, 'nome'>;                     // derivado

const pagamento: FormaDePagamento = 'pix';
const local: PontoNoMapa = [-19.92, -43.94];
const resumo: ApenasNome = { nome: 'Ana' };
console.log('só type    :', pagamento, local.join(', '), JSON.stringify(resumo));

console.log('\nO jeito de decidir em uma frase: `interface` descreve o FORMATO de um objeto e');
console.log('fica ABERTA — quem usa pode estender e até reabrir. `type` é apelido para');
console.log('QUALQUER tipo e fica FECHADO — em troca, é o único que compõe (união, tupla,');
console.log('Pick, Omit, keyof).');
console.log('\nNa prática: comece com `interface` para objeto e para o que uma classe vai');
console.log('implementar; use `type` no instante em que aparecer união, tupla ou derivação.');
console.log('Os dois convivem: `interface Pedido { forma: FormaDePagamento }` é o normal.');
console.log('O que não se faz é escolher no chute e misturar os dois para a mesma ideia no');
console.log('mesmo projeto — quem lê depois não sabe se a diferença quis dizer alguma coisa.');

// ─── 5) Interface que descreve função e índice ───
interface Formatador {
  (valor: number): string;                    // a interface descreve a chamada
  moeda: string;                              // e ainda tem propriedade própria
}

const emReais = ((valor: number) => `R$ ${valor.toFixed(2)}`) as Formatador;
emReais.moeda = 'BRL';

console.log(emReais(1250.5), `(${emReais.moeda})`);

interface EstoquePorSku {
  [sku: string]: number;                      // qualquer chave string, valor number
}

const estoque: EstoquePorSku = { 'CAN-01': 12, 'CAD-02': 0 };
estoque['CAN-02'] = 40;

for (const [sku, quantidade] of Object.entries(estoque))
  console.log(`${sku.padEnd(8)} ${quantidade === 0 ? 'esgotado' : `${quantidade} un`}`);

// @ts-expect-error — Type 'string' is not assignable to type 'number'.
estoque['CAD-03'] = 'muitos';
console.log('e o texto entrou:', estoque['CAD-03']);

// ═══ PEGADINHAS ═══

// ─── 6) Interface se reabre; type, não ───
interface Configuracao {
  ambiente: string;
}
// A MESMA interface, declarada de novo: o TypeScript junta as duas em silêncio.
interface Configuracao {
  tentativas: number;
}

const config: Configuracao = { ambiente: 'producao', tentativas: 3 };
console.log('junção automática:', JSON.stringify(config));

// @ts-expect-error — Property 'tentativas' is missing.
const soAmbiente: Configuracao = { ambiente: 'producao' };
console.log('faltando um campo:', JSON.stringify(soAmbiente));

console.log('\nIsso se chama declaration merging. É ótimo para acrescentar campo a um tipo de');
console.log('biblioteca (o `Request` do Express, por exemplo) e péssimo quando acontece sem');
console.log('você querer: dois arquivos com a mesma interface viram uma só, sem aviso.');
console.log('Com `type`, o mesmo nome duas vezes é erro na hora — e às vezes é o que se quer.');

// ─── Resumo ───
// 1. `interface` para formato de objeto e contrato de classe; `type` para o resto.
// 2. `type` apelida qualquer tipo: união, tupla, função, template literal.
// 3. Herança: `extends` na interface, `&` no type — o resultado é o mesmo.
// 4. Só `interface` entra em `implements` (tema 06) e só `type` deriva com Pick/Omit (tema 07).
// 5. Interface descreve chamada de função e assinatura de índice.
// 6. Interface declarada duas vezes se funde em silêncio; `type` acusa nome repetido.
