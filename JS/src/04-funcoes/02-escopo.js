/**
 * Escopo: quem enxerga quem
 * Sessão 4 · Rodar: node src/04-funcoes/02-escopo.js
 *
 * O QUE É: o escopo é definido por ONDE você escreveu o código, não por onde ele é chamado.
 *          De dentro se enxerga o que está fora; de fora não se enxerga o de dentro.
 * QUANDO USAR: é a base de closures, de módulos e de esconder dado privado.
 * QUANDO NÃO USAR: n/a — é comportamento da linguagem. O que se evita é variável global.
 */

// ═══ ESSENCIAL ═══

// ─── 1) De dentro para fora sempre funciona ───
const empresa = 'Loja XPTO';

function emitirNota(valor) {
  const imposto = valor * 0.1;                  // só existe dentro desta função
  return `${empresa}: R$ ${valor} (imposto R$ ${imposto})`;   // enxerga o de fora
}

console.log(emitirNota(100));
// console.log(imposto);   ← ReferenceError: de fora não se vê o de dentro

// ─── 2) Vale onde foi ESCRITA, não de onde foi CHAMADA ───
const moeda = 'BRL';

function mostrarMoeda() { return moeda; }   // "moeda" foi resolvida aqui, ao escrever

function outroLugar() {
  const moeda = 'USD';                      // outra variável, sem relação com a de cima
  return mostrarMoeda();
}

console.log(outroLugar());   // BRL

// ─── 3) Shadowing: nome de dentro cobre o de fora ───
const status = 'global';

function processar() {
  const status = 'local';    // cobre o de fora, só aqui dentro
  return status;
}

console.log(processar(), '→ lá fora continua', status);

// ═══ NA PRÁTICA ═══

// ─── 4) Esconder o estado de um módulo ───
function criarContador() {
  let total = 0;             // ninguém de fora alcança

  return {
    registrar() { total++; },
    quantos() { return total; },
  };
}

const acessos = criarContador();
acessos.registrar();
acessos.registrar();

console.log('Acessos:', acessos.quantos());
console.log('Alcança o total direto?', acessos.total);   // undefined — protegido

// ─── 5) Por que variável global dá dor de cabeça ───
let usuarioLogado = 'Ana';        // qualquer função pode trocar isto

const trocar = () => { usuarioLogado = 'Bruno'; };
const saudar = () => `Olá, ${usuarioLogado}`;

console.log(saudar());
trocar();                         // efeito invisível de longe
console.log(saudar(), '← mudou e o saudar() não faz ideia de por quê');

const saudarBem = (usuario) => `Olá, ${usuario}`;   // o dado entra pela porta da frente
console.log(saudarBem('Carla'));

// ═══ PEGADINHAS ═══

// ─── 6) O bloco também é escopo ───
if (true) {
  const dentroDoIf = 'existe só aqui';
  console.log(dentroDoIf);
}
// console.log(dentroDoIf);   ← ReferenceError

console.log('let e const respeitam as chaves { }; var não respeitava — por isso saiu de uso.');

// ─── Resumo ───
// 1. Escopo vem de onde o código foi ESCRITO, não de onde foi chamado.
// 2. De dentro enxerga-se o de fora; nunca o contrário.
// 3. Nome repetido no escopo interno cobre o externo (shadowing) só ali dentro.
// 4. Variável dentro de função é privada — é assim que se esconde estado.
// 5. Global torna o bug difícil de achar: passe o dado por parâmetro.
