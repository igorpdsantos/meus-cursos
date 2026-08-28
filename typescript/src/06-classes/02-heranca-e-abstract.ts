/**
 * Herança e classe abstrata
 * Sessão 6 · Rodar: node --experimental-transform-types src/06-classes/02-heranca-e-abstract.ts
 *
 * O QUE É: `extends` faz uma classe herdar campos e métodos de outra. `abstract` marca a
 *          classe que só serve para ser estendida — nunca instanciada — e o método ou campo
 *          que ela deixa como contrato para a filha cumprir.
 * QUANDO USAR: quando as classes são mesmo variações de uma coisa só (formas de
 *              pagamento, tipos de funcionário) e compartilham comportamento de verdade.
 * QUANDO NÃO USAR: para reaproveitar código. Herança amarra os dois para sempre — quando
 *                  o que você quer é só reusar, componha: guarde o outro objeto dentro.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `extends` e `super` ───
class Veiculo {
  constructor(protected placa: string, protected ano: number) {}

  descrever(): string { return `${this.placa} (${this.ano})`; }
  idade(anoAtual: number): number { return anoAtual - this.ano; }
}

class Caminhao extends Veiculo {
  constructor(placa: string, ano: number, private cargaEmToneladas: number) {
    super(placa, ano);                     // obrigatório antes de qualquer `this`
  }

  // `override` deixa claro que está reescrevendo — e o tsc confere se o método existe mesmo.
  override descrever(): string {
    return `${super.descrever()} — ${this.cargaEmToneladas}t`;
  }
}

console.log(new Veiculo('ABC-1234', 2018).descrever());
console.log(new Caminhao('XYZ-9876', 2020, 12).descrever());
console.log('idade herdada:', new Caminhao('XYZ-9876', 2020, 12).idade(2026), 'anos');

class ComErroDeDigitacao extends Veiculo {
  // @ts-expect-error — This member cannot have an 'override' modifier because it is not declared in the base class.
  override descreverr(): string { return 'nunca chamado'; }
}
console.log('a classe existe assim mesmo:', new ComErroDeDigitacao('A', 2020).descrever());

// ─── 2) `abstract`: o molde que não vira objeto ───
abstract class MeioDePagamento {
  constructor(protected valor: number) {}

  // Sem corpo: cada filha escreve o seu. Quem não escrever não compila.
  abstract taxa(): number;
  abstract nome(): string;

  // Com corpo: escrito uma vez, vale para todas.
  totalCobrado(): string {
    return `${this.nome().padEnd(8)} R$ ${(this.valor + this.taxa()).toFixed(2)}`;
  }
}

class Pix extends MeioDePagamento {
  nome(): string { return 'pix'; }
  taxa(): number { return 0; }
}

class Cartao extends MeioDePagamento {
  constructor(valor: number, private parcelas: number) { super(valor); }
  nome(): string { return `cartão${this.parcelas}x`; }
  taxa(): number { return this.valor * 0.049 * this.parcelas; }
}

for (const pagamento of [new Pix(200), new Cartao(200, 1), new Cartao(200, 3)])
  console.log(pagamento.totalCobrado());

// @ts-expect-error — Cannot create an instance of an abstract class.
console.log(new MeioDePagamento(200));

console.log('\nClasse abstrata é a classe que você NUNCA chama direto: `new MeioDePagamento`');
console.log('é erro. Ela existe só para ser estendida — é meia classe, e a outra metade cada');
console.log('filha completa. "Meio de pagamento" sozinho não é nada: o que existe no mundo é');
console.log('pix, cartão, boleto.');
console.log('\nE o método abstrato é só um CONTRATO: na mãe existe a assinatura (o nome, o que');
console.log('entra, o que sai) e mais nada. Cada filha é obrigada a escrever o corpo, e escreve');
console.log('do jeito dela — o Pix devolve taxa zero, o Cartão calcula por parcela. O contrato');
console.log('não manda no COMO; manda em existir e em bater a assinatura.');

// ─── 3) A filha é obrigada a cumprir o contrato ───
abstract class Relatorio {
  abstract linhas(): string[];
  imprimir(): void {
    console.log(`— ${this.constructor.name} —`);
    for (const linha of this.linhas()) console.log('  ' + linha);
  }
}

class RelatorioDeVendas extends Relatorio {
  linhas(): string[] { return ['Ana: R$ 1.630,00', 'Bruno: R$ 890,00']; }
}

new RelatorioDeVendas().imprimir();

// @ts-expect-error — Non-abstract class 'RelatorioVazio' does not implement inherited abstract member 'linhas'.
class RelatorioVazio extends Relatorio {}
console.log('rodando, a classe existe:', typeof RelatorioVazio);

console.log('\nO erro aparece na DECLARAÇÃO da classe, não quando alguém tenta usar. É a');
console.log('diferença entre `abstract` e um método que só lança "não implementado".');

// ═══ NA PRÁTICA ═══

// ─── 4) Polimorfismo: uma lista, vários comportamentos ───
abstract class Notificacao {
  constructor(protected destinatario: string) {}
  abstract enviar(mensagem: string): string;
}

class PorEmail extends Notificacao {
  enviar(mensagem: string): string { return `✉ ${this.destinatario}: ${mensagem}`; }
}
class PorSms extends Notificacao {
  enviar(mensagem: string): string { return `📱 ${this.destinatario}: ${mensagem.slice(0, 20)}…`; }
}
class PorPush extends Notificacao {
  constructor(destinatario: string, private aplicativo: string) { super(destinatario); }
  enviar(mensagem: string): string { return `🔔 ${this.aplicativo}/${this.destinatario}: ${mensagem}`; }
}

// O tipo da lista é o da mãe. Quem decide o que acontece é o objeto, não o `if`.
const canais: Notificacao[] = [
  new PorEmail('ana@loja.dev'),
  new PorSms('81 99999-0000'),
  new PorPush('ana', 'Loja'),
];

for (const canal of canais) console.log(canal.enviar('Seu pedido saiu para entrega'));

console.log('\nAcrescentar um canal novo é criar uma classe. Nenhum `switch` existente muda —');
console.log('é a diferença prática entre herança e uma união de literais com switch.');

// ─── 5) Quando NÃO herdar: componha ───
// Herança errada: "carrinho é uma lista" não é verdade — carrinho TEM uma lista.
class CarrinhoHerdado extends Array<{ nome: string; preco: number }> {
  total(): number { return this.reduce((s, i) => s + i.preco, 0); }
}
const herdado = new CarrinhoHerdado();
herdado.push({ nome: 'Caneca', preco: 19.9 });
herdado.length = 0;                                  // a API do Array vazou junto
console.log('herdando :', herdado.total().toFixed(2), '← alguém zerou o carrinho pelo length');

// Composição: o carrinho guarda a lista e mostra só o que ele promete.
class Carrinho {
  private itens: { nome: string; preco: number }[] = [];
  adicionar(nome: string, preco: number): void { this.itens.push({ nome, preco }); }
  total(): number { return this.itens.reduce((s, i) => s + i.preco, 0); }
  get quantidade(): number { return this.itens.length; }
}
const carrinho = new Carrinho();
carrinho.adicionar('Caneca', 19.9);
carrinho.adicionar('Caderno', 32.5);
console.log('compondo :', carrinho.total().toFixed(2), `(${carrinho.quantidade} itens)`);

// @ts-expect-error — Property 'length' does not exist on type 'Carrinho'.
carrinho.length = 0;

console.log('\nA pergunta é "É UM?", não "preciso dos métodos dele?". Carrinho não é lista.');

// ─── 6) Atributo abstrato: o contrato também vale para dado ───
// Não é só método. A mãe pode exigir um CAMPO e usá-lo, sem saber o valor de ninguém.
abstract class Documento {
  abstract readonly extensao: string;              // contrato: a filha declara o valor
  abstract readonly tamanhoMaximoMb: number;

  aceitar(nomeDoArquivo: string, mb: number): string {
    if (!nomeDoArquivo.endsWith(this.extensao)) return `recusado: ${nomeDoArquivo} não é ${this.extensao}`;
    if (mb > this.tamanhoMaximoMb) return `recusado: ${mb}MB passa de ${this.tamanhoMaximoMb}MB`;
    return `aceito: ${nomeDoArquivo}`;
  }
}

class Foto extends Documento {
  readonly extensao = '.jpg';                      // cada filha preenche do seu jeito
  readonly tamanhoMaximoMb = 5;
}

class Contrato extends Documento {
  readonly extensao = '.pdf';
  readonly tamanhoMaximoMb = 20;
}

console.log(new Foto().aceitar('perfil.jpg', 2));
console.log(new Foto().aceitar('perfil.jpg', 9));
console.log(new Contrato().aceitar('acordo.pdf', 12));
console.log(new Contrato().aceitar('acordo.jpg', 1));

// @ts-expect-error — Non-abstract class 'Anexo' incorrectly implements inherited abstract member.
class Anexo extends Documento { readonly extensao = '.zip'; }
console.log('faltou `tamanhoMaximoMb`, e o erro é na classe:', typeof Anexo);

console.log('\nO `aceitar` na mãe usa `this.extensao` sem saber qual é — ele confia no');
console.log('contrato. Método abstrato, atributo abstrato: a mesma ideia. A mãe diz O QUE');
console.log('tem que existir; a filha diz QUAL é.');

// ═══ PEGADINHAS ═══

// ─── 7) `super()` antes de qualquer `this` ───
class Base {
  constructor(protected nome: string) {}
}

class FilhaCorreta extends Base {
  private etiqueta: string;
  constructor(nome: string) {
    super(nome);                                     // primeiro
    this.etiqueta = `[${this.nome}]`;                // depois
  }
  mostrar(): string { return this.etiqueta; }
}

console.log(new FilhaCorreta('Ana').mostrar());

class FilhaErrada extends Base {
  private etiqueta: string;
  constructor(nome: string) {
    // @ts-expect-error — 'super' must be called before accessing 'this' in the constructor of a derived class.
    this.etiqueta = `[${nome}]`;
    super(nome);
  }
  mostrar(): string { return this.etiqueta; }
}

try {
  console.log(new FilhaErrada('Bruno').mostrar());
} catch (erro) {
  console.log('rodando  :', (erro as Error).message);
}

console.log('\nAqui o JavaScript é tão rígido quanto o TypeScript: antes do `super()`, o');
console.log('objeto ainda não existe. O tsc só avisa mais cedo.');

// ─── Resumo ───
// 1. `extends` herda campos e métodos; `super()` chama o construtor da mãe.
// 2. `override` documenta a reescrita e faz o tsc conferir que o método existe na mãe.
// 3. `abstract class` não vira objeto; `abstract método()` obriga a filha a escrever.
// 4. O erro de "faltou implementar" aparece na declaração da classe, não no uso.
// 5. Polimorfismo: lista tipada pela mãe, comportamento decidido pelo objeto.
// 6. Herança só quando "é um" for verdade. Para reusar código, componha.
