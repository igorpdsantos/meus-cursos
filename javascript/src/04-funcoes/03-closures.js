/**
 * Closures
 * Sessão 4 · Rodar: node src/04-funcoes/03-closures.js
 *
 * O QUE É: uma função que continua lembrando das variáveis do lugar onde nasceu,
 *          mesmo depois que a função de fora já terminou.
 * QUANDO USAR: guardar estado privado, cache, configurar uma função uma vez e reutilizar.
 * QUANDO NÃO USAR: quando um objeto simples resolve. Closure segurando dado grande
 *                  também segura memória — cuidado ao criar milhares delas.
 */

// ═══ ESSENCIAL ═══

// ─── 1) A variável sobrevive ao fim da função ───
function criarContador() {
  let total = 0;          // criarContador() já terminou, mas isto continua vivo
  return () => ++total;
}

const contar = criarContador();
console.log(contar(), contar(), contar());

const outro = criarContador();
console.log('Contador novo começa do zero:', outro());   // cada chamada tem seu próprio total

// ─── 2) Estado privado de verdade ───
function criarConta(saldoInicial) {
  let saldo = saldoInicial;      // inacessível de fora

  return {
    depositar: (valor) => (saldo += valor),
    consultar: () => saldo,
  };
}

const conta = criarConta(100);
conta.depositar(50);

console.log('Saldo:', conta.consultar());
console.log('Mexer direto?', conta.saldo);   // undefined

// ─── 3) Configurar uma vez, usar muitas ───
function criarFormatador(moeda) {
  return (valor) => `${moeda} ${valor.toFixed(2)}`;   // lembra da moeda
}

const emReal = criarFormatador('R$');
const emDolar = criarFormatador('US$');

console.log(emReal(1500), '|', emDolar(1500));

// ═══ NA PRÁTICA ═══

// ─── 4) Cache (memoização) ───
function comCache(fn) {
  const guardados = new Map();       // vive entre as chamadas

  return (arg) => {
    if (guardados.has(arg)) return `${guardados.get(arg)} (do cache)`;
    const resultado = fn(arg);
    guardados.set(arg, resultado);
    return resultado;
  };
}

const buscarCep = comCache((cep) => {
  console.log('  ...consultando a API para', cep);
  return `Rua Exemplo, ${cep}`;
});

console.log(buscarCep('50000-000'));
console.log(buscarCep('50000-000'));   // não consulta de novo

// ─── 5) Limite de tentativas por usuário ───
function criarControle(maximo) {
  const tentativas = new Map();

  return (usuario) => {
    const n = (tentativas.get(usuario) ?? 0) + 1;
    tentativas.set(usuario, n);
    return n > maximo ? `${usuario}: bloqueado` : `${usuario}: tentativa ${n}/${maximo}`;
  };
}

const login = criarControle(2);
console.log(login('ana'));
console.log(login('bruno'));
console.log(login('ana'));
console.log(login('ana'));

// ═══ PEGADINHAS ═══

// ─── 6) Closure dentro de loop: var quebra, let funciona ───
const comVar = [];
for (var i = 0; i < 3; i++) comVar.push(() => i);   // todas veem o MESMO i
console.log('var:', comVar.map((f) => f()));        // [3, 3, 3]

const comLet = [];
for (let j = 0; j < 3; j++) comLet.push(() => j);   // cada volta tem seu j
console.log('let:', comLet.map((f) => f()));        // [0, 1, 2]

// ─── Resumo ───
// 1. Closure = função + as variáveis do lugar onde ela nasceu, guardadas junto.
// 2. Cada chamada da função de fora cria um conjunto NOVO e independente de variáveis.
// 3. É assim que se faz dado privado em JS: sem `#`, sem classe, só escopo.
// 4. Serve para cache, contador, limite de tentativas e função pré-configurada.
// 5. Em loop, use `let`: com `var` todas as closures acabam vendo o mesmo valor final.
