/**
 * class: o básico
 * Sessão 8 · Rodar: node src/08-classes/01-class-basico.js
 *
 * O QUE É: a sintaxe do JS para criar um molde de objetos — o `constructor` define os dados e
 *          os métodos vão automaticamente para o prototype, sem você escrever uma linha disso.
 * QUANDO USAR: quando vários objetos compartilham os mesmos dados e comportamentos: produto,
 *              usuário, pedido, carrinho.
 * QUANDO NÃO USAR: para um objeto só (use um literal) ou quando o projeto já resolve tudo com
 *                  factory function — misturar padrões é que confunde.
 */

// ═══ ESSENCIAL ═══

// ─── 1) A mesma Pessoa, com e sem class ───
class Pessoa {
  constructor(nome, sobrenome) {                 // roda no `new`, monta os dados
    this.nome = nome;
    this.sobrenome = sobrenome;
  }
  falar() { return `${this.nome} está falando`; }        // método fica DENTRO da classe
  comer() { return `${this.nome} está comendo`; }
}

function Pessoa2(nome, sobrenome) { this.nome = nome; this.sobrenome = sobrenome; }
Pessoa2.prototype.falar = function () { return `${this.nome} está falando`; };
Pessoa2.prototype.comer = function () { return `${this.nome} está comendo`; };

console.log(new Pessoa('Luiz', 'Miranda').falar());
console.log(new Pessoa2('Luiz', 'Miranda').falar());
// Mesmo resultado. A class junta construtor e métodos num bloco só, sem repetir `prototype`.

// ─── 2) O JS coloca os métodos no prototype sozinho ───
class Produto {
  constructor(nome) { this.nome = nome; }
  etiqueta() { return `[${this.nome}]`; }
}

const p1 = new Produto('Caneca');

console.log('Dado é do objeto:', p1.hasOwnProperty('nome'));
console.log('Método é do objeto?', p1.hasOwnProperty('etiqueta'));      // false: está no protótipo
console.log('Onde ele mora:', Object.getOwnPropertyNames(Produto.prototype));
console.log('Compartilhado?', p1.etiqueta === new Produto('Outra').etiqueta);
// É o mesmo `__proto__` do console do navegador: constructor, falar, comer... tudo junto ali.

// ─── 3) O constructor deixa o objeto pronto para usar ───
class Pedido {
  constructor(cliente, itens = [], status = 'aberto') {   // valor padrão direto na assinatura
    this.cliente = cliente.trim();                        // já normaliza o que entra
    this.itens = itens;
    this.status = status;
    this.criadoEm = '2026-08-19';
  }
  total() { return this.itens.reduce((s, i) => s + i.preco, 0); }
}

const pedido = new Pedido('  Ana  ', [{ preco: 50 }, { preco: 30 }]);

console.log(pedido);
console.log('Total:', pedido.total());

// ═══ NA PRÁTICA ═══

// ─── 4) Métodos que devolvem `this` encadeiam ───
class Carrinho {
  constructor() { this.itens = []; }
  add(nome, preco) { this.itens.push({ nome, preco }); return this; }
  remover(nome) { this.itens = this.itens.filter((i) => i.nome !== nome); return this; }
  total() { return this.itens.reduce((s, i) => s + i.preco, 0); }
}

const carrinho = new Carrinho().add('Teclado', 249.9).add('Mouse', 89.5).remover('Mouse');

console.log(carrinho.itens, '| Total: R$', carrinho.total().toFixed(2));

// ─── 5) O objeto nunca nasce inválido ───
class Cliente {
  constructor(nome, email) {
    if (!nome?.trim()) throw new Error('nome é obrigatório');
    if (!email?.includes('@')) throw new Error('e-mail inválido');
    this.nome = nome.trim();
    this.email = email.toLowerCase();
  }
}

console.log(new Cliente('Ana', 'ANA@Empresa.com'));

try { new Cliente('', 'ana@empresa.com'); }
catch (erro) { console.log('Barrado na porta:', erro.message); }

// ─── 6) Várias instâncias viram relatório ───
class Venda {
  constructor(vendedor, valor) { this.vendedor = vendedor; this.valor = valor; }
  comissao() { return this.valor * 0.1; }
}

const vendas = [new Venda('Ana', 1200), new Venda('Bruno', 800), new Venda('Ana', 500)];

console.log('Comissões:', vendas.map((v) => `${v.vendedor}: ${v.comissao().toFixed(2)}`));
console.log('Faturamento:', vendas.reduce((s, v) => s + v.valor, 0));

// ═══ PEGADINHAS ═══

// ─── 7) `new` é obrigatório e a classe não é içada ───
class Usuario { constructor(nome) { this.nome = nome; } }

try { Usuario('Ana'); }
catch (erro) { console.log('Sem new:', erro.message); }        // avisa na hora, não falha calado

try { new Categoria(); }
catch (erro) { console.log('Antes de declarar:', erro.message); }
class Categoria {}                                             // declarada só aqui embaixo

// ─── 8) O método perde o `this` ao virar callback ───
class Contador {
  constructor() { this.valor = 0; }
  somar() { this.valor++; return this.valor; }
  somarSeguro = () => { this.valor++; return this.valor; };   // campo de classe: arrow amarrada
}

const c = new Contador();
const executar = (fn) => { try { return fn(); } catch (e) { return 'quebrou'; } };

console.log('Método solto:', executar(c.somar));
console.log('Com bind:    ', executar(c.somar.bind(c)));
console.log('Campo arrow: ', executar(c.somarSeguro));
// Passou o método para setTimeout/addEventListener/map? Amarre com bind ou use campo arrow.

// ─── Resumo ───
// 1. `constructor` recebe os argumentos do `new` e monta os dados em `this`.
// 2. Método escrito dentro da classe vai para o prototype sozinho — nada de escrever prototype.
// 3. Dado é de cada objeto; método é um só, compartilhado por todas as instâncias.
// 4. Validar no constructor garante que objeto inválido nunca chega a existir.
// 5. Esquecer o `new` dá erro na hora, e o método solto perde o `this`: use `bind` ou campo arrow.
