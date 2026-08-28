/**
 * Decorators
 * Sessão 8 · Rodar: node src/08-extras/01-decorators.ts
 *
 * O QUE É: uma função que embrulha uma classe, um método ou uma propriedade para
 *          acrescentar comportamento sem mexer no código dela. O `@` é só o açúcar.
 * QUANDO USAR: quando um mesmo cuidado se repete em muitos métodos — log, medir tempo,
 *              exigir permissão. É o que NestJS, TypeORM e Angular fazem o tempo todo.
 * QUANDO NÃO USAR: em código seu, na maior parte das vezes. Um decorator esconde o que
 *                  acontece; uma função com nome, chamada na linha, é mais fácil de seguir.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Um decorator é só uma função que embrulha ───
// Sem o `@` nenhum: é isso que a sintaxe faz por baixo.
function comLog(original: (valor: number) => number, nome: string) {
  return (valor: number): number => {
    const resultado = original(valor);
    console.log(`  [log] ${nome}(${valor}) → ${resultado}`);
    return resultado;
  };
}

const dobrar = (n: number) => n * 2;
const dobrarComLog = comLog(dobrar, 'dobrar');

console.log('sem decorar:', dobrar(21));
console.log('decorado   :');
dobrarComLog(21);
dobrarComLog(5);

console.log('\nDecorator é exatamente isso: pega a função original, devolve outra que faz');
console.log('algo a mais e chama a de dentro. O `@` só muda de lugar quem escreve a chamada.');

// ─── 2) O mesmo, agora num método de classe ───
type Metodo = (...argumentos: never[]) => unknown;

function medirTempo<T extends Metodo>(original: T, nome: string): T {
  return function (this: unknown, ...argumentos: Parameters<T>) {
    const inicio = Date.now();
    const resultado = original.apply(this, argumentos);
    console.log(`  [tempo] ${nome} levou ${Date.now() - inicio}ms`);
    return resultado;
  } as T;
}

class Relatorio {
  private vendas = [1200, 890, 430, 275];

  total(): number { return this.vendas.reduce((a, b) => a + b, 0); }
  media(): number { return this.total() / this.vendas.length; }
}

// Aplicando na mão, sem `@`: troca o método no protótipo.
Relatorio.prototype.total = medirTempo(Relatorio.prototype.total, 'total');

const relatorio = new Relatorio();
console.log('total:', relatorio.total());
console.log('média:', relatorio.media().toFixed(2), '← chama `total` por dentro, e o log aparece');

console.log('\nÉ o que um `@medirTempo` em cima de `total()` faria — sem precisar de flag de');
console.log('compilador nenhuma, e sem esconder de onde vem o comportamento.');

// ─── 3) A sintaxe `@`, e por que ela não roda aqui ───
const exemplo = [
  '// tsconfig.json: "experimentalDecorators": true   (o formato legado, de TypeScript 4)',
  '',
  'function Congelado(alvo: Function) {',
  '  Object.freeze(alvo);',
  '  Object.freeze(alvo.prototype);',
  '}',
  '',
  '@Congelado',
  'class Configuracao {',
  '  @naoNegativo tentativas = 3;',
  '',
  '  @medirTempo',
  '  recarregar() { /* ... */ }',
  '}',
];
for (const linha of exemplo) console.log('  ' + linha);

console.log('\nEsta sintaxe NÃO roda com `node arquivo.ts`: o removedor de tipos do Node só');
console.log('apaga tipo, e decorator vira código. Para usar `@` de verdade é preciso compilar');
console.log('com o `tsc` (ou com ts-node / tsx), e é o que NestJS e TypeORM pedem no setup.');
console.log('Por isso este tópico ensina o mecanismo — que é o que importa — sem o açúcar.');

// ═══ NA PRÁTICA ═══

// ─── 4) O caso de verdade: exigir permissão ───
type Usuario = { nome: string; papel: 'admin' | 'comum' };

function exigirAdmin<T extends (...a: never[]) => string>(original: T, nome: string): T {
  return function (this: { usuario: Usuario }, ...argumentos: Parameters<T>): string {
    if (this.usuario.papel !== 'admin') return `403 — ${nome} exige admin`;
    return original.apply(this, argumentos) as string;
  } as T;
}

class PainelAdministrativo {
  usuario: Usuario;
  constructor(usuario: Usuario) { this.usuario = usuario; }
  apagarTudo(): string { return `tudo apagado por ${this.usuario.nome}`; }
  verRelatorio(): string { return `relatório para ${this.usuario.nome}`; }
}

PainelAdministrativo.prototype.apagarTudo = exigirAdmin(PainelAdministrativo.prototype.apagarTudo, 'apagarTudo');

const admin = new PainelAdministrativo({ nome: 'Ana', papel: 'admin' });
const comum = new PainelAdministrativo({ nome: 'Bruno', papel: 'comum' });

console.log('admin :', admin.apagarTudo());
console.log('comum :', comum.apagarTudo());
console.log('comum :', comum.verRelatorio(), '← este método não foi decorado');

console.log('\nCom `@exigirAdmin` em cima do método, a regra fica visível na linha de cima');
console.log('dele. É a razão real de existir do decorator: a política ao lado do código.');

// ─── 5) Decorator de classe: registrar num catálogo ───
const CATALOGO = new Map<string, new () => { executar(): string }>();

function registrar(nome: string) {
  return function <T extends new () => { executar(): string }>(Classe: T): T {
    CATALOGO.set(nome, Classe);
    return Classe;
  };
}

class EnviarEmail { executar(): string { return 'e-mail enviado'; } }
class GerarNota { executar(): string { return 'nota gerada'; } }

registrar('email')(EnviarEmail);          // `@registrar('email')` faria isto
registrar('nota')(GerarNota);

for (const [nome, Classe] of CATALOGO) console.log(`${nome.padEnd(6)} → ${new Classe().executar()}`);

console.log('\nÉ o desenho do `@Controller` do NestJS e do `@Entity` do TypeORM: o decorator');
console.log('não muda a classe, ele a ANOTA num registro que o framework lê depois.');

// ═══ PEGADINHAS ═══

// ─── 6) Dois formatos incompatíveis com o mesmo `@` ───
const formatos = [
  ['Legado (TS 4)', 'experimentalDecorators: true', '(alvo, chave, descritor)'],
  ['Padrão (TS 5+)', 'nenhuma flag: já é padrão', '(valor, contexto)'],
];

const largura = [18, 32, 26];
const linha = (colunas: string[]) => colunas.map((c, i) => c.padEnd(largura[i])).join('');
console.log(linha(['FORMATO', 'COMO LIGAR', 'O QUE A FUNÇÃO RECEBE']));
console.log(linha(['─'.repeat(16), '─'.repeat(30), '─'.repeat(24)]));
for (const f of formatos) console.log(linha(f));

console.log('\nA mesma sintaxe `@`, duas assinaturas que não se encaixam. Decorator copiado de');
console.log('um tutorial antigo quebra em projeto novo, e vice-versa. Antes de escrever um,');
console.log('confira qual formato o seu tsconfig está usando — e o que a biblioteca espera.');
console.log('Angular, NestJS e TypeORM ainda pedem o legado.');

// ─── Resumo ───
// 1. Decorator é uma função que embrulha classe, método ou propriedade — o `@` é açúcar.
// 2. O mecanismo é o de sempre: recebe o original, devolve outro que chama o de dentro.
// 3. `node arquivo.ts` não roda a sintaxe `@`: ela vira código, e exige `tsc`, ts-node ou tsx.
// 4. Vale quando o mesmo cuidado se repete em muitos métodos: log, tempo, permissão.
// 5. Decorator de classe costuma só REGISTRAR a classe — é o que os frameworks leem depois.
// 6. Existem dois formatos incompatíveis (legado e padrão); confira o do seu projeto.
