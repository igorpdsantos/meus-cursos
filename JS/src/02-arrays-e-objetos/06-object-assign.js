/**
 * Object.assign — juntar objetos
 * Sessão 7 · Rodar: node src/02-arrays-e-objetos/06-object-assign.js
 *
 * O QUE É: copia os campos de um ou mais objetos para dentro de um objeto alvo, da esquerda
 *          para a direita. Devolve o próprio alvo, já alterado.
 * QUANDO USAR: mesclar configuração em camadas, aplicar valores padrão, copiar campos para
 *              um objeto que já existe.
 * QUANDO NÃO USAR: quando `{ ...a, ...b }` resolve — o spread faz o mesmo e não altera ninguém.
 *                  `assign` se justifica quando o alvo TEM que ser aquele objeto específico.
 */

// ═══ ESSENCIAL ═══

// ─── 1) O primeiro argumento é o alvo e ele MUDA ───
const alvo = { nome: 'Ana' };
const retorno = Object.assign(alvo, { plano: 'premium' }, { ativo: true });

console.log(alvo);
console.log('Devolveu o próprio alvo?', retorno === alvo);   // não é cópia

// ─── 2) Quem vem depois ganha ───
const padrao = { tema: 'claro', idioma: 'pt-BR', notificar: true };
const doUsuario = { tema: 'escuro' };

console.log(Object.assign({}, padrao, doUsuario));   // alvo vazio = ninguém é alterado

// ─── 3) Cópia rasa de um objeto ───
const original = { produto: 'Teclado', preco: 249.9 };
const copia = Object.assign({}, original);

copia.preco = 199;
console.log(original.preco, '|', copia.preco);       // o original ficou intacto
console.log('Com spread é igual:', { ...original }); // e mais curto — prefira o spread

// ═══ NA PRÁTICA ═══

// ─── 4) Configuração em camadas ───
const daBiblioteca = { tentativas: 3, timeoutMs: 5000, log: false };
const doAmbiente = { timeoutMs: 15000 };
const daChamada = { log: true };

const config = Object.assign({}, daBiblioteca, doAmbiente, daChamada);

console.log(config);   // a ordem dos argumentos É a regra de precedência

// ─── 5) Atualizar um objeto que outras partes já seguram ───
const carrinho = { itens: 2, total: 339.4 };
const carrinhoNoRelatorio = carrinho;                // outra parte do código aponta para o mesmo

Object.assign(carrinho, { itens: 3, total: 429.4 }); // atualiza no lugar, sem trocar a referência

console.log(carrinhoNoRelatorio);                    // enxergou a mudança
// Com `carrinho = {...}` a outra variável continuaria vendo o objeto velho.

// ─── 6) Preencher só o que está faltando ───
const recebido = { nome: 'Monitor', preco: 1199 };
const obrigatorios = { nome: '', preco: 0, estoque: 0, ativo: true };

const completo = Object.assign({}, obrigatorios, recebido);

console.log(completo);   // garante que todo campo existe, sem perder o que veio

// ═══ PEGADINHAS ═══

// ─── 7) É raso: o objeto de dentro é o MESMO ───
const perfilPadrao = { nome: 'Ana', endereco: { cidade: 'São Paulo' } };

const rasa = Object.assign({}, perfilPadrao);
const funda = structuredClone(perfilPadrao);         // clone de verdade, nível por nível

funda.endereco.cidade = 'Recife';                    // só a cópia funda muda
rasa.endereco.cidade = 'Salvador';                   // aqui o original vai junto

console.log('Original:', perfilPadrao.endereco.cidade, '| rasa:', rasa.endereco.cidade,
  '| funda:', funda.endereco.cidade);
// E não existe mescla funda: um `endereco` novo substitui o antigo inteiro, não se junta a ele.

// ─── 8) undefined também sobrescreve ───
const base = { tema: 'claro', idioma: 'pt-BR' };
const vindoDoFormulario = { tema: undefined };

console.log(Object.assign({}, base, vindoDoFormulario));   // tema virou undefined
console.log('Filtrando antes:', Object.assign({}, base,
  Object.fromEntries(Object.entries(vindoDoFormulario).filter(([, v]) => v !== undefined))));

// ─── Resumo ───
// 1. `Object.assign(alvo, ...fontes)` copia para o alvo e devolve o alvo — o alvo MUDA.
// 2. Use `{}` como alvo quando não quiser alterar nada: `Object.assign({}, a, b)`.
// 3. Quem vem por último vence — a ordem dos argumentos é a regra de precedência.
// 4. `{ ...a, ...b }` faz o mesmo e é mais legível; `assign` vale quando o alvo é fixo.
// 5. A cópia é rasa e `undefined` sobrescreve: limpe a fonte antes de mesclar.
