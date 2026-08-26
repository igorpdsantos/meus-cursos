/**
 * Herança com extends e super
 * Sessão 8 · Rodar: node src/08-classes/02-heranca-com-extends.js
 *
 * O QUE É: `extends` liga uma classe à outra e `super(...)` chama o constructor do pai.
 *          A cadeia de protótipos é montada pelo JS — você não escreve `Object.create` nem
 *          conserta `constructor`.
 * QUANDO USAR: quando o filho É um caso específico do pai: smartphone é um dispositivo.
 * QUANDO NÃO USAR: quando a relação é "tem um" ou as habilidades se combinam livremente —
 *                  aí composição encaixa melhor do que uma árvore de classes.
 */

// ═══ ESSENCIAL ═══

// ─── 1) extends + super: o filho aproveita tudo ───
class DispositivoEletronico {
  constructor(nome) {
    this.nome = nome;
    this.ligado = false;
  }
  ligar() {
    if (this.ligado) return `${this.nome} já ligado`;
    this.ligado = true;
    return `${this.nome} ligou`;
  }
  desligar() {
    if (!this.ligado) return `${this.nome} já desligado`;
    this.ligado = false;
    return `${this.nome} desligou`;
  }
}

class Smartphone extends DispositivoEletronico {
  constructor(nome, cor, modelo) {
    super(nome);                       // roda o constructor do pai: nome e ligado
    this.cor = cor;                    // só o que é específico do filho
    this.modelo = modelo;
  }
}

const s1 = new Smartphone('Samsung', 'Preto', 'Galaxy S23');

console.log(s1);
console.log(s1.ligar(), '|', s1.ligar());   // método do pai, funcionando no filho

// ─── 2) O que o extends fez sozinho ───
class Base { oi() { return 'oi do pai'; } }
class Filha extends Base {}                 // sem constructor: o do pai é usado direto

const f = new Filha();

console.log(f.oi());
console.log('Cadeia ligada:', Object.getPrototypeOf(Filha.prototype) === Base.prototype);
console.log('constructor certo:', f.constructor === Filha);
console.log('instanceof:', f instanceof Filha, '|', f instanceof Base);
// Na mão seriam 3 linhas: Pai.call(this), Object.create(Pai.prototype) e o conserto do
// constructor. O `extends` faz as três, e ainda liga a classe pai à filha.

// ─── 3) super também funciona dentro de método ───
class Aparelho {
  constructor(nome) { this.nome = nome; }
  ficha() { return `${this.nome}`; }
}

class Notebook extends Aparelho {
  constructor(nome, ram) { super(nome); this.ram = ram; }
  ficha() { return `${super.ficha()} — ${this.ram}GB de RAM`; }   // usa o do pai e acrescenta
}

console.log(new Notebook('Dell', 16).ficha());
console.log(new Aparelho('Dell').ficha(), '← o pai continua intacto');

// ═══ NA PRÁTICA ═══

// ─── 4) Cada filho acrescenta o que é seu ───
class Dispositivo {
  constructor(nome) { this.nome = nome; this.ligado = false; }
  ligar() { this.ligado = true; return `${this.nome} ligou`; }
}

class Tablet extends Dispositivo {
  constructor(nome, polegadas) { super(nome); this.polegadas = polegadas; }
  girarTela() { return `${this.nome} girou a tela de ${this.polegadas}"`; }
}

class Celular extends Dispositivo {
  constructor(nome, operadora) { super(nome); this.operadora = operadora; }
  ligarPara(numero) { return `${this.nome} discou ${numero} pela ${this.operadora}`; }
}

console.log(new Tablet('iPad', 11).girarTela());
console.log(new Celular('Moto G', 'Vivo').ligarPara('9999-0000'));

// ─── 5) A mesma chamada, respostas diferentes ───
class Produto {
  constructor(nome, preco) { this.nome = nome; this.preco = preco; }
  frete() { return 20; }
  resumo() { return `${this.nome}: R$ ${(this.preco + this.frete()).toFixed(2)}`; }
}

class Digital extends Produto { frete() { return 0; } }                    // download não tem frete
class Pesado extends Produto { frete() { return this.preco * 0.1; } }

const catalogo = [new Produto('Caneca', 30), new Digital('Ebook', 40), new Pesado('Geladeira', 3000)];

for (const item of catalogo) console.log(item.resumo());
// `resumo` está escrito uma vez só, no pai — mas chama o `frete` de cada filho.

// ─── 6) Obrigar o filho a implementar ───
class Relatorio {
  constructor(titulo) {
    if (new.target === Relatorio) throw new Error('Relatorio é base: use uma subclasse');
    this.titulo = titulo;
  }
  gerar() { throw new Error(`${this.constructor.name} precisa implementar gerar()`); }
}

class RelatorioVendas extends Relatorio {
  gerar() { return `${this.titulo}: 3 vendas`; }
}

console.log(new RelatorioVendas('Agosto').gerar());
try { new Relatorio('X'); } catch (e) { console.log('Base:', e.message); }
try { new (class Incompleto extends Relatorio {})('Y').gerar(); }
catch (e) { console.log('Faltou implementar:', e.message); }

// ═══ PEGADINHAS ═══

// ─── 7) `this` só existe depois do super() ───
class Pai { constructor(nome) { this.nome = nome; } }

class FilhoErrado extends Pai {
  constructor(nome, cor) {
    try { this.cor = cor; } catch (e) { console.log('Antes do super:', e.constructor.name); }
    super(nome);
    this.cor = cor;                    // agora sim
  }
}

console.log(new FilhoErrado('TV', 'preta'));
// Se o filho tem constructor, o `super()` é obrigatório e vem primeiro. Sem constructor
// próprio, o JS repassa os argumentos para o pai automaticamente.

// ─── 8) Campo de classe do filho é atribuído DEPOIS do super() ───
class Motor {
  constructor() { this.status = this.descrever(); }   // chama método que o filho sobrescreveu
  descrever() { return 'motor genérico'; }
}

class MotorTurbo extends Motor {
  potencia = 300;                                     // só existe depois do super() terminar
  descrever() { return `turbo de ${this.potencia}cv`; }
}

console.log(new MotorTurbo());
console.log('O pai chamou descrever() antes de `potencia` existir — daí o undefined.');

// ─── Resumo ───
// 1. `class Filho extends Pai` liga a cadeia; `super(...)` roda o constructor do pai.
// 2. Sem constructor no filho, os argumentos vão direto para o pai.
// 3. `super.metodo()` chama a versão do pai de dentro do método sobrescrito.
// 4. Método escrito no pai chama a versão sobrescrita do filho — é isso que dá polimorfismo.
// 5. `this` só existe depois do `super()`, e campos do filho são atribuídos depois dele.
