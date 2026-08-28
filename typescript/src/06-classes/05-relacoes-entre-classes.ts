/**
 * Relações entre classes
 * Sessão 6 · Rodar: node --experimental-transform-types src/06-classes/05-relacoes-entre-classes.ts
 *
 * O QUE É: como duas classes se ligam quando nenhuma herda da outra — uma guarda a outra
 *          (associação), guarda algo que vive sem ela (agregação) ou algo que morre com ela
 *          (composição). E o pilar que decide tudo isso: depender do contrato, não da classe.
 * QUANDO USAR: sempre. Na prática, quase toda ligação entre classes é uma dessas três —
 *              herança é a exceção rara.
 * QUANDO NÃO USAR: não force o nome. Chamar de "agregação" ou "composição" não muda o código;
 *                  o que muda é quem cria o objeto e quem manda nele.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Os quatro pilares, em vinte linhas ───
abstract class Funcionario {                        // ABSTRAÇÃO: o essencial, sem detalhe
  constructor(public readonly nome: string, private salarioBase: number) {}

  // ENCAPSULAMENTO: o salário só sai por aqui, já com a regra aplicada
  get salario(): number { return this.salarioBase + this.bonus(); }

  protected abstract bonus(): number;               // POLIMORFISMO: cada filha responde diferente
}

class Vendedor extends Funcionario {                // HERANÇA: é um Funcionario
  constructor(nome: string, salario: number, private vendas: number) { super(nome, salario); }
  protected bonus(): number { return this.vendas * 0.05; }
}

class Gerente extends Funcionario {
  protected bonus(): number { return 1500; }
}

const folha: Funcionario[] = [new Vendedor('Ana', 3000, 20000), new Gerente('Bruno', 8000)];
for (const pessoa of folha) console.log(pessoa.nome, '→ R$', pessoa.salario.toFixed(2));

// @ts-expect-error — Property 'salarioBase' is private and only accessible within class 'Funcionario'.
console.log(folha[0].salarioBase);

// ─── 2) Associação: uma classe conhece a outra ───
class Cliente {
  constructor(public readonly nome: string, public readonly cpf: string) {}
}

class Pedido {
  // O pedido GUARDA um cliente. Os dois existem sozinhos; só há uma referência entre eles.
  constructor(public readonly numero: number, public readonly cliente: Cliente) {}

  resumo(): string { return `Pedido ${this.numero} · ${this.cliente.nome}`; }
}

const ana = new Cliente('Ana', '111.222.333-44');
const pedido = new Pedido(1001, ana);

console.log(pedido.resumo());
console.log('o cliente continua existindo fora do pedido:', ana.cpf);

// ─── 3) Agregação × composição: quem morre junto? ───
class Aluno {
  constructor(public readonly nome: string) {}
}

// AGREGAÇÃO: a turma recebe alunos que já existiam. Fechou a turma, os alunos continuam lá.
class Turma {
  private alunos: Aluno[] = [];
  matricular(aluno: Aluno): void { this.alunos.push(aluno); }
  get lista(): string[] { return this.alunos.map((a) => a.nome); }
}

// COMPOSIÇÃO: o item nasce dentro do pedido e não faz sentido fora dele.
class ItemDoPedido {
  constructor(public readonly produto: string, public readonly quantidade: number) {}
}

class Carrinho {
  private itens: ItemDoPedido[] = [];
  adicionar(produto: string, quantidade: number): void {
    this.itens.push(new ItemDoPedido(produto, quantidade));   // quem cria é o dono
  }
  get total(): number { return this.itens.reduce((soma, i) => soma + i.quantidade, 0); }
}

const turma = new Turma();
const bruno = new Aluno('Bruno');
turma.matricular(bruno);
console.log('turma:', turma.lista, '· o aluno existe fora dela:', bruno.nome);

const carrinho = new Carrinho();
carrinho.adicionar('Caneca', 2);
carrinho.adicionar('Camiseta', 1);
console.log('itens no carrinho:', carrinho.total, '· nenhum ItemDoPedido existe fora dele');

// ═══ NA PRÁTICA ═══

// ─── 4) Inversão de dependência: dependa da interface ───
interface Notificador {
  enviar(para: string, texto: string): void;
}

class NotificadorEmail implements Notificador {
  enviar(para: string, texto: string): void { console.log(`[e-mail] ${para}: ${texto}`); }
}

class NotificadorSms implements Notificador {
  enviar(para: string, texto: string): void { console.log(`[sms] ${para}: ${texto}`); }
}

// O serviço não sabe QUAL notificador é: ele recebe um pelo construtor (injeção).
class ServicoDeCobranca {
  constructor(private notificador: Notificador) {}

  cobrar(cliente: string, valor: number): void {
    this.notificador.enviar(cliente, `Sua fatura de R$ ${valor.toFixed(2)} venceu hoje.`);
  }
}

new ServicoDeCobranca(new NotificadorEmail()).cobrar('ana@exemplo.com', 199.9);
new ServicoDeCobranca(new NotificadorSms()).cobrar('(31) 9999-0000', 199.9);

// No teste, entra um dublê — e o serviço nem percebe.
const enviados: string[] = [];
const espiao: Notificador = { enviar: (para, texto) => { enviados.push(`${para}|${texto}`); } };
new ServicoDeCobranca(espiao).cobrar('teste', 10);
console.log('o teste conferiu sem enviar nada:', enviados.length, 'mensagem');

// ─── 5) A mesma classe, dependendo do concreto: o que dói ───
class EmailDireto {
  enviar(para: string, texto: string): void { console.log(`[e-mail] ${para}: ${texto}`); }
}

class ServicoAmarrado {
  private notificador = new EmailDireto();          // criou aqui dentro: ninguém troca

  cobrar(cliente: string, valor: number): void {
    this.notificador.enviar(cliente, `Fatura de R$ ${valor.toFixed(2)}`);
  }
}

new ServicoAmarrado().cobrar('ana@exemplo.com', 50);
console.log('para testar isto sem mandar e-mail, só mexendo na classe — é o acoplamento.');

console.log('\nA diferença é uma linha: quem CRIA a dependência. Criou lá dentro, amarrou;');
console.log('recebeu pelo construtor, dá para trocar — em produção, em teste, em outro projeto.');

// ═══ PEGADINHAS ═══

// ─── 6) Agregação vaza a referência ───
class Playlist {
  constructor(private musicas: string[]) {}         // guardou o array de FORA
  get quantas(): number { return this.musicas.length; }
}

const minhasMusicas = ['Aquarela', 'Construção'];
const playlist = new Playlist(minhasMusicas);
minhasMusicas.push('Wave');                         // mexeu no array de fora...
console.log('a playlist mudou sozinha:', playlist.quantas, '← eram 2');

// A cópia no construtor corta o vínculo: agora a lista é dela.
class PlaylistSegura {
  private musicas: string[];
  constructor(musicas: string[]) { this.musicas = [...musicas]; }
  get quantas(): number { return this.musicas.length; }
}

const outras = ['Aquarela', 'Construção'];
const segura = new PlaylistSegura(outras);
outras.push('Wave');
console.log('a segura não mudou :', segura.quantas);

// ─── Resumo ───
// 1. Abstração, encapsulamento, herança e polimorfismo: os quatro pilares cabem numa classe só.
// 2. Associação é a ligação simples — uma classe guarda a referência da outra.
// 3. Agregação: o objeto vem de fora e sobrevive ao dono. Composição: nasce dentro e morre junto.
// 4. Inversão de dependência = receber a interface pelo construtor, em vez de dar `new` dentro.
// 5. Quem recebe a dependência é testável sem gambiarra: basta passar um dublê.
// 6. Guardar um array recebido de fora é guardar a referência — copie se a lista tem que ser sua.
