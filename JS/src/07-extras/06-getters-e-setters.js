/**
 * get e set dentro de defineProperty
 * Sessão 7 · Rodar: node src/07-extras/06-getters-e-setters.js
 *
 * O QUE É: em vez de guardar um valor, a propriedade guarda duas funções — uma que roda ao ler
 *          (`get`) e outra que roda ao escrever (`set`). Quem usa nem percebe: parece campo normal.
 * QUANDO USAR: campo derivado de outros, normalizar/validar o que entra, campo antigo que precisa
 *              continuar funcionando apontando para o novo.
 * QUANDO NÃO USAR: em objeto literal e classe, escreva `get nome() {}` direto — é a mesma coisa,
 *                  sem a verbosidade. `defineProperty` é para quando o campo é montado em tempo
 *                  de execução, ou quando você precisa mexer nos outros flags junto.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Descritor de dado x descritor de acesso ───
const pedido = { itens: 3 };

Object.defineProperty(pedido, 'resumo', {
  get() { return `${this.itens} itens`; },      // roda a cada leitura, com `this` = pedido
  enumerable: true,
});

console.log(pedido.resumo, '| sem parênteses: é lido como campo');

try {
  Object.defineProperty(pedido, 'x', { value: 1, get() { return 2; } });
} catch (erro) {
  console.log('Não dá para misturar:', erro.message);   // ou value/writable, ou get/set
}

// ─── 2) set: interceptar a escrita ───
const pessoa = { nome: 'Ana', sobrenome: 'Silva' };

Object.defineProperty(pessoa, 'nomeCompleto', {
  get() { return `${this.nome} ${this.sobrenome}`; },
  set(valor) { [this.nome, this.sobrenome] = valor.split(' '); },   // quebra e distribui
  enumerable: true,
});

console.log(pessoa.nomeCompleto);
pessoa.nomeCompleto = 'Bruno Almeida';          // parece atribuição, mas roda o set
console.log(pessoa.nome, '|', pessoa.sobrenome);

// ─── 3) Só get = somente leitura ───
const conta = { saldo: 1000 };

Object.defineProperty(conta, 'saldoFormatado', {
  get() { return `R$ ${this.saldo.toFixed(2)}`; },
  enumerable: true,
});

conta.saldoFormatado = 'R$ 999999,00';          // sem `set`, a escrita é ignorada em silêncio
console.log(conta.saldoFormatado);              // (em módulo ESM isso lança TypeError)

// ═══ NA PRÁTICA ═══

// ─── 4) Normalizar o que entra ───
const cadastro = {};

Object.defineProperties(cadastro, {
  _email: { value: '', writable: true },        // campo interno, escondido das listagens
  email: {
    get() { return this._email; },
    set(v) { this._email = String(v).trim().toLowerCase(); },
    enumerable: true,
  },
});

cadastro.email = '  ANA@Empresa.COM  ';
console.log(cadastro.email, '| o que vai para o banco já está limpo');

// ─── 5) Validar antes de deixar entrar ───
const produto = { nome: 'Monitor', _preco: 0 };

Object.defineProperty(produto, 'preco', {
  get() { return this._preco; },
  set(v) {
    if (typeof v !== 'number' || Number.isNaN(v) || v < 0) {
      return console.log('Recusado:', v);       // o objeto nunca chega a ficar inválido
    }
    this._preco = v;
  },
  enumerable: true,
});

produto.preco = 1199;
produto.preco = -50;
produto.preco = 'caro';
console.log('Preço guardado:', produto.preco);

// ─── 6) Campo renomeado sem quebrar quem usa o nome antigo ───
const config = { tempoLimiteMs: 3000 };

Object.defineProperty(config, 'timeout', {      // nome antigo continua funcionando
  get() { console.log('[aviso] "timeout" virou "tempoLimiteMs"'); return this.tempoLimiteMs; },
  set(v) { console.log('[aviso] use "tempoLimiteMs"'); this.tempoLimiteMs = v; },
});

console.log('Código velho leu:', config.timeout);
config.timeout = 5000;
console.log('Campo novo:', config.tempoLimiteMs);

// ═══ PEGADINHAS ═══

// ─── 7) Setter que chama a si mesmo trava tudo ───
const item = { nome: 'Teclado' };

Object.defineProperty(item, 'quantidade', {
  set(v) { this.quantidade = v; },              // isto chama o próprio set, para sempre
});

try {
  item.quantidade = 2;
} catch (erro) {
  console.log('Loop infinito:', erro.constructor.name);
}
console.log('Guarde em OUTRO campo (_quantidade), nunca no mesmo nome.');

// ─── 8) O get roda a CADA leitura ───
const relatorio = { linhas: [1, 2, 3] };
let vezes = 0;

Object.defineProperty(relatorio, 'total', {
  get() { vezes++; return this.linhas.reduce((s, n) => s + n, 0); },
});

console.log(relatorio.total, relatorio.total, relatorio.total);
console.log('O get rodou', vezes, 'vezes — se o cálculo for caro, guarde o resultado antes.');

// ─── Resumo ───
// 1. `get` roda ao ler, `set` roda ao escrever — para quem usa, parece campo comum.
// 2. Ou o descritor tem `value`/`writable`, ou tem `get`/`set`. Misturar lança TypeError.
// 3. Sem `set`, a propriedade vira somente leitura (silencioso fora do modo estrito).
// 4. Guarde o valor real em outro campo (`_email`), senão o setter chama a si mesmo.
// 5. Serve para normalizar, validar e manter nome antigo vivo — mas o get roda toda vez que lê.
