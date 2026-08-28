/**
 * static, getters e construtor privado
 * Sessão 6 · Rodar: node --experimental-transform-types src/06-classes/04-static-e-getters.ts
 *
 * O QUE É: `static` pertence à classe, não ao objeto. `get`/`set` são métodos que se leem
 *          como propriedade. Construtor `private` tira de todo mundo o direito de dar `new`.
 * QUANDO USAR: `static` para fábrica e constante da classe; `get` para valor derivado;
 *              construtor privado quando a criação precisa passar por uma validação.
 * QUANDO NÃO USAR: `set` que faz mais do que guardar. Quem lê `objeto.x = 1` não espera
 *                  uma chamada de rede ali — nesse caso, escreva um método com nome.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `static`: pertence à classe ───
class Pedido {
  static readonly TAXA_DE_SERVICO = 0.05;      // constante da classe
  static quantidadeCriada = 0;                 // contador compartilhado por todos

  constructor(public readonly id: number, private valor: number) {
    Pedido.quantidadeCriada++;                 // pela CLASSE, não por `this`
  }

  static total(pedidos: Pedido[]): number {    // método que não precisa de um pedido
    return pedidos.reduce((s, p) => s + p.comTaxa(), 0);
  }

  comTaxa(): number { return this.valor * (1 + Pedido.TAXA_DE_SERVICO); }
}

const pedidos = [new Pedido(1, 100), new Pedido(2, 250)];
console.log('taxa      :', Pedido.TAXA_DE_SERVICO);
console.log('criados   :', Pedido.quantidadeCriada);
console.log('total     :', Pedido.total(pedidos).toFixed(2));

// @ts-expect-error — Property 'TAXA_DE_SERVICO' is a static member of type 'Pedido'.
console.log(pedidos[0].TAXA_DE_SERVICO);

// ─── 2) `get` e `set`: método com cara de propriedade ───
class Temperatura {
  private celsius = 0;

  get fahrenheit(): number { return this.celsius * 1.8 + 32; }
  set fahrenheit(valor: number) { this.celsius = (valor - 32) / 1.8; }

  get emCelsius(): number { return this.celsius; }
}

const temperatura = new Temperatura();
temperatura.fahrenheit = 212;                  // parece atribuição, é chamada de método
console.log('212 °F =', temperatura.emCelsius.toFixed(1), '°C');

temperatura.fahrenheit = 32;
console.log('32 °F  =', temperatura.emCelsius.toFixed(1), '°C');
console.log('de volta a °F:', temperatura.fahrenheit.toFixed(0));

// Sem `set`, o get vira só de leitura — e o tsc cobra.
// @ts-expect-error — Cannot assign to 'emCelsius' because it is a read-only property.
temperatura.emCelsius = 100;

// ─── 3) Construtor privado e fábrica estática ───
// Só a própria classe pode dar `new`. Quem está de fora passa pela fábrica, que valida.
class Cpf {
  private constructor(public readonly numero: string) {}

  static criar(bruto: string): Cpf | null {
    const digitos = bruto.replace(/\D/g, '');
    if (digitos.length !== 11) return null;
    return new Cpf(digitos);
  }

  formatado(): string {
    return this.numero.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}

const valido = Cpf.criar('529.982.247-25');
const invalido = Cpf.criar('123');

console.log('válido  :', valido?.formatado() ?? 'recusado');
console.log('inválido:', invalido?.formatado() ?? 'recusado');

// @ts-expect-error — Constructor of class 'Cpf' is private and only accessible within the class declaration.
console.log(new Cpf('qualquer coisa').numero);

console.log('\nA partir daqui, um valor do tipo `Cpf` no sistema inteiro é um CPF que já');
console.log('passou pela validação. O tipo deixa de ser rótulo e passa a ser garantia.');

// ═══ NA PRÁTICA ═══

// ─── 4) `get` para valor derivado ───
class NotaFiscal {
  private itens: { descricao: string; preco: number; quantidade: number }[] = [];

  adicionar(descricao: string, preco: number, quantidade: number): void {
    this.itens.push({ descricao, preco, quantidade });
  }

  // Derivado: calculado toda vez, nunca guardado — não tem como ficar desatualizado.
  get subtotal(): number { return this.itens.reduce((s, i) => s + i.preco * i.quantidade, 0); }
  get imposto(): number { return this.subtotal * 0.12; }
  get total(): number { return this.subtotal + this.imposto; }
  get vazia(): boolean { return this.itens.length === 0; }
}

const nota = new NotaFiscal();
console.log('vazia?', nota.vazia);

nota.adicionar('Caneca', 19.9, 2);
nota.adicionar('Caderno', 32.5, 1);

console.log(`subtotal R$ ${nota.subtotal.toFixed(2)}`);
console.log(`imposto  R$ ${nota.imposto.toFixed(2)}`);
console.log(`total    R$ ${nota.total.toFixed(2)}`);

console.log('\nSe `total` fosse um campo comum, alguém teria que lembrar de recalculá-lo a');
console.log('cada `adicionar`. Com `get`, esquecer não é uma opção.');

// ─── 5) Fábricas nomeadas, em vez de um construtor com tudo ───
class Periodo {
  private constructor(readonly inicio: string, readonly fim: string) {}

  static de(inicio: string, fim: string): Periodo { return new Periodo(inicio, fim); }
  static mesInteiro(ano: number, mes: number): Periodo {
    const ultimo = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
    const dois = (n: number) => String(n).padStart(2, '0');
    return new Periodo(`${ano}-${dois(mes)}-01`, `${ano}-${dois(mes)}-${dois(ultimo)}`);
  }
  static hoje(dia: string): Periodo { return new Periodo(dia, dia); }

  descrever(): string { return this.inicio === this.fim ? this.inicio : `${this.inicio} a ${this.fim}`; }
}

console.log('mês inteiro:', Periodo.mesInteiro(2026, 2).descrever());
console.log('intervalo  :', Periodo.de('2026-08-01', '2026-08-15').descrever());
console.log('um dia     :', Periodo.hoje('2026-08-28').descrever());

console.log('\nTrês construtores com nome, em vez de um `new Periodo(a, b, tipo, flag)` que');
console.log('ninguém entende na hora de chamar. `static` é o que torna isso possível.');

// ═══ PEGADINHAS ═══

// ─── 6) `static` não enxerga `this` da instância ───
class Contador {
  private valor = 0;

  incrementar(): void { this.valor++; }

  static reiniciarTodos(contadores: Contador[]): void {
    // @ts-expect-error — Property 'valor' does not exist on type 'typeof Contador'.
    console.log(this.valor);
    for (const c of contadores) c.zerar();
  }

  zerar(): void { this.valor = 0; }
  get atual(): number { return this.valor; }
}

const a = new Contador();
const b = new Contador();
a.incrementar(); a.incrementar(); b.incrementar();
console.log('antes :', a.atual, b.atual);

Contador.reiniciarTodos([a, b]);
console.log('depois:', a.atual, b.atual);

console.log('\nDentro de um método `static`, `this` é a própria CLASSE. Não existe objeto');
console.log('nenhum ali — por isso o método recebe a lista por parâmetro.');

// ─── 7) `get` que faz trabalho pesado engana quem lê ───
class RelatorioPesado {
  private vezesCalculado = 0;

  get resumo(): string {
    this.vezesCalculado++;                     // efeito colateral escondido numa leitura
    let soma = 0;
    for (let i = 0; i < 200000; i++) soma += i;
    return `soma ${soma}`;
  }

  get quantasVezes(): number { return this.vezesCalculado; }
}

const relatorio = new RelatorioPesado();
console.log(relatorio.resumo);
console.log(relatorio.resumo);
console.log('calculado', relatorio.quantasVezes, 'vezes ← duas leituras, dois cálculos inteiros');

console.log('\nQuem escreve `if (r.resumo)` num laço não imagina que está recalculando tudo.');
console.log('Se custa caro ou tem efeito, use um método com nome de verbo: `calcularResumo()`.');

// ─── Resumo ───
// 1. `static` pertence à classe: constante, contador e fábrica. Ali `this` é a classe.
// 2. `get`/`set` são métodos com cara de propriedade — bons para valor derivado.
// 3. `get` sem `set` é propriedade só de leitura, e o tsc cobra.
// 4. Construtor `private` + fábrica estática obriga a criação a passar pela validação.
// 5. Fábricas com nome substituem o construtor de seis parâmetros que ninguém decora.
// 6. `get` caro ou com efeito colateral engana quem lê: aí escreva um método.
