/**
 * Sobrecarga e o this tipado
 * Sessão 4 · Rodar: node src/04-funcoes/02-overload-e-this.ts
 *
 * O QUE É: sobrecarga é declarar várias assinaturas para a mesma função, para o retorno
 *          depender do que entrou. `this: T` é um parâmetro falso que diz de quem a
 *          função é — some na chamada e só serve para o compilador conferir.
 * QUANDO USAR: sobrecarga quando o tipo do retorno MUDA conforme o argumento. `this: T`
 *              em função que vai virar método ou callback de evento.
 * QUANDO NÃO USAR: sobrecarga quando uma união resolve. Duas assinaturas que devolvem o
 *                  mesmo tipo não precisam de sobrecarga nenhuma.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O problema que a sobrecarga resolve ───
// Sem sobrecarga, o retorno é a união — e quem chama tem que conferir mesmo sabendo.
function buscarSemSobrecarga(chave: string | number): string | number {
  return typeof chave === 'string' ? chave.length : chave * 2;
}

const semSobrecarga = buscarSemSobrecarga('caneca');
// @ts-expect-error — Property 'toFixed' does not exist on type 'string | number'.
console.log(semSobrecarga.toFixed(0));
console.log('sem sobrecarga:', semSobrecarga, '← o tipo é string | number, e quem chama sofre');

// ─── 2) Com sobrecarga: o retorno segue a entrada ───
// As duas primeiras linhas são só assinaturas: somem no JavaScript gerado.
function medir(valor: string): string;
function medir(valor: number): number;
function medir(valor: string | number): string | number {
  return typeof valor === 'string' ? `${valor.length} letras` : Math.round(valor * 100) / 100;
}

const comoTexto = medir('caneca');          // string
const comoNumero = medir(19.987);           // number

console.log('texto :', comoTexto.toUpperCase());
console.log('número:', comoNumero.toFixed(1));

// @ts-expect-error — No overload matches this call.
console.log(medir(true));

console.log('\nA implementação (a terceira linha) NÃO é uma assinatura pública: ninguém pode');
console.log('chamar `medir(x: string | number)`. Só as duas declaradas acima valem.');

// ─── 3) `this` tipado: a função sabe de quem ela é ───
type Carrinho = {
  itens: { nome: string; preco: number }[];
  total(): number;
};

// `this: Carrinho` é o primeiro parâmetro na declaração e não existe na chamada.
function totalDoCarrinho(this: Carrinho): number {
  return this.itens.reduce((soma, i) => soma + i.preco, 0);
}

const carrinho: Carrinho = {
  itens: [{ nome: 'Caneca', preco: 19.9 }, { nome: 'Caderno', preco: 32.5 }],
  total: totalDoCarrinho,
};

console.log('total:', carrinho.total().toFixed(2));

// Chamada solta, sem dono, a função não tem `this` — e o TypeScript avisa antes de rodar.
try {
  // @ts-expect-error — The 'this' context of type 'void' is not assignable to method's 'this' of type 'Carrinho'.
  console.log(totalDoCarrinho());
} catch (erro) {
  console.log('sem dono   :', (erro as Error).message);
}

console.log('\nEsse é o bug clássico de `this` no JavaScript, transformado em erro de compilação.');

// ═══ NA PRÁTICA ═══

// ─── 4) Sobrecarga onde ela vale mesmo a pena ───
type Aluno = { id: number; nome: string; nota: number };

const turma: Aluno[] = [
  { id: 1, nome: 'Ana', nota: 9.2 },
  { id: 2, nome: 'Bruno', nota: 6.4 },
  { id: 3, nome: 'Carla', nota: 8.1 },
];

// Por id vem um aluno (ou undefined); por nota mínima vem uma lista. Tipos diferentes.
function buscarAluno(id: number): Aluno | undefined;
function buscarAluno(criterio: { notaMinima: number }): Aluno[];
function buscarAluno(alvo: number | { notaMinima: number }): Aluno | undefined | Aluno[] {
  if (typeof alvo === 'number') return turma.find((a) => a.id === alvo);
  return turma.filter((a) => a.nota >= alvo.notaMinima);
}

const porId = buscarAluno(2);
const aprovados = buscarAluno({ notaMinima: 7 });

console.log('por id  :', porId?.nome ?? 'não achou');
console.log('nota ≥ 7:', aprovados.map((a) => a.nome).join(', '), `(${aprovados.length})`);

// Sem sobrecarga, `aprovados.map` não compilaria: o tipo seria a união dos três casos.
console.log('\nUse sobrecarga quando o RETORNO muda de forma. Quando só os parâmetros mudam');
console.log('e a saída é a mesma, parâmetro opcional ou união resolvem com menos código.');

// ─── 5) `this` em callback de evento ───
// É o caso do `addEventListener`: dentro do handler, `this` é o elemento que disparou.
type Botao = { rotulo: string; aoClicar(este: (this: Botao) => void): void };

function criarBotao(rotulo: string): Botao {
  const botao: Botao = {
    rotulo,
    aoClicar(handler) { handler.call(botao); },     // `call` amarra o this
  };
  return botao;
}

const salvar = criarBotao('Salvar');
salvar.aoClicar(function (this: Botao) {
  console.log(`clicou em "${this.rotulo}"`);
});

// Arrow function NÃO tem `this` próprio — por isso ela não serve neste lugar.
salvar.aoClicar(() => console.log('arrow: aqui `this` não é o botão, é o de fora'));

console.log('\nRegra: `function` quando você precisa do `this` de quem chamou; arrow quando');
console.log('você quer justamente o `this` de fora (dentro de um método de classe, por exemplo).');

// ─── 6) `this` como tipo de retorno: a cadeia que sobrevive à herança ───
// Devolver `this` (e não o nome da classe) faz o método continuar servindo na filha.
class Consulta {
  protected partes: string[] = [];

  onde(condicao: string): this { this.partes.push(`WHERE ${condicao}`); return this; }
  ordenarPor(campo: string): this { this.partes.push(`ORDER BY ${campo}`); return this; }
  montar(): string { return ['SELECT *', ...this.partes].join(' '); }
}

class ConsultaPaginada extends Consulta {
  limite(quantos: number): this { this.partes.push(`LIMIT ${quantos}`); return this; }
}

// Porque `onde` devolve `this`, e não `Consulta`, o `limite` continua acessível na cadeia.
const sql = new ConsultaPaginada().onde('ativo = 1').ordenarPor('nome').limite(10).montar();
console.log(sql);

console.log('\nSe `onde` devolvesse `Consulta`, a cadeia perderia a filha no primeiro método —');
console.log('e `.limite(10)` viraria erro de compilação. `this` como tipo é "a classe de quem');
console.log('chamou", seja ela qual for.');

// ═══ PEGADINHAS ═══

// ─── 7) A implementação não confere as assinaturas ───
function formatar(valor: string): string;
function formatar(valor: number): string;
// A implementação promete `string` para os dois casos — mas quem garante é você.
function formatar(valor: string | number): string {
  if (typeof valor === 'number') return valor.toFixed(2);
  return valor.trim();
}

console.log('número:', formatar(19.9));
console.log('texto :', formatar('  caneca  ') + '|');

// O buraco: a assinatura pode prometer algo que a implementação não cumpre, e o tsc aceita.
function tamanho(valor: string): number;
function tamanho(valor: unknown[]): number;
function tamanho(valor: any): number {
  return valor.length;             // `any` na implementação: ninguém confere mais nada
}

console.log('tamanho de texto:', tamanho('caneca'));
console.log('tamanho de lista:', tamanho([1, 2, 3]));

console.log('\nÉ o preço da sobrecarga: a assinatura de implementação costuma virar `any` ou');
console.log('uma união larga, e ali dentro a conferência afrouxa. Escreva pouco código nela.');

// ─── Resumo ───
// 1. Sobrecarga = várias assinaturas + uma implementação; só as assinaturas são chamáveis.
// 2. Ela vale quando o TIPO DO RETORNO muda conforme o argumento — senão, use união.
// 3. As assinaturas somem no JavaScript gerado: são declaração pura.
// 4. `this: T` tipa o dono da função sem entrar na chamada; `: this` no retorno encadeia.
// 5. Arrow function não tem `this` próprio; `function` tem. É o que decide qual usar.
// 6. Dentro da implementação a conferência afrouxa — mantenha esse corpo curto.
