/**
 * Promise — o valor que ainda não chegou
 * Sessão 7 · Rodar: node src/06-assincrono/02-promises.js
 *
 * O QUE É: um objeto que representa um resultado futuro. Ou ele chega (`resolve`),
 *          ou dá erro (`reject`) — e só acontece uma vez.
 * QUANDO USAR: qualquer coisa que demora e não é sua: rede, banco, arquivo, timer. Consumir
 *              com `.then` compensa quando é um passo só, ou quando você entrega a promise
 *              para outra função em vez de esperar por ela aqui.
 * QUANDO NÃO USAR: em código que já tem a resposta na mão — Promise só adiciona espera. E evite
 *                  encadear três, quatro `.then`: a partir daí `async/await` lê melhor
 *                  (veja 03-async-await).
 */

// ═══ ESSENCIAL ═══

// ─── 1) Criar e consumir ───
const buscarCep = (cep) => new Promise((resolve, reject) => {
  setTimeout(() => {                                  // finge a demora da rede
    if (cep.length === 8) resolve({ cep, cidade: 'São Paulo' });
    else reject(new Error('CEP inválido'));
  }, 20);
});

buscarCep('01310100')
  .then((endereco) => console.log('1) Achou:', endereco))
  .catch((erro) => console.log('1) Falhou:', erro.message))
  .finally(() => console.log('1) Esconde o loading (roda dando certo ou errado)'));

// ─── 2) Os três estados ───
const pendente = new Promise((resolve) => setTimeout(resolve, 50));

console.log('2) Recém-criada:', pendente);            // pending — ainda não tem valor
Promise.resolve('já pronta').then((v) => console.log('2) resolvida:', v));
Promise.reject(new Error('já falhou')).catch((e) => console.log('2) rejeitada:', e.message));

// ─── 3) Encadear: o fim do callback hell ───
const passo = (nome, valor) => new Promise((r) => setTimeout(() => {
  console.log('3) passo', nome);
  r(valor);
}, 10));

passo('login', { id: 7 })
  .then((usuario) => passo('carrinho do usuário ' + usuario.id, ['Mouse']))
  .then((itens) => passo('pagamento de ' + itens.length + ' item', 'pago'))
  .then((status) => console.log('3) Fim:', status));
// Cada `.then` devolve uma Promise nova — por isso dá para empilhar sem aninhar.

// ═══ NA PRÁTICA ═══

// ─── 4) Promise.all: tudo ao mesmo tempo ───
const carregar = (nome, ms) => new Promise((r) => setTimeout(() => r(nome), ms));

Promise.all([carregar('perfil', 30), carregar('pedidos', 20), carregar('cupons', 25)])
  .then((tudo) => console.log('4) Chegou junto:', tudo));   // ordem do array, não de chegada
// Leva o tempo do mais lento (30ms), não a soma (75ms). Se UM falhar, o all inteiro falha.

// ─── 5) Promise.allSettled: quero todos, mesmo com falha ───
const relatorio = (nome, ok) => new Promise((res, rej) =>
  setTimeout(() => (ok ? res(nome) : rej(new Error('sem acesso a ' + nome))), 15));

Promise.allSettled([relatorio('vendas', true), relatorio('folha', false)])
  .then((r) => console.log('5)', r.map((x) => `${x.status}: ${x.value ?? x.reason.message}`)));
// Use quando uma falha não pode derrubar o resto do painel.

// ─── 6) Promise.race: timeout ───
const requisicao = new Promise((r) => setTimeout(() => r('resposta da API'), 200));
const limite = new Promise((_, rej) => setTimeout(() => rej(new Error('demorou demais')), 60));

Promise.race([requisicao, limite])
  .then((v) => console.log('6)', v))
  .catch((e) => console.log('6) Timeout:', e.message));    // quem terminar primeiro decide

// ═══ PEGADINHAS ═══

// ─── 7) Esquecer o return dentro do .then ───
const dobrar = (n) => new Promise((r) => setTimeout(() => r(n * 2), 10));

Promise.resolve(5)
  .then((n) => { dobrar(n); })              // sem return: a corrente não espera
  .then((v) => console.log('7) Sem return:', v));            // undefined

Promise.resolve(5)
  .then((n) => dobrar(n))                   // com return, o próximo recebe o valor
  .then((v) => console.log('7) Com return:', v));

// ─── 8) Erro sem .catch some ───
const arriscada = () => Promise.reject(new Error('falha no pagamento'));

arriscada().catch((e) => console.log('8) Tratado:', e.message));
// Sem esse .catch, o Node derruba o processo com UnhandledPromiseRejection.

// ─── Resumo ───
// 1. Promise é resultado futuro: resolve (deu certo) ou reject (deu erro), uma vez só.
// 2. `.then` para o sucesso, `.catch` para o erro, `.finally` para o que roda sempre.
// 3. Todo `.then` devolve outra Promise — encadeie em vez de aninhar callback.
// 4. `all` = tudo ou nada em paralelo; `allSettled` = quero todos os resultados; `race` = timeout.
// 5. Sempre devolva (`return`) a Promise dentro do `.then`, e sempre termine com `.catch`.
// 6. `.then` para um passo; corrente longa, `if`/`for` ou erro para tratar → `async/await`,
//    onde o `try/catch` faz o papel do `.catch`.
