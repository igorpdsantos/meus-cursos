/**
 * filter — escolher itens
 * Sessão 5 · Rodar: node src/05-transformar-listas/02-filter.js
 *
 * O QUE É: devolve um array NOVO só com os itens em que o teste retornou true.
 * QUANDO USAR: sempre que a frase for "só os que...". Busca, listagem com filtro, remover item.
 * QUANDO NÃO USAR: quando quer UM item (`find`), um sim/não (`some`/`every`) ou mudar o
 *                  valor (`map`). O filter mantém o item exatamente como está.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Um teste que devolve true ou false ───
const idades = [15, 22, 17, 30];

console.log(idades.filter((i) => i >= 18));
console.log('Original intacto:', idades);

// ─── 2) Várias condições ───
const funcionarios = [
  { nome: 'Ana', setor: 'TI', ativo: true },
  { nome: 'Bruno', setor: 'Vendas', ativo: true },
  { nome: 'Carla', setor: 'TI', ativo: false },
];

const tiAtivos = funcionarios.filter((f) => f.setor === 'TI' && f.ativo);
console.log(tiAtivos.map((f) => f.nome));

// ─── 3) Remover um item sem alterar o original ───
const tarefas = ['Estudar', 'Treinar', 'Ler'];

console.log(tarefas.filter((t) => t !== 'Treinar'));
console.log('Original continua com', tarefas.length);

// ═══ NA PRÁTICA ═══

// ─── 4) Busca com filtros opcionais ───
const produtos = [
  { nome: 'Teclado', preco: 249.9, categoria: 'eletronicos' },
  { nome: 'Livro JS', preco: 79.9, categoria: 'livros' },
  { nome: 'Monitor', preco: 1199, categoria: 'eletronicos' },
];

function buscar(lista, { categoria, precoMax } = {}) {
  return lista.filter((p) => {
    if (categoria && p.categoria !== categoria) return false;   // filtro ausente = não filtra
    if (precoMax && p.preco > precoMax) return false;
    return true;
  });
}

console.log(buscar(produtos, { categoria: 'eletronicos' }).map((p) => p.nome));
console.log(buscar(produtos, { precoMax: 100 }).map((p) => p.nome));
console.log(buscar(produtos).length, '← sem filtro, devolve tudo');

// ─── 5) Limpar dados sujos ───
const entradas = ['ana@x.com', '', null, '  ', 'bruno@x.com', undefined];

console.log(entradas.filter(Boolean));                 // tira null/undefined/''
console.log(entradas.filter((e) => e?.trim()));        // tira também o só-espaço

// ─── 6) Remover duplicados ───
const emails = ['a@x.com', 'b@x.com', 'a@x.com'];

console.log(emails.filter((e, i, arr) => arr.indexOf(e) === i));   // mantém a 1ª ocorrência
console.log([...new Set(emails)]);                                 // mais direto

// ─── 7) Separar em dois grupos de uma vez ───
const notas = [7, 4, 9, 3];

const aprovados = notas.filter((n) => n >= 6);
const reprovados = notas.filter((n) => n < 6);

console.log(`${aprovados.length} aprovados, ${reprovados.length} reprovados`);

// ═══ PEGADINHAS ═══

// ─── 8) Esquecer o return no callback com chaves ───
const ativos = [{ ativo: true }, { ativo: true }, { ativo: false }];

console.log(ativos.filter((a) => { a.ativo; }).length, '← 0: sem return, devolve undefined');
console.log(ativos.filter((a) => { return a.ativo; }).length, '← 2: com return');
console.log(ativos.filter((a) => a.ativo).length, '← 2: arrow curta já retorna');

// ─── Resumo ───
// 1. `filter` devolve array NOVO com os aprovados; o original nunca muda.
// 2. O callback precisa devolver true/false — com chaves `{}`, o `return` é obrigatório.
// 3. Nada passou? Vem `[]`, não `null`. Sempre dá para encadear depois.
// 4. `filter(Boolean)` é o jeito rápido de tirar valores vazios da lista.
// 5. Duplicados: `[...new Set(lista)]` para valores simples.
