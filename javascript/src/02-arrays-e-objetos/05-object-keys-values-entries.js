/**
 * Object.keys, values e entries
 * Sessão 7 · Rodar: node src/02-arrays-e-objetos/05-object-keys-values-entries.js
 *
 * O QUE É: as três formas de transformar um objeto em array — só as chaves, só os valores,
 *          ou os pares [chave, valor].
 * QUANDO USAR: percorrer objeto, contar campos, somar valores, filtrar campos antes de enviar
 *              para a API — qualquer coisa que exija tratar o objeto como lista.
 * QUANDO NÃO USAR: quando você já sabe o nome do campo. Aí é só `obj.campo`.
 */

// ═══ ESSENCIAL ═══

// ─── 1) As três leituras do mesmo objeto ───
const estoque = { teclado: 12, mouse: 0, monitor: 5 };

console.log(Object.keys(estoque));      // ['teclado', 'mouse', 'monitor']
console.log(Object.values(estoque));    // [12, 0, 5]
console.log(Object.entries(estoque));   // [['teclado', 12], ...] — pares chave/valor

// ─── 2) Percorrer o objeto ───
const precos = { teclado: 249.9, mouse: 89.5 };

for (const [produto, preco] of Object.entries(precos)) {   // desestrutura o par direto
  console.log(`${produto}: R$ ${preco.toFixed(2)}`);
}

// ─── 3) fromEntries: a volta, de array para objeto ───
const pares = [['nome', 'Ana'], ['plano', 'premium']];

console.log(Object.fromEntries(pares));

const url = new URLSearchParams('busca=teclado&pagina=2');
console.log(Object.fromEntries(url));   // uso clássico: query string vira objeto

// ═══ NA PRÁTICA ═══

// ─── 4) O formulário tem campo preenchido? ───
const formulario = { nome: '', email: '', telefone: '' };

console.log('Quantidade de campos:', Object.keys(formulario).length);
console.log('Está vazio?', Object.values(formulario).every((v) => v === ''));
console.log('Faltando:', Object.entries(formulario).filter(([, v]) => !v).map(([c]) => c));

// ─── 5) Limpar campos vazios antes de enviar ───
const edicao = { nome: 'Ana', apelido: '', idade: 30, bio: null };

const limpo = Object.fromEntries(
  Object.entries(edicao).filter(([, valor]) => valor !== '' && valor != null),
);

console.log(limpo);   // o padrão entries → filter/map → fromEntries é o "map de objeto"

// ─── 6) Somar e achar o maior valor ───
const vendasPorMes = { jan: 12000, fev: 9500, mar: 21000 };

const total = Object.values(vendasPorMes).reduce((s, v) => s + v, 0);
const melhor = Object.entries(vendasPorMes).sort(([, a], [, b]) => b - a)[0];

console.log('Total:', total, '| Melhor mês:', melhor[0], 'com', melhor[1]);

// ═══ PEGADINHAS ═══

// ─── 7) Só pega o que é próprio e enumerável ───
const usuario = { nome: 'Ana' };
Object.defineProperty(usuario, 'token', { value: 'abc', enumerable: false });

console.log(Object.keys(usuario));                    // o token não aparece
console.log('Mas existe:', usuario.token, '| tem?', 'token' in usuario);
console.log('Todas mesmo:', Object.getOwnPropertyNames(usuario));

// ─── 8) Chave que parece número fura a ordem ───
const ranking = { '2': 'Bruno', b: 'Ana', '1': 'Carla', a: 'Diego' };

console.log(Object.keys(ranking));
// Chaves numéricas vêm primeiro e em ordem crescente; o resto na ordem de inserção.
// Se a ordem importa, use array ou Map — objeto não é lista ordenada.

// ─── Resumo ───
// 1. `keys` = chaves, `values` = valores, `entries` = pares [chave, valor].
// 2. `for (const [k, v] of Object.entries(obj))` é o jeito padrão de percorrer objeto.
// 3. `entries` → `filter`/`map` → `fromEntries` é o "map de objeto" que o JS não tem.
// 4. `Object.keys(obj).length` conta os campos e diz se o objeto está vazio.
// 5. Ignora herdadas e não-enumeráveis, e chave numérica vem primeiro na ordem.
