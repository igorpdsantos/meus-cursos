/**
 * Desestruturação de objetos e arrays
 * Sessão 2 · Rodar: node src/02-arrays-e-objetos/03-desestruturacao.js
 *
 * O QUE É: tirar valores de dentro de um objeto/array direto para variáveis, em uma linha.
 * QUANDO USAR: ler resposta de API, receber parâmetros de função, pegar "o resto" de um objeto.
 * QUANDO NÃO USAR: quando o aninhamento passa de 2 níveis — vira ilegível. Aí quebre em passos.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Objeto: pegar campos pelo nome ───
const usuario = { id: 7, nome: 'Igor', cidade: 'Recife' };

const { nome, cidade } = usuario;
console.log(nome, '—', cidade);

const { nome: apelido } = usuario;                // renomeando
const { telefone = 'não informado' } = usuario;   // valor padrão se não existir
console.log(apelido, '|', telefone);

// ─── 2) Array: pegar pela posição ───
const medalhas = ['ouro', 'prata', 'bronze'];

const [primeiro, segundo] = medalhas;
console.log(primeiro, segundo);

const [, , terceiro] = medalhas;   // vírgula pula posição
console.log('Terceiro:', terceiro);

// ─── 3) Rest: o que sobrou ───
const cadastro = { id: 7, nome: 'Ana', email: 'ana@x.com' };

const { id, ...semId } = cadastro;   // útil para não mandar o id no PATCH
console.log('id:  ', id);
console.log('resto:', semId);

const [campeao, ...demais] = ['Ana', 'Bruno', 'Carla'];
console.log(campeao, 'venceu.', demais.length, 'ficaram pelo caminho.');

// ═══ NA PRÁTICA ═══

// ─── 4) Nos parâmetros da função: a ordem some ───
function criarPedido({ cliente, frete = 0, cupom = null }) {
  return `${cliente} · frete R$ ${frete}${cupom ? ` · ${cupom}` : ''}`;
}

console.log(criarPedido({ cliente: 'Ana', frete: 20 }));
console.log(criarPedido({ cupom: 'BEMVINDO', cliente: 'Bruno' }));   // ordem não importa

// ─── 5) Resposta de API aninhada ───
const resposta = {
  dados: { usuario: { nome: 'Carla', plano: 'pro' } },
  meta: { total: 57 },
};

const { dados: { usuario: { nome: quem, plano } }, meta: { total } } = resposta;
console.log(`${quem} · plano ${plano} · ${total} registros`);

// Passando de 2 níveis, quebrar lê melhor:
const { dados } = resposta;
console.log('Mais legível:', dados.usuario.plano);

// ─── 6) Percorrer objeto como lista de pares ───
const estoque = { teclado: 3, mouse: 0, monitor: 7 };

for (const [produto, qtd] of Object.entries(estoque)) {
  console.log(`${produto.padEnd(8)} ${qtd > 0 ? qtd + ' un' : 'esgotado'}`);
}

// ═══ PEGADINHAS ═══

// ─── 7) Desestruturar undefined explode ───
function lerTema(config) {
  const { tema = 'claro' } = config ?? {};   // o ?? {} evita o TypeError
  return tema;
}

console.log(lerTema({ tema: 'escuro' }));
console.log(lerTema(undefined));

// ─── Resumo ───
// 1. Objeto casa pelo NOME (`{ nome }`), array casa pela POSIÇÃO (`[a, b]`).
// 2. `{ x: y }` renomeia, `{ x = 1 }` dá valor padrão — juntos: `{ x: y = 1 }`.
// 3. `...resto` recolhe o que sobrou; ótimo para tirar um campo antes de enviar.
// 4. Desestruturar nos parâmetros elimina a ordem dos argumentos e documenta a função.
// 5. Aninhou 3 níveis? Quebre em passos. E use `?? {}` para não explodir com undefined.
