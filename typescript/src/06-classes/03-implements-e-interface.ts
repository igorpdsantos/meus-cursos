/**
 * implements e interface na classe
 * Sessão 6 · Rodar: node --experimental-transform-types src/06-classes/03-implements-e-interface.ts
 *
 * O QUE É: `implements` diz que a classe cumpre um contrato descrito por uma interface.
 *          Diferente de `extends`, não vem nada pronto: a classe escreve tudo.
 * QUANDO USAR: quando várias classes sem nada em comum precisam ser usadas do mesmo jeito
 *              — três repositórios, três formas de exportar, três gateways de pagamento.
 * QUANDO NÃO USAR: quando não há duas implementações. Interface para uma classe só é
 *                  cerimônia — o próprio formato da classe já é o contrato.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `implements`: o contrato conferido ───
interface Exportador {
  extensao: string;
  exportar(linhas: string[][]): string;
}

class ExportadorCsv implements Exportador {
  extensao = 'csv';
  exportar(linhas: string[][]): string { return linhas.map((l) => l.join(';')).join('\n'); }
}

class ExportadorJson implements Exportador {
  extensao = 'json';
  exportar(linhas: string[][]): string { return JSON.stringify(linhas); }
}

const dados = [['sku', 'preco'], ['CAN-01', '19.90'], ['CAD-02', '32.50']];
for (const exportador of [new ExportadorCsv(), new ExportadorJson()] as Exportador[])
  console.log(`.${exportador.extensao}:`, exportador.exportar(dados).split('\n')[0], '…');

// @ts-expect-error — Class 'ExportadorTorto' incorrectly implements interface 'Exportador'.
class ExportadorTorto implements Exportador {
  extensao = 'txt';
  // falta o método `exportar`
}
console.log('a classe existe assim mesmo:', new ExportadorTorto().extensao);

// ─── 2) `implements` não dá nada de graça ───
interface Somavel {
  somar(valor: number): void;
  total(): number;
}

class Caixa implements Somavel {
  private acumulado = 0;                      // tudo escrito aqui: nada vem da interface
  somar(valor: number): void { this.acumulado += valor; }
  total(): number { return this.acumulado; }
}

const caixa = new Caixa();
caixa.somar(19.9);
caixa.somar(32.5);
console.log('caixa:', caixa.total().toFixed(2));

console.log('\n`extends` HERDA implementação; `implements` só CONFERE que ela existe. Uma classe');
console.log('estende no máximo uma classe, mas implementa quantas interfaces quiser.');

// ─── 3) Várias interfaces na mesma classe ───
interface Identificavel { readonly id: number; }
interface Serializavel { paraJson(): string; }
interface Comparavel<T> { comparar(outro: T): number; }

class Pedido implements Identificavel, Serializavel, Comparavel<Pedido> {
  constructor(readonly id: number, private total: number) {}

  paraJson(): string { return JSON.stringify({ id: this.id, total: this.total }); }
  comparar(outro: Pedido): number { return this.total - outro.total; }
}

const pedidos = [new Pedido(3, 89.9), new Pedido(1, 240), new Pedido(2, 19.9)];
pedidos.sort((a, b) => a.comparar(b));

for (const pedido of pedidos) console.log(pedido.paraJson());

// @ts-expect-error — Cannot assign to 'id' because it is a read-only property.
pedidos[0].id = 99;

console.log('\nCada interface descreve UMA capacidade. É o contrário de uma classe-mãe gorda');
console.log('que tenta prever tudo — e encaixa muito melhor em código que vai crescer.');

// ═══ NA PRÁTICA ═══

// ─── 4) Trocar a implementação sem tocar em quem usa ───
interface RepositorioDeAlunos {
  salvar(nome: string): number;
  listar(): string[];
}

class RepositorioEmMemoria implements RepositorioDeAlunos {
  private alunos: string[] = [];
  salvar(nome: string): number { return this.alunos.push(nome); }
  listar(): string[] { return [...this.alunos]; }
}

class RepositorioComLog implements RepositorioDeAlunos {
  constructor(private interno: RepositorioDeAlunos) {}       // embrulha outro repositório
  salvar(nome: string): number {
    console.log(`  [log] salvando ${nome}`);
    return this.interno.salvar(nome);
  }
  listar(): string[] { return this.interno.listar(); }
}

// A função só conhece a interface: não sabe nem se importa qual das duas chegou.
function cadastrarTurma(repositorio: RepositorioDeAlunos, nomes: string[]): void {
  for (const nome of nomes) repositorio.salvar(nome);
  console.log('  turma:', repositorio.listar().join(', '));
}

console.log('sem log:');
cadastrarTurma(new RepositorioEmMemoria(), ['Ana', 'Bruno']);
console.log('com log:');
cadastrarTurma(new RepositorioComLog(new RepositorioEmMemoria()), ['Carla', 'Diego']);

console.log('\nÉ o mesmo desenho do banco em `node/08-sequelize`: trocar MySQL por memória');
console.log('nos testes não muda uma linha de quem chama.');

// ─── 5) A interface como tipo do construtor ───
interface Forma { area(): number; }

class Quadrado implements Forma {
  constructor(private lado: number) {}
  area(): number { return this.lado ** 2; }
}
class Circulo implements Forma {
  constructor(private raio: number) {}
  area(): number { return Math.PI * this.raio ** 2; }
}

// `new (...) => Forma` é o tipo de uma CLASSE que produz Forma, não de uma forma pronta.
type ConstrutorDeForma = new (medida: number) => Forma;

const fabricas: Record<string, ConstrutorDeForma> = { quadrado: Quadrado, circulo: Circulo };

function criar(tipo: string, medida: number): string {
  const Classe = fabricas[tipo];
  if (!Classe) return `${tipo}: desconhecido`;
  return `${tipo.padEnd(9)} área ${new Classe(medida).area().toFixed(2)}`;
}

console.log(criar('quadrado', 4));
console.log(criar('circulo', 4));
console.log(criar('triangulo', 4));

// ═══ PEGADINHAS ═══

// ─── 6) `implements` não muda o tipo do que a classe entrega ───
interface ComNome { nome: string; }

class Cliente implements ComNome {
  nome = 'Ana';
  telefone = '81 99999-0000';        // campo a mais: a interface não proíbe
}

const cliente = new Cliente();
console.log('pelo tipo da classe:', cliente.nome, cliente.telefone);

const comoInterface: ComNome = cliente;
console.log('pelo tipo da interface:', comoInterface.nome);

// @ts-expect-error — Property 'telefone' does not exist on type 'ComNome'.
console.log(comoInterface.telefone);

console.log('\n`implements` é um piso, não um teto: a classe pode ter mais. O que limita é o');
console.log('TIPO DA VARIÁVEL — e é justamente essa limitação que faz a troca ser segura.');

// ─── 7) Interface não descreve o construtor ───
interface ComIdentificador { id: number; }

// Isto descreve a INSTÂNCIA. Não há como exigir "toda classe que implementa tem
// que receber um id no construtor": a interface não enxerga o construtor.
class PorParametro implements ComIdentificador {
  constructor(public id: number) {}
}
class PorSorteio implements ComIdentificador {
  id = 42;                                    // não recebe nada, e cumpre igual
}

console.log('por parâmetro:', new PorParametro(7).id);
console.log('por sorteio  :', new PorSorteio().id);

console.log('\nPara exigir a forma do construtor, o tipo é outro: `new (id: number) => T`,');
console.log('como o `ConstrutorDeForma` do bloco 5. Interface só fala da instância.');

// ─── Resumo ───
// 1. `implements` confere o contrato; ao contrário de `extends`, não traz implementação.
// 2. Uma classe estende no máximo uma classe, e implementa quantas interfaces quiser.
// 3. Interfaces pequenas (uma capacidade cada) envelhecem melhor que uma classe-mãe grande.
// 4. Programar contra a interface é o que deixa trocar a implementação nos testes.
// 5. `new (x: T) => U` é o tipo de uma classe; interface descreve só a instância.
// 6. A classe pode ter mais do que a interface pede — quem limita é o tipo da variável.
