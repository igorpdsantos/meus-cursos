/**
 * Tupla e tipo de objeto
 * Sessão 2 · Rodar: node src/02-tipos-basicos/02-tupla-e-objeto.ts
 *
 * O QUE É: tupla é um array de tamanho fixo em que cada posição tem o seu próprio tipo;
 *          tipo de objeto é a descrição das chaves que um objeto precisa ter.
 * QUANDO USAR: tupla quando a posição significa alguma coisa (coordenada, par
 *              chave/valor, retorno de `useState`). Objeto para o resto.
 * QUANDO NÃO USAR: tupla com mais de três posições. Ninguém lembra o que é o índice 4 —
 *                  ali um objeto com nomes vale muito mais.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Tupla: a posição tem significado ───
const coordenada: [number, number] = [-19.92, -43.94];
const parChaveValor: [string, number] = ['estoque', 12];

console.log(`lat ${coordenada[0]}, lon ${coordenada[1]}`);
console.log(`${parChaveValor[0]} = ${parChaveValor[1]}`);

// Cada posição carrega o seu tipo — e o TypeScript sabe qual é qual.
console.log('arredondada:', coordenada[0].toFixed(1));
console.log('em maiúscula:', parChaveValor[0].toUpperCase());

// @ts-expect-error — Type 'string' is not assignable to type 'number'.
const trocada: [string, number] = ['estoque', 'doze'];
console.log('rodando, a tupla é só um array:', Array.isArray(trocada), trocada.length);

// ─── 2) Tipo de objeto: as chaves e o que cabe em cada uma ───
const cliente: { nome: string; email: string; ativo: boolean } = {
  nome: 'Ana Souza',
  email: 'ana@loja.dev',
  ativo: true,
};

console.log(`${cliente.nome} <${cliente.email}> — ${cliente.ativo ? 'ativo' : 'inativo'}`);

// Faltar chave é erro, e sobrar chave também.
// @ts-expect-error — Property 'email' is missing.
const incompleto: { nome: string; email: string } = { nome: 'Bruno' };
console.log('mesmo assim roda:', JSON.stringify(incompleto));

// @ts-expect-error — Object literal may only specify known properties.
const comExtra: { nome: string } = { nome: 'Bruno', telefone: '81 99999-0000' };
console.log('e este também   :', JSON.stringify(comExtra));

// ─── 3) Chave opcional e chave só de leitura ───
const pedido: { id: number; readonly criadoEm: string; observacao?: string } = {
  id: 1042,
  criadoEm: '2026-08-28',
};

console.log(`pedido ${pedido.id} de ${pedido.criadoEm}`);
console.log('observação:', pedido.observacao ?? '(nenhuma)');

pedido.observacao = 'entregar na portaria';          // opcional pode ser preenchido depois
console.log('observação:', pedido.observacao);

// @ts-expect-error — Cannot assign to 'criadoEm' because it is a read-only property.
pedido.criadoEm = '2020-01-01';
console.log('mas mudou rodando:', pedido.criadoEm, '← readonly é só para o compilador');

console.log('\n`?` faz a chave poder faltar, e o tipo dela vira `string | undefined`.');
console.log('Por isso o `??` acima não é frescura: sem ele, o texto sairia "undefined".');

// ═══ NA PRÁTICA ═══

// ─── 4) Tupla no retorno: dois valores de uma vez ───
// O padrão do `useState` do React e do `[erro, dado]` de várias bibliotecas.
function dividir(a: number, b: number): [number | null, string | null] {
  if (b === 0) return [null, 'divisão por zero'];
  return [a / b, null];
}

const [resultado, erro] = dividir(10, 4);
console.log('10 / 4 =', resultado, '| erro:', erro);

const [semResultado, comErro] = dividir(10, 0);
console.log('10 / 0 =', semResultado, '| erro:', comErro);

// A desestruturação é que dá nome às posições — sem ela a tupla fica ilegível.
console.log('\nRepare que o nome é escolhido por QUEM CHAMA. É a diferença para o objeto,');
console.log('onde o nome vem de quem escreveu a função. Tupla é útil justamente por isso.');

// ─── 5) Objeto aninhado, que é como o dado chega ───
type Endereco = { cidade: string; uf: string };
type Funcionario = {
  nome: string;
  salario: number;
  endereco: Endereco;
  telefones: string[];
};

const funcionario: Funcionario = {
  nome: 'Carla Dias',
  salario: 5400,
  endereco: { cidade: 'Recife', uf: 'PE' },
  telefones: ['81 3333-1111', '81 99999-2222'],
};

console.log(`${funcionario.nome} — ${funcionario.endereco.cidade}/${funcionario.endereco.uf}`);
console.log('salário anual:', (funcionario.salario * 13).toFixed(2));
console.log('contatos     :', funcionario.telefones.length);

// O TypeScript acompanha a descida inteira: erra no fim da linha e ele acusa.
// @ts-expect-error — Property 'estado' does not exist on type 'Endereco'.
console.log(funcionario.endereco.estado);

// ─── 6) Tupla com resto: o primeiro é especial ───
type LinhaDoCsv = [string, ...number[]];             // o rótulo, e depois quantos números vierem

const janeiro: LinhaDoCsv = ['Janeiro', 1200, 890, 430];
const fevereiro: LinhaDoCsv = ['Fevereiro', 980];

const somar = ([rotulo, ...valores]: LinhaDoCsv) =>
  `${rotulo.padEnd(10)} ${valores.length} vendas · R$ ${valores.reduce((a, b) => a + b, 0).toFixed(2)}`;

console.log(somar(janeiro));
console.log(somar(fevereiro));

// @ts-expect-error — Type 'string' is not assignable to type 'number'.
const quebrada: LinhaDoCsv = ['Março', '1200'];
console.log('quebrada:', quebrada.join(','));

// ═══ PEGADINHAS ═══

// ─── 7) A tupla não se defende do `push` ───
const par: [string, number] = ['estoque', 12];

par.push('sobrando');                                 // o tsc deixa passar: push aceita a união
console.log('tamanho depois do push:', par.length, JSON.stringify(par));

// @ts-expect-error — Tuple type '[string, number]' of length '2' has no element at index '2'.
console.log('lendo o índice 2:', par[2]);

console.log('\nA proteção da tupla vale na hora de criar e na hora de ler por índice.');
console.log('`push`, `pop` e `splice` escapam — se a lista precisa mesmo ser fixa, use');
console.log('`readonly [string, number]`, que tira esses métodos do tipo.');

// ─── Resumo ───
// 1. Tupla é array de tamanho fixo com um tipo por posição: `[number, number]`.
// 2. Use tupla quando a posição significa algo, e no máximo até três posições.
// 3. Tipo de objeto cobra as chaves que faltam e recusa as que sobram.
// 4. `?` deixa a chave faltar (e acrescenta `undefined` ao tipo); `readonly` proíbe atribuir.
// 5. `readonly` e o tamanho da tupla somem na execução: são contratos, não travas.
// 6. `push` fura a tupla — `readonly [A, B]` fecha esse buraco.
