/**
 * Métodos de instância e estáticos
 * Sessão 9 · Rodar: node src/08-classes/04-metodos-estaticos.js
 *
 * O QUE É: método de instância pertence ao objeto criado com `new` e enxerga os dados dele;
 *          método `static` pertence à CLASSE, roda sem instanciar e não vê `this.nome` nenhum.
 * QUANDO USAR: `static` para o que é do tipo, não do objeto — validar, formatar, contar,
 *              e criar instâncias a partir de outro formato.
 * QUANDO NÃO USAR: `static` quando o comportamento depende dos dados de um objeto específico.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Um pertence ao objeto, o outro à classe ───
class Temperatura {
  constructor(celsius) { this.celsius = celsius; }
  emFahrenheit() { return this.celsius * 1.8 + 32; }        // instância: usa this.celsius
  static celsiusParaF(c) { return c * 1.8 + 32; }           // estático: recebe tudo por parâmetro
}

console.log('Sem instanciar:', Temperatura.celsiusParaF(30));
console.log('Com instância: ', new Temperatura(30).emFahrenheit());

// ─── 2) O estático não tem acesso aos dados da instância ───
class Produto {
  constructor(nome) { this.nome = nome; }
  daInstancia() { return `instância: ${this.nome}`; }
  static daClasse() { return `estático: ${this.name} (e this.nome é ${this.nome})`; }
}

console.log(new Produto('Caneca').daInstancia());
console.log(Produto.daClasse());        // `this` é a classe: tem `name`, não tem `nome` de objeto
console.log('Dentro do static, this é a classe — não existe objeto para consultar.');

// ─── 3) Campo estático: valor único, da classe inteira ───
class Pedido {
  static taxa = 0.05;                                       // um valor para todos
  static criados = 0;

  constructor(valor) {
    this.valor = valor;
    Pedido.criados++;                                       // conta na classe, não no objeto
  }
  totalComTaxa() { return this.valor * (1 + Pedido.taxa); }
}

const primeiro = new Pedido(100);
new Pedido(200);

console.log('Taxa da casa:', Pedido.taxa, '| pedidos criados:', Pedido.criados);
console.log('Total do primeiro com taxa:', primeiro.totalComTaxa());

// ═══ NA PRÁTICA ═══

// ─── 4) Construtor alternativo com nome ───
class Usuario {
  constructor(nome, email) { this.nome = nome; this.email = email; }

  static deJSON(texto) {                                    // Usuario.deJSON(...) explica sozinho
    const { nome, email } = JSON.parse(texto);
    return new Usuario(nome, email);
  }
  static anonimo() { return new Usuario('Visitante', 'sem@email.com'); }
}

console.log(Usuario.deJSON('{"nome":"Ana","email":"ana@empresa.com"}'));
console.log(Usuario.anonimo());
// O constructor é um só; estáticos dão vários "jeitos de nascer", cada um com nome claro.

// ─── 5) Validar antes de existir objeto ───
class Cpf {
  constructor(numero) {
    if (!Cpf.valido(numero)) throw new Error('CPF inválido');
    this.numero = Cpf.formatar(numero);
  }
  static valido(numero) { return String(numero).replace(/\D/g, '').length === 11; }
  static formatar(numero) {
    const d = String(numero).replace(/\D/g, '');
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }
}

console.log('Checagem no formulário:', Cpf.valido('123'), Cpf.valido('12345678900'));
console.log(new Cpf('12345678900'));
// A validação roda ANTES de existir objeto — por isso precisa ser estática.

// ─── 6) A classe guardando o registro de tudo ───
class Sessao {
  static ativas = [];

  constructor(usuario) { this.usuario = usuario; Sessao.ativas.push(this); }
  encerrar() { Sessao.ativas = Sessao.ativas.filter((s) => s !== this); }

  static quantas() { return Sessao.ativas.length; }
}

const s1 = new Sessao('Ana');
new Sessao('Bruno');
s1.encerrar();

console.log('Sessões ativas:', Sessao.quantas(), Sessao.ativas.map((s) => s.usuario));

// ═══ PEGADINHAS ═══

// ─── 7) Cada um só responde no seu lugar ───
class Relatorio {
  constructor(titulo) { this.titulo = titulo; }
  gerar() { return `gerando ${this.titulo}`; }
  static formatos() { return ['pdf', 'csv']; }
}

const r = new Relatorio('Vendas');

console.log(r.gerar(), '|', Relatorio.formatos());

try { r.formatos(); } catch (e) { console.log('Estático pela instância:', e.message); }
try { Relatorio.gerar(); } catch (e) { console.log('Instância pela classe:', e.message); }

// ─── 8) Estáticos são herdados, e `this` é quem chamou ───
class Base {
  static criar() { return new this('feito por ' + this.name); }   // `this` = a classe da chamada
  constructor(origem) { this.origem = origem; }
}

class Especial extends Base {}

console.log(Base.criar());
console.log(Especial.criar(), '| virou Especial?', Especial.criar() instanceof Especial);

const solto = Base.criar;
try { solto(); } catch (e) { console.log('Método estático solto:', e.constructor.name); }
// Tirou o método da classe? Perdeu o `this`, igual acontece com método de instância.

// ─── Resumo ───
// 1. Método de instância precisa de `new` e enxerga os dados daquele objeto.
// 2. `static` pertence à classe: roda sem instanciar e não tem dados de instância para ler.
// 3. Dentro de um `static`, `this` é a própria classe — útil para campos estáticos.
// 4. Os usos clássicos: validar, formatar, contar e criar instância a partir de outro formato.
// 5. Estático não é chamado pela instância nem instância pela classe — cada um no seu lugar.
