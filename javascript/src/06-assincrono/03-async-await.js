/**
 * async e await — Promise escrita de cima para baixo
 * Sessão 7 · Rodar: node src/06-assincrono/03-async-await.js
 *
 * O QUE É: `await` pausa a função até a Promise responder; `async` marca a função que pode pausar.
 * QUANDO USAR: como padrão para consumir Promise, principalmente quando um passo depende do
 *              anterior, quando há erro para tratar com `try/catch`, ou quando o código tem
 *              `if`/`for` no meio da espera.
 * QUANDO NÃO USAR: quando é um passo só e o retorno já vai direto para outro lugar — `.then`
 *                  cabe numa linha. E nunca `await` em fila para tarefas independentes:
 *                  isso soma as esperas em vez de somar as forças. Use `Promise.all`.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O mesmo .then, sem encadear ───
const buscarUsuario = (id) => new Promise((r) => setTimeout(() => r({ id, nome: 'Ana' }), 20));

(async () => {
  const usuario = await buscarUsuario(7);       // a função pausa aqui, o resto do programa não
  console.log('1) Usuário:', usuario.nome);
})();

// ─── 2) try/catch no lugar do .catch ───
const cobrar = (valor) => new Promise((res, rej) =>
  setTimeout(() => (valor <= 500 ? res('aprovado') : rej(new Error('limite excedido'))), 20));

(async () => {
  try {
    console.log('2) Compra de 300:', await cobrar(300));
    console.log('2) Compra de 900:', await cobrar(900));   // lança aqui
  } catch (erro) {
    console.log('2) Recusado:', erro.message);
  } finally {
    console.log('2) Fecha a tela de pagamento');
  }
})();

// ─── 3) Toda função async devolve uma Promise ───
async function total() {
  return 249.9;                                  // valor comum, sem Promise
}

console.log('3) O retorno é:', total());         // Promise { 249.9 }
total().then((v) => console.log('3) Com then:', v));
(async () => console.log('3) Com await:', await total()))();

// ═══ NA PRÁTICA ═══

// ─── 4) Em fila x em paralelo ───
const carregar = (nome) => new Promise((r) => setTimeout(() => r(nome), 60));

(async () => {
  const inicio = Date.now();
  await carregar('perfil');
  await carregar('pedidos');                     // só começa quando o de cima termina
  console.log('4) Em fila:', Date.now() - inicio, 'ms');

  const inicio2 = Date.now();
  const [a, b] = await Promise.all([carregar('perfil'), carregar('pedidos')]);
  console.log('4) Em paralelo:', a, b, Date.now() - inicio2, 'ms');
})();
// Só use await em fila quando o segundo pedido depende da resposta do primeiro.

// ─── 5) Repetir até dar certo (retry com espera) ───
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
let tentativa = 0;

const instavel = () => new Promise((res, rej) =>
  (++tentativa < 3 ? rej(new Error('rede caiu')) : res('dados do relatório')));

(async () => {
  for (let i = 1; i <= 4; i++) {
    try {
      console.log('5) OK na tentativa', i, '→', await instavel());
      break;
    } catch (erro) {
      console.log('5) Tentativa', i, 'falhou:', erro.message);
      await esperar(20 * i);                     // espera mais a cada falha
    }
  }
})();

// ─── 6) Percorrer lista esperando cada item ───
const salvar = (id) => new Promise((r) => setTimeout(() => r('pedido ' + id), 15));

(async () => {
  for (const id of [1, 2, 3]) console.log('6) Em fila:', await salvar(id));  // for...of espera
  console.log('6) De uma vez:', await Promise.all([1, 2, 3].map(salvar)));
})();
// `forEach` NÃO espera await — ou for...of, ou Promise.all(map).

// ─── 7) O mesmo trecho nas duas formas ───
const buscarPedido = (id) => new Promise((r) => setTimeout(() => r({ id, valor: 250 }), 20));
const buscarCliente = (id) => new Promise((r) => setTimeout(() => r({ id, nome: 'Ana' }), 20));

buscarPedido(7)                                          // .then: uma linha por etapa
  .then((pedido) => buscarCliente(pedido.id))
  .then((cliente) => console.log('7) then: ', cliente.nome))
  .catch((erro) => console.log('7) erro:', erro.message));

(async () => {                                           // await: leitura de cima para baixo
  try {
    const pedido = await buscarPedido(7);
    const cliente = await buscarCliente(pedido.id);      // depende do passo anterior
    console.log('7) await:', cliente.nome);
  } catch (erro) {
    console.log('7) erro:', erro.message);               // o try/catch faz o papel do .catch
  }
})();
// Regra prática: um passo só e sem tratamento de erro → `.then` resolve. Dois ou mais passos,
// `if`/`for` no meio, ou erro para tratar → `async/await`. Tarefas independentes → `Promise.all`
// (que também é chamado com `await`, e continua sendo paralelo).

// ═══ PEGADINHAS ═══

// ─── 8) Esquecer o await ───
const precoFinal = async () => 99.9;

(async () => {
  console.log('8) Sem await:', precoFinal());                 // Promise, não número
  console.log('8) Sem await + 10:', precoFinal() + 10);       // vira texto grudado
  console.log('8) Com await + 10:', (await precoFinal()) + 10);
})();

// ─── Resumo ───
// 1. `await` só existe dentro de `async` (ou no topo de um módulo ESM).
// 2. Função `async` sempre devolve Promise, mesmo retornando número.
// 3. `try/catch` em volta do `await` é o `.catch` da corrente de Promise.
// 4. `await` em sequência é lento: se os pedidos não dependem um do outro, use `Promise.all`.
// 5. Esqueceu o `await`? Você está manipulando a Promise, não o valor dela.
// 6. Escolha rápida: 1 passo → `.then`; passos encadeados, `if`/`for` ou `try/catch` → `await`;
//    tarefas independentes → `await Promise.all([...])`.
