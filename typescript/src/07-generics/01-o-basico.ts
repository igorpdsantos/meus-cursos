/**
 * Generics: o básico
 * Sessão 7 · Rodar: node src/07-generics/01-o-basico.ts
 *
 * O QUE É: um tipo que vira parâmetro. Em vez de escrever a função para `string` e de novo
 *          para `number`, você escreve uma vez com um `<T>` que se ajusta a quem chamou.
 * QUANDO USAR: quando a função ou a classe funciona igual para qualquer tipo e o tipo que
 *              entra decide o que sai — `primeiro`, `Caixa`, `Repositorio`.
 * QUANDO NÃO USAR: com um `<T>` que aparece uma vez só. Se o tipo não conecta entrada e
 *                  saída, ele não está fazendo nada — ali cabia `unknown`.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O problema: `any` perde o tipo pelo caminho ───
function primeiroComAny(lista: any[]): any { return lista[0]; }

const nomeSolto = primeiroComAny(['Ana', 'Bruno']);
console.log('com any:', nomeSolto.toUpperCase());   // passa, e está certo
try {
  console.log(nomeSolto.toFixed(2));                // o tsc também deixa passar
} catch (erro) {
  console.log('com any:', (erro as Error).message, '← só rodando o erro aparece');
}

// Com generic, o tipo entra e sai: `T` é `string` porque a lista era de string.
function primeiro<T>(lista: T[]): T | undefined { return lista[0]; }

const nome = primeiro(['Ana', 'Bruno']);            // string | undefined
const nota = primeiro([9.2, 6.4]);                  // number | undefined

console.log('com generic:', nome?.toUpperCase(), '·', nota?.toFixed(1));

try {
  // @ts-expect-error — Property 'toFixed' does not exist on type 'string'.
  console.log(nome?.toFixed(2));
} catch (erro) {
  console.log('com generic:', (erro as Error).message, '← agora o tsc avisa antes');
}

// ─── 2) Quem preenche o `T` é a chamada ───
function embrulhar<T>(valor: T): { conteudo: T; embrulhadoEm: string } {
  return { conteudo: valor, embrulhadoEm: '2026-08-28' };
}

const comTexto = embrulhar('Caneca');               // T = string
const comObjeto = embrulhar({ sku: 'CAN-01', preco: 19.9 });  // T = { sku: string; preco: number }

console.log(comTexto.conteudo.toUpperCase());
console.log(comObjeto.conteudo.sku, '→', comObjeto.conteudo.preco.toFixed(2));

// Dá para dizer o tipo na mão, quando a dedução não é a que você quer.
const explicito = embrulhar<string | null>(null);
console.log('explícito:', explicito.conteudo ?? '(vazio)');

// @ts-expect-error — Property 'sku' does not exist on type 'string'.
console.log(comTexto.conteudo.sku);

console.log('\nNa maior parte das vezes você NÃO escreve o `<string>`: o TypeScript deduz');
console.log('pelo argumento. Escrever só quando ele deduz mais largo ou mais estreito do que');
console.log('você queria.');

// ─── 3) Mais de um parâmetro de tipo ───
function parear<A, B>(primeiro: A, segundo: B): [A, B] { return [primeiro, segundo]; }

const parNomeIdade = parear('Ana', 30);
const parSkuPreco = parear('CAN-01', 19.9);

console.log(`${parNomeIdade[0]} tem ${parNomeIdade[1]} anos`);
console.log(`${parSkuPreco[0]} custa R$ ${parSkuPreco[1].toFixed(2)}`);

// A troca clássica, que só é possível porque os dois tipos têm nome.
function inverter<A, B>(par: [A, B]): [B, A] { return [par[1], par[0]]; }

const invertido = inverter(parNomeIdade);           // [number, string]
console.log('invertido:', invertido[0] + 1, invertido[1].toLowerCase());

try {
  // @ts-expect-error — Property 'toLowerCase' does not exist on type 'number'.
  console.log(invertido[0].toLowerCase());
} catch (erro) {
  console.log('trocado   :', (erro as Error).message, '← a posição 0 agora é number');
}

// ═══ NA PRÁTICA ═══

// ─── 4) Classe genérica: a mesma estrutura para qualquer conteúdo ───
class Fila<T> {
  private itens: T[] = [];

  entrar(item: T): void { this.itens.push(item); }
  sair(): T | undefined { return this.itens.shift(); }
  get tamanho(): number { return this.itens.length; }
  espiar(): T | undefined { return this.itens[0]; }
}

const senhas = new Fila<number>();
senhas.entrar(101);
senhas.entrar(102);
console.log('próxima senha:', senhas.espiar(), '· na fila:', senhas.tamanho);
console.log('chamou       :', senhas.sair(), '· restam:', senhas.tamanho);

type Tarefa = { titulo: string; prioridade: number };
const tarefas = new Fila<Tarefa>();
tarefas.entrar({ titulo: 'Conferir estoque', prioridade: 1 });
tarefas.entrar({ titulo: 'Fechar caixa', prioridade: 2 });
console.log('próxima tarefa:', tarefas.espiar()?.titulo);

// @ts-expect-error — Argument of type 'string' is not assignable to parameter of type 'number'.
senhas.entrar('103');

console.log('\nUma classe, dois usos, zero duplicação — e cada fila continua sabendo o que');
console.log('guarda. É por isso que `Array<T>`, `Map<K, V>` e `Promise<T>` são genéricos.');

// ─── 5) O generic que atravessa a assíncrona ───
// `Promise<T>` é genérica: o que a promessa entrega segue o tipo lá de dentro.
async function buscarPorId<T>(tabela: Record<number, T>, id: number): Promise<T | null> {
  await new Promise((resolver) => setTimeout(resolver, 1));
  return tabela[id] ?? null;
}

const alunos = { 1: { nome: 'Ana', nota: 9.2 }, 2: { nome: 'Bruno', nota: 6.4 } };
const cidades = { 1: 'Belo Horizonte', 2: 'Recife' };

(async () => {
  const aluno = await buscarPorId(alunos, 1);
  const cidade = await buscarPorId(cidades, 2);
  const nenhum = await buscarPorId(alunos, 99);

  console.log('aluno :', aluno?.nome, aluno?.nota.toFixed(1));
  console.log('cidade:', cidade?.toUpperCase());
  console.log('id 99 :', nenhum ?? 'não encontrado');
})();

// ═══ PEGADINHAS ═══

// ─── 6) `<T>` que aparece uma vez só não serve para nada ───
// Aqui `T` não conecta nada: entra e some. A função aceita qualquer coisa e devolve string.
function descreverInutil<T>(valor: T): string { return `recebi ${typeof valor}`; }

console.log(descreverInutil('texto'), '·', descreverInutil(42));

// A versão honesta diz a mesma coisa e é mais fácil de ler.
function descreverHonesto(valor: unknown): string { return `recebi ${typeof valor}`; }
console.log(descreverHonesto('texto'), '·', descreverHonesto(42));

// Pior ainda: o generic que só existe para o chamador escolher o retorno.
function comoSeFosse<T>(valor: unknown): T { return valor as T; }
const mentira = comoSeFosse<number>('42');
console.log('typeof mentira:', typeof mentira, '← o tipo diz number, e é string');

console.log('\nA regra: `T` precisa aparecer pelo menos DUAS vezes — uma na entrada e outra');
console.log('na saída. Se aparece uma vez, ele não está ligando nada, e `unknown` é mais honesto.');

// ─── Resumo ───
// 1. Generic é tipo virando parâmetro: escreve uma vez, serve para qualquer tipo.
// 2. Ao contrário de `any`, o tipo que entra é o que sai — nada se perde no caminho.
// 3. Quase sempre o TypeScript deduz o `T` pela chamada; escreva `<string>` só quando precisar.
// 4. `<A, B>` para mais de um tipo — é o que permite `[A, B]` virar `[B, A]`.
// 5. Classe genérica: `Fila<T>`, como `Array<T>`, `Map<K, V>` e `Promise<T>`.
// 6. `T` que aparece uma vez só não conecta nada — ali o certo era `unknown`.
