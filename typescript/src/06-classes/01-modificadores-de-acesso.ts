/**
 * Modificadores de acesso
 * Sessão 6 · Rodar: node --experimental-transform-types src/06-classes/01-modificadores-de-acesso.ts
 *
 * O QUE É: `public`, `private`, `protected` e `readonly` — quem pode ler e escrever cada
 *          campo de uma classe. E a propriedade de parâmetro, que declara o campo no
 *          próprio construtor.
 * QUANDO USAR: `private` por padrão em tudo que é detalhe interno; abra em `public` só o
 *              que a classe promete a quem usa; `protected` em classe feita para ser
 *              estendida, no que a filha precisa e o mundo não.
 * QUANDO NÃO USAR: não confunda com segurança. `private` é conferência de compilação; o
 *                  `#campo` do JavaScript é o que existe de verdade rodando.
 */

// ═══ ESSENCIAL ═══

// ─── 1) public, private e readonly ───
class ContaCorrente {
  public readonly titular: string;      // qualquer um lê, ninguém troca
  private saldo: number;                // só a própria classe enxerga

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  depositar(valor: number): void { this.saldo += valor; }
  extrato(): string { return `${this.titular}: R$ ${this.saldo.toFixed(2)}`; }
}

const conta = new ContaCorrente('Ana Souza', 250);
conta.depositar(100);
console.log(conta.extrato());
console.log('titular:', conta.titular);

// @ts-expect-error — Property 'saldo' is private and only accessible within class 'ContaCorrente'.
console.log(conta.saldo);

// @ts-expect-error — Cannot assign to 'titular' because it is a read-only property.
conta.titular = 'Outra pessoa';

console.log('rodando, os dois estão lá:', JSON.stringify(conta));

// ─── 2) Propriedade de parâmetro: o atalho do construtor ───
// Escrever o campo, o parâmetro e a atribuição é a mesma coisa três vezes. O modificador
// no parâmetro faz as três de uma vez.
class Produto {
  constructor(
    public readonly sku: string,
    public nome: string,
    private precoDeCusto: number,
  ) {}

  precoDeVenda(margem: number): number { return this.precoDeCusto * (1 + margem); }
}

const caneca = new Produto('CAN-01', 'Caneca', 8);
console.log(`${caneca.sku} ${caneca.nome}: R$ ${caneca.precoDeVenda(1.5).toFixed(2)}`);

// @ts-expect-error — Property 'precoDeCusto' is private.
console.log(caneca.precoDeCusto);

console.log('campos criados:', Object.keys(caneca).join(', '));
console.log('\nSem modificador nenhum, o parâmetro seria só um parâmetro: nada de campo.');
console.log('É por isso que os quatro arquivos deste tema pedem a flag no `node`: o atalho');
console.log('não é tipo que se apague, é código que precisa ser gerado.');

// ─── 3) `protected`: a filha vê, o mundo não ───
class Funcionario {
  constructor(protected nome: string, protected salarioBase: number) {}
  descrever(): string { return `${this.nome}: R$ ${this.salarioTotal().toFixed(2)}`; }
  protected salarioTotal(): number { return this.salarioBase; }
}

class Vendedor extends Funcionario {
  constructor(nome: string, salarioBase: number, private comissao: number) {
    super(nome, salarioBase);
  }
  // A filha lê `salarioBase` e reescreve `salarioTotal` — os dois são protected.
  protected override salarioTotal(): number { return this.salarioBase + this.comissao; }
}

console.log(new Funcionario('Ana', 3200).descrever());
console.log(new Vendedor('Bruno', 3200, 850).descrever());

const bruno = new Vendedor('Bruno', 3200, 850);
// @ts-expect-error — Property 'salarioBase' is protected and only accessible within class 'Funcionario' and its subclasses.
console.log(bruno.salarioBase);

console.log('\n`private` a filha também não vê. `protected` é o meio-termo: fechado para');
console.log('fora, aberto para a herança. Use quando a subclasse PRECISA daquilo.');

console.log('\nPor isso `protected` só aparece onde há herança: em superclasse, em classe');
console.log('abstrata, em base de framework — código escrito para ser ESTENDIDO. Numa classe');
console.log('que ninguém estende, `protected` é `private` com uma promessa a mais: você');
console.log('está dizendo "quem herdar daqui pode contar com isto", e aí não dá para mudar');
console.log('sem quebrar as filhas. Sem filhas à vista, escreva `private`.');

// ═══ NA PRÁTICA ═══

// ─── 4) `private` na prática: guardar o invariante ───
// O saldo nunca pode ficar negativo. Com o campo aberto, ninguém garante isso.
class Estoque {
  private quantidade = 0;
  private readonly movimentos: string[] = [];

  constructor(public readonly sku: string) {}

  entrada(n: number): void {
    if (n <= 0) throw new Error('entrada precisa ser positiva');
    this.quantidade += n;
    this.movimentos.push(`+${n}`);
  }

  saida(n: number): boolean {
    if (n > this.quantidade) return false;           // a regra mora aqui dentro
    this.quantidade -= n;
    this.movimentos.push(`-${n}`);
    return true;
  }

  get disponivel(): number { return this.quantidade; }
  get historico(): string { return this.movimentos.join(' '); }
}

const estoque = new Estoque('CAN-01');
estoque.entrada(10);
console.log('tirar 3 :', estoque.saida(3), '· restam', estoque.disponivel);
console.log('tirar 20:', estoque.saida(20), '· restam', estoque.disponivel);
console.log('histórico:', estoque.historico);

console.log('\nCom `quantidade` pública, qualquer linha do sistema poderia fazer');
console.log('`estoque.quantidade = -5`. É disso que `private` protege: não do invasor, do colega.');

// ─── 5) `#campo`: o privado que existe rodando ───
class SenhaComPrivateTs {
  constructor(private valor: string) {}
  conferir(tentativa: string): boolean { return this.valor === tentativa; }
}

class SenhaComHash {
  #valor: string;                                    // `#` é sintaxe do JavaScript, não do TS
  constructor(valor: string) { this.#valor = valor; }
  conferir(tentativa: string): boolean { return this.#valor === tentativa; }
}

const comTs = new SenhaComPrivateTs('123456');
const comHash = new SenhaComHash('123456');

console.log('confere:', comTs.conferir('123456'), comHash.conferir('123456'));
console.log('private do TS no JSON:', JSON.stringify(comTs), '← a senha vazou');
console.log('# do JavaScript      :', JSON.stringify(comHash), '← nada aqui');

console.log('\nDois níveis diferentes: `private` some ao compilar e o campo continua um campo');
console.log('comum; `#` é privado de verdade, e nem `Object.keys` alcança. Para segredo, `#`.');

// ═══ PEGADINHAS ═══

// ─── 6) `private` não impede nada rodando ───
class Cofre {
  constructor(private segredo: string) {}
  abrir(chave: string): string { return chave === 'sesamo' ? this.segredo : 'trancado'; }
}

const cofre = new Cofre('o mapa do tesouro');
console.log('pela porta:', cofre.abrir('sesamo'));

// Duas linhas que o compilador aceita e que ignoram o `private` por completo.
console.log('pelo índice:', (cofre as unknown as Record<string, string>)['segredo']);
console.log('pelo JSON  :', JSON.stringify(cofre));

console.log('\n`private` é combinado entre você e o compilador. Ele organiza o código e');
console.log('documenta a intenção — não esconde dado de ninguém em tempo de execução.');

// ─── Resumo ───
// 1. `public` (padrão) abre, `private` fecha, `protected` abre só para as filhas —
//    ou seja: `protected` é para superclasse, para classe pensada para ser estendida.
// 2. `readonly` deixa ler e proíbe atribuir depois do construtor.
// 3. Modificador no parâmetro do construtor cria o campo e atribui — sem repetir três vezes.
// 4. Comece tudo `private` e abra só o que a classe promete.
// 5. `private` some ao compilar; `#campo` é privado de verdade, inclusive no JSON.
// 6. Nada disso é segurança: é organização. Segredo de verdade não mora no cliente.
