/**
 * Object.freeze — travar o conteúdo do objeto
 * Sessão 7 · Rodar: node src/02-arrays-e-objetos/04-object-freeze.js
 *
 * O QUE É: congela um objeto ou array. Depois disso não dá para alterar, adicionar nem
 *          remover propriedade — e não existe "descongelar".
 * QUANDO USAR: config da aplicação, tabela de constantes, valor padrão que ninguém pode sujar.
 * QUANDO NÃO USAR: em dado que muda o tempo todo (estado de tela, carrinho, formulário).
 *                  Aí o certo é criar um objeto novo a cada mudança, não congelar o antigo.
 */

// ═══ ESSENCIAL ═══

// ─── 1) const trava o nome; freeze trava o conteúdo ───
const semFreeze = { moeda: 'BRL' };
semFreeze.moeda = 'USD';                       // const não impediu: o objeto é o mesmo
console.log('Sem freeze:', semFreeze);

const comFreeze = Object.freeze({ moeda: 'BRL' });
comFreeze.moeda = 'USD';                       // não acontece nada
console.log('Com freeze:', comFreeze);

// ─── 2) O que fica bloqueado ───
const status = Object.freeze({ ATIVO: 'ativo', INATIVO: 'inativo' });

status.ATIVO = 'ligado';                       // alterar: bloqueado
status.PENDENTE = 'pendente';                  // adicionar: bloqueado
delete status.INATIVO;                         // remover: bloqueado

console.log(status, '| congelado?', Object.isFrozen(status));

// ─── 3) O congelamento é RASO ───
const config = Object.freeze({
  moeda: 'BRL',
  email: { remetente: 'nao-responda@empresa.com' },
});

config.moeda = 'USD';                          // bloqueado
config.email.remetente = 'hacker@fora.com';    // passou! o objeto de dentro não foi congelado

console.log(config.moeda, '|', config.email.remetente);

// ═══ NA PRÁTICA ═══

// ─── 4) Congelar de verdade: freeze em tudo que é objeto ───
function congelarFundo(alvo) {
  for (const valor of Object.values(alvo)) {
    if (valor && typeof valor === 'object') congelarFundo(valor);   // desce um nível
  }
  return Object.freeze(alvo);
}

const app = congelarFundo({ nome: 'Loja', limites: { itens: 50, abas: { max: 3 } } });

app.limites.abas.max = 999;
console.log('Fundo congelado:', app.limites.abas.max);

// ─── 5) Array congelado: lista fixa de opções ───
const FORMAS_PAGAMENTO = Object.freeze(['pix', 'cartao', 'boleto']);

FORMAS_PAGAMENTO[0] = 'dinheiro';              // não troca
FORMAS_PAGAMENTO[3] = 'cheque';                // não entra

console.log(FORMAS_PAGAMENTO, '| aceita pix?', FORMAS_PAGAMENTO.includes('pix'));
// Atenção: `.push` num array congelado lança TypeError na hora, mesmo fora do modo estrito.

// ─── 6) Congelado não é imutável na marra: gere um novo ───
const padrao = Object.freeze({ tema: 'claro', notificar: true });

const doUsuario = { ...padrao, tema: 'escuro' };   // cópia com a mudança, o padrão fica intacto

console.log('Padrão:', padrao, '| Do usuário:', doUsuario);
// É esse o hábito que o freeze te obriga a ter: em vez de alterar, criar a versão nova.

// ═══ PEGADINHAS ═══

// ─── 7) Fora do modo estrito, a alteração falha em SILÊNCIO ───
const taxa = Object.freeze({ percentual: 5 });

taxa.percentual = 99;                          // nenhum erro, nenhum aviso
console.log('Continua', taxa.percentual, '— o código "funcionou" e não mudou nada.');
// Em módulo ESM (ou com 'use strict'), a mesma linha lança TypeError. Não confie no silêncio:
// escreva o código assumindo que vai estourar.

// ─── 8) freeze não devolve cópia: congela o objeto que você passou ───
const original = { plano: 'free' };
const retorno = Object.freeze(original);

console.log('Mesmo objeto?', retorno === original);
original.plano = 'premium';                    // quem guardou a referência antiga também travou
console.log('Original:', original.plano);

// ─── Resumo ───
// 1. `const` trava a variável; `Object.freeze` trava o conteúdo do objeto.
// 2. Bloqueia alterar, adicionar e remover — e não tem volta (`Object.isFrozen` confere).
// 3. É raso: objeto dentro de objeto continua livre. Para tudo, percorra e congele recursivo.
// 4. Serve para config e constante; para dado que muda, crie um objeto novo com spread.
// 5. Fora do modo estrito a alteração falha calada — o bug aparece longe da causa.
