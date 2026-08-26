/**
 * Tratar erro: try, catch e finally
 * Sessão 3 · Rodar: node src/03-controle-de-fluxo/03-try-catch.js
 *
 * O QUE É: capturar um erro para o programa não morrer no meio.
 * QUANDO USAR: onde o erro é ESPERADO — JSON inválido, API fora, dado do usuário torto.
 * QUANDO NÃO USAR: para esconder bug (`catch` vazio) nem para validação que um `if` resolve.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O básico: JSON que veio quebrado ───
try {
  const config = JSON.parse('{tema: escuro}');
  console.log(config);
} catch (erro) {
  console.log('JSON inválido:', erro.message);
}

console.log('O programa continua vivo.');

// ─── 2) Lançar o próprio erro, com mensagem útil ───
function sacar(saldo, valor) {
  if (valor <= 0) throw new Error('Valor precisa ser maior que zero');
  if (valor > saldo) throw new Error(`Saldo insuficiente: você tem R$ ${saldo}`);
  return saldo - valor;
}

try {
  console.log('Novo saldo:', sacar(500, 200));
  console.log('Novo saldo:', sacar(300, 999));
} catch (erro) {
  console.log('Recusado:', erro.message);
}

// ─── 3) finally roda sempre ───
function processar(quebrar) {
  console.log('  abriu conexão');
  try {
    if (quebrar) throw new Error('falhou');
    return 'sucesso';
  } catch {
    return 'erro tratado';
  } finally {
    console.log('  fechou conexão');   // limpeza que não pode ser pulada
  }
}

console.log(processar(false));
console.log(processar(true));

// ═══ NA PRÁTICA ═══

// ─── 4) Erro com tipo próprio, para tratar cada caso diferente ───
class ErroDeValidacao extends Error {
  constructor(campo, mensagem) {
    super(mensagem);
    this.name = 'ErroDeValidacao';
    this.campo = campo;              // dado extra para a tela destacar o campo
  }
}

try {
  throw new ErroDeValidacao('email', 'E-mail inválido');
} catch (erro) {
  if (erro instanceof ErroDeValidacao) console.log(`Campo "${erro.campo}": ${erro.message}`);
  else throw erro;                   // não é meu problema: deixa subir
}

// ─── 5) Processar lote sem parar no primeiro defeito ───
const linhas = ['{"id":1}', 'quebrado', '{"id":3}'];
const importados = [];
const falhas = [];

for (const [i, linha] of linhas.entries()) {
  try {
    importados.push(JSON.parse(linha));
  } catch {
    falhas.push(i + 1);              // catch sem variável: quando o erro não interessa
  }
}

console.log(`${importados.length} importadas, falhou na linha ${falhas.join(', ')}`);

// ═══ PEGADINHAS ═══

// ─── 6) catch vazio é desligar o alarme de incêndio ───
try {
  JSON.parse('{quebrado}');
} catch {
  // nada aqui: o bug some e você nunca fica sabendo
}

console.log('Seguiu como se nada tivesse acontecido — e esse é exatamente o problema.');

// ─── Resumo ───
// 1. `try/catch` é para erro ESPERADO. Bug de programação deve aparecer, não sumir.
// 2. `throw new Error('mensagem clara')` — a mensagem é o que você lê no log às 3h.
// 3. `finally` sempre roda: use para fechar conexão, liberar arquivo, esconder o loading.
// 4. Classe própria (`extends Error`) deixa você tratar cada tipo do seu jeito.
// 5. No `catch`, ou trate o erro ou dê `throw` de novo. Nunca deixe vazio.
