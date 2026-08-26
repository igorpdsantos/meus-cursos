/**
 * Callbacks
 * Sessão 4 · Rodar: node src/04-funcoes/04-callbacks.js
 *
 * O QUE É: passar uma função como argumento para que OUTRA decida quando chamá-la.
 * QUANDO USAR: eventos, operações que terminam depois, e para deixar a regra de fora
 *              da função — quem chama escolhe o comportamento.
 * QUANDO NÃO USAR: para encadear várias operações assíncronas — vira "callback hell".
 *                  Nesse caso: Promise / async-await.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Quem chama define a regra ───
function aplicarDesconto(precos, regra) {
  return precos.map(regra);      // a função não sabe QUAL desconto — quem chama sabe
}

console.log(aplicarDesconto([100, 250], (p) => p * 0.9));
console.log(aplicarDesconto([100, 250], (p) => p - 20));

// ─── 2) É o que faz map, filter e sort funcionarem ───
const numeros = [5, 1, 4];

console.log(numeros.filter((n) => n > 2));           // callback decide quem fica
console.log(numeros.map((n) => n * 10));             // callback decide a transformação
console.log([...numeros].sort((a, b) => a - b));     // callback decide a ordem

// ─── 3) Sucesso e erro em callbacks separados ───
function salvar(pedido, aoSalvar, aoFalhar) {
  if (pedido.itens.length === 0) return aoFalhar('pedido vazio');
  aoSalvar({ ...pedido, id: 1042 });
}

salvar(
  { itens: ['Teclado'] },
  (p) => console.log('Salvo com id', p.id),
  (msg) => console.log('Erro:', msg),
);

salvar({ itens: [] }, () => {}, (msg) => console.log('Erro:', msg));

// ═══ NA PRÁTICA ═══

// ─── 4) Comportamento injetável: uma função, vários canais ───
function notificar(mensagem, enviar) {
  return enviar(mensagem);
}

const porEmail = (txt) => `E-mail: ${txt}`;
const porSms = (txt) => `SMS: ${txt}`;

console.log(notificar('Pedido a caminho', porEmail));
console.log(notificar('Pedido a caminho', porSms));

// ─── 5) Erro primeiro: o padrão histórico do Node ───
function lerArquivo(nome, callback) {
  if (!nome.endsWith('.json')) return callback(new Error('formato não suportado'));
  callback(null, '{"ok":true}');     // null no primeiro argumento = deu certo
}

lerArquivo('config.json', (erro, dados) => {
  if (erro) return console.log('Falhou:', erro.message);
  console.log('Conteúdo:', dados);
});

lerArquivo('config.txt', (erro) => console.log('Falhou:', erro.message));

// ═══ PEGADINHAS ═══

// ─── 6) Passe a função, não o resultado dela ───
const avisar = () => 'executou!';

console.log('avisar   →', typeof avisar);     // function: a função em si
console.log('avisar() →', typeof avisar());   // string: já é o RESULTADO

setTimeout(avisar, 10);        // certo: entrego a função, o setTimeout chama na hora
// setTimeout(avisar(), 10);   ← TypeError: entregou 'executou!' no lugar da função

// ─── 7) Callback hell: o motivo de Promise existir ───
const passo = (nome, proximo) => proximo(nome);

passo('login', (a) =>
  passo('carregar perfil', (b) =>
    passo('carregar pedidos', (c) =>
      console.log(`${a} → ${b} → ${c}`))));

// Cada etapa nova empurra tudo para a direita. Com 6 etapas, é ilegível.
// A saída é `await`, que escreve a mesma coisa de cima para baixo.

// ─── Resumo ───
// 1. Callback é função passada como argumento para outra chamar na hora certa.
// 2. É o mecanismo por trás de `map`, `filter`, `sort`, `forEach` e dos eventos.
// 3. Serve para injetar comportamento: a função fica genérica, quem chama decide a regra.
// 4. `fn` passa a função; `fn()` passa o RESULTADO. Essa é a confusão mais comum.
// 5. Encadear muitos callbacks assíncronos vira aninhamento ilegível — aí use async/await.
