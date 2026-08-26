/**
 * Sobrescrever métodos do pai
 * Sessão 8 · Rodar: node src/08-classes/03-sobrescrever-metodos.js
 *
 * O QUE É: escrever no filho um método com o MESMO nome do pai. Não existe palavra-chave: o
 *          nome igual já basta, porque a busca para no primeiro que encontrar na cadeia.
 * QUANDO USAR: quando o filho faz a mesma coisa de um jeito diferente — frete grátis, desconto
 *              próprio, formato de relatório específico.
 * QUANDO NÃO USAR: quando o filho faz algo DIFERENTE do pai. Aí é outro método, com outro nome:
 *                  nome igual promete comportamento equivalente para quem chama.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Mesmo nome: o filho ganha ───
class Funcionario {
  constructor(nome, salario) { this.nome = nome; this.salario = salario; }
  bonus() { return this.salario * 0.1; }
}

class Gerente extends Funcionario {
  bonus() { return this.salario * 0.3; }        // mesmo nome, regra própria
}

console.log('Funcionário:', new Funcionario('Ana', 5000).bonus());
console.log('Gerente:    ', new Gerente('Bruno', 5000).bonus());
console.log('O pai continua com a regra dele — nada foi alterado lá.');

// ─── 2) Aproveitar o do pai com super ───
class Item {
  constructor(nome, preco) { this.nome = nome; this.preco = preco; }
  etiqueta() { return `${this.nome}: R$ ${this.preco.toFixed(2)}`; }
}

class ItemPromocional extends Item {
  constructor(nome, preco, validade) { super(nome, preco); this.validade = validade; }
  etiqueta() { return `${super.etiqueta()} (até ${this.validade})`; }   // reaproveita e acrescenta
}

console.log(new ItemPromocional('Fone', 199, '30/09').etiqueta());
console.log(new Item('Fone', 199).etiqueta());

// ─── 3) Quem decide é o objeto, na hora da chamada ───
class Animal {
  som() { return '...'; }
  apresentar() { return `Eu faço: ${this.som()}`; }   // escrito UMA vez, no pai
}

class Cachorro extends Animal { som() { return 'au au'; } }
class Gato extends Animal { som() { return 'miau'; } }

for (const bicho of [new Animal(), new Cachorro(), new Gato()]) console.log(bicho.apresentar());
// `apresentar` não sabe quais filhos existem. Ele chama `this.som()` e o objeto responde.

// ═══ NA PRÁTICA ═══

// ─── 4) Sobrescrever toString, herdado de Object ───
class Produto {
  constructor(nome, preco) { this.nome = nome; this.preco = preco; }
  toString() { return `${this.nome} — R$ ${this.preco.toFixed(2)}`; }
}

const caneca = new Produto('Caneca', 15);

console.log(`${caneca}`);                       // template usa o toString automaticamente
console.log('Sem sobrescrever seria:', {}.toString());

// ─── 5) Regra de negócio por tipo ───
class Assinatura {
  constructor(cliente, valor) { this.cliente = cliente; this.valor = valor; }
  desconto() { return 0; }
  cobrar() { return `${this.cliente}: R$ ${(this.valor - this.desconto()).toFixed(2)}`; }
}

class Anual extends Assinatura { desconto() { return this.valor * 0.2; } }
class Estudante extends Assinatura { desconto() { return this.valor * 0.5; } }

for (const a of [new Assinatura('Ana', 100), new Anual('Bruno', 100), new Estudante('Carla', 100)]) {
  console.log(a.cobrar());
}
// Nasceu um plano novo? Crie a subclasse. `cobrar` não muda uma linha.

// ─── 6) Acrescentar sem substituir ───
class Repositorio {
  salvar(registro) { return `gravado: ${JSON.stringify(registro)}`; }
}

class RepositorioComLog extends Repositorio {
  salvar(registro) {
    console.log('[log] salvando', registro.id);   // faz o extra...
    return super.salvar(registro);                // ...e delega o trabalho real
  }
}

console.log(new RepositorioComLog().salvar({ id: 7, nome: 'Ana' }));

// ═══ PEGADINHAS ═══

// ─── 7) Nome errado não avisa nada ───
class Pai {
  calcular() { return 'cálculo do pai'; }
}

class FilhoComTypo extends Pai {
  calcularr() { return 'cálculo do filho'; }      // dois "r": criou um método NOVO
}

const filho = new FilhoComTypo();

console.log(filho.calcular());                    // continua vindo do pai, calado
console.log('Métodos do filho:', Object.getOwnPropertyNames(FilhoComTypo.prototype));
// O JS não tem @Override: nome errado vira método novo em vez de erro.

// ─── 8) Mudar a assinatura quebra quem chama pelo pai ───
class Notificador {
  enviar(mensagem) { return `enviando: ${mensagem}`; }
}

class NotificadorSMS extends Notificador {
  enviar(numero, mensagem) { return `SMS para ${numero}: ${mensagem}`; }   // exige 2 argumentos
}

function despachar(notificador) { return notificador.enviar('pedido aprovado'); }

console.log(despachar(new Notificador()));
console.log(despachar(new NotificadorSMS()));     // o segundo argumento nunca chega
console.log('Sobrescreveu? Mantenha os mesmos parâmetros e o mesmo tipo de retorno.');

// ─── Resumo ───
// 1. Mesmo nome no filho substitui o do pai — sem palavra-chave, é só o nome.
// 2. A busca para no primeiro que achar: filho, depois pai, depois acima.
// 3. `super.metodo()` chama a versão do pai de dentro da sobrescrita.
// 4. Método do pai que chama `this.outro()` executa a versão do filho: é o polimorfismo.
// 5. Nome errado cria método novo sem aviso, e assinatura diferente quebra quem usa o pai.
