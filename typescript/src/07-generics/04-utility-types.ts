/**
 * Utility types
 * Sessão 7 · Rodar: node src/07-generics/04-utility-types.ts
 *
 * O QUE É: tipos genéricos que já vêm com o TypeScript e produzem um tipo novo a partir de
 *          outro: `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`.
 * QUANDO USAR: quando o tipo novo é o antigo com uma diferença — o corpo de um PATCH, a
 *              versão pública de um usuário, o mapa de um valor por chave.
 * QUANDO NÃO USAR: empilhados. `Partial<Omit<Pick<T, A>, B>>` ninguém lê — nesse ponto,
 *                  escreva o tipo com as mãos e dê um nome a ele.
 */

// ═══ ESSENCIAL ═══

// ─── 1) `Partial` e `Required` ───
type Aluno = { id: number; nome: string; email: string; nota: number };

// PATCH manda só o que mudou: todo campo vira opcional.
type AlunoParaAtualizar = Partial<Aluno>;

function atualizar(atual: Aluno, mudancas: AlunoParaAtualizar): Aluno {
  return { ...atual, ...mudancas };
}

const ana: Aluno = { id: 1, nome: 'Ana Souza', email: 'ana@escola.dev', nota: 8.4 };
console.log('nota nova:', JSON.stringify(atualizar(ana, { nota: 9.2 })));
console.log('sem nada :', JSON.stringify(atualizar(ana, {})));

// @ts-expect-error — Object literal may only specify known properties. Did you mean 'nota'?
atualizar(ana, { notaa: 10 });

// `Required` faz o contrário: opcional vira obrigatório.
type ConfiguracaoParcial = { host?: string; porta?: number };
type ConfiguracaoCompleta = Required<ConfiguracaoParcial>;

const completa: ConfiguracaoCompleta = { host: 'localhost', porta: 3000 };
console.log('completa :', `${completa.host}:${completa.porta}`);

// @ts-expect-error — Property 'porta' is missing.
const faltando: ConfiguracaoCompleta = { host: 'localhost' };
console.log('rodando  :', JSON.stringify(faltando));

// ─── 2) `Pick` e `Omit`: escolher ou tirar campos ───
type Usuario = { id: number; nome: string; email: string; senhaHash: string; criadoEm: string };

type UsuarioPublico = Omit<Usuario, 'senhaHash'>;             // tudo, menos a senha
type ResumoDeUsuario = Pick<Usuario, 'id' | 'nome'>;          // só estes dois

const doBanco: Usuario = {
  id: 7, nome: 'Ana', email: 'ana@loja.dev',
  senhaHash: '$2a$08$abc...', criadoEm: '2026-08-01',
};

const paraApi: UsuarioPublico = (({ senhaHash, ...resto }) => resto)(doBanco);
const paraLista: ResumoDeUsuario = { id: doBanco.id, nome: doBanco.nome };

console.log('público:', JSON.stringify(paraApi));
console.log('resumo :', JSON.stringify(paraLista));

// @ts-expect-error — Property 'senhaHash' does not exist on type 'UsuarioPublico'.
console.log(paraApi.senhaHash);

console.log('\n`Omit` é a defesa mais barata contra vazar campo: o tipo do que sai da API é');
console.log('derivado do tipo do banco, e o campo novo e sensível não entra sozinho na resposta.');

// ─── 3) `Record`: um valor por chave ───
type Nivel = 'baixo' | 'medio' | 'alto';

// `Record<K, V>` cobra TODAS as chaves de K — esquecer uma é erro.
const CORES: Record<Nivel, string> = { baixo: 'verde', medio: 'amarelo', alto: 'vermelho' };

for (const nivel of Object.keys(CORES) as Nivel[]) console.log(`${nivel.padEnd(6)} ${CORES[nivel]}`);

// @ts-expect-error — Property 'alto' is missing in type '{ baixo: string; medio: string; }'.
const incompleto: Record<Nivel, string> = { baixo: 'verde', medio: 'amarelo' };
console.log('incompleto, rodando:', Object.keys(incompleto).length, 'chaves');

// Com chave `string`, `Record` vira o dicionário aberto de sempre.
const estoque: Record<string, number> = { 'CAN-01': 12, 'CAD-02': 0 };
estoque['CAN-02'] = 40;
console.log('estoque:', Object.entries(estoque).map(([k, v]) => `${k}=${v}`).join(' · '));

console.log('\nCom união de literais, `Record` obriga a tratar todos os casos. É a versão em');
console.log('objeto do switch exaustivo do tema 02.');

// ═══ NA PRÁTICA ═══

// ─── 4) O ciclo de vida de um registro, em três tipos ───
type Contato = {
  id: number;
  nome: string;
  email: string;
  criadoEm: string;
};

type ContatoNovo = Omit<Contato, 'id' | 'criadoEm'>;          // o que o formulário manda
type ContatoEditado = Partial<ContatoNovo>;                   // o que o PATCH manda
type ContatoNaLista = Pick<Contato, 'id' | 'nome'>;           // o que a listagem devolve

const banco: Contato[] = [];

function criar(novo: ContatoNovo): Contato {
  const contato: Contato = { id: banco.length + 1, criadoEm: '2026-08-28', ...novo };
  banco.push(contato);
  return contato;
}
function editar(id: number, mudancas: ContatoEditado): Contato | null {
  const atual = banco.find((c) => c.id === id);
  if (!atual) return null;
  Object.assign(atual, mudancas);
  return atual;
}
const listar = (): ContatoNaLista[] => banco.map(({ id, nome }) => ({ id, nome }));

console.log('criado :', JSON.stringify(criar({ nome: 'Ana', email: 'ana@loja.dev' })));
criar({ nome: 'Bruno', email: 'bruno@loja.dev' });
console.log('editado:', JSON.stringify(editar(1, { email: 'ana.souza@loja.dev' })));
console.log('lista  :', JSON.stringify(listar()));

// @ts-expect-error — Object literal may only specify known properties. 'id' does not exist in type 'ContatoNovo'.
criar({ id: 99, nome: 'Carla', email: 'carla@loja.dev' });

console.log('\nQuatro tipos, uma fonte. Acrescentar `telefone` ao `Contato` acrescenta nos');
console.log('três derivados — e o compilador aponta onde falta preencher.');

// ─── 5) `ReturnType` e `Parameters`: o tipo que sai da função ───
function montarResposta(status: number, corpo: unknown, cabecalhos: Record<string, string> = {}) {
  return { status, corpo, cabecalhos, enviadoEm: '2026-08-28T10:00:00Z' };
}

type Resposta = ReturnType<typeof montarResposta>;
type ArgumentosDaResposta = Parameters<typeof montarResposta>;

function registrar(resposta: Resposta): string {
  return `${resposta.status} em ${resposta.enviadoEm.slice(11, 19)}`;
}

const argumentos: ArgumentosDaResposta = [200, { ok: true }, { 'content-type': 'application/json' }];
console.log(registrar(montarResposta(...argumentos)));
console.log(registrar(montarResposta(404, { erro: 'não encontrado' })));

try {
  // @ts-expect-error — Property 'enviadoEm' is missing in type '{ status: number; corpo: unknown; cabecalhos: {}; }'.
  console.log(registrar({ status: 200, corpo: null, cabecalhos: {} }));
} catch (erro) {
  console.log('faltando um campo:', (erro as Error).message);
}

console.log('\nÚtil quando a função é a fonte da verdade e você não quer escrever o tipo do');
console.log('retorno duas vezes. Também aparece muito com bibliotecas que não exportam o tipo.');

// ─── 6) `Extract` e `Exclude`: filtrar a união, não os campos ───
type EventoDaLoja =
  | { tipo: 'pedido.criado'; pedidoId: number; total: number }
  | { tipo: 'pagamento.aprovado'; pedidoId: number; bandeira: string }
  | { tipo: 'pedido.cancelado'; pedidoId: number; motivo: string };

// `Extract<U, F>` fica com os MEMBROS de U que encaixam em F.
type PagamentoAprovado = Extract<EventoDaLoja, { tipo: 'pagamento.aprovado' }>;

// Só um membro entrou, então `bandeira` existe sem precisar de nenhum `if`.
function registrarPagamento(evento: PagamentoAprovado): string {
  return `pedido ${evento.pedidoId} pago com ${evento.bandeira}`;
}
console.log(registrarPagamento({ tipo: 'pagamento.aprovado', pedidoId: 7, bandeira: 'visa' }));

// @ts-expect-error — Type '"pedido.criado"' is not assignable to type '"pagamento.aprovado"'.
console.log(registrarPagamento({ tipo: 'pedido.criado', pedidoId: 8, total: 90 }));

// `Exclude<U, F>` faz o contrário: tira os que encaixam.
type TipoDeEvento = EventoDaLoja['tipo'];
type EventoDePedido = Exclude<TipoDeEvento, 'pagamento.aprovado'>;

const filaDePedidos: EventoDePedido[] = ['pedido.criado', 'pedido.cancelado'];
console.log('a fila escuta:', filaDePedidos.join(' · '));

// @ts-expect-error — Argument of type '"pagamento.aprovado"' is not assignable to parameter of type 'EventoDePedido'.
filaDePedidos.push('pagamento.aprovado');
console.log('rodando, entrou assim mesmo:', filaDePedidos.length, 'tipos');

// `NonNullable<T>` é `Exclude<T, null | undefined>` com um nome melhor.
type TalvezDesconto = number | null | undefined;
const descontoDoBanco: TalvezDesconto = 15;
const desconto: NonNullable<TalvezDesconto> = descontoDoBanco ?? 0;
console.log('desconto aplicado:', `${desconto}%`);

console.log('\n`Pick` e `Omit` trabalham nos CAMPOS de um objeto; `Extract` e `Exclude`, nos');
console.log('MEMBROS de uma união. Trocar um pelo outro é o engano mais comum dos quatro.');

// ═══ PEGADINHAS ═══

// ─── 7) `Partial` some com a garantia, e o resto do código não sabe ───
type Endereco = { rua: string; numero: number; cidade: string };

// Parece inofensivo: "vou aceitar o endereço incompleto e completo depois".
function salvarEndereco(endereco: Partial<Endereco>): string {
  // Todos os campos agora podem ser undefined, e o código tem que tratar todos.
  return `${endereco.rua ?? '?'}, ${endereco.numero ?? '?'} — ${endereco.cidade ?? '?'}`;
}

console.log('completo :', salvarEndereco({ rua: 'Rua A', numero: 100, cidade: 'Recife' }));
console.log('vazio    :', salvarEndereco({}), '← o tipo aceitou, e não sobrou nada');

// Quando só alguns campos são opcionais, diga QUAIS — em vez de afrouxar tudo.
type EnderecoParaSalvar = Omit<Endereco, 'numero'> & { numero?: number };
const semNumero: EnderecoParaSalvar = { rua: 'Rua A', cidade: 'Recife' };
console.log('preciso  :', `${semNumero.rua}, ${semNumero.numero ?? 's/n'} — ${semNumero.cidade}`);

// @ts-expect-error — Property 'rua' is missing in type '{ cidade: string; }'.
const semRua: EnderecoParaSalvar = { cidade: 'Recife' };
console.log('rodando  :', JSON.stringify(semRua));

console.log('\n`Partial` é ótimo para PATCH e péssimo como remendo. Ele não afrouxa um campo:');
console.log('afrouxa todos, e a partir dali ninguém mais sabe o que pode contar que existe.');

// ─── Resumo ───
// 1. `Partial<T>` deixa tudo opcional (o corpo de um PATCH); `Required<T>` faz o contrário.
// 2. `Pick<T, K>` escolhe campos; `Omit<T, K>` tira — é a defesa contra vazar `senhaHash`.
// 3. `Record<K, V>` cobra todas as chaves quando `K` é união de literais.
// 4. `Extract<U, F>` e `Exclude<U, F>` filtram MEMBROS de união — não campos de objeto.
// 5. Derive tudo de uma fonte só, inclusive da função: `ReturnType`/`Parameters<typeof f>`.
// 6. `Partial` como remendo afrouxa TUDO — diga quais campos são opcionais.
