/**
 * keyof, typeof e tipos indexados
 * Sessão 7 · Rodar: node src/07-generics/03-keyof-e-typeof.ts
 *
 * O QUE É: três operadores que trabalham em cima de tipos. `keyof T` é a união das chaves
 *          de `T`; `typeof valor` pega o tipo de um valor que já existe; `T['campo']`
 *          pega o tipo de um campo.
 * QUANDO USAR: quando o tipo pode ser DERIVADO de algo que já está escrito — um objeto de
 *              configuração, uma constante, outro tipo.
 * QUANDO NÃO USAR: quando derivar deixa o tipo ilegível. Um alias com nome próprio vale
 *                  mais do que uma expressão de tipo de três linhas.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `keyof`: as chaves viram uma união ───
type Produto = { sku: string; nome: string; preco: number };
type CampoDeProduto = keyof Produto;              // 'sku' | 'nome' | 'preco'

const camposParaMostrar: CampoDeProduto[] = ['sku', 'preco'];

const caneca: Produto = { sku: 'CAN-01', nome: 'Caneca', preco: 19.9 };
for (const campo of camposParaMostrar) console.log(`${campo.padEnd(6)} ${caneca[campo]}`);

// @ts-expect-error — Type '"estoque"' is not assignable to type 'keyof Produto'.
const invalido: CampoDeProduto = 'estoque';
console.log('rodando, é só um texto:', invalido);

console.log('\nA lista de campos está escrita UMA vez, no tipo. Acrescentar `estoque` ao');
console.log('`Produto` acrescenta ao `CampoDeProduto` sozinho — não há segunda lista para esquecer.');

// ─── 2) `typeof`: do valor para o tipo ───
// Aqui a fonte da verdade é o objeto, não o tipo. O tipo sai dele.
const configuracaoPadrao = {
  ambiente: 'producao',
  porta: 3000,
  tentativas: 3,
  debug: false,
};

type Configuracao = typeof configuracaoPadrao;    // { ambiente: string; porta: number; ... }

function subir(config: Configuracao): string {
  return `${config.ambiente}:${config.porta} (debug=${config.debug})`;
}

console.log(subir(configuracaoPadrao));
console.log(subir({ ...configuracaoPadrao, ambiente: 'local', debug: true }));

// @ts-expect-error — Property 'debug' is missing in type '{ ambiente: string; porta: number; tentativas: number; }'.
subir({ ambiente: 'local', porta: 8080, tentativas: 1 });

console.log('\nCuidado com o nome: `typeof` AQUI é operador de tipo, não o `typeof` que roda.');
console.log('São dois operadores diferentes com o mesmo nome — o de tipo só existe em anotação.');

// ─── 3) `T['campo']`: o tipo de um campo ───
type Pedido = {
  id: number;
  status: 'pendente' | 'pago' | 'enviado';
  itens: { sku: string; quantidade: number }[];
};

type Status = Pedido['status'];                   // 'pendente' | 'pago' | 'enviado'
type Item = Pedido['itens'][number];              // { sku: string; quantidade: number }

function proximoStatus(atual: Status): Status {
  return atual === 'pendente' ? 'pago' : atual === 'pago' ? 'enviado' : 'enviado';
}

const item: Item = { sku: 'CAN-01', quantidade: 2 };
console.log('item :', item.sku, `x${item.quantidade}`);
console.log('fluxo:', ['pendente', 'pago', 'enviado'].map((s) => proximoStatus(s as Status)).join(' → '));

// @ts-expect-error — Type '"cancelado"' is not assignable to type 'Status'.
console.log(proximoStatus('cancelado'));

console.log('\n`Pedido["itens"][number]` é o truque para pegar o tipo de UM item de uma lista.');
console.log('Sem ele, seria preciso extrair o tipo do item para um alias só para poder citá-lo.');

// ═══ NA PRÁTICA ═══

// ─── 4) Os três juntos: um formulário tipado pela constante ───
const CAMPOS_DO_FORMULARIO = {
  nome: { rotulo: 'Nome completo', obrigatorio: true },
  email: { rotulo: 'E-mail', obrigatorio: true },
  telefone: { rotulo: 'Telefone', obrigatorio: false },
} as const;

type NomeDoCampo = keyof typeof CAMPOS_DO_FORMULARIO;      // 'nome' | 'email' | 'telefone'
type Preenchimento = Record<NomeDoCampo, string>;

function validar(valores: Preenchimento): string[] {
  const erros: string[] = [];
  for (const campo of Object.keys(CAMPOS_DO_FORMULARIO) as NomeDoCampo[]) {
    const definicao = CAMPOS_DO_FORMULARIO[campo];
    if (definicao.obrigatorio && !valores[campo].trim()) erros.push(`${definicao.rotulo} é obrigatório`);
  }
  return erros;
}

console.log('completo :', validar({ nome: 'Ana', email: 'ana@loja.dev', telefone: '' }));
console.log('faltando :', validar({ nome: '', email: '', telefone: '81 99999-0000' }));

// @ts-expect-error — Property 'telefone' is missing in type '{ nome: string; email: string; }'.
validar({ nome: 'Ana', email: 'ana@loja.dev' });

console.log('\nUm campo novo na constante entra no tipo, na validação e na conferência de');
console.log('quem chama, tudo de uma vez. Nada foi escrito duas vezes.');

// ─── 5) `keyof` para um tradutor de nomes de coluna ───
type LinhaDoBanco = { user_name: string; created_at: string; total_amount: number };
type LinhaDoApp = { nome: string; criadoEm: string; total: number };

// O mapa é conferido dos dois lados: chave de um, valor do outro.
const DE_PARA: Record<keyof LinhaDoBanco, keyof LinhaDoApp> = {
  user_name: 'nome',
  created_at: 'criadoEm',
  total_amount: 'total',
};

function traduzir(linha: LinhaDoBanco): LinhaDoApp {
  return { nome: linha.user_name, criadoEm: linha.created_at, total: linha.total_amount };
}

const doBanco: LinhaDoBanco = { user_name: 'Ana', created_at: '2026-08-28', total_amount: 249.9 };
console.log('de → para:', Object.entries(DE_PARA).map(([de, para]) => `${de}→${para}`).join(' · '));
console.log('traduzido:', JSON.stringify(traduzir(doBanco)));

// @ts-expect-error — Type '"nomeDoUsuario"' is not assignable to type 'keyof LinhaDoApp'.
const mapaTorto: Record<keyof LinhaDoBanco, keyof LinhaDoApp> = { ...DE_PARA, user_name: 'nomeDoUsuario' };
console.log('rodando, o mapa torto existe:', mapaTorto.user_name);

// ═══ PEGADINHAS ═══

// ─── 6) `Object.keys` devolve `string[]`, não `keyof T` ───
const precos = { 'CAN-01': 19.9, 'CAD-02': 32.5 };

const chaves = Object.keys(precos);               // string[] — não 'CAN-01' | 'CAD-02'
// @ts-expect-error — Type 'string' can't be used to index type '{ "CAN-01": number; ... }'.
console.log(chaves.map((c) => precos[c]));

// Os dois jeitos honestos: afirmar o tipo, ou usar `Object.entries`, que já vem em par.
const chavesTipadas = Object.keys(precos) as (keyof typeof precos)[];
console.log('com as     :', chavesTipadas.map((c) => precos[c].toFixed(2)).join(' · '));
console.log('com entries:', Object.entries(precos).map(([sku, p]) => `${sku}=${p.toFixed(2)}`).join(' · '));

console.log('\nO TypeScript não promete que as chaves são só essas: por tipagem estrutural,');
console.log('o objeto pode ter mais campos do que o tipo declara. Por isso `Object.keys` é largo.');

// ─── Resumo ───
// 1. `keyof T` é a união das chaves de `T` — a lista de campos sem escrever a lista.
// 2. `typeof valor` (em anotação) pega o tipo de algo que já existe: constante, objeto, função.
// 3. `T['campo']` pega o tipo de um campo; `T['lista'][number]` pega o do item.
// 4. `keyof typeof CONSTANTE` é a dupla mais usada: a constante vira a fonte do tipo.
// 5. Derivar evita a segunda lista que sempre esquece de ser atualizada.
// 6. `Object.keys` devolve `string[]` de propósito — o objeto pode ter mais do que o tipo diz.
