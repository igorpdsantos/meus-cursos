/**
 * Promise.all, allSettled, race e any
 * Sessão 9 · Rodar: node src/06-assincrono/04-promise-combinadores.js
 *
 * O QUE É: os quatro jeitos de esperar VÁRIAS promises ao mesmo tempo, cada um com uma regra
 *          diferente para decidir quando terminou e o que fazer se alguma falhar.
 * QUANDO USAR: sempre que os pedidos não dependem um do outro — esperar um por vez é desperdício.
 * QUANDO NÃO USAR: quando o segundo pedido precisa da resposta do primeiro. Aí é `await` em fila.
 */

// ═══ ESSENCIAL ═══

// ─── 1) all: tudo ou nada ───
const carregar = (nome, ms) => new Promise((r) => setTimeout(() => r(nome), ms));

(async () => {
  const inicio = Date.now();
  const [perfil, pedidos, cupons] = await Promise.all([
    carregar('perfil', 60), carregar('pedidos', 30), carregar('cupons', 45),
  ]);
  console.log('1)', perfil, pedidos, cupons, '|', Date.now() - inicio, 'ms');
  // Resultado na ordem do ARRAY, não na ordem de chegada. Tempo = o do mais lento (60), não 135.

  try {
    await Promise.all([carregar('ok', 20), Promise.reject(new Error('token expirado'))]);
  } catch (erro) {
    console.log('1) Uma falhou, o all inteiro falhou:', erro.message);
  }
})();

// ─── 2) allSettled: nunca rejeita ───
const relatorio = (nome, ok) => new Promise((res, rej) =>
  setTimeout(() => (ok ? res(nome) : rej(new Error('sem acesso a ' + nome))), 20));

(async () => {
  const resultados = await Promise.allSettled([
    relatorio('vendas', true), relatorio('folha', false), relatorio('estoque', true),
  ]);

  console.log('2)', resultados.map((r) => r.status));
  console.log('2) Deu certo:', resultados.filter((r) => r.status === 'fulfilled').map((r) => r.value));
  console.log('2) Falhou:  ', resultados.filter((r) => r.status === 'rejected').map((r) => r.reason.message));
})();

// ─── 3) race x any: o primeiro a terminar x o primeiro que dá certo ───
const rapidaComErro = () => new Promise((_, rej) => setTimeout(() => rej(new Error('falhou logo')), 20));
const lentaComSucesso = () => new Promise((r) => setTimeout(() => r('cheguei depois'), 60));

(async () => {
  try {
    await Promise.race([rapidaComErro(), lentaComSucesso()]);
  } catch (erro) {
    console.log('3) race:', erro.message, '← quem terminar primeiro decide, mesmo dando erro');
  }

  console.log('3) any: ', await Promise.any([rapidaComErro(), lentaComSucesso()]));
  // any ignora as falhas e espera o primeiro SUCESSO.
})();

// ═══ NA PRÁTICA ═══

// ─── 4) Montar a tela: paralelo x fila ───
const buscar = (nome) => new Promise((r) => setTimeout(() => r(nome), 50));

(async () => {
  const t1 = Date.now();
  await buscar('usuario'); await buscar('extrato'); await buscar('avisos');
  console.log('4) Em fila:    ', Date.now() - t1, 'ms');

  const t2 = Date.now();
  await Promise.all([buscar('usuario'), buscar('extrato'), buscar('avisos')]);
  console.log('4) Com all:    ', Date.now() - t2, 'ms');
})();

// ─── 5) Importar um lote sem perder o que deu certo ───
const salvarLinha = (linha) => new Promise((res, rej) =>
  setTimeout(() => (linha.cpf ? res(linha.nome) : rej(new Error(`linha ${linha.id} sem CPF`))), 15));

(async () => {
  const planilha = [
    { id: 1, nome: 'Ana', cpf: '111' }, { id: 2, nome: 'Bruno' }, { id: 3, nome: 'Carla', cpf: '333' },
  ];

  const r = await Promise.allSettled(planilha.map(salvarLinha));
  const ok = r.filter((x) => x.status === 'fulfilled');

  console.log(`5) ${ok.length}/${planilha.length} importadas |`,
    r.filter((x) => x.status === 'rejected').map((x) => x.reason.message));
  // Com `all`, a linha 2 derrubaria a importação inteira e as boas seriam perdidas.
})();

// ─── 6) race para timeout, any para redundância ───
const comTimeout = (promessa, ms) => Promise.race([
  promessa,
  new Promise((_, rej) => setTimeout(() => rej(new Error(`passou de ${ms}ms`)), ms)),
]);

const servidor = (nome, ms, ok = true) => new Promise((res, rej) =>
  setTimeout(() => (ok ? res(`resposta de ${nome}`) : rej(new Error(nome + ' fora do ar'))), ms));

(async () => {
  try { await comTimeout(servidor('api lenta', 200), 50); }
  catch (erro) { console.log('6) Timeout:', erro.message); }

  console.log('6) Espelhos:', await Promise.any([
    servidor('espelho-1', 30, false), servidor('espelho-2', 60), servidor('espelho-3', 90),
  ]));
  // O primeiro caiu; `any` esperou o próximo que respondesse, sem derrubar nada.
})();

// ═══ PEGADINHAS ═══

// ─── 7) Falhar rápido não cancela as outras ───
const demorada = (nome) => new Promise((r) => setTimeout(() => {
  console.log('7) [' + nome + '] terminou mesmo assim');
  r(nome);
}, 80));

(async () => {
  try {
    await Promise.all([demorada('upload'), Promise.reject(new Error('validação'))]);
  } catch (erro) {
    console.log('7) all rejeitou na hora:', erro.message);
  }
  // O upload continua rodando: `all` só para de ESPERAR, não cancela nada. Para cancelar
  // de verdade é preciso AbortController.
})();

// ─── 8) A promise começa ao ser criada, não no await ───
const tarefa = (nome) => new Promise((r) => setTimeout(() => r(nome), 40));

(async () => {
  const jaComecaram = [tarefa('a'), tarefa('b')];        // as duas dispararam AGORA
  const t1 = Date.now();
  await jaComecaram[0]; await jaComecaram[1];
  console.log('8) Await em fila, mas paralelo:', Date.now() - t1, 'ms');

  const t2 = Date.now();
  await tarefa('c'); await tarefa('d');                  // criadas uma depois da outra
  console.log('8) Criadas em fila:            ', Date.now() - t2, 'ms');

  console.log('8) all de array vazio:', await Promise.all([]));
  try { await Promise.any([]); } catch (e) { console.log('8) any de array vazio:', e.constructor.name); }
})();

// ─── Resumo ───
// 1. `all`: tudo ou nada. Devolve na ordem do array e falha inteiro se uma falhar.
// 2. `allSettled`: nunca rejeita — devolve `status`, `value` ou `reason` de cada uma.
// 3. `race`: o primeiro a terminar decide, dando certo ou errado — é o timeout.
// 4. `any`: ignora as falhas e devolve o primeiro sucesso; sem nenhum, dá `AggregateError`.
// 5. Falhar não cancela as outras, e a promise começa a rodar quando é criada, não no `await`.
