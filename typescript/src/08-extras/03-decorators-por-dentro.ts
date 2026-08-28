/**
 * Decorators por dentro
 * Sessão 8 · Rodar: node src/08-extras/03-decorators-por-dentro.ts
 *
 * O QUE É: a continuação do tópico anterior — quando o decorator roda, como parametrizá-lo,
 *          em que ordem eles se empilham e o que cada um dos cinco lugares recebe.
 * QUANDO USAR: quando você já entendeu "é uma função que embrulha" e precisa mexer em
 *              framework que usa `@` — ler o que ele faz, ou escrever o seu.
 * QUANDO NÃO USAR: para resolver um caso só. Um decorator só se paga a partir do momento em
 *                  que o mesmo cuidado se repete em muitas classes.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O decorator roda na definição da classe, não no `new` ───
function registrar(alvo: Function): void {
  console.log(`  [decorator] rodei agora, definindo ${alvo.name}`);
}

console.log('antes de definir a classe');

class Cupom {
  codigo: string;
  constructor(codigo: string) {
    this.codigo = codigo;
    console.log(`  [construtor] rodei agora, criando ${this.codigo}`);
  }
}
registrar(Cupom);                                   // é o que `@registrar` faria aqui

console.log('depois de definir a classe');
new Cupom('BEMVINDO10');
new Cupom('FRETEGRATIS');

console.log('\nO decorator rodou UMA vez, na definição. O construtor rodou a cada `new`.');
console.log('É por isso que decorator serve para registrar, congelar e trocar método — coisas');
console.log('de classe. Nada do que ele faz depende de qual instância vai existir depois.');

// ─── 2) Fábrica de decoradores: quando ele precisa de argumento ───
// Um decorator não recebe argumento próprio. Quem recebe é a função que DEVOLVE o decorator.
function comPrefixo(prefixo: string) {
  return function (original: (texto: string) => string): (texto: string) => string {
    return (texto: string) => original(`${prefixo} ${texto}`);
  };
}

const gritar = (texto: string) => texto.toUpperCase();

const gritarUrgente = comPrefixo('[URGENTE]')(gritar);      // `@comPrefixo('[URGENTE]')`
const gritarAviso = comPrefixo('[aviso]')(gritar);

console.log(gritarUrgente('estoque acabou'));
console.log(gritarAviso('estoque baixo'));

console.log('\nDuas chamadas em sequência: a de fora escolhe a configuração, a de dentro');
console.log('recebe o alvo. `@Column({ nullable: true })` do TypeORM é exatamente isto.');

// ─── 3) Empilhar decoradores: a ordem que confunde todo mundo ───
function passo(nome: string) {
  console.log(`  fábrica ${nome} avaliada`);        // acontece de cima para baixo
  return function (original: () => string): () => string {
    console.log(`  decorator ${nome} aplicado`);    // acontece de baixo para cima
    return () => `${nome}(${original()})`;
  };
}

console.log('montando:');
const base = () => 'valor';
// `@passo('A')` em cima de `@passo('B')` vira passo('A')(passo('B')(base)).
const decorado = passo('A')(passo('B')(base));

console.log('resultado:', decorado());
console.log('\nAvaliação de cima para baixo, aplicação de baixo para cima — como embrulhar');
console.log('presente: o papel de dentro entra primeiro, mas quem você vê é o de fora.');

// ═══ NA PRÁTICA ═══

// ─── 4) Decorator de propriedade: normalizar o que entra ───
// Ele não recebe o valor — recebe o nome do campo. Quem guarda o valor é o par get/set.
function somenteMaiusculas<T extends object>(prototipo: T, campo: string): void {
  const valores = new WeakMap<object, string>();
  Object.defineProperty(prototipo, campo, {
    get(this: object) { return valores.get(this) ?? ''; },
    set(this: object, novo: string) { valores.set(this, novo.trim().toUpperCase()); },
  });
}

class Etiqueta {
  // `declare` porque o campo tem que ficar SÓ no protótipo: um `sigla = ''` aqui criaria
  // uma propriedade própria na instância e passaria por cima do get/set instalado.
  declare sigla: string;
  constructor(sigla: string) { this.sigla = sigla; }
}
somenteMaiusculas(Etiqueta.prototype, 'sigla');     // é o que `@somenteMaiusculas` faria

const etiqueta = new Etiqueta('  frágil ');
console.log('guardado:', `"${etiqueta.sigla}"`, '← entrou com espaço e minúscula');
etiqueta.sigla = 'urgente';
console.log('trocado :', `"${etiqueta.sigla}"`);

// ─── 5) Decorator de parâmetro: ele só anota, quem age é outro ───
// O de parâmetro recebe a POSIÇÃO. Sozinho ele não faz nada: guarda a marca para o método.
const obrigatorios = new Map<string, number[]>();

function obrigatorio(metodo: string, indice: number): void {
  obrigatorios.set(metodo, [...(obrigatorios.get(metodo) ?? []), indice]);
}

function conferirObrigatorios<T extends (...a: never[]) => unknown>(original: T, nome: string): T {
  return function (this: unknown, ...argumentos: Parameters<T>) {
    for (const indice of obrigatorios.get(nome) ?? []) {
      const valor = argumentos[indice];
      if (valor === undefined || valor === '') {
        return `erro: o parâmetro ${indice} de ${nome} é obrigatório`;
      }
    }
    return original.apply(this, argumentos);
  } as T;
}

class Cadastro {
  criar(nome: string, apelido?: string): string {   // `@obrigatorio` iria antes de `nome`
    return `criado: ${nome}${apelido ? ` (${apelido})` : ''}`;
  }
}
obrigatorio('criar', 0);
Cadastro.prototype.criar = conferirObrigatorios(Cadastro.prototype.criar, 'criar');

const cadastro = new Cadastro();
console.log(cadastro.criar('Ana', 'aninha'));
console.log(cadastro.criar(''));

console.log('\nÉ assim que o `@Inject()` do NestJS funciona: o decorator de parâmetro anota,');
console.log('e o decorator de classe (ou o framework) lê a anotação na hora de montar.');

// ─── 6) Os cinco lugares, e o que cada um recebe ───
const tabela = [
  ['onde',        'recebe',                              'serve para'],
  ['classe',      'o construtor',                        'registrar, congelar, trocar a classe'],
  ['método',      'a função + o nome',                   'log, tempo, permissão, cache'],
  ['propriedade', 'o protótipo + o nome do campo',       'validar e normalizar o valor'],
  ['parâmetro',   'o protótipo, o método e a posição',   'anotar (injeção, validação)'],
  ['acessador',   'o get/set + o nome',                  'o mesmo do método, no get/set'],
];
for (const [onde, recebe, serve] of tabela) {
  console.log(`  ${onde.padEnd(12)} ${recebe.padEnd(38)} ${serve}`);
}

console.log('\nOs argumentos exatos mudam entre o formato legado (`experimentalDecorators`) e');
console.log('o padrão do TypeScript 5. O que não muda: todo decorator é uma função que roda');
console.log('na definição e devolve — ou não — algo no lugar do que recebeu.');

// ═══ PEGADINHAS ═══

// ─── 7) Decorator de propriedade não enxerga o valor ───
function tentarLerValor<T extends object>(prototipo: T, campo: string): void {
  const descritor = Object.getOwnPropertyDescriptor(prototipo, campo);
  console.log(`  no decorator, ${campo} vale:`, descritor?.value, '← nem existe ainda');
}

class Assinatura {
  plano = 'anual';                                  // só ganha valor no `new`
}
tentarLerValor(Assinatura.prototype, 'plano');

console.log('  na instância, plano vale:', new Assinatura().plano);

console.log('\nA propriedade só passa a existir quando o construtor roda. O decorator roda');
console.log('antes disso — por isso ele instala um get/set, em vez de mexer no valor.');

// ─── Resumo ───
// 1. Decorator roda uma vez, na definição da classe; construtor roda a cada `new`.
// 2. Decorator com argumento é uma FÁBRICA: uma função que devolve o decorator.
// 3. Empilhados, avaliam de cima para baixo e aplicam de baixo para cima.
// 4. O de propriedade recebe o nome do campo, não o valor — instale um get/set.
// 5. O de parâmetro só anota a posição; quem age é o método ou o framework que lê a anotação.
// 6. Classe, método, propriedade, parâmetro e acessador: os cinco lugares, mesmo mecanismo.
